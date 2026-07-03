# Prompt de conversão: conteúdo bruto → aula `.mdx`

Cole o bloco abaixo como instrução inicial em qualquer IA de chat (Claude, ChatGPT etc.), cole
depois o seu conteúdo bruto (anotações, resumo, PDF colado como texto, transcrição de aula) e peça
para gerar o arquivo. O resultado sai pronto para salvar direto em `src/content/`, sem precisar
tocar em nenhum outro arquivo do projeto.

---

## Cole isto na IA

Você vai transformar um conteúdo bruto de aula em um arquivo `.mdx` para o site "Caderno do
Aluno". Siga exatamente esta estrutura — não invente campos novos, não remova nenhum campo.

**Frontmatter (YAML entre `---`):**

```yaml
---
title: "Título curto e específico da aula"
subject: "Nome da matéria, como aparece pro aluno (ex: Física, Matemática, História)"
order: 1
relevance: >
  Um parágrafo curto explicando por que esse tema importa e com que frequência cai em prova.
quickSummary: >
  2 a 4 linhas resumindo a ideia central, em linguagem direta — o aluno lê isso antes de tudo.
resources:
  videoAula:
    link: "URL do vídeo"
    duracao: "ex: 12 min"
    motivo: "por que vale assistir esse vídeo específico"
  cursoGratuito:
    link: "URL do curso"
    cargaHoraria: "ex: 4h"
    indicadoPara: "iniciante | revisão | avançado"
  materiaisAdicionais:
    ebook: "nome/link do livro ou ebook, se houver"
    exercicios: "link de lista de exercícios, se houver"
    provaAntiga: "referência a uma prova antiga relacionada, se houver"
    outro: "qualquer outro material relevante"
    nivel: "fácil | médio | difícil"
  conteudoComplementar:
    conteudo: "nome do conteúdo relacionado ou complementar"
    comoAjuda: "como esse conteúdo complementa o tema da aula"
questions:
  - question: "Enunciado da questão 1"
    options:
      - "Alternativa A"
      - "Alternativa B"
      - "Alternativa C"
      - "Alternativa D"
      - "Alternativa E"
    correctIndex: 2
    explanation: "Explicação concisa: por que essa é a certa e onde mora a pegadinha."
    source: "ENEM 2022, questão 136 (opcional — remova a linha se não houver fonte)"
  # repetir até fechar exatamente 5 questões
---
```

Regras do frontmatter:
- `resources` inteiro é opcional — remova as subseções (`videoAula`, `cursoGratuito`, etc.) que
  você não tiver material real para preencher. Não invente links.
- `questions` tem que ter exatamente 5 itens, cada um com exatamente 5 `options` e `correctIndex`
  de 0 a 4 (0 = primeira alternativa).

**Corpo do arquivo (depois do segundo `---`):**

```mdx
## Aula Teórica Completa

Texto explicativo rico, mas sem enrolação: 4 a 8 parágrafos curtos, cada um cobrindo uma ideia só.
Use subtítulos (###) para separar sub-tópicos quando o tema tiver mais de 2-3 partes. Toda fórmula
vem desmembrada, explicando cada variável (ex: "A = b × h — A é a área, b é a base, h é a altura").
Prefira exemplos concretos e comparações do dia a dia a definições abstratas.

### Sub-tópico, se necessário

Mais parágrafos curtos. Não empilhe parede de texto — se um parágrafo passar de 4-5 linhas, quebre
em dois.

## Tópicos-Chave para Revisão

<div className="topico">

Um parágrafo curto por ideia central, com as palavras-chave em **negrito**. Cada `<p>` dentro dessa
div vira um bloco visual separado no site — não junte duas ideias num parágrafo só.

Separe cada ideia com uma linha em branco. Ideal entre 4 e 7 blocos: menos que isso fica raso demais
pra revisão, mais que isso fica cansativo de ler.

</div>
```

Não escreva nada sobre o quiz no corpo — ele é gerado automaticamente a partir do array
`questions` do frontmatter.

**Caminho do arquivo:**
- ENEM: `src/content/enem/<materia>/<tema>.mdx` — `<materia>` precisa ser um dos slugs já
  cadastrados nas 4 áreas (`biologia`, `fisica`, `quimica`, `historia`, `geografia`, `filosofia`,
  `sociologia`, `lingua-portuguesa`, `lingua-estrangeira`, `artes`, `educacao-fisica`, `tic`,
  `matematica`) — veja `src/pages/enem/index.astro` se precisar confirmar.
- Escolar/DS: `src/content/escolar/<materia>/<N>-bimestre/semana-<NN>-<tema>.mdx` (mesmo padrão
  para `src/content/ds/`).
- Nome de pasta/arquivo: só letras minúsculas, números e hífen — sem acento, sem espaço.

Me devolva o arquivo `.mdx` completo, pronto para salvar, e me diga qual deve ser o caminho exato
do arquivo.

---

## O que eu (Claude Code) faço com isso

Depois que você gerar o `.mdx` com o prompt acima, é só me mandar o conteúdo (ou colar o arquivo
já pronto) e o caminho de destino — eu salvo, rodo o build pra validar contra o schema em
`content.config.ts` e te aviso se algum campo estiver faltando ou fora do formato esperado.
