// Prefixa caminhos internos com a base do site. No GitHub Pages o site vive em
// /caderno-do-aluno/, então "/enem" precisa virar "/caderno-do-aluno/enem".
// Em dev e em hosts na raiz (Vercel, Cloudflare), BASE_URL é "/" e o caminho
// sai inalterado. Todo href interno do site deve passar por aqui.
const base = import.meta.env.BASE_URL.replace(/\/+$/, '');

export function u(path: string): string {
  return `${base}${path}` || '/';
}
