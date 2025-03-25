---
title: css高级技巧
tags:
  - css
categories:
  - 代码
abbrlink: c1dc5784
date: 2022-01-28 11:46:26
cover:
---
# css高级技巧01
## 1.1 超出显示省略号
```css
/* 强制文本同一行显示 */
white-space: nowrap;
/* 溢出内容隐藏 */
overflow: hidden;
/* 省略号 (缺一不可)*/
text-overflow: ellipsis;
```
## 1.2 三角形

三角形: 盒子的宽高设为0，边框填满盒子、transparent边框透明

```css
width: 0px;
height: 0px;
border: 100px solid;
border-color: blue red green orange;
/* 将上、右、下边框设为透明，便得到一个三角形 */
border-color: transparent transparent transparent orange;
```

## 1.3 渐变边框

设置两层背景：一层显示范围控制在padding以内，一层显示范围控制在border以内
```css
.element {
    width: 100px;
    height: 100px;
    border: 5px solid transparent;
    border-radius: 10px;
    background-clip: padding-box, border-box;
    background-origin: padding-box, border-box;
    background-image: linear-gradient(to right, #fff, #fff), linear-gradient(90deg, #9b5be4, #6891e2);
}
```

## 1.4 修改滚动条样式
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

