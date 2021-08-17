// 布尔值
let isDone: boolean = false


// 数字类型
// 10 进制
let decLiteral: number = 20
// 16 进制
let hexLiteral: number = 0x14
// 2 进制
let binaryLiteral: number = 0b10100
// 8 进制
let octalLiteral: number = 0o24

// 字符串
// @ts-ignore
// let name: string = 'bob'


// 数组
let list: number[] = [1, 2, 3]

let list1: Array<number> = [1, 2, 3]


// 元组 Tuple

let x: [string, number]
x = ['xxx', 222] // ok

// x = [222, 'xxx']  // error


// 枚举

enum Color {
  Red, Green, Blude
}

let c: Color = Color.Green

let colorNme: string = Color[1]

console.log('colorNme', colorNme)

// any

// void
// 没有任何类型

function warnUser(): void {
  console.log('xxxx')
}

// never

function error(mes: string): never {
  throw new Error(mes)
}


// object 非原始类型
// 生命一个函数
declare function cerate(o: object | null): void;

cerate({ prop: 0 })
cerate(null)

// 类型断言

let someValue: any = 'this is a string'

// 强制转化
// let strLength: number = (<string>someValue).length

// 类型断言
let strLength2: number = (someValue as string).length



