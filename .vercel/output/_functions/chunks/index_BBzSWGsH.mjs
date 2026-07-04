import { t as __exportAll } from "./rolldown-runtime_D7D4PA-g.mjs";
import { B as createComponent, C as renderComponent, N as addAttribute, O as renderTemplate, j as maybeRenderHead, z as createAstro } from "./render_BRuglh_w.mjs";
import "./compiler_BRHGNyhy.mjs";
import { n as u, t as $$Base } from "./Base_Dv6FTpXP.mjs";
import { t as getCollection } from "./_astro_content_BUrFyYYS.mjs";
import { n as buildMateriaBimestreTree } from "./slug_3xew2_Fb.mjs";
//#region src/pages/escolar/[materia]/index.astro
var _materia__exports = /* @__PURE__ */ __exportAll({
	default: () => $$Index,
	file: () => $$file,
	url: () => $$url
});
createAstro("https://astro.build");
var $$Index = createComponent(async ($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$Index;
	const { materia: materiaSlug } = Astro.params;
	const tree = buildMateriaBimestreTree(await getCollection("escolar"));
	const materia = materiaSlug ? tree.get(materiaSlug) : void 0;
	if (!materia) return Astro.redirect(u("/escolar"));
	const bimestres = [...materia.bimestres.values()].sort((a, b) => a.slug.localeCompare(b.slug));
	return renderTemplate`${renderComponent($$result, "Base", $$Base, {
		"title": materia.label,
		"active": "escolar",
		"description": `Bimestres de ${materia.label}`
	}, { "default": ($$result) => renderTemplate`${maybeRenderHead($$result)}<nav class="font-mono text-xs text-ink-soft mb-4"><a${addAttribute(u("/escolar"), "href")} class="hover:text-ink underline underline-offset-2">Escolar</a><span> / </span><span class="text-ink">${materia.label}</span></nav><h1 class="font-display text-3xl md:text-4xl font-bold text-ink mb-8">${materia.label}</h1><ul class="flex flex-col gap-3 list-none p-0 m-0">${bimestres.map((b) => renderTemplate`<li><a${addAttribute(u(`/escolar/${materiaSlug}/${b.slug}/`), "href")} class="flex items-center justify-between gap-4 rounded-md border border-paper-dark px-5 py-4 hover:border-escolar transition-colors bg-white/50"><span class="font-body text-ink font-medium">${b.label}</span><span class="font-mono text-xs text-ink-soft shrink-0">${b.semanas.length} ${b.semanas.length === 1 ? "semana" : "semanas"} →</span></a></li>`)}</ul>` })}`;
}, "C:/Users/Islan/OneDrive/Desktop/PROJETOS PESSOAIS/caderno do aluno/src/pages/escolar/[materia]/index.astro", void 0);
var $$file = "C:/Users/Islan/OneDrive/Desktop/PROJETOS PESSOAIS/caderno do aluno/src/pages/escolar/[materia]/index.astro";
var $$url = "/escolar/[materia]";
//#endregion
//#region \0virtual:astro:page:src/pages/escolar/[materia]/index@_@astro
var page = () => _materia__exports;
//#endregion
export { page };
