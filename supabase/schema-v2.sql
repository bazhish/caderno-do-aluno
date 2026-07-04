-- ============================================================================
-- Caderno da Turma — schema v2 (fase 1 do site dinâmico)
-- Roda por cima do schema.sql v1 (idempotente). Adiciona: cursos, salas,
-- matérias, nome real privado, primeiro acesso, banco de questões e censura.
-- ============================================================================

-- ---------------------------------------------------------------------------
-- Cursos técnicos e salas
-- ---------------------------------------------------------------------------
create table if not exists public.cursos (
  id uuid primary key default gen_random_uuid(),
  nome text not null unique,
  slug text not null unique,
  created_at timestamptz not null default now()
);

insert into public.cursos (nome, slug) values
  ('Desenvolvimento de Sistemas', 'ds'),
  ('Administração', 'administracao')
on conflict (slug) do nothing;

create table if not exists public.salas (
  id uuid primary key default gen_random_uuid(),
  nome text not null unique,
  ano int not null check (ano between 1 and 3),
  curso_id uuid references public.cursos (id),
  created_at timestamptz not null default now()
);

-- Matérias por sala (cada sala tem sua própria lista; usado na fase 3,
-- quando o conteúdo migrar para o banco).
create table if not exists public.materias (
  id uuid primary key default gen_random_uuid(),
  sala_id uuid not null references public.salas (id) on delete cascade,
  nome text not null,
  slug text not null,
  tipo text not null default 'regular' check (tipo in ('regular', 'curso')),
  unique (sala_id, slug)
);

-- ---------------------------------------------------------------------------
-- Perfis: sala, primeiro acesso e nome real privado
-- ---------------------------------------------------------------------------
alter table public.profiles add column if not exists sala_id uuid references public.salas (id);
alter table public.profiles add column if not exists must_change_password boolean not null default false;

-- usernames compostos (nome.inicial.sala) podem passar de 20 caracteres
alter table public.profiles drop constraint if exists profiles_username_check;
alter table public.profiles
  add constraint profiles_username_check check (username ~ '^[a-z0-9][a-z0-9._-]{2,29}$');

-- Nome completo real: PRIVADO. Só coordenador/ADM leem (pra moderação séria:
-- identificar o dono da conta e acionar o responsável). Público = só username.
create table if not exists public.profiles_privados (
  user_id uuid primary key references public.profiles (id) on delete cascade,
  nome_completo text not null default ''
);

alter table public.profiles_privados enable row level security;

drop policy if exists "privados_select_moderacao" on public.profiles_privados;
create policy "privados_select_moderacao"
  on public.profiles_privados for select
  using (
    exists (
      select 1 from public.profiles p
      where p.id = auth.uid() and p.role in ('adm', 'coordenador')
    )
  );

-- ---------------------------------------------------------------------------
-- Trigger de cadastro v2: carrega sala, nome real e flag de primeiro acesso.
-- Papel NUNCA vem do cadastro (sempre 'aluno'; promoção só via promote_user).
-- ---------------------------------------------------------------------------
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  insert into public.profiles (id, username, sala_id, role, must_change_password)
  values (
    new.id,
    lower(new.raw_user_meta_data ->> 'username'),
    nullif(new.raw_user_meta_data ->> 'sala_id', '')::uuid,
    'aluno',
    coalesce((new.raw_user_meta_data ->> 'must_change_password')::boolean, true)
  );
  insert into public.profiles_privados (user_id, nome_completo)
  values (new.id, coalesce(new.raw_user_meta_data ->> 'nome_completo', ''));
  return new;
end;
$$;

-- ---------------------------------------------------------------------------
-- Banco de questões por aula (fase 2: sorteio sem repetição por aluno)
-- ---------------------------------------------------------------------------
create table if not exists public.questoes (
  id uuid primary key default gen_random_uuid(),
  lesson_slug text not null,
  enunciado text not null,
  alternativas jsonb not null,
  correct_index int not null check (correct_index >= 0),
  explicacao text,
  fonte text,
  created_at timestamptz not null default now()
);

