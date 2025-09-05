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
> 专注React19与旧版变化

**React组件构建思路**  

1. 将 UI 拆解为组件层级结构
2. 使用 React 构建一个静态版本
3. 找出 UI 精简且完整的 state 表示
4. 验证 state 应该被放置在哪里
5. 添加反向数据流

# 1.变化
## 1.1Hook
使用state前需要先引入
```javascript
import { useState } from 'react';

function MyButton() {  
const [count, setCount] = useState(0);  
// ...

```

