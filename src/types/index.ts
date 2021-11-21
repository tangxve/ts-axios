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

  // 字符串索引签名 可以通过config[key] 索引方式访问
  [propName: string]: any
}

// T = any 默认是any，传入什么类型，返回什么类型
export interface AxiosResponse<T = any> {
  data: T
  status: number
  statusText: string
  headers: any
  config: AxiosRequestConfig
  request: any
}

// <AxiosResponse<T>> 这种写法，相当于把 T 传过去
export interface AxiosPromise<T = any> extends Promise<AxiosResponse<T>> {}

export interface AxiosError extends Error {
  isAixosError: boolean
  config: AxiosRequestConfig
  code?: string | null
  request?: any
  response?: AxiosResponse
}

// axios 类型接口，类中的公共方法
export interface Axios {
  defaults?: AxiosRequestConfig

  interceptors: {
    request: AxiosInterceptorManager<AxiosRequestConfig>
    response: AxiosInterceptorManager<AxiosResponse>
  }

  // 传入的什么类型T，就返回什么类型T <T = any>: 泛型参数
  request<T = any>(config: AxiosRequestConfig): AxiosPromise<T>

  get<T = any>(url: string, config?: AxiosRequestConfig): AxiosPromise<T>

  delete<T = any>(url: string, config?: AxiosRequestConfig): AxiosPromise<T>

  head<T = any>(url: string, config?: AxiosRequestConfig): AxiosPromise<T>

  options<T = any>(url: string, config?: AxiosRequestConfig): AxiosPromise<T>

  post<T = any>(url: string, data?: any, config?: AxiosRequestConfig): AxiosPromise<T>

  put<T = any>(url: string, data?: any, config?: AxiosRequestConfig): AxiosPromise<T>

  patch<T = any>(url: string, data?: any, config?: AxiosRequestConfig): AxiosPromise<T>
}

// 混合类型接口
export interface AxiosInstance extends Axios {
  // 传入一个类型，拿到对应类型的结果
  <T = any>(config: AxiosRequestConfig): AxiosPromise<T>

  // 支持函数重载
  <T = any>(url: string, config: AxiosRequestConfig): AxiosPromise<T>
}

// 拦截器泛型接口
export interface AxiosInterceptorManager<T = any> {
  // 创建拦截器 use 方法,返回拦截器 id，所以是 number 类型
  use(resolved: ResolvedFn<T>, rejected?: RejectedFn): number

  // 根据id 删除一个拦截器
  eject(id: number): void
}

export interface ResolvedFn<T> {
  // 同步返回T，异步返回 Promise<T>
  (val: T): T | Promise<T>
}

export interface RejectedFn {
  // 返回参数error
  (error: any): any
}
