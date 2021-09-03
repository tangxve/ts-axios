export type Method =
  | 'get'
  | 'GET'
  | 'put'
  | 'PUT'
  | 'head'
  | 'HEAD'
  | 'post'
  | 'POST'
  | 'patch'
  | 'PATCH'
  | 'delete'
  | 'Delete'
  | 'options'
  | 'OPTIONS'

export interface AxiosRequestConfig {
  // axios 类里面已经是必传的，这里可选就行 Axios
  url?: string
  method?: Method
  data?: any
  params?: any
  headers?: any
  // 响应的类型
  responseType?: XMLHttpRequestResponseType
  timeout?: number
}

export interface AxiosResponse {
  data: any
  status: number
  statusText: string
  headers: any
  config: AxiosRequestConfig
  request: any
}

export interface AxiosPromise extends Promise<AxiosResponse> {}

export interface AxiosError extends Error {
  isAixosError: boolean
  config: AxiosRequestConfig
  code?: string | null
  request?: any
  response?: AxiosResponse
}

// axios 类型接口，类中的公共方法
export interface Axios {
  request(config: AxiosRequestConfig): AxiosPromise

  get(url: string, config?: AxiosRequestConfig): AxiosPromise

  delete(url: string, config?: AxiosRequestConfig): AxiosPromise

  head(url: string, config?: AxiosRequestConfig): AxiosPromise

  options(url: string, config?: AxiosRequestConfig): AxiosPromise

  post(url: string, data?: any, config?: AxiosRequestConfig): AxiosPromise

  put(url: string, data?: any, config?: AxiosRequestConfig): AxiosPromise

  patch(url: string, data?: any, config?: AxiosRequestConfig): AxiosPromise
}

// 混合类型接口
export interface AxiosInstance extends Axios {
  (config: AxiosRequestConfig): AxiosPromise
}
