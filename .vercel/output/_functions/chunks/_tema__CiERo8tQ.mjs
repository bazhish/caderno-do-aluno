import { t as __exportAll } from "./rolldown-runtime_D7D4PA-g.mjs";
import { B as createComponent, C as renderComponent, O as renderTemplate, z as createAstro } from "./render_BRuglh_w.mjs";
import "./compiler_BRHGNyhy.mjs";
import { n as u } from "./Base_Dv6FTpXP.mjs";
import { t as $$Tema$1 } from "./Tema_DjDgqcz2.mjs";
import { n as renderEntry, t as getCollection } from "./_astro_content_BUrFyYYS.mjs";
//#region src/pages/enem/[materia]/[tema].astro
var _tema__exports = /* @__PURE__ */ __exportAll({
	default: () => $$Tema,
	file: () => $$file,
	url: () => $$url
});
createAstro("https://astro.build");
var $$Tema = createComponent(async ($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$Tema;
	const { materia, tema } = Astro.params;
	const entry = (await getCollection("enem")).find((e) => e.id === `${materia}/${tema}`);
	if (!entry) return Astro.redirect(u("/enem"));
	const { Content } = await renderEntry(entry);
	const subjectLabel = entry.data.subject;
	return renderTemplate`${renderComponent($$result, "Tema", $$Tema$1, {
		"title": entry.data.title,
		"subject": subjectLabel,
		"relevance": entry.data.relevance,
		"quickSummary": entry.data.quickSummary,
		"resources": entry.data.resources,
		"questions": entry.data.questions,
		"active": "enem",
		"slug": `enem/${entry.id}`,
		"breadcrumb": [
			{
				label: "ENEM",
				href: u("/enem")
			},
			{
				label: subjectLabel,
				href: u(`/enem/${materia}/`)
			},
			{ label: entry.data.title }
		]
	}, { "default": ($$result) => renderTemplate`${renderComponent($$result, "Content", Content, {})}` })}`;
}, "C:/Users/Islan/OneDrive/Desktop/PROJETOS PESSOAIS/caderno do aluno/src/pages/enem/[materia]/[tema].astro", void 0);
var $$file = "C:/Users/Islan/OneDrive/Desktop/PROJETOS PESSOAIS/caderno do aluno/src/pages/enem/[materia]/[tema].astro";
var $$url = "/enem/[materia]/[tema]";
//#endregion
//#region \0virtual:astro:page:src/pages/enem/[materia]/[tema]@_@astro
var page = () => _tema__exports;
//#endregion
export { page };
