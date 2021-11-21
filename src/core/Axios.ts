// 文件首字母大写 标识是一个类
import {
  AxiosPromise,
  AxiosRequestConfig,
  AxiosResponse,
  Method,
  RejectedFn,
  ResolvedFn
} from '../types'
import dispatchRequest from './dispatchRequest'
// 这是一个泛型类，可以 new 的
import InterceptorManager from './InterceptorManager'
import mergeConfig from './mergeConfig'

interface Interceptors {
  // 请求拦截器
  request: InterceptorManager<AxiosRequestConfig>
  // 响应拦截器
  response: InterceptorManager<AxiosResponse>
}

interface PromiseChain<T> {
  // 接受ResolvedFn 或者 dispatchRequest 方法 默认情况下
  resolved: ResolvedFn<T> | ((config: AxiosRequestConfig) => AxiosPromise)
  rejected?: RejectedFn
}

export default class Axios {
  defaults: AxiosRequestConfig
  // 拦截器
  interceptors: Interceptors

  // 实例化的时候初始化拦截器
  constructor(initConfig: AxiosRequestConfig) {
    this.defaults = initConfig
    this.interceptors = {
      // 请求拦截器
      request: new InterceptorManager<AxiosRequestConfig>(),
      // 响应拦截器
      response: new InterceptorManager<AxiosResponse>()
    }

    console.log('this.interceptors', this.interceptors)
  }

  // 发送请求的方法
  request(url: any, config?: any): AxiosPromise {
    // 支持函数重载
    if (typeof url === 'string') {
      if (!config) {
        config = {}
      }
      config.url = url
    } else {
      config = url
    }

    config = mergeConfig(this.defaults, config)
    // 拦截器链,一堆拦截器
    const chain: PromiseChain<any>[] = [
      // 默认一个初始值
      {
        // 默认发送请求
        resolved: dispatchRequest,
        rejected: undefined
      }
    ]

    // 添加请求拦截器，先执行后添加的，再执行先添加的，添加到头部 unshift
    this.interceptors.request.forEach(interceptor => {
      chain.unshift(interceptor)
    })

    // 添加响应拦截器，先执行先添加的，后执行后添加的。添加尾部 push
    this.interceptors.response.forEach(interceptor => {
      chain.push(interceptor)
    })

    let promise = Promise.resolve(config)
    // 实现链式调用
    while (chain.length) {
      // 获取当前拦截器
      const { resolved, rejected } = chain.shift()! // 类型断言，不为空

      // 链式调用
      promise = promise.then(resolved, resolved)
    }

    // return dispatchRequest(config)

    return promise

    /* 拦截器链式调用简单过程
     // 多个拦截器
     const testInterceptors= ['请求拦截2', '请求拦截1', 'dispatchRequest', '响应拦截1', '响应拦截2']

     // 链式调用
     promise = testInterceptors
     .then(resolved, resolved) // 请求拦截2
     .then(resolved, resolved) // 请求拦截1
     .then(resolved, resolved) // dispatchRequest
     .then(resolved, resolved) // 响应拦截1
     .then(resolved, resolved) // 响应拦截2

     // 返回结果
     return promise
     */
  }

  get(url: string, config?: AxiosRequestConfig): AxiosPromise {
    return this._requestMethodWithoutData('get', url, config)
  }

  delete(url: string, config?: AxiosRequestConfig): AxiosPromise {
    return this._requestMethodWithoutData('delete', url, config)
  }

  head(url: string, config?: AxiosRequestConfig): AxiosPromise {
    return this._requestMethodWithoutData('head', url, config)
  }

  options(url: string, config?: AxiosRequestConfig): AxiosPromise {
    return this._requestMethodWithoutData('options', url, config)
  }

  post(url: string, data?: any, config?: AxiosRequestConfig): AxiosPromise {
    return this._requestMethodWithData('post', url, data, config)
  }

  put(url: string, data?: any, config?: AxiosRequestConfig): AxiosPromise {
    return this._requestMethodWithData('put', url, data, config)
  }

  patch(url: string, data?: any, config?: AxiosRequestConfig): AxiosPromise {
    return this._requestMethodWithData('patch', url, data, config)
  }

  // 抽离复用的参数，内部直接调用 request 方法就行
  _requestMethodWithoutData(method: Method, url: string, config?: AxiosRequestConfig) {
    return this.request(
      Object.assign(config || {}, {
        method,
        url
      })
    )
  }

  // 抽离复用的参数
  _requestMethodWithData(method: Method, url: string, data?: any, config?: AxiosRequestConfig) {
    return this.request(
      Object.assign(config || {}, {
        method,
        url,
        data
      })
    )
  }
}
