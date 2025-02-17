---
title: css基础
tags:
  - css
categories:
  - 代码
copyright_url:
abbrlink: eda1a9a9
date: 2022-01-26 15:01:43
updated: 2022-01-28 11:46:43
keywords:

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


## 1. CSS

### 1.1 引用CSS
```html
<!-- 行内样式表 -->
<header style="color: red;">网页头部</header>
<!-- 内部样式表 -->
<style>
    div { width:100px; }
</style>
<!-- 外部样式表 -->
<link rel="stylesheet" href="./style.css">
```
### 1.2 CSS字体属性

```css
header {
    font-family: SimSun;
    font-size: 28px;/* 默认大小 16px */
    font-weight: bolder;
    font-style: oblique;
}
header { font: oblique bolder 40px SimSun; }
```
### 1.4 CSS外观属性
```css
div {
    color: red;
    color: rgb(10, 100, 200);/* 红、绿、蓝 */
    color: #fedfe1;
}
div {
    /* 首行缩进 */
    text-indent: 2em;
    /* 文本水平居中 */
    text-align: center;
    /* 文本行高属性：属性值等于高度，垂直居中 */
    line-height: 100px;
    /* 文本描述:上划线等 */
    text-decoration: overline;
    /* 去掉li小点 */
    list-style: none;
    /* 多行文本框取消拖拽 */
    resize: none;
    /* 圆角 */
    border-radius: 10px;
}
```
## 2. CSS选择器
选择器：通过特定的符号去选择指定的元素
- 基础选择器：标签选择器、类名选择器、ID选择器、多类名选择器、通配符选择器
- 复合选择器：交集选择器、并集选择器、后代选择器、子代选择器
- 伪类选择器

### 2.1 基础选择器
```css
/* 标签选择器：通过标签的名获取指定元素 */
header { color: antiquewhite; }
/* 类名选择器：通过标签的类名获取指定元素，多类名选择器：多个类名之间用空格隔开 */
.box1 { color: aqua; }
/* ID选择器：通过ID名获取指定元素，ID不可重复 */
#box2 { color: blue; }
/* 通配符选择器：选择所有元素 */
* { margin: 0; }
```
### 2.2 复合选择器
```css
/* 交集选择器：既是...，又是... 不能加空格 同时拥有box1和box2被选 */
.box1.box2 { font-size: 40px; }
/* 并集选择器:多个选择器之间用逗号隔开 拥有box1和box2的都被选 */
.box1,.box2 { font-weight: bolder; }
/* 子代选择器：必须是一级父子关系才被选 .list的一级子代是li的被选*/
.list1>li { color: purple; }
/* 后代选择器：后代都可以 .list后代是div的都被选 */
.list1 div { font-size: 70px; }
```
### 2.3 伪类选择器
```css
/* 单击前的样式 (a标签)*/
.link1:link { color: red; }
/* 鼠标移上去的样式 (通用)*/
.link1:hover { color: pink; }
/* 单击时的样式 (通用)*/
.link1:active { color: green; }
/* 单击后的样式 (a标签)*/
.link1:visited { color: brown; }
```
## 3. 标签的显示模式
### 3.1 块状元素
hn、p、div、ul、ol、li、dl、dd、dt、table、caption、thead、tbody、tr、td、th、header、footer、section、artical、aside等

- 始终独占一行可以包含任何元素(h标签不能包含h标签,p标签不能包含p标签)
- 有默认宽高，是父元素的100%，高度是内容高度
- 宽高、外边框，内边距，边框可以设置

### 3.2 行内元素
span、a、label、b/shrong、i/em、u/ins、s/del

- 有默认宽高，宽高是内容所撑起的宽高
- 宽高设置无效
- 不能包含块状元素，可以包含行内元素和文本内容
- 相邻的行内元素在同一行显示
- 边框可以设置，内外边距水平方向可以设置，垂直不行

### 3.3 行内块元素
img、input、select、option、datalist、textarea、button

