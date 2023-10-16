/* eslint-disable node/prefer-global/process */
import type { ComponentResolver, SideEffectsInfo } from 'unplugin-vue-components/types'
import { kebabCase } from 'unplugin-vue-components'

// 判断是不是服务端渲染
const isSSR = Boolean(
  process.env.SSR || process.env.SSG || process.env.VITE_SSR || process.env.VITE_SSG,
)

// 服务端渲染使用 cjs 模块，反之使用 esm 模块
const moduleType = isSSR ? 'lib' : 'es'

// 解析器的参数配置
export interface EazyResolverOptions {
  // 执行加载 css 还是 scss，默认加载 css
  importStyle?: boolean | 'css' | 'scss'
}

// 获取到副作用
function getSideEffects(
  dirName: string,
  options: EazyResolverOptions,
): SideEffectsInfo | undefined {
  // 是否加载
  const { importStyle = true } = options
  if (!importStyle || isSSR)
    return

  // 获取到副作用的路径
  if (importStyle === 'scss')
    return `@eazy-ui-next/components/${moduleType}/${dirName}/style/scss`

  else
    return `@eazy-ui-next/components/${moduleType}/${dirName}/style/index`
}

//  unplugin-vue-components
export function EazyResolver(options: EazyResolverOptions = {}): ComponentResolver {
  return {
    type: 'component',
    resolve(name: string) {
      if (name.startsWith('Ez') || name.startsWith('ez-')) {
        const partialName = name.replace('ez-', '').replace('Ez', '')
        return {
          name: partialName,
          from: `@eazy-ui-next/components/${moduleType}`,
          sideEffects: getSideEffects(kebabCase(partialName), options),
        }
      }
    },
  }
}
