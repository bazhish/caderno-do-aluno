# Caderno da Turma

Site estático (Astro + React + Tailwind) para compartilhar aulas em 3 categorias: **ENEM**,
**Escolar** e **DS**. Sem login, sem backend — qualquer pessoa com o link acessa em poucos cliques.

## Rodando localmente

```bash
npm install
npm run dev       # abre em http://localhost:4321
```

## Comentários e login

Cada aula tem uma seção "Comentários da Turma" com cadastro/login (e-mail + senha + nome de
usuário único). Sem configuração, ela roda em **modo demonstração**: contas e comentários ficam
salvos só no navegador, e a primeira conta criada vira ADM — o suficiente pra visualizar tudo.

Pra ativar o modo real (banco de dados de verdade, grátis), siga o passo a passo no topo de
[`supabase/schema.sql`](./supabase/schema.sql): criar projeto no Supabase, rodar o SQL, copiar as
chaves pro `.env` (modelo em [`.env.example`](./.env.example)).

## Colocando no ar (grátis)

O deploy é automático via **GitHub Pages**: todo push na branch `main` dispara o workflow
[.github/workflows/deploy.yml](./.github/workflows/deploy.yml), que builda o site e publica em
**https://bazhish.github.io/caderno-da-turma/**. Nada precisa ser feito manualmente.

O workflow define `BASE_PATH=/caderno-da-turma` porque o GitHub Pages serve o site num
subcaminho — por isso todo link interno do código passa pelo helper `u()` de `src/lib/url.ts`.

Alternativa: importar o repositório em [vercel.com](https://vercel.com) ou
[pages.cloudflare.com](https://pages.cloudflare.com) também funciona sem configuração extra
(nesses hosts o site fica na raiz e o `BASE_PATH` simplesmente não é definido).

> **Guia rápido sem instalar nada:** [POSTAR_AULA.md](./POSTAR_AULA.md) — fluxo IA + editor web
> do GitHub, ~10 min do conteúdo bruto até a aula no ar.

## Como adicionar uma aula nova

Cada aula é um arquivo `.mdx` dentro de `src/content/`. Não precisa mexer em nenhuma página — as
rotas são geradas automaticamente a partir da pasta.

**ENEM** (matéria → tema direto):
```
src/content/enem/<materia>/<tema>.mdx
```
A aba ENEM lista as matérias agrupadas pelas 4 áreas oficiais do exame (definidas em
`src/pages/enem/index.astro`). Para a aula aparecer vinculada à matéria certa, `<materia>` precisa
bater com um dos slugs já cadastrados nessa lista (ex: `fisica`, `matematica`, `historia`). Matérias
sem conteúdo aparecem mesmo assim, com o aviso "Material ainda não compartilhado".

**Escolar / DS** (matéria → bimestre → semana):
```
src/content/escolar/<materia>/<N>-bimestre/semana-<NN>-<tema>.mdx
src/content/ds/<materia>/<N>-bimestre/semana-<NN>-<tema>.mdx
```

O nome da pasta/arquivo vira a URL, então use só letras minúsculas, números e hífen (sem acento,
sem espaço).

### Estrutura de cada arquivo `.mdx`

```mdx
---
title: "Nome da Aula"
subject: "Nome da Matéria"     # aparece como rótulo (ex: "Matemática")
order: 1                        # ordem de exibição na lista
relevance: >
  Parágrafo curto: por que esse tema importa e com que frequência cai.
quickSummary: >
  Opcional. 2-4 linhas de resumo direto, exibido em destaque no topo da aula.
resources:                      # opcional — inteiro ou por subseção
  videoAula:
    link: "https://..."
    duracao: "12 min"
    motivo: "por que vale assistir"
  cursoGratuito:
    link: "https://..."
    cargaHoraria: "4h"
    indicadoPara: "iniciante | revisão | avançado"
  materiaisAdicionais:
    ebook: "..."
    exercicios: "..."
    provaAntiga: "..."
    outro: "..."
    nivel: "fácil | médio | difícil"
  conteudoComplementar:
    conteudo: "..."
    comoAjuda: "..."
questions:                      # sempre 5, nesta ordem
  - question: "Enunciado da questão 1"
    options:
      - "Alternativa A"
      - "Alternativa B"
      - "Alternativa C"
      - "Alternativa D"
      - "Alternativa E"
    correctIndex: 2              # 0 = A, 1 = B, 2 = C, 3 = D, 4 = E
    explanation: "Por que essa é a resposta certa (e a pegadinha, se houver)."
    source: "ENEM 2022, questão 136"   # opcional
  # ... repetir até 5 questões
---

## Aula Teórica Completa

Texto explicativo rico mas direto: parágrafos curtos, um subtítulo (`###`) por sub-tópico quando o
tema tiver mais de 2-3 partes. Toda fórmula deve vir desmembrada, explicando cada variável
(ex: "A = b × h — A é a área, b é a base, h é a altura").

## Tópicos-Chave para Revisão

<div className="topico">

Um parágrafo curto por ideia central, com as palavras-chave em **negrito**.

Separe cada parágrafo com uma linha em branco — cada um vira um bloco visual no site.

</div>
```

O quiz (seção "Teste de Fogo") é gerado automaticamente a partir do array `questions` do
frontmatter — não precisa escrever nada a mais no corpo do arquivo. Cada questão tem seu próprio
botão "Corrigir", independente das outras.

> **Convertendo conteúdo bruto para esse formato:** veja [`CONTEUDO_PROMPT.md`](./CONTEUDO_PROMPT.md)
> — um prompt pronto pra colar em qualquer IA de chat junto com suas anotações e sair com o `.mdx`
> formatado, sem precisar montar o arquivo manualmente.

## Estrutura do projeto

```
src/
  content.config.ts       # schema (Zod) das 3 coleções: enem, escolar, ds
  content/                # as aulas em .mdx (dado real do site)
  components/
    Quiz.jsx               # quiz interativo, corrigido questão por questão
    Comentarios.jsx         # comentários por aula, com login (Supabase ou modo demo)
    Recursos.astro          # bloco de recursos extras (vídeo aula, curso, materiais, complementar)
    TabNav.astro            # navegação entre as 4 abas (Início, ENEM, Escolar, DS)
    HelpTip.astro            # botão "?" que abre um card de ajuda contextual (modal)
  lib/commentsBackend.js  # backend dos comentários: Supabase real ou demo (localStorage)
  layouts/
    Base.astro               # casco HTML, fontes, navegação, botões voltar/avançar, folha estilo fichário
    Tema.astro                # estrutura fixa de toda aula (relevância + conteúdo + recursos + quiz)
  pages/                    # rotas, geradas a partir do content/
  lib/slug.ts                # helpers para transformar caminho de arquivo em rótulo/URL

CONTEUDO_PROMPT.md        # prompt pronto pra converter anotações brutas em aula .mdx via IA
```

## Conteúdo atual

O conteúdo publicado agora é **fictício**, só para demonstrar a estrutura (1–2 aulas por
categoria). Troque pelos temas reais seguindo o formato acima.
