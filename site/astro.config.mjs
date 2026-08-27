import { defineConfig } from 'astro/config';
import svelte from '@astrojs/svelte';

export default defineConfig({
  site: 'https://oklahomaasabusiness.com',
  integrations: [svelte()],
  build: {
    // one stylesheet rather than a per-page cascade of small ones
    inlineStylesheets: 'auto',
  },
  vite: {
    build: {
      cssMinify: 'lightningcss',
    },
  },
});
