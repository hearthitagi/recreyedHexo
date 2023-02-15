---
title: css高级技巧
tags:
  - css
categories:
  - 前端知识
description:
  - 显示省略号
  - 行内块元素
  - 元素显示与隐藏
  - 版心与布局流程
  - 精灵图
  - 字体图标
  - 三角形
abbrlink: c1dc5784
date: 2022-01-28 11:46:26
updated: 2022-02-09 16:57:43
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
copyright_url:
copyright_info:
mathjax:
katex:
aplayer:
highlight_shrink:
aside:
---
## css高级技巧01
### 1.1 显示省略号
```css
/* 强制文本同一行显示 */
white-space: nowrap;
/* 溢出内容隐藏 */
overflow: hidden;
/* 省略号 (缺一不可)*/
text-overflow: ellipsis;
```
### 1.2 行内块元素对齐
文本内容或行内元素相对于同一行内块元素垂直居中
```css
vertical-align: middle;
```
清除行内块元素默认边距 : 转化为块元素并浮动
```css
display: block;
float: left;
```
相邻行内块元素，其中一个设置外边距，相邻的也受到影响:  
给设置外边距的行内块元素设置`vertical-align:top;`

### 1.3 元素的显示与隐藏
元素的隐藏:  

|        方法        |     dom      |  占位置  |
| :----------------: | :----------: | :------: |
|   display: none    | 没有删除结构 | 不占位置 |
| visibility: hidden | 没有删除结构 |  占位置  |
|     opacity: 0     | 没有删除结构 |  占位置  |

### 1.4 版心与布局流程
“版心”(可视区) 是指网页中主体内容所在的区域980px 1200px等
布局流程：由外到内，由大到小  
常见布局
- 一列固定宽度且居中
- 两列左窄右宽
- 通栏平均分布

### 1.5 精灵图
为什么要使用精灵图？减少服务器的压力，提高加载的速度  
精灵图：将多张图片拼接在一张图片上，通过背景的位置属性选择合适
位置即可
### 1.6 字体图标
[阿里图标库](https://www.iconfont.cn/)
unicodes引入、font-class引入、symbol引入  
### 1.7 三角形
三角形: 盒子的宽高设为0，边框填满盒子、transparent边框透明
```css
width: 0px;
height: 0px;
border: 100px solid;
border-color: blue red green orange;
```
![盒子宽高为0时的边框](https://img.recreyed.tk/202211142243934.png)
将上、右、下边框设为透明，便得到一个三角形
`border-color: transparent transparent transparent orange;`
![上、右、下边框透明](https://img.recreyed.tk/202211142244997.png)
### 1.8 修改滚动条样式
::-webkit-scrollbar 滚动条整体部分  
::-webkit-scrollbar-thumb 滚动条里面的小方块，能向上向下移动（或往左往右移动，取决于是垂直滚动条还是水平滚动条）  
::-webkit-scrollbar-track 滚动条的轨道（里面装有Thumb）  
::-webkit-scrollbar-button 滚动条的轨道的两端按钮，允许通过点击微调小方块的位置。  
::-webkit-scrollbar-track-piece 内层轨道，滚动条中间部分（除去）  
::-webkit-scrollbar-corner 边角，即两个滚动条的交汇处  
::-webkit-resizer 两个滚动条的交汇处上用于通过拖动调整元素大小的小控件  
```css
/* 整个滚动条 */
::-webkit-scrollbar {
width: 3px;
height: 3px;
}

/* 滚动条有滑块的轨道部分 */
::-webkit-scrollbar-track-piece {
  background-color: transparent;
  border-radius: 5px;
}

/* 滚动条滑块(竖向:vertical 横向:horizontal) */
::-webkit-scrollbar-thumb {
  cursor: pointer;
  background-color:#f2f2f2;
  border-radius: 5px;
}

/* 滚动条滑块hover */
::-webkit-scrollbar-thumb:hover {
  background-color: #999999;
}

/* 同时有垂直和水平滚动条时交汇的部分 */
::-webkit-scrollbar-corner {
  display: block;    /* 修复交汇时出现的白块 */
}
```