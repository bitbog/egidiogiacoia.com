// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://egidiogiacoia.com',
  integrations: [sitemap()],
  vite: {
    server: {
      watch: process.env.DOCKER_POLLING === 'true'
        ? { usePolling: true, interval: 300 }
        : undefined,
    },
  },
});
