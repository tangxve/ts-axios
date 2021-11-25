import { AxiosInstance, AxiosRequestConfig, AxiosStatic } from './types'
import Axios from './core/Axios'
import { extend } from './helpers/util'
import defaults from './defaults'
import mergeConfig from './core/mergeConfig'

// 工厂函数创建 axios
function createInstance(config: AxiosRequestConfig): AxiosStatic {
  // 实例化
  const context = new Axios(config)

  // instance 指向 Axios.prototype.request 方法，并绑定了上下文
  const instance = Axios.prototype.request.bind(context)

  // 拷贝到 instance (混合对象)
  extend(instance, context)

  return instance as AxiosStatic
}

const axios = createInstance(defaults)

axios.create = function create(config) {
  return createInstance(mergeConfig(defaults, config))
}

export default axios
