import { Canceler, CancelExecutor, CancelTokenSource } from '../types'

// 这里的 Cancel 是当做值来使用，而不是类型（可以是值，也可以是类型）
import Cancel from './Cancel'

interface ResolvePromise {
  (reason?: Cancel): void
}

export default class CancelToken {
  promise: Promise<Cancel>
  reason?: Cancel

  // 构造函数
  constructor(executor: CancelExecutor) {
    let resolvePromise: ResolvePromise

    this.promise = new Promise<Cancel>(resolve => {
      // 后续直接调用这个方法，修改状态： pening ---> resolve
      resolvePromise = resolve
    })

    executor(message => {
      // 防止重复调用
      if (this.reason) {
        return
      }
      // 实例化Cancel，可以通过 isCancel 方法来判断
      this.reason = new Cancel(message)
      // 修改状态 等待中 =》 成功
      resolvePromise(this.reason)
    })
  }

  static source(): CancelTokenSource {
    let cancel!: Canceler

    const token = new CancelToken(c => {
      // 赋值，外面通过 source 方法得到
      cancel = c
    })
    return {
      cancel,
      token
    }
  }
}
