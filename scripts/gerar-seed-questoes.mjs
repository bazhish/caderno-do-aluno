// Gera supabase/seed-questoes.sql a partir das questões do frontmatter das
// aulas .mdx — popula o banco de questões (tabela questoes) usado pelo sorteio
// sem repetição. Rode com: node scripts/gerar-seed-questoes.mjs
// O SQL gerado apaga e re-insere as questões das aulas encontradas (seed, não
// merge — não rodar depois que houver questões criadas à mão nessas aulas).
import { readFileSync, writeFileSync, readdirSync, statSync } from 'node:fs';
import { join, relative, sep } from 'node:path';
import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);
const yaml = require('js-yaml');

const CONTENT_DIR = 'src/content';
const OUT = 'supabase/seed-questoes.sql';

function listMdx(dir) {
  const out = [];
  for (const name of readdirSync(dir)) {
    const full = join(dir, name);
    if (statSync(full).isDirectory()) out.push(...listMdx(full));
    else if (name.endsWith('.mdx')) out.push(full);
  }
  return out;
}

// Dollar-quoting: evita qualquer problema de escape com aspas no conteúdo.
function dq(text) {
  if (text == null) return 'null';
  if (String(text).includes('$seed$')) throw new Error('conteúdo contém a tag $seed$');
  return `$seed$${text}$seed$`;
}

const values = [];
const slugs = new Set();

for (const file of listMdx(CONTENT_DIR)) {
  const raw = readFileSync(file, 'utf8');
  const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---/);
  if (!match) continue;
  const fm = yaml.load(match[1]);
  if (!Array.isArray(fm?.questions)) continue;

  // slug = <coleção>/<caminho-sem-extensão>, igual ao prop `slug` das páginas
  const slug = relative(CONTENT_DIR, file).split(sep).join('/').replace(/\.mdx$/, '');
  slugs.add(slug);

  for (const q of fm.questions) {
    values.push(
      `(${dq(slug)}, ${dq(q.question.trim())}, ${dq(JSON.stringify(q.options))}::jsonb, ` +
        `${q.correctIndex}, ${dq(q.explanation?.trim())}, ${q.source ? dq(q.source.trim()) : 'null'})`
    );
  }
}

const sql = `-- Gerado por scripts/gerar-seed-questoes.mjs — não editar à mão.
delete from public.questoes where lesson_slug in (${[...slugs].map((s) => `'${s}'`).join(', ')});

insert into public.questoes (lesson_slug, enunciado, alternativas, correct_index, explicacao, fonte) values
${values.join(',\n')};

select lesson_slug, count(*) from public.questoes group by lesson_slug order by lesson_slug;
`;

writeFileSync(OUT, sql);
console.log(`${values.length} questões de ${slugs.size} aulas → ${OUT}`);
