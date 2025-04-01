---
title: vue3左右布局 拖拽宽度变化
tags:
  - vue
categories:
  - 代码
date: 2025-04-01 13:34:21
cover: https://lsky.kissshot.site/img/2025/04/01/67eb7e63ec710.webp
---
**基础结构**

```html
<template>
  <div class="container">
    <!-- 左侧区域 -->
    <div class="left" :style="{ width: leftWidth + 'px' }">
      <div class="content">左侧内容（宽度：{{ leftWidth }}px）</div>
    </div>
    
    <!-- 拖拽条 -->
    <div class="drag-bar" @mousedown="startDrag"></div>
    
    <!-- 右侧区域 -->
    <div class="right">
      <div class="content">右侧内容</div>
    </div>
  </div>
</template>
```

**逻辑部分**

```javaScript
<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const leftWidth = ref(300) // 初始左侧宽度
let isDragging = false

// 开始拖拽
const startDrag = (e) => {
  isDragging = true
  document.addEventListener('mousemove', onDrag)
  document.addEventListener('mouseup', stopDrag)
  e.preventDefault()
}

// 拖拽中
const onDrag = (e) => {
  if (!isDragging) return
  const container = document.querySelector('.container')
  const rect = container.getBoundingClientRect()
  const newWidth = e.clientX - rect.left
  
  // 设置最小宽度限制（可选）
  if (newWidth > 100 && newWidth < rect.width - 100) {
    leftWidth.value = newWidth
  }
}

// 停止拖拽
const stopDrag = () => {
  isDragging = false
  document.removeEventListener('mousemove', onDrag)
  document.removeEventListener('mouseup', stopDrag)
}

// 组件卸载时清理事件
onUnmounted(() => {
  document.removeEventListener('mousemove', onDrag)
  document.removeEventListener('mouseup', stopDrag)
})
</script>
```

**样式部分**

```css
<style scoped>
.container {
  width: 100%;
  display: flex;
  height: 100vh;
  position: relative;
}

.left {
  height: 100%;
  overflow: auto;
  background: #f0f0f0;
}

.drag-bar {
  width: 6px;
  height: 100%;
  background: #ddd;
  cursor: ew-resize;
  position: relative;
  z-index: 1;
}

.drag-bar:hover {
  background: #ccc;
}

.right {
  flex: 1;
  height: 100%;
  overflow: auto;
  background: #fff;
}

.content {
  padding: 20px;
  height: calc(100% - 40px);
}
</style>
```