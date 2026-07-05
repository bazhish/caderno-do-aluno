<div align="center">

<img src="public/icon-512.png" alt="Caderno da Turma" width="104" height="104" />

# Caderno da Turma<span>.</span>

**Feito por alunos, para alunos.**

Plataforma solidária de material de estudo — resumo, vídeo, curso e questões — organizada
por **ENEM**, **Escolar** e **Curso técnico**, com login por turma, comentários em tempo real
e banco de questões anti-cola.

[![Astro](https://img.shields.io/badge/Astro-SSR-BC52EE?logo=astro&logoColor=white)](https://astro.build)
[![React](https://img.shields.io/badge/React-islands-149ECA?logo=react&logoColor=white)](https://react.dev)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-06B6D4?logo=tailwindcss&logoColor=white)](https://tailwindcss.com)
[![Supabase](https://img.shields.io/badge/Supabase-Postgres%20·%20Auth%20·%20RLS-3FCF8E?logo=supabase&logoColor=white)](https://supabase.com)
[![Vercel](https://img.shields.io/badge/Vercel-serverless-000000?logo=vercel&logoColor=white)](https://vercel.com)
![pt-BR](https://img.shields.io/badge/idioma-pt--BR-informational)
[![License: MIT](https://img.shields.io/badge/licença-MIT-yellow.svg)](./LICENSE)

[**🌐 Ver no ar**](https://caderno-da-turma.vercel.app) · [Especificação](./PROJETO.md) · [Postar uma aula](./POSTAR_AULA.md)

</div>

---

## Sobre

O material de apoio oficial costuma ser fraco, e montar material bom (resumo + vídeo + questões)
toma um tempo que aluno de 3º ano — com estágio, trabalho e vida — não tem. A ideia do Caderno da
Turma: **poucas pessoas estruturam bem uma vez, todo mundo aproveita**, e o esforço de contribuir é
o menor possível.

O site inteiro fica **atrás de login** (não existe auto-cadastro — contas são criadas por
coordenadores/ADM). Cada turma tem seu material, mas a navegação é aberta entre salas: qualquer
aluno logado lê o conteúdo de qualquer sala; o que muda é o **padrão** de onde ele cai ao entrar.

## Funcionalidades

- 🔐 **Login por turma, sem auto-cadastro** — username vira e-mail sintético (`@caderno.local`);
  senha padrão `nome.sobrenome@ano` com **troca obrigatória no primeiro acesso**.
- 👤 **Três papéis** — aluno (lê e comenta), coordenador (posta/edita/modera **a própria sala**,
  registra alunos) e ADM (tudo). Papel só muda por função `SECURITY DEFINER` no banco.
- ✍️ **Postagem de aula pelo próprio site** — formulário completo (`/admin/aulas/nova`): teoria em
  Markdown, recursos de apoio, banco de questões e atividades. Sem mexer em GitHub.
- 💬 **Comentários em tempo real** (Supabase Realtime) com **censura automática no banco**
  (trigger + lista de termos mantida pelo ADM) e moderação humana por cima.
- 🎲 **Banco de questões anti-cola** — cada aluno recebe um sorteio próprio; refazer o quiz nunca
  repete questão já respondida.
- 🎯 **Pause e Responda** — no curso técnico, 1 questão por aula + **atividades práticas** de texto
  livre (sem correção automática).
- 🌙 **Tema claro/escuro e fonte de leitura** — aplicados antes do primeiro paint, sem flash.
- 📊 **Painel de gestão** — métricas, redefinição de senha (suporte) e gerência de aulas.
- 📓 **Visual de fichário** — folha pautada, furos perfurados em CSS puro e abas post-it por
  categoria.

## Stack

| Camada | Tecnologia |
|---|---|
| Framework | [Astro](https://astro.build) em modo **servidor (SSR)** + ilhas [React](https://react.dev) |
| Estilo | [Tailwind CSS 4](https://tailwindcss.com) |
| Banco / Auth | [Supabase](https://supabase.com) — Postgres + Auth + **RLS** + Realtime |
| Conteúdo | `.mdx` no repositório (legado) **+** tabela `lessons` no banco |
| Hospedagem | [Vercel](https://vercel.com) serverless (adapter `@astrojs/vercel`), deploy contínuo na `main` |

## Arquitetura

```
Navegador ──▶ Middleware (src/middleware.ts)
                 │  exige sessão Supabase em toda rota (401 nas /api/*),
                 │  carrega perfil em Astro.locals.user, força troca de senha
                 ▼
        Páginas Astro (SSR)  ◀── lessonsRepo.ts unifica  ┌ tabela lessons (banco)
                 │                                        └ coleções .mdx (legado)
                 ├─ ilhas React (client:idle): Quiz, Comentários
                 └─ APIs /api/* (login, aulas, usuários, salas)
                                   │
                                   ▼
                          Supabase (Postgres)
                   RLS = barreira de segurança real · Realtime · triggers
```

- **Auth no servidor:** o middleware gateia todas as rotas — não é esconde-com-JS. Login mapeia
  `username` → e-mail sintético `username@caderno.local`.
- **Conteúdo de fonte dupla:** [`lessonsRepo.ts`](src/lib/lessonsRepo.ts) junta a tabela `lessons`
  e as coleções `.mdx`; o banco vence colisões de slug. Markdown é renderizado no servidor com HTML
  cru **escapado** (guarda de XSS).
- **RLS é a segurança de verdade:** a interface nunca é a barreira; papéis e isolamento por sala são
  aplicados por políticas Postgres. A `service_role` fica **só no servidor**.

## Modelo de segurança

| Vetor | Como é tratado |
|---|---|
| Autorização | RLS por papel **e por sala** — coordenador só edita/exclui/modera conteúdo e comentários da **própria sala**; ENEM/legado é do ADM |
| Escalada de papel | Só via funções `SECURITY DEFINER` (`promote_user`, `criar_sala`) que checam o papel de quem chama |
| Injeção SQL | Consultas parametrizadas via PostgREST; sem concatenação de SQL |
| XSS | HTML cru escapado antes do `marked.parse` no corpo das aulas |
| CSRF | Guard de mesma-origem (`origemSuspeita`) em todos os POSTs de escrita |
| Censura | Trigger `BEFORE INSERT/UPDATE` no banco, com o termo **escapado** antes de virar regex |
| Segredos | `SUPABASE_SERVICE_ROLE_KEY` nunca exposta como `PUBLIC_`; usada só em rotas de servidor |

## Começando

Pré-requisitos: **Node 20+** e uma conta gratuita no Supabase.

```bash
npm install
cp .env.example .env      # preencha PUBLIC_SUPABASE_URL e PUBLIC_SUPABASE_ANON_KEY
npm run dev               # http://localhost:4321 (SSR)
```

Sem as variáveis do Supabase, o site roda em **modo demonstração** (aberto, dados no
`localStorage`) — bom pra visualizar a interface sem banco.

### Banco de dados

No **SQL Editor** do Supabase, rode os schemas **em ordem** (são idempotentes):

```
supabase/schema.sql      →  v1: perfis, comentários, RLS base
supabase/schema-v2.sql   →  v2: cursos, salas, nome real privado, banco de questões, censura
supabase/schema-v3.sql   →  v3: tempo real, trigger de censura, moderação (apagar_comentario)
supabase/schema-v4.sql   →  v4: aulas no banco, atividades, métricas, isolamento por sala
```

### Scripts

```bash
npm run dev       # servidor de desenvolvimento (SSR, usa .env)
npm run build     # build de produção para dist/ (cliente + servidor)
npm start         # roda o build (node dist/server/entry.mjs)
```

## Deploy

Está no ar na Vercel (tier gratuito): **https://caderno-da-turma.vercel.app**. Todo push na `main`
redeploya. Variáveis de ambiente no host:

| Variável | Onde | Obrigatória |
|---|---|---|
| `PUBLIC_SUPABASE_URL` | pública | ✅ |
| `PUBLIC_SUPABASE_ANON_KEY` | pública | ✅ |
| `SUPABASE_SERVICE_ROLE_KEY` | **secreta (servidor)** | opcional — habilita redefinir senha e desligar o signup público |

## Estrutura do projeto

```
src/
  middleware.ts            # portão de auth — gateia toda rota, carrega o perfil
  content.config.ts        # schema Zod das coleções .mdx (enem, escolar, ds)
  content/                 # aulas legadas em .mdx
  components/
    Quiz.jsx               # quiz interativo, corrigido questão por questão
    Comentarios.jsx        # comentários em tempo real por aula
    Recursos.astro         # bloco de recursos de apoio
    TabNav.astro           # abas Início / ENEM / Escolar / DS
  layouts/
    Base.astro             # casco HTML, fontes, tema, folha de fichário
    Tema.astro             # estrutura fixa de toda aula
  lib/
    supabaseServer.ts      # cliente Supabase (cookies), helpers de auth/CSRF
    lessonsRepo.ts         # unifica aulas do banco + .mdx
    quizBackend.js         # sorteio anti-cola do banco de questões
    commentsBackend.js     # comentários (Supabase real ou demo)
  pages/
    api/                   # login, aulas, usuários, salas
    admin/                 # painel de gestão e formulário de postagem
supabase/                  # schema.sql … schema-v4.sql (rodar em ordem)
```

## Adicionar uma aula

Duas formas:

1. **Pelo site** (recomendado para coordenadores): `/admin/aulas/nova` — formulário completo, sem
   tocar em código.
2. **Como arquivo `.mdx`** (avançado): um arquivo por aula em `src/content/`; as rotas são geradas
   a partir da pasta. Template do frontmatter e convenções em [`POSTAR_AULA.md`](./POSTAR_AULA.md);
   [`CONTEUDO_PROMPT.md`](./CONTEUDO_PROMPT.md) tem um prompt de IA pronto para converter anotações
   brutas no `.mdx` formatado.

## Roadmap

| Fase | Entrega | Status |
|---|---|---|
| 0 | Site de conteúdo `.mdx` + comentários com Supabase | ✅ |
| 1 | SSR + login obrigatório + papéis no middleware + salas/cursos + deploy | ✅ |
| 2 | Comentários em tempo real + censura no banco + banco de questões anti-cola | ✅ |
| 3 | Formulário de postagem no site + Pause e Responda + atividades práticas | ✅ |
| 4 | Configurações (tema/fonte) + painel ADM + suporte a `service_role` | ✅ |

Detalhes de produto (papéis, estrutura por semana, fases) em [`PROJETO.md`](./PROJETO.md).

## Documentação

- [`PROJETO.md`](./PROJETO.md) — especificação-mestre do produto.
- [`POSTAR_AULA.md`](./POSTAR_AULA.md) — guia de postagem de aula (site e `.mdx`).
- [`CONTEUDO_PROMPT.md`](./CONTEUDO_PROMPT.md) — prompt de IA para gerar aulas.
- [`CLAUDE.md`](./CLAUDE.md) — notas de arquitetura para contribuidores.

## Licença

[MIT](./LICENSE) — use, adapte e compartilhe. Se este projeto ajudar sua escola, avise a gente. 💛

<div align="center"><sub>Consulte sempre um professor em caso de dúvidas.</sub></div>
