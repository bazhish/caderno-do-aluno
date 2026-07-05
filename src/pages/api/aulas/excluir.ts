import type { APIRoute } from 'astro';
import { createSupabaseServer } from '../../../lib/supabaseServer';

const json = (status: number, body: object) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { 'Content-Type': 'application/json' },
  });

export const POST: APIRoute = async (context) => {
  const requester = context.locals.user;
  if (!requester || (requester.role !== 'adm' && requester.role !== 'coordenador')) {
    return json(403, { error: 'Só coordenadores e ADMs excluem aulas.' });
  }

  let payload: { slug?: string };
  try {
    payload = await context.request.json();
  } catch {
    return json(400, { error: 'Corpo inválido.' });
  }
  const slug = String(payload.slug ?? '');
  if (!slug) return json(400, { error: 'Slug obrigatório.' });

  const supabase = createSupabaseServer(context);
  // Questões e atividades vão junto; comentários ficam no banco (soft history).
  await supabase.from('questoes').delete().eq('lesson_slug', slug);
  await supabase.from('atividades').delete().eq('lesson_slug', slug);
  const { error } = await supabase.from('lessons').delete().eq('slug', slug);
  if (error) return json(500, { error: `Não deu pra excluir: ${error.message}` });

  return json(200, { ok: true });
};
