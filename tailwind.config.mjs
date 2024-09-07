import typography from '@tailwindcss/typography'
import daisyui from 'daisyui'
import themes from 'daisyui/src/theming/themes'
import { fontFamily } from 'tailwindcss/defaultTheme'

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    fontFamily: {
      sans: ['"Noto Sans SC"', ...fontFamily.sans],
      serif: ['"LXGW WenKai Screen R"', ...fontFamily.serif],
      mono: ['"Fira Code"', ...fontFamily.mono],
    },
    extend: {
      keyframes: {
        floating: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-0.5rem)' },
        },
      },
      animation: {
        floating: 'floating 3.5s ease-in-out infinite',
      },
      backgroundImage: {
        'gradient-primary': `linear-gradient(to bottom, #AAD37D, #66CCFF)`,
      },
    },
  },
  daisyui: {
    themes: [
      {
        light: {
          ...themes.acid,
          '--rounded-btn': '0.5rem',
          'primary': '#AAD37D',
        },
      },
      {
        dark: {
          ...themes.dark,
          primary: '#66CCFF',
        },
      },
    ],
    prefix: 'ds-',
  },
  plugins: [
    typography({
      className: 'ds-prose',
    }),
    daisyui,
  ],
}
