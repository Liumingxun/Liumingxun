import { fontFamily } from 'tailwindcss/defaultTheme'
import typography from "@tailwindcss/typography";
import config from './tailwind.theme.config'

const { colors } = config.limeroute

/** @type {import('tailwindcss').Config} */
export default {
	darkMode: 'class',
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	safelist: ['dark'],
	theme: {
		fontFamily: {
			sans: ['Fira Sans', ...fontFamily.sans],
		},
		extend: {
			colors: { theme: { ...colors } },
			typography: (theme) => ({
				dark: {
					css: {
						color: theme("colors.gray.200"),
						blockquote: {
							color: colors.dark.primary,
							borderColor: colors.primary
						},
						'blockquote > p::before, p::after': {
							color: colors.primary,
						},
					},
				},
				DEFAULT: {
					css: {
						// maxWidth: '92ch',
						a: {
							color: colors.dark.primary,
							'&:hover': {
								color: colors.primary,
							},
						},
						blockquote: {
							color: colors.primary,
							fontSize: theme("fontSize.2xl"),
							borderColor: colors.dark.primary,
						},
						'blockquote > p::before, p::after': {
							color: colors.dark.primary,
						},
						h1: {
							color: colors.dark.secondary,
						},
						h2: {
							color: colors.dark.secondary,
						},
						h3: {
							color: colors.dark.secondary,
						},
					}
				},
			})
		},
	},
	plugins: [
		typography()
	],
}
