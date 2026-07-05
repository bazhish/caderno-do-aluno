// Criar/editar aula pelo site — só coordenador/ADM (RLS reforça no banco).
// Na edição os campos que formam o slug ficam travados (renomear slug
// quebraria comentários e questões atrelados a ele).
import type { APIRoute } from 'astro';
import { createSupabaseServer } from '../../../lib/supabaseServer';

const json = (status: number, body: object) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { 'Content-Type': 'application/json' },
  });

const SLUG_RULE = /^[a-z0-9][a-z0-9-]*$/;

interface QuestaoPayload {
  enunciado?: string;
  alternativas?: string[];
  correta?: number;
  explicacao?: string;
  fonte?: string;
}

export const POST: APIRoute = async (context) => {
  const requester = context.locals.user;
  if (!requester || (requester.role !== 'adm' && requester.role !== 'coordenador')) {
    return json(403, { error: 'Só coordenadores e ADMs postam aulas.' });
  }

  let p: any;
  try {
    p = await context.request.json();
  } catch {
    return json(400, { error: 'Corpo inválido.' });
  }

  const modo = p.modo === 'editar' ? 'editar' : 'criar';
  const title = String(p.title ?? '').trim();
  const relevance = String(p.relevance ?? '').trim();
  const bodyMd = String(p.bodyMd ?? '').trim();
  const status = p.status === 'rascunho' ? 'rascunho' : 'publicado';

  if (!title) return json(400, { error: 'A aula precisa de um título.' });
  if (!relevance) return json(400, { error: 'Preencha a relevância (por que este tema importa).' });
  if (!bodyMd) return json(400, { error: 'A aula precisa do conteúdo teórico.' });

  const questoes: QuestaoPayload[] = Array.isArray(p.questoes) ? p.questoes : [];
  for (const [i, q] of questoes.entries()) {
    if (!q.enunciado?.trim()) return json(400, { error: `Questão ${i + 1}: falta o enunciado.` });
    if (!Array.isArray(q.alternativas) || q.alternativas.filter((a) => a?.trim()).length !== 5) {
      return json(400, { error: `Questão ${i + 1}: preencha as 5 alternativas.` });
    }
    const correta = Number(q.correta);
    if (!(correta >= 0 && correta <= 4)) {
      return json(400, { error: `Questão ${i + 1}: marque a alternativa correta.` });
    }
    if (!q.explicacao?.trim()) {
      return json(400, { error: `Questão ${i + 1}: escreva a explicação da resposta.` });
    }
  }

  const atividades: { titulo?: string; roteiro?: string }[] = Array.isArray(p.atividades)
    ? p.atividades
    : [];
  for (const [i, a] of atividades.entries()) {
    if (!a.titulo?.trim() || !a.roteiro?.trim()) {
      return json(400, { error: `Atividade ${i + 1}: preencha título e roteiro.` });
    }
  }

  const supabase = createSupabaseServer(context);
  let slug: string;
  let materiaNome: string;
  let materiaSlug: string;
  let categoria: string;
  let bimestre: number | null = null;
  let semana: number | null = null;

  if (modo === 'editar') {
    slug = String(p.slugOriginal ?? '');
    const { data: existente } = await supabase
      .from('lessons')
      .select('slug, categoria, materia_slug, materia_nome, bimestre, semana')
      .eq('slug', slug)
      .maybeSingle();
    if (!existente) return json(404, { error: 'Aula não encontrada pra editar.' });
    categoria = existente.categoria;
    materiaSlug = existente.materia_slug;
    materiaNome = String(p.materiaNome ?? existente.materia_nome).trim() || existente.materia_nome;
    bimestre = existente.bimestre;
    semana = existente.semana;
  } else {
    categoria = ['enem', 'escolar', 'ds'].includes(p.categoria) ? p.categoria : '';
    materiaNome = String(p.materiaNome ?? '').trim();
    materiaSlug = String(p.materiaSlug ?? '').trim().toLowerCase();
    const temaSlug = String(p.temaSlug ?? '').trim().toLowerCase();
    if (!categoria) return json(400, { error: 'Escolha a categoria.' });
    if (!materiaNome) return json(400, { error: 'Informe o nome da matéria.' });
    if (!SLUG_RULE.test(materiaSlug) || !SLUG_RULE.test(temaSlug)) {
      return json(400, {
        error: 'Slugs devem ter só letras minúsculas, números e hífen (sem acento, sem espaço).',
      });
    }
    if (categoria === 'enem') {
      slug = `enem/${materiaSlug}/${temaSlug}`;
    } else {
      bimestre = Number(p.bimestre);
      semana = Number(p.semana);
      if (!(bimestre >= 1 && bimestre <= 4)) return json(400, { error: 'Escolha o bimestre.' });
      if (!(semana >= 1 && semana <= 53)) return json(400, { error: 'Informe a semana (1 a 53).' });
      slug = `${categoria}/${materiaSlug}/${bimestre}-bimestre/semana-${String(semana).padStart(2, '0')}-${temaSlug}`;
    }
    const { data: colisao } = await supabase
      .from('lessons')
      .select('slug')
      .eq('slug', slug)
      .maybeSingle();
    if (colisao) {
      return json(409, { error: `Já existe uma aula com este endereço (${slug}). Mude o slug do tema.` });
    }
  }

  const registro = {
    slug,
    categoria,
    materia_slug: materiaSlug,
    materia_nome: materiaNome,
    bimestre,
    semana,
    title,
    relevance,
    quick_summary: String(p.quickSummary ?? '').trim() || null,
    body_md: bodyMd,
    resources: p.resources ?? null,
    status,
    author_id: requester.id,
    sala_id: categoria === 'enem' ? null : requester.salaId,
    updated_at: new Date().toISOString(),
  };

  const { error: lessonError } =
    modo === 'editar'
      ? await supabase.from('lessons').update(registro).eq('slug', slug)
      : await supabase.from('lessons').insert(registro);
  if (lessonError) return json(500, { error: `Não deu pra salvar a aula: ${lessonError.message}` });

  // Questões: na criação insere; na edição só se pediu substituição
  // (substituir zera o histórico dos alunos nessa aula — o form avisa).
  if (questoes.length > 0 && (modo === 'criar' || p.substituirQuestoes)) {
    if (modo === 'editar') await supabase.from('questoes').delete().eq('lesson_slug', slug);
    const { error: qError } = await supabase.from('questoes').insert(
      questoes.map((q) => ({
        lesson_slug: slug,
        enunciado: q.enunciado!.trim(),
        alternativas: q.alternativas!.map((a) => a.trim()),
        correct_index: Number(q.correta),
        explicacao: q.explicacao!.trim(),
        fonte: q.fonte?.trim() || null,
      }))
    );
    if (qError) return json(500, { error: `Aula salva, mas as questões falharam: ${qError.message}` });
  }

  // Atividades: sempre substitui (não têm histórico atrelado).
  await supabase.from('atividades').delete().eq('lesson_slug', slug);
  if (atividades.length > 0) {
    const { error: aError } = await supabase.from('atividades').insert(
      atividades.map((a, i) => ({
        lesson_slug: slug,
        titulo: a.titulo!.trim(),
        roteiro: a.roteiro!.trim(),
        ordem: i + 1,
      }))
    );
    if (aError) return json(500, { error: `Aula salva, mas as atividades falharam: ${aError.message}` });
  }

  return json(200, { ok: true, slug, url: `/${slug}/` });
};
