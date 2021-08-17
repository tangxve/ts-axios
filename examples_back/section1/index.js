// 布尔值
var isDone = false;
// 数字类型
// 10 进制
var decLiteral = 20;
// 16 进制
var hexLiteral = 0x14;
// 2 进制
var binaryLiteral = 20;
// 8 进制
var octalLiteral = 20;
// 字符串
// @ts-ignore
// let name: string = 'bob'
// 数组
var list = [1, 2, 3];
var list1 = [1, 2, 3];
// 元组 Tuple
var x;
x = ['xxx', 222]; // ok
// x = [222, 'xxx']  // error
// 枚举
var Color;
(function (Color) {
    Color[Color["Red"] = 0] = "Red";
    Color[Color["Green"] = 1] = "Green";
    Color[Color["Blude"] = 2] = "Blude";
})(Color || (Color = {}));
var c = Color.Green;
var colorNme = Color[1];
console.log('colorNme', colorNme);
