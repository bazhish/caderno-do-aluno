import { t as __exportAll } from "./rolldown-runtime_D7D4PA-g.mjs";
import { a as usernameParaEmail, n as createSupabaseServer } from "./supabaseServer_aFX2ivqt.mjs";
//#region src/pages/api/auth/login.ts
var login_exports = /* @__PURE__ */ __exportAll({ POST: () => POST });
var POST = async (context) => {
	const form = await context.request.formData();
	const username = String(form.get("username") ?? "").trim().toLowerCase();
	const password = String(form.get("password") ?? "");
	if (!username || !password) return context.redirect("/login?erro=campos");
	const { error } = await createSupabaseServer(context).auth.signInWithPassword({
		email: usernameParaEmail(username),
		password
	});
	if (error) return context.redirect("/login?erro=credenciais");
	return context.redirect("/");
};
//#endregion
//#region \0virtual:astro:page:src/pages/api/auth/login@_@ts
var page = () => login_exports;
//#endregion
export { page };
