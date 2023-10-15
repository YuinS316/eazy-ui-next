import type { ProjectManifest } from '@pnpm/types'

export function getPackageManifest(pkgPath: string) {
  // eslint-disable-next-line ts/no-var-requires, ts/no-require-imports
  return require(pkgPath) as ProjectManifest
}

export function getPackageDependencies(pkgPath: string): Record<'dependencies' | 'peerDependencies', string[]> {
  const manifest = getPackageManifest(pkgPath)
  const { dependencies = {}, peerDependencies = {} } = manifest

  return {
    dependencies: Object.keys(dependencies),
    peerDependencies: Object.keys(peerDependencies),
  }
}