- 相邻的行内块元素在同一行显示
- 有默认宽高
- 宽高、外边框，内边距，边框可以设置
- 一般不包含其他元素

### 3.4 显示模式的转化：

- 转化为块状元素：display：block
- 转化为行内元素：display：inline
- 转化为行内块元素：display：inline-block

## 4. 背景
```css
.box1 {
    width: 600px;
    height: 350px;
    background-color: violet;
    background-image: url(images/02.png);
    /* 平铺属性 */
    background-repeat: no-repeat;
    /* 位置属性：水平、垂直方向 */
    background-position: right bottom;
    /* 尺寸属性 */
    background-size: 80% 80%;
    /* 总写：背景色 地址 平铺属性 位置 */
    background: red url(images/02.png) no-repeat 100% 100%;
    background-size: 60%; 
}
```
## 5. CSS三大特性
### 5.1 CSS特性

- 层叠性：后者覆盖前者
- 继承性：子(后代)承父业
- 优先级：style > !import > ID选择器 > 类名选择器 > 标签选择器 > 通配符选择器

### 5.2 优先级比较

- 0 0 0 1  标签
- 0 0 1 0  类名
- 0 1 0 0  ID
- 1 0 0 0  style

所有选择器加在一起数字较大的优先级高
## 6. 盒子模型
盒子模型包含：内容、宽高、边框、内边距、外边距
### 6.1 边框
```css
/* 边框会影响盒子尺寸 上、下、左、右 */
/* 实线 solid、虚线 dashed、双实线 double、点线 dotted*/
.box1 { border: 10px 10px 10px 10px solid black; }
```
### 6.2 内边距
```css
/* 内边距会影响盒子尺寸、上右下左 */
.box1 { padding: 10px 40px 40px 10px; }
```
### 6.3 外边距
```css
.box1 { margin: 30px 10px 10px 30px;}
```
- 元素与其他元素，或与浏览器的距离
- 任何元素都有默认的外边距
- 外边距不会影响盒子尺寸

1. 相邻元素的垂直外边距塌陷：两元素垂直相邻，外边距取较大值;
2. 嵌套外边距合并：父元素没有上边框和上内边距，子元素的上外边距就是父元素的;
3. 消除嵌套外边距合并：父元素加上边框或内边距，父元素添加`overflow:hidden`;
4. `margin: auto;`实现盒子水平居中:盒子必须是块级元素，且指定了宽度;

## 7.  浮动与定位
### 7.1 浮动
- 标准流：元素按照本身特性进行排列
- 浮动：元素脱离标准流，漂浮在其它元素之上

```css
.box1 { float: left; float: right; }
```

- 浮动的元素漂浮在其他元素之上
- 浮动不占位置
- 同时浮动的元素在同一行上显示
- 浮动后的元素不会超出父元素范围，包括内边距和边框
- 浮动后的元素自动转化为行内块元素

### 7.2 清除浮动
浮动的影响: 浮动后的元素不占位置，不能撑开父元素的高度  
清除浮动的影响

- 额外标签法：在父元素里边的最后添加额外的标签`clear:both`
- 给父元素添加 overflow:hidden
- 伪元素清除 两个冒号是伪元素

```css
.clearfix::after { content: "";display: block;clear: both; }
```
### 7.3 定位
分类：静态定位、相对定位、绝对定位、固定定位  
tips: 元素添加了绝对定位和固定定位之后，元素转换为行内块模式  
|   类型   |                  参考系                   | 脱离标准流 | 占位置 |
| :------: | :---------------------------------------: | :--------: | :----: |
| 相对定位 |              相对于元素本身               |     否     |   是   |
| 绝对定位 | 相对于视口;若父元素相对定位则相对于父元素 |     是     |   否   |
| 固定定位 |               相对于浏览器                |     是     |   否   |

静态定位 static 标准流布局
```css
/* 定位属性：position、边偏移量：left、right、top、bottom */
.box { position: absolute;top: 400px;left: 400px; }	
```
