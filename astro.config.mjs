// @ts-check
import { defineConfig } from 'astro/config';
import sitemap, { ChangeFreqEnum } from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://egidiogiacoia.com',
  integrations: [
    sitemap({
      filter: (page) => {
        const pathname = new URL(page).pathname;
        const normalized = pathname.endsWith('/') ? pathname : `${pathname}/`;
        return (
          normalized !== '/diario/' &&
          !normalized.startsWith('/diario/') &&
          normalized !== '/portfolio/chi-sono/' &&
          normalized !== '/portfolio/contatti/'
        );
      },
      serialize(item) {
        const pathname = new URL(item.url).pathname;
        const normalized = pathname.endsWith('/') ? pathname : `${pathname}/`;

        if (
          normalized === '/' ||
          normalized === '/portfolio/' ||
          normalized === '/portfolio/brand-turismo/' ||
          normalized === '/portfolio/stampa-3d/'
        ) {
          return { ...item, priority: 1.0, changefreq: ChangeFreqEnum.WEEKLY };
        }
        if (normalized.startsWith('/portfolio/')) {
          return { ...item, priority: 0.9, changefreq: ChangeFreqEnum.WEEKLY };
        }
        if (normalized === '/blog/' || normalized.startsWith('/blog/')) {
          return { ...item, priority: 0.8, changefreq: ChangeFreqEnum.WEEKLY };
        }
        if (normalized === '/chi-sono/' || normalized === '/contatti/') {
          return { ...item, priority: 0.7, changefreq: ChangeFreqEnum.MONTHLY };
        }
        if (normalized === '/now/') {
          return { ...item, priority: 0.5, changefreq: ChangeFreqEnum.MONTHLY };
        }
        return item;
      },
    }),
  ],
  vite: {
    build: {
      chunkSizeWarningLimit: 700,
      rollupOptions: {
        output: {
          manualChunks(id) {
            if (id.includes('node_modules/three')) {
              return 'three-vendor';
            }
          },
        },
      },
    },
  },
});
