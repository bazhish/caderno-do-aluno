import type { APIRoute } from 'astro';
import { createSupabaseServer, origemSuspeita } from '../../../lib/supabaseServer';

export const POST: APIRoute = async (context) => {
  if (origemSuspeita(context.request, context.url)) return context.redirect('/');
  const supabase = createSupabaseServer(context);
  await supabase.auth.signOut();
  return context.redirect('/login');
};
