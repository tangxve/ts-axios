export default class Cancel {
  message?: string

  constructor(message?: string) {
    this.message = message
  }
}

// 判断是不是 isCancel
export function isCancel(value: any): boolean {
  return value instanceof Cancel
}
