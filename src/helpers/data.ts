import { isPlainObject } from './util'

// 转换请求的 data
export function transformRequest(data: any): any {
  if (isPlainObject(data)) {
    return JSON.stringify(data)
  }

  return data
}

// 转换响应的 data
export function transformResponse(data: any): any {
  if (typeof data === 'string') {
    // 报错兼容
    try {
      data = JSON.parse(data)
    } catch (e) {
      // do nothing
    }
  }

  return data
}
