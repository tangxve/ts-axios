import { AxiosRequestConfig } from './types'
import { processHeaders } from './helpers/header'
import { transformRequest, transformResponse } from './helpers/data'

const defaults: AxiosRequestConfig = {
  method: 'get',

  timeout: 0,

  headers: {
    // 所有类型的请求
    common: {
      Accept: 'application/json, text/plain, */*'
    }
  },
  transformRequest: [
    function(data: any, headers: any): any {
      processHeaders(headers, data)
      return transformRequest(data)
    }
  ],
  transformResponse: [
    function(data: any): any {
      return transformResponse(data)
    }
  ]
}

// 下面的请求类型，不需要默认 header
const methodsNoData = ['delete', 'get', 'head', 'options']

methodsNoData.forEach(method => {
  defaults.headers[method] = {}
})

// 需要添加 默认header
const methodsWithData = ['post', 'put', 'patch']

methodsWithData.forEach(method => {
  defaults.headers[method] = {
    'Content-Type': 'application/x-www-form-urlencoded'
  }
})

export default defaults
