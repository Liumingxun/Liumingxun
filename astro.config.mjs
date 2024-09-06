import { defineConfig } from 'astro/config';
import { resolve } from 'node:path';
import sitemap from '@astrojs/sitemap';
import tailwindcss from "@astrojs/tailwind";

import solid from "@astrojs/solid-js";

// https://astro.build/config
export default defineConfig({
  markdown: {
    shikiConfig: {
      defaultColor: false,
      theme: 'catppuccin-latte',
    }
  },
  devToolbar: {
    enabled: false
  },
  integrations: [solid(), tailwindcss(), sitemap()],
  redirects: {},
  build: {
    redirects: false,
    format: 'file'
  },
  site: 'https://limx.fun',
  vite: {
    resolve: {
      alias: {
        '@': resolve(process.cwd(), './src')
      }
    }
  }
});