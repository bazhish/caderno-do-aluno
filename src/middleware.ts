// Portão de entrada do site: sem sessão válida, nada além de /login é servido.
// A troca de senha do primeiro acesso também é forçada aqui.
import { defineMiddleware } from 'astro:middleware';
import { createSupabaseServer, supabaseConfigured } from './lib/supabaseServer';

const PUBLIC_PATHS = [
  /^\/login\/?$/,
  /^\/api\/auth\/login\/?$/,
  /^\/_astro\//,
  /^\/_image/,
  // Estáticos de raiz (ícones, robots, manifest) — servidos pra aba do
  // navegador e crawlers antes do login. Só extensões de asset, nada sensível.
  /^\/[\w.-]+\.(?:svg|png|jpe?g|ico|webp|txt|xml|webmanifest|json)$/i,
];

export const onRequest = defineMiddleware(async (context, next) => {
  context.locals.user = null;

  // Sem Supabase configurado (ex: build local sem .env), site fica aberto.
  if (!supabaseConfigured) return next();

  const { pathname } = context.url;
  if (PUBLIC_PATHS.some((re) => re.test(pathname))) return next();

  const supabase = createSupabaseServer(context);
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    if (pathname.startsWith('/api/')) {
      return new Response(JSON.stringify({ error: 'não autenticado' }), {
        status: 401,
        headers: { 'Content-Type': 'application/json' },
      });
    }
    return context.redirect('/login');
  }

  const { data: profile } = await supabase
    .from('profiles')
    .select('username, role, sala_id, must_change_password')
    .eq('id', user.id)
    .maybeSingle();

  context.locals.user = {
    id: user.id,
    username: profile?.username ?? '',
    role: (profile?.role ?? 'aluno') as 'aluno' | 'coordenador' | 'adm',
    salaId: profile?.sala_id ?? null,
    mustChangePassword: profile?.must_change_password ?? false,
  };

  if (
    context.locals.user?.mustChangePassword &&
    pathname !== '/trocar-senha' &&
    !pathname.startsWith('/api/auth/')
  ) {
    return context.redirect('/trocar-senha');
  }

  return next();
});
