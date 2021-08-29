import { isDate, isPlainObject } from './util'

function encode(val: string): string {
  return encodeURIComponent(val)
    .replace(/%40/g, '@')
    .replace(/%3A/gi, ':')
    .replace(/%24/g, '$')
    .replace(/%2C/gi, ',')
    .replace(/%20/g, '+')
    .replace(/%20/g, '+')
    .replace(/%5B/gi, '[')
    .replace(/%5D/gi, ']')
}

export function buildURL(url: string, params: string): string {
  if (!params) return url

  const parts: string[] = []

  // 处理参数
  Object.keys(params).forEach(key => {
    // @ts-ignore
    const val = params[key]

    if (val === null || typeof val === 'undefined') {
      return
    }

    let values = []

    // 把 val 转换为数组方便处理
    if (Array.isArray(val)) {
      values = val
      // 表示是一个数组
      key += '[]'
    } else {
      values = [val]
    }

    // 转换 val
    values.forEach(val => {
      if (isDate(val)) {
        val = val.toISOString()
      } else if (isPlainObject(val)) {
        val = JSON.stringify(val)
      }

      // 处理好的添加到数组里面
      parts.push(`${encode(key)}=${encode(val)}`)
    })
  })

  let serializedParams = parts.join('&')

  if (serializedParams) {
    // 判断哈希
    const markIndex = url.indexOf('#')

    if (markIndex !== -1) {
      url = url.slice(0, markIndex)
    }

    // 判断是否已经有参数
    url += (url.indexOf('?') === -1 ? '?' : '&') + serializedParams
  }

  return url
}
