import antfu from '@antfu/eslint-config'
import eslintPluginAstro from 'eslint-plugin-astro'

export default antfu({
  formatters: true,
  vue: true,
  stylistic: { braceStyle: '1tbs' },
})
  .override('antfu/stylistic/rules', { ignores: ['**/*.astro'] })
  .append(eslintPluginAstro.configs.recommended)
