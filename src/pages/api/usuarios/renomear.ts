// Renomear username — só ADM. A função renomear_usuario atualiza o perfil E o
// e-mail sintético do Auth (senão o login com o nome novo quebra).
import type { APIRoute } from 'astro';
import { createSupabaseServer, origemSuspeita, USERNAME_RULE } from '../../../lib/supabaseServer';

const json = (status: number, body: object) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { 'Content-Type': 'application/json' },
  });

export const POST: APIRoute = async (context) => {
  if (origemSuspeita(context.request, context.url)) return json(403, { error: 'Origem não permitida.' });
  const requester = context.locals.user;
  if (!requester || requester.role !== 'adm') {
    return json(403, { error: 'Só o ADM renomeia contas.' });
  }

  let payload: { username?: string; novoUsername?: string };
  try {
    payload = await context.request.json();
  } catch {
    return json(400, { error: 'Corpo inválido.' });
  }
  const username = String(payload.username ?? '').trim().toLowerCase();
  const novoUsername = String(payload.novoUsername ?? '').trim().toLowerCase();
  if (!username || !novoUsername) return json(400, { error: 'Informe o username atual e o novo.' });
  if (!USERNAME_RULE.test(novoUsername)) {
    return json(400, {
      error: 'Username inválido: 3 a 30 caracteres, só minúsculas, números, ponto, hífen ou underline.',
    });
  }

  const supabase = createSupabaseServer(context);
  const { error } = await supabase.rpc('renomear_usuario', {
    target_username: username,
    novo_username: novoUsername,
  });
  if (error) return json(400, { error: error.message });

  return json(200, { ok: true, username: novoUsername });
};
