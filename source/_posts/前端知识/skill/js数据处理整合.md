---
title: js数据处理整合
date: 2024-01-11 16:27:48
updated:
tags:
  - javaScript
categories:
  - 前端知识
keywords:
description:
  平常用的js数据处理范例
top_img:
comments:
cover: https://img.hitagi.site/1704962242667.webp
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
```javascript
// hetong对fapiao 1对多
let arr = [
    { hetong: 'x', fapiao: 11 },
    { hetong: 'y', fapiao: 22 },
    { hetong: 'x', fapiao: 33 },
]
// 转换成
[
    { hetong: 'x', fapiao: [11, 33] },
    { hetong: 'y', fapiao: [22] }
]
let finalArr = []
arr.forEach(item => {
    if (finalArr.length > 0 && finalArr.find((val)=> val.hetong == item.hetong )) {
        finalArr.find((val)=> val.hetong == item.hetong ).fapiao.push(item.fapiao)
    }else{
        finalArr.push({hetong:item.hetong,fapiao:[item.fapiao]})
    }
});
console.log(finalArr);
```