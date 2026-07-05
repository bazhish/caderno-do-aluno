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
    return json(403, { error: 'Só o ADM cria salas.' });
  }

  let payload: { nome?: string; ano?: number; cursoSlug?: string };
  try {
    payload = await context.request.json();
  } catch {
    return json(400, { error: 'Corpo inválido.' });
  }

  const nome = (payload.nome ?? '').trim();
  const ano = Number(payload.ano);
  if (!nome || !(ano >= 1 && ano <= 3)) {
    return json(400, { error: 'Informe o nome da sala e o ano (1 a 3).' });
  }

  const supabase = createSupabaseServer(context);
  const { data, error } = await supabase.rpc('criar_sala', {
    p_nome: nome,
    p_ano: ano,
    p_curso_slug: payload.cursoSlug || null,
  });

  if (error) return json(500, { error: error.message });
  return json(200, { ok: true, salaId: data });
};
