import { transform } from '@/util/transform'
import { createBaseAxios, ICreateBaseAxiosConfig } from './baseAxios'

export interface IBaseResponse<T> {
  data: T
  status: number
  msg: string
}

const axiosInstance = createRequest()

function createRequest() {
  const { VITE_BASE_API } = import.meta.env
  if (typeof VITE_BASE_API === 'boolean') {
    throw Error('VITE_BASE_API 路径配置错误')
  }
  const axiosInstance = createBaseAxios({
    baseURL: VITE_BASE_API,
    timeout: 20000, // 请求超时时间
    transform,
    requestOptions: {
      ignoreCancelToken: false,
      withToken: false,
      authenticationScheme: '',
    },
  })

  return axiosInstance
}

type requestConfigType = Omit<ICreateBaseAxiosConfig, 'transform'>

async function server<T>(opt: requestConfigType) {
  try {
    const result = await axiosInstance.request(opt)
    return result.data as T
  } catch (error) {
    throw new Error(String(error))
  }
}

export function post<DATA>(config: requestConfigType): Promise<IBaseResponse<DATA>> {
  return server({ ...config, method: 'POST' })
}
export function get<DATA>(config: requestConfigType): Promise<IBaseResponse<DATA>> {
  return server({ ...config, method: 'GET' })
}

export default { post, get }
