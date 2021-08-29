// 缓存 toString
const toString = Object.prototype.toString

// val is Date 类型保护
export function isDate(val: any): val is Date {
  return toString.call(val) === '[object Date]'
}

// val is Object 类型保护
export function isObject(val: any): val is Object {
  return val !== null && typeof val === 'object'
}
