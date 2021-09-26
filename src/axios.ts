import { AxiosInstance, AxiosRequestConfig } from './types'
import Axios from './core/Axios'
import { extend } from './helpers/util'
import defaults from './defaults'

// 工厂函数创建 axios
function createInstance(config: AxiosRequestConfig): AxiosInstance {
  // 实例化
  const context = new Axios(config)

  // instance 指向 Axios.prototype.request 方法，并绑定了上下文
  const instance = Axios.prototype.request.bind(context)

  // 拷贝到 instance (混合对象)
  extend(instance, context)

  return instance as AxiosInstance
}

const axios = createInstance(defaults)

export default axios
