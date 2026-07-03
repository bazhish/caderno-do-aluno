// Backend dos comentários com duas implementações atrás da mesma interface:
//
//  - Supabase (modo real): ativado quando PUBLIC_SUPABASE_URL e
//    PUBLIC_SUPABASE_ANON_KEY existem no .env. Schema/RLS em supabase/schema.sql.
//  - Demonstração (fallback): sem banco configurado, contas e comentários
//    ficam no localStorage deste navegador — só para visualizar o fluxo.
//    A PRIMEIRA conta criada no navegador vira ADM.
//
// Interface: getSession, signUp, signIn, signOut, listComments, addComment,
// deleteComment. Todas retornam { data?, error? } com mensagens em pt-BR.

const SUPABASE_URL = import.meta.env.PUBLIC_SUPABASE_URL;
const SUPABASE_ANON_KEY = import.meta.env.PUBLIC_SUPABASE_ANON_KEY;

export const isDemo = !SUPABASE_URL || !SUPABASE_ANON_KEY;

export const USERNAME_RULE = /^[a-z0-9][a-z0-9._-]{2,19}$/;

export function validateUsername(username) {
  const u = (username ?? '').trim().toLowerCase();
  if (!USERNAME_RULE.test(u)) {
    return {
      error:
        'Nome de usuário inválido: use de 3 a 20 caracteres, só letras minúsculas, números, ponto, hífen ou underline.',
    };
  }
  return { data: u };
}

/* ------------------------------------------------------------------ */
/* Modo demonstração (localStorage)                                    */
/* ------------------------------------------------------------------ */

const LS_USERS = 'cda:demo:users';
const LS_SESSION = 'cda:demo:session';
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

async function sha256(text) {
  const data = new TextEncoder().encode(text);
  const digest = await crypto.subtle.digest('SHA-256', data);
  return [...new Uint8Array(digest)].map((b) => b.toString(16).padStart(2, '0')).join('');
}

const demoBackend = {
  async getSession() {
    const session = lsGet(LS_SESSION, null);
    return { data: session };
  },

  async signUp({ email, password, username }) {
    const checked = validateUsername(username);
    if (checked.error) return { error: checked.error };
    const uname = checked.data;

    if (!email?.includes('@')) return { error: 'Digite um e-mail válido.' };
    if ((password ?? '').length < 6) return { error: 'A senha precisa de pelo menos 6 caracteres.' };

    const users = lsGet(LS_USERS, []);
    if (users.some((u) => u.email === email.toLowerCase())) {
      return { error: 'Já existe uma conta com esse e-mail.' };
    }
    if (users.some((u) => u.username === uname)) {
      return { error: 'Esse nome de usuário já está em uso. Escolha outro.' };
    }

    const user = {
      id: crypto.randomUUID(),
      email: email.toLowerCase(),
      username: uname,
      passwordHash: await sha256(password),
      // primeira conta do navegador vira ADM, pra dar pra visualizar a moderação
      role: users.length === 0 ? 'adm' : 'aluno',
    };
    users.push(user);
    lsSet(LS_USERS, users);

    const session = { user: { id: user.id, email: user.email, username: user.username, role: user.role } };
    lsSet(LS_SESSION, session);
    return { data: session };
  },

  async signIn({ email, password }) {
    const users = lsGet(LS_USERS, []);
    const hash = await sha256(password ?? '');
    const user = users.find((u) => u.email === (email ?? '').toLowerCase() && u.passwordHash === hash);
    if (!user) return { error: 'E-mail ou senha incorretos.' };

    const session = { user: { id: user.id, email: user.email, username: user.username, role: user.role } };
    lsSet(LS_SESSION, session);
    return { data: session };
  },

  async signOut() {
    localStorage.removeItem(LS_SESSION);
    return { data: true };
  },

  async listComments(slug) {
    const all = lsGet(LS_COMMENTS, []);
    const list = all
      .filter((c) => c.lesson_slug === slug && !c.deleted)
      .sort((a, b) => new Date(a.created_at) - new Date(b.created_at));
    return { data: list };
  },

  async addComment(slug, body) {
    const session = lsGet(LS_SESSION, null);
    if (!session) return { error: 'Você precisa entrar pra comentar.' };
    const text = (body ?? '').trim();
    if (!text) return { error: 'Escreva alguma coisa antes de enviar.' };
    if (text.length > 1000) return { error: 'O comentário pode ter no máximo 1000 caracteres.' };

    const all = lsGet(LS_COMMENTS, []);
    all.push({
      id: crypto.randomUUID(),
      lesson_slug: slug,
      user_id: session.user.id,
      username: session.user.username,
      role: session.user.role,
      body: text,
      created_at: new Date().toISOString(),
      deleted: false,
    });
    lsSet(LS_COMMENTS, all);
    return { data: true };
  },

  async deleteComment(id) {
    const session = lsGet(LS_SESSION, null);
    if (!session) return { error: 'Você precisa entrar.' };
    const all = lsGet(LS_COMMENTS, []);
    const comment = all.find((c) => c.id === id);
    if (!comment) return { error: 'Comentário não encontrado.' };
    if (comment.user_id !== session.user.id && session.user.role !== 'adm') {
      return { error: 'Você só pode apagar os seus próprios comentários.' };
    }
    comment.deleted = true;
    lsSet(LS_COMMENTS, all);
    return { data: true };
  },
};

