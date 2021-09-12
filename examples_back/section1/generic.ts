/* 泛型
 // old
 // 参数类型和返回类型相同
 function identity(arg: any): any {
 return arg
 }

 // 捕获用户传入的类型，并且返回该类型
 function identity<T>(arg: T): T {
 return arg
 }

 // 1、把参数通过尖括号传入<>
 let output = identity<string>('myString')

 // 2、利用了类型推论——编译器会根据传入的参数自动帮助我们确定 T 的类型
 // 没有必要写<>
 let output = identity('myString')
 */

/* 泛型变量
 function identity<T>(arg: T): T {
 return arg
 }
 // 参数类型：T
 // 参数：arg
 function loggingIdentity<T>(arg: T[]): T[] {
 // 报错，arg 里面没有 length
 console.log(arg.length)
 return arg
 }
 */

/* 泛型类型
 function identity<T>(arg: T): T {
 return arg
 }

 // 泛型函数类型：<T>(arg: T): T
 let myIdentity = <T>(arg: T): T = identity
 */

/* 泛型接口 */
/*function identity<T>(arg: T): T {
 return arg
 }

 // <T> T作为接口的参数
 interface GenericIdentityFn<T> {
 (arg: T): T
 }

 let myIdentity: GenericIdentityFn<Number> = identity
 let myIdentity1: GenericIdentityFn<String> = identity
 */

/* 泛型类 */
/*
 class GenericNumber<T> {
 zeroValue?: T
 add?: (x: T, y: T) => T
 }

 // number 类型
 let myGenericNumber = new GenericNumber<number>()
 myGenericNumber.zeroValue = 0
 myGenericNumber.add = function(x, y) {
 return x + y
 }


 // string 类型
 let stringNumeric = new GenericNumber<string>()
 stringNumeric.zeroValue = ''
 stringNumeric.add = (x, y) => {
 return x + y
 }
 */

/* 泛型约束 */
/*
 function loggingIdentity_error<T>(arg: T): T {
 console.log(arg.length) // 这些会报错
 return arg
 }

 // 1。定义一个接口来约束这个 T 类型
 interface Lengthwise {
 length: number
 }

 // 使用这个接口和 extends 关键字来实现约束
 function loggingIdentity<T extends Lengthwise>(arg: T): T {
 // 这些会报错
 console.log(arg.length) // ok
 return arg
 }

 loggingIdentity(3) // 报错
 loggingIdentity({ length: 3 }) // ok
 */

/* 泛型约束-中使用类型参数 */
/*
// 你可以声明一个类型参数，且它被另一个类型参数所约束。

// <T, K extends keyof T>：K 被 T 的 key 所约束
function getProperty<T, K extends keyof T>(obj: T, key: K) {
  return obj[key]
}

let x = { a: 1, b: 2, c: 3, d: 4 }

getProperty(x, 'a')  // okay
getProperty(x, 'm')  // error
*/


