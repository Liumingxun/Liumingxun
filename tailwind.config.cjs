/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	theme: {
		extend: {
			typography: {
				DEFAULT: {
					css: {
						margin: '0 auto'
					}
				}
			}
		},
	},
	plugins: [
		require('@tailwindcss/typography')
	],
}
