---
title: blob转file并传给后端
tags:
  - javaScript
categories:
  - 前端知识
abbrlink: 7b09e437
date: 2022-12-05 12:42:27
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
```javascript
const files = new window.File([data], `${new Date().getTime()}.jpg`, { type: data.type })
const formData = new FormData()
formData.append('file', files)
```
然后再用接口请求，例如`axios`
```javascript
axios.post('url',formData).then(res => {
    ...
});
```