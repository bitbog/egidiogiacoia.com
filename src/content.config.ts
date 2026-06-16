import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const diario = defineCollection({
  loader: glob({ pattern: '**/[^_]*.{md,mdx}', base: './src/content/diario' }),
  schema: z.object({
    title: z.string(),
    pubDate: z.coerce.date(),
    description: z.string().optional(),
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
    cover: image(), // Validates that the cover path points to a valid image
    location: z.string().optional(),
    gear: z.string().optional(), // Camera gear used (e.g. "Leica M6, Portra 400")
  }),
});

export const collections = { diario, now, portfolio };
