import { resolve } from 'node:path'
import { rollup } from 'rollup'
import { nodeResolve } from '@rollup/plugin-node-resolve'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import vueDefineOptions from 'unplugin-vue-define-options/rollup'
import esbuild from 'rollup-plugin-esbuild'
import { compRoot, outputCjs, outputEsm } from '../../utils/paths'
import { generateExternal, generatePaths, target } from '../../utils/rollup'

/**
 * 打包模块
 */
export async function buildModules() {
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
      // vue3.3有bug，打包不起来
      esbuild({
        target,
        sourceMap: true,
      }),
    ],
    treeshake: false,
    // 外部模块，所有依赖都设置为外部模块
    external: generateExternal({ full: true }),
  })

  // 输出文件
  await Promise.all([
    bundle.write({
      format: 'esm', // 模块格式
      dir: outputEsm, // 输出目录
      exports: undefined, // 导出模式
      preserveModules: true, // 与原始模块创建相同的文件
      preserveModulesRoot: 'src',
      sourcemap: true, // 生成 sourcemap
      entryFileNames: `[name].mjs`, // 生成文件名
    }),
    bundle.write({
      format: 'cjs',
      paths: generatePaths(),
      dir: outputCjs,
      exports: 'named',
      preserveModules: true,
      preserveModulesRoot: 'src',
      sourcemap: true,
      entryFileNames: `[name].js`,
    }),
  ])
}
