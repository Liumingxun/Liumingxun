import { satteri } from '@astrojs/markdown-satteri'
import sitemap from '@astrojs/sitemap'
import vue from '@astrojs/vue'
import tailwindcss from '@tailwindcss/vite'
import expressiveCode from 'astro-expressive-code'
import { defineConfig } from 'astro/config'
import satteriCallouts from 'satteri-callouts'

// https://astro.build/config
export default defineConfig({
  markdown: {
    processor: satteri({
      hastPlugins: [satteriCallouts()],
      features: {
        directive: true,
        wikilinks: true,
      },
    }),
  },
  devToolbar: {
    enabled: false,
  },
  integrations: [
    expressiveCode({
      cascadeLayer: 'ec',
      customizeTheme(theme) {
        if (theme.name === 'catppuccin-latte')
          theme.name = 'light'
        else theme.name = 'dark'
        return theme
      },
      themes: ['catppuccin-latte', 'catppuccin-macchiato'],
    }),
    sitemap(),
    vue(),
  ],
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
