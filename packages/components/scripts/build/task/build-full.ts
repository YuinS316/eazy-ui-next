import { resolve } from 'node:path'
import { rollup } from 'rollup'
import { nodeResolve } from '@rollup/plugin-node-resolve'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import vueDefineOptions from 'unplugin-vue-define-options/rollup'
import esbuild, { minify as minifyPlugin } from 'rollup-plugin-esbuild'
import { compRoot, output } from '../../utils/paths'
import { generateExternal, target } from '../../utils/rollup'
import { PKG_CAMELCASE_NAME } from '../../constants'

/**
 * 全量打包
 *
 * @param minify 是否最小化
 */
export async function buildFullEntry(minify: boolean) {
  //  入口
  const input = [resolve(compRoot, 'index.ts')]

  //  编辑
  const bundle = await rollup({
    input,
    plugins: [
      vueDefineOptions(),
      vue(),
      vueJsx(),
      nodeResolve(),
      esbuild({
        target,
        sourceMap: minify,
        treeShaking: true,
      }),
      minify ? minifyPlugin() : null,
    ],
    treeshake: false,
    external: generateExternal({ full: false }),
  })

  // 输出文件
  await Promise.all([
    bundle.write({
      format: 'esm',
      file: resolve(output, `index${minify ? '.min' : ''}.mjs`),
      exports: undefined,
      sourcemap: minify,
    }),
    bundle.write({
      format: 'umd',
      file: resolve(output, `index${minify ? '.min' : ''}.js`),
      exports: 'named',
      sourcemap: minify,
      name: PKG_CAMELCASE_NAME,
      globals: {
        vue: 'Vue',
      },
    }),
  ])
}

export async function buildFull() {
  await Promise.all([buildFullEntry(false), buildFullEntry(true)])
}
