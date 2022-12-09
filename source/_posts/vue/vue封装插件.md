---
title: vue封装插件
date: 2022-12-09 14:59:24
updated:
tags:
    - vue
categories:
    - 前端知识
keywords:
description: vue插件全局封装
swiper_index:
top_img:
comments:
cover: https://anteku.jp/blog/wp-content/uploads/2021/11/vue-eyecatch-960x504-1.jpeg
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
参考内容：[vue的组件插件化封装](https://blog.csdn.net/qq_46038620/article/details/119205367)
```javascript
//toast/index.js
import Toast from './toast.vue'
const toast = {}
toast.install = function(Vue) {
    console.log('use了toast插件')
    // 1. 创建组件构造器
	const toastConstructor = Vue.extend(Toast)
	// 2. 使用组件构造器创建一个组件
 	const toast = new toastConstructor()
	// 3. 将组件手动挂载到一个元素上
	toast.$mount(document.createElement('div'))
	// 4. 将节点插入到页面中，$el就是改组件的节点
	document.body.appendChild(toast.$el)
	// 5. 将组件加入到vue实例上
	Vue.prototype.$toast = toast
}
export default toast
```
toast/toast.vue  
```html
<template>
  <div class="toast" v-show="isShow">{{massage}}</div>
</template>
<script>
export default {
  name: "Toast",
  data() {
    return {
      massage: '',
      isShow: false
    }
  },
  methods: {
    show(msg='默认文字',durations=2000) {
      console.log('----')
      this.massage = msg
      this.isShow = true
      setTimeout(()=>{
        this.isShow = false
      },durations)
    }
  }

}
</script>
<style scoped>
.toast {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 7px 10px;
  background-color: rgba(0,0,0,.8);
  border-radius: 4px;
  color: #fff;
  z-index: 9999;
}
</style>
```
入口文件，一般为`main.js`
```javascript
....

import toast from '@/plugins/toast/index.js'
Vue.use(toast)

...

```