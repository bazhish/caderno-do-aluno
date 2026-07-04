// @ts-check
import { defineConfig } from 'astro/config';

import react from '@astrojs/react';
import tailwindcss from '@tailwindcss/vite';
import mdx from '@astrojs/mdx';
import node from '@astrojs/node';

// Modo servidor (SSR): login e permissões são checados por requisição no
// middleware. Deploy no Railway (Node standalone). https://astro.build/config
export default defineConfig({
  output: 'server',
  adapter: node({ mode: 'standalone' }),

  integrations: [react(), mdx()],

  vite: {
    plugins: [tailwindcss()]
  }
});
