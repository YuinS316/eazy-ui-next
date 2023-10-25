import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDefineOptions from 'unplugin-vue-define-options/rollup'
import Components from 'unplugin-vue-components/vite'
import { EazyResolver } from '@eazy-ui-next/components/es/resolver'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), vueDefineOptions(), Components({
    resolvers: [
      EazyResolver(),
    ],
  })],
})
