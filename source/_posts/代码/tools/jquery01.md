---
title: jquery基础 01
tags:
  - jquery
categories:
  - 代码
date: 2022-01-26 15:10:34
updated: 2022-01-26 15:10:34
cover:
---
jQuery 是一个着重简化 DOM 操作，AJAX 调用和事件 (en-US)处理的 JavaScript 库。一些前端 JavaScript 开发者经常会用到它。

主要解决：复杂DOM操作、兼容性问题

## 1. 安装

- 线上CDN方式引入

> jsDelivr CDN
>
> `<script src="https://npm.elemecdn.com/jquery@3.5.1/dist/jquery.min.js"></script>`
>
> CDNJS CDN
>
> `<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>`
>
> Google CDN
>
> `<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>`
>
> Microsoft CDN
>
> `<script src="https://ajax.aspnetcdn.com/ajax/jQuery/jquery-3.5.1.min.js"></script>`

- 下载引入

- jQuery和DOM的转化

```js
//jQuery转DOM
$('.box')[0];//伪数组中的一项
// DOM转jQuery
let div2 = document.querySelector('.box2');
$(div2);
```

## 2. 入口函数

jQuery和DOM入口函数的区别

- 写法不同，jQuery的写法更简单
- jQuery入口函数可以写多个；
- 所有标签(DOM)都加载之后就会执行，不会等到所有资源文件加载完成后才执行

入口函数的写法

```js
$(function(){ jQuery代码 })
//JavaScript中是window.onload
window.onload = function () { js代码 }
```

## 3. 选择器

| 名称       | 用法           | 描述                                           |
| ---------- | -------------- | ---------------------------------------------- |
| 标签选择器 | $("div")       | 获取同一类标签的所有元素                       |
| ID选择器   | $("#id")       | 获取指定ID的元素                               |
| 类选择器   | $(".class")    | 获取指定class名的元素                          |
| 并集选择器 | $("div,p")     | 使用逗号分隔，获取所有的div，p元素             |
| 交集选择器 | $("div.class") | 中间没有空格，获取即是div又是类名为class的元素 |
| 子代选择器 | $("ul>li")     | 获取ul下第一层（子代）li元素                   |
| 后代选择器 | $("ul li")     | 获取ul下所有（后代）li元素                     |

### 3.1 过滤选择器

| 方法         | 用法          | 描述                                                      |
| ------------ | ------------- | --------------------------------------------------------- |
| :eq（index） | $("li:eq(2)") | 获取到的li元素中，选择索引号为2的元素，索引号index从0开始 |
| :odd         | $("li:odd")   | 获取到的li元素中，选择索引号为奇数的元素                  |
| :even        | $("li:even")  | 获取到的li元素中，选择索引号为偶数的元素                  |

### 3.2 筛选选择器

| 方法               | 用法                       | 描述                            |
| ------------------ | -------------------------- | ------------------------------- |
| children(selector) | $("ul").children("li")     | 相当于子代选择器                |
| find(selector)     | $("ul").find("li")         | 相当于后代选择器                |
| siblings(selector) | $("#first").siblings("li") | 获取兄弟节点，不包括自身        |
| parent()           | $("#first").parent()       | 获取父元素                      |
| eq(index)          | $("li").eq(2)              | 相当于$("li:eq(2)")             |
| next()             | $("li").next()             | 获取下一个兄弟元素              |
| prev()             | $("li").prev()             | 获取上一个兄弟元素              |
| index()            | $("li").index()            | 获取当前位置（索引）            |
| not(selector)      | $("li").not(".class")      | 获取不带有类名class的所有li元素 |

## 4. 事件

事件同javaScript，没有"on"

```js
$("p").click(function(){ 
// 动作触发后执行的代码 
    $(this).css("background-color","#ffffff");//this指向该元素 
});
```

## 5. css样式

- 设置元素的css属性

```js
$("p").css("background-color");//返回指定css属性的值
$("p").css("background-color","yellow");//设置元素的一个css属性
$("p").css({"background-color":"yellow","font-size":"200%"});//设置元素的多个css
```

## 6.  css类

```js
$("p").addClass('para1');//为元素添加指定的css类名
$("p").removeClass('para1');//移除元素指定的css类名
$("p").toggleClass('para1');//切换元素指定类名的添加/删除状态
```

## 7. jquary动画

### 7.1 隐藏显示

hide() 和 show() 方法用来隐藏和显示元素

`$("p").hide(); `  `$("p").show();` 

toggle() 方法来切换隐藏/显示状态

`$("p").show();`

### 7.2 淡入淡出

fadeIn() 和 fadeOut() 方法用于淡入/淡出元素

`$("p").fadeIn(); `  `$("p").fadeOut();`

fadeToggle() 方法用来切换淡入/淡出效果

` fadeToggle();`

### 7.3 滑入滑出

slideDown() 

### 7.4 自定义动画

animate() 方法用于创建自定义动画；有三个参数。

- 第一个参数是一个对象，属性与属性值是元素的目标css样式
- 第二个参数是动画周期，单位为ms
- 第三个参数是回调函数，在动画执行完后调用

```javascript
$('#box').mouseenter(function () {
    $('#box').animate({
        height: '100px'
    }, 2000, () => {
        console.log('动画执行完毕');
    })
})
```

