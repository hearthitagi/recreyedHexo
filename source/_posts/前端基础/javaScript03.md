---
title: javaScript基础 03
tags:
  - javaScript
categories:
  - 代码
abbrlink: 60aad730
date: 2022-01-26 15:07:54
updated:
keywords:
description:
cover:
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
```javascript
// 周期定时器 参数: 函数，时间(以毫秒计时)；返回ID值
setInterval(fun,time)
// 停止周期计时器 参数为setInterval(fun,time)的ID值，通常将ID值赋给变量
clearInteval(time1)
// 
var i = 1;
var time1 = setInterval(fun1, 1000)
function fun1() {
    if (i == 10) {
        clearInterval(time1)
    }
    console.log(i++);
}
```
```javascript
// 一次性计时器 参数: 函数，时间(以毫秒计时)；返回ID值
setTimeout(fun,time)
// 停止一次性计时器 参数为`setTimeout(fun,time)`的ID值
var time2 = setTimeout(fun2, 11000) 
function fun2() {
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

|      属性类型     |     包含内容      |  典型用例  | 示例值（假设元素宽 200px，边框 2px，滚动条 17px） |
| :--------------: | :--------------: | :----------------: | :-----------------: |
|   offsetWidth    | 内容 + padding + 边框 + 滚动条 | 获取元素布局总宽度 | 200 + 2*2 + 17 = 221px |
|  clientWidth      | 内容 + padding（不含滚动条、边框） |  获取可视区域宽度  | 200 - 17 = 183px  |
|     scrollWidth  | 内容的完整宽度（含溢出部分） |    检测内容是否溢出   | 若内容未溢出，等于 clientWidth  |
|     scrollTop    | 垂直滚动距离 |  监听滚动事件  |   0（未滚动时）    |

### 5.2 动画属性

- clientX与clientY  
  clientX 事件属性返回当事件被触发时鼠标指针相对于浏览器页面的水平坐标。  
  clientY 事件属性返回当事件被触发时鼠标指针向对于浏览器页面的垂直坐标。

- pageX与pageY (pageY = clientY + 页面滚动出去的距离)  
  pageX/Y：相对于文档边缘,包含滚动条距离  
  clientX/Y：相对于当前页面且不包含滚动条距离

