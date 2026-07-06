-- ============================================================================
-- Caderno da Turma — schema v5 (gestão de contas completa)
-- Roda por cima do v1+v2+v3+v4 (idempotente). Adiciona:
--   · papel "professor" (registrado com matéria em vez de sala)
--   · ADM fundador (só ele apaga/rebaixa outros ADMs — e ninguém apaga ele)
--   · excluir usuário, renomear username e trocar papel pelo site
-- ============================================================================

-- ---------------------------------------------------------------------------
-- Papéis: entra "professor". Matéria do professor fica no próprio perfil.
-- ---------------------------------------------------------------------------
alter table public.profiles drop constraint if exists profiles_role_check;
alter table public.profiles
  add constraint profiles_role_check check (role in ('aluno', 'professor', 'coordenador', 'adm'));

alter table public.profiles add column if not exists materia text;

-- ADM fundador: o dono do sistema. Marcado automaticamente como o ADM mais
-- antigo (quem criou o projeto). Só o fundador mexe em contas de outros ADMs.
alter table public.profiles add column if not exists fundador boolean not null default false;

update public.profiles set fundador = true
where id = (
  select id from public.profiles where role = 'adm' order by created_at asc limit 1
)
and not exists (select 1 from public.profiles where fundador);

-- ---------------------------------------------------------------------------
-- Trigger de cadastro v3: carrega também a matéria (professores).
-- Papel continua NUNCA vindo do cadastro (sempre 'aluno'; promoção via função).
-- ---------------------------------------------------------------------------
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  insert into public.profiles (id, username, sala_id, role, must_change_password, materia)
  values (
    new.id,
    lower(new.raw_user_meta_data ->> 'username'),
    nullif(new.raw_user_meta_data ->> 'sala_id', '')::uuid,
    'aluno',
    coalesce((new.raw_user_meta_data ->> 'must_change_password')::boolean, true),
    nullif(new.raw_user_meta_data ->> 'materia', '')
  );
  insert into public.profiles_privados (user_id, nome_completo)
  values (new.id, coalesce(new.raw_user_meta_data ->> 'nome_completo', ''));
  return new;
end;
$$;

-- ---------------------------------------------------------------------------
-- Trocar papel (v2 do promote_user): aceita professor; protege o fundador.
-- Regras: só ADM chama; mexer no papel de um ADM exige ser o fundador;
-- o papel do fundador não muda por aqui (nem o dele mesmo — evita se trancar).
-- ---------------------------------------------------------------------------
create or replace function public.promote_user(target_username text, new_role text)
returns void
language plpgsql
security definer set search_path = public
as $$
declare
  v_caller record;
  v_alvo record;
begin
  select role, fundador into v_caller from public.profiles where id = auth.uid();
  if v_caller.role is distinct from 'adm' then
    raise exception 'apenas ADM pode alterar papéis';
  end if;
  if new_role not in ('aluno', 'professor', 'coordenador', 'adm') then
    raise exception 'papel inválido: %', new_role;
  end if;

  select id, role, fundador into v_alvo
    from public.profiles where username = lower(target_username);
  if v_alvo.id is null then
    raise exception 'usuário % não encontrado', target_username;
  end if;
  if v_alvo.fundador then
    raise exception 'o papel do ADM fundador não pode ser alterado';
  end if;
  if v_alvo.role = 'adm' and not v_caller.fundador then
    raise exception 'só o ADM fundador altera o papel de outro ADM';
  end if;

  update public.profiles set role = new_role where id = v_alvo.id;
end;
$$;

-- ---------------------------------------------------------------------------
-- Excluir usuário: apaga do auth.users (cascateia pra profiles, privados,
-- comentários e histórico de quiz). Regras: só ADM; ninguém se auto-exclui;
-- excluir um ADM exige ser o fundador; o fundador nunca é excluído.
-- ---------------------------------------------------------------------------
create or replace function public.apagar_usuario(target_username text)
returns void
language plpgsql
security definer set search_path = public
as $$
declare
  v_caller record;
  v_alvo record;
begin
  select role, fundador into v_caller from public.profiles where id = auth.uid();
  if v_caller.role is distinct from 'adm' then
    raise exception 'apenas ADM pode excluir contas';
  end if;

  select id, role, fundador into v_alvo
    from public.profiles where username = lower(target_username);
  if v_alvo.id is null then
    raise exception 'usuário % não encontrado', target_username;
  end if;
  if v_alvo.id = auth.uid() then
    raise exception 'você não pode excluir a própria conta por aqui';
  end if;
  if v_alvo.fundador then
    raise exception 'o ADM fundador não pode ser excluído';
  end if;
  if v_alvo.role = 'adm' and not v_caller.fundador then
    raise exception 'só o ADM fundador exclui outro ADM';
  end if;

  delete from auth.users where id = v_alvo.id;
end;
$$;

-- ---------------------------------------------------------------------------
-- Renomear username: atualiza o perfil E o e-mail sintético do Auth
-- (username@caderno.local), inclusive na tabela de identidades — senão o
-- login com o nome novo não funciona. Regras: só ADM; formato validado;
-- unicidade garantida pelo UNIQUE do banco; conta de ADM só pelo fundador.
-- ---------------------------------------------------------------------------
create or replace function public.renomear_usuario(target_username text, novo_username text)
returns void
language plpgsql
security definer set search_path = public
as $$
declare
  v_caller record;
  v_alvo record;
  v_novo text := lower(trim(novo_username));
  v_email text;
begin
  select role, fundador into v_caller from public.profiles where id = auth.uid();
  if v_caller.role is distinct from 'adm' then
    raise exception 'apenas ADM pode renomear contas';
  end if;
  if v_novo !~ '^[a-z0-9][a-z0-9._-]{2,29}$' then
    raise exception 'username inválido: 3 a 30 caracteres, só minúsculas, números, ponto, hífen ou underline';
  end if;

  select id, role, fundador into v_alvo
    from public.profiles where username = lower(target_username);
  if v_alvo.id is null then
    raise exception 'usuário % não encontrado', target_username;
  end if;
  if v_alvo.role = 'adm' and not v_caller.fundador and v_alvo.id <> auth.uid() then
    raise exception 'só o ADM fundador renomeia outro ADM';
  end if;
  if exists (select 1 from public.profiles where username = v_novo) then
    raise exception 'o username "%" já está em uso', v_novo;
  end if;

  v_email := v_novo || '@caderno.local';

  update public.profiles set username = v_novo where id = v_alvo.id;

  update auth.users
     set email = v_email,
         raw_user_meta_data = coalesce(raw_user_meta_data, '{}'::jsonb)
           || jsonb_build_object('username', v_novo)
   where id = v_alvo.id;

  update auth.identities
     set identity_data = identity_data || jsonb_build_object('email', v_email),
         provider_id = v_email
   where user_id = v_alvo.id and provider = 'email';
end;
$$;
