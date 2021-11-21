import { AxiosRequestConfig } from '../types'
import { isPlainObject, deepMerge } from '../helpers/util'

// 默认合并策略 优先取 val2
function defaultStrat(val1: any, val2: any): any {
  return typeof val2 !== 'undefined' ? val2 : val1
}

// 只接受自定义配置合并策略 只拿val2 忽略val1
function fromVal2Start(val1: any, val2: any): any {
  if (typeof val2 !== 'undefined') {
    return val2
  }
}

// 深度合并
function deepMergeStrat(val1: any, val2: any): any {
  if (isPlainObject(val2)) {
    return deepMerge(val1, val2)
  } else if (typeof val2 !== 'undefined') {
    return val2
  } else if (isPlainObject(val1)) {
    return deepMerge(val1)
  } else if (typeof val1 !== 'undefined') {
    return val1
  }
}

// 策略函数 map
const strats = Object.create(null)
const stratKeysFromVal2 = ['url', 'params', 'data']
// 这些属性默认使用
stratKeysFromVal2.forEach(key => {
  strats[key] = fromVal2Start
})

const stratKeysDeepMerge = ['headers']

stratKeysDeepMerge.forEach(key => {
  strats[key] = deepMergeStrat
})

export default function mergeConfig(
  config1: AxiosRequestConfig,
  config2?: AxiosRequestConfig
): AxiosRequestConfig {
  if (!config2) {
    config2 = {}
  }

  const config = Object.create(null)

  for (let key in config2) {
    mergeField(key)
  }

  for (let key in config1) {
    if (!config2[key]) {
      mergeField(key)
    }
  }

  function mergeField(key: string): void {
    const strat = strats[key] || defaultStrat
    config[key] = strat(config1[key], config2![key])
  }

  return config
}
