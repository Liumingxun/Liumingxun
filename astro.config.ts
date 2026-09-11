import { satteri } from '@astrojs/markdown-satteri'
import sitemap from '@astrojs/sitemap'
import vue from '@astrojs/vue'
import tailwindcss from '@tailwindcss/vite'
import { defineConfig } from 'astro/config'

// https://astro.build/config
export default defineConfig({
  markdown: {
    processor: satteri({
      features: {
        directive: true,
        wikilinks: true,
      },
    }),
    shikiConfig: {
      defaultColor: 'light-dark()',
      themes: {
        light: 'catppuccin-latte',
        dark: 'catppuccin-macchiato',
      },
    },
  },
  devToolbar: {
    enabled: false,
  },
  integrations: [sitemap(), vue()],
  redirects: {},
  build: {
    redirects: false,
    format: 'directory',
  },
  site: 'https://limx.fun',
  vite: {
    resolve: {
      tsconfigPaths: true,
    },
    plugins: [tailwindcss()],
  },
})
