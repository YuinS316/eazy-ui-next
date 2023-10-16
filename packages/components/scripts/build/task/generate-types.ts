import { execa } from 'execa'
import { dest, src } from 'gulp'
import { outputCjs, outputEsm, root } from '../../utils/paths'

export async function generateTypes() {
  await execa('vue-tsc', ['-p', 'tsconfig.declaration.json'], {
    cwd: root,
  })

  return src(`${outputEsm}/**/*.d.ts`).pipe(dest(`${outputCjs}`))
}
