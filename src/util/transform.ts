import { AxiosRequestConfig, AxiosResponse } from 'axios'

export interface ITransform {
  requestInterceptors: (config: AxiosRequestConfig) => AxiosRequestConfig
  responseInterceptors: (res: AxiosResponse<unknown>) => AxiosResponse<unknown>
}
export const transform: ITransform = {
  requestInterceptors(config) {
    return config
  },
  responseInterceptors(res) {
    return res
  },
}
