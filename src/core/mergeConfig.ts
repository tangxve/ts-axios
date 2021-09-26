import { AxiosRequestConfig } from '../types'

// 默认合并策略 优先取 val2
function defaultStart(val1: any, val2: any): any {
  return typeof val2 !== 'undefined' ? val2 : val1
}

// 只接受自定义配置合并策略 只拿val2 忽略val1
function fromVal2Start(val1: any, val2: any): any {
  if (typeof val2 !== 'undefined') {
    return val2
  }
}

// 策略函数 map
const starts = Object.create(null)

const stratKeysFromVal2 = ['url', 'params', 'data']
// 这些属性默认使用
stratKeysFromVal2.forEach(key => {
  starts[key] = fromVal2Start
})

export default function mergeConfig(
  config1: AxiosRequestConfig,
  config2?: AxiosRequestConfig
): AxiosRequestConfig {
  if (!config2) {
    config2 = {}
  }

  for (let key in config2) {
    mergeField(key)
  }

  for (let key in config1) {
    if (!config2[key]) {
      mergeField(key)
    }
  }

  const config = Object.create(null)

  function mergeField(key: string): void {
    const start = starts[key] || defaultStart
    config[key] = start(config1[key], config2![key])
  }

  return config
}
