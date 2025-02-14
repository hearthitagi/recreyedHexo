---
title: javaScript基础 01
tags:
  - javaScript
categories:
  - 代码
description:
  - 基础
  - 变量
  - 流程控制
  - 数组
  - 函数
  - 对象
  - 预解析/作用域/报错
abbrlink: 8ea4b61c
date: 2022-01-26 15:06:00
updated: 2022-02-09 17:00:43
keywords:
cover:
---
## 1. 基础
### 1.1 javaScript 的组成
ECMScirpt(js语法规范)、DOM(文档对象模型)、BOM(浏览器对象模型)
### 1.2 怎么写javaScript
1. 内部书写,script的标签中写js代码
2. 行内书写,js代码可以在html的标签中写
3. 外部引入,在js文件中可以写js代码,script的标签中的src路径引入
4. 还可以在控制台直接书写js代码

## 2. 变量
声明变量 var
`var age = 18;`
控制台打印函数 `console.log()`
### 2.1.1 命名规则
1. 由字母、数字、下划线、$符号组成，不能以数字开头
2. 不能是关键字和保留字，例如：for、while。
3. 区分大小写

### 2.1.2 命名规范
1. 变量名必须有意义
2. 遵守驼峰命名法。首字母小写，后面单词的首字母需要大写。

### 2.2 基本数据类型：
隐式类型转化 例如：非纯数字字符串转化为数字类型，其值为NaN。
1. number
   - 整数：十进制(整数,小数)、十六进制(0x开头:0xa=10)、八进制(0开头:011=9)
   - 浮点数：浮点数都是近似的，保留几位小数即可
   - 科学计数法 (5e-5 = 5乘以10的-5次方) 无穷大:infinity
   - NaN: 数字类型 代表非数字值。

2. string
   - length属性：字符串长度
   - 字符串拼接直接加号 'string1'+'string2'(数字加字符串,隐式转换为字符串)

3. boolean：true false
4. undifined：声明但未赋值
5. null：表示空

### 2.3 复杂数据类型：
Object:
```javascript
var person = new Object();// 声明
person.name = "zark";
var person = {};//另一种方式
person.age = 15;
// 或者直接赋值
var person = {
    hobby : "jump",
    height : 170
};
//json对象 格式要求:属性和属性值都加引号(非字符串值除外)
var person = {
    "hobby" : "jump",
    "height" : 170
};        
```
### 2.4 数据类型转换
```javascript
var age = 18;
console.log(typeof age);//typeof 函数 查看数据类型
// number
```
1. 转化为数字类型 函数Number()、parseInt()、parseFloat()
   - Number() 十六进制转化为十进制、空内容转化为0、非纯数字内容转化为NaN  
   - parseInt() //转化成整数  
   - parseFloat() //转化成浮点数
  
2. 转化为字符串类型 函数toString()、String()(用于undifined和null)
3. 转化为布尔类型 Boolean()
   - 0 NaN '' undefined null会转换成false，其它都会转换成true。

### 2.5 运算符
运算符优先级：  
​括号>点运算符>一元运算符> 算数运算符 >关系运算符>逻辑运算符 >赋值运算符
## 2. 流程控制
### 2.0 顺序结构
默认从上而下顺序执行
### 2.1 分支结构
#### if判断
```javascript
if (200 >= age >= 65) {
    console.log("老年");
} else if (age >= 18) {
    console.log("青年");
} else if (age > 0) {
    console.log("未成年");
} else {
    console.log("输入有误");
}
```
If语句会把后面的值隐式转换成布尔类型

转换为true的有 ： 非空字符串 非0数字 true 任何对象
转换成false的有 ： 空字符串 0 false null undefined

#### 三元运算符
表达式1 ? 表达式2 : 表达式3;  
```javascript
// 满足条件执行第一条，不满足条件执行第二条
age >= 18 ? console.log("青年") : console.log("未成年");
```
#### switch...case判断

使用严格比较，数据类型和数值都要相同;  
switch里的值默认为字符串，有需要时应使用强制类型转换
```javascript
switch (Number(day)) {
    case 1:
        console.log("周一");
        break;
    case 2:
        console.log("周二");
        break;
    default:
        console.log("输入有误");
        break;
}
```
### 2.2 循环结构
#### while循环
```javascript
var a = 1;
while (a <= 10) {
    console.log(a);
    a++;
}
```
#### do...while循环
```javascript
var b = 1;
do {
    console.log(b);
    b++;
} while (b < 10);
```
#### for循环
```javascript
for (var c = 1; c < 10; c++) {
    console.log(c);
}
```
#### continue和break
break:立即跳出整个循环，即循环结束  
continue:立即跳出当前循环，继续下一次循环
### 2.3 调试
弹窗 `alert()`
断点 `debugger`
控制台打印 `console log()`
## 3. 数组
定义：多个元素的有序集合。  
数组的数据类型为 Object  
数组元素可以为任意数据类型
### 3.1 创建
```javascript
var arr1 = new Array();
var arr2 = [1, 2, 3, 4, 5];
```
### 3.2 取值
按下标取值，下标从0开始; 下标越界时，值为undifined;
```javascript
console.log(arr2[5]); //此时取值超出数组长度，返回undifined
// for循环取值
for (var i = 0; i < arr2.length; i++) {
    console.log(arr2[i]);
}
```
### 3.3 修改

1. 直接赋值`arr2[3] = 7;`
2. 数组方法: 

- push: 从最后添加一个或多个值(返回值为数组的长度);
- pop: 从最后删除一个值(返回值为删除的值);
- unshift: 从开始添加一个或多个值(返回值为数组的长度)
- shift: 从开头删除一个值(返回值为删除的值);

