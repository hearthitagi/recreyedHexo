---
title: vue基础 03
tags:
  - vue
categories:
  - 前端知识
abbrlink: f9999bcb
date: 2022-02-22 17:07:57
updated:
keywords:
description:
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
## 1. 生命周期

生命周期就是vue实例在创建、运行、销毁的整体过程

### 1.1 生命周期钩子函数

```vue
<div id='app'>
    <input type="text" v-model:value='msg' @change='console.log(msg)'>
    <div v-for='(item,index) in list'>{{item}}</div>
</div>
<script>
    let vm = new Vue({
        el: '#app',
        data: {
            msg: '你想成为怎样的人',
            list: ['异世界迷宫黑心企业', 'sonnyBoy', '小林家的龙女仆S'],

        },
        methods: {
        },
        beforeCreate() {
            console.log('此时vue初始化，但是实例化对象没有内容；主要用于页面重定向');
            console.log(this.msg);
        },
        created() {
            console.log('vue初始化完成，已经加载了内容、方法等;主要用于接口与初始化');
            console.log(this.msg);
        },
        beforeMount() {
            console.log('虚拟DOM在内存中创建完毕，但未渲染到页面上');
            // debugger;
        },
        mounted() {
            console.log('虚拟DOM已渲染到浏览器页面；在此之后可以操作页面上的DOM');
            console.log(this.list);
        },
        beforeUpdate() {
            console.log('vue内容更新之前的执行的钩子函数；只有更新动作能够执行多次');
            console.log(this.msg);
        },
        updated() {
            console.log('vue内容更新之后执行的钩子函数');
            console.log(this.msg);
        },
        beforeDestroy() {
            console.log('vue销毁之前执行的钩子函数；定时器等监听动作的清除');
        },
        destroyed() {
            console.log('vue销毁之后执行的钩子函数');
        },
    })
</script>
```

## 2. vue-resource

vue-resource是依赖于vue的接口请求方法，是在vue1.0版本支持的方法

```js
 created() {
	//get请求
	//一个参数：地址；传参需要在地址后用？拼接
    this.$http.get('http://wk.myhope365.com/weChat/applet/course/banner/list?number=3').then(res => {
        console.log(res);
    });
	//post请求
	//此时服务器要求的请求体格式为form-Data
	//三个参数1.url 2.对象，内容为请求体 3.{ emulateJSON: true }
    this.$http.post('http://wk.myhope365.com/weChat/applet/course/list/type',
        { type: 'free', pageNum: 1, pageSize: 10 },
        { emulateJSON: true }).then(res => {
            // console.log(res);
        });
	//post请求
	//此时服务器要求的请求体格式为JSON
	//两个参数1.url 2.JSON对象
    this.$http.post('http://wk.myhope365.com/weChat/applet/subject/list',
        { 'enable': 1 }).then(res => {
            console.log(res);
        })
},
```

## 3. axios

axios与vue无关，它是基于 Promise 的 HTTP 库

```js
created() {
	//get请求
	//一个参数：url；参时在url后？拼接
    axios.get('http://wk.myhope365.com/weChat/applet/course/banner/list?number=4').then(res => {
            this.rollImgList = res.data.data;
		});
		
    function createFormat(type, pNum, pSize) {
        let format = new FormData();
        format.append("type", type);
        format.append("pageNum", pNum);
        format.append("pageSize", pSize);
        return format;
    }
    //post请求
    //两个参数：1.url 2.请求体需要为form—Data时，返回new FormData()对象传入
    axios.post('http://wk.myhope365.com/weChat/applet/course/list/type',
        createFormat("free", 1, 10)).then(res => {
            this.freeCourseList = res.data.rows;
        });
},
```

## 4.动画

### 4.1 transition实现动画

首先创建新标签transition；没有name属性是默认使用以下类名控制动画效果，有name属性时，用name名替换`v`

<a id="vue-transition">各状态讲解</a>

