import { execa } from 'execa'
import { dest, src } from 'gulp'
import { outputCjs, outputEsm, root } from '../../utils/paths'

export async function generateTypes() {
  await execa('tsc', ['-p', 'tsconfig.build.json'], {
    cwd: root,
  })

  return src(`${outputEsm}/**/*.d.ts`).pipe(dest(`${outputCjs}`))
}
