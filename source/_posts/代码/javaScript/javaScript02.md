---
title: javaScript基础 02
tags:
  - javaScript
categories:
  - 代码
description:
  - 内置对象(Math/Date/Array/String)
  - DOM操作
  - DOM属性与事件
  - 节点
abbrlink: 17ade7a6
date: 2022-01-26 15:07:29
updated:
keywords:
cover:
---
## 1. 内置对象
JavaScript中的对象分为4种：内置对象、自定义对象、浏览器对象、DOM对象。
### 1.1 Math
`Math.PI`  圆周率
常用方法
```javascript
Math.random()  //生成随机数
Math.floor()   //向下取整
Math.ceil()    //向上取整
Math.round()   //取整，四舍五入
Math.abs()     //绝对值
Math.max()     //最大值
Math.min()     //最小值
Math.sin()     //正弦
Math.cos()     //余弦
Math.pow()     //求指数次幂
Math.sqrt()    //求平方根
```
### 1.2 Date
Date()是构造函数，想要使用Date方法，必须实例化new一个日期对象
```javascript
var date = new Date();
date.getTime()  // 获取1970年1月1日至今的毫秒数 (没什么用)
date.getMilliseconds() //返回现在时间的毫秒数
date.getSeconds()  // 返回现在时间的秒数(0-59)
date.getMinutes()  // 返回现在时间的分数(0-59)
date.getHours()    // 返回现在时间的小时(0-23)
date.getDay()      // 返回星期几 0周日 6周六
date.getDate()     // 返回当前月的第几天
date.getMonth()    // 返回月份(0-11),用的时候+1
date.getFullYear() // 返回4位的年份
```
### 1.3 Number
```javascript
var a = 1.24325;
a.toFixed(3);  //保留几位小数
```
### 1.4 Array
```javascript
var arr = [1, 3, 4, 6, 8];
// 基本方法
Array.isArray(arr) //判断是否为数组
arr.reverse()      //翻转数组
// 数组增删方法
arr2.push(60, 70, 80);    //从最后添加一个或多个值
arr2.pop();               //从最后删除一个值
arr2.unshift(11, 22, 33); //从开始添加一个或多个值
arr2.shift();             //从开头删除一个值
// 位置方法
arr.indexOf(3);    //返回数组中指定元素的第一个值的索引，不存在返回-1
arr.lastIndexOf(7) //返回数组中指定元素的最后一个值的索引，不存在返回-1 
// 数组转化字符串
arr.join("")       //数组转化为字符串，以参数(String类型)分割；无参数时默认以,分割
```
#### 1.4.1 排序方法
sort()  
没有指定参数
```javascript
var arr = [1, 3, 4, 6, 8];
arr.sort() // 默认把元素转换为String后按ASCII码排序，最后String转回来
```
指定参数
- 如果compareFunction(a,b)返回值小于0，那么a会被排到b之前
- 如果compareFunction(a,b)返回值等于0，a和b的相对位置不变，不兼容所有浏览器
- 如果compareFunction(a,b)返回值大于0，b会被排列到a之前。

```javascript
arr.sort(function compareFunction(a, b) {
  if (condition) {
    return -1; // 如果满足条件condition,那么a排到b前面
  }
  return 0;
})
```
要比较数字而非字符串，可以直接返回**a-b**，例如下面的函数将会将数组升序排列
```javascript
arr.sort(function compareFunction(a, b) {
    return a - b;
})
```
#### 1.4.2 拼接与截取
concat()  
把参数拼接到当前数组、 或者用于连接两个或多个数组
```javascript
var arr1 = ["zs", "ls"]
var arr2 = arr1.concat("ww")
```
slice(start,end)  
- 索引从start开始截取元素，到end结束，`[start,end)`，返回新数组
- 不会改变原数组

```javascript
var arr2 = [1,2,3,4,5];
arr2.slice(0,3) //取[1,2,3]
```
splice(start,length)  
- 索引从start开始截取元素，截取length个，返回新数组
- 会改变元素的数组

```javascript
var arr2 = [1,2,3,4,5];
```
#### 1.4.4 迭代与过滤
forEach()
用于调用数组的每个元素，并将元素传递给回调函数；传一个参数 value是数组值，两个参数 index是索引号
```javascript
var arr3 = [1, 2, 3, 4, 5]
arr3.forEach(function (value,index) {
   console.log(value);
   console.log(index);
});
```
every(): 判断数组中元素是否全部满足回调函数，如果是，返回true；否则为false
```javascript
arr3.every(function (value) { return value<3; });
```
some(): 判断数组中是否有元素满足回调函数，如果是，返回true；否则为false
```javascript
arr3.some(function (value) { return value<3; });
```
filter(): 根据指定条件过滤元素,返回新数组
```javascript
arr3.filter(function (value) { return value>3; });
```
map(): 根据数学运算，返回新数组
```javascript
arr3.map(function (value) { return Math.pow(value,2); });
```
#### 1.4.5 清空数组
1. 推荐  arr = []
2. arr.length = 0
3. arr.splice(0, arr.length)
### 1.5 String
```javascript
var str = 'abc';
str = 'hello';
```
> 当重新给str赋值的时候，常量'abc'不会被修改，依然在内存中
>
> 重新给字符串赋值，会重新在内存中开辟空间，这个特点就是字符串的不可变
>
> 由于字符串的不可变，在大量拼接字符串的时候会有效率问题

