---
title: vue基础 04
date: 2022-02-22 17:08:11
updated:
tags:
    - vue
categories:
    - 前端框架
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
## 1. vue组件

### 1.1 组件定义的四种方式

```html
<body>
    <div id='app'>
        <foot></foot>
        <signin></signin>
        <account></account>
        <demo></demo>
    </div>
</body>
<!-- script标签种 -->
<script id="tmpl" type="x-template">
    <div><a href="#">登录</a> | <a href="#">注册</a></div>
</script>
<!-- 模板标签 -->
<template id='tmp2'>
    <div style="color: yellowgreen;">模板呀哈罗</div>
</template>
<script>
    // 第一种
    var foot = Vue.extend({
        template: '<footer style="color: blue;">友情链接</footer>'
    });
    Vue.component('foot', foot);
    // 第二种
    Vue.component('signin', {
        template: '<div style="color: violet;">登录</div>'
    });
    // 第三种（script标签种）
    Vue.component('account', {
        template: '#tmpl'
    });
    // 第四种（模板标签）
    Vue.component('demo', {
        template: '#tmp2',
    })
    let vm = new Vue({
        el: '#app',
        data: {},
        methods: {}
    })
</script>
```

### 1.3 局部子组件和组件数据及方法

```html
<template id='tmp1'>
    <div>
        <span>东海帝皇</span>
    </div>
</template>
<script>
    let vm = new Vue({
        el: '#app',
        data: {},
        methods: {},
        // 局部子组件
        components: {
            template: '#tmp1',
            data() {
                return {
                    msg: '这是子组件数据,要写在return里',
                }
            },
            methods: {},
        }
    })
</script>
```

### 1.4 组件切换

使用component标签和is来实现组件的切换

```html
<body>
    <div id='app'>
        <button @click='signInstruction="signin"'>登录</button>
        <button @click='signInstruction="signup"'>注册</button>
        <hr>
        <component :is="signInstruction"></component>
    </div>
</body>
<template id="signin">
    <a href="#">登录</a>
</template>
<template id="signup">
    <a href="#">注册</a>
</template>
<script>
    Vue.config.devtools = true;
    let vm = new Vue({
        el: '#app',
        data: {
            signInstruction: 'signin',
        },
        methods: {},
        components: {
            signin: {
                template: '#signin',
            },
            signup: {
                template: '#signup',
            }
        }
    })
</script>
```

#### 1.4.1 动画效果

和之前动画的使用方式一样，把要切换的组件用transition包裹起来就行了。

需要指定动画的切换顺序，希望先离开，在进入可以设置transition的mode

```html
<transition mode="out-in">
	<component :is="isLogin?'user-info':'login'"></component>        
</transition>
```

## 2. slot插槽

想要在父组件的子组件标签内插入内容，需要在子组件模板中引入slot插槽；

插槽分为具名插槽和无名插槽；具名插槽内容需要写在template标签内，属性为#slot名

```html
<body>
    <div id='app'>
        <son>
            <template v-slot:name>
                <p>具名的插槽</p>
            </template>
            <p>无名的插槽</p>
        </son>
    </div>
</body>
<template id="son">
    <div>
        <slot name='slotname'></slot>
        <slot></slot>
    </div>
</template>
<script>
    let vm = new Vue({
        el: '#app',
        data: {},
        methods: {},
        components: {
            son: {
                template: '#son'
            }
        }
    })
</script>
```


