import { I as createVNode, T as Fragment, _ as __astro_tag_component__ } from "./render_BRuglh_w.mjs";
//#region src/content/enem/matematica/geometria-plana.mdx
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
			"Antes de qualquer fórmula, é preciso separar dois conceitos que o ENEM adora confundir: ",
			createVNode(_components.strong, { children: "perímetro" }),
			" é o contorno de uma figura — se você andasse pela borda dela, perímetro é a distância total que você andaria. ",
			createVNode(_components.strong, { children: "Área" }),
			" é o espaço que a figura ocupa por dentro — quanto de piso, tinta ou grama seria necessário para cobri-la. Perímetro se mede em metros (m); área se mede em metros quadrados (m²)."
		] }),
		"\n",
		createVNode(_components.h3, {
			id: "retângulo-e-quadrado",
			children: "Retângulo e quadrado"
		}),
		"\n",
		createVNode(_components.p, { children: "Um retângulo tem dois pares de lados iguais: largura e comprimento." }),
		"\n",
		createVNode(_components.p, { children: [createVNode(_components.strong, { children: "Perímetro do retângulo:" }), " P = 2 × (a + b)"] }),
		"\n",
		createVNode(_components.ul, { children: [
			"\n",
			createVNode(_components.li, { children: [createVNode(_components.strong, { children: "P" }), " é o perímetro (o resultado, em metros)."] }),
			"\n",
			createVNode(_components.li, { children: [createVNode(_components.strong, { children: "a" }), " é um dos lados do retângulo (por exemplo, a largura), em metros."] }),
			"\n",
			createVNode(_components.li, { children: [createVNode(_components.strong, { children: "b" }), " é o outro lado do retângulo (o comprimento), em metros."] }),
			"\n",
			createVNode(_components.li, { children: "O “2 ×” existe porque cada lado se repete duas vezes no contorno (dois lados “a” e dois lados “b”)." }),
			"\n"
		] }),
		"\n",
		createVNode(_components.p, { children: [createVNode(_components.strong, { children: "Área do retângulo:" }), " A = a × b"] }),
		"\n",
		createVNode(_components.ul, { children: [
			"\n",
			createVNode(_components.li, { children: [createVNode(_components.strong, { children: "A" }), " é a área (o resultado, em m²)."] }),
			"\n",
			createVNode(_components.li, { children: [
				createVNode(_components.strong, { children: "a" }),
				" e ",
				createVNode(_components.strong, { children: "b" }),
				" são os dois lados do retângulo, em metros."
			] }),
			"\n"
		] }),
		"\n",
		createVNode(_components.p, { children: "O quadrado é só um caso especial de retângulo onde a = b, então a área vira A = a² (lado vezes lado) e o perímetro vira P = 4a." }),
		"\n",
		createVNode(_components.h3, {
			id: "triângulo",
			children: "Triângulo"
		}),
		"\n",
		createVNode(_components.p, { children: [createVNode(_components.strong, { children: "Área do triângulo:" }), " A = (b × h) ÷ 2"] }),
		"\n",
		createVNode(_components.ul, { children: [
			"\n",
			createVNode(_components.li, { children: [createVNode(_components.strong, { children: "A" }), " é a área, em m²."] }),
			"\n",
			createVNode(_components.li, { children: [createVNode(_components.strong, { children: "b" }), " é a base do triângulo, em metros — qualquer lado que você escolher como referência."] }),
			"\n",
			createVNode(_components.li, { children: [createVNode(_components.strong, { children: "h" }), " é a altura, em metros — a distância medida em linha reta e perpendicular (formando um ângulo de 90°) entre a base escolhida e o vértice oposto a ela."] }),
			"\n",
			createVNode(_components.li, { children: "A divisão por 2 existe porque todo triângulo é, na prática, “metade” de um retângulo que o envolve perfeitamente." }),
			"\n"
		] }),
		"\n",
		createVNode(_components.h3, {
			id: "círculo",
			children: "Círculo"
		}),
		"\n",
		createVNode(_components.p, { children: [createVNode(_components.strong, { children: "Perímetro do círculo (circunferência):" }), " P = 2 × π × r"] }),
		"\n",
		createVNode(_components.ul, { children: [
			"\n",
			createVNode(_components.li, { children: [createVNode(_components.strong, { children: "P" }), " é o perímetro, em metros."] }),
			"\n",
			createVNode(_components.li, { children: [createVNode(_components.strong, { children: "π" }), " (lê-se “pi”) é uma constante que vale aproximadamente 3,14 (ou a fração 22/7 quando a questão pedir esse valor)."] }),
			"\n",
			createVNode(_components.li, { children: [createVNode(_components.strong, { children: "r" }), " é o raio, em metros — a distância do centro do círculo até a borda."] }),
			"\n"
		] }),
		"\n",
		createVNode(_components.p, { children: [createVNode(_components.strong, { children: "Área do círculo:" }), " A = π × r²"] }),
		"\n",
		createVNode(_components.ul, { children: [
			"\n",
			createVNode(_components.li, { children: [createVNode(_components.strong, { children: "A" }), " é a área, em m²."] }),
			"\n",
			createVNode(_components.li, { children: [createVNode(_components.strong, { children: "π" }), " é a mesma constante de antes."] }),
			"\n",
			createVNode(_components.li, { children: [createVNode(_components.strong, { children: "r²" }), " é o raio multiplicado por ele mesmo (raio ao quadrado)."] }),
			"\n"
		] }),
		"\n",
		createVNode(_components.p, { children: "A pegadinha clássica do INEP é trocar as duas fórmulas: pedir o perímetro e o aluno calcular a área, ou vice-versa, porque ambas usam π e r." }),
		"\n",
		createVNode(_components.h3, {
			id: "trapézio",
			children: "Trapézio"
		}),
		"\n",
		createVNode(_components.p, { children: [createVNode(_components.strong, { children: "Área do trapézio:" }), " A = [(B + b) × h] ÷ 2"] }),
		"\n",
		createVNode(_components.ul, { children: [
			"\n",
			createVNode(_components.li, { children: [createVNode(_components.strong, { children: "A" }), " é a área, em m²."] }),
			"\n",
			createVNode(_components.li, { children: [createVNode(_components.strong, { children: "B" }), " é a base maior, em metros."] }),
			"\n",
			createVNode(_components.li, { children: [createVNode(_components.strong, { children: "b" }), " é a base menor, em metros."] }),
			"\n",
			createVNode(_components.li, { children: [createVNode(_components.strong, { children: "h" }), " é a altura, em metros — a distância perpendicular entre as duas bases."] }),
			"\n",
			createVNode(_components.li, { children: "Repare que essa fórmula é parecida com a do triângulo: você soma as duas bases, multiplica pela altura e divide por 2." }),
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
					"Perímetro ",
					createVNode(_components.strong, { children: "é contorno" }),
					", medido em metros; área ",
					createVNode(_components.strong, { children: "é superfície interna" }),
					", medida em metros quadrados. Toda questão que menciona “cercar”, “murar” ou “passar fita ao redor” está pedindo perímetro. Toda questão que menciona “pavimentar”, “pintar” ou “plantar” está pedindo área."
				] }),
				createVNode(_components.p, { children: "No retângulo, o perímetro soma os quatro lados (P = 2a + 2b) e a área multiplica base por altura (A = a × b). No quadrado, os dois lados são iguais, então a área vira lado ao quadrado." }),
				createVNode(_components.p, { children: "No triângulo, a área é sempre base vezes altura dividido por dois. A altura precisa ser perpendicular à base escolhida — se o desenho mostrar uma altura “inclinada”, geralmente é pegadinha visual." }),
				createVNode(_components.p, { children: "No círculo, memorize que perímetro usa π × r (uma dimensão) e área usa π × r² (duas dimensões, porque área sempre trabalha com algo “ao quadrado”). Confundir essas duas fórmulas é o erro mais comum do ENEM nesse tópico." }),
				createVNode(_components.p, { children: "No trapézio, a área soma as duas bases paralelas, multiplica pela altura e divide por dois — é basicamente a mesma lógica do triângulo, só que com duas bases em vez de uma." })
			]
		})
	] });
}
function MDXContent(props = {}) {
	const { wrapper: MDXLayout } = props.components || {};
	return MDXLayout ? createVNode(MDXLayout, Object.assign({}, props, { children: createVNode(_createMdxContent, props) })) : _createMdxContent(props);
}
var frontmatter = {
	"title": "Geometria Plana: Área e Perímetro",
	"subject": "Matemática",
	"order": 1,
	"relevance": "Geometria plana aparece praticamente todo ano no ENEM, quase sempre disfarçada de problema do dia a dia: reforma de uma casa, compra de piso, terreno para plantação. O examinador raramente pede \"calcule a área do triângulo\" — ele te dá uma planta baixa ou uma situação e espera que você reconheça qual figura está escondida ali dentro.\n",
	"quickSummary": "Área mede a superfície de dentro da figura; perímetro mede o contorno. O segredo no ENEM é reconhecer qual figura está escondida no problema (terreno, piso, parede) e aplicar a fórmula certa — quase sempre retângulo, triângulo ou círculo.\n",
	"resources": {
		"videoAula": {
			"link": "https://exemplo.com/videoaula/geometria-plana-enem",
			"duracao": "18 min",
			"motivo": "Mostra como identificar a figura escondida em 4 problemas reais de prova."
		},
		"cursoGratuito": {
			"link": "https://exemplo.com/curso/geometria-basica",
			"cargaHoraria": "6h",
			"indicadoPara": "revisão"
		},
		"materiaisAdicionais": {
			"exercicios": "Lista com 15 problemas de área e perímetro (exemplo.com/exercicios/geometria)",
			"provaAntiga": "ENEM 2022 — caderno azul, questões 140-145",
			"nivel": "médio"
		}
	},
	"questions": [
		{
			"question": "Uma família quer trocar o piso de uma sala retangular que mede 4 metros de largura por 5 metros de comprimento. Cada caixa de piso cobre 2 m² e não pode ser fracionada. Quantas caixas, no mínimo, devem ser compradas?\n",
			"options": [
				"8 caixas",
				"9 caixas",
				"10 caixas",
				"11 caixas",
				"12 caixas"
			],
			"correctIndex": 2,
			"explanation": "Área da sala = 4 × 5 = 20 m². Número de caixas = 20 ÷ 2 = 10 caixas exatas. Como a divisão é exata, não é preciso arredondar para cima — a pegadinha aqui é o aluno arredondar sem necessidade.\n",
			"source": "Questão fictícia, estilo ENEM"
		},
		{
			"question": "Um terreno triangular tem base de 12 metros e altura de 8 metros em relação a essa base. Qual é a área desse terreno?\n",
			"options": [
				"20 m²",
				"48 m²",
				"96 m²",
				"40 m²",
				"60 m²"
			],
			"correctIndex": 1,
			"explanation": "Área do triângulo = (base × altura) ÷ 2 = (12 × 8) ÷ 2 = 96 ÷ 2 = 48 m². O erro mais comum é esquecer de dividir por 2 e marcar 96 m².\n",
			"source": "Questão fictícia, estilo ENEM"
		},
		{
			"question": "Uma praça circular tem raio de 7 metros. Usando π ≈ 22/7, qual é o perímetro (comprimento da circunferência) dessa praça?\n",
			"options": [
				"22 m",
				"44 m",
				"88 m",
				"154 m",
				"14 m"
			],
			"correctIndex": 1,
			"explanation": "Perímetro da circunferência = 2 × π × r = 2 × (22/7) × 7 = 44 m. O valor 154 m² é a área (π × r²), não o perímetro — confundir as duas fórmulas é o erro mais comum da questão.\n",
			"source": "Questão fictícia, estilo ENEM"
		},
		{
			"question": "Um pátio retangular tem 60 m² de área. Se a largura desse pátio é 6 metros, qual é o perímetro do pátio?\n",
			"options": [
				"16 m",
				"20 m",
				"26 m",
				"32 m",
				"36 m"
			],
			"correctIndex": 3,
			"explanation": "Como área = largura × comprimento, o comprimento é 60 ÷ 6 = 10 m. Perímetro = 2 × (largura + comprimento) = 2 × (6 + 10) = 2 × 16 = 32 m. Quem esquece de multiplicar por 2 no final marca 16 m.\n",
			"source": "Questão fictícia, estilo ENEM"
		},
		{
			"question": "Uma vidraçaria vai cobrir uma janela trapezoidal cujas bases medem 3 m e 5 m, com altura de 2 m entre elas. Qual é a área de vidro necessária?\n",
			"options": [
				"8 m²",
				"10 m²",
				"16 m²",
				"4 m²",
				"13 m²"
			],
			"correctIndex": 1,
			"explanation": "Área do trapézio = [(base maior + base menor) × altura] ÷ 2 = [(5 + 3) × 2] ÷ 2 = 16 ÷ 2 = 10 m². O erro clássico é esquecer a divisão final por 2.\n",
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
			"slug": "retângulo-e-quadrado",
			"text": "Retângulo e quadrado"
		},
		{
			"depth": 3,
			"slug": "triângulo",
			"text": "Triângulo"
		},
		{
			"depth": 3,
			"slug": "círculo",
			"text": "Círculo"
		},
		{
			"depth": 3,
			"slug": "trapézio",
			"text": "Trapézio"
		},
		{
			"depth": 2,
			"slug": "tópicos-chave-para-revisão",
			"text": "Tópicos-Chave para Revisão"
		}
	];
}
var url = "src/content/enem/matematica/geometria-plana.mdx";
var file = "C:/Users/Islan/OneDrive/Desktop/PROJETOS PESSOAIS/caderno do aluno/src/content/enem/matematica/geometria-plana.mdx";
var Content = (props = {}) => MDXContent({
	...props,
	components: {
		Fragment,
		...props.components
	}
});
Content[Symbol.for("mdx-component")] = true;
Content[Symbol.for("astro.needsHeadRendering")] = !Boolean(frontmatter.layout);
Content.moduleId = "C:/Users/Islan/OneDrive/Desktop/PROJETOS PESSOAIS/caderno do aluno/src/content/enem/matematica/geometria-plana.mdx";
__astro_tag_component__(Content, "astro:jsx");
//#endregion
export { Content, Content as default, file, frontmatter, getHeadings, url };
