//#region src/lib/slug.ts
function toLabel(slugPart) {
	return slugPart.replace(/^\d+-/, "").split("-").map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join(" ");
}
function bimestreLabel(slugPart) {
	return `${slugPart.match(/^(\d+)/)?.[1] ?? "1"}º Bimestre`;
}
function semanaLabel(slugPart) {
	const n = slugPart.match(/semana-(\d+)/)?.[1];
	return n ? `Semana ${parseInt(n, 10)}` : toLabel(slugPart);
}
function splitSlug(slug) {
	return slug.split("/");
}
function buildMateriaBimestreTree(entries) {
	const materias = /* @__PURE__ */ new Map();
	for (const e of entries) {
		const [materiaSlug, bimestreSlug] = splitSlug(e.id);
		if (!materias.has(materiaSlug)) materias.set(materiaSlug, {
			slug: materiaSlug,
			label: e.data.subject,
			bimestres: /* @__PURE__ */ new Map()
		});
		const materia = materias.get(materiaSlug);
		if (!materia.bimestres.has(bimestreSlug)) materia.bimestres.set(bimestreSlug, {
			slug: bimestreSlug,
			label: bimestreLabel(bimestreSlug),
			semanas: []
		});
		materia.bimestres.get(bimestreSlug).semanas.push(e);
	}
	for (const materia of materias.values()) for (const bim of materia.bimestres.values()) bim.semanas.sort((a, b) => a.data.order - b.data.order);
	return materias;
}
//#endregion
export { splitSlug as i, buildMateriaBimestreTree as n, semanaLabel as r, bimestreLabel as t };
