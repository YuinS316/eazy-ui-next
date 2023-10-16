import { resolve } from 'node:path'

// root
export const pkgRoot = resolve(__dirname, '..', '..', '..')
export const root = resolve(pkgRoot, 'components')
export const compRoot = resolve(root, 'src')

// output
export const output = resolve(root, 'dist')
export const outputEsm = resolve(root, 'es')
export const outputCjs = resolve(root, 'lib')

// package
export const tsconfig = resolve(root, 'tsconfig.json')
export const compPackage = resolve(root, 'package.json')
