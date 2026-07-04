import { B as createComponent, C as renderComponent, D as renderSlot, N as addAttribute, O as renderTemplate, T as Fragment$1, j as maybeRenderHead, z as createAstro } from "./render_BRuglh_w.mjs";
import "./compiler_BRHGNyhy.mjs";
import { t as $$Base } from "./Base_Dv6FTpXP.mjs";
import { t as $$HelpTip } from "./HelpTip_iDg2tQbq.mjs";
import { useCallback, useEffect, useMemo, useState } from "react";
import { createBrowserClient } from "@supabase/ssr";
import { jsx, jsxs } from "react/jsx-runtime";
//#region src/components/Quiz.jsx
var LETTERS = [
	"A",
	"B",
	"C",
	"D",
	"E"
];
var ACCENTS$1 = {
	enem: {
		bg: "bg-enem",
		text: "text-enem",
		border: "border-enem"
	},
	escolar: {
		bg: "bg-escolar",
		text: "text-escolar",
		border: "border-escolar"
	},
	ds: {
		bg: "bg-ds",
		text: "text-ds",
		border: "border-ds"
	}
};
function Quiz({ questions, accent = "enem" }) {
	const [answers, setAnswers] = useState({});
	const [corrected, setCorrected] = useState({});
	const correctedCount = Object.keys(corrected).length;
	const correctCount = useMemo(() => questions.reduce((acc, q, i) => acc + (corrected[i] && answers[i] === q.correctIndex ? 1 : 0), 0), [
		corrected,
		answers,
		questions
	]);
	const anyStarted = Object.keys(answers).length > 0 || correctedCount > 0;
	function select(qIndex, optIndex) {
		if (corrected[qIndex]) return;
		setAnswers((prev) => ({
			...prev,
			[qIndex]: optIndex
		}));
	}
	function correctOne(qIndex) {
		setCorrected((prev) => ({
			...prev,
			[qIndex]: true
		}));
	}
	function restore() {
		setAnswers({});
		setCorrected({});
	}
	const { bg: accentBg, text: accentText, border: accentBorder } = ACCENTS$1[accent] ?? ACCENTS$1.enem;
	return /* @__PURE__ */ jsxs("div", {
		className: "not-prose my-10 border-t-2 border-line pt-8",
		children: [
			/* @__PURE__ */ jsxs("div", {
				className: "flex flex-wrap items-baseline justify-between gap-2 mb-6",
				children: [/* @__PURE__ */ jsx("h3", {
					className: "font-display text-xl md:text-2xl font-bold text-ink",
					children: "Teste de Fogo"
				}), correctedCount > 0 && /* @__PURE__ */ jsxs("span", {
					className: "font-mono text-sm text-ink-soft",
					children: [
						correctCount,
						" / ",
						correctedCount,
						" corrigidas corretas"
					]
				})]
			}),
			/* @__PURE__ */ jsx("div", {
				className: "space-y-8",
				children: questions.map((q, qi) => {
					const userAnswer = answers[qi];
					const isCorrected = !!corrected[qi];
					const isCorrectQ = isCorrected && userAnswer === q.correctIndex;
					return /* @__PURE__ */ jsxs("div", {
						className: "bg-white/60 border border-paper-dark rounded-lg p-5",
						children: [
							/* @__PURE__ */ jsxs("div", {
								className: "flex items-start gap-3 mb-4",
								children: [/* @__PURE__ */ jsxs("span", {
									className: `font-mono text-xs font-bold ${accentText} shrink-0 mt-1`,
									children: ["Q", qi + 1]
								}), /* @__PURE__ */ jsx("p", {
									className: "font-body text-ink leading-relaxed",
									children: q.question
								})]
							}),
							/* @__PURE__ */ jsx("div", {
								className: "space-y-2 ml-7",
								children: q.options.map((opt, oi) => {
									const selected = userAnswer === oi;
									const showCorrect = isCorrected && oi === q.correctIndex;
									const showWrongSelected = isCorrected && selected && oi !== q.correctIndex;
									let stateClasses = "border-paper-dark hover:border-ink-soft";
									if (selected && !isCorrected) stateClasses = `${accentBorder} bg-paper-dark/40`;
									if (showCorrect) stateClasses = "border-ds bg-ds-soft";
									if (showWrongSelected) stateClasses = "border-enem bg-enem-soft";
									return /* @__PURE__ */ jsxs("button", {
										type: "button",
										onClick: () => select(qi, oi),
										disabled: isCorrected,
										className: `w-full text-left flex gap-3 items-start px-4 py-3 rounded-md border text-sm font-body text-ink transition-colors disabled:cursor-default ${stateClasses}`,
										children: [/* @__PURE__ */ jsx("span", {
											className: "font-mono font-bold text-ink-soft shrink-0",
											children: LETTERS[oi]
										}), /* @__PURE__ */ jsx("span", { children: opt })]
									}, oi);
								})
							}),
							/* @__PURE__ */ jsx("div", {
								className: "ml-7 mt-4",
								children: !isCorrected ? /* @__PURE__ */ jsx("button", {
									type: "button",
									disabled: userAnswer === void 0,
									onClick: () => correctOne(qi),
									className: `font-display font-bold text-sm px-5 py-2.5 rounded-md text-white ${accentBg} disabled:opacity-30 disabled:cursor-not-allowed transition-opacity`,
									children: "Corrigir"
								}) : /* @__PURE__ */ jsxs("div", {
									className: `text-sm font-body leading-relaxed border-l-2 pl-4 ${isCorrectQ ? "border-ds text-ink" : "border-enem text-ink"}`,
									children: [
										/* @__PURE__ */ jsx("p", {
											className: "font-mono text-xs font-bold uppercase tracking-wide mb-1 text-ink-soft",
											children: isCorrectQ ? "Correto" : `Gabarito: ${LETTERS[q.correctIndex]}`
										}),
										/* @__PURE__ */ jsx("p", { children: q.explanation }),
										q.source && /* @__PURE__ */ jsx("p", {
											className: "text-xs text-ink-soft mt-1",
											children: q.source
										})
									]
								})
							})
						]
					}, qi);
				})
			}),
			anyStarted && /* @__PURE__ */ jsx("div", {
				className: "mt-8",
				children: /* @__PURE__ */ jsx("button", {
					type: "button",
					onClick: restore,
					className: "font-display font-bold px-6 py-3 rounded-md border-2 border-ink text-ink hover:bg-ink hover:text-paper transition-colors",
					children: "↺ Restaurar e tentar de novo"
				})
			})
		]
	});
}
//#endregion
//#region src/lib/commentsBackend.js
var SUPABASE_URL = "https://bjotfrlhdixdpkhcnung.supabase.co";
var SUPABASE_ANON_KEY = "sb_publishable_KZ0vsyecBmn7kG7UtdJGYA_WcX8aZjv";
var supabase = null;
function getSupabase() {
	if (!supabase) supabase = createBrowserClient(SUPABASE_URL, SUPABASE_ANON_KEY);
	return supabase;
}
var backend = {
	async getSession() {
		const sb = getSupabase();
		const { data } = await sb.auth.getSession();
		if (!data.session) return { data: null };
		const { data: profile } = await sb.from("profiles").select("username, role").eq("id", data.session.user.id).maybeSingle();
		return { data: { user: {
			id: data.session.user.id,
			username: profile?.username ?? "(sem perfil)",
			role: profile?.role ?? "aluno"
		} } };
	},
	async listComments(slug) {
		const { data, error } = await getSupabase().from("comments").select("id, body, created_at, user_id, profiles(username, role)").eq("lesson_slug", slug).is("deleted_at", null).order("created_at", { ascending: true });
		if (error) return { error: "Não deu pra carregar os comentários. Tente de novo." };
		return { data: (data ?? []).map((c) => ({
			id: c.id,
			body: c.body,
			created_at: c.created_at,
			user_id: c.user_id,
			username: c.profiles?.username ?? "(aluno)",
			role: c.profiles?.role ?? "aluno"
		})) };
	},
	async addComment(slug, body) {
		const text = (body ?? "").trim();
		if (!text) return { error: "Escreva alguma coisa antes de enviar." };
		if (text.length > 1e3) return { error: "O comentário pode ter no máximo 1000 caracteres." };
		const sb = getSupabase();
		const { data: auth } = await sb.auth.getSession();
		if (!auth.session) return { error: "Sua sessão expirou — recarregue a página e entre de novo." };
		const { error } = await sb.from("comments").insert({
			lesson_slug: slug,
			body: text,
			user_id: auth.session.user.id
		});
		if (error) return { error: "Não deu pra enviar o comentário. Tente de novo." };
		return { data: true };
	},
	async deleteComment(id) {
		const { error } = await getSupabase().from("comments").update({ deleted_at: (/* @__PURE__ */ new Date()).toISOString() }).eq("id", id);
		if (error) return { error: "Não deu pra apagar. Você só pode apagar os seus próprios comentários." };
		return { data: true };
	}
};
//#endregion
//#region src/components/Comentarios.jsx
var ACCENTS = {
	enem: {
		bg: "bg-enem",
		text: "text-enem",
		border: "border-enem"
	},
	escolar: {
		bg: "bg-escolar",
		text: "text-escolar",
		border: "border-escolar"
	},
	ds: {
		bg: "bg-ds",
		text: "text-ds",
		border: "border-ds"
	}
};
function formatarData(iso) {
	return new Date(iso).toLocaleString("pt-BR", {
		day: "2-digit",
		month: "2-digit",
		year: "2-digit",
		hour: "2-digit",
		minute: "2-digit"
	});
}
function Comentarios({ slug, accent = "enem" }) {
	const { bg: accentBg, text: accentText } = ACCENTS[accent] ?? ACCENTS.enem;
	const [session, setSession] = useState(null);
	const [comments, setComments] = useState([]);
	const [loading, setLoading] = useState(true);
	const [body, setBody] = useState("");
	const [sendError, setSendError] = useState(null);
	const [sendBusy, setSendBusy] = useState(false);
	const refresh = useCallback(async () => {
		const { data } = await backend.listComments(slug);
		setComments(data ?? []);
	}, [slug]);
	useEffect(() => {
		let alive = true;
		(async () => {
			const [{ data: sess }] = await Promise.all([backend.getSession(), refresh()]);
			if (alive) {
				setSession(sess);
				setLoading(false);
			}
		})();
		return () => {
			alive = false;
		};
	}, [refresh]);
	async function handleSend(e) {
		e.preventDefault();
		setSendBusy(true);
		setSendError(null);
		const result = await backend.addComment(slug, body);
		setSendBusy(false);
		if (result.error) {
			setSendError(result.error);
			return;
		}
		setBody("");
		await refresh();
	}
	async function handleDelete(id) {
		if (!(await backend.deleteComment(id)).error) await refresh();
	}
	const isModerador = session?.user?.role === "adm" || session?.user?.role === "coordenador";
	return /* @__PURE__ */ jsxs("div", {
		className: "not-prose my-10 border-t-2 border-line pt-8",
		children: [
			/* @__PURE__ */ jsxs("div", {
				className: "flex flex-wrap items-baseline justify-between gap-2 mb-1",
				children: [/* @__PURE__ */ jsx("h3", {
					className: "font-display text-xl md:text-2xl font-bold text-ink",
					children: "Comentários da Turma"
				}), comments.length > 0 && /* @__PURE__ */ jsxs("span", {
					className: "font-mono text-xs text-ink-soft",
					children: [
						comments.length,
						" ",
						comments.length === 1 ? "comentário" : "comentários"
					]
				})]
			}),
			/* @__PURE__ */ jsx("p", {
				className: "font-body text-sm text-ink-soft mb-6",
				children: "Dúvidas, dicas e macetes sobre esta aula — pergunte aqui que a turma responde."
			}),
			false,
			loading ? /* @__PURE__ */ jsx("p", {
				className: "font-mono text-xs text-ink-soft mb-6",
				children: "carregando…"
			}) : comments.length === 0 ? /* @__PURE__ */ jsx("p", {
				className: "font-body text-sm text-ink-soft mb-6 rounded-md border border-paper-dark bg-white/40 px-4 py-5 text-center",
				children: "Ainda não tem comentário nesta aula. Seja a primeira pessoa a puxar o assunto!"
			}) : /* @__PURE__ */ jsx("ul", {
				className: "space-y-3 mb-6 list-none p-0 m-0",
				children: comments.map((c) => {
					const canDelete = session && (session.user.id === c.user_id || isModerador);
					return /* @__PURE__ */ jsxs("li", {
						className: "rounded-md border border-paper-dark bg-white/50 px-4 py-3",
						children: [/* @__PURE__ */ jsxs("div", {
							className: "flex flex-wrap items-baseline gap-x-2 gap-y-1 mb-1",
							children: [
								/* @__PURE__ */ jsxs("span", {
									className: `font-mono text-xs font-bold ${accentText}`,
									children: ["@", c.username]
								}),
								c.role === "adm" && /* @__PURE__ */ jsx("span", {
									className: "font-mono text-[10px] font-bold uppercase tracking-wide bg-ink text-paper rounded-full px-2 py-0.5",
									children: "ADM"
								}),
								c.role === "coordenador" && /* @__PURE__ */ jsx("span", {
									className: "font-mono text-[10px] font-bold uppercase tracking-wide bg-escolar-soft text-escolar rounded-full px-2 py-0.5",
									children: "COORD"
								}),
								/* @__PURE__ */ jsx("span", {
									className: "font-mono text-[11px] text-ink-soft",
									children: formatarData(c.created_at)
								}),
								canDelete && /* @__PURE__ */ jsx("button", {
									type: "button",
									onClick: () => handleDelete(c.id),
									className: "ml-auto font-mono text-[11px] text-ink-soft hover:text-enem underline underline-offset-2",
									children: "apagar"
								})
							]
						}), /* @__PURE__ */ jsx("p", {
							className: "font-body text-sm text-ink leading-relaxed whitespace-pre-wrap",
							children: c.body
						})]
					}, c.id);
				})
			}),
			!loading && (session ? /* @__PURE__ */ jsxs("form", {
				onSubmit: handleSend,
				className: "rounded-lg border border-paper-dark bg-white/60 p-4",
				children: [
					/* @__PURE__ */ jsxs("div", {
						className: "flex flex-wrap items-center gap-2 mb-3",
						children: [
							/* @__PURE__ */ jsxs("span", {
								className: `font-mono text-xs font-bold ${accentText}`,
								children: ["@", session.user.username]
							}),
							session.user.role === "adm" && /* @__PURE__ */ jsx("span", {
								className: "font-mono text-[10px] font-bold uppercase tracking-wide bg-ink text-paper rounded-full px-2 py-0.5",
								children: "ADM"
							}),
							session.user.role === "coordenador" && /* @__PURE__ */ jsx("span", {
								className: "font-mono text-[10px] font-bold uppercase tracking-wide bg-escolar-soft text-escolar rounded-full px-2 py-0.5",
								children: "COORD"
							})
						]
					}),
					/* @__PURE__ */ jsx("textarea", {
						value: body,
						onChange: (e) => setBody(e.target.value),
						maxLength: 1e3,
						rows: 3,
						placeholder: "Escreva sua dúvida ou dica sobre esta aula…",
						className: "w-full rounded-md border border-paper-dark bg-white/80 px-3 py-2 font-body text-sm text-ink placeholder:text-ink-soft/70 focus:outline-none focus:border-ink-soft resize-y"
					}),
					/* @__PURE__ */ jsxs("div", {
						className: "flex flex-wrap items-center gap-3 mt-2",
						children: [
							/* @__PURE__ */ jsx("button", {
								type: "submit",
								disabled: sendBusy || !body.trim(),
								className: `font-display font-bold text-sm px-5 py-2.5 rounded-md text-white ${accentBg} disabled:opacity-30 disabled:cursor-not-allowed transition-opacity`,
								children: sendBusy ? "Enviando…" : "Comentar"
							}),
							/* @__PURE__ */ jsxs("span", {
								className: "font-mono text-[11px] text-ink-soft",
								children: [body.length, "/1000"]
							}),
							sendError && /* @__PURE__ */ jsx("span", {
								className: "font-body text-xs text-enem",
								children: sendError
							})
						]
					})
				]
			}) : /* @__PURE__ */ jsxs("p", {
				className: "font-body text-sm text-ink-soft rounded-md border border-paper-dark bg-white/40 px-4 py-4",
				children: [
					"Sua sessão não foi encontrada —",
					" ",
					/* @__PURE__ */ jsx("a", {
						href: "/login",
						className: "underline underline-offset-2 hover:text-ink",
						children: "entre de novo"
					}),
					" ",
					"pra comentar."
				]
			}))
		]
	});
}
//#endregion
//#region src/components/Recursos.astro
createAstro("https://astro.build");
var $$Recursos = createComponent(($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$Recursos;
	const { resources, accent } = Astro.props;
	const va = resources?.videoAula;
	const cg = resources?.cursoGratuito;
	const ma = resources?.materiaisAdicionais;
	const cc = resources?.conteudoComplementar;
	const hasMateriais = ma && (ma.ebook || ma.exercicios || ma.provaAntiga || ma.outro);
	return renderTemplate`${(va || cg || hasMateriais || cc) && renderTemplate`${maybeRenderHead($$result)}<section class="not-prose my-10 border-t-2 border-line pt-8"${addAttribute(`--res-accent: var(--color-${accent}); --res-soft: var(--color-${accent}-soft);`, "style")} data-astro-cid-3i6npqkg><h3 class="font-display text-xl md:text-2xl font-bold text-ink mb-1" data-astro-cid-3i6npqkg>Para ir além</h3><p class="font-body text-sm text-ink-soft mb-6" data-astro-cid-3i6npqkg>Material extra escolhido a dedo pra fixar este tema — vale o clique.</p><div class="grid sm:grid-cols-2 gap-4" data-astro-cid-3i6npqkg>${va && renderTemplate`<a class="res-card"${addAttribute(va.link, "href")} target="_blank" rel="noopener noreferrer" data-astro-cid-3i6npqkg><span class="res-icon" aria-hidden="true" data-astro-cid-3i6npqkg>🎥</span><span class="res-body" data-astro-cid-3i6npqkg><span class="res-kicker" data-astro-cid-3i6npqkg>Vídeo aula${va.duracao ? ` · ${va.duracao}` : ""}</span><span class="res-title" data-astro-cid-3i6npqkg>${va.motivo ?? "Veja este tema explicado em vídeo"}</span><span class="res-cta" data-astro-cid-3i6npqkg>Assistir agora <span class="res-arrow" data-astro-cid-3i6npqkg>→</span></span></span></a>`}${cg && renderTemplate`<a class="res-card"${addAttribute(cg.link, "href")} target="_blank" rel="noopener noreferrer" data-astro-cid-3i6npqkg><span class="res-icon" aria-hidden="true" data-astro-cid-3i6npqkg>📚</span><span class="res-body" data-astro-cid-3i6npqkg><span class="res-kicker" data-astro-cid-3i6npqkg>Curso gratuito${cg.cargaHoraria ? ` · ${cg.cargaHoraria}` : ""}</span><span class="res-title" data-astro-cid-3i6npqkg>${cg.indicadoPara ? `Curso completo, indicado para ${cg.indicadoPara}` : "Curso completo pra dominar o assunto de vez"}</span><span class="res-cta" data-astro-cid-3i6npqkg>Começar o curso <span class="res-arrow" data-astro-cid-3i6npqkg>→</span></span></span></a>`}${hasMateriais && renderTemplate`<div class="res-card" data-astro-cid-3i6npqkg><span class="res-icon" aria-hidden="true" data-astro-cid-3i6npqkg>📦</span><span class="res-body" data-astro-cid-3i6npqkg><span class="res-kicker" data-astro-cid-3i6npqkg>Materiais adicionais${ma?.nivel ? ` · nível ${ma.nivel}` : ""}</span><span class="res-rows" data-astro-cid-3i6npqkg>${ma?.ebook && renderTemplate`<span class="res-row" data-astro-cid-3i6npqkg>📘 <b data-astro-cid-3i6npqkg>Ebook/livros:</b> ${ma.ebook}</span>`}${ma?.exercicios && renderTemplate`<span class="res-row" data-astro-cid-3i6npqkg>✏️ <b data-astro-cid-3i6npqkg>Exercícios:</b> ${ma.exercicios}</span>`}${ma?.provaAntiga && renderTemplate`<span class="res-row" data-astro-cid-3i6npqkg>📄 <b data-astro-cid-3i6npqkg>Prova antiga:</b> ${ma.provaAntiga}</span>`}${ma?.outro && renderTemplate`<span class="res-row" data-astro-cid-3i6npqkg>➕ <b data-astro-cid-3i6npqkg>Outro:</b> ${ma.outro}</span>`}</span></span></div>`}${cc && renderTemplate`<div class="res-card" data-astro-cid-3i6npqkg><span class="res-icon" aria-hidden="true" data-astro-cid-3i6npqkg>🔗</span><span class="res-body" data-astro-cid-3i6npqkg><span class="res-kicker" data-astro-cid-3i6npqkg>Conteúdo complementar</span><span class="res-title" data-astro-cid-3i6npqkg><b data-astro-cid-3i6npqkg>${cc.conteudo}</b></span>${cc.comoAjuda && renderTemplate`<span class="res-note" data-astro-cid-3i6npqkg>${cc.comoAjuda}</span>`}</span></div>`}</div></section>`}`;
}, "C:/Users/Islan/OneDrive/Desktop/PROJETOS PESSOAIS/caderno do aluno/src/components/Recursos.astro", void 0);
//#endregion
//#region src/layouts/Tema.astro
createAstro("https://astro.build");
var $$Tema = createComponent(($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$Tema;
	const { title, subject, relevance, quickSummary, resources, questions, active, breadcrumb, slug } = Astro.props;
	return renderTemplate`${renderComponent($$result, "Base", $$Base, {
		"title": title,
		"active": active,
		"description": relevance
	}, { "default": ($$result) => renderTemplate`${maybeRenderHead($$result)}<nav class="font-mono text-xs text-ink-soft mb-4 flex flex-wrap gap-x-1 gap-y-1">${breadcrumb.map((b, i) => renderTemplate`${renderComponent($$result, "Fragment", Fragment$1, {}, { "default": ($$result) => renderTemplate`${i > 0 && renderTemplate`<span aria-hidden="true">/</span>`}${b.href ? renderTemplate`<a${addAttribute(b.href, "href")} class="hover:text-ink underline underline-offset-2">${b.label}</a>` : renderTemplate`<span class="text-ink">${b.label}</span>`}` })}`)}</nav><p class="font-mono text-xs uppercase tracking-widest mb-2"${addAttribute(`color: var(--color-${active})`, "style")}>${subject}</p><h1 class="font-display text-3xl md:text-4xl font-bold text-ink mb-6 leading-tight">${title}</h1>${quickSummary && renderTemplate`<section class="mb-6 rounded-lg p-4"${addAttribute(`background-color: var(--color-${active}-soft);`, "style")}><p class="font-mono text-[11px] uppercase tracking-wide mb-1.5"${addAttribute(`color: var(--color-${active})`, "style")}>⚡ Resumo Rápido</p><p class="font-body text-sm text-ink leading-relaxed">${quickSummary}</p></section>`}<section class="mb-10 border-l-4 pl-5"${addAttribute(`border-color: var(--color-${active})`, "style")}><p class="font-mono text-[11px] uppercase tracking-wide text-ink-soft mb-2">Visão Geral e Relevância</p><p class="font-body text-ink leading-relaxed">${relevance}</p></section><article class="prose prose-tema max-w-none">${renderSlot($$result, $$slots["default"])}</article>${renderComponent($$result, "Recursos", $$Recursos, {
		"resources": resources,
		"accent": active
	})}<div class="flex items-center gap-2 mt-10 mb-1 not-prose">${renderComponent($$result, "HelpTip", $$HelpTip, { "title": "Como funciona o Teste de Fogo" }, { "default": ($$result) => renderTemplate`Cada questão tem seu próprio botão de corrigir. Responda e corrija uma de cada vez — errou? A explicação aparece na hora, embaixo da própria questão.` })}</div>${renderComponent($$result, "Quiz", Quiz, {
		"questions": questions,
		"accent": active,
		"client:visible": true,
		"client:component-hydration": "visible",
		"client:component-path": "C:/Users/Islan/OneDrive/Desktop/PROJETOS PESSOAIS/caderno do aluno/src/components/Quiz.jsx",
		"client:component-export": "default"
	})}<div class="flex items-center gap-2 mt-10 mb-1 not-prose">${renderComponent($$result, "HelpTip", $$HelpTip, { "title": "Como funcionam os comentários" }, { "default": ($$result) => renderTemplate`Qualquer pessoa pode ler os comentários. Pra escrever, crie uma conta com e-mail e um nome de usuário (único, sem repetir). Você pode apagar o que você mesmo escreveu; os ADMs podem apagar qualquer comentário pra manter o espaço saudável.` })}</div>${renderComponent($$result, "Comentarios", Comentarios, {
		"slug": slug,
		"accent": active,
		"client:idle": true,
		"client:component-hydration": "idle",
		"client:component-path": "C:/Users/Islan/OneDrive/Desktop/PROJETOS PESSOAIS/caderno do aluno/src/components/Comentarios.jsx",
		"client:component-export": "default"
	})}` })}`;
}, "C:/Users/Islan/OneDrive/Desktop/PROJETOS PESSOAIS/caderno do aluno/src/layouts/Tema.astro", void 0);
//#endregion
export { $$Tema as t };
