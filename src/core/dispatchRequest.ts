import { AxiosPromise, AxiosRequestConfig, AxiosResponse } from '../types'
import xhr from './xhr'
import { buildURL } from '../helpers/url'
import { flattenHeaders } from '../helpers/header'
import transform from './transform'

export default function dispatchRequest(config: AxiosRequestConfig): AxiosPromise {
  // 发送请求判断是否有取消
  throwIfCancellationRequested(config)

  // 处理 config
  processConfig(config)

  // 发送请求
  return xhr(config).then(res => transformResponseData(res))
}

// 发送 xhr 之前对 config 做处理 void 没有任何类型
function processConfig(config: AxiosRequestConfig): void {
  config.url = transformURL(config)
  // 先处理 headers 再处理 data，transformRequestData 方法会改写 data
  // config.headers = transformHeaders(config)
  config.data = transform(config.data, config.headers, config.transformRequset)
  config.headers = flattenHeaders(config.headers, config.method!)
}

// 处理 config 中 url
function transformURL(config: AxiosRequestConfig): string {
  const { url, params } = config

  // url！ 类型断言 url 不为空
  return buildURL(url!, params)
}

// 处理响应头 data
function transformResponseData(res: AxiosResponse): AxiosResponse {
  res.data = transform(res.data, res.headers, res.config.transformResponse)

  return res
}

// 如果默认是需求接口，就不发送请求
function throwIfCancellationRequested(config: AxiosRequestConfig): void {
  if (config.cancelToken) {
    config.cancelToken.throwIfRequested()
  }
}

/*
 统一由 transform 方法执行, 下面方法用不到
 // 处理请求头 body 数据
 function transformRequestData(config: AxiosRequestConfig): any {
 return transformRequest(config.data)
 }

 // 处理请求头 headers
 function transformHeaders(config: AxiosRequestConfig): any {
 // headers 要给个默认值，处理header方法判断了header
 const { headers = {}, data } = config

 return processHeaders(headers, data)
 }

 */
