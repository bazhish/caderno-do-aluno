import { B as createComponent, D as renderSlot, N as addAttribute, O as renderTemplate, j as maybeRenderHead, z as createAstro } from "./render_BRuglh_w.mjs";
import "./compiler_BRHGNyhy.mjs";
//#region src/components/HelpTip.astro
createAstro("https://astro.build");
var $$HelpTip = createComponent(($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$HelpTip;
	const { title } = Astro.props;
	const id = `help-${title.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "")}`;
	return renderTemplate`${maybeRenderHead($$result)}<button type="button" class="help-btn"${addAttribute(id, "data-help-target")}${addAttribute(`Ajuda: ${title}`, "aria-label")} data-astro-cid-tvqu44ik>?</button><dialog${addAttribute(id, "id")} class="help-dialog" data-astro-cid-tvqu44ik><button type="button" class="help-close" data-help-close aria-label="Fechar ajuda" data-astro-cid-tvqu44ik>×</button><h3 class="font-display text-lg font-bold text-ink mb-2" data-astro-cid-tvqu44ik>${title}</h3><div class="font-body text-sm text-ink-soft leading-relaxed" data-astro-cid-tvqu44ik>${renderSlot($$result, $$slots["default"])}</div></dialog>`;
}, "C:/Users/Islan/OneDrive/Desktop/PROJETOS PESSOAIS/caderno do aluno/src/components/HelpTip.astro", void 0);
//#endregion
export { $$HelpTip as t };
