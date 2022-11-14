---
title: javaScript基础 03
date: 2022-01-26 15:07:54
updated:
tags:
    - javaScript
categories:
    - 前端知识
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
## 1. 创建元素

1. document.write()

   弊端: 只能在body中添加元素

   ```javascript
   document.write('<div id="box1"></div>')
   ```

2. innerHTML

   弊端：在同级下只能添加一种元素，多个会覆盖；可以采用+=的方式避免覆盖

   ```javascript
   document.getElementById("box1").innerHTML = "<p>1111</p>"
   document.getElementById("box1").innerHTML += "<p>2233</p>"
   ```

3. document.createElement()

   父元素.appendChild(子元素)：给父元素末尾添加子元素

   父元素.insertBefore(子元素, 兄弟元素)：给父元素的兄弟元素前添加子元素

   ```html
   <body>
       <div id="box1"></div>
   </body>
   <script>
       var pp = document.createElement("p");
       var kk = document.createElement("p");
       pp.innerHTML = "ppp"
       kk.innerHTML = "kkk"
       box1.appendChild(pp)//在div末尾插入pp
       box1.insertBefore(kk, pp)//在pp前插入kk
   </script>
   ```

## 2. 事件进阶

### 2.1 监听事件

同名的事件会被覆盖，解决办法就是绑定监听事件

```javascript
document.getElementById("box1").onclick = function () {
    console.log("222");
}
document.getElementById("box1").addEventListener("click", fun1)
function fun1() {
    console.log("111");
}
```

三参数监听事件

addEventListener("事件的类型",事件的处理程序,是否冒泡)；第三个参数true为捕获阶段触发，false为冒泡阶段触发

解绑监听事件

```javascript
document.getElementById("box1").removeEventListener("click", fun1);
```

### 2.2 事件对象

任何事件都有内置对象event;代表的是事件的状态

兼容性写法(ie的锅):

`var event = event || window.event;`

事件源：event.target;

### 2.3 事件冒泡

冒泡：子元素事件执行时会唤起父元素绑定的事件

捕获：由外到内的顺序解析dom结构

如何阻止冒泡（存在兼容性）

- event.stopPropagation(); 谷歌和火狐支持,
- window.event.cancelBubble=true; IE特有的,谷歌支持,火狐不支持

## 3. BOM

浏览器对象模型

### 3.1 弹窗方法

```javascript
prompt("帅吗")    // 弹出输入框；直接点确定返回空字符串;点击取消返回null
alert("真jier帅") // 普通弹框
confirm("同意？") // 弹出确认框；确定返回true;取消返回false
window.onload = function () {
    console.log("页面全部加载完成后执行");
}
```

### 3.2 location对象

Location 对象包含有关当前 URL 的信息

href属性：设置或返回完整的 URL；常用来做页面跳转

```javascript
document.querySelector("button").onclick = function () {
    location.href = "www.baidu.com"
}
```

hash属性 ：设置或返回从井号 (#) 开始的 URL（锚）；常用来实现单页面切换

其他了解

| 属性     | 描述                                          |
| -------- | --------------------------------------------- |
| host     | 设置或返回主机名和当前 URL 的端口号。         |
| hostname | 设置或返回当前 URL 的主机名。                 |
| pathname | 设置或返回当前 URL 的路径部分。               |
| port     | 设置或返回当前 URL 的端口号。                 |
| protocol | 设置或返回当前 URL 的协议。                   |
| search   | 设置或返回从问号 (?) 开始的 URL（查询部分）。 |

### 3.3 history对象

返回上一页面 history.back()

返回下一页面 history.forward()

## 4. 定时器

- 周期定时器

`setInterval(fun,time)` 参数: 函数，时间(以毫秒计时)；返回ID值

停止周期计时器

`clearInteval()` 参数为`setInterval(fun,time)`的ID值，通常将ID值赋给变量

```javascript
var i = 1;
var time1 = setInterval(fun1, 1000)
function fun1() {
    if (i == 10) {
        clearInterval(time1)
    }
    console.log(i++);
}
```

- 一次性计时器

`setTimeout(fun,time)` 参数: 函数，时间(以毫秒计时)；返回ID值

停止

一次性计时器

`clearTimeout()` 参数为`setTimeout(fun,time)`的ID值

```javascript
var time2 = setTimeout(fun2, 11000) function fun2() {
    console.log(123);
    }
```

## 5. js动画

动画的实现: 利用js的事件，配合定时器，或者改变它的样式属性，比如颜色，位置等来完成

```javascript
// div拉长变透明
window.onload = function () {
    var time1 = setInterval(fun1, 10)
    var a = 100;
    var b = 1;
    function fun1() {
        a++
        b -= 0.001
        document.querySelector("div").style.width = a + "px";
        document.querySelector("div").style.opacity = b;
        if (a == 1100 && b == 0) {
            clearInterval(time1)
        }
    }
}// 其余实现原理相同
```
一般把动画进行函数的封装；

### 5.1 元素属性

- offset系列  (element.offsetTop)
offsetLeft: 获取元素距离最左边的距离：  
offsetTop: 获取元素距离最上边的距离:  
  - 1. 如果父元素没有定位，距离浏览器最左侧的距离
  - 2. 如果父元素有定位，距离父元素最左侧的距离  
offsetWidth: 获取元素的宽度，包括border及以内，不包括margin  
offsetHeight: 获取元素的高度，包括border及以内，不包括margin  
offsetParent: 获取元素的定位父级元素：  
  - 如果元素fixed定位，得到null;
  - 元素没有fixed情况下如果元素所有的父级元素都没定位，得到body;
  - 元素没有fixed情况下，父级元素有定位，得到离他最近的有定位的父级元素

- client系列  (element.clientTop)
clientTop和clientLeft：获得上边框和左边框的宽度。  
clientWidth和clientHeight:获取可视范围的宽度高度，即边框内部的，不包括border，包括padding  
当盒子内部存在滚动条时，获得的高度和宽度不包括滚动条。

- scroll系列   (element.scrollTop)
scrollTop和scrollLeft: （父元素的属性）  
获得的是内容卷曲出去的高度和宽度，当滚动条向下拉时，内容往上走，  
获得的就是上面跑出盒子范围的那部分高度。滚动条向右拉同理  

<img src="https://img.recreyed.ml/202211142245453.jpg" alt="scrollTop" style="zoom: 67%;" />
scrollWidth和scrollHeight: （父元素的属性）  
获得元素的实际宽度和高度，在内容没有超出盒子时，获得的是盒子的内部高度和宽度。  
内容超出盒子时获得的是内容实际应有的高度和宽度。  
当盒子内部存在滚动条时，获得的高度和宽度不包括滚动条。

### 5.2 动画属性

- clientX与clientY

clientX 事件属性返回当事件被触发时鼠标指针相对于浏览器页面的水平坐标。

clientY 事件属性返回当事件被触发时鼠标指针向对于浏览器页面的垂直坐标。

- pageX与pageY (pageY = clientY + 页面滚动出去的距离)

pageX/Y：相对于文档边缘,包含滚动条距离

clientX/Y：相对于当前页面且不包含滚动条距离

> 有兼容性问题 从IE9以后才支持

