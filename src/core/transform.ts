import { AxiosTransformer } from '../types'

export default function transform(
  data: any,
  headers: any,
  fns?: AxiosTransformer | AxiosTransformer[]
): any {
  if (!fns) return data

  if (!Array.isArray(fns)) {
    fns = [fns]
  }

  // 执行管道，把上一个结果传给下一个
  fns.forEach(fn => {
    data = fn(data, headers)
  })

  return data
}
