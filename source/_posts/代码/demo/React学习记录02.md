---
title: React学习记录02
tags:
  - React
categories:
  - 代码
date: 2025-09-04 20:00:00
updated: 2025-09-04 20:00:00
cover: https://lsky.kissshot.site/img/2025/04/07/67f31509b3a67.webp
---
> 参考React19文档

**React组件构建思路**  

1. 将 UI 拆解为组件层级结构
2. 使用 React 构建一个静态版本
3. 找出 UI 精简且完整的 state 表示
4. 验证 state 应该被放置在哪里
5. 添加反向数据流

# 1.组件
```javascript
//标准组件格式
export function Profile() {
  return (
    <img
      src="https://i.imgur.com/QIrZWGIs.jpg"
      alt="Alan L. Hart"
    />
  );
}

export default function Gallery() {
  return (
    <section>
      <h1>了不起的科学家们</h1>
      <Profile />
      <Profile />
    </section>
  );
}
//导入组件
import Gallery from './Gallery.js';
import { Profile } from './Gallery.js';
```