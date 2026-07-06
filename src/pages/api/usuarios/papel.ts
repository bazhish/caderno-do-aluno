// Trocar papel de uma conta — só ADM. As regras finas moram na promote_user:
// o papel do fundador é intocável e mexer em outro ADM exige ser o fundador.
// É por aqui que se trocam os coordenadores de uma sala (eleição nova etc.).
import type { APIRoute } from 'astro';
import { createSupabaseServer, origemSuspeita } from '../../../lib/supabaseServer';

const json = (status: number, body: object) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { 'Content-Type': 'application/json' },
  });

const PAPEIS = ['aluno', 'professor', 'coordenador', 'adm'];

export const POST: APIRoute = async (context) => {
  if (origemSuspeita(context.request, context.url)) return json(403, { error: 'Origem não permitida.' });
  const requester = context.locals.user;
  if (!requester || requester.role !== 'adm') {
    return json(403, { error: 'Só o ADM troca papéis.' });
  }

  let payload: { username?: string; papel?: string };
  try {
    payload = await context.request.json();
  } catch {
    return json(400, { error: 'Corpo inválido.' });
  }
  const username = String(payload.username ?? '').trim().toLowerCase();
  const papel = String(payload.papel ?? '');
  if (!username) return json(400, { error: 'Informe o username.' });
  if (!PAPEIS.includes(papel)) return json(400, { error: 'Papel inválido.' });

  const supabase = createSupabaseServer(context);
  const { error } = await supabase.rpc('promote_user', {
    target_username: username,
    new_role: papel,
  });
  if (error) return json(400, { error: error.message });

  return json(200, { ok: true, username, papel });
};
