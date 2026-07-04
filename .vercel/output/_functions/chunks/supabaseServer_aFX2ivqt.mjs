import { createServerClient, parseCookieHeader } from "@supabase/ssr";
//#region src/lib/supabaseServer.ts
var SUPABASE_URL = "https://bjotfrlhdixdpkhcnung.supabase.co";
var SUPABASE_ANON_KEY = "sb_publishable_KZ0vsyecBmn7kG7UtdJGYA_WcX8aZjv";
var supabaseConfigured = Boolean(SUPABASE_ANON_KEY);
function createSupabaseServer({ request, cookies }) {
	return createServerClient(SUPABASE_URL, SUPABASE_ANON_KEY, { cookies: {
		getAll() {
			return parseCookieHeader(request.headers.get("cookie") ?? "").map(({ name, value }) => ({
				name,
				value: value ?? ""
			}));
		},
		setAll(cookiesToSet) {
			for (const { name, value, options } of cookiesToSet) cookies.set(name, value, {
				...options,
				path: "/"
			});
		}
	} });
}
function usernameParaEmail(username) {
	return `${username.trim().toLowerCase()}@caderno.local`;
}
var USERNAME_RULE = /^[a-z0-9][a-z0-9._-]{2,29}$/;
function senhaPadrao(nomeCompleto) {
	const partes = nomeCompleto.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase().split(/\s+/).filter(Boolean);
	return `${partes[0] ?? "aluno"}.${partes.length > 1 ? partes[partes.length - 1] : "turma"}@${(/* @__PURE__ */ new Date()).getFullYear()}`;
}
//#endregion
export { usernameParaEmail as a, supabaseConfigured as i, createSupabaseServer as n, senhaPadrao as r, USERNAME_RULE as t };
