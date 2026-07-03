// @ts-check
import { defineConfig } from 'astro/config';

import react from '@astrojs/react';
import tailwindcss from '@tailwindcss/vite';
import mdx from '@astrojs/mdx';

// BASE_PATH/SITE_URL são definidos pelo workflow de deploy (GitHub Pages serve
// o site em /caderno-do-aluno). Localmente e em hosts na raiz ficam vazios.
// https://astro.build/config
export default defineConfig({
  site: process.env.SITE_URL || undefined,
  base: process.env.BASE_PATH || undefined,

  integrations: [react(), mdx()],

  vite: {
    plugins: [tailwindcss()]
  }
});
