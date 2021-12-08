import eruda from 'eruda'

export function isFunction(obj: unknown): obj is <T>(...arg: unknown[]) => T {
  return typeof obj === 'function'
}

export function initEruda(): void {
  if (import.meta.env.VITE_APP_ERUDA === 'yes') {
    eruda.init()
  }
}
