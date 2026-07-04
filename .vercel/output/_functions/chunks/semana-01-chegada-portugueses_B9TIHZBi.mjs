import { I as createVNode, T as Fragment, _ as __astro_tag_component__ } from "./render_BRuglh_w.mjs";
//#region src/content/escolar/historia/1-bimestre/semana-01-chegada-portugueses.mdx
function _createMdxContent(props) {
	const _components = Object.assign({
		h2: "h2",
		h3: "h3",
		p: "p",
		strong: "strong"
	}, props.components);
	return createVNode(Fragment, { children: [
		createVNode(_components.h2, {
			id: "aula-teórica-completa",
			children: "Aula Teórica Completa"
		}),
		"\n",
		createVNode(_components.p, { children: [
			"A chegada dos portugueses ao Brasil não foi um acidente isolado — ela faz parte de um movimento maior chamado ",
			createVNode(_components.strong, { children: "Grandes Navegações" }),
			", em que países europeus, principalmente Portugal e Espanha, buscavam novas rotas comerciais para o comércio de especiarias com a Ásia, além de riquezas e novos territórios."
		] }),
		"\n",
		createVNode(_components.h3, {
			id: "o-tratado-de-tordesilhas",
			children: "O Tratado de Tordesilhas"
		}),
		"\n",
		createVNode(_components.p, { children: [
			"Antes mesmo de qualquer terra na América ser oficialmente avistada por Portugal, um acordo entre Portugal e Espanha, assinado em 1494, já previa como as terras “novas” seriam divididas entre os dois reinos. Esse acordo, o ",
			createVNode(_components.strong, { children: "Tratado de Tordesilhas" }),
			", estabeleceu uma linha imaginária no mapa: tudo a leste dessa linha pertenceria a Portugal, e tudo a oeste, à Espanha. É por isso que, quando Cabral chegou em 1500, a terra já “pertencia”, por acordo prévio, a Portugal."
		] }),
		"\n",
		createVNode(_components.h3, {
			id: "a-chegada-e-o-pau-brasil",
			children: "A chegada e o pau-brasil"
		}),
		"\n",
		createVNode(_components.p, { children: [
			"Em 22 de abril de 1500, a esquadra comandada por Pedro Álvares Cabral chegou à costa da atual Bahia. Nos primeiros 30 anos após a chegada, Portugal não investiu pesadamente na colonização — o interesse inicial era mais comercial do que territorial. O produto de maior interesse nesse início foi o ",
			createVNode(_components.strong, { children: "pau-brasil" }),
			", uma árvore nativa de onde se extraía um corante vermelho valioso para tingir tecidos na Europa."
		] }),
		"\n",
		createVNode(_components.h3, {
			id: "as-capitanias-hereditárias",
			children: "As capitanias hereditárias"
		}),
		"\n",
		createVNode(_components.p, { children: [
			"Com o tempo, Portugal percebeu um problema: outras potências europeias, como a França, também tinham interesse na costa brasileira e chegavam a instalar entrepostos ilegais de comércio de pau-brasil. Para resolver isso sem gastar muito dinheiro da própria Coroa, Portugal criou, na década de 1530, o sistema de ",
			createVNode(_components.strong, { children: "capitanias hereditárias" }),
			": o território foi dividido em grandes faixas de terra, cada uma doada a um nobre português (chamado de ",
			createVNode(_components.strong, { children: "donatário" }),
			"), que tinha a obrigação de povoar, administrar e defender aquela área — mas às próprias custas."
		] }),
		"\n",
		createVNode(_components.p, { children: "A maioria das capitanias fracassou, seja por falta de recursos dos donatários, seja por ataques indígenas ou de outras nações europeias. Apenas algumas, como Pernambuco e São Vicente, prosperaram — principalmente onde o cultivo de cana-de-açúcar deu certo, abrindo caminho para o próximo ciclo econômico da colônia." }),
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
					"O ",
					createVNode(_components.strong, { children: "Tratado de Tordesilhas" }),
					" (1494) dividiu previamente as terras a serem descobertas entre Portugal e Espanha, por meio de uma linha imaginária — é por isso que o Brasil “já era português” antes mesmo de Cabral chegar oficialmente em 1500."
				] }),
				createVNode(_components.p, { children: [
					"O primeiro produto de interesse comercial foi o ",
					createVNode(_components.strong, { children: "pau-brasil" }),
					", usado como corante têxtil na Europa, e não o açúcar, que viria depois."
				] }),
				createVNode(_components.p, { children: [
					"As ",
					createVNode(_components.strong, { children: "capitanias hereditárias" }),
					", criadas na década de 1530, foram a estratégia de Portugal para ocupar e defender o território a baixo custo, dividindo a terra entre nobres (",
					createVNode(_components.strong, { children: "donatários" }),
					") responsáveis por administrá-la e defendê-la."
				] }),
				createVNode(_components.p, { children: [
					"A maioria das capitanias ",
					createVNode(_components.strong, { children: "fracassou" }),
					"; as exceções de sucesso, como Pernambuco e São Vicente, se destacaram principalmente pela produção de cana-de-açúcar, abrindo caminho para o ciclo econômico seguinte."
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
	"title": "A Chegada dos Portugueses e o Início da Colonização",
	"subject": "História",
	"order": 1,
	"relevance": "Esse é o ponto de partida de toda a História do Brasil ensinada na escola: sem entender por que os portugueses chegaram aqui e o que buscavam, fica difícil entender os ciclos econômicos (pau-brasil, cana-de-açúcar, ouro) que vêm depois.\n",
	"quickSummary": "Os portugueses chegaram em 1500 buscando rota para as Índias e acharam terra com pau-brasil. Nos primeiros 30 anos só exploraram o litoral; a colonização de verdade começa em 1530, com as capitanias hereditárias — divisão do território em faixas doadas a nobres.\n",
	"resources": {
		"videoAula": {
			"link": "https://exemplo.com/videoaula/chegada-portugueses",
			"duracao": "15 min",
			"motivo": "Conta a chegada como uma história, com mapas animados das rotas de navegação."
		},
		"conteudoComplementar": {
			"conteudo": "Ciclo do Pau-Brasil e o escambo com os indígenas",
			"comoAjuda": "É a continuação direta desta aula: o que Portugal fez com a terra nos primeiros 30 anos."
		}
	},
	"questions": [
		{
			"question": "Em que ano a esquadra de Pedro Álvares Cabral chegou ao território que hoje é o Brasil?",
			"options": [
				"1494",
				"1500",
				"1530",
				"1549",
				"1808"
			],
			"correctIndex": 1,
			"explanation": "A esquadra de Cabral chegou em 22 de abril de 1500, na região da atual Bahia.",
			"source": "Questão fictícia de fixação"
		},
		{
			"question": "O Tratado de Tordesilhas (1494), assinado antes da chegada de Cabral, tinha como objetivo principal:\n",
			"options": [
				"Proibir a escravidão indígena",
				"Dividir as terras recém-descobertas entre Portugal e Espanha",
				"Criar as capitanias hereditárias",
				"Estabelecer o comércio de especiarias com a Ásia",
				"Fundar a primeira vila portuguesa na América"
			],
			"correctIndex": 1,
			"explanation": "O Tratado de Tordesilhas dividiu as terras \"descobertas e por descobrir\" fora da Europa entre Portugal e Espanha, por meio de uma linha imaginária.\n",
			"source": "Questão fictícia de fixação"
		},
		{
			"question": "Qual foi o primeiro produto extrativista de destaque explorado pelos portugueses no Brasil?",
			"options": [
				"Ouro",
				"Açúcar",
				"Pau-brasil",
				"Café",
				"Algodão"
			],
			"correctIndex": 2,
			"explanation": "Antes do ciclo do açúcar, o pau-brasil foi o primeiro produto explorado, usado para extração de corante vermelho para tecidos na Europa.\n",
			"source": "Questão fictícia de fixação"
		},
		{
			"question": "O sistema de capitanias hereditárias, criado na década de 1530, tinha como principal objetivo:\n",
			"options": [
				"Abolir a escravidão",
				"Efetivar a ocupação e defesa do território contra outras nações europeias",
				"Criar universidades na colônia",
				"Estabelecer eleições diretas nas vilas",
				"Encerrar o comércio com a Espanha"
			],
			"correctIndex": 1,
			"explanation": "Portugal temia a invasão de franceses e outras potências europeias no litoral brasileiro, e as capitanias hereditárias foram uma forma de ocupar e defender o território a baixo custo para a Coroa.\n",
			"source": "Questão fictícia de fixação"
		},
		{
			"question": "Qual das alternativas descreve corretamente o sistema de capitanias hereditárias?",
			"options": [
				"Divisão do território em faixas de terra doadas a nobres, que deveriam administrá-las e defendê-las",
				"Eleição de governadores pelos próprios colonos",
				"Divisão de terras exclusivamente para produção de ouro",
				"Sistema aplicado apenas depois da vinda da família real, em 1808",
				"Substituição completa do trabalho escravo por trabalho assalariado"
			],
			"correctIndex": 0,
			"explanation": "As capitanias eram grandes faixas de terra doadas a nobres portugueses (donatários), que tinham a responsabilidade de povoar, administrar e defender a área em nome da Coroa.\n",
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
			"slug": "o-tratado-de-tordesilhas",
			"text": "O Tratado de Tordesilhas"
		},
		{
			"depth": 3,
			"slug": "a-chegada-e-o-pau-brasil",
			"text": "A chegada e o pau-brasil"
		},
		{
			"depth": 3,
			"slug": "as-capitanias-hereditárias",
			"text": "As capitanias hereditárias"
		},
		{
			"depth": 2,
			"slug": "tópicos-chave-para-revisão",
			"text": "Tópicos-Chave para Revisão"
		}
	];
}
var url = "src/content/escolar/historia/1-bimestre/semana-01-chegada-portugueses.mdx";
var file = "C:/Users/Islan/OneDrive/Desktop/PROJETOS PESSOAIS/caderno do aluno/src/content/escolar/historia/1-bimestre/semana-01-chegada-portugueses.mdx";
var Content = (props = {}) => MDXContent({
	...props,
	components: {
		Fragment,
		...props.components
	}
});
Content[Symbol.for("mdx-component")] = true;
Content[Symbol.for("astro.needsHeadRendering")] = !Boolean(frontmatter.layout);
Content.moduleId = "C:/Users/Islan/OneDrive/Desktop/PROJETOS PESSOAIS/caderno do aluno/src/content/escolar/historia/1-bimestre/semana-01-chegada-portugueses.mdx";
__astro_tag_component__(Content, "astro:jsx");
//#endregion
export { Content, Content as default, file, frontmatter, getHeadings, url };
