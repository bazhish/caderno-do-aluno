-- ============================================================================
-- Caderno da Turma — schema v3 (fase 2: tempo real, censura, banco de questões)
-- Roda por cima do v1 + v2 (idempotente).
-- ============================================================================

-- ---------------------------------------------------------------------------
-- Tempo real: comentários novos chegam via postgres_changes (INSERT).
-- (Soft delete não passa na RLS do postgres_changes; a moderação avisa os
-- outros clientes via broadcast no mesmo canal — ver commentsBackend.js.)
-- ---------------------------------------------------------------------------
do $$
begin
  alter publication supabase_realtime add table public.comments;
exception
  when duplicate_object then null;
end $$;

-- ---------------------------------------------------------------------------
-- Censura automática: trigger BEFORE INSERT barra comentário com palavra
-- bloqueada NO SERVIDOR (o aviso amigável do front é só cortesia — a barreira
-- de verdade é esta). Comparação sem acento e sem caixa.
-- ---------------------------------------------------------------------------
create extension if not exists unaccent;

create or replace function public.verificar_palavras_bloqueadas()
returns trigger
language plpgsql
security definer set search_path = public
as $$
declare
  corpo text;
begin
  corpo := lower(public.unaccent(new.body));
  if exists (
    select 1 from public.palavras_bloqueadas p
    where corpo ~ ('\m' || p.termo || '\M')
  ) then
    raise exception 'PALAVRA_BLOQUEADA';
  end if;
  return new;
end;
$$;

drop trigger if exists comments_censura on public.comments;
create trigger comments_censura
  before insert or update of body on public.comments
  for each row execute function public.verificar_palavras_bloqueadas();

-- Lista inicial (termos normalizados: minúsculas, sem acento). O ADM mantém
-- esta tabela — dá pra inserir/remover termos direto no Table Editor.
insert into public.palavras_bloqueadas (termo) values
  ('caralho'), ('porra'), ('buceta'), ('puta'), ('putinha'), ('arrombado'),
  ('arrombada'), ('desgracado'), ('desgracada'), ('vagabunda'), ('vadia'),
  ('fdp'), ('foda-se'), ('fodase'), ('foder'), ('cuzao'), ('viado'),
  ('boiola'), ('baitola'), ('bicha'), ('traveco'), ('sapatao'), ('crioulo'),
  ('retardado'), ('retardada'), ('mongoloide')
on conflict (termo) do nothing;

-- ---------------------------------------------------------------------------
-- Banco de questões: quem posta conteúdo (coordenador/ADM) gerencia questões;
-- aluno pode apagar o próprio histórico ("recomeçar do zero").
-- ---------------------------------------------------------------------------
drop policy if exists "questoes_write_moderacao" on public.questoes;
create policy "questoes_write_moderacao"
  on public.questoes for all
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

drop policy if exists "respondidas_delete_proprio" on public.questoes_respondidas;
create policy "respondidas_delete_proprio"
  on public.questoes_respondidas for delete
  using (auth.uid() = user_id);

-- ---------------------------------------------------------------------------
-- Apagar comentário (soft delete) via função com checagem explícita.
-- Motivo: o PostgREST valida a linha ATUALIZADA contra o policy de SELECT
-- (RETURNING interno) — e a linha soft-deletada falha em "deleted_at is null",
-- estourando 42501 mesmo pro dono. A função SECURITY DEFINER contorna isso e
-- de quebra dá poder de moderação ao coordenador (não só ao ADM).
-- ---------------------------------------------------------------------------
create or replace function public.apagar_comentario(p_comment_id uuid)
returns void
language plpgsql
security definer set search_path = public
as $$
declare
  v_owner uuid;
  v_role text;
begin
  select user_id into v_owner from public.comments where id = p_comment_id;
  if v_owner is null then
    raise exception 'comentário não encontrado';
  end if;
  select role into v_role from public.profiles where id = auth.uid();
  if auth.uid() = v_owner or v_role in ('adm', 'coordenador') then
    update public.comments set deleted_at = now() where id = p_comment_id;
  else
    raise exception 'sem permissão para apagar este comentário';
  end if;
end;
$$;
