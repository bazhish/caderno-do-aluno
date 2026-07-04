import { I as createVNode, T as Fragment, _ as __astro_tag_component__ } from "./render_BRuglh_w.mjs";
//#region src/content/escolar/matematica/1-bimestre/semana-01-funcoes.mdx
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
			"Uma ",
			createVNode(_components.strong, { children: "função" }),
			" é uma regra que relaciona dois conjuntos de números, de forma que cada valor de entrada tenha uma, e apenas uma, saída correspondente. Pense em uma função como uma “máquina”: você coloca um número em uma ponta, a máquina aplica uma regra, e sai um único número do outro lado."
		] }),
		"\n",
		createVNode(_components.h3, {
			id: "domínio-contradomínio-e-imagem",
			children: "Domínio, contradomínio e imagem"
		}),
		"\n",
		createVNode(_components.ul, { children: [
			"\n",
			createVNode(_components.li, { children: [createVNode(_components.strong, { children: "Domínio" }), " é o conjunto de todos os valores que podem entrar na máquina (os valores de x permitidos)."] }),
			"\n",
			createVNode(_components.li, { children: [createVNode(_components.strong, { children: "Contradomínio" }), " é o conjunto onde os resultados podem, em tese, aparecer."] }),
			"\n",
			createVNode(_components.li, { children: [createVNode(_components.strong, { children: "Imagem" }), " é o conjunto dos resultados que realmente saem da máquina para os valores de x que você usou."] }),
			"\n"
		] }),
		"\n",
		createVNode(_components.h3, {
			id: "notação-de-função",
			children: "Notação de função"
		}),
		"\n",
		createVNode(_components.p, { children: [createVNode(_components.strong, { children: "Fórmula:" }), " f(x) = 2x + 3"] }),
		"\n",
		createVNode(_components.ul, { children: [
			"\n",
			createVNode(_components.li, { children: [createVNode(_components.strong, { children: "f" }), " é o nome da função (poderia ser qualquer letra, “f” é só a convenção mais usada)."] }),
			"\n",
			createVNode(_components.li, { children: [createVNode(_components.strong, { children: "x" }), " é a variável de entrada (o valor que você escolhe)."] }),
			"\n",
			createVNode(_components.li, { children: [createVNode(_components.strong, { children: "f(x)" }), " lê-se “f de x” e representa o resultado da função para aquele valor de x — não é “f vezes x”."] }),
			"\n",
			createVNode(_components.li, { children: [createVNode(_components.strong, { children: "2x + 3" }), " é a regra da função: multiplique a entrada por 2 e some 3."] }),
			"\n"
		] }),
		"\n",
		createVNode(_components.p, { children: "Para calcular f(4), por exemplo, basta substituir x por 4 na regra: f(4) = 2 × 4 + 3 = 11." }),
		"\n",
		createVNode(_components.h3, {
			id: "o-teste-da-reta-vertical",
			children: "O teste da reta vertical"
		}),
		"\n",
		createVNode(_components.p, { children: [
			"Nem todo gráfico representa uma função. Para verificar, imagine retas verticais passando por cada ponto do eixo x. Se, em algum lugar, uma dessas retas verticais cruzar o gráfico em ",
			createVNode(_components.strong, { children: "mais de um ponto" }),
			", aquele valor de x tem duas saídas diferentes — o que quebra a própria definição de função."
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
					"Função é uma relação em que ",
					createVNode(_components.strong, { children: "cada entrada tem exatamente uma saída" }),
					". Se um valor de x gerar duas saídas diferentes, a relação não é uma função."
				] }),
				createVNode(_components.p, { children: [
					"O ",
					createVNode(_components.strong, { children: "domínio" }),
					" são os valores permitidos de entrada; o ",
					createVNode(_components.strong, { children: "contradomínio" }),
					" é onde os resultados poderiam aparecer; a ",
					createVNode(_components.strong, { children: "imagem" }),
					" é onde os resultados realmente aparecem para o domínio usado."
				] }),
				createVNode(_components.p, { children: [
					"A notação f(x) não significa multiplicação — ",
					createVNode(_components.strong, { children: "f(x) é o resultado da função no ponto x" }),
					". Calcular f(4) significa substituir x por 4 na regra da função."
				] }),
				createVNode(_components.p, { children: [
					"O ",
					createVNode(_components.strong, { children: "teste da reta vertical" }),
					" serve para verificar graficamente se uma curva é função: se alguma vertical cruzar o gráfico mais de uma vez, não é função."
				] })
			]
		})
	] });
}
function MDXContent(props = {}) {
	const { wrapper: MDXLayout } = props.components || {};
	return MDXLayout ? createVNode(MDXLayout, Object.assign({}, props, { children: createVNode(_createMdxContent, props) })) : _createMdxContent(props);
}
var frontmatter = {
	"title": "Introdução ao Conceito de Função",
	"subject": "Matemática",
	"order": 1,
	"relevance": "Função é a base de praticamente toda a matemática que vem depois dela — funções do 1º grau, do 2º grau, exponenciais e logarítmicas são todas casos particulares desse mesmo conceito. Entender bem essa semana evita retrabalho no resto do bimestre.\n",
	"quickSummary": "Função é uma regra que liga cada elemento de um conjunto (domínio) a exatamente um elemento de outro (contradomínio). Pense numa máquina: entra um número, sai outro — sempre o mesmo pra mesma entrada. Dominar essa ideia agora facilita todo o resto do ano.\n",
	"resources": {
		"videoAula": {
			"link": "https://exemplo.com/videoaula/conceito-de-funcao",
			"duracao": "11 min",
			"motivo": "Usa a analogia da máquina de transformar números, a mesma desta aula, com animações."
		},
		"materiaisAdicionais": {
			"exercicios": "Lista de 12 exercícios sobre domínio e imagem (exemplo.com/exercicios/funcoes)",
			"nivel": "fácil"
		}
	},
	"questions": [
		{
			"question": "Em uma função, cada elemento do domínio pode estar associado a quantos elementos do contradomínio?",
			"options": [
				"A no máximo dois elementos",
				"A exatamente um único elemento",
				"A quantos elementos forem necessários",
				"A nenhum elemento",
				"Depende do tipo de função"
			],
			"correctIndex": 1,
			"explanation": "Essa é a definição central de função: cada entrada (domínio) tem exatamente uma saída (contradomínio) associada a ela. Se um elemento do domínio tivesse duas saídas possíveis, não seria uma função.\n",
			"source": "Questão fictícia de fixação"
		},
		{
			"question": "Considere f(x) = 2x + 3. Qual é o valor de f(4)?",
			"options": [
				"7",
				"8",
				"9",
				"11",
				"14"
			],
			"correctIndex": 3,
			"explanation": "f(4) = 2 × 4 + 3 = 8 + 3 = 11.",
			"source": "Questão fictícia de fixação"
		},
		{
			"question": "Qual das opções abaixo representa o domínio de uma função?",
			"options": [
				"O conjunto de valores de saída",
				"O conjunto de valores de entrada",
				"O gráfico da função",
				"A imagem da função",
				"O eixo y do gráfico"
			],
			"correctIndex": 1,
			"explanation": "Domínio é o conjunto de todos os valores de entrada (x) que a função aceita.",
			"source": "Questão fictícia de fixação"
		},
		{
			"question": "Um gráfico representa uma função se, ao traçarmos uma linha vertical em qualquer ponto do eixo x, essa linha cruzar o gráfico:\n",
			"options": [
				"Em pelo menos dois pontos",
				"Em exatamente um ponto (ou nenhum, fora do domínio)",
				"Em infinitos pontos",
				"Sempre na origem",
				"Nunca deve cruzar o gráfico"
			],
			"correctIndex": 1,
			"explanation": "Esse é o \"teste da reta vertical\": se a vertical cruza o gráfico mais de uma vez em algum ponto, significa que aquele valor de x tem duas saídas — e isso não é uma função.\n",
			"source": "Questão fictícia de fixação"
		},
		{
			"question": "Se f(x) = x² , qual é o valor de f(-3)?",
			"options": [
				"-9",
				"-6",
				"6",
				"9",
				"3"
			],
			"correctIndex": 3,
			"explanation": "f(-3) = (-3)² = (-3) × (-3) = 9. Atenção ao sinal: número negativo ao quadrado vira positivo.",
			"source": "Questão fictícia de fixação"
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
			"slug": "domínio-contradomínio-e-imagem",
			"text": "Domínio, contradomínio e imagem"
		},
		{
			"depth": 3,
			"slug": "notação-de-função",
			"text": "Notação de função"
		},
		{
			"depth": 3,
			"slug": "o-teste-da-reta-vertical",
			"text": "O teste da reta vertical"
		},
		{
			"depth": 2,
			"slug": "tópicos-chave-para-revisão",
			"text": "Tópicos-Chave para Revisão"
		}
	];
}
var url = "src/content/escolar/matematica/1-bimestre/semana-01-funcoes.mdx";
var file = "C:/Users/Islan/OneDrive/Desktop/PROJETOS PESSOAIS/caderno do aluno/src/content/escolar/matematica/1-bimestre/semana-01-funcoes.mdx";
var Content = (props = {}) => MDXContent({
	...props,
	components: {
		Fragment,
		...props.components
	}
});
Content[Symbol.for("mdx-component")] = true;
Content[Symbol.for("astro.needsHeadRendering")] = !Boolean(frontmatter.layout);
Content.moduleId = "C:/Users/Islan/OneDrive/Desktop/PROJETOS PESSOAIS/caderno do aluno/src/content/escolar/matematica/1-bimestre/semana-01-funcoes.mdx";
__astro_tag_component__(Content, "astro:jsx");
//#endregion
export { Content, Content as default, file, frontmatter, getHeadings, url };
