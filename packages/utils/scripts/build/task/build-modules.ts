import { resolve } from 'node:path'
import { rollup } from 'rollup'
import { nodeResolve } from '@rollup/plugin-node-resolve'
import esbuild from 'rollup-plugin-esbuild'
import { compRoot, outputCjs, outputEsm } from '../../utils/paths'

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
      nodeResolve(),
      // vue3.3有bug，打包不起来
      esbuild({
        target: 'esnext',
        sourceMap: true,
      }),
    ],
    treeshake: false,
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
      dir: outputCjs,
      exports: 'named',
      preserveModules: true,
      preserveModulesRoot: 'src',
      sourcemap: true,
      entryFileNames: `[name].js`,
    }),
  ])
}
