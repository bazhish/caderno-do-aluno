import { I as createVNode, T as Fragment, _ as __astro_tag_component__ } from "./render_BRuglh_w.mjs";
//#region src/content/ds/logica-de-programacao/1-bimestre/semana-01-introducao.mdx
function _createMdxContent(props) {
	const _components = Object.assign({
		code: "code",
		h2: "h2",
		h3: "h3",
		li: "li",
		ol: "ol",
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
			"Antes de aprender qualquer linguagem de programação (Python, JavaScript, C, etc.), é preciso entender a lógica que existe ",
			createVNode(_components.strong, { children: "por trás" }),
			" do código. Essa lógica tem dois pilares: o ",
			createVNode(_components.strong, { children: "algoritmo" }),
			" e a ",
			createVNode(_components.strong, { children: "variável" }),
			"."
		] }),
		"\n",
		createVNode(_components.h3, {
			id: "o-que-é-um-algoritmo",
			children: "O que é um algoritmo"
		}),
		"\n",
		createVNode(_components.p, { children: [
			"Um ",
			createVNode(_components.strong, { children: "algoritmo" }),
			" é uma sequência lógica, finita e ordenada de passos para resolver um problema específico. Não precisa envolver computador nenhum: uma receita de bolo é um algoritmo (passos ordenados para chegar a um bolo pronto), assim como um manual de montagem de móvel."
		] }),
		"\n",
		createVNode(_components.p, { children: "Todo algoritmo de computador segue, de forma bem geral, três grandes etapas:" }),
		"\n",
		createVNode(_components.ol, { children: [
			"\n",
			createVNode(_components.li, { children: [createVNode(_components.strong, { children: "Entrada" }), " — os dados que o programa recebe (ex: o usuário digita duas notas)."] }),
			"\n",
			createVNode(_components.li, { children: [createVNode(_components.strong, { children: "Processamento" }), " — o que o programa faz com esses dados (ex: soma as notas e divide por dois)."] }),
			"\n",
			createVNode(_components.li, { children: [createVNode(_components.strong, { children: "Saída" }), " — o resultado que o programa entrega (ex: mostra a média na tela)."] }),
			"\n"
		] }),
		"\n",
		createVNode(_components.p, { children: "Essa ordem — Entrada → Processamento → Saída — é a espinha dorsal de praticamente todo programa que existe, do mais simples ao mais complexo." }),
		"\n",
		createVNode(_components.h3, {
			id: "o-que-é-uma-variável",
			children: "O que é uma variável"
		}),
		"\n",
		createVNode(_components.p, { children: [
			"Uma ",
			createVNode(_components.strong, { children: "variável" }),
			" é um espaço nomeado guardado na memória do computador, usado para armazenar um valor que pode mudar ao longo da execução do programa. Pense nela como uma caixa com etiqueta: a etiqueta é o ",
			createVNode(_components.strong, { children: "nome" }),
			" da variável (por exemplo, ",
			createVNode(_components.code, { children: "nota1" }),
			"), e dentro da caixa fica o ",
			createVNode(_components.strong, { children: "valor" }),
			" guardado naquele momento (por exemplo, ",
			createVNode(_components.code, { children: "8.5" }),
			")."
		] }),
		"\n",
		createVNode(_components.p, { children: [createVNode(_components.strong, { children: "Exemplo de atribuição:" }), " nota1 = 8.5"] }),
		"\n",
		createVNode(_components.ul, { children: [
			"\n",
			createVNode(_components.li, { children: [createVNode(_components.strong, { children: "nota1" }), " é o nome da variável — a “etiqueta da caixa”."] }),
			"\n",
			createVNode(_components.li, { children: [createVNode(_components.strong, { children: "=" }), " é o operador de atribuição — ele não significa “igual” como na matemática, significa “guarde o valor da direita dentro da variável da esquerda”."] }),
			"\n",
			createVNode(_components.li, { children: [createVNode(_components.strong, { children: "8.5" }), " é o valor que está sendo guardado dentro da variável."] }),
			"\n"
		] }),
		"\n",
		createVNode(_components.p, { children: [
			"O valor guardado em uma variável pode ser trocado depois: se, mais adiante no programa, você escrever ",
			createVNode(_components.code, { children: "nota1 = 9.0" }),
			", o conteúdo da caixa muda de 8.5 para 9.0 — por isso o nome “variável”, ao contrário de uma ",
			createVNode(_components.strong, { children: "constante" }),
			", que guarda um valor fixo que nunca muda durante a execução."
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
				createVNode(_components.p, { children: [createVNode(_components.strong, { children: "Algoritmo" }), " é uma sequência lógica e finita de passos para resolver um problema — não depende de nenhuma linguagem de programação específica, é a ideia antes do código."] }),
				createVNode(_components.p, { children: [
					"Todo algoritmo segue, de forma geral, a estrutura ",
					createVNode(_components.strong, { children: "Entrada → Processamento → Saída" }),
					": primeiro os dados entram, depois são transformados, por último o resultado é entregue."
				] }),
				createVNode(_components.p, { children: [createVNode(_components.strong, { children: "Variável" }), " é um espaço nomeado na memória que guarda um valor que pode mudar durante a execução do programa — pense nela como uma caixa com etiqueta (o nome) e um conteúdo (o valor)."] }),
				createVNode(_components.p, { children: [
					"O operador ",
					createVNode(_components.strong, { children: "“=”" }),
					" em programação não significa igualdade matemática, significa ",
					createVNode(_components.strong, { children: "atribuição" }),
					": “guarde o valor da direita na variável da esquerda”."
				] }),
				createVNode(_components.p, { children: [createVNode(_components.strong, { children: "Constante" }), " é o oposto de variável: um valor fixo que não muda ao longo da execução do programa."] })
			]
		})
	] });
}
function MDXContent(props = {}) {
	const { wrapper: MDXLayout } = props.components || {};
	return MDXLayout ? createVNode(MDXLayout, Object.assign({}, props, { children: createVNode(_createMdxContent, props) })) : _createMdxContent(props);
}
var frontmatter = {
	"title": "Introdução à Lógica de Programação: Algoritmos e Variáveis",
	"subject": "Lógica de Programação",
	"order": 1,
	"relevance": "Todo o curso de DS é construído em cima desses dois conceitos: algoritmo e variável. Antes de escrever a primeira linha de código em qualquer linguagem, é essa lógica que precisa fazer sentido — é ela que se repete, disfarçada, em toda linguagem de programação que você vai aprender.\n",
	"quickSummary": "Algoritmo é uma sequência finita e ordenada de passos pra resolver um problema — como uma receita de bolo. Variável é uma caixinha com nome que guarda um valor que pode mudar. Esses dois conceitos aparecem em toda linguagem que você vai estudar no curso.\n",
	"resources": {
		"cursoGratuito": {
			"link": "https://exemplo.com/curso/logica-de-programacao",
			"cargaHoraria": "8h",
			"indicadoPara": "iniciante"
		},
		"materiaisAdicionais": {
			"exercicios": "10 desafios de algoritmo em português estruturado (exemplo.com/desafios/logica)",
			"outro": "Simulador de fluxograma online gratuito (exemplo.com/fluxograma)",
			"nivel": "fácil"
		}
	},
	"questions": [
		{
			"question": "O que é um algoritmo?",
			"options": [
				"Um tipo de linguagem de programação, como Python",
				"Uma sequência lógica e finita de passos para resolver um problema",
				"Um erro de programação",
				"Um tipo de variável",
				"Um programa já compilado"
			],
			"correctIndex": 1,
			"explanation": "Algoritmo é a ideia por trás do código — uma sequência de passos lógicos e finitos para resolver um problema. Uma receita de bolo, por exemplo, é um algoritmo.\n",
			"source": "Questão fictícia de fixação"
		},
		{
			"question": "Qual é a principal função de uma variável em um programa?",
			"options": [
				"Deixar o código mais bonito",
				"Armazenar e guardar um valor que pode mudar durante a execução",
				"Substituir os comentários do código",
				"Executar o programa mais rápido",
				"Corrigir erros automaticamente"
			],
			"correctIndex": 1,
			"explanation": "Variável é um espaço nomeado na memória do computador usado para guardar um valor — e esse valor pode ser alterado ao longo da execução do programa, daí o nome \"variável\".\n",
			"source": "Questão fictícia de fixação"
		},
		{
			"question": "Em um algoritmo que calcula a média de duas notas, qual seria a primeira etapa lógica?\n",
			"options": [
				"Mostrar o resultado na tela",
				"Somar as duas notas",
				"Ler (receber) as duas notas de entrada",
				"Dividir por dois",
				"Declarar que o programa terminou"
			],
			"correctIndex": 2,
			"explanation": "Todo algoritmo segue, de forma geral, a ordem: entrada de dados → processamento → saída de resultado. Antes de somar ou dividir qualquer coisa, é preciso primeiro receber os valores de entrada.\n",
			"source": "Questão fictícia de fixação"
		},
		{
			"question": "O que caracteriza um 'valor constante', em oposição a uma variável?",
			"options": [
				"Um valor que nunca é usado no programa",
				"Um valor que muda a cada execução do programa",
				"Um valor fixo que não muda durante a execução do programa",
				"Um valor que só existe em linguagens de programação antigas",
				"Um valor que é sempre um número"
			],
			"correctIndex": 2,
			"explanation": "Constante é o oposto de variável: um valor fixo, definido uma vez, que não muda ao longo da execução do programa (por exemplo, o valor de π em um cálculo).\n",
			"source": "Questão fictícia de fixação"
		},
		{
			"question": "Qual das estruturas abaixo representa a ordem lógica correta e mais básica de um algoritmo?\n",
			"options": [
				"Saída → Processamento → Entrada",
				"Processamento → Entrada → Saída",
				"Entrada → Processamento → Saída",
				"Saída → Entrada → Processamento",
				"Não existe uma ordem lógica fixa"
			],
			"correctIndex": 2,
			"explanation": "A estrutura mais básica de qualquer algoritmo é: primeiro entram os dados (Entrada), depois eles são transformados (Processamento) e, por fim, o resultado é apresentado (Saída).\n",
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
			"slug": "o-que-é-um-algoritmo",
			"text": "O que é um algoritmo"
		},
		{
			"depth": 3,
			"slug": "o-que-é-uma-variável",
			"text": "O que é uma variável"
		},
		{
			"depth": 2,
			"slug": "tópicos-chave-para-revisão",
			"text": "Tópicos-Chave para Revisão"
		}
	];
}
var url = "src/content/ds/logica-de-programacao/1-bimestre/semana-01-introducao.mdx";
var file = "C:/Users/Islan/OneDrive/Desktop/PROJETOS PESSOAIS/caderno do aluno/src/content/ds/logica-de-programacao/1-bimestre/semana-01-introducao.mdx";
var Content = (props = {}) => MDXContent({
	...props,
	components: {
		Fragment,
		...props.components
	}
});
Content[Symbol.for("mdx-component")] = true;
Content[Symbol.for("astro.needsHeadRendering")] = !Boolean(frontmatter.layout);
Content.moduleId = "C:/Users/Islan/OneDrive/Desktop/PROJETOS PESSOAIS/caderno do aluno/src/content/ds/logica-de-programacao/1-bimestre/semana-01-introducao.mdx";
__astro_tag_component__(Content, "astro:jsx");
//#endregion
export { Content, Content as default, file, frontmatter, getHeadings, url };
