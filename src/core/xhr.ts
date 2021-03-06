import { AxiosPromise, AxiosRequestConfig, AxiosResponse } from '../types'
import { parseHeaders } from '../helpers/header'
import { createErroe } from '../helpers/error'

export default function xhr(config: AxiosRequestConfig): AxiosPromise {
  return new Promise((resolve, reject) => {
    const { data = null, url, method = 'get', headers, responseType, timeout, cancelToken } = config

    const request = new XMLHttpRequest()

    // 初始化一个请求
    request.open(method.toUpperCase(), url!, true)

    // 设置响应类型
    if (responseType) {
      request.responseType = responseType
    }

    // 设置超时
    if (timeout) {
      request.timeout = timeout
    }

    // 设置请求 header
    Object.keys(headers).forEach(name => {
      // 如果没有date 就删除 content-type
      if (data === null && name.toLowerCase() === 'conten`t-type') {
        delete headers[name]
      } else {
        request.setRequestHeader(name, headers[name])
      }
    })

    // 状态变化时候回调
    // https://developer.mozilla.org/zh-CN/docs/Web/API/XMLHttpRequest/onreadystatechange
    request.onreadystatechange = function handleLoad() {
      // xhr 处理的状态 4-下载操作已完成。
      // https://developer.mozilla.org/zh-CN/docs/Web/API/XMLHttpRequest/readyState
      if (request.readyState !== 4) {
        return
      }

      // request.status 响应状态码、200-成功、当出现网络错误或者超时错误的时候，该值都为 0。
      if (request.status === 0) {
        return
      }

      // 获取响应header
      const responseHeaders = parseHeaders(request.getAllResponseHeaders())

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

      handleResponse(response)
    }

    // 网络异常错误处理
    request.onerror = function handleError() {
      reject(createErroe('Network Error', config, null, request))
    }

    // 超时错误处理
    request.ontimeout = function handleTimeout() {
      reject(
        createErroe(
          `超过 ${timeout}ms 的超时时间`,
          config,
          'ECONNABORTED', // 被终止
          request
        )
      )
    }

    // 处理返回结果
    function handleResponse(response: AxiosResponse) {
      if (response.status >= 200 && response.status < 300) {
        resolve(response)
      } else {
        // 处理非200 状态码
        reject(createErroe(`请求失败，状态码：${response.status}`, config, null, request, response))
      }
    }

    if (cancelToken) {
      // 外部如果调用 cancelToken 实例的方法，下面就执行，然后取消请求
      cancelToken.promise.then(reason => {
        request.abort()
        reject(reason)
      })
    }

    // 发送请求
    request.send(data)
  })
}
