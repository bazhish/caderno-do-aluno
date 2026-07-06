// Editar sala (nome/ano/curso) — só ADM. Escrita passa pela função
// editar_sala (SECURITY DEFINER); a tabela salas não tem policy de UPDATE.
import type { APIRoute } from 'astro';
import { createSupabaseServer, origemSuspeita } from '../../../lib/supabaseServer';

const json = (status: number, body: object) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { 'Content-Type': 'application/json' },
  });

export const POST: APIRoute = async (context) => {
  if (origemSuspeita(context.request, context.url)) return json(403, { error: 'Origem não permitida.' });
  const requester = context.locals.user;
  if (!requester || requester.role !== 'adm') {
    return json(403, { error: 'Só o ADM edita salas.' });
  }

  let payload: { id?: string; nome?: string; ano?: number; cursoSlug?: string };
  try {
    payload = await context.request.json();
  } catch {
    return json(400, { error: 'Corpo inválido.' });
  }

  const id = String(payload.id ?? '');
  const nome = (payload.nome ?? '').trim();
  const ano = Number(payload.ano);
  if (!id) return json(400, { error: 'Informe a sala.' });
  if (!nome || !(ano >= 1 && ano <= 3)) {
    return json(400, { error: 'Informe o nome da sala e o ano (1 a 3).' });
  }

  const supabase = createSupabaseServer(context);
  const { error } = await supabase.rpc('editar_sala', {
    p_id: id,
    p_nome: nome,
    p_ano: ano,
    p_curso_slug: payload.cursoSlug || null,
  });
  if (error) return json(400, { error: error.message });

  return json(200, { ok: true });
};