/* ------------------------------------------------------------------ */
/* Modo real (Supabase)                                                */
/* ------------------------------------------------------------------ */

let supabasePromise = null;
function getSupabase() {
  if (!supabasePromise) {
    supabasePromise = import('@supabase/supabase-js').then(({ createClient }) =>
      createClient(SUPABASE_URL, SUPABASE_ANON_KEY)
    );
  }
  return supabasePromise;
}

async function fetchProfile(supabase, userId) {
  const { data } = await supabase.from('profiles').select('username, role').eq('id', userId).maybeSingle();
  return data;
}

const supabaseBackend = {
  async getSession() {
    const supabase = await getSupabase();
    const { data } = await supabase.auth.getSession();
    if (!data.session) return { data: null };
    const profile = await fetchProfile(supabase, data.session.user.id);
    return {
      data: {
        user: {
          id: data.session.user.id,
          email: data.session.user.email,
          username: profile?.username ?? '(sem perfil)',
          role: profile?.role ?? 'aluno',
        },
      },
    };
  },

  async signUp({ email, password, username }) {
    const checked = validateUsername(username);
    if (checked.error) return { error: checked.error };
    const uname = checked.data;

    const supabase = await getSupabase();

    // Pré-checagem amigável; a garantia de verdade é o UNIQUE do banco.
    const { data: taken } = await supabase.from('profiles').select('id').eq('username', uname).maybeSingle();
    if (taken) return { error: 'Esse nome de usuário já está em uso. Escolha outro.' };

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: { data: { username: uname } }, // o trigger do banco cria o profile
    });
    if (error) return { error: traduzErro(error.message) };
    if (!data.session) {
      return { error: 'Conta criada! Confirme seu e-mail pra conseguir entrar.', emailConfirmation: true };
    }
    return this.getSession();
  },

  async signIn({ email, password }) {
    const supabase = await getSupabase();
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) return { error: traduzErro(error.message) };
    return this.getSession();
  },

  async signOut() {
    const supabase = await getSupabase();
    await supabase.auth.signOut();
    return { data: true };
  },

  async listComments(slug) {
    const supabase = await getSupabase();
    const { data, error } = await supabase
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

  async addComment(slug, body) {
    const text = (body ?? '').trim();
    if (!text) return { error: 'Escreva alguma coisa antes de enviar.' };
    if (text.length > 1000) return { error: 'O comentário pode ter no máximo 1000 caracteres.' };

    const supabase = await getSupabase();
    const { data: auth } = await supabase.auth.getSession();
    if (!auth.session) return { error: 'Você precisa entrar pra comentar.' };

    const { error } = await supabase
      .from('comments')
      .insert({ lesson_slug: slug, body: text, user_id: auth.session.user.id });
    if (error) return { error: 'Não deu pra enviar o comentário. Tente de novo.' };
    return { data: true };
  },

  async deleteComment(id) {
    const supabase = await getSupabase();
    // Soft delete; a RLS decide quem pode (dono ou ADM).
    const { error } = await supabase
      .from('comments')
      .update({ deleted_at: new Date().toISOString() })
      .eq('id', id);
    if (error) return { error: 'Não deu pra apagar. Você só pode apagar os seus próprios comentários.' };
    return { data: true };
  },
};

function traduzErro(msg) {
  if (/invalid login credentials/i.test(msg)) return 'E-mail ou senha incorretos.';
  if (/already registered/i.test(msg)) return 'Já existe uma conta com esse e-mail.';
  if (/at least 6 characters/i.test(msg)) return 'A senha precisa de pelo menos 6 caracteres.';
  if (/valid email/i.test(msg)) return 'Digite um e-mail válido.';
  if (/rate limit/i.test(msg)) return 'Muitas tentativas seguidas. Espere um pouco e tente de novo.';
  return `Algo deu errado: ${msg}`;
}

export const backend = isDemo ? demoBackend : supabaseBackend;
