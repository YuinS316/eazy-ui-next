import type { ExternalOption } from 'rollup'
import { compPackage } from './paths'
import { getPackageDependencies } from './pkg'

export const target = 'esnext'

/**
 * 将依赖都设置为外部模块，即不打包进去
 * @param options
 * @returns
 */
export function generateExternal(options: { full: boolean }): ExternalOption {
  const { dependencies, peerDependencies } = getPackageDependencies(compPackage)

  return (id: string) => {
    const packages: string[] = [...peerDependencies]
    if (options.full)
      packages.push(...dependencies)

    return [...new Set(packages)].some(
      pkg => id === pkg || (options.full && id.startsWith(`${pkg}/`)),
    )
  }
}

/**
 * 对一些只有es模块的做兼容
 * @returns
 */
export function generatePaths() {
  const paths: Array<[string, string]> = [
    // ['lodash-es', 'lodash'],
    // ['vant/es', 'vant/lib'],
  ]

  return (id: string) => {
    for (const [oldPath, newPath] of paths) {
      if (id.startsWith(oldPath))
        return id.replace(oldPath, newPath)
    }

    return ''
  }
}
