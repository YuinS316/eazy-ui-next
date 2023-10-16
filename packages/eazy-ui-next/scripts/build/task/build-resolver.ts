import { resolve } from 'node:path'
import { rollup } from 'rollup'
import esbuild from 'rollup-plugin-esbuild'
import { compRoot, outputCjs, outputEsm } from '../../utils/paths'
import { generatePaths, target } from '../../utils/rollup'

export async function buildResolver() {
  const input = [resolve(compRoot, 'resolver.ts')]

  const bundle = await rollup({
    input,
    plugins: [
      esbuild({
        target,
      }),
    ],
    treeshake: false,
  })

  await Promise.all([
    bundle.write({
      format: 'esm',
      dir: outputEsm,
      exports: undefined,
      preserveModules: true,
      preserveModulesRoot: 'src',
      sourcemap: true,
      entryFileNames: `[name].mjs`,
    }),
    bundle.write({
      format: 'cjs',
      dir: outputCjs,
      exports: 'named',
      preserveModules: true,
      preserveModulesRoot: 'src',
      sourcemap: true,
      entryFileNames: `[name].js`,
      paths: generatePaths(),
    }),
  ])
}
