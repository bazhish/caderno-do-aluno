import { t as __exportAll } from "./rolldown-runtime_D7D4PA-g.mjs";
import { B as createComponent, C as renderComponent, N as addAttribute, O as renderTemplate, j as maybeRenderHead, x as renderScript, z as createAstro } from "./render_BRuglh_w.mjs";
import { n as createSupabaseServer } from "./supabaseServer_aFX2ivqt.mjs";
import "./compiler_BRHGNyhy.mjs";
import { t as $$Base } from "./Base_Dv6FTpXP.mjs";
//#region src/pages/admin/index.astro
var admin_exports = /* @__PURE__ */ __exportAll({
	default: () => $$Index,
	file: () => $$file,
	url: () => $$url
});
createAstro("https://astro.build");
var $$Index = createComponent(async ($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$Index;
	const user = Astro.locals.user;
	if (!user || user.role !== "adm" && user.role !== "coordenador") return Astro.redirect("/");
	const isAdm = user.role === "adm";
	const supabase = createSupabaseServer(Astro);
	const [{ data: salas }, { data: cursos }, { data: perfis }, { data: privados }] = await Promise.all([
		supabase.from("salas").select("id, nome, ano").order("nome"),
		supabase.from("cursos").select("slug, nome").order("nome"),
		supabase.from("profiles").select("id, username, role, sala_id, created_at").order("created_at", { ascending: false }).limit(200),
		supabase.from("profiles_privados").select("user_id, nome_completo")
	]);
	const nomePorId = new Map((privados ?? []).map((p) => [p.user_id, p.nome_completo]));
	const salaPorId = new Map((salas ?? []).map((s) => [s.id, s.nome]));
	const minhaSala = user.salaId ? salaPorId.get(user.salaId) ?? "—" : null;
	return renderTemplate`${renderComponent($$result, "Base", $$Base, { "title": "Gestão" }, { "default": async ($$result) => renderTemplate`${maybeRenderHead($$result)}<p class="font-mono text-xs uppercase tracking-widest text-ink-soft mb-2">painel de gestão · ${isAdm ? "ADM" : `coordenador ${minhaSala ? `· ${minhaSala}` : ""}`}</p><h1 class="font-display text-3xl md:text-4xl font-bold text-ink mb-10">Gestão da turma</h1><div class="grid md:grid-cols-2 gap-8 mb-12"><section class="rounded-lg border border-paper-dark bg-white/50 p-5"><h2 class="font-display text-lg font-bold text-ink mb-1">Registrar conta</h2><p class="font-body text-xs text-ink-soft mb-4 leading-relaxed">A senha padrão é gerada no formato <code>nome.sobrenome@ano</code> — anote e entregue à pessoa. No primeiro login o sistema obriga a trocar.</p><form id="form-usuario" class="flex flex-col gap-3"><input type="text" name="nomeCompleto" placeholder="Nome completo (ex: João Silva Santos)" required class="w-full rounded-md border border-paper-dark bg-white/80 px-3 py-2 font-body text-sm text-ink focus:outline-none focus:border-ink-soft"><input type="text" name="username" placeholder="Username (ex: joao.s.3dsa)" required class="w-full rounded-md border border-paper-dark bg-white/80 px-3 py-2 font-body text-sm text-ink focus:outline-none focus:border-ink-soft">${isAdm ? renderTemplate`<select name="salaId" class="w-full rounded-md border border-paper-dark bg-white/80 px-3 py-2 font-body text-sm text-ink focus:outline-none"><option value="">Sem sala (ex: ADM)</option>${(salas ?? []).map((s) => renderTemplate`<option${addAttribute(s.id, "value")}>${s.nome}</option>`)}</select>` : renderTemplate`<p class="font-mono text-[11px] text-ink-soft">Sala: ${minhaSala ?? "sem sala definida"}</p>`}${isAdm && renderTemplate`<select name="papel" class="w-full rounded-md border border-paper-dark bg-white/80 px-3 py-2 font-body text-sm text-ink focus:outline-none"><option value="aluno">Aluno</option><option value="coordenador">Coordenador</option></select>`}<button type="submit" class="font-display font-bold text-sm px-5 py-2.5 rounded-md text-white bg-ds hover:opacity-90 transition-opacity self-start">Registrar</button><p id="resultado-usuario" class="font-body text-xs leading-relaxed"></p></form></section>${isAdm && renderTemplate`<section class="rounded-lg border border-paper-dark bg-white/50 p-5"><h2 class="font-display text-lg font-bold text-ink mb-1">Criar sala</h2><p class="font-body text-xs text-ink-soft mb-4 leading-relaxed">Ex: "3º DS A". Salas de 1º ano não têm curso.</p><form id="form-sala" class="flex flex-col gap-3"><input type="text" name="nome" placeholder="Nome da sala (ex: 3º DS A)" required class="w-full rounded-md border border-paper-dark bg-white/80 px-3 py-2 font-body text-sm text-ink focus:outline-none focus:border-ink-soft"><select name="ano" class="w-full rounded-md border border-paper-dark bg-white/80 px-3 py-2 font-body text-sm text-ink focus:outline-none"><option value="1">1º ano</option><option value="2">2º ano</option><option value="3">3º ano</option></select><select name="cursoSlug" class="w-full rounded-md border border-paper-dark bg-white/80 px-3 py-2 font-body text-sm text-ink focus:outline-none"><option value="">Sem curso (regular)</option>${(cursos ?? []).map((c) => renderTemplate`<option${addAttribute(c.slug, "value")}>${c.nome}</option>`)}</select><button type="submit" class="font-display font-bold text-sm px-5 py-2.5 rounded-md text-white bg-escolar hover:opacity-90 transition-opacity self-start">Criar sala</button><p id="resultado-sala" class="font-body text-xs leading-relaxed"></p></form></section>`}</div><section><h2 class="font-display text-lg font-bold text-ink mb-4">Contas registradas <span class="font-mono text-xs text-ink-soft">(${(perfis ?? []).length})</span></h2><div class="overflow-x-auto rounded-lg border border-paper-dark bg-white/50"><table class="w-full text-left"><thead><tr class="font-mono text-[11px] uppercase tracking-wide text-ink-soft border-b border-paper-dark"><th class="px-4 py-3">Username</th><th class="px-4 py-3">Nome completo</th><th class="px-4 py-3">Sala</th><th class="px-4 py-3">Papel</th></tr></thead><tbody class="font-body text-sm text-ink">${(perfis ?? []).map((p) => renderTemplate`<tr class="border-b border-paper-dark/50 last:border-0"><td class="px-4 py-2.5 font-mono text-xs">@${p.username}</td><td class="px-4 py-2.5">${nomePorId.get(p.id) ?? "—"}</td><td class="px-4 py-2.5">${p.sala_id ? salaPorId.get(p.sala_id) ?? "—" : "—"}</td><td class="px-4 py-2.5"><span${addAttribute([
		"font-mono text-[10px] font-bold uppercase tracking-wide rounded-full px-2 py-0.5",
		p.role === "adm" && "bg-ink text-paper",
		p.role === "coordenador" && "bg-escolar-soft text-escolar",
		p.role === "aluno" && "bg-paper-dark/60 text-ink-soft"
	], "class:list")}>${p.role}</span></td></tr>`)}</tbody></table></div></section>${renderScript($$result, "C:/Users/Islan/OneDrive/Desktop/PROJETOS PESSOAIS/caderno do aluno/src/pages/admin/index.astro?astro&type=script&index=0&lang.ts")}` })}`;
}, "C:/Users/Islan/OneDrive/Desktop/PROJETOS PESSOAIS/caderno do aluno/src/pages/admin/index.astro", void 0);
var $$file = "C:/Users/Islan/OneDrive/Desktop/PROJETOS PESSOAIS/caderno do aluno/src/pages/admin/index.astro";
var $$url = "/admin";
//#endregion
//#region \0virtual:astro:page:src/pages/admin/index@_@astro
var page = () => admin_exports;
//#endregion
export { page };
