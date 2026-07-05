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

  // Isolamento por sala: confere ANTES de apagar filhos (questões/atividades),
  // pra não deixar órfãos quando o RLS bloquearia a exclusão da aula. Coordenador
  // só exclui aula da própria sala; ENEM/legado (sem sala) é só do ADM.
  const { data: aula } = await supabase
    .from('lessons')
    .select('slug, sala_id')
    .eq('slug', slug)
    .maybeSingle();
  if (!aula) return json(404, { error: 'Aula não encontrada.' });
  if (requester.role === 'coordenador' && aula.sala_id !== requester.salaId) {
    return json(403, { error: 'Você só pode excluir aulas da sua sala.' });
  }

  // Questões e atividades vão junto; comentários ficam no banco (soft history).
  await supabase.from('questoes').delete().eq('lesson_slug', slug);
  await supabase.from('atividades').delete().eq('lesson_slug', slug);
  const { error } = await supabase.from('lessons').delete().eq('slug', slug);
  if (error) return json(500, { error: `Não deu pra excluir: ${error.message}` });

  return json(200, { ok: true });
};
