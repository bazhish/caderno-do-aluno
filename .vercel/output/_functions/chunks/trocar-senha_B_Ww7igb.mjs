import { t as __exportAll } from "./rolldown-runtime_D7D4PA-g.mjs";
import { B as createComponent, C as renderComponent, O as renderTemplate, j as maybeRenderHead, z as createAstro } from "./render_BRuglh_w.mjs";
import "./compiler_BRHGNyhy.mjs";
import { t as $$Base } from "./Base_Dv6FTpXP.mjs";
//#region src/pages/trocar-senha.astro
var trocar_senha_exports = /* @__PURE__ */ __exportAll({
	default: () => $$TrocarSenha,
	file: () => $$file,
	url: () => $$url
});
createAstro("https://astro.build");
var $$TrocarSenha = createComponent(($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$TrocarSenha;
	const user = Astro.locals.user;
	if (!user) return Astro.redirect("/login");
	const erro = Astro.url.searchParams.get("erro");
	const mensagem = erro ? {
		curta: "A senha precisa de pelo menos 6 caracteres.",
		diferentes: "As duas senhas não são iguais.",
		falha: "Não deu pra trocar a senha. Tente de novo."
	}[erro] ?? "Algo deu errado." : null;
	return renderTemplate`${renderComponent($$result, "Base", $$Base, { "title": "Trocar senha" }, { "default": ($$result) => renderTemplate`${maybeRenderHead($$result)}<div class="max-w-md mx-auto"><p class="font-mono text-xs uppercase tracking-widest text-ink-soft mb-2">${user.mustChangePassword ? "primeiro acesso" : "segurança"}</p><h1 class="font-display text-2xl md:text-3xl font-bold text-ink mb-3">${user.mustChangePassword ? `Boas-vindas, @${user.username}!` : "Trocar senha"}</h1>${user.mustChangePassword && renderTemplate`<p class="font-body text-sm text-ink-soft mb-8 leading-relaxed">Você entrou com a senha padrão. Por segurança, escolha agora uma senha pessoal — só você vai conhecê-la.</p>`}<form method="POST" action="/api/auth/trocar-senha" class="flex flex-col gap-4"><label class="block"><span class="font-mono text-[11px] uppercase tracking-wide text-ink-soft block mb-1">Nova senha</span><input type="password" name="senha" autocomplete="new-password" required minlength="6" placeholder="mínimo 6 caracteres" class="w-full rounded-md border border-paper-dark bg-white/80 px-3 py-2.5 font-body text-sm text-ink focus:outline-none focus:border-ink-soft"></label><label class="block"><span class="font-mono text-[11px] uppercase tracking-wide text-ink-soft block mb-1">Repita a nova senha</span><input type="password" name="confirma" autocomplete="new-password" required minlength="6" class="w-full rounded-md border border-paper-dark bg-white/80 px-3 py-2.5 font-body text-sm text-ink focus:outline-none focus:border-ink-soft"></label>${mensagem && renderTemplate`<p class="font-body text-xs text-enem leading-relaxed">${mensagem}</p>`}<button type="submit" class="font-display font-bold text-sm px-5 py-3 rounded-md text-white bg-escolar hover:opacity-90 transition-opacity self-start">Salvar nova senha</button></form></div>` })}`;
}, "C:/Users/Islan/OneDrive/Desktop/PROJETOS PESSOAIS/caderno do aluno/src/pages/trocar-senha.astro", void 0);
var $$file = "C:/Users/Islan/OneDrive/Desktop/PROJETOS PESSOAIS/caderno do aluno/src/pages/trocar-senha.astro";
var $$url = "/trocar-senha";
//#endregion
//#region \0virtual:astro:page:src/pages/trocar-senha@_@astro
var page = () => trocar_senha_exports;
//#endregion
export { page };
