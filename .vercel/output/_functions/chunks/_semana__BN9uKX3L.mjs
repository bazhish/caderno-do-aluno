import { t as __exportAll } from "./rolldown-runtime_D7D4PA-g.mjs";
import { B as createComponent, C as renderComponent, O as renderTemplate, z as createAstro } from "./render_BRuglh_w.mjs";
import "./compiler_BRHGNyhy.mjs";
import { n as u } from "./Base_Dv6FTpXP.mjs";
import { t as $$Tema } from "./Tema_DjDgqcz2.mjs";
import { n as renderEntry, t as getCollection } from "./_astro_content_BUrFyYYS.mjs";
import { t as bimestreLabel } from "./slug_3xew2_Fb.mjs";
//#region src/pages/ds/[materia]/[bimestre]/[semana].astro
var _semana__exports = /* @__PURE__ */ __exportAll({
	default: () => $$Semana,
	file: () => $$file,
	url: () => $$url
});
createAstro("https://astro.build");
var $$Semana = createComponent(async ($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$Semana;
	const { materia, bimestre, semana } = Astro.params;
	const entry = (await getCollection("ds")).find((e) => e.id === `${materia}/${bimestre}/${semana}`);
	if (!entry) return Astro.redirect(u("/ds"));
	const { Content } = await renderEntry(entry);
	const subjectLabel = entry.data.subject;
	return renderTemplate`${renderComponent($$result, "Tema", $$Tema, {
		"title": entry.data.title,
		"subject": subjectLabel,
		"relevance": entry.data.relevance,
		"quickSummary": entry.data.quickSummary,
		"resources": entry.data.resources,
		"questions": entry.data.questions,
		"active": "ds",
		"slug": `ds/${entry.id}`,
		"breadcrumb": [
			{
				label: "DS",
				href: u("/ds")
			},
			{
				label: subjectLabel,
				href: u(`/ds/${materia}/`)
			},
			{
				label: bimestreLabel(bimestre),
				href: u(`/ds/${materia}/${bimestre}/`)
			},
			{ label: entry.data.title }
		]
	}, { "default": ($$result) => renderTemplate`${renderComponent($$result, "Content", Content, {})}` })}`;
}, "C:/Users/Islan/OneDrive/Desktop/PROJETOS PESSOAIS/caderno do aluno/src/pages/ds/[materia]/[bimestre]/[semana].astro", void 0);
var $$file = "C:/Users/Islan/OneDrive/Desktop/PROJETOS PESSOAIS/caderno do aluno/src/pages/ds/[materia]/[bimestre]/[semana].astro";
var $$url = "/ds/[materia]/[bimestre]/[semana]";
//#endregion
//#region \0virtual:astro:page:src/pages/ds/[materia]/[bimestre]/[semana]@_@astro
var page = () => _semana__exports;
//#endregion
export { page };
