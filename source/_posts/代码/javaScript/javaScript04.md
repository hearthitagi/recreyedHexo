---
title: javaScript基础 04
date: 2022-01-26 15:08:16
updated:
tags:
    - javaScript
categories:
    - 代码
abbrlink: fece4293
keywords:
description:
top_img:
comments:
cover:
toc:
toc_number:
toc_style_simple:
copyright:
copyright_author:
copyright_author_href:
copyright_url:
copyright_info:
mathjax:
katex:
aplayer:
highlight_shrink:
aside:
--- 
## 1. 面向对象

这是一种编程思想，需要多加练习才能掌握，有点只可意会不可言传的味道。

我的理解是面向对象就是无论要写什么程序，都可以通过封装一个抽象的集合，通过实例化这个抽象的集合来完成我们需要的工作。

打个比方，我们需要写一个制冷的程序。这时可以封装一个抽象的冰箱集合，构建这个抽象冰箱的时候给它一些属性和方法，其中就有制冷的方法，然后通过实例化这个抽象的冰箱集合，调用它制冷的方法来实现我们最初制冷的目的。

面向过程其实就是需要什么就直接写什么，还是比如我们需要一个制冷的程序，就需要一步一步的写通电，电能使蒸发器工作，蒸发器使制冷剂汽化吸热，制冷。如此以来实现这个制冷的程序。而在面向对象的编程中，这些都会被封装在一个对象的方法中。

面向对象在封装的过程中使比较麻烦的，但是优点是编程灵活，代码可复用，高度模块化，易于维护和开发。

### 1.1 三大特征

封装：需要的属性方法都在一个抽象对象中，用到时只需调用即可

继承：新建的抽象对象集合可以继承已有抽象集合的属性和方法

多态：一个抽象集合可以有各种方法

### 1.2 基本和引用数据类型

基本数据类型存储在栈中，占用空间固定，内存栈会在基本数据类型引用结束后就会销毁

引用数据类型即对象，存储在堆中，占用空间不固定，其属性和方法都是以地址的形式存储在栈中，需要引用时也是先访问地址，再通过地址访问堆内存中的数据。只有在一个对象没有任何变量引用它时，才会被系统的垃圾回收机制回收。

### 1.3 构造函数和实例化对象

构造函数是实例化对象时用到的一个函数，通过它可以把抽象的对象集合实例化一个具体的对象。

大致的过程如下

```javascript
function Phone(brand, color) {
    this.brand = brand;
    this.color = color;
}
var phone4 = new Phone("huawei", "black"); //实例化对象
```

#### 1.3.1 constructor属性

构造函数实例化对象的constructor属性指向的是构造函数本身

### 1.4 解决内存浪费问题

构造函数每次实例化时都会开辟新的空间，即使实例化的属性的方法相同，所以就会存在内存浪费问题

#### 1.4.1 原型

在Javascript 中，每一个构造函数都有一个 prototype 属性，指向另一个对象。这个对象的所有属性和方法，都会被构造函数的实例继承

所以可以把需要共享的属性和方法都定义在prototype对象上

```javascript
function Student(name, age) {
    this.name = name;
    this.age = age;
}
Student.prototype.study = function () {
    console.log("学习");
}
var student1 = new Student("张三", "18");
```

这时所有实例的study方法都指向同一个内存地址

原型的优点：避免内存浪费，数据可以共享

#### 1.4.2 实例化对象的查找规则

先在自己身上找，找到即返回，自己身上找不到，则沿着原型链（构造函数的prototype对象）向上查找，找到即返回，如果一直到原型链的末端还没有找到，则返回 undefined

#### 1.4.3 原型链指向

每个构造函数都有一个原型对象prototype，原型对象可以自定义。

每个对象都有`__proto__`属性它指向的是构造函数的原型对象

每个对象都有`__proto__`属性，原型对象的`__proto__`属性指向上一级(父级)的构造函数的原型对象；

## 2. 继承

### 2.1 原型继承

因为原型的指向可以改变，所以让子类的原型指向父类的实例化对象,就可以实现子类继承父类的属性和方法

```javascript
function Person(name) {
    this.name = name;
}
function Student(cloth) {
    this.cloth = cloth;
}
Student.prototype = new Person("张三");
    
var zs = new Student("校服");
console.log(zs.name);//继承了父类Person的name
```

### 2.2 构造函数继承

#### 2.2.1 call、apply、bind

- call()方法可以进行普通函数的调用
- call()方法可以改变this的指向，如果没有参数，this指向window
- call()方法可以改变this的指向，如果有一个参数，this指向该参数
- call()方法可以改变this的指向，如果有多个参数，this指向第一个参数，剩下的是个参数列表

这三个都是调用函数的方法，除了下述区别外，其余用法相同

1. call和apply都是立即调用，bind返回的是一个函数，需要再加()来执行调用
2. call第一个参数后是参数列表。apply是一个参数列表的数组

```javascript
function Parents(fang, money) {
    this.fang = fang;
    this.money = money;
}
function Child(che, fang, money) {
    this.che = che;
    Parents.call(this, fang, money);
}
var lisi = new Child("特斯拉", "房子", "钱");
console.log(lisi);//lisi继承Parents的fang和money属性
```

### 2.3 拷贝继承

#### 2.3.1 浅拷贝、深拷贝

浅拷贝：只有栈内存中的地址发生变化，但不同的地址仍然引用堆内存中相同的数据

```javascript
var list = [1, 2, 3, 4]
var copy = list;
copy.push(5);
console.log(list);//1，2，3，4，5
console.log(copy);//1，2，3，4，5
```

深拷贝：栈内存中的地址和堆内存中的数据都会复制一份新的存储在相应的栈和堆中

深拷贝有四种方法：

数组深拷贝  
```javascript
// for循环
var list1 = [4, 3, 2, 1];
var list2 = [];
for (var i = 0; i < list1.length; i++) {
  list2.push(list1[i]);
}
// slice切割
var list3 = [9, 8, 7, 6]
var list4 = list3.slice(0);
// concat拼接
var list5 = [4, 5, 6, 7]
var list6 = list5.concat();
```
对象深拷贝
```javascript
// for...in遍历
var obj = {
    name: "jerry",
    age: 10
};
var obj2 = {};
for (var key in obj) {
    ok[key] = obj[key];
}
```

#### 2.3.2 拷贝继承

把父对象的的属性、属性值循环遍历给另一个子对象

## 3. 闭包与递归

### 3.1 闭包

一个函数和对其周围状态的引用捆绑在一起，这样的组合就是闭包。也就是说，闭包让你可以在一个内层函数中访问到其外层函数的作用域。在 JavaScript 中，每当创建一个函数，闭包就会在函数创建的同时被创建出来。

```javascript
function num(m, n) {
    var num = Math.floor(Math.random() * (n - m + 1) + m);
    return function () {
        console.log(num);
        }
}
num(1,9)();
num(1,9)();
//返回为同一个值，调用num函数返回的匿名函数，匿名函数只有控制台打印num的功能，而num的值在num(m.n)上已经决定了，并存储在num下的块作用域中。
```

### 3.2 递归

返回时调用自己

```javascript
//斐波那契递归
function fib(n) {
    if (n == 1 || n == 2) {
    return 1;
    }
    return fib(n - 2) + fib(n - 1);
}
fib(10);
```