1. `v-enter`：定义进入过渡的开始状态。在元素被插入之前生效，在元素被插入之后的下一帧移除。
2. `v-enter-active`：定义进入过渡生效时的状态。在整个进入过渡的阶段中应用，在元素被插入之前生效，在过渡/动画完成之后移除。这个类可以被用来定义进入过渡的过程时间，延迟和曲线函数。
3. `v-enter-to`：定义进入过渡的结束状态。在元素被插入之后下一帧生效 (与此同时 `v-enter` 被移除)，在过渡/动画完成之后移除。
4. `v-leave`：定义离开过渡的开始状态。在离开过渡被触发时立刻生效，下一帧被移除。
5. `v-leave-active`：定义离开过渡生效时的状态。在整个离开过渡的阶段中应用，在离开过渡被触发时立刻生效，在过渡/动画完成之后移除。这个类可以被用来定义离开过渡的过程时间，延迟和曲线函数。
6. `v-leave-to`：定义离开过渡的结束状态。在离开过渡被触发之后下一帧生效 (与此同时 `v-leave` 被删除)，在过渡/动画完成之后移除。

```html
<style>
    .fade-enter,
    .fade-leave-to {
        opacity: 0;
        transform: translateX(100px);
    }
    .fade-enter-active,
    .fade-leave-active {
        transition: all 0.2s ease;
        position: absolute;
    }
</style>
<div id='app'>
    <button @click='isshow = !isshow'>动起来</button>
    <transition name='fade'>
        <div v-show='isshow'>呀嘞呀嘞</div>
    </transition>
</div>
<script>
    let vm = new Vue({
        el: '#app',
        data: {
            isshow: false,
        },
    })
</script>
```

### 4.2 使用第三方animate库实现动画

[Animate.css官方网站](https://animate.style/)

> 引入线上地址
>
> 3.0版本
>
> <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css" />
>
> 4.0版本
>
> <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/3.6.2/animate.min.css" />

#### 1. 使用方法

仅需要引入类名即可4.0版本要求要有`animate__`前缀

```html
<div id='app'>
    <!-- 3.0版本 -->
    <button @click='isshow4=!isshow4'>animate版本4，开！</button>
    <div v-if='isshow4'>
        <h1 class="animate__animated animate__bounce">An animated element</h1>
    </div>
    <div></div>
    <!-- 3.0版本 -->
    <button @click='isshow3=!isshow3'>animate版本3，开！</button>
    <div v-if='isshow3'>
        <h1 class="animated fadeOutRight">An animated element</h1>
    </div>
</div>
<script>
    let vm = new Vue({
        el: '#app',
        data: {
            isshow4: true,
            isshow3: true,
        },
        methods: {}
    })
</script>
```

#### 2. 动画钩子函数

个人觉得用处不大，简单说就是在动画各个执行阶段执行的函数。[对照这个理解](#vue-transition)

```html
<!-- 进入时 -->
<div id="app2">
    <transition @before-enter="beforeEnter" @enter="enter" @after-	enter="afterEnter">
    	<div v-if="isshow" class="show">进入</div>
	</transition>
	<transition @before-leave="beforeLeave" @leave="leave" @after-leave="afterLeave">
    	<div v-if="isshow" class="show">离开</div>
	</transition>
</div>
<script>
    let vm2 = new Vue({
        el: '#app2',
        data: {
            isshow: false,
        },
        methods: {
            beforeEnter(el) { // 动画进入之前的回调
                el.style.transform = 'translateX(500px)';
            },
            enter(el) { // 动画进入时的回调
                el.offsetWidth;
                el.style.transform = 'translateX(0px)';
            },
        }
    })
</script>
```

### 4.3 v-for列表的过度

使用transition-group标签；tag属性会将transition-group渲染成tag指定的html标签

```html
<style>
  .list-enter,
  .list-leave-to {
    opacity: 0;
    transform: translateY(10px);
  }
  .list-enter-active,
  .list-leave-active {
    transition: all 0.3s ease;
  }
</style>
<div id="app">
  <input type="text" v-model="txt" @keyup.enter="add">
  <transition-group tag="ul" name="list">
    <li v-for="(item, i) in list" :key="i">{{item}}</li>
  </transition-group>
</div>
<script>
    var vm = new Vue({
        el: '#app',
        data: {
            txt: '',
            list: [1, 2, 3, 4]
        },
        methods: {
            add() {
                this.list.push(this.txt);
                this.txt = '';
            }
        }
    });
</script>
```
