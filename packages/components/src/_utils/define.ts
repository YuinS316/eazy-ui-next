import type { Plugin, PropType } from 'vue'
import { isArray, isDef } from './is'

export type SFCWithInstall<T> = T & Plugin

export function withInstall<T, E extends Record<string, any>>(main: T, extra?: E): SFCWithInstall<T> & E {
  ;(main as SFCWithInstall<T>).install = (app): void => {
    for (const comp of [main, ...Object.values(extra ?? {})])
      app.component(comp.name, comp)
  }

  if (extra) {
    for (const [key, comp] of Object.entries(extra)) {
      ;(main as any)[key] = comp
    }
  }
  return main as SFCWithInstall<T> & E
}

/**
 * @description 定义事件属性
 *
 * @param callback 默认函数
 * @returns
 */
export function defineListenerProps<F>(callback?: any) {
  return {
    type: [Function, Array] as PropType<F | F[]>,
    default: callback,
  }
}

/**
 * @description 定义字符串类型属性
 *
 * @param defaultVal 默认值
 * @returns
 * @example
 * {
 *   foo: defineStringProp<'a'|'b'>('a')
 * }
 */
export function defineStringProp<F>(defaultVal: F) {
  return {
    type: String as unknown as PropType<F>,
    default: defaultVal,
  }
}

type ClassName = string | undefined | null
type Classes = (ClassName | [any, ClassName, ClassName?])[]

/**
 * 创建类名
 *
 * @param name
 * @returns
 */
export function createNamespace(name: string) {
  const namespace = 'ez' as const

  const compName = `${namespace}-${name}` as const

  const createBEM = (suffix?: string) => {
    if (!isDef<string>(suffix))
      return compName

    /**
     * example:
     * createNamespace("button")
     * createBEM("&--flex") ->  "ez--flex"
     */
    if (suffix.startsWith('&'))
      return suffix.replace('&', namespace)

    /**
     * example:
     * createNamespace("button")
     * createBEM("--primary") -> "ez-button--primary"
     */
    if (suffix.startsWith('--'))
      return `${compName}${suffix}`

    /**
     * example:
     * createNamespace("button")
     * createBEM("__active") -> "ez-button__active"
     */
    if (suffix.startsWith('__'))
      return `${compName}${suffix}`

    return `${compName}__unknown_define`
  }

  /**
   * 创建类名
   *
   * @param classes
   * @returns
   *
   * @example
   * cls('a', 'b') === 'a b'
   * cls([true, 'a', 'b']) === 'a'
   * cls([true, 'a']) === 'a'
   */
  const classNames = (...classes: Classes) => {
    return classes.map((className) => {
      if (isArray(className)) {
        const [condition, truthy, falsy = null] = className
        return condition ? truthy : falsy
      }

      return className
    })
  }

  return {
    n: createBEM,
    cls: classNames,
  }
}