#### 1.5.1 取值方法
```javascript
charAt(0)     //获取指定位置处字符
str[0]        //HTML5，IE8+支持 和charAt()等效
```
#### 1.5.2 操作方法
```javascript
slice(start, end)     //从索引start开始，到end结束；[start,end)
substring(start, end) //同slice()
substr(start, length) //从索引start开始，截取length个字符
indexOf()             //返回数组中指定元素的第一个值的索引，不存在返回-1
lastIndexOf()         //返回数组中指定元素的最后一个值的索引，不存在返回-1
trim()                //去除字符串前后的空格
toUpperCase()         //转换成大写
toLowerCase()         //转换成小写
search("str")         //检索字符串中指定的子字符串，返回子字符串的起始位置
replace(old, new)     //替换字符串 new替换old; 只替换找到的第一个
split("")             //字符串转化成数组，以参数分割， 无参时字符串全切割
```
## 2. DOM操作
### 2.1 获取DOM元素
通过id获取DOM元素;获取的是一个具体的DOM元素

`document.getElementById("div1")`

通过选择器获取单个元素;获取的是同选择器的**第一个元素**

`document.querySelector(".box")`
> 以下方法获取的都是由元素构成的伪数组，使用时要加上**索引号**
>
> 伪数组有length属性，可以遍历；伪数组没有普通数组的内置方法

`document.getElementsByClassName("box")[0]`通过类名获取元素

`document.getElementsByTagName("h1")[0]`通过标签名获取元素

`document.getElementsByName("username")[0]`通过name名获取元素

`document.querySelectorAll(".box")[0]`通过选择器获取所有元素
### 2.2 事件触发
事件三要素: 事件源、事件类型(触发方式)、事件处理程序

内部书写
```html
<button onclick="alert(999)">点击弹框</button>
```
行内触发方法: 写一个js方法，行内调用
```html
<button onclick=fn1()>点击弹框</button>
<script>
function fn1() { alert(888) }
</script>
```
html外书写
```html
<button class="btn1">点击弹框</button>
<script>
var btn1 = document.getElementsByClassName("btn1")[0]
btn1.onclick = function () { alert(666) }
</script>
```
### 2.3 获取/修改元素的属性
```html
<style>
.div1 { width: 200px; height: 100px; }
.div1 { width: 300px; height: 200px;}
</style>
<div class="div1">222</div>
<script>
var div1 = document.getElementsByClassName("div1")[0]
div1.onclick = function () {
   this.style.width= "300px";
   this.style.height = "200px";
   // 也可以修改类名
   this.className = "div2";
}
</script>
```
表单默认属性也可以修改

- value 用于大部分表单元素的内容获取(option除外)
- type 可以获取input标签的类型(输入框或复选框等)
- disabled 禁用属性
- checked 复选框选中属性
- selected 下拉菜单选中属性 

## 3. DOM属性操作与事件
### 3.1 阻止a链跳转
a标签绑定的onclick事件返回值为false
```javascript
link.onclick = function(){ return false }
```
### 3.2 DOM事件
#### 鼠标事件  
获取/失去焦点`onfocus/onblur`  
鼠标双击`ondblclick`  
鼠标移入/移出`onmouseover/onmouseout`  
鼠标进入/离开`onmouseenter/onmouseleave`

> 区别: `onmouseenter/onmouseleave`强调进入；不支持冒泡
>
> 冒泡:子元素事件执行，会递归执行所有父元素的触发事件
>

#### 键盘事件  
键盘按下/抬起`onkeydown/onkeyup`  
#### 浏览器事件  
页面加载完成后执行`window.onload`  
滚浏览器滚动条执行`window.onscroll`
### 3.3 文本内容属性
```javascript
// 只获取文本内容(包括css);不会解析标签
document.getElementsByTagName("div")[0].innerText
// 只获取文本内容(不包括css);不会解析标签
document.getElementsByTagName("div")[0].textContent
// 获取标签内容;会解析标签
document.getElementsByTagName("div")[0].innerHTML
```
### 3.4 元素的属性操作
以下方法均可对自定义属性和原始属性操作
```javascript
//获取元素属性
document.getElementById("box1").getAttribute("mytest")
//设置属性
document.getElementById("box1").setAttribute("id", "box2")
//移除属性
document.getElementsByTagName("div")[1].removeAttribute("id")
```
3.5 元素的样式设置
```javascript
//<常用>对象.style
document.getElementById("b1").style = "color:red";
//对象.setAttribute("style","样式")
document.getElementById("b1").setAttribute("style", "color: red")
//对象.style.setProperty("CSS属性","CSS属性值")
document.getElementById("box1").style.setProperty("background-color","red")
//对象.style.cssText
document.getElementById("box1").style.cssText = "background-color:red; width:80px"

//<常用>对象.className
document.getElementById("b1").className = "box2";
//<常用>对象.setAttribute("class","class名")
document.getElementById("b1").setAttribute("class", "box2");
```
## 4. 节点

HTML 文档中的所有内容都是节点：
- 整个文档是一个文档节点 document
- 每个 HTML 元素是元素节点
- HTML 元素内的文本是文本节点
- 每个 HTML 属性是属性节点
- 注释是注释节点

### 节点的操作

`document.createElement('tagName')`  
创建节点

`parentNode.appendChild(childNode) `  
添加节点，将一个节点添加到指定父节点的子节点列表末尾。类似于 CSS 里面的 after 伪元素。

`parentNode.insertBefore(newChildNode, childNode)`  
将一个节点添加到父节点的指定子节点前面。类似于 CSS 里面的 before 伪元素。

`parentNode.removeChild(child)`  
删除节点，从 DOM 中删除一个子节点，返回删除的节点。

`node.cloneNode(flase)`  
复制节点，返回调用该方法的节点的一个副本。参数为false不复制子节点，参数为true复制子节点。
