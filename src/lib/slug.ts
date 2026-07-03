// Slugs vêm do caminho do arquivo, ex: "matematica/1-bimestre/semana-01-funcoes"
export function toLabel(slugPart: string): string {
  return slugPart
    .replace(/^\d+-/, '') // remove prefixo numérico tipo "1-"
    .split('-')
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ');
}

export function bimestreLabel(slugPart: string): string {
  const n = slugPart.match(/^(\d+)/)?.[1] ?? '1';
  return `${n}º Bimestre`;
}

export function semanaLabel(slugPart: string): string {
  const n = slugPart.match(/semana-(\d+)/)?.[1];
  return n ? `Semana ${parseInt(n, 10)}` : toLabel(slugPart);
}

// separa "matematica/1-bimestre/semana-01-funcoes" em partes
export function splitSlug(slug: string): string[] {
  return slug.split('/');
}

// Agrupa entradas de uma coleção (matéria -> bimestre -> semanas) a partir do slug do arquivo.
// Espera entradas com formato "materia-slug/N-bimestre/semana-slug".
export function buildMateriaBimestreTree<T extends { id: string; data: { subject: string; order: number } }>(
  entries: T[]
) {
  const materias = new Map<
    string,
    { slug: string; label: string; bimestres: Map<string, { slug: string; label: string; semanas: T[] }> }
  >();

  for (const e of entries) {
    const [materiaSlug, bimestreSlug] = splitSlug(e.id);
    if (!materias.has(materiaSlug)) {
      materias.set(materiaSlug, { slug: materiaSlug, label: e.data.subject, bimestres: new Map() });
    }
    const materia = materias.get(materiaSlug)!;
    if (!materia.bimestres.has(bimestreSlug)) {
      materia.bimestres.set(bimestreSlug, {
        slug: bimestreSlug,
        label: bimestreLabel(bimestreSlug),
        semanas: [],
      });
    }
    materia.bimestres.get(bimestreSlug)!.semanas.push(e);
  }

  for (const materia of materias.values()) {
    for (const bim of materia.bimestres.values()) {
      bim.semanas.sort((a, b) => a.data.order - b.data.order);
    }
  }

  return materias;
}
