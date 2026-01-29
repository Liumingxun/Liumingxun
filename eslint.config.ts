import antfu from '@antfu/eslint-config'
import { flat as mdx } from 'eslint-plugin-mdx'

export default antfu({
  formatters: true,
  astro: true,
}).append({
  ...mdx,
  rules: {
    'style/indent': 'off',
  },
})
