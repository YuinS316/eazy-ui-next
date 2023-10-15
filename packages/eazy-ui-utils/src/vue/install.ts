import type { Plugin, PropType } from 'vue'

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

export function defineListenerProps<F>(callback?: any) {
  return {
    type: [Function, Array] as PropType<F | F[]>,
    default: callback,
  }
}
