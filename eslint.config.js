import antfu from '@antfu/eslint-config'

export default antfu({
  vue: true,
  typescript: true,
  ignores: ['**/package.json', '**/tsconfig.json', '**/tsconfig.*.json', '**/*.d.ts'],
})
