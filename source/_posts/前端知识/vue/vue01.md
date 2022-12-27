---
title: vue基础 01
tags:
  - vue
categories:
  - 前端知识
abbrlink: 1797fae7
date: 2022-02-22 17:07:30
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
## 1. 引用

Vue是一套用于构建用户界面的**渐进式框架**。

线上引用`https://cdn.jsdelivr.net/npm/vue@2.6.14/dist/vue.min.js`

vue基础模板


## 2. 插值表达式、v-cloak、v-text和v-html

```htm
<body>
    <!-- view层 -->
    <div id='app'>
    </div>
</body>
<script>
    //view model层
    let vm = new Vue({
        //vue控制区域
        el: '#app',
        //需要渲染的数据
        data: {},
        //引用的方法;model层
        methods: {}
    })
</script>
```


`{{}}`是插值表达式，用来渲染页面元素

v-cloak：隐藏页面预加载内容，防止页面闪烁

v-text：指定元素标签的文本内容

v-html：会将元素标签的内容解析为html

## 3. v-bind和v-on

`v-bind`绑定元素属性，将这个元素节点的 `title` （属性名与属性值）和 Vue 实例中的 `message` （属性名，属性值） 保持一致

`v-bind`简写为：

`v-on`添加事件监听器，通过它调用在 Vue 实例中定义的方法

`v-on`简写为@

```html
<span v-bind:title="message">我是title</span>
<span :title="message">我是title</span>
<button v-on:click="sayName">名字</button>
<button @click="sayName">名字</button>
<script>
    let vm = new Vue({
        el: '#app',
        data: {
            message: '页面加载于 ' + new Date().toLocaleString();
        },
        methods: {
            sayName() {
                console.log('name is saber');
            }
        }
    })
</script>
```

### 3.1 事件修饰符

- `.stop` 阻止事件冒泡
- `.prevent` 阻止默认事件
- `.capture` 事件触发机制变为捕获模式
- `.self`只当事件在该元素本身触发时触发回调，捕获和冒泡不会触发带`.self`事件修饰符的元素
- `.once`事件只触发一次
- `.passive`滚动行为将会立即触发，而不会等待 `onScroll` 完成

### 3.2 v-model

v-model用于数据的双向绑定；主要用于表单元素

```vue
<div id='app'>
    <input v-model='msg' type="text" >
    {{msg}}
</div>
<script>
new Vue({
...data: {msg:''},
})
</script>
```

## 4. v-if和v-show

`v-if`：通过传入给`v-if`的布尔类型值来判断是否删除此dom元素

`v-show`：通过传入给`v-if`的布尔类型值来判断是否隐藏此dom元素（通过`display:none`的方式）

```html
<!-- 不展示，无此dom元素 -->
<span v-if=false>我是title</span> 
<!-- 不展示，元素被设置为`display:none` -->
<button v-show=false>名字</button>
```

`v-if`后可以接`v-else-if`和`v-else`,但必须相连，不能有其他元素

```
<span v-if='num>18'>1</span> 
<span v-else-if='num>30'>2</span> 
<span v-else>3</span> 
```

## 5. v-for和key

`v-for` 指令可以绑定数组的数据来渲染一个项目列表

```html
<!-- 遍历数组;item index是数组项和索引 -->
<div v-for='(item,index) in list'>{{item}} {{index}}</div>
<!-- 遍历对象;value,key,index是属性值，属性，索引 -->
<div v-for='(value,key,index) in obj'>{{value}} {{key}} {{index}}</div>
<!-- 遍历数字 -->
<div v-for='num in 4'>{{num}}</div>
<script>
    let list = ['kalin','siki','hitaki'];
    let obj = {name:'laki',age:18}
</script>
```

使用`v-for`时应尽量加入key的这个特殊属性。

在使用key时，如果有数据更改引发元素节点的添加或删除，会基于 key 的变化重新排列元素顺序，而不是所有元素重新渲染。以此来提高加载速度，提升渲染性能。

key的值应是唯一的，例如唯一的数字或字符串

```html
<div v-for='(item,index) in list' :key='index'>
    {{item}} {{index}}
</div>
```

## 6. class与style的绑定

### 6.1 class

在定义class时可以绑定一个对象，以动态切换class。

- vue绑定的class可以和普通的class共存
- 下例中vue绑定的class1、class2的有无取决于boolean1、boolean2的值

```html
<div class="static" 
    :class="{ class1: boolean1, class2: boolean2 }"></div>
data: {
	boolean1: true,
	boolean2: false
}
<!-- 最终渲染为 -->
<div class="static class1"></div>
<!-- 另一种写法，不内联定义在模板里 -->
<div :class="classObj"></div>
data: {
	classObj: { class1: true, class2: false },
}
```

在定义class时也可以绑定一个数组，以应用一个 class 列表。

```html
<div :class="[class1, class2]"></div>
data: {
	class1: 'active',
	class2: 'text-danger'
}
<!-- 最终渲染为 -->
<div class="active text-danger"></div>
<!-- 也可以在数组语法中使用对象语法 -->
<div :class="[{ class1: Boolean1 }, class2]"></div>
```

### 6.2 style

- 对象语法

```html
<div :style="{ color: activeColor, fontSize: fontSize + 'px' }"></div>
data: {
  activeColor: 'red',
  fontSize: 30
}
<!-- 建议这样写 -->
<div :style="styleObject"></div>
data: {
  styleObject: {
    color: 'red',
    fontSize: '13px'
  }
}
```

- 数组语法

```html
<div :style="[baseStyles, overridStyles]"></div>
data: {
  baseStyles: {
    color: 'red',
  },
  overridStyles: {
	fontSize: '13px',
  }
}
```
