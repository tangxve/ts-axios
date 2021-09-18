import { RejectedFn, ResolvedFn } from '../types'

interface Interceptor<T> {
  // 成功函数
  resolved: ResolvedFn<T>
  // 失败函数
  rejected?: RejectedFn
}

// 拦截器类 泛型类
export default class InterceptorManager<T> {
  // 私有属性 储存拦截器，数组里面的元素支持 null
  private interceptors: Array<Interceptor<T> | null>

  constructor() {
    this.interceptors = []
  }

  // 添加拦截器
  use(resolved: ResolvedFn<T>, rejected?: RejectedFn): number {
    this.interceptors.push({
      resolved,
      rejected
    })

    return this.interceptors.length - 1
  }

  // 删除拦截器
  eject(id: number): void {
    // 不能删除元素，会影响数组长度，拦截器的ID 对应的数组长度，等于一个null
    if (this.interceptors[id]) {
      this.interceptors[id] = null
    }
  }

  // 遍历拦截器（内部逻辑使用，不需要报漏）
  // (interceptor: Interceptor<T>) => void 相当于给 fn 定义的 类型，
  // 和下面的 参数不冲突
  forEach(fn: (interceptor: Interceptor<T>) => void): void {
    this.interceptors.forEach(interceptor => {
      if (interceptor !== null) {
        fn(interceptor)
      }
    })
  }
}
