-- ============================================================================
-- Caderno da Turma — schema do banco (Supabase)
--
-- PASSO A PASSO PRA ATIVAR O MODO REAL:
--   1. Crie uma conta gratuita em https://supabase.com e um projeto novo.
--   2. No painel do projeto: SQL Editor → New query → cole este arquivo
--      inteiro → Run.
--   3. Em Authentication → Providers → Email: pra testar sem servidor de
--      e-mail, desative "Confirm email" (dá pra reativar depois).
--   4. Em Settings → API, copie a "Project URL" e a chave "anon public".
--   5. Na raiz do projeto, crie um arquivo .env (copie do .env.example) com:
--        PUBLIC_SUPABASE_URL="https://SEU-PROJETO.supabase.co"
--        PUBLIC_SUPABASE_ANON_KEY="sua-chave-anon"
--   6. Reinicie o `npm run dev`. O aviso de "modo demonstração" some e os
--      comentários passam a ser salvos no banco de verdade.
--   7. Pra promover alguém a ADM: Table Editor → profiles → mude o campo
--      "role" da pessoa para 'adm'.
-- ============================================================================

-- ---------------------------------------------------------------------------
-- Perfis: 1 linha por usuário, criada automaticamente no cadastro (trigger).
-- O username é único no banco — impossível duplicar, mesmo em corrida.
-- ---------------------------------------------------------------------------
create table if not exists public.profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  username text not null unique
    check (username ~ '^[a-z0-9][a-z0-9._-]{2,19}$'),
  role text not null default 'aluno' check (role in ('aluno', 'coordenador', 'adm')),
  created_at timestamptz not null default now()
);

-- ---------------------------------------------------------------------------
-- Comentários: presos a uma aula pelo lesson_slug (ex: "enem/fisica/cinematica").
-- Apagar é soft delete (deleted_at) — o histórico fica pra auditoria.
-- ---------------------------------------------------------------------------
create table if not exists public.comments (
  id uuid primary key default gen_random_uuid(),
  lesson_slug text not null,
  user_id uuid not null references public.profiles (id) on delete cascade,
  body text not null check (char_length(body) between 1 and 1000),
  created_at timestamptz not null default now(),
  deleted_at timestamptz
);

create index if not exists comments_lesson_idx
  on public.comments (lesson_slug, created_at)
  where deleted_at is null;

-- ---------------------------------------------------------------------------
-- Trigger: cria o profile na hora do cadastro, usando o username enviado
-- pelo site em options.data.username. Se o username já existir, o cadastro
-- inteiro falha (garantia de unicidade no servidor, não só na interface).
-- ---------------------------------------------------------------------------
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  insert into public.profiles (id, username)
  values (new.id, lower(new.raw_user_meta_data ->> 'username'));
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- ---------------------------------------------------------------------------
-- RLS: a segurança de verdade mora aqui (a interface nunca é a barreira).
-- ---------------------------------------------------------------------------
alter table public.profiles enable row level security;
alter table public.comments enable row level security;

-- Perfis: qualquer pessoa lê (pra mostrar username nos comentários);
-- ninguém altera perfil pelo site (role só muda pelo painel do Supabase).
create policy "profiles_select_all"
  on public.profiles for select
  using (true);

-- Comentários: qualquer pessoa lê os não-apagados (visitante sem login lê).
create policy "comments_select_visiveis"
  on public.comments for select
  using (deleted_at is null);

-- Só usuário logado comenta, e sempre em nome próprio.
create policy "comments_insert_proprio"
  on public.comments for insert
  with check (auth.uid() = user_id);

-- Apagar (soft delete): o dono do comentário ou um ADM.
create policy "comments_update_dono_ou_adm"
  on public.comments for update
  using (
    auth.uid() = user_id
    or exists (
      select 1 from public.profiles p
      where p.id = auth.uid() and p.role = 'adm'
    )
  );
