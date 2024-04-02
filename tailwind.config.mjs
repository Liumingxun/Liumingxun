import { fontFamily } from 'tailwindcss/defaultTheme'
import typography from "@tailwindcss/typography";
import daisyui from 'daisyui'
import themes from 'daisyui/src/theming/themes'

/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	safelist: [
		// {
		// 	pattern: /^ds-/,
		// },
	],
	theme: {
		fontFamily: {
			sans: ['"Fira Sans"', ...fontFamily.sans],
			mono: ['"Fira Code Variable"', ...fontFamily.mono],
		},
		extend: {
			typography: {
				DEFAULT: {
					css: {
						maxWidth: '48rem'
					}
				}
			},
			keyframes: {
				floating: {
					'0%, 100%': { transform: 'translateY(0)' },
					'50%': { transform: 'translateY(-0.5rem)' },
				}
			},
			animation: {
				'floating': 'floating 3.5s ease-in-out infinite',
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
					primary: '#AAD37D',
				}
			},
			{
				dark: {
					...themes.dark,
					primary: '#66CCFF'
				}
			}
		],
		prefix: 'ds-'
	},
	plugins: [
		typography({
			className: 'ds-prose'
		}),
		daisyui
	],
}
