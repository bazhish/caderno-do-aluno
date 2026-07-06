// Excluir sala — só ADM. A função excluir_sala barra (com mensagem clara) se
// houver conta ou aula vinculada, em vez de deixar a FK do banco estourar.
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
    return json(403, { error: 'Só o ADM exclui salas.' });
  }

  let payload: { id?: string };
  try {
    payload = await context.request.json();
  } catch {
    return json(400, { error: 'Corpo inválido.' });
  }
  const id = String(payload.id ?? '');
  if (!id) return json(400, { error: 'Informe a sala.' });

  const supabase = createSupabaseServer(context);
  const { error } = await supabase.rpc('excluir_sala', { p_id: id });
  if (error) return json(400, { error: error.message });

  return json(200, { ok: true });
};
