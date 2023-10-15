import { resolve } from 'node:path'
import vue from '@vitejs/plugin-vue'
import { defineConfig } from 'vite'
import autoprefixer from 'autoprefixer'

function _resolve(dir: string) {
  return resolve(__dirname, dir)
}

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      '@': _resolve('src'),
    },
  },
  build: {
    target: 'modules',
    // 打包文件目录
    outDir: 'lib',
    // 压缩
    minify: false,
    // css分离
    // cssCodeSplit: true,
    // emptyOutDir: true,
  },
  css: {
    postcss: {
      plugins: [autoprefixer],
    },
  },
  plugins: [
    vue(),
  ],

})
