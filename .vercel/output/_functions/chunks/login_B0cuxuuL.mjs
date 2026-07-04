import { t as __exportAll } from "./rolldown-runtime_D7D4PA-g.mjs";
import { B as createComponent, M as renderHead, O as renderTemplate, z as createAstro } from "./render_BRuglh_w.mjs";
import "./compiler_BRHGNyhy.mjs";
/* empty css                 */
//#region src/pages/login.astro
var login_exports = /* @__PURE__ */ __exportAll({
	default: () => $$Login,
	file: () => $$file,
	url: () => $$url
});
createAstro("https://astro.build");
var $$Login = createComponent(($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$Login;
	const erro = Astro.url.searchParams.get("erro");
	const mensagem = erro ? {
		campos: "Preencha o nome de usuário e a senha.",
		credenciais: "Usuário ou senha incorretos. Confira com seu coordenador."
	}[erro] ?? "Algo deu errado. Tente de novo." : null;
	return renderTemplate`<html lang="pt-BR" data-astro-cid-sjqh5bze><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><meta name="description" content="Entre no Caderno da Turma"><title>Entrar · Caderno da Turma</title><link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin><link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;700&family=Literata:opsz,wght@6..72,400;6..72,500;6..72,600&family=JetBrains+Mono:wght@400;600&display=swap" rel="stylesheet">${renderHead($$result)}</head><body class="min-h-screen flex items-center justify-center px-4" data-astro-cid-sjqh5bze><main class="w-full max-w-sm" data-astro-cid-sjqh5bze><h1 class="font-display font-bold text-2xl text-black text-center mb-1" data-astro-cid-sjqh5bze>Caderno da Turma<span style="color: var(--color-enem)" data-astro-cid-sjqh5bze>.</span></h1><p class="font-mono text-xs text-ink-soft text-center mb-8" data-astro-cid-sjqh5bze>Feito por alunos, para alunos</p><form method="POST" action="/api/auth/login" class="paper-card rounded-lg p-6 flex flex-col gap-4" data-astro-cid-sjqh5bze><label class="block" data-astro-cid-sjqh5bze><span class="font-mono text-[11px] uppercase tracking-wide text-ink-soft block mb-1" data-astro-cid-sjqh5bze>Nome de usuário</span><input type="text" name="username" placeholder="ex: joao.s.3dsa" autocomplete="username" required autofocus class="w-full rounded-md border border-paper-dark bg-white/80 px-3 py-2.5 font-body text-sm text-ink focus:outline-none focus:border-ink-soft" data-astro-cid-sjqh5bze></label><label class="block" data-astro-cid-sjqh5bze><span class="font-mono text-[11px] uppercase tracking-wide text-ink-soft block mb-1" data-astro-cid-sjqh5bze>Senha</span><input type="password" name="password" autocomplete="current-password" required class="w-full rounded-md border border-paper-dark bg-white/80 px-3 py-2.5 font-body text-sm text-ink focus:outline-none focus:border-ink-soft" data-astro-cid-sjqh5bze></label>${mensagem && renderTemplate`<p class="font-body text-xs text-enem leading-relaxed" data-astro-cid-sjqh5bze>${mensagem}</p>`}<button type="submit" class="font-display font-bold text-sm px-5 py-3 rounded-md text-white bg-enem hover:opacity-90 transition-opacity" data-astro-cid-sjqh5bze>Entrar</button><p class="font-body text-[11px] text-ink-soft leading-relaxed" data-astro-cid-sjqh5bze>Não tem conta? O coordenador da sua sala registra você. No primeiro acesso, use a senha padrão que ele te passar — o sistema vai pedir pra você trocar.</p></form></main></body></html>`;
}, "C:/Users/Islan/OneDrive/Desktop/PROJETOS PESSOAIS/caderno do aluno/src/pages/login.astro", void 0);
var $$file = "C:/Users/Islan/OneDrive/Desktop/PROJETOS PESSOAIS/caderno do aluno/src/pages/login.astro";
var $$url = "/login";
//#endregion
//#region \0virtual:astro:page:src/pages/login@_@astro
var page = () => login_exports;
//#endregion
export { page };
