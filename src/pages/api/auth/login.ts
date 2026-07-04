import type { APIRoute } from 'astro';
import { createSupabaseServer, usernameParaEmail } from '../../../lib/supabaseServer';

export const POST: APIRoute = async (context) => {
  const form = await context.request.formData();
  const username = String(form.get('username') ?? '').trim().toLowerCase();
  const password = String(form.get('password') ?? '');

  if (!username || !password) return context.redirect('/login?erro=campos');

  const supabase = createSupabaseServer(context);
  const { error } = await supabase.auth.signInWithPassword({
    email: usernameParaEmail(username),
    password,
  });

  if (error) return context.redirect('/login?erro=credenciais');
  return context.redirect('/');
};
