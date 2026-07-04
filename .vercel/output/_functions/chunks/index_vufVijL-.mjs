import { t as __exportAll } from "./rolldown-runtime_D7D4PA-g.mjs";
import { B as createComponent, C as renderComponent, N as addAttribute, O as renderTemplate, j as maybeRenderHead, z as createAstro } from "./render_BRuglh_w.mjs";
import "./compiler_BRHGNyhy.mjs";
import { n as u, t as $$Base } from "./Base_Dv6FTpXP.mjs";
import { t as getCollection } from "./_astro_content_BUrFyYYS.mjs";
import { i as splitSlug, n as buildMateriaBimestreTree, r as semanaLabel } from "./slug_3xew2_Fb.mjs";
//#region src/pages/escolar/[materia]/[bimestre]/index.astro
var _bimestre__exports = /* @__PURE__ */ __exportAll({
	default: () => $$Index,
	file: () => $$file,
	url: () => $$url
});
createAstro("https://astro.build");
var $$Index = createComponent(async ($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$Index;
	const { materia, bimestre } = Astro.params;
	const tree = buildMateriaBimestreTree(await getCollection("escolar"));
	const materiaNode = materia ? tree.get(materia) : void 0;
	const bim = bimestre ? materiaNode?.bimestres.get(bimestre) : void 0;
	if (!materiaNode || !bim) return Astro.redirect(u("/escolar"));
	const materiaLabel = materiaNode.label;
	const bimestreLabel = bim.label;
	const semanas = bim.semanas;
	return renderTemplate`${renderComponent($$result, "Base", $$Base, {
		"title": `${materiaLabel} · ${bimestreLabel}`,
		"active": "escolar",
		"description": `Semanas de ${materiaLabel}, ${bimestreLabel}`
	}, { "default": ($$result) => renderTemplate`${maybeRenderHead($$result)}<nav class="font-mono text-xs text-ink-soft mb-4 flex flex-wrap gap-1"><a${addAttribute(u("/escolar"), "href")} class="hover:text-ink underline underline-offset-2">Escolar</a><span>/</span><a${addAttribute(u(`/escolar/${materia}/`), "href")} class="hover:text-ink underline underline-offset-2">${materiaLabel}</a><span>/</span><span class="text-ink">${bimestreLabel}</span></nav><h1 class="font-display text-3xl md:text-4xl font-bold text-ink mb-8">${bimestreLabel}</h1><ul class="flex flex-col gap-3 list-none p-0 m-0">${semanas.map((s) => renderTemplate`<li><a${addAttribute(u(`/escolar/${materia}/${bimestre}/${splitSlug(s.id)[2]}/`), "href")} class="flex items-center justify-between gap-4 rounded-md border border-paper-dark px-5 py-4 hover:border-escolar transition-colors bg-white/50"><span class="font-mono text-xs text-ink-soft shrink-0">${semanaLabel(splitSlug(s.id)[2])}</span><span class="font-body text-ink font-medium flex-1 text-right">${s.data.title}</span></a></li>`)}</ul>` })}`;
}, "C:/Users/Islan/OneDrive/Desktop/PROJETOS PESSOAIS/caderno do aluno/src/pages/escolar/[materia]/[bimestre]/index.astro", void 0);
var $$file = "C:/Users/Islan/OneDrive/Desktop/PROJETOS PESSOAIS/caderno do aluno/src/pages/escolar/[materia]/[bimestre]/index.astro";
var $$url = "/escolar/[materia]/[bimestre]";
//#endregion
//#region \0virtual:astro:page:src/pages/escolar/[materia]/[bimestre]/index@_@astro
var page = () => _bimestre__exports;
//#endregion
export { page };
