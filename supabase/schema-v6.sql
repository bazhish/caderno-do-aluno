-- ============================================================================
-- Caderno da Turma — schema v6 (gestão completa de salas)
-- Roda por cima do v1..v5 (idempotente). Até aqui só existia criar_sala —
-- faltava editar e excluir. Como a tabela salas não tem policy de UPDATE/DELETE
-- (só "salas_select"), a escrita só acontece por função SECURITY DEFINER,
-- igual ao padrão já usado em criar_sala/promote_user/apagar_usuario.
-- ============================================================================

-- Editar sala: nome, ano e curso. Só ADM.
create or replace function public.editar_sala(
  p_id uuid,
  p_nome text,
  p_ano int,
  p_curso_slug text default null
)
returns void
language plpgsql
security definer set search_path = public
as $$
declare
  v_curso uuid;
begin
  if (select role from public.profiles where id = auth.uid()) <> 'adm' then
    raise exception 'apenas ADM pode editar salas';
  end if;
  if p_ano is null or p_ano < 1 or p_ano > 3 then
    raise exception 'ano inválido: %', p_ano;
  end if;
  if p_curso_slug is not null then
    select id into v_curso from public.cursos where slug = p_curso_slug;
    if v_curso is null then
      raise exception 'curso % não existe', p_curso_slug;
    end if;
  end if;

  update public.salas set nome = p_nome, ano = p_ano, curso_id = v_curso where id = p_id;
  if not found then
    raise exception 'sala não encontrada';
  end if;
end;
$$;

-- Excluir sala: só ADM, e só se não houver conta ou aula vinculada (mensagem
-- clara em vez de deixar a FK do banco estourar um erro genérico).
create or replace function public.excluir_sala(p_id uuid)
returns void
language plpgsql
security definer set search_path = public
as $$
declare
  v_contas int;
  v_aulas int;
begin
  if (select role from public.profiles where id = auth.uid()) <> 'adm' then
    raise exception 'apenas ADM pode excluir salas';
  end if;

  select count(*) into v_contas from public.profiles where sala_id = p_id;
  if v_contas > 0 then
    raise exception 'a sala tem % conta(s) vinculada(s) — mude a sala delas antes de excluir', v_contas;
  end if;

  select count(*) into v_aulas from public.lessons where sala_id = p_id;
  if v_aulas > 0 then
    raise exception 'a sala tem % aula(s) postada(s) — mova ou apague as aulas antes de excluir', v_aulas;
  end if;

  delete from public.salas where id = p_id;
  if not found then
    raise exception 'sala não encontrada';
  end if;
end;
$$;
