import { AxiosRequestConfig } from './types'
import xhr from './xhr'
import { buildURL } from './helpers/url'
import { transformRequest } from './helpers/data'
import { processHeaders } from './helpers/header'

function axios(config: AxiosRequestConfig): void {
  // 处理 config
  processConfig(config)

  // 发送请求
  xhr(config)
}

// 发送 xhr 之前对 config 做处理 void 没有任何类型
function processConfig(config: AxiosRequestConfig): void {
  config.url = transformURL(config)
  // 先处理 headers 在处理 data，transformRequestData 方法会改写 data
  config.headers = transformHeaders(config)
  config.data = transformRequestData(config)
}

// 处理 config 中 url
function transformURL(config: AxiosRequestConfig): string {
  const { url, params } = config

  return buildURL(url, params)
}

// 处理请求 data
function transformRequestData(config: AxiosRequestConfig): any {
  return transformRequest(config.data)
}

// 处理 headers
function transformHeaders(config: AxiosRequestConfig): any {
  // headers 要给个默认值，处理header方法判断了header
  const { headers = {}, data } = config

  return processHeaders(headers, data)
}

export default axios
