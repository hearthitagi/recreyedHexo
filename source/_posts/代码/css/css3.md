---
title: css3基础
tags:
  - css
categories:
  - 代码
description:
  - 新增选择器
  - 新增样式
  - 渐变过渡
  - 转换
  - 动画
  - 弹性容器
  - 响应式布局
  - less
copyright_url:
abbrlink: 3a395d0a
date: 2022-01-26 15:04:45
updated: 2022-01-28 15:33:45
keywords:
top_img:
comments:
cover:
toc:
toc_number:
toc_style_simple:
copyright:
copyright_author:
copyright_author_href:
copyright_info:
mathjax:
katex:
aplayer:
highlight_shrink:
aside:
---
## 1. 新增选择器
### 1.1 属性选择器
可以自定义属性
```css
/* 选择所有带有class属性元素 */
[class] {}
/* 选择所有使用class=box的元素 */
[class="box"] {}
/* 选择name属性以zh-为开头的所有元素 */
[name|="zh"] {}
/* 选择每一个href属性的值以http开头的元素 */
[href^="http"] {}
/* 选择每一个href属性的值以com结尾的元素 */
[href$="com"] {}
/* 选择每一个href属性的值包含字符串www的元素 */
[href*="www"] {}
```
### 1.2 伪元素选择器
```css
/* ::before在每个<p>元素之前插入内容 */
p::before {}
/* ::after在每个<p>元素之后插入内容 */
p::after {}
/* p::first-letter选择每一个<P>元素的第一个字母或者第一个汉字 */
/* p::first-line择每一个<P>元素的第一行 */
```
### 1.3 伪类选择器
```css
/* 选择p元素所属父元素第二个子元素,且第二个子元素也是p标签 */
p:nth-child(2) {}
/* 选择p元素所属父元素的倒数第二个子元素,且第二个子元素也是p标签 */
p:nth-last-child(2) {}
/* 选择p元素所属父元素的第一个子元素,且第一个子元素也是p标签 */
p:first-child {}
/* 选择p元素所属父元素的最后一个子元素,且第一个子元素也是p标签 */
p:last-child {}
/* 选择p元素的兄弟元素 */
p:nth-of-type(2) {}
```
## 2. 新增样式
### 2.1 颜色标识
```css
/* hsl(色调(0-360)，饱和度(0-100%)，明度(0-100%)) */
background-color: hsl(281, 100%, 50%);
background-color: rgba(10, 100, 200,0.5);/* 红、绿、蓝、透明度 */
```
### 2.2 文本效果
```css
/* 强制文本同一行显示 */
white-space: nowrap;
/* 溢出内容隐藏 */
overflow: hidden;
/* 隐藏的内容显示为省略号 */
text-overflow: ellipsis;
/* 水平阴影尺寸、垂直阴影属性、阴影的模糊程度、阴影的颜色 */
text-shadow: 10px 20px 5px hsl(120, 100%, 80%);

/* 滚动条 */
overflow: scroll; /* 超出显示滚动条 */
overflow: auto; /* 超出显示滚动条，不超出不显示 */

/* 光标 默认default 拖动move 文本text */
cursor: pointer; /* 小手 */

/* 轮廓：获取焦点时，四周显示的线 */
outline: 0;
```
### 2.3 盒子效果
```css
/* 盒子阴影: 水平阴影尺寸、垂直阴影尺寸、阴影的模糊程度、颜色 */
box-shadow: 20px 20px 20px violet;
/* 怪异盒模型：边框，内边距不影响元素尺寸*/
box-sizing: border-box;
/* 边框图片 80为边框尺寸 */
border-image: url(images/violet.jpg) 80 round;
/* 边框透明 */
border-color: transparent;
/* 按钮禁用 */
<button disabled></button>
```
## 3. 渐变过渡
### 3.1 渐变
```css
/* 渐变：两个及以上的颜色之间的平稳过渡 */
/* 线性渐变: 默认从上到下 */
background-image: linear-gradient(to top,violet,blue);
/* 径向渐变：由内向外 默认circle、椭圆 ellipse*/
background-image: radial-gradient(ellipse,violet,blue);
/* 背景图占内边距和边框 */
background-origin: padding-box;
background-origin: border-box;
/* 背景色占内边距和边框 */
background-clip: padding-box;
background-clip: border-box;
```
### 3.2 过渡
```css
/* 过渡属性名 */
transition-property: background-color;
/* 过渡周期 */
transition-duration: 0.5s;
/* 过度延迟 */
transition-delay: 1ms;
/* 过渡时间曲线 */
transition-timing-function: linear;
/* 过渡总写：属性、周期、延迟、时间曲线 */
transition: background-color 0.5s 1ms linear;
/* 兼容浏览器写法 */
-webkit-transition: ;/* webkit内核浏览器 */
-moz-transition: ;/* 火狐 */
-o-transition: ;/* 欧朋 */
-ms-transition: ;/* IE */
```
## 4. 转换
### 4.1 旋转
```css
/* 设置中心 */
transform-origin: left top;
/* 旋转 rotate(度数deg): 默认顺时针，负逆时针、盒子正中心旋转  */	transform: rotate(-30deg);
```
### 4.2 平移
```css
/* 平移：水平，垂直 */
transform: translate(80px,-30px);
```
### 4.3 缩放和拉伸
```css
/* 缩放拉伸: 倍数*/
transform: scale(0.8,0.7);
```
### 4.4 扭曲
```css
/* 扭曲:水平、垂直 */
transform: skew(30deg,0);
```
## 5. 动画
动画属性需要先创建再使用
### 5.1 创建
```css
/* 创建 */
/* 动画名属性 */
animation-name: firstAnimation;
/* 动画周期 */
animation-duration: 5s;
/* 动画延迟 */
animation-delay: 0;
/* 动画时间曲线 匀速 linner、默认 慢快慢过渡 ease*/animation-timing-function: linear;
/* 动画次数  无穷 infinite*/
animation-iteration-count: infinite;
/* 动画暂停  默认running*/
animation-play-state: paused;
/* 综合设置 */
animation: firstAnimation 4s linear infinite;
```
### 5.2 设置
```css
@keyframes firstAnimation {
/* 开始 */
from {background-color: violet;}
/* 结束 */
to {background-color: blue;}
/* 百分比 */
0% {background-color: violet;}
100% {background-color: hotpink;}
}
```
动画属性有需求的话也需要浏览器兼容写法
## 6. 弹性容器
当子元素宽度和大于父元素时，不会超出父元素，子元素宽度弹性变小
```css
display: flex;
/* 容器主轴排列方向 从左到右row、从右到左row-reverse、从上到下column、从下到上column-reverse*/
flex-direction: row;
/* 设置主轴是否换行 换行wrap、不换行nowrap*/
flex-wrap: wrap;
/* flex-direction、flex-wrap的简写*/
flex-flow: row wrap;
/* 主轴对齐方式 flex-start 左对齐、flex-end 右对齐*/
justify-content: space-between;
/* 在交叉轴(主轴的垂直方向)上对齐方式 */
align-items: center;
```
## 7. 响应式布局
### 7.1 viewport
响应式布局：根据不同的设备展示不一样的网页布局
### 7.2 媒体查询

```css
/* 使用 @media 查询来制作响应式设计 */
@media only screen and (max-width:700px) and (min-width:400px){
/* 屏幕的宽度400px到700px的样式 */
body {
    background-color: blue;
}
```
## 8. less
Less 是一门 CSS 预处理语言，它扩展了 CSS 语言，增加了变量、Mixin、函数等特性，使 CSS 更易维护和扩展。  
使用less前需要先安装node.js，然后通过cnpm安装less。`cnpm install -g less`
### 在本地node环境下实现
1. 创建一个less文件，类似于这样
```less
@size: 200px;
@sizeHeight: 100px;
@bgcolor1: red;
@fontsize: 30px;
h1 {
  width: @size;
  height: @sizeHeight;
  background-color: @bgcolor1;
  font-size: @fontsize;
}
```
2. 将预处理less文件编译成css文件`lessc style.less style.css`
3. 引入style.css
