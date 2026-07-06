// Troca a "sala em visão" (preferência de navegação, não permissão): o hub
// oferece as salas e este endpoint guarda a escolha num cookie. O conteúdo
// continua aberto — isso só muda qual material aparece por padrão nas listas.
import type { APIRoute } from 'astro';

const COOKIE = 'cdt-sala-visao';
const UUID_RULE = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

export const GET: APIRoute = async (context) => {
  const id = context.url.searchParams.get('id') ?? '';

  if (UUID_RULE.test(id)) {
    context.cookies.set(COOKIE, id, {
      path: '/',
      maxAge: 60 * 60 * 24 * 180,
      sameSite: 'lax',
      httpOnly: true,
    });
  } else {
    // id vazio/inválido = voltar ao padrão (a própria sala do usuário)
    context.cookies.delete(COOKIE, { path: '/' });
  }

  return context.redirect('/');
};
