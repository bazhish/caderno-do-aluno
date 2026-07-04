// Banco de questões do quiz (lado do navegador). Cada aluno recebe um sorteio
// próprio das questões da aula, e o que ele já respondeu fica registrado em
// questoes_respondidas — refazer o quiz traz só questões que ele ainda não viu.
// Sem Supabase configurado (ou sem sessão), o quiz cai no modo "fallback":
// usa as questões do frontmatter da aula, sem registrar nada.
import { createBrowserClient } from '@supabase/ssr';

const SUPABASE_URL = import.meta.env.PUBLIC_SUPABASE_URL;
const SUPABASE_ANON_KEY = import.meta.env.PUBLIC_SUPABASE_ANON_KEY;

const isDemo = !SUPABASE_URL || !SUPABASE_ANON_KEY;

let supabase = null;
function getSupabase() {
  if (!supabase) supabase = createBrowserClient(SUPABASE_URL, SUPABASE_ANON_KEY);
  return supabase;
}

function embaralhar(lista) {
  for (let i = lista.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [lista[i], lista[j]] = [lista[j], lista[i]];
  }
  return lista;
}

async function getUserId() {
  const { data } = await getSupabase().auth.getSession();
  return data.session?.user?.id ?? null;
}

export const quizBank = {
  // Sorteia até `limite` questões da aula que o aluno ainda não respondeu.
  // Retorna { modo: 'banco' | 'fallback' | 'esgotado', ... }.
  async sortear(slug, limite = 5) {
    if (isDemo || !slug) return { modo: 'fallback' };
    try {
      const sb = getSupabase();
      const userId = await getUserId();
      if (!userId) return { modo: 'fallback' };

      const { data: todas, error } = await sb
        .from('questoes')
        .select('id, enunciado, alternativas, correct_index, explicacao, fonte')
        .eq('lesson_slug', slug);
      if (error || !todas || todas.length === 0) return { modo: 'fallback' };

      const { data: respondidas } = await sb
        .from('questoes_respondidas')
        .select('questao_id')
        .eq('user_id', userId);
      const vistas = new Set((respondidas ?? []).map((r) => r.questao_id));

      const restantes = todas.filter((q) => !vistas.has(q.id));
      if (restantes.length === 0) return { modo: 'esgotado', total: todas.length };

      const sorteadas = embaralhar(restantes)
        .slice(0, limite)
        .map((q) => ({
          id: q.id,
          question: q.enunciado,
          options: q.alternativas,
          correctIndex: q.correct_index,
          explanation: q.explicacao,
          source: q.fonte,
        }));

      return {
        modo: 'banco',
        questoes: sorteadas,
        naoRespondidas: restantes.length,
        total: todas.length,
      };
    } catch {
      return { modo: 'fallback' };
    }
  },

  // Registra que o aluno corrigiu esta questão (não volta em sorteios futuros).
  async registrar(questaoId, acertou) {
    if (isDemo) return;
    try {
      const sb = getSupabase();
      const userId = await getUserId();
      if (!userId) return;
      await sb
        .from('questoes_respondidas')
        .upsert({ user_id: userId, questao_id: questaoId, acertou }, { onConflict: 'user_id,questao_id' });
    } catch {
      // registro é melhor-esforço; o quiz continua funcionando sem ele
    }
  },

  // Apaga o histórico do aluno nesta aula — todas as questões voltam ao sorteio.
  async recomecar(slug) {
    if (isDemo) return;
    try {
      const sb = getSupabase();
      const userId = await getUserId();
      if (!userId) return;
      const { data: ids } = await sb.from('questoes').select('id').eq('lesson_slug', slug);
      if (!ids || ids.length === 0) return;
      await sb
        .from('questoes_respondidas')
        .delete()
        .eq('user_id', userId)
        .in('questao_id', ids.map((q) => q.id));
    } catch {
      // idem: melhor-esforço
    }
  },
};
