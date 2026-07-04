import { B as createComponent, C as renderComponent, D as renderSlot, M as renderHead, N as addAttribute, O as renderTemplate, j as maybeRenderHead, x as renderScript, z as createAstro } from "./render_BRuglh_w.mjs";
import "./compiler_BRHGNyhy.mjs";
/* empty css                 */
//#region src/lib/url.ts
var base = "/".replace(/\/+$/, "");
function u(path) {
	return `${base}${path}` || "/";
}
//#endregion
//#region src/components/TabNav.astro
createAstro("https://astro.build");
var $$TabNav = createComponent(($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$TabNav;
	const { active = null } = Astro.props;
	return renderTemplate`${maybeRenderHead($$result)}<!-- z-index: a folha (.paper-sheet, z 5) cobre a base das abas inativas (z 1-4),
     como divisórias coladas nas folhas de trás; só a aba ativa (z 30) fica na frente. --><nav class="flex gap-1.5 md:gap-2 px-3 md:px-10 flex-wrap" aria-label="Categorias" data-astro-cid-bxhs5b4m>${[
		{
			key: "hub",
			label: "Início",
			href: "/",
			color: "var(--color-ink)",
			soft: "var(--color-paper-dark)"
		},
		{
			key: "enem",
			label: "ENEM",
			href: "/enem",
			color: "var(--color-enem)",
			soft: "var(--color-enem-soft)"
		},
		{
			key: "escolar",
			label: "Escolar",
			href: "/escolar",
			color: "var(--color-escolar)",
			soft: "var(--color-escolar-soft)"
		},
		{
			key: "ds",
			label: "DS",
			href: "/ds",
			color: "var(--color-ds)",
			soft: "var(--color-ds-soft)"
		}
	].map((tab, i) => {
		const isActive = active === tab.key;
		return renderTemplate`<a${addAttribute(u(tab.href), "href")} class="tab font-display font-bold text-xs sm:text-sm md:text-base uppercase tracking-wide px-3.5 sm:px-5 md:px-7 py-2.5 md:py-3 rounded-t-lg transition-all"${addAttribute(`--tab-color: ${tab.color}; --tab-soft: ${tab.soft}; z-index: ${isActive ? 30 : 4 - i};`, "style")}${addAttribute(isActive, "data-active")} data-astro-cid-bxhs5b4m>${tab.label}</a>`;
	})}</nav>`;
}, "C:/Users/Islan/OneDrive/Desktop/PROJETOS PESSOAIS/caderno do aluno/src/components/TabNav.astro", void 0);
//#endregion
//#region src/layouts/Base.astro
createAstro("https://astro.build");
var $$Base = createComponent(($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$Base;
	const { title, active = null, description = "Central de conteúdo da turma" } = Astro.props;
	const user = Astro.locals.user;
	const borderColor = active ? {
		hub: "var(--color-ink)",
		enem: "var(--color-enem)",
		escolar: "var(--color-escolar)",
		ds: "var(--color-ds)"
	}[active] : "var(--color-line)";
	return renderTemplate`<html lang="pt-BR" data-astro-cid-hkbrpulz><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><meta name="description"${addAttribute(description, "content")}><title>${title} · Caderno da Turma</title><link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin><link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;700&family=Literata:opsz,wght@6..72,400;6..72,500;6..72,600&family=JetBrains+Mono:wght@400;600&display=swap" rel="stylesheet">${renderHead($$result)}</head><body class="min-h-screen flex flex-col" data-astro-cid-hkbrpulz><header class="pt-6 sm:pt-8 md:pt-12" data-astro-cid-hkbrpulz><div class="px-3 sm:px-4 md:px-10 flex items-center justify-between gap-3 max-w-5xl mx-auto w-full" data-astro-cid-hkbrpulz><div class="flex items-center gap-2 sm:gap-3" data-astro-cid-hkbrpulz><div class="flex items-center gap-1" role="group" aria-label="Navegação do histórico" data-astro-cid-hkbrpulz><button type="button" class="hist-btn" onclick="history.back()" aria-label="Voltar" data-astro-cid-hkbrpulz>←</button><button type="button" class="hist-btn" onclick="history.forward()" aria-label="Avançar" data-astro-cid-hkbrpulz>→</button></div><a${addAttribute(u("/"), "href")} class="font-display font-bold text-base sm:text-lg md:text-xl text-black no-underline" data-astro-cid-hkbrpulz>Caderno da Turma<span style="color: var(--color-enem)" data-astro-cid-hkbrpulz>.</span></a></div>${user ? renderTemplate`<div class="flex items-center gap-2" data-astro-cid-hkbrpulz>${(user.role === "adm" || user.role === "coordenador") && renderTemplate`<a href="/admin" class="font-mono text-[11px] font-bold uppercase tracking-wide bg-ink text-paper rounded-full px-2.5 py-1 no-underline hover:opacity-85" data-astro-cid-hkbrpulz>gestão</a>`}<span class="font-mono text-xs text-ink-soft hidden sm:inline" data-astro-cid-hkbrpulz>@${user.username}</span><form method="POST" action="/api/auth/logout" data-astro-cid-hkbrpulz><button type="submit" class="font-mono text-[11px] text-ink-soft hover:text-ink underline underline-offset-2" data-astro-cid-hkbrpulz>sair</button></form></div>` : renderTemplate`<span class="font-mono text-xs text-ink-soft hidden md:inline" data-astro-cid-hkbrpulz>Feito por alunos, para alunos</span>`}</div><div class="max-w-5xl mx-auto w-full mt-5 sm:mt-6" data-astro-cid-hkbrpulz>${renderComponent($$result, "TabNav", $$TabNav, {
		"active": active,
		"data-astro-cid-hkbrpulz": true
	})}</div></header><main class="flex-1 max-w-5xl mx-auto w-full px-3 sm:px-4 md:px-10" data-astro-cid-hkbrpulz><div class="paper-sheet min-h-[60vh] p-4 pl-10 sm:p-6 sm:pl-12 md:p-10 md:pl-16 -mt-[2px]"${addAttribute(`border-color: ${borderColor}; background-color: color-mix(in srgb, var(--color-paper) 92%, white);`, "style")} data-astro-cid-hkbrpulz>${renderSlot($$result, $$slots["default"])}</div></main><footer class="max-w-5xl mx-auto w-full px-3 sm:px-4 md:px-10 py-8 sm:py-10 mt-6 flex flex-wrap items-baseline justify-between gap-2" data-astro-cid-hkbrpulz><p class="font-mono text-xs text-ink-soft" data-astro-cid-hkbrpulz>Consulte sempre um professor em caso de dúvidas.</p><a href="https://github.com/bazhish/caderno-da-turma/blob/main/POSTAR_AULA.md" target="_blank" rel="noopener noreferrer" class="font-mono text-xs text-ink-soft hover:text-ink underline underline-offset-2" data-astro-cid-hkbrpulz>✏️ postar uma aula</a></footer>${renderScript($$result, "C:/Users/Islan/OneDrive/Desktop/PROJETOS PESSOAIS/caderno do aluno/src/layouts/Base.astro?astro&type=script&index=0&lang.ts")}</body></html>`;
}, "C:/Users/Islan/OneDrive/Desktop/PROJETOS PESSOAIS/caderno do aluno/src/layouts/Base.astro", void 0);
//#endregion
export { u as n, $$Base as t };
