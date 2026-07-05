// Fonte unificada de aulas: junta a coleção .mdx do repositório (legado, via
// git) com as aulas postadas pelo site (tabela lessons). As duas convivem —
// o slug tem o mesmo formato nos dois mundos e, se houver colisão, a versão
// do banco vence (permite "sobrescrever" uma aula legada pelo painel).
import { getCollection } from 'astro:content';
import { marked } from 'marked';
import type { AstroGlobal } from 'astro';
import { createSupabaseServer, supabaseConfigured } from './supabaseServer';

export type Categoria = 'enem' | 'escolar' | 'ds';

// Formato compatível com as entradas de getCollection() — as páginas de
// listagem e o buildMateriaBimestreTree funcionam sem mudança.
export interface EntradaAula {
  id: string; // caminho após a categoria, ex: "fisica/cinematica"
  data: { subject: string; order: number; title: string };
  fonte: 'mdx' | 'db';
}

export interface AulaDb {
  slug: string;
  categoria: Categoria;
  materiaSlug: string;
  materiaNome: string;
  bimestre: number | null;
  semana: number | null;
  title: string;
  relevance: string;
  quickSummary: string | null;
  bodyHtml: string;
  resources: unknown;
  status: string;
}

marked.setOptions({ gfm: true, breaks: true });

// Renderiza markdown escapando QUALQUER HTML cru antes — coordenador escreve
// markdown, nunca injeta tags (proteção XSS simples e suficiente aqui).
export function renderMarkdown(md: string): string {
  const escapado = (md ?? '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  return marked.parse(escapado, { async: false }) as string;
}

async function listarDb(ctx: AstroGlobal, categoria: Categoria): Promise<EntradaAula[]> {
  if (!supabaseConfigured) return [];
  try {
    const supabase = createSupabaseServer(ctx);
    const { data } = await supabase
      .from('lessons')
      .select('slug, materia_nome, title, ordem')
      .eq('categoria', categoria)
      .eq('status', 'publicado');
    return (data ?? []).map((l) => ({
      id: l.slug.split('/').slice(1).join('/'),
      data: { subject: l.materia_nome, order: l.ordem ?? 1, title: l.title },
      fonte: 'db' as const,
    }));
  } catch {
    return []; // tabela ainda não criada / banco fora: segue só com o .mdx
  }
}

export async function listarEntradas(ctx: AstroGlobal, categoria: Categoria): Promise<EntradaAula[]> {
  const [mdx, db] = await Promise.all([getCollection(categoria), listarDb(ctx, categoria)]);
  const porId = new Map<string, EntradaAula>();
  for (const e of mdx) {
    porId.set(e.id, {
      id: e.id,
      data: { subject: e.data.subject, order: e.data.order, title: e.data.title },
      fonte: 'mdx',
    });
  }
  for (const e of db) porId.set(e.id, e); // banco vence colisões
  return [...porId.values()];
}

export async function buscarAulaDb(ctx: AstroGlobal, slug: string): Promise<AulaDb | null> {
  if (!supabaseConfigured) return null;
  try {
    const supabase = createSupabaseServer(ctx);
    const { data } = await supabase.from('lessons').select('*').eq('slug', slug).maybeSingle();
    if (!data || data.status !== 'publicado') return null;
    return {
      slug: data.slug,
      categoria: data.categoria,
      materiaSlug: data.materia_slug,
      materiaNome: data.materia_nome,
      bimestre: data.bimestre,
      semana: data.semana,
      title: data.title,
      relevance: data.relevance ?? '',
      quickSummary: data.quick_summary,
      bodyHtml: renderMarkdown(data.body_md ?? ''),
      resources: data.resources ?? undefined,
      status: data.status,
    };
  } catch {
    return null;
  }
}

export async function listarAtividades(
  ctx: AstroGlobal,
  slug: string
): Promise<{ titulo: string; roteiroHtml: string }[]> {
  if (!supabaseConfigured) return [];
  try {
    const supabase = createSupabaseServer(ctx);
    const { data } = await supabase
      .from('atividades')
      .select('titulo, roteiro, ordem')
      .eq('lesson_slug', slug)
      .order('ordem');
    return (data ?? []).map((a) => ({ titulo: a.titulo, roteiroHtml: renderMarkdown(a.roteiro) }));
  } catch {
    return [];
  }
}
