/**
 * 检验是否是函数
 * @param target
 * @returns
 */
export function isArray<T = any>(target: unknown): target is Array<T> {
  return Array.isArray(target)
};
