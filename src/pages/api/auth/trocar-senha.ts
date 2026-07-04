import type { APIRoute } from 'astro';
import { createSupabaseServer } from '../../../lib/supabaseServer';

export const POST: APIRoute = async (context) => {
  const form = await context.request.formData();
  const senha = String(form.get('senha') ?? '');
  const confirma = String(form.get('confirma') ?? '');

  if (senha.length < 6) return context.redirect('/trocar-senha?erro=curta');
  if (senha !== confirma) return context.redirect('/trocar-senha?erro=diferentes');

  const supabase = createSupabaseServer(context);
  const { error } = await supabase.auth.updateUser({ password: senha });
  if (error) return context.redirect('/trocar-senha?erro=falha');

  // Limpa a flag de primeiro acesso (função SECURITY DEFINER, só mexe no próprio perfil).
  await supabase.rpc('clear_must_change_password');

  return context.redirect('/');
};
