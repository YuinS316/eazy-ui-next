export function isArray<T>(target: unknown): target is Array<T> {
  return Array.isArray(target)
}

export function isString(val: unknown): val is string {
  return typeof val === 'string'
}

export function isBoolean(val: unknown): val is boolean {
  return typeof val === 'boolean'
}

export function isNumber(val: unknown): val is number {
  return typeof val === 'number'
}

export function isObject(val: unknown): val is Record<string, any> {
  return typeof val === 'object' && val !== null
}

export const isDef = <T = any>(val: unknown): val is T => val !== undefined
