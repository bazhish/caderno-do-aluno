// Excluir conta — só ADM. As regras finas moram na função apagar_usuario:
// ninguém se auto-exclui, o fundador nunca é excluído, e excluir outro ADM
// exige ser o ADM fundador.
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
    return json(403, { error: 'Só o ADM exclui contas.' });
  }

  let payload: { username?: string };
  try {
    payload = await context.request.json();
  } catch {
    return json(400, { error: 'Corpo inválido.' });
  }
  const username = String(payload.username ?? '').trim().toLowerCase();
  if (!username) return json(400, { error: 'Informe o username.' });

  const supabase = createSupabaseServer(context);
  const { error } = await supabase.rpc('apagar_usuario', { target_username: username });
  if (error) return json(400, { error: error.message });

  return json(200, { ok: true, username });
};
