import { defineConfig } from 'astro/config';
import svelte from '@astrojs/svelte';

export default defineConfig({
  site: 'https://oklahomaasabusiness.com',
  integrations: [svelte()],
  build: {
    // one stylesheet rather than a per-page cascade of small ones
    inlineStylesheets: 'auto',
  },
  // Deliberately NOT lightningcss. It folds animation-name, timing, fill and
  // animation-timeline into a single `animation` shorthand — and the shorthand
  // cannot carry a timeline, so the whole declaration becomes invalid and
  // browsers drop it. That silently killed the scroll-linked progress bar.
  vite: {
    build: {
      cssMinify: 'esbuild',
    },
  },
});