```javascript
arr2.push(60, 70, 80);
arr2.pop();
arr2.unshift(11, 22, 33);
arr2.shift();
```

### 3.4 数组去重
indexOf()返回数组中指定元素的第一个值的索引，不存在返回-1
```javascript
var arr1 = [1, 2, 3, 3, 4, 6];
var arr2 = [];
// 第一种方法
for (var i = 0; i < arr1.length; i++) {
    if (arr1.indexOf(arr1[i]) == i) {
        arr2.push(arr1[i]);
}}
// 第二种方法
for (var i = 0; i < arr1.length; i++) {
    if (arr2.indexOf(arr1[i]) == -1) {
        arr2.push(arr1[i]);
}}
```
### 3.5 冒泡排序 
i控制轮数,j控制每轮比较次数
```javascript
var arr3 = [2, 4, 7, 9, 5, 1];
for (var i = 0; i < arr3.length - 1; i++) {
    for (var j = 0; j < arr3.length - i - 1; j++) {
        if (arr3[j] > arr3[j + 1]) {
            var temp = arr3[j];
            arr3[j] = arr3[j + 1];
            arr3[j + 1] = temp;
        }
}}
```
## 4. 函数
为了把一段特定功能的代码块封装起来，减少代码冗余
### 4.1 定义
```javascript
// 具名函数
function name1() { console.log(2); }
// 匿名函数
var k = function () { console.log(1); }
```
### 4.2 调用
`name1();`
### 4.3 参数
形参(定义时); 实参(调用时)  
需要传递参数的函数在调用时没有传递实参,返回值为undifined
```javascript
function plus(num1, num2) {
    console.log(num1 + num2);
}
plus(2, 5);
```
### 4.4 返回值
```javascript
function rate(money) {
    //调用函数时不会显示,不写返回值默认返undifined,return只能有一个
    return money * 3; 
}
rate(100);
```
注意事项：定义在函数里的局部变量每次调用函数都会重新初始化；函数里使用外部全局变量，重复调用不会初始化
### 4.5 函数补充
#### 4.5.1 函数的覆盖问题
- 两个同名的函数声明，后面覆盖前面的  
- 两个同名的函数表达式，调用时执行紧挨着**调用语句**的上一条函数表达式

#### 4.5.2 函数的内置对象
arguments对象是比较特别的一个对象，实际上是函数的一个内置属性。
arguments对象是一个伪数组; arguments数组中前几个元素是函数的参数
- arguments.callee：函数的本身
- arguments.callee.name:函数的名字
- arguments.callee.length:形参的个数
- arguments.length：实参的个数

#### 4.5.3 自执行函数
可以通过给匿名函数本身加括号的方式来一次性调用匿名函数，称为自执行函数
```javascript
(function () {
    alert(123);  
})();
```
#### 4.5.4 函数的数据类型
函数是一种数据类型 名为function;可以被用作参数使用
## 5. 对象
任何事物都可以是对象，可以使用对象简化多参数的函数
#### 5.1 创建对象的方法
字面量
```javascript
var obj = {	name: "zs",	age: 18 }
```
new Object ()方法
```javascript
var obj = new Object ();
obj.name = "zs";
obj.age = 19;
```
工厂函数
```javascript
function Person(age, name) {
//注意规范：函数名首字母大写
    var obj = new Object();
    obj.name = name;
    obj.age = age;
    return obj;
}
```
自定义构造函数
```javascript
function Person(name, age){
    this.name = name;
    this.age = age;
}
var p1 = new Person('zs', 22);
```
this：构造函数在被调用，用来创建对象时，this指向该对象
#### 5.2 操作对象的属性
```javascript
var obj = {	name: "zs",	age: 18, 1: "shuzi"}
// 取得单个属性时
obj["name"]
obj.age
// 给对象增加属性
obj[variable] = "value";
obj.string = "value";
// 通过遍历的方式
for (var key in obj) { 
    console.log(obj[key]);
}
//删除对象属性  delete 属性名.属性值  
delete obj.name;
```
#### 5.3 数组去重:利用对象属性
```javascript
var arr1 = [1, 2, 2, 4, 4, 5];
var arr2 = [];
var obj = {};
for (var i = 0; i < arr1.length; i++) {
    if (!obj[arr1[i]]) {
    arr2.push(arr1[i])
    obj[arr1[i]] = 1;
}}
console.log(arr2);
```
## 6. 预解析/作用域/报错
### 6.1 预解析
JavaScript引擎在对JavaScript代码进行解释执行之前，会对JavaScript代码进行预解析，将以关键字var和function开头的语句块提前进行处理  
注意事项：var 仅预处理变量的声明，不包括赋值。
#### 6.1.1 特殊情况
当变量和函数同名时,只会对函数声明进行预解析，变量会被忽略
但是同名的变量和函数，变量会覆盖函数，导致函数无法调用  
通俗来讲就是只要出现同名的函数和变量，优先对函数进行预解析。但没用，变量会覆盖函数，最终只有变量声明语句生效
### 6.2 作用域
#### 6.2.1 全局作用域
直接写在 script 标签或 js 文件中的JS代码，都是全局作用域  
全局对象 window  代表浏览器窗口   
所有创建的变量、函数都是window对象的属性
#### 6.2.2 局部作用域（函数作用域）
在函数内部的是局部作用域，代码只在函数的内部起作用
函数执行完毕，局部作用域销毁
### 6.3 javaScript报错
```javascript
console.error();//错误信息
console.warn();//警告信息
console.info();//普通信息
// throw用于自定义错误信息,后接抛出自定义的错误信息
try {
    if (x=NaN) throw "错误";
} catch (error) {
    console.log(error);
}
```
