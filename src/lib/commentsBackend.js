// Backend dos comentários (lado do navegador). O login agora é do site inteiro
// (cookie de sessão, definido pelo servidor em /login) — o cliente
// createBrowserClient do @supabase/ssr lê a MESMA sessão dos cookies, então a
// ilha de comentários não tem mais formulário próprio de conta.
//
// Sem Supabase configurado (dev local sem .env), cai num modo demonstração
// com localStorage e uma sessão fake, só pra visualizar o fluxo.
import { createBrowserClient } from '@supabase/ssr';

const SUPABASE_URL = import.meta.env.PUBLIC_SUPABASE_URL;
const SUPABASE_ANON_KEY = import.meta.env.PUBLIC_SUPABASE_ANON_KEY;

export const isDemo = !SUPABASE_URL || !SUPABASE_ANON_KEY;

/* ------------------------------------------------------------------ */
/* Modo demonstração (localStorage)                                    */
/* ------------------------------------------------------------------ */

const LS_COMMENTS = 'cda:demo:comments';

function lsGet(key, fallback) {
  try {
    return JSON.parse(localStorage.getItem(key)) ?? fallback;
  } catch {
    return fallback;
  }
}
function lsSet(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

const DEMO_USER = { id: 'demo', username: 'demo', role: 'adm' };

const demoBackend = {
  async getSession() {
    return { data: { user: DEMO_USER } };
  },

  subscribe() {
    return () => {};
  },

  async listComments(slug) {
    const all = lsGet(LS_COMMENTS, []);
    const list = all
      .filter((c) => c.lesson_slug === slug && !c.deleted)
      .sort((a, b) => new Date(a.created_at) - new Date(b.created_at));
    return { data: list };
  },

  async addComment(slug, body) {
    const text = (body ?? '').trim();
    if (!text) return { error: 'Escreva alguma coisa antes de enviar.' };
    if (text.length > 1000) return { error: 'O comentário pode ter no máximo 1000 caracteres.' };
    const all = lsGet(LS_COMMENTS, []);
    all.push({
      id: crypto.randomUUID(),
      lesson_slug: slug,
      user_id: DEMO_USER.id,
      username: DEMO_USER.username,
      role: DEMO_USER.role,
      body: text,
      created_at: new Date().toISOString(),
      deleted: false,
    });
    lsSet(LS_COMMENTS, all);
    return { data: true };
  },

  async deleteComment(_slug, id) {
    const all = lsGet(LS_COMMENTS, []);
    const comment = all.find((c) => c.id === id);
    if (comment) comment.deleted = true;
    lsSet(LS_COMMENTS, all);
    return { data: true };
  },
};

/* ------------------------------------------------------------------ */
/* Modo real (Supabase, sessão compartilhada via cookies)              */
/* ------------------------------------------------------------------ */

let supabase = null;
function getSupabase() {
  if (!supabase) supabase = createBrowserClient(SUPABASE_URL, SUPABASE_ANON_KEY);
  return supabase;
}

// Censura automática: pré-checagem amigável no navegador. A barreira de
// verdade é o trigger comments_censura no banco (schema-v3.sql) — aqui é só
// pra dar a mensagem bonita sem ida ao servidor.
const MSG_CENSURA =
  'Seu comentário contém uma palavra bloqueada. Reescreva com respeito 🙂';

let palavrasCache = null;
async function getPalavrasBloqueadas() {
  if (!palavrasCache) {
    const { data } = await getSupabase().from('palavras_bloqueadas').select('termo');
    palavrasCache = (data ?? []).map((p) => p.termo);
  }
  return palavrasCache;
}

function temPalavraBloqueada(texto, palavras) {
  const norm = texto
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase();
  return palavras.some((termo) => {
    const escapado = termo.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    return new RegExp(`\\b${escapado}\\b`).test(norm);
  });
}

// Canais de tempo real ativos, por aula — reusados pra enviar o broadcast de
// moderação (o soft delete não passa na RLS do postgres_changes).
const activeChannels = new Map();

const supabaseBackend = {
  async getSession() {
    const sb = getSupabase();
    const { data } = await sb.auth.getSession();
    if (!data.session) return { data: null };
    const { data: profile } = await sb
      .from('profiles')
      .select('username, role')
      .eq('id', data.session.user.id)
      .maybeSingle();
    return {
      data: {
        user: {
          id: data.session.user.id,
          username: profile?.username ?? '(sem perfil)',
          role: profile?.role ?? 'aluno',
        },
      },
    };
  },

  async listComments(slug) {
    const sb = getSupabase();
    const { data, error } = await sb
      .from('comments')
      .select('id, body, created_at, user_id, profiles(username, role)')
      .eq('lesson_slug', slug)
      .is('deleted_at', null)
      .order('created_at', { ascending: true });
    if (error) return { error: 'Não deu pra carregar os comentários. Tente de novo.' };
    return {
      data: (data ?? []).map((c) => ({
        id: c.id,
        body: c.body,
        created_at: c.created_at,
        user_id: c.user_id,
        username: c.profiles?.username ?? '(aluno)',
        role: c.profiles?.role ?? 'aluno',
      })),
    };
  },

  // Tempo real: comentários novos chegam via postgres_changes; ações de
  // moderação chegam via broadcast no mesmo canal. Retorna o unsubscribe.
  subscribe(slug, onChange) {
    const sb = getSupabase();
    const channel = sb
      .channel(`comments:${slug}`)
      .on(
        'postgres_changes',
        { event: 'INSERT', schema: 'public', table: 'comments', filter: `lesson_slug=eq.${slug}` },
        onChange
      )
      .on('broadcast', { event: 'mudou' }, onChange)
      .subscribe();
    activeChannels.set(slug, channel);
    return () => {
      activeChannels.delete(slug);
      sb.removeChannel(channel);
    };
  },

  async addComment(slug, body) {
    const text = (body ?? '').trim();
    if (!text) return { error: 'Escreva alguma coisa antes de enviar.' };
    if (text.length > 1000) return { error: 'O comentário pode ter no máximo 1000 caracteres.' };

    const palavras = await getPalavrasBloqueadas();
    if (temPalavraBloqueada(text, palavras)) return { error: MSG_CENSURA };

    const sb = getSupabase();
    const { data: auth } = await sb.auth.getSession();
    if (!auth.session) return { error: 'Sua sessão expirou — recarregue a página e entre de novo.' };

    const { error } = await sb
      .from('comments')
      .insert({ lesson_slug: slug, body: text, user_id: auth.session.user.id });
    if (error) {
      if (/PALAVRA_BLOQUEADA/i.test(error.message)) return { error: MSG_CENSURA };
      return { error: 'Não deu pra enviar o comentário. Tente de novo.' };
    }
    return { data: true };
  },

  async deleteComment(slug, id) {
    const sb = getSupabase();
    // Função SECURITY DEFINER: dono, coordenador ou ADM. (Update direto não
    // funciona: o RETURNING interno do PostgREST barra a linha soft-deletada
    // no policy de SELECT — ver supabase/schema-v3.sql.)
    const { error } = await sb.rpc('apagar_comentario', { p_comment_id: id });
    if (error) return { error: 'Não deu pra apagar. Você só pode apagar os seus próprios comentários.' };
    // avisa os outros clientes na aula (não ecoa pra quem enviou)
    activeChannels.get(slug)?.send({ type: 'broadcast', event: 'mudou', payload: {} });
    return { data: true };
  },
};

export const backend = isDemo ? demoBackend : supabaseBackend;
