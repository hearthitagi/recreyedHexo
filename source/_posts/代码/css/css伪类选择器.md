---
title: css伪类选择器
tags:
  - css
categories:
  - 代码
description:
cover:
abbrlink: ebd9ab17
date: 2022-12-18 18:41:16
updated:
keywords:


---
## `:has`选择器
选择某元素下，符合条件的元素。例如
```css
div:has(.box) {
    color: blue;
}
```
选择包含类名为`.box`的div元素
```html
<div>
    <P class='box'>我是蓝色的</P>
    <P>我也是</P>
</div>
```
## `:is`选择器
![alt](https://lsky.kissshot.site/img/2025/02/07/67a55c3f31485.gif)  

包装共性选择器。例如
```css
:is(div, p) :is(span, i) {
    color: blue;
}
```
选择div和p标签下的span和i标签
```html
<div><i>我们都被选中了</i></div>
<p><i>我们都被选中了</i></p>
<div><span>我们都被选中了</span></div>
<p><span>我们都被选中了</span></p>
```
**注意:不支持选中伪元素，优先级为选择器本身的优先级**
## `:where`选择器
与`is`选择器相同，区别在于`:where`选择器的优先级总是0。
## `:not`选择器
匹配不符合指定选择器的元素。例如
```css
div:not(.box) {
    color: blue;
}
```
选择class不是.box的div元素
```html
<div class="box">我没被选中</div>

<div>我们被选中了</div>
<div class="yi">我们被选中了</div>
```
**注意:未指定`:not`前边的宿主选择器，`:not`会选中body；`:not`不能嵌套**


参考文章：[浅谈逻辑选择器](https://www.cnblogs.com/coco1s/p/16283836.html)