import { U as sequence, tt as defineMiddleware } from "./chunks/render_BRuglh_w.mjs";
import { i as supabaseConfigured, n as createSupabaseServer } from "./chunks/supabaseServer_aFX2ivqt.mjs";
//#region src/middleware.ts
var PUBLIC_PATHS = [
	/^\/login\/?$/,
	/^\/api\/auth\/login\/?$/,
	/^\/_astro\//,
	/^\/_image/,
	/^\/favicon/
];
//#endregion
//#region \0virtual:astro:middleware
var onRequest = sequence(defineMiddleware(async (context, next) => {
	context.locals.user = null;
	if (!supabaseConfigured) return next();
	const { pathname } = context.url;
	if (PUBLIC_PATHS.some((re) => re.test(pathname))) return next();
	const supabase = createSupabaseServer(context);
	const { data: { user } } = await supabase.auth.getUser();
	if (!user) {
		if (pathname.startsWith("/api/")) return new Response(JSON.stringify({ error: "não autenticado" }), {
			status: 401,
			headers: { "Content-Type": "application/json" }
		});
		return context.redirect("/login");
	}
	const { data: profile } = await supabase.from("profiles").select("username, role, sala_id, must_change_password").eq("id", user.id).maybeSingle();
	context.locals.user = {
		id: user.id,
		username: profile?.username ?? "",
		role: profile?.role ?? "aluno",
		salaId: profile?.sala_id ?? null,
		mustChangePassword: profile?.must_change_password ?? false
	};
	if (context.locals.user?.mustChangePassword && pathname !== "/trocar-senha" && !pathname.startsWith("/api/auth/")) return context.redirect("/trocar-senha");
	return next();
}));
//#endregion
export { onRequest };
