import { configCanceler, removeCanceler } from '@/util/cancler'
import { ITransform } from '@/util/transform'
import { isFunction } from '@/util/util'
import axios, { AxiosInstance, AxiosRequestConfig } from 'axios'

interface IRequestOptions {
  /* 忽略重复请求 */
  ignoreCancelToken: boolean
  // 是否携带token
  withToken: boolean
  /* token 前缀 */
  authenticationScheme: string
}

export interface ICreateBaseAxiosConfig extends AxiosRequestConfig {
  transform: ITransform
  requestOptions?: IRequestOptions
}

export function createBaseAxios(opt: ICreateBaseAxiosConfig): AxiosInstance {
  const { transform } = opt
  const axiosInstance = axios.create(opt)
  const { requestInterceptors, responseInterceptors } = transform

  axiosInstance.interceptors.request.use((config) => {
    const conf = config as ICreateBaseAxiosConfig

    if (conf.requestOptions?.withToken) {
      const { authenticationScheme } = conf.requestOptions
      const token = getToken()
      config.headers.Authorization = authenticationScheme ? `${authenticationScheme} ${token}` : token
    }

    configCanceler(conf)

    requestInterceptors && isFunction(requestInterceptors) && requestInterceptors(config)

    requestInterceptors(config)

    return config
  })
  axiosInstance.interceptors.response.use((res) => {
    removeCanceler(res.config.url)

    responseInterceptors && isFunction(responseInterceptors) && responseInterceptors(res)
    return res
  })
  return axiosInstance
}

function getToken() {
  return 'your token method '
}
