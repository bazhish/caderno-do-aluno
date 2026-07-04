import { t as __exportAll } from "./rolldown-runtime_D7D4PA-g.mjs";
import { B as createComponent, C as renderComponent, N as addAttribute, O as renderTemplate, j as maybeRenderHead } from "./render_BRuglh_w.mjs";
import "./compiler_BRHGNyhy.mjs";
import { n as u, t as $$Base } from "./Base_Dv6FTpXP.mjs";
import { t as $$HelpTip } from "./HelpTip_iDg2tQbq.mjs";
//#region src/pages/index.astro
var pages_exports = /* @__PURE__ */ __exportAll({
	default: () => $$Index,
	file: () => $$file,
	url: () => ""
});
var $$Index = createComponent(($$result, $$props, $$slots) => {
	const categories = [
		{
			href: "/enem",
			key: "enem",
			label: "ENEM",
			color: "var(--color-enem)",
			soft: "var(--color-enem-soft)",
			description: "Conteúdo focado no que o INEP cobra: teoria direta, pegadinhas mapeadas e questões oficiais para treinar.",
			meta: "por área e matéria"
		},
		{
			href: "/escolar",
			key: "escolar",
			label: "Escolar",
			color: "var(--color-escolar)",
			soft: "var(--color-escolar-soft)",
			description: "O conteúdo passado em sala de aula, organizado por matéria, bimestre e semana — para quem faltou ou quer revisar.",
			meta: "por bimestre e semana"
		},
		{
			href: "/ds",
			key: "ds",
			label: "DS",
			color: "var(--color-ds)",
			soft: "var(--color-ds-soft)",
			description: "Material do curso técnico, em linguagem simples, para reforçar o que foi visto em aula.",
			meta: "por bimestre e semana"
		}
	];
	return renderTemplate`${renderComponent($$result, "Base", $$Base, {
		"title": "Início",
		"active": "hub",
		"description": "Painel central de conteúdo de estudo compartilhado pela turma"
	}, { "default": ($$result) => renderTemplate`${maybeRenderHead($$result)}<section class="mb-12 md:mb-16"><div class="flex items-center gap-2 mb-3"><p class="font-mono text-xs uppercase tracking-widest text-ink-soft">hub principal</p>${renderComponent($$result, "HelpTip", $$HelpTip, { "title": "Como usar este hub" }, { "default": ($$result) => renderTemplate`Este é o painel central: cada card abaixo leva para uma categoria de conteúdo. Use as abas no topo para trocar de categoria a qualquer momento, ou os botões de seta para voltar e avançar entre páginas já visitadas.` })}</div><h1 class="font-display text-3xl md:text-5xl font-bold text-ink leading-tight mb-4 max-w-2xl">Tudo o que a turma estuda, num lugar só.</h1><p class="font-body text-ink-soft max-w-xl leading-relaxed">Escolha uma categoria abaixo. Cada uma organiza o conteúdo de um jeito diferente, mas toda aula segue a mesma estrutura: relevância, teoria explicada com calma, resumo para o caderno e um teste de 5 questões no final.</p></section><section class="grid md:grid-cols-3 gap-5">${categories.map((cat) => renderTemplate`<a${addAttribute(u(cat.href), "href")} class="group block rounded-lg border-2 p-6 transition-transform hover:-translate-y-1"${addAttribute(`border-color: ${cat.color}; background-color: ${cat.soft};`, "style")}><p class="font-mono text-[11px] uppercase tracking-widest mb-3"${addAttribute(`color: ${cat.color}`, "style")}>${cat.meta}</p><h2 class="font-display text-2xl font-bold text-ink mb-3">${cat.label}</h2><p class="font-body text-sm text-ink leading-relaxed mb-4">${cat.description}</p><span class="font-mono text-xs font-bold uppercase tracking-wide inline-flex items-center gap-1"${addAttribute(`color: ${cat.color}`, "style")}>Entrar<span class="transition-transform group-hover:translate-x-1">→</span></span></a>`)}</section>` })}`;
}, "C:/Users/Islan/OneDrive/Desktop/PROJETOS PESSOAIS/caderno do aluno/src/pages/index.astro", void 0);
var $$file = "C:/Users/Islan/OneDrive/Desktop/PROJETOS PESSOAIS/caderno do aluno/src/pages/index.astro";
//#endregion
//#region \0virtual:astro:page:src/pages/index@_@astro
var page = () => pages_exports;
//#endregion
export { page };
