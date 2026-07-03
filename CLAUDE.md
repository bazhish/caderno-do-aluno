# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

"Caderno da Turma" — a static site (Astro + React + Tailwind) for sharing class lessons across three
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

`src/content.config.ts` defines three Zod-validated collections (`enem`, `escolar`, `ds`) using the
`glob` loader. All three share the same schema shape: `title`, `subject`, `relevance`, `order`, and a
`questions` array (exactly 5 entries, each with `question`, 5 `options`, `correctIndex` 0–4,
`explanation`, optional `source`). This schema is the contract for every `.mdx` frontmatter block —
new fields need to be added here first or the build will fail validation.

### Rendering pipeline

`Tema.astro` (`src/layouts/Tema.astro`) is the fixed structure every lesson page renders through:
breadcrumb → subject label → title → relevance section → MDX body (`<slot />`) → `Quiz` component.
It wraps `Base.astro`, which holds the HTML shell, fonts, and `TabNav` (the ENEM/Escolar/DS switcher).
The quiz ("Teste de Fogo") in `src/components/Quiz.jsx` is a client-hydrated React island
(`client:visible`) driven entirely by the `questions` array from frontmatter — no separate quiz content
is authored in the MDX body.

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
