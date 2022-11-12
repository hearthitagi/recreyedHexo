---
title: jquery基础 02
date: 2022-01-26 15:10:57
updated:
tags:
    - jquery
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
## 1. 事件机制

### 1.1 事件注册

`bind()`方法用于向被选元素添加一个或多个事件处理程序

`on()`方法只能添加一个事件（不好用）

```js
$(".box1").bind({
    mouseover() {
        $(this).css("background-color", "blue");
    },
    mouseout() {
        $(this).css("background-color", "black");
    }
})
$(".box1").on("click",function(){ console.log('111'); });
```

### 1.2 事件对象event

event对象有以下常用属性

- type：事件类型；which：触发该事件的鼠标按钮或键盘的键；
- target：触发事件的DOM元素；
- pageX/Y：事件触发时鼠标相对页面左上角的水平/垂直坐标
- clientX/Y：事件触发时鼠标相对于窗口的水平，垂直坐标

```js
$('.box2').click(function (event) {
    console.log(event);
    console.log(event.target);
})
```

### 1.3 jQuery.each()方法

用于遍历指定的对象和数组

```js
var arr = [10, 20, 30, 40];
$.each(arr, function (index, value) {
    console.log(`我是第${index + 1}元素,值是${value}`);
})
```

## 2. HTML的设置与捕获

### 2.1 html()

返回或设置所选元素的html内容；会解析富文本

`$('.box').html('<b>Hello world!</b>');`

`$('.box').html();` // `<b>Hello world!</b>`

### 2.2 text()

返回或设置所选元素的文本内容；

`$('.box').text();` // Hello world!

`$('.box').text('hello vivy');`

### 2.3 val()

返回或设置表单字段的值

`$('input').val();` // 获取value属性的值

`$('input').val('设置的value属性的值');`

> 不常用警告：上述三个方法的都有一个可选参数：回调函数，回调函数有两个参数：被选元素列表中当前元素的下标，以及原始（旧的）值；返回值为上述三个方法想要设置的字符串；

### 2.4 attr()、prop()

1. 属性值为布尔类型的属性，需要使用prop();
2. 自定义属性需要使用attr();
3. 其他属性两个通用

## 3. HTML的页面尺寸操作

- `width()` 和 `height()` 方法

设置或返回元素的宽度/高度（不包括内边距、边框或外边距）

- `innerWidth()` 和 `innerHeight()` 方法

设置或返回元素的宽度（包括内边距）

- `outerWidth()` 和 `outerHeight()` 方法

设置或返回元素的宽度（包括内边距和边框）

- `scrollTop()` 和 `scrollLeft()` 方法

设置或返回元素被滚动条卷曲的高度

```js
$("#div1").width(20);
$("#div1").innerWidth(30);
$("#div1").outerWidth(32);
$("#div1").scrollTop(0);
```

## 4. 添加/删除元素

- `append()`和`prepend()` 方法

`append()`：添加到被选元素子元素的结尾

`prepend()`：添加到被选元素子元素的开头

- `after()`和`before()`方法

`after()`：添加到被选元素的后面

`before()`：添加到被选元素的前面

- `remove()`和`empty()`方法

`remove()`：删除被选元素及其子元素

`empty()`：清空被选元素，保留本身

## 5. 插件的引用

`jquery.color.js`插件，引入后能支持animate动画改变颜色(原生jQuery不支持动画中颜色的改变)

`jquery.lazyload.js`插件，懒加载；引入后图片在浏览器可视区域外，图片不会被载入，直到用户将页面滚动到它们所在的位置

```js
//图片路径属性要设置为data-original
<img class="lazy" data-original="./image/img1.jpg" alt="">
$('img').lazyload({
    // threshold: 提前开始加载高度. .
    threshold: 200,
    //failurelimit: 一次次加载图片的张数(图片排序混乱时使用)
    failurelimit: 10,
    // failure_ limit:同failurelimit
    failure_limit: 10,
    // event: 设置何种事件触发时才加载，默认scroll
    event: 'click',
    // effect:使用何种载入效果
    effect: "fadeIn",
    // container: 对某容器中的图片实现效果
    container: $("#container"),
    // data_ attribute: 用于设置lazyload 操作的自定义属性(data-后面的属性名)
    data_attribute: "attr",
    // skip_ invisible: 是否不加载不可见图片。 true不加载， false 加载.
    skip_invisible: false,
    // appear:用于在图片加载之前到显示图片之间的处理函数，一般用于展示加载动画.
    appear: function () { },
    // load:用于图片加载完毕之后执行的函数.
    load: function () { },
    // placeholder:设置占位图片路径
    placeholder: "img/lazy.gif",
    // effectspeed: 设置动画持续时长，单位毫秒
    effectspeed: 1000,
});
```

`jquery.ui.js`插件，引入后可以方便的使用一些用户界面交互、特效、小部件。

要配合`jquery-ui.min.css`一起食用

[API文档](https://www.jqueryui.org.cn/api/43.html)

- [特效（Effects）](https://www.jqueryui.org.cn/api/43.html)
- [小部件（Widgets）](https://www.jqueryui.org.cn/api/52.html)

`echarts.min.js`插件，引入后可以快捷绘制各种图标

[API文档](https://echarts.apache.org/zh/option.html#title)

[示例](https://echarts.apache.org/examples/zh/index.html)

