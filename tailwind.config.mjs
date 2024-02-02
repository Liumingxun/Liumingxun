import { fontFamily } from 'tailwindcss/defaultTheme'
import typography from "@tailwindcss/typography";
import daisyui from 'daisyui'
import themes from 'daisyui/src/theming/themes'

/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	safelist: [
		{
			pattern: /^ds-/,
		},
	],
	theme: {
		fontFamily: {
			sans: ['Fira Sans', ...fontFamily.sans],
		},
	},
	daisyui: {
		themes: [
			{
				light: {
					...themes.acid,
					primary: '#AAD37D',
				}
			},
			'dark'
		],
		prefix: 'ds-'
	},
	plugins: [
		typography(),
		daisyui
	],
}
