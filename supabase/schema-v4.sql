-- ============================================================================
-- Caderno da Turma — schema v4 (fase 3/4: aulas no banco, atividades, métricas)
-- Roda por cima do v1+v2+v3 (idempotente).
-- ============================================================================

-- ---------------------------------------------------------------------------
-- Aulas postadas pelo site (o conteúdo .mdx do repositório segue funcionando
-- como fonte "legada"; o slug é o mesmo formato nos dois mundos).
-- ---------------------------------------------------------------------------
create table if not exists public.lessons (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,                -- ex: enem/fisica/leis-de-newton
  categoria text not null check (categoria in ('enem', 'escolar', 'ds')),
  materia_slug text not null,
  materia_nome text not null,
  bimestre int check (bimestre between 1 and 4),
  semana int check (semana between 1 and 53),
  title text not null,
  relevance text not null default '',
  quick_summary text,
  body_md text not null default '',
  resources jsonb,
  ordem int not null default 1,
  status text not null default 'publicado' check (status in ('rascunho', 'publicado')),
  author_id uuid references public.profiles (id),
  sala_id uuid references public.salas (id),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists lessons_categoria_idx on public.lessons (categoria, materia_slug);

-- Atividades práticas do curso: roteiro em texto livre, sem correção
-- automática, exibidas DEPOIS do Pause e Responda.
create table if not exists public.atividades (
  id uuid primary key default gen_random_uuid(),
  lesson_slug text not null,
  titulo text not null,
  roteiro text not null,
  ordem int not null default 1
);

create index if not exists atividades_lesson_idx on public.atividades (lesson_slug, ordem);

-- ---------------------------------------------------------------------------
-- RLS
-- ---------------------------------------------------------------------------
alter table public.lessons enable row level security;
alter table public.atividades enable row level security;

-- Aula publicada é aberta pra todo mundo logado (e o middleware já exige
-- login no site inteiro). Rascunho só autor/moderação.
drop policy if exists "lessons_select" on public.lessons;
create policy "lessons_select"
  on public.lessons for select
  using (
    status = 'publicado'
    or author_id = auth.uid()
    or exists (
      select 1 from public.profiles p
      where p.id = auth.uid() and p.role in ('adm', 'coordenador')
    )
  );

drop policy if exists "lessons_write_moderacao" on public.lessons;
create policy "lessons_write_moderacao"
  on public.lessons for all
  using (
    exists (
      select 1 from public.profiles p
      where p.id = auth.uid() and p.role in ('adm', 'coordenador')
    )
  )
  with check (
    exists (
      select 1 from public.profiles p
      where p.id = auth.uid() and p.role in ('adm', 'coordenador')
    )
  );

drop policy if exists "atividades_select" on public.atividades;
create policy "atividades_select" on public.atividades for select using (true);

drop policy if exists "atividades_write_moderacao" on public.atividades;
create policy "atividades_write_moderacao"
  on public.atividades for all
  using (
    exists (
      select 1 from public.profiles p
      where p.id = auth.uid() and p.role in ('adm', 'coordenador')
    )
  )
  with check (
    exists (
      select 1 from public.profiles p
      where p.id = auth.uid() and p.role in ('adm', 'coordenador')
    )
  );

-- ---------------------------------------------------------------------------
-- Métricas do painel de gestão (contagens gerais; gateada por papel porque
-- questoes_respondidas tem RLS "só o próprio").
-- ---------------------------------------------------------------------------
create or replace function public.metricas_admin()
returns jsonb
language plpgsql
security definer set search_path = public
as $$
begin
  if (select role from public.profiles where id = auth.uid()) not in ('adm', 'coordenador') then
    raise exception 'apenas coordenador/ADM';
  end if;
  return jsonb_build_object(
    'usuarios', (select count(*) from public.profiles),
    'comentarios', (select count(*) from public.comments where deleted_at is null),
    'aulas_no_banco', (select count(*) from public.lessons where status = 'publicado'),
    'questoes', (select count(*) from public.questoes),
    'respostas_registradas', (select count(*) from public.questoes_respondidas)
  );
end;
$$;
