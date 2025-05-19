---
title: js节流与防抖
tags:
  - javaScript
categories:
  - 代码
date: 2024-01-25 09:59:19
updated: 2025-05-19 09:59:19
cover:
---
## 节流与防抖
- 节流：限制触发方法的频率。
- 防抖：限制方法的触发频率。
```javascript
// 节流：触发func方法后的一段时间(1s)内，不能再次触发
function throttle(func: (...args: any[]) => void, delay: number = 100) {
  let lastTime = 0;
  return (...args: any[]) => {
    if (args[0] instanceof Event) {
      args[0].preventDefault();
    }
    const now = Date.now();
    if (now - lastTime >= delay) {
      func.apply(this, args)
      lastTime = now
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
