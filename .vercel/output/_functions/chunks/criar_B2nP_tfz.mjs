import { t as __exportAll } from "./rolldown-runtime_D7D4PA-g.mjs";
import { a as usernameParaEmail, n as createSupabaseServer, r as senhaPadrao, t as USERNAME_RULE } from "./supabaseServer_aFX2ivqt.mjs";
import { createClient } from "@supabase/supabase-js";
//#region src/pages/api/usuarios/criar.ts
var criar_exports = /* @__PURE__ */ __exportAll({ POST: () => POST });
var json = (status, body) => new Response(JSON.stringify(body), {
	status,
	headers: { "Content-Type": "application/json" }
});
var POST = async (context) => {
	const requester = context.locals.user;
	if (!requester || requester.role !== "adm" && requester.role !== "coordenador") return json(403, { error: "Só coordenadores e ADMs registram contas." });
	let payload;
	try {
		payload = await context.request.json();
	} catch {
		return json(400, { error: "Corpo inválido." });
	}
	const nomeCompleto = (payload.nomeCompleto ?? "").trim();
	const username = (payload.username ?? "").trim().toLowerCase();
	const papel = payload.papel === "coordenador" ? "coordenador" : "aluno";
	if (nomeCompleto.split(/\s+/).length < 2) return json(400, { error: "Informe o nome completo (nome e sobrenome)." });
	if (!USERNAME_RULE.test(username)) return json(400, { error: "Username inválido: 3 a 30 caracteres, só minúsculas, números, ponto, hífen ou underline. Padrão: nome.inicial.sala" });
	if (papel === "coordenador" && requester.role !== "adm") return json(403, { error: "Só o ADM registra coordenadores." });
	const salaId = requester.role === "adm" ? payload.salaId || null : requester.salaId;
	const supabase = createSupabaseServer(context);
	const { data: existente } = await supabase.from("profiles").select("id").eq("username", username).maybeSingle();
	if (existente) return json(409, { error: `O username "${username}" já está em uso. Ajuste (ex: acrescente um número) e tente de novo.` });
	const senha = senhaPadrao(nomeCompleto);
	const { error } = await createClient("https://bjotfrlhdixdpkhcnung.supabase.co", "sb_publishable_KZ0vsyecBmn7kG7UtdJGYA_WcX8aZjv", { auth: {
		persistSession: false,
		autoRefreshToken: false
	} }).auth.signUp({
		email: usernameParaEmail(username),
		password: senha,
		options: { data: {
			username,
			nome_completo: nomeCompleto,
			sala_id: salaId ?? "",
			must_change_password: true
		} }
	});
	if (error) {
		if (/already registered/i.test(error.message)) return json(409, { error: `O username "${username}" já está em uso.` });
		return json(500, { error: `Não deu pra criar a conta: ${error.message}` });
	}
	if (papel === "coordenador") {
		const { error: promoteError } = await supabase.rpc("promote_user", {
			target_username: username,
			new_role: "coordenador"
		});
		if (promoteError) return json(500, { error: `Conta criada como aluno, mas a promoção falhou: ${promoteError.message}` });
	}
	return json(200, {
		ok: true,
		username,
		senhaPadrao: senha,
		papel
	});
};
//#endregion
//#region \0virtual:astro:page:src/pages/api/usuarios/criar@_@ts
var page = () => criar_exports;
//#endregion
export { page };
