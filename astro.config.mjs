import { defineConfig } from 'astro/config';
import { PORT, SITE } from './src/consts';
import tailwind from "@astrojs/tailwind";
import mdx from "@astrojs/mdx";

import svelte from "@astrojs/svelte";

// https://astro.build/config
export default defineConfig({
  site: SITE,
  integrations: [tailwind(), mdx(), svelte()],
  server: {
    port: PORT
  }
});