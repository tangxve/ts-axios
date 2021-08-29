import { AxiosRequestConfig } from './types'
import xhr from './xhr'
import { buildURL } from './helpers/url'

function axios(config: AxiosRequestConfig): void {
  // 处理 config
  processConfig(config)

  // 发送请求
  xhr(config)
}

// 发送 xhr 之前对 config 做处理 void 没有任何类型
function processConfig(config: AxiosRequestConfig): void {
  config.url = transformURL(config)
}

// 处理 config 中 url
function transformURL(config: AxiosRequestConfig): string {
  const { url, params } = config

  return buildURL(url, params)
}

export default axios
