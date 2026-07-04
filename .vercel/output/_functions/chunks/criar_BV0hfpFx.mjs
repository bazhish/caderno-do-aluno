import { t as __exportAll } from "./rolldown-runtime_D7D4PA-g.mjs";
import { n as createSupabaseServer } from "./supabaseServer_aFX2ivqt.mjs";
//#region src/pages/api/salas/criar.ts
var criar_exports = /* @__PURE__ */ __exportAll({ POST: () => POST });
var json = (status, body) => new Response(JSON.stringify(body), {
	status,
	headers: { "Content-Type": "application/json" }
});
var POST = async (context) => {
	const requester = context.locals.user;
	if (!requester || requester.role !== "adm") return json(403, { error: "Só o ADM cria salas." });
	let payload;
	try {
		payload = await context.request.json();
	} catch {
		return json(400, { error: "Corpo inválido." });
	}
	const nome = (payload.nome ?? "").trim();
	const ano = Number(payload.ano);
	if (!nome || !(ano >= 1 && ano <= 3)) return json(400, { error: "Informe o nome da sala e o ano (1 a 3)." });
	const { data, error } = await createSupabaseServer(context).rpc("criar_sala", {
		p_nome: nome,
		p_ano: ano,
		p_curso_slug: payload.cursoSlug || null
	});
	if (error) return json(500, { error: error.message });
	return json(200, {
		ok: true,
		salaId: data
	});
};
//#endregion
//#region \0virtual:astro:page:src/pages/api/salas/criar@_@ts
var page = () => criar_exports;
//#endregion
export { page };
