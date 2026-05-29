import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// Tailwind v4 runs through PostCSS (postcss.config.mjs) rather than the
// @tailwindcss/vite plugin, which doesn't yet support Astro 6's rolldown-vite.
// https://astro.build/config
export default defineConfig({
  site: 'https://creatorgig.in',
  output: 'static',
  integrations: [sitemap()],
});
