import { t as __exportAll } from "./rolldown-runtime_D7D4PA-g.mjs";
import { B as createComponent, C as renderComponent, N as addAttribute, O as renderTemplate, j as maybeRenderHead, z as createAstro } from "./render_BRuglh_w.mjs";
import "./compiler_BRHGNyhy.mjs";
import { n as u, t as $$Base } from "./Base_Dv6FTpXP.mjs";
import { t as getCollection } from "./_astro_content_BUrFyYYS.mjs";
import { i as splitSlug } from "./slug_3xew2_Fb.mjs";
//#region src/pages/enem/[materia]/index.astro
var _materia__exports = /* @__PURE__ */ __exportAll({
	default: () => $$Index,
	file: () => $$file,
	url: () => $$url
});
createAstro("https://astro.build");
var $$Index = createComponent(async ($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$Index;
	const { materia } = Astro.params;
	const temas = (await getCollection("enem")).filter((e) => splitSlug(e.id)[0] === materia).sort((a, b) => a.data.order - b.data.order);
	if (temas.length === 0) return Astro.redirect(u("/enem"));
	const subjectLabel = temas[0]?.data.subject ?? materia;
	return renderTemplate`${renderComponent($$result, "Base", $$Base, {
		"title": subjectLabel,
		"active": "enem",
		"description": `Temas de ${subjectLabel} para o ENEM`
	}, { "default": ($$result) => renderTemplate`${maybeRenderHead($$result)}<nav class="font-mono text-xs text-ink-soft mb-4"><a${addAttribute(u("/enem"), "href")} class="hover:text-ink underline underline-offset-2">ENEM</a><span> / </span><span class="text-ink">${subjectLabel}</span></nav><h1 class="font-display text-3xl md:text-4xl font-bold text-ink mb-8">${subjectLabel}</h1><ul class="flex flex-col gap-3 list-none p-0 m-0">${temas.map((t) => renderTemplate`<li><a${addAttribute(u(`/enem/${materia}/${splitSlug(t.id)[1]}/`), "href")} class="flex items-center justify-between gap-4 rounded-md border border-paper-dark px-5 py-4 hover:border-enem transition-colors bg-white/50"><span class="font-body text-ink font-medium">${t.data.title}</span><span class="font-mono text-xs text-ink-soft shrink-0">5 questões →</span></a></li>`)}</ul>` })}`;
}, "C:/Users/Islan/OneDrive/Desktop/PROJETOS PESSOAIS/caderno do aluno/src/pages/enem/[materia]/index.astro", void 0);
var $$file = "C:/Users/Islan/OneDrive/Desktop/PROJETOS PESSOAIS/caderno do aluno/src/pages/enem/[materia]/index.astro";
var $$url = "/enem/[materia]";
//#endregion
//#region \0virtual:astro:page:src/pages/enem/[materia]/index@_@astro
var page = () => _materia__exports;
//#endregion
export { page };
