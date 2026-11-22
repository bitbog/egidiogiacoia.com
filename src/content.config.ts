import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const diario = defineCollection({
  loader: glob({ pattern: '**/[^_]*.{md,mdx}', base: './src/content/diario' }),
  schema: z.object({
    title: z.string(),
    pubDate: z.coerce.date(),
    description: z.string().optional(),
    category: z.string().optional(),
    tags: z.array(z.string()).optional(),
  }),
});

const now = defineCollection({
  loader: glob({ pattern: '**/[^_]*.{md,mdx}', base: './src/content/now' }),
  schema: z.object({
    lastUpdated: z.coerce.date(),
  }),
});

const portfolio = defineCollection({
  loader: glob({ pattern: '**/[^_]*.{md,mdx}', base: './src/content/portfolio' }),
  schema: ({ image }) => z.object({
    title: z.string(),
    pubDate: z.coerce.date(),
    cover: image(),
    location: z.string().optional(),
    gear: z.string().optional(),
  }),
});

export const collections = { diario, now, portfolio };
