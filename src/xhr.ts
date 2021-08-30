import { AxiosPromise, AxiosRequestConfig, AxiosResponse } from './types'

export default function xhr(config: AxiosRequestConfig): AxiosPromise {
  return new Promise(resolve => {
    const { data = null, url, method = 'get', headers, responseType } = config

    const request = new XMLHttpRequest()

    // 设置响应类型
    if (responseType) {
      request.responseType = responseType
    }

    request.open(method.toUpperCase(), url, true)

    request.onreadystatechange = function handleLoad() {
      if (request.readyState !== 4) {
        return
      }

      // 获取响应header
      const responseHeaders = request.getAllResponseHeaders()

      // 获取响应data
      const responseData = responseType !== 'text' ? request.response : request.responseType

      const response: AxiosResponse = {
        data: responseData,
        headers: responseHeaders,
        status: request.status,
        statusText: request.statusText,
        config,
        request
      }

      resolve(response)
    }

    // 设置 header
    Object.keys(headers).forEach(name => {
      // 如果没有date 就删除 content-type
      if (data === null && name.toLowerCase() === 'conten`t-type') {
        delete headers[name]
      } else {
        request.setRequestHeader(name, headers[name])
      }
    })

    request.send(data)
  })
}
