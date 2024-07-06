import mdx from "@astrojs/mdx";
import tailwind from "@astrojs/tailwind";
import { defineConfig } from 'astro/config';
import { PORT, SITE } from './src/consts';

import svelte from "@astrojs/svelte";

// https://astro.build/config
export default defineConfig({
  site: SITE,
  integrations: [tailwind(), mdx(), svelte()],
  server: {
    port: PORT
  }
});
