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
  url: string
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
