import { resolve } from 'node:path'
import vue from '@vitejs/plugin-vue'
import { defineConfig } from 'vite'
import dts from 'vite-plugin-dts'
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
    rollupOptions: {
      // 忽略打包vue文件
      external: ['vue'],
      input: ['src/index.ts'],
      output: [
        {
          format: 'es',
          // 不用打包成.es.js,这里我们想把它打包成.js
          entryFileNames: '[name].mjs',
          // 让打包目录和我们目录对应
          preserveModules: true,
          // 配置打包根目录
          dir: 'lib/esm',
          preserveModulesRoot: 'src',
        },
        {
          format: 'cjs',
          entryFileNames: '[name].js',
          // 让打包目录和我们目录对应
          preserveModules: true,
          // 配置打包根目录
          dir: 'lib/cjs',
          preserveModulesRoot: 'src',
        },
      ],
    },
    lib: {
      entry: './index.ts',
    },
  },
  css: {
    postcss: {
      plugins: [autoprefixer],
    },
  },
  plugins: [
    vue(),
    dts({
      entryRoot: './src',
      outDir: 'lib/cjs',
      tsconfigPath: './tsconfig.json',
    }),
    dts({
      entryRoot: './src',
      outDir: 'lib/esm',
      tsconfigPath: './tsconfig.json',
    }),
  ],

})
