// 缓存 toString
const toString = Object.prototype.toString

// val is Date 类型保护
export function isDate(val: any): val is Date {
  return toString.call(val) === '[object Date]'
}

// val is Object 类型保护
// export function isObject(val: any): val is Object {
//   return val !== null && typeof val === 'object'
// }

// 判断普通对象
export function isPlainObject(val: any): val is Object {
  return toString.call(val) === '[object Object]'
}

// 混合对象
// ts 泛型 交叉类型
export function extend<T, U>(to: T, from: U): T & U {
  for (const key in from) {
    // to 断言成 T & U 类型
    // from 断言成 any
    ;(to as T & U)[key] = from[key] as any
  }

  return to as T & U
}

// 实现深拷贝
export function deepMerge(...objs: any[]): any {
  const result = Object.create(null)

  objs.forEach(obj => {
    if (obj) {
      Object.keys(obj).forEach(key => {
        const val = obj[key]
        if (isPlainObject(val)) {
          // 如果当前key 以及是个对象来，那就合并到存在的对象上
          if (isPlainObject(result[key])) {
            result[key] = deepMerge(result[key], val)
          } else {
            result[key] = deepMerge(val)
          }
        } else {
          result[key] = val
        }
      })
    }
  })

  return result
}
