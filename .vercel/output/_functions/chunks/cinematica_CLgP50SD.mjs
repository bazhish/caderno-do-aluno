import { I as createVNode, T as Fragment, _ as __astro_tag_component__ } from "./render_BRuglh_w.mjs";
//#region src/content/enem/fisica/cinematica.mdx
function _createMdxContent(props) {
	const _components = Object.assign({
		h2: "h2",
		h3: "h3",
		li: "li",
		p: "p",
		strong: "strong",
		ul: "ul"
	}, props.components);
	return createVNode(Fragment, { children: [
		createVNode(_components.h2, {
			id: "aula-teórica-completa",
			children: "Aula Teórica Completa"
		}),
		"\n",
		createVNode(_components.p, { children: [
			"Cinemática é a parte da Física que descreve ",
			createVNode(_components.strong, { children: "como" }),
			" um corpo se move, sem se preocupar com ",
			createVNode(_components.strong, { children: "por que" }),
			" ele se move (isso é dinâmica, outro assunto). Os três ingredientes básicos são posição, tempo e velocidade."
		] }),
		"\n",
		createVNode(_components.h3, {
			id: "velocidade-média",
			children: "Velocidade média"
		}),
		"\n",
		createVNode(_components.p, { children: [createVNode(_components.strong, { children: "Fórmula:" }), " v = ΔS ÷ Δt"] }),
		"\n",
		createVNode(_components.ul, { children: [
			"\n",
			createVNode(_components.li, { children: [createVNode(_components.strong, { children: "v" }), " é a velocidade média, geralmente em km/h ou m/s."] }),
			"\n",
			createVNode(_components.li, { children: [createVNode(_components.strong, { children: "ΔS" }), " (lê-se “delta S”) é o deslocamento total, ou seja, a distância percorrida do início ao fim do trajeto."] }),
			"\n",
			createVNode(_components.li, { children: [createVNode(_components.strong, { children: "Δt" }), " (lê-se “delta t”) é o intervalo de tempo total gasto para percorrer esse deslocamento."] }),
			"\n",
			createVNode(_components.li, { children: "O símbolo Δ (delta) sempre significa “variação” — é o valor final menos o valor inicial." }),
			"\n"
		] }),
		"\n",
		createVNode(_components.p, { children: [
			"O erro mais comum do ENEM nesse tópico é o aluno calcular a velocidade média como uma ",
			createVNode(_components.strong, { children: "média aritmética simples" }),
			" das velocidades parciais (somar as velocidades e dividir por dois). Isso só funciona por acaso quando os ",
			createVNode(_components.strong, { children: "tempos" }),
			" gastos em cada trecho são iguais. Quando as ",
			createVNode(_components.strong, { children: "distâncias" }),
			" de cada trecho são iguais (e as velocidades diferentes), os tempos gastos em cada trecho são diferentes — e aí é obrigatório calcular o tempo total e a distância total separadamente, como mostra a fórmula acima."
		] }),
		"\n",
		createVNode(_components.h3, {
			id: "aceleração",
			children: "Aceleração"
		}),
		"\n",
		createVNode(_components.p, { children: [createVNode(_components.strong, { children: "Fórmula:" }), " a = Δv ÷ Δt"] }),
		"\n",
		createVNode(_components.ul, { children: [
			"\n",
			createVNode(_components.li, { children: [createVNode(_components.strong, { children: "a" }), " é a aceleração, em m/s²."] }),
			"\n",
			createVNode(_components.li, { children: [createVNode(_components.strong, { children: "Δv" }), " é a variação de velocidade: velocidade final menos velocidade inicial."] }),
			"\n",
			createVNode(_components.li, { children: [createVNode(_components.strong, { children: "Δt" }), " é o intervalo de tempo em que essa variação aconteceu."] }),
			"\n"
		] }),
		"\n",
		createVNode(_components.p, { children: "Aceleração mede o quanto a velocidade muda a cada segundo. Se um carro ganha 5 m/s de velocidade a cada segundo que passa, sua aceleração é 5 m/s²." }),
		"\n",
		createVNode(_components.h3, {
			id: "conversão-entre-kmh-e-ms",
			children: "Conversão entre km/h e m/s"
		}),
		"\n",
		createVNode(_components.p, { children: "Como 1 km = 1000 m e 1 h = 3600 s, a conversão entre as duas unidades sempre passa pelo número 3,6:" }),
		"\n",
		createVNode(_components.ul, { children: [
			"\n",
			createVNode(_components.li, { children: [
				"Para transformar km/h em m/s: ",
				createVNode(_components.strong, { children: "divide-se por 3,6" }),
				"."
			] }),
			"\n",
			createVNode(_components.li, { children: [
				"Para transformar m/s em km/h: ",
				createVNode(_components.strong, { children: "multiplica-se por 3,6" }),
				"."
			] }),
			"\n"
		] }),
		"\n",
		createVNode(_components.h2, {
			id: "tópicos-chave-para-revisão",
			children: "Tópicos-Chave para Revisão"
		}),
		"\n",
		createVNode("div", {
			className: "topico",
			children: [
				createVNode(_components.p, { children: [
					"Velocidade média é sempre ",
					createVNode(_components.strong, { children: "distância total dividida por tempo total" }),
					" (v = ΔS/Δt) — nunca a média aritmética das velocidades parciais, a não ser que os tempos de cada trecho sejam exatamente iguais."
				] }),
				createVNode(_components.p, { children: [
					"Quando o percurso é dividido em partes com a ",
					createVNode(_components.strong, { children: "mesma distância" }),
					" mas velocidades diferentes, é preciso calcular o tempo gasto em cada parte separadamente antes de somar, porque os tempos não serão iguais."
				] }),
				createVNode(_components.p, { children: "Aceleração é a variação de velocidade dividida pela variação de tempo (a = Δv/Δt) e representa o quanto a velocidade muda a cada segundo." }),
				createVNode(_components.p, { children: "O símbolo Δ (delta) sempre significa “diferença entre o valor final e o valor inicial” — aparece tanto no deslocamento (ΔS) quanto no tempo (Δt) e na velocidade (Δv)." }),
				createVNode(_components.p, { children: "Para converter km/h em m/s, divida por 3,6; para o caminho inverso, multiplique por 3,6. Esse número vem da relação entre quilômetros/metros e horas/segundos." })
			]
		})
	] });
}
function MDXContent(props = {}) {
	const { wrapper: MDXLayout } = props.components || {};
	return MDXLayout ? createVNode(MDXLayout, Object.assign({}, props, { children: createVNode(_createMdxContent, props) })) : _createMdxContent(props);
}
var frontmatter = {
	"title": "Cinemática: Velocidade Média e Movimento Uniforme",
	"subject": "Física",
	"order": 1,
	"relevance": "Cinemática costuma abrir a prova de Física do ENEM porque não exige fórmulas complexas — exige interpretação. O examinador gosta de misturar trechos de percurso com velocidades diferentes para testar se você sabe que velocidade média não é uma simples média aritmética.\n",
	"quickSummary": "Velocidade média é sempre distância total dividida por tempo total — nunca a média das velocidades parciais. Aceleração mede o quanto essa velocidade muda a cada segundo. Domine essas duas fórmulas e a conversão km/h ↔ m/s e você resolve a maioria das questões de cinemática.\n",
	"resources": {
		"videoAula": {
			"link": "https://exemplo.com/videoaula/cinematica-enem",
			"duracao": "14 min",
			"motivo": "Resolve 3 questões de ENEM ao vivo, mostrando onde a maioria erra a velocidade média."
		},
		"materiaisAdicionais": {
			"exercicios": "Lista de 10 exercícios de cinemática (exemplo.com/exercicios/cinematica)",
			"nivel": "médio"
		},
		"conteudoComplementar": {
			"conteudo": "Movimento Uniformemente Variado (MUV)",
			"comoAjuda": "Continua direto de onde a aceleração constante desta aula para, com as equações de posição e velocidade no tempo."
		}
	},
	"questions": [
		{
			"question": "Um ônibus percorre 90 km em 1,5 hora, sem paradas. Qual é a velocidade média desse ônibus nesse trecho?\n",
			"options": [
				"45 km/h",
				"60 km/h",
				"90 km/h",
				"135 km/h",
				"30 km/h"
			],
			"correctIndex": 1,
			"explanation": "Velocidade média = distância total ÷ tempo total = 90 ÷ 1,5 = 60 km/h.\n",
			"source": "Questão fictícia, estilo ENEM"
		},
		{
			"question": "Um ciclista percorre a primeira metade de um percurso de 40 km a 20 km/h e a segunda metade a 40 km/h. Qual é a velocidade média aproximada do percurso completo?\n",
			"options": [
				"30 km/h (média aritmética simples)",
				"26,7 km/h",
				"20 km/h",
				"40 km/h",
				"35 km/h"
			],
			"correctIndex": 1,
			"explanation": "Cada metade tem 20 km. Tempo na 1ª metade = 20 ÷ 20 = 1 h. Tempo na 2ª metade = 20 ÷ 40 = 0,5 h. Tempo total = 1,5 h. Velocidade média = 40 ÷ 1,5 ≈ 26,7 km/h. A opção \"30 km/h\" é a pegadinha clássica de somar as velocidades e dividir por dois — isso só vale quando os tempos são iguais, não quando as distâncias são iguais.\n",
			"source": "Questão fictícia, estilo ENEM"
		},
		{
			"question": "Um carro parte do repouso e atinge 20 m/s em 4 segundos, com aceleração constante. Qual é a aceleração desse carro?\n",
			"options": [
				"80 m/s²",
				"5 m/s²",
				"4 m/s²",
				"16 m/s²",
				"0,2 m/s²"
			],
			"correctIndex": 1,
			"explanation": "Aceleração = variação de velocidade ÷ variação de tempo = (20 − 0) ÷ 4 = 5 m/s².\n",
			"source": "Questão fictícia, estilo ENEM"
		},
		{
			"question": "Dois carros partem do mesmo ponto na mesma direção. O carro A viaja a 80 km/h constantes. O carro B parte 1 hora depois, a 100 km/h constantes. Quanto tempo depois da partida de B os dois carros estarão juntos novamente?\n",
			"options": [
				"1 hora",
				"2 horas",
				"3 horas",
				"4 horas",
				"5 horas"
			],
			"correctIndex": 3,
			"explanation": "Quando B parte, A já percorreu 80 km. A partir daí, a diferença de velocidade é 100 − 80 = 20 km/h, então B \"fecha\" a distância de 80 km em 80 ÷ 20 = 4 horas.\n",
			"source": "Questão fictícia, estilo ENEM"
		},
		{
			"question": "Um trem se desloca a 108 km/h. Convertendo para o Sistema Internacional, qual é essa velocidade em metros por segundo?\n",
			"options": [
				"10,8 m/s",
				"18 m/s",
				"30 m/s",
				"108 m/s",
				"3,6 m/s"
			],
			"correctIndex": 2,
			"explanation": "Para converter km/h em m/s, divide-se por 3,6: 108 ÷ 3,6 = 30 m/s.\n",
			"source": "Questão fictícia, estilo ENEM"
		}
	]
};
function getHeadings() {
	return [
		{
			"depth": 2,
			"slug": "aula-teórica-completa",
			"text": "Aula Teórica Completa"
		},
		{
			"depth": 3,
			"slug": "velocidade-média",
			"text": "Velocidade média"
		},
		{
			"depth": 3,
			"slug": "aceleração",
			"text": "Aceleração"
		},
		{
			"depth": 3,
			"slug": "conversão-entre-kmh-e-ms",
			"text": "Conversão entre km/h e m/s"
		},
		{
			"depth": 2,
			"slug": "tópicos-chave-para-revisão",
			"text": "Tópicos-Chave para Revisão"
		}
	];
}
var url = "src/content/enem/fisica/cinematica.mdx";
var file = "C:/Users/Islan/OneDrive/Desktop/PROJETOS PESSOAIS/caderno do aluno/src/content/enem/fisica/cinematica.mdx";
var Content = (props = {}) => MDXContent({
	...props,
	components: {
		Fragment,
		...props.components
	}
});
Content[Symbol.for("mdx-component")] = true;
Content[Symbol.for("astro.needsHeadRendering")] = !Boolean(frontmatter.layout);
Content.moduleId = "C:/Users/Islan/OneDrive/Desktop/PROJETOS PESSOAIS/caderno do aluno/src/content/enem/fisica/cinematica.mdx";
__astro_tag_component__(Content, "astro:jsx");
//#endregion
export { Content, Content as default, file, frontmatter, getHeadings, url };
