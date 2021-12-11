import { CancelExecutor } from '../types'

interface ResolvePromise {
  (reason?: string): void
}

export default class CancelToken {
  promise: Promise<string>
  reason?: string

  // 构造函数
  constructor(executor: CancelExecutor) {
    let resolvePromise: ResolvePromise

    this.promise = new Promise<string>(resolve => {
      // 后续直接调用这个方法，修改状态： pening ---> resolve
      resolvePromise = resolve
    })

    executor(message => {
      // 防止重复调用
      if (this.reason) {
        return
      }
      this.reason = message
      // 修改状态 等待中 =》 成功
      resolvePromise(this.reason)
    })
  }
}
