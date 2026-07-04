import { t as __exportAll } from "./rolldown-runtime_D7D4PA-g.mjs";
import { n as createSupabaseServer } from "./supabaseServer_aFX2ivqt.mjs";
//#region src/pages/api/auth/trocar-senha.ts
var trocar_senha_exports = /* @__PURE__ */ __exportAll({ POST: () => POST });
var POST = async (context) => {
	const form = await context.request.formData();
	const senha = String(form.get("senha") ?? "");
	const confirma = String(form.get("confirma") ?? "");
	if (senha.length < 6) return context.redirect("/trocar-senha?erro=curta");
	if (senha !== confirma) return context.redirect("/trocar-senha?erro=diferentes");
	const supabase = createSupabaseServer(context);
	const { error } = await supabase.auth.updateUser({ password: senha });
	if (error) return context.redirect("/trocar-senha?erro=falha");
	await supabase.rpc("clear_must_change_password");
	return context.redirect("/");
};
//#endregion
//#region \0virtual:astro:page:src/pages/api/auth/trocar-senha@_@ts
var page = () => trocar_senha_exports;
//#endregion
export { page };
