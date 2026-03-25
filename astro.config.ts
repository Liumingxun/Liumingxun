import sitemap from '@astrojs/sitemap'
import vue from '@astrojs/vue'
import tailwindcss from '@tailwindcss/vite'
import { defineConfig } from 'astro/config'
import remarkGithubAlerts from 'remark-github-alerts'
import tsconfigpaths from 'vite-tsconfig-paths'
import remarkAppendDate from './src/utils/append-date'

// https://astro.build/config
export default defineConfig({
  markdown: {
    shikiConfig: {
      defaultColor: 'light-dark()',
      themes: {
        light: 'catppuccin-latte',
        dark: 'catppuccin-macchiato',
      },
    },
    remarkPlugins: [
      remarkAppendDate,
      remarkGithubAlerts,
    ],
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
    plugins: [tsconfigpaths(), tailwindcss()],
  },
})
