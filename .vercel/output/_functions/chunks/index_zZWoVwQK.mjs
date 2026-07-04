import { t as __exportAll } from "./rolldown-runtime_D7D4PA-g.mjs";
import { B as createComponent, C as renderComponent, N as addAttribute, O as renderTemplate, j as maybeRenderHead } from "./render_BRuglh_w.mjs";
import "./compiler_BRHGNyhy.mjs";
import { n as u, t as $$Base } from "./Base_Dv6FTpXP.mjs";
import { t as $$HelpTip } from "./HelpTip_iDg2tQbq.mjs";
import { t as getCollection } from "./_astro_content_BUrFyYYS.mjs";
import { i as splitSlug } from "./slug_3xew2_Fb.mjs";
//#region src/pages/enem/index.astro
var enem_exports = /* @__PURE__ */ __exportAll({
	default: () => $$Index,
	file: () => $$file,
	url: () => $$url
});
var $$Index = createComponent(async ($$result, $$props, $$slots) => {
	const ENEM_AREAS = [
		{
			label: "Ciências da Natureza e suas Tecnologias",
			subjects: [
				{
					slug: "biologia",
					label: "Biologia"
				},
				{
					slug: "fisica",
					label: "Física"
				},
				{
					slug: "quimica",
					label: "Química"
				}
			]
		},
		{
			label: "Ciências Humanas e suas Tecnologias",
			subjects: [
				{
					slug: "historia",
					label: "História"
				},
				{
					slug: "geografia",
					label: "Geografia"
				},
				{
					slug: "filosofia",
					label: "Filosofia"
				},
				{
					slug: "sociologia",
					label: "Sociologia"
				}
			]
		},
		{
			label: "Linguagens, Códigos e suas Tecnologias",
			subjects: [
				{
					slug: "lingua-portuguesa",
					label: "Língua Portuguesa e Literatura"
				},
				{
					slug: "lingua-estrangeira",
					label: "Língua Estrangeira (Inglês/Espanhol)"
				},
				{
					slug: "artes",
					label: "Artes"
				},
				{
					slug: "educacao-fisica",
					label: "Educação Física"
				},
				{
					slug: "tic",
					label: "Tecnologias da Informação e Comunicação"
				}
			]
		},
		{
			label: "Matemática e suas Tecnologias",
			subjects: [{
				slug: "matematica",
				label: "Matemática"
			}]
		}
	];
	const entries = await getCollection("enem");
	const countBySlug = /* @__PURE__ */ new Map();
	for (const e of entries) {
		const [materiaSlug] = splitSlug(e.id);
		countBySlug.set(materiaSlug, (countBySlug.get(materiaSlug) ?? 0) + 1);
	}
	return renderTemplate`${renderComponent($$result, "Base", $$Base, {
		"title": "ENEM",
		"active": "enem",
		"description": "Matérias do ENEM organizadas pelas 4 áreas do conhecimento"
	}, { "default": ($$result) => renderTemplate`${maybeRenderHead($$result)}<div class="flex items-center gap-2 mb-2"><p class="font-mono text-xs uppercase tracking-widest" style="color: var(--color-enem)">enem</p>${renderComponent($$result, "HelpTip", $$HelpTip, { "title": "Como funciona a aba ENEM" }, { "default": ($$result) => renderTemplate`O conteúdo é organizado pelas 4 áreas oficiais da prova. Clique numa matéria para ver os temas disponíveis. Matérias sem material ainda aparecem na lista, só avisando que o conteúdo está a caminho.` })}</div><h1 class="font-display text-3xl md:text-4xl font-bold text-ink mb-3">Matérias por área</h1><p class="font-body text-ink-soft max-w-lg mb-10 leading-relaxed">Conteúdo direto ao ponto, pensado para o que o INEP realmente cobra. Sem bimestre, sem semana — só o tema e o treino.</p><div class="flex flex-col gap-10">${ENEM_AREAS.map((area) => renderTemplate`<section><h2 class="font-display text-lg font-bold text-ink mb-4 pb-2 border-b-2 border-line">${area.label}</h2><ul class="grid sm:grid-cols-2 gap-4 list-none p-0 m-0">${area.subjects.map((s) => {
		const count = countBySlug.get(s.slug) ?? 0;
		return renderTemplate`<li>${count > 0 ? renderTemplate`<a${addAttribute(u(`/enem/${s.slug}/`), "href")} class="block rounded-lg border-2 p-5 hover:-translate-y-0.5 transition-transform" style="border-color: var(--color-enem); background-color: var(--color-enem-soft);"><h3 class="font-display text-lg font-bold text-ink mb-1">${s.label}</h3><p class="font-mono text-xs text-ink-soft">${count} ${count === 1 ? "tema" : "temas"}</p></a>` : renderTemplate`<div class="block rounded-lg border-2 border-dashed border-paper-dark p-5 opacity-70"><h3 class="font-display text-lg font-bold text-ink mb-1">${s.label}</h3><p class="font-mono text-xs text-ink-soft">Material ainda não compartilhado</p></div>`}</li>`;
	})}</ul></section>`)}</div>` })}`;
}, "C:/Users/Islan/OneDrive/Desktop/PROJETOS PESSOAIS/caderno do aluno/src/pages/enem/index.astro", void 0);
var $$file = "C:/Users/Islan/OneDrive/Desktop/PROJETOS PESSOAIS/caderno do aluno/src/pages/enem/index.astro";
var $$url = "/enem";
//#endregion
//#region \0virtual:astro:page:src/pages/enem/index@_@astro
var page = () => enem_exports;
//#endregion
export { page };
