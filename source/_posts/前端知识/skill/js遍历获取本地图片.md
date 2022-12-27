---
title: js遍历获取本地图片
tags:
  - javaScript
categories:
  - 前端知识
abbrlink: ecb3bd1e
date: 2022-12-05 12:37:19
updated:
keywords:
description:
swiper_index:
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
上代码
```javascript
//参数 1.路径 2.是否遍历子目录 3.正则
// 本例中遍历获取的是assets/avatar目录下所有的.webp格式的图片
const files = require.context("@/assets/avatar", true, /\.webp$/).keys();
files.forEach((item, index) => {
  this.avatarList.push({ code: `${index}`, url: require("../../../assets/avatar" + item.slice(1)) })
});
```
