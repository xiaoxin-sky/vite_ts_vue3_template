import { ICreateBaseAxiosConfig } from '@/util/baseAxios'
import axios, { AxiosRequestConfig, Canceler, CancelToken } from 'axios'

const cancelerMap = new Map<string, Canceler>()

const __isDEV = import.meta.env.DEV

export const configCanceler = (config: ICreateBaseAxiosConfig): void => {
  const { url } = config
  if (!isValidURL(url)) {
    return
  }
  !config.requestOptions?.ignoreCancelToken && (config.cancelToken = appendCanceler(url as string))
}

export const appendCanceler = (url: string, method: AxiosRequestConfig['method'] = 'GET'): CancelToken => {
  removeCanceler(url, method)

  const cancelUrl = getCancelUrl(url, method)
  const cancelToken = new axios.CancelToken((cancel) => {
    cancelerMap.set(cancelUrl, cancel)
  })
  return cancelToken
}

export const removeCanceler = (url: string | undefined, method: AxiosRequestConfig['method'] = 'GET'): void => {
  if (!isValidURL(url)) {
    return
  }

  const cancelUrl = getCancelUrl(url as string, method)
  if (hasCanceler(cancelUrl)) {
    const oldCanceler = cancelerMap.get(cancelUrl)
    oldCanceler && oldCanceler('取消了取消了')
    cancelerMap.delete(cancelUrl)
  }
}

export const clearAll = (): void => {
  cancelerMap.clear()
}

function hasCanceler(url: string): boolean {
  return cancelerMap.has(url)
}

function getCancelUrl(url: string, method: AxiosRequestConfig['method']) {
  return `${method}&${url}`
}

// url 是否有效
function isValidURL(url: unknown) {
  if (typeof url === 'string') {
    return true
  } else {
    if (__isDEV) {
      console.warn(`配置 Canceler 失败，url不能为空`)
    }
    return false
  }
}

export default { appendCanceler, removeCanceler, clearAll }
