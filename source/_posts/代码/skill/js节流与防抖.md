---
title: js节流与防抖
tags:
  - javaScript
categories:
  - 代码
description: 
cover:
abbrlink: 5ae4b622
date: 2024-01-25 09:59:19
updated:
keywords:
top_img:
comments:
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
## 节流与防抖
- 节流：限制触发方法的频率。
- 防抖：限制方法的触发频率。
```javascript
// 节流：触发func方法后的一段时间(1s)内，不能再次触发
function throttle(func, delay = 1000) {
    let lastTime
    let nowTime
    return () => {
        nowTime = Date.now()
        if (!lastTime || nowTime - lastTime > delay) {
            func()
            lastTime = nowTime
        }
    }
}
// 防抖：触发事件后，1秒后执行func方法，1秒内再次出发时间，重置为1秒后执行
function debounce(func, delay = 1000) {
    let timer = null;
    return () => {
        if (timer) { clearTimeout(timer) }
        timer = setTimeout(() => {
            func.apply(this, arguments)
            timer = null
        }, delay)
    }
}
```
