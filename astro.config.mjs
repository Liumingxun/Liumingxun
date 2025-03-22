import { resolve } from 'node:path'
import { cwd } from 'node:process'
import sitemap from '@astrojs/sitemap'
import solid from '@astrojs/solid-js'
import tailwindcss from '@tailwindcss/vite'

import { defineConfig } from 'astro/config'

// https://astro.build/config
export default defineConfig({
  markdown: {
    shikiConfig: {
      defaultColor: false,
      theme: 'catppuccin-latte',
    },
  },
  devToolbar: {
    enabled: false,
  },
  integrations: [solid(), sitemap()],
  redirects: {},
  build: {
    redirects: false,
    format: 'directory',
  },
  site: 'https://limx.fun',
  vite: {
    plugins: [
      tailwindcss(),
    ],
    resolve: {
      alias: {
        '@': resolve(cwd(), './src'),
      },
    },
  },
})
