import { resolve } from 'node:path'
import { cwd } from 'node:process'
import sitemap from '@astrojs/sitemap'
import solid from '@astrojs/solid-js'
import tailwindcss from '@astrojs/tailwind'

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
  integrations: [solid(), tailwindcss(), sitemap()],
  redirects: {},
  build: {
    redirects: false,
    format: 'file',
  },
  site: 'https://limx.fun',
  vite: {
    resolve: {
      alias: {
        '@': resolve(cwd(), './src'),
      },
    },
  },
})
