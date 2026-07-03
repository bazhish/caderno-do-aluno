import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const questionSchema = z.object({
  question: z.string(),
  options: z.array(z.string()).length(5),
  correctIndex: z.number().min(0).max(4),
  explanation: z.string(),
  source: z.string().optional(), // ex: "ENEM 2022 - Questão 136 (fictícia)"
});

// ENEM: matéria -> tema (sem bimestre/semana)
const enem = defineCollection({
  loader: glob({ pattern: '**/*.mdx', base: './src/content/enem' }),
  schema: z.object({
    title: z.string(),
    subject: z.string(),
    relevance: z.string(),
    order: z.number().default(1),
    questions: z.array(questionSchema).length(5),
  }),
});

// Escolar: matéria -> bimestre -> semana -> tema
const escolar = defineCollection({
  loader: glob({ pattern: '**/*.mdx', base: './src/content/escolar' }),
  schema: z.object({
    title: z.string(),
    subject: z.string(),
    relevance: z.string(),
    order: z.number().default(1),
    questions: z.array(questionSchema).length(5),
  }),
});

// DS: matéria -> bimestre -> semana -> tema
const ds = defineCollection({
  loader: glob({ pattern: '**/*.mdx', base: './src/content/ds' }),
  schema: z.object({
    title: z.string(),
    subject: z.string(),
    relevance: z.string(),
    order: z.number().default(1),
    questions: z.array(questionSchema).length(5),
  }),
});

export const collections = { enem, escolar, ds };
