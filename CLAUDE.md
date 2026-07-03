# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

"Caderno do Aluno" — a static site (Astro + React + Tailwind) for sharing class lessons across three
categories: **ENEM**, **Escolar**, and **DS**. No login, no backend; content is authored as `.mdx` files
and routes are generated automatically from the file tree. Site copy and content are in Portuguese (pt-BR).

## Commands

```bash
npm install
npm run dev       # dev server at http://localhost:4321
npm run build     # production build to dist/
npm run preview   # preview the production build
```

There is no lint, format, or test setup in this repo (no test framework, no ESLint/Prettier config).
Type checking comes from `astro check` via the `astro/tsconfigs/strict` preset in `tsconfig.json`.

## Architecture

### Content-driven routing

Each lesson is one `.mdx` file under `src/content/`. There is no manual page authoring per lesson —
adding a lesson means adding a file in the right path, and Astro's `getStaticPaths` picks it up.

Two different folder depths exist per category:

- **ENEM** (subject → topic, no bimester/week):
  `src/content/enem/<materia>/<tema>.mdx`
- **Escolar / DS** (subject → bimester → week):
  `src/content/escolar/<materia>/<N>-bimestre/semana-<NN>-<tema>.mdx`
  `src/content/ds/<materia>/<N>-bimestre/semana-<NN>-<tema>.mdx`

The folder/file name becomes the URL slug, so names must be lowercase letters, numbers, and hyphens only
(no accents, no spaces). `src/pages/<categoria>/...` contains the matching dynamic routes
(`[materia]`, `[bimestre]`, `[semana].astro`) that call `getCollection()` + `getStaticPaths()` to
enumerate and render entries; `src/lib/slug.ts` has the helpers that turn a file-path slug into a
display label (`toLabel`, `bimestreLabel`, `semanaLabel`) and that group entries into a
subject → bimester → week tree (`buildMateriaBimestreTree`).

### Content schema

`src/content.config.ts` defines a shared `lessonSchema` (Zod) reused by all three collections
(`enem`, `escolar`, `ds`) via the `glob` loader: `title`, `subject`, `relevance`, `order`, optional
`quickSummary` (short highlighted summary), optional `resources` (nested, all-optional block for
`videoAula` / `cursoGratuito` / `materiaisAdicionais` / `conteudoComplementar` — each sub-section
only renders if present), and a `questions` array (exactly 5 entries, each with `question`, 5
`options`, `correctIndex` 0–4, `explanation`, optional `source`). This schema is the contract for
every `.mdx` frontmatter block — new fields need to be added here first or the build will fail
validation. See [CONTEUDO_PROMPT.md](./CONTEUDO_PROMPT.md) for a ready-made LLM prompt that converts
raw notes into a schema-conformant `.mdx` file.

### Rendering pipeline

`Tema.astro` (`src/layouts/Tema.astro`) is the fixed structure every lesson page renders through:
breadcrumb → subject label → title → optional quick-summary callout → relevance section → MDX body
(`<slot />`) → `Recursos.astro` (renders the optional `resources` block, section-by-section) →
`Quiz` component. It wraps `Base.astro`, which holds the HTML shell, fonts, the back/forward history
buttons, and `TabNav` (the Início/ENEM/Escolar/DS tab switcher). The quiz ("Teste de Fogo") in
`src/components/Quiz.jsx` is a client-hydrated React island (`client:visible`) driven entirely by the
`questions` array from frontmatter — no separate quiz content is authored in the MDX body. Each
question corrects independently (its own "Corrigir" button and inline explanation); there is no
single global submit gate.

### ENEM area grouping

`src/pages/enem/index.astro` hardcodes the 4 official ENEM knowledge areas and their subjects
(`ENEM_AREAS`), each subject mapped to a slug. It cross-references that list against actual
`enem` collection entries (matched by folder slug) to decide whether to render a linked card or a
disabled "Material ainda não compartilhado" placeholder — every canonical subject always renders,
regardless of whether content exists yet. Adding a new ENEM subject folder only produces a working
link if its slug matches an entry in `ENEM_AREAS`; otherwise update that list first.

### Contextual help and navigation chrome

`src/components/HelpTip.astro` renders a `?` button plus a native `<dialog>` popup (used for
short, page-specific explanations); clicks are handled by one delegated listener in `Base.astro`
(`data-help-target` / `data-help-close`) rather than per-instance scripts.

### Binder-sheet visual

The main content wrapper in `Base.astro` (`.paper-sheet`) is styled to look like a loose-leaf binder
page: a CSS-only hole-punch column (`::before` with three layered radial-gradients per hole — paper
fill, top inner shadow, bottom highlight — distributed with `background-repeat: space` so no hole is
ever clipped at the sheet edges), and a border color from the `accentByTab` map in `Base.astro`
(hub → `--color-ink`, others → their category accent; `--color-line` when `active` is null). Stacking
is deliberate: inactive tabs sit at z 1–4, the sheet at z 5 (covering their bottoms so they look
tucked behind), the active tab at z 30. Tabs in `TabNav.astro` are pastel post-its: soft category
color fill (`--tab-soft`) with the accent as text/border; inactive ones are translucent and
translated down, the active one sits flush with the sheet top.

Navigation is plain MPA (full page loads). Astro's `<ClientRouter />` was tried and removed on
purpose — the user rejected animated page transitions, and persisting the header froze `TabNav`'s
active state. Don't reintroduce it.

### Comments and auth (Supabase with local demo fallback)

`src/components/Comentarios.jsx` (React island, `client:visible`, rendered at the bottom of
`Tema.astro`) provides per-lesson comments with email/password auth. It talks to
`src/lib/commentsBackend.js`, which exposes one interface with two implementations chosen at build
time: if `PUBLIC_SUPABASE_URL` + `PUBLIC_SUPABASE_ANON_KEY` are set in `.env`, it lazy-imports
`@supabase/supabase-js` and uses the real backend; otherwise it falls back to a **demo mode** backed
by `localStorage` (visible banner in the UI; first account created in the browser gets the `adm`
role). Comments are keyed by `lesson_slug` = `<collection>/<entry.id>` (e.g.
`enem/fisica/cinematica`), passed as the `slug` prop from each lesson page through `Tema.astro`.

The real schema + RLS policies live in [supabase/schema.sql](./supabase/schema.sql) (setup
walkthrough in its header comment). Security invariants: usernames are UNIQUE at the DB level
(created via an `auth.users` trigger from signup metadata, not client inserts); deletes are soft
(`deleted_at`); RLS — not the UI — enforces who can write/delete (owner or `adm`). Anyone can read
comments without logging in.

### Category accent colors

Each category has a fixed accent color/class trio defined in `src/styles/global.css`
(`--color-enem`, `--color-escolar`, `--color-ds` and their `-soft` variants) and mirrored as literal,
non-interpolated Tailwind class names in `Quiz.jsx`'s `ACCENTS` map (e.g. `bg-enem`, `text-ds`). Classes
must stay written out in full (not built via string interpolation) so Tailwind's static scan can detect
them at build time.

## Adding a lesson

See the README for the full `.mdx` frontmatter template and content-writing conventions (formulas must
be spelled out variable-by-variable, review topics go in `<div className="topico">` blocks separated by
blank lines, etc.). The current published content is placeholder/fictional, meant to demonstrate the
structure.
