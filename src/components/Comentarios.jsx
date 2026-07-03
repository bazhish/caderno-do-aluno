import { useState, useEffect, useCallback } from 'react';
import { backend, isDemo } from '../lib/commentsBackend.js';

// Classes escritas por extenso (não interpoladas) para o Tailwind conseguir
// detectá-las na varredura estática do build.
const ACCENTS = {
  enem: { bg: 'bg-enem', text: 'text-enem', border: 'border-enem' },
  escolar: { bg: 'bg-escolar', text: 'text-escolar', border: 'border-escolar' },
  ds: { bg: 'bg-ds', text: 'text-ds', border: 'border-ds' },
};

function formatarData(iso) {
  return new Date(iso).toLocaleString('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
  });
}

export default function Comentarios({ slug, accent = 'enem' }) {
  const { bg: accentBg, text: accentText } = ACCENTS[accent] ?? ACCENTS.enem;

  const [session, setSession] = useState(null);
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);

  // formulário de auth
  const [mode, setMode] = useState('login'); // 'login' | 'signup'
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [authError, setAuthError] = useState(null);
  const [authBusy, setAuthBusy] = useState(false);

  // composer
  const [body, setBody] = useState('');
  const [sendError, setSendError] = useState(null);
  const [sendBusy, setSendBusy] = useState(false);

  const refresh = useCallback(async () => {
    const { data } = await backend.listComments(slug);
    setComments(data ?? []);
  }, [slug]);

  useEffect(() => {
    let alive = true;
    (async () => {
      const [{ data: sess }] = await Promise.all([backend.getSession(), refresh()]);
      if (alive) {
        setSession(sess);
        setLoading(false);
      }
    })();
    return () => {
      alive = false;
    };
  }, [refresh]);

  async function handleAuth(e) {
    e.preventDefault();
    setAuthBusy(true);
    setAuthError(null);
    const result =
      mode === 'signup'
        ? await backend.signUp({ email, password, username })
        : await backend.signIn({ email, password });
    setAuthBusy(false);
    if (result.error) {
      setAuthError(result.error);
      return;
    }
    setSession(result.data);
    setEmail('');
    setPassword('');
    setUsername('');
  }

  async function handleSignOut() {
    await backend.signOut();
    setSession(null);
  }

  async function handleSend(e) {
    e.preventDefault();
    setSendBusy(true);
    setSendError(null);
    const result = await backend.addComment(slug, body);
    setSendBusy(false);
    if (result.error) {
      setSendError(result.error);
      return;
    }
    setBody('');
    await refresh();
  }

  async function handleDelete(id) {
    const result = await backend.deleteComment(id);
    if (!result.error) await refresh();
  }

  const isAdm = session?.user?.role === 'adm';

  return (
    <div className="not-prose my-10 border-t-2 border-line pt-8">
      <div className="flex flex-wrap items-baseline justify-between gap-2 mb-1">
        <h3 className="font-display text-xl md:text-2xl font-bold text-ink">Comentários da Turma</h3>
        {comments.length > 0 && (
          <span className="font-mono text-xs text-ink-soft">
            {comments.length} {comments.length === 1 ? 'comentário' : 'comentários'}
          </span>
        )}
      </div>
      <p className="font-body text-sm text-ink-soft mb-6">
        Dúvidas, dicas e macetes sobre esta aula — pergunte aqui que a turma responde.
      </p>

      {isDemo && (
        <div className="mb-6 rounded-md border border-dashed border-line bg-paper-dark/30 px-4 py-3">
          <p className="font-mono text-[11px] uppercase tracking-wide text-ink-soft mb-1">
            🔌 Modo demonstração
          </p>
          <p className="font-body text-xs text-ink-soft leading-relaxed">
            Sem banco de dados conectado: contas e comentários ficam salvos só neste navegador. A
            primeira conta criada vira ADM (pra testar a moderação). Pra ativar o modo real, siga o
            passo a passo em <code>supabase/schema.sql</code>.
          </p>
        </div>
      )}

      {/* Lista de comentários */}
      {loading ? (
        <p className="font-mono text-xs text-ink-soft mb-6">carregando…</p>
      ) : comments.length === 0 ? (
        <p className="font-body text-sm text-ink-soft mb-6 rounded-md border border-paper-dark bg-white/40 px-4 py-5 text-center">
          Ainda não tem comentário nesta aula. Seja a primeira pessoa a puxar o assunto!
        </p>
      ) : (
        <ul className="space-y-3 mb-6 list-none p-0 m-0">
          {comments.map((c) => {
            const canDelete = session && (session.user.id === c.user_id || isAdm);
            return (
              <li key={c.id} className="rounded-md border border-paper-dark bg-white/50 px-4 py-3">
                <div className="flex flex-wrap items-baseline gap-x-2 gap-y-1 mb-1">
                  <span className={`font-mono text-xs font-bold ${accentText}`}>@{c.username}</span>
                  {c.role === 'adm' && (
                    <span className="font-mono text-[10px] font-bold uppercase tracking-wide bg-ink text-paper rounded-full px-2 py-0.5">
                      ADM
                    </span>
                  )}
                  <span className="font-mono text-[11px] text-ink-soft">{formatarData(c.created_at)}</span>
                  {canDelete && (
                    <button
                      type="button"
                      onClick={() => handleDelete(c.id)}
                      className="ml-auto font-mono text-[11px] text-ink-soft hover:text-enem underline underline-offset-2"
                    >
                      apagar
                    </button>
                  )}
                </div>
                <p className="font-body text-sm text-ink leading-relaxed whitespace-pre-wrap">{c.body}</p>
              </li>
            );
          })}
        </ul>
      )}

      {/* Composer ou login */}
      {session ? (
        <form onSubmit={handleSend} className="rounded-lg border border-paper-dark bg-white/60 p-4">
          <div className="flex flex-wrap items-center gap-2 mb-3">
            <span className={`font-mono text-xs font-bold ${accentText}`}>@{session.user.username}</span>
            {isAdm && (
              <span className="font-mono text-[10px] font-bold uppercase tracking-wide bg-ink text-paper rounded-full px-2 py-0.5">
                ADM
              </span>
            )}
            <button
              type="button"
              onClick={handleSignOut}
              className="ml-auto font-mono text-[11px] text-ink-soft hover:text-ink underline underline-offset-2"
            >
              sair
            </button>
          </div>
          <textarea
            value={body}
            onChange={(e) => setBody(e.target.value)}
            maxLength={1000}
            rows={3}
            placeholder="Escreva sua dúvida ou dica sobre esta aula…"
            className="w-full rounded-md border border-paper-dark bg-white/80 px-3 py-2 font-body text-sm text-ink placeholder:text-ink-soft/70 focus:outline-none focus:border-ink-soft resize-y"
          />
          <div className="flex flex-wrap items-center gap-3 mt-2">
            <button
              type="submit"
              disabled={sendBusy || !body.trim()}
              className={`font-display font-bold text-sm px-5 py-2.5 rounded-md text-white ${accentBg} disabled:opacity-30 disabled:cursor-not-allowed transition-opacity`}
            >
              {sendBusy ? 'Enviando…' : 'Comentar'}
            </button>
            <span className="font-mono text-[11px] text-ink-soft">{body.length}/1000</span>
            {sendError && <span className="font-body text-xs text-enem">{sendError}</span>}
          </div>
        </form>
      ) : (
        !loading && (
          <form onSubmit={handleAuth} className="rounded-lg border border-paper-dark bg-white/60 p-4 max-w-md">
            <div className="flex gap-2 mb-4">
              <button
                type="button"
                onClick={() => { setMode('login'); setAuthError(null); }}
                className={`font-display font-bold text-sm px-4 py-2 rounded-md border-2 transition-colors ${
                  mode === 'login' ? `${accentBg} border-transparent text-white` : 'border-paper-dark text-ink-soft hover:text-ink'
                }`}
              >
                Entrar
              </button>
              <button
                type="button"
                onClick={() => { setMode('signup'); setAuthError(null); }}
                className={`font-display font-bold text-sm px-4 py-2 rounded-md border-2 transition-colors ${
                  mode === 'signup' ? `${accentBg} border-transparent text-white` : 'border-paper-dark text-ink-soft hover:text-ink'
                }`}
              >
                Criar conta
              </button>
            </div>

            {mode === 'signup' && (
              <label className="block mb-3">
                <span className="font-mono text-[11px] uppercase tracking-wide text-ink-soft block mb-1">
                  Nome de usuário
                </span>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="ex: joao-silva"
                  autoComplete="username"
                  className="w-full rounded-md border border-paper-dark bg-white/80 px-3 py-2 font-body text-sm text-ink focus:outline-none focus:border-ink-soft"
                />
              </label>
            )}

            <label className="block mb-3">
              <span className="font-mono text-[11px] uppercase tracking-wide text-ink-soft block mb-1">E-mail</span>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="voce@exemplo.com"
                autoComplete="email"
                required
                className="w-full rounded-md border border-paper-dark bg-white/80 px-3 py-2 font-body text-sm text-ink focus:outline-none focus:border-ink-soft"
              />
            </label>

            <label className="block mb-4">
              <span className="font-mono text-[11px] uppercase tracking-wide text-ink-soft block mb-1">Senha</span>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="mínimo 6 caracteres"
                autoComplete={mode === 'signup' ? 'new-password' : 'current-password'}
                required
                className="w-full rounded-md border border-paper-dark bg-white/80 px-3 py-2 font-body text-sm text-ink focus:outline-none focus:border-ink-soft"
              />
            </label>

            <button
              type="submit"
              disabled={authBusy}
              className={`font-display font-bold text-sm px-5 py-2.5 rounded-md text-white ${accentBg} disabled:opacity-40 transition-opacity`}
            >
              {authBusy ? 'Aguarde…' : mode === 'signup' ? 'Criar conta e entrar' : 'Entrar'}
            </button>

            {authError && <p className="font-body text-xs text-enem mt-3 leading-relaxed">{authError}</p>}

            <p className="font-body text-[11px] text-ink-soft mt-4 leading-relaxed">
              Só pedimos e-mail e nome de usuário — nada de nome completo. Qualquer pessoa pode ler
              os comentários; só precisa de conta pra escrever.
            </p>
          </form>
        )
      )}
    </div>
  );
}
