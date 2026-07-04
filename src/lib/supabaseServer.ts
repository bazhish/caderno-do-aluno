// Cliente Supabase do lado do servidor, com sessão em cookies (por requisição).
// Usado pelo middleware e pelas rotas de API. O login por username funciona via
// e-mail sintético: `username@caderno.local` (aluno não precisa ter e-mail).
import { createServerClient, parseCookieHeader } from '@supabase/ssr';
import type { APIContext, AstroGlobal } from 'astro';

const SUPABASE_URL = import.meta.env.PUBLIC_SUPABASE_URL;
const SUPABASE_ANON_KEY = import.meta.env.PUBLIC_SUPABASE_ANON_KEY;

export const supabaseConfigured = Boolean(SUPABASE_URL && SUPABASE_ANON_KEY);

type Ctx = Pick<APIContext | AstroGlobal, 'request' | 'cookies'>;

export function createSupabaseServer({ request, cookies }: Ctx) {
  return createServerClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
    cookies: {
      getAll() {
        return parseCookieHeader(request.headers.get('cookie') ?? '').map(
          ({ name, value }) => ({ name, value: value ?? '' })
        );
      },
      setAll(cookiesToSet) {
        for (const { name, value, options } of cookiesToSet) {
          cookies.set(name, value, { ...options, path: '/' });
        }
      },
    },
  });
}

export function usernameParaEmail(username: string): string {
  return `${username.trim().toLowerCase()}@caderno.local`;
}

export const USERNAME_RULE = /^[a-z0-9][a-z0-9._-]{2,29}$/;

// Senha padrão do primeiro acesso: nome.sobrenome@ano (ex: joao.silva@2026).
export function senhaPadrao(nomeCompleto: string): string {
  const partes = nomeCompleto
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .split(/\s+/)
    .filter(Boolean);
  const primeiro = partes[0] ?? 'aluno';
  const ultimo = partes.length > 1 ? partes[partes.length - 1] : 'turma';
  return `${primeiro}.${ultimo}@${new Date().getFullYear()}`;
}
