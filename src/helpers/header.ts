import { isPlainObject } from './util'

// 正常化 请求头 header 的字段
function normalizeHeaderName(headers: any, normalizedName: string): void {
  if (!headers) return

  Object.keys(headers).forEach(name => {
    // 两个不相等情况下如果转换成大写相等，说明是一样的
    if (name !== normalizedName && name.toUpperCase() === normalizedName.toUpperCase()) {
      headers[normalizedName] = headers[name]
      delete headers[name]
    }
  })
}

// 设置 header 参数
export function processHeaders(headers: any, data: any): any {
  normalizeHeaderName(headers, 'Content-Type')

  if (isPlainObject(data)) {
    // 如果没有 Content-Type 就配置
    if (headers && headers['Content-Type']) {
      headers['Content-Type'] = 'application/json;charset=utf-8'
    }
  }

  return headers
}

// 处理响应头 header
export function parseHeaders(headers: string): any {
  // 如果没有默认返回空对象
  let parsed = Object.create(null)
  if (!headers) return parsed

  headers.split('\r\n').forEach(line => {
    let [key, val] = line.split(':')

    key = key.trim().toLowerCase()

    if (!key) return

    if (val) val = val.trim()

    parsed[key] = val
  })

  return parsed
}
