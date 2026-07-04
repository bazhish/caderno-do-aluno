// @ts-check
import { defineConfig } from 'astro/config';

import react from '@astrojs/react';
import tailwindcss from '@tailwindcss/vite';
import mdx from '@astrojs/mdx';
import vercel from '@astrojs/vercel';

// Modo servidor (SSR): login e permissões são checados por requisição no
// middleware. Deploy na Vercel (serverless). https://astro.build/config
export default defineConfig({
  output: 'server',
  adapter: vercel(),

  integrations: [react(), mdx()],

  vite: {
    plugins: [tailwindcss()]
  }
});
