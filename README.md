# Caderno da Turma

Site estático (Astro + React + Tailwind) para compartilhar aulas em 3 categorias: **ENEM**,
**Escolar** e **DS**. Sem login, sem backend — qualquer pessoa com o link acessa em poucos cliques.

## Rodando localmente

```bash
npm install
npm run dev       # abre em http://localhost:4321
```

## Colocando no ar (grátis)

1. Suba esta pasta para um repositório no GitHub.
2. Crie uma conta em [vercel.com](https://vercel.com) ou [pages.cloudflare.com](https://pages.cloudflare.com).
3. Importe o repositório — a plataforma detecta Astro automaticamente (build: `npm run build`, output: `dist`).
4. A cada `git push`, o site atualiza sozinho no link público.

## Como adicionar uma aula nova

Cada aula é um arquivo `.mdx` dentro de `src/content/`. Não precisa mexer em nenhuma página — as
rotas são geradas automaticamente a partir da pasta.

**ENEM** (matéria → tema direto):
```
src/content/enem/<materia>/<tema>.mdx
```

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

Texto explicativo em Markdown normal. Toda fórmula deve vir desmembrada, explicando cada
variável (ex: "A = b × h — A é a área, b é a base, h é a altura").

## Tópicos-Chave para Revisão

<div className="topico">

Um parágrafo curto por ideia central, com as palavras-chave em **negrito**.

Separe cada parágrafo com uma linha em branco — cada um vira um bloco visual no site.

</div>
```

O quiz (seção "Teste de Fogo") é gerado automaticamente a partir do array `questions` do
frontmatter — não precisa escrever nada a mais no corpo do arquivo.

## Estrutura do projeto

```
src/
  content.config.ts       # schema (Zod) das 3 coleções: enem, escolar, ds
  content/                # as aulas em .mdx (dado real do site)
  components/
    Quiz.jsx               # quiz interativo com botão de restaurar
    TabNav.astro            # navegação entre as 3 categorias
  layouts/
    Base.astro               # casco HTML, fontes, navegação
    Tema.astro                # estrutura fixa de toda aula (relevância + conteúdo + quiz)
  pages/                    # rotas, geradas a partir do content/
  lib/slug.ts                # helpers para transformar caminho de arquivo em rótulo/URL
```

## Conteúdo atual

O conteúdo publicado agora é **fictício**, só para demonstrar a estrutura (1–2 aulas por
categoria). Troque pelos temas reais seguindo o formato acima.
