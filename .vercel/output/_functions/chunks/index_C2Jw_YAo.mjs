import { t as __exportAll } from "./rolldown-runtime_D7D4PA-g.mjs";
import { B as createComponent, C as renderComponent, N as addAttribute, O as renderTemplate, j as maybeRenderHead } from "./render_BRuglh_w.mjs";
import "./compiler_BRHGNyhy.mjs";
import { n as u, t as $$Base } from "./Base_Dv6FTpXP.mjs";
import { t as $$HelpTip } from "./HelpTip_iDg2tQbq.mjs";
import { t as getCollection } from "./_astro_content_BUrFyYYS.mjs";
import { n as buildMateriaBimestreTree } from "./slug_3xew2_Fb.mjs";
//#region src/pages/ds/index.astro
var ds_exports = /* @__PURE__ */ __exportAll({
	default: () => $$Index,
	file: () => $$file,
	url: () => "/ds"
});
var $$Index = createComponent(async ($$result, $$props, $$slots) => {
	const materias = [...buildMateriaBimestreTree(await getCollection("ds")).values()].sort((a, b) => a.label.localeCompare(b.label));
	return renderTemplate`${renderComponent($$result, "Base", $$Base, {
		"title": "DS",
		"active": "ds",
		"description": "Material do curso DS, por matéria"
	}, { "default": ($$result) => renderTemplate`${maybeRenderHead($$result)}<div class="flex items-center gap-2 mb-2"><p class="font-mono text-xs uppercase tracking-widest" style="color: var(--color-ds)">ds</p>${renderComponent($$result, "HelpTip", $$HelpTip, { "title": "Como funciona a aba DS" }, { "default": ($$result) => renderTemplate`Material do curso técnico, organizado por matéria, bimestre e semana, com explicações em linguagem simples.` })}</div><h1 class="font-display text-3xl md:text-4xl font-bold text-ink mb-3">Matérias</h1><p class="font-body text-ink-soft max-w-lg mb-10 leading-relaxed">Material do curso técnico, organizado por matéria, bimestre e semana.</p>${materias.length === 0 ? renderTemplate`<p class="font-body text-ink-soft">Nenhuma matéria publicada ainda.</p>` : renderTemplate`<ul class="grid sm:grid-cols-2 gap-4 list-none p-0 m-0">${materias.map((m) => renderTemplate`<li><a${addAttribute(u(`/ds/${m.slug}/`), "href")} class="block rounded-lg border-2 p-5 hover:-translate-y-0.5 transition-transform" style="border-color: var(--color-ds); background-color: var(--color-ds-soft);"><h2 class="font-display text-xl font-bold text-ink mb-1">${m.label}</h2><p class="font-mono text-xs text-ink-soft">${m.bimestres.size} ${m.bimestres.size === 1 ? "bimestre" : "bimestres"}</p></a></li>`)}</ul>`}` })}`;
}, "C:/Users/Islan/OneDrive/Desktop/PROJETOS PESSOAIS/caderno do aluno/src/pages/ds/index.astro", void 0);
var $$file = "C:/Users/Islan/OneDrive/Desktop/PROJETOS PESSOAIS/caderno do aluno/src/pages/ds/index.astro";
//#endregion
//#region \0virtual:astro:page:src/pages/ds/index@_@astro
var page = () => ds_exports;
//#endregion
export { page };
