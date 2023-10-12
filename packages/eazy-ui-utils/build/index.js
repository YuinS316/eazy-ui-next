const { build } = require('esbuild')

build(
  {
    bundle: true,
    outdir: 'lib',
    platform: 'browser',
    format: 'esm',
    entryPoints: ['./index.ts'],
  },
)