create index if not exists questoes_lesson_idx on public.questoes (lesson_slug);

create table if not exists public.questoes_respondidas (
  user_id uuid not null references public.profiles (id) on delete cascade,
  questao_id uuid not null references public.questoes (id) on delete cascade,
  acertou boolean,
  created_at timestamptz not null default now(),
  primary key (user_id, questao_id)
);

-- ---------------------------------------------------------------------------
-- Censura automática de comentários (lista mantida pelo ADM)
-- ---------------------------------------------------------------------------
create table if not exists public.palavras_bloqueadas (
  termo text primary key
);

-- ---------------------------------------------------------------------------
-- RLS das tabelas novas
-- ---------------------------------------------------------------------------
alter table public.cursos enable row level security;
alter table public.salas enable row level security;
alter table public.materias enable row level security;
alter table public.questoes enable row level security;
alter table public.questoes_respondidas enable row level security;
alter table public.palavras_bloqueadas enable row level security;

drop policy if exists "cursos_select" on public.cursos;
create policy "cursos_select" on public.cursos for select using (true);

drop policy if exists "salas_select" on public.salas;
create policy "salas_select" on public.salas for select using (true);

drop policy if exists "materias_select" on public.materias;
create policy "materias_select" on public.materias for select using (true);

drop policy if exists "questoes_select" on public.questoes;
create policy "questoes_select" on public.questoes for select using (true);

drop policy if exists "respondidas_select_proprio" on public.questoes_respondidas;
create policy "respondidas_select_proprio"
  on public.questoes_respondidas for select using (auth.uid() = user_id);

drop policy if exists "respondidas_insert_proprio" on public.questoes_respondidas;
create policy "respondidas_insert_proprio"
  on public.questoes_respondidas for insert with check (auth.uid() = user_id);

drop policy if exists "palavras_select" on public.palavras_bloqueadas;
create policy "palavras_select" on public.palavras_bloqueadas for select using (true);

-- ---------------------------------------------------------------------------
-- Funções administrativas (SECURITY DEFINER com checagem de papel de quem chama)
-- ---------------------------------------------------------------------------

-- Promover/rebaixar papel: só ADM.
create or replace function public.promote_user(target_username text, new_role text)
returns void
language plpgsql
security definer set search_path = public
as $$
begin
  if (select role from public.profiles where id = auth.uid()) <> 'adm' then
    raise exception 'apenas ADM pode alterar papéis';
  end if;
  if new_role not in ('aluno', 'coordenador', 'adm') then
    raise exception 'papel inválido: %', new_role;
  end if;
  update public.profiles set role = new_role where username = lower(target_username);
  if not found then
    raise exception 'usuário % não encontrado', target_username;
  end if;
end;
$$;

-- Criar sala: só ADM.
create or replace function public.criar_sala(p_nome text, p_ano int, p_curso_slug text default null)
returns uuid
language plpgsql
security definer set search_path = public
as $$
declare
  v_curso uuid;
  v_id uuid;
begin
  if (select role from public.profiles where id = auth.uid()) <> 'adm' then
    raise exception 'apenas ADM pode criar salas';
  end if;
  if p_curso_slug is not null then
    select id into v_curso from public.cursos where slug = p_curso_slug;
    if v_curso is null then
      raise exception 'curso % não existe', p_curso_slug;
    end if;
  end if;
  insert into public.salas (nome, ano, curso_id)
  values (p_nome, p_ano, v_curso)
  returning id into v_id;
  return v_id;
end;
$$;

-- Limpar a flag de primeiro acesso: cada um só limpa a própria.
create or replace function public.clear_must_change_password()
returns void
language plpgsql
security definer set search_path = public
as $$
begin
  update public.profiles set must_change_password = false where id = auth.uid();
end;
$$;
