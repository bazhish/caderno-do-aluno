import { t as __exportAll } from "./rolldown-runtime_D7D4PA-g.mjs";
import { n as createSupabaseServer } from "./supabaseServer_aFX2ivqt.mjs";
//#region src/pages/api/auth/logout.ts
var logout_exports = /* @__PURE__ */ __exportAll({ POST: () => POST });
var POST = async (context) => {
	await createSupabaseServer(context).auth.signOut();
	return context.redirect("/login");
};
//#endregion
//#region \0virtual:astro:page:src/pages/api/auth/logout@_@ts
var page = () => logout_exports;
//#endregion
export { page };
