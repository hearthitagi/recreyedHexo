---
title: vue基础 05
tags:
  - vue
categories:
  - 代码
abbrlink: 10fa3efe
date: 2022-02-22 17:08:22
keywords:
description:
cover:
---
## 1. vue父子组件传值

### 1.1 父传子

步骤简述：

1. 子组件中引入props，用来接受父组件数据
2. 父组件里的子组件标签中绑定父组件的数据

```html
<body>
    <div id='app'>
        <input type="text" v-model='msg'>
        <son :message='msg'></son>
    </div>
</body>
<template id="son">
    <div>
        这是父组件传进来的：{{message}}
    </div>
</template>
<script>
    Vue.config.devtools = true;
    let vm = new Vue({
        el: '#app',
        data: {
            msg: '父组件的数据',
        },
        methods: {},
        components: {
            son: {
                template: '#son',
                props: {
                    message: {
                        type: String,
                    }
                }
            },
        }
    })
</script>
```

props内的写法：

```vue
props: {
    // 规定了父组件只能传字符串类型
    prop1: String,
    // 可以设置多个类型，可以传Number也可以传String
    prop2: [Number, String],
    prop3: {
        // 设置类型
        type: Array,
		// 设为必填字段
		required: true,
        // 设置默认值的时候必须使用函数，原理和data必须使用函数是一样的
        default: function () {
            return [{
                name: '这个一个默认的名字'
            }]
        }
    },
}
```

### 1.2 子传父

步骤简述：

1. 子组件中通过某种方法触发`$emit`传值接口方法，`$emit`参数为`自定义传值方法名`，后面的是要传的子组件中的数据
2. 在父组件里的子组件标签中通过``@自定义传值方法名`绑定父组件中的`接收方法`，`接收方法`中的参数即为所传的子组件的值

```html
<body>
    <div id='app'>
        <span>这里是父组件</span>
        <span>{{receivechild1}}</span> <span>{{receivechild2}}</span>
        <son @toparents='getchildmsg'></son>
    </div>
</body>
<template id="son">
    <div>
        <hr>
        <button @click='childClick'>点击将子组件的值传给父组件</button>
    </div>
</template>
<script>
    Vue.config.devtools = true;
    let vm = new Vue({
        el: '#app',
        data: {
            receivechild1: '',
            receivechild2: '',

        },
        methods: {
            //参数数量根据子组件$emit方法传的数据个数决定
            getchildmsg(data1, data2) {
                this.receivechild1 = data1;
                this.receivechild2 = data2;
            }
        },
        components: {
            son: {
                template: '#son',
                data() {
                    return {
                        childmsg1: '子组件数据1',
                        childmsg2: '子组件数据2',
                    }
                },
                methods: {
                    childClick() {
                        this.$emit('toparents', this.childmsg1, this.childmsg2);
                    }
                },
            }
        }
    })
</script>
```

## 2. ref的使用

给DOM节点和组件加上ref属性，用于获取DOM节点和组件

```html
<body>
    <div id='app'>
        <button @click='signin' ref="signinBtn">登录</button>
        <signin ref="signinquote"></signin>
    </div>
</body>
<template id="signin">
</template>
<script>
    let vm = new Vue({
        el: '#app',
        data: {
            signInstruction: 'signin',
        },
        methods: {
            signin() {
                this.signInstruction = "signin";
                console.log(this.$refs.signinquote.signMsg);
                console.log(this.$refs.signinBtn);
            },
        },
        components: {
            signin: {
                template: '#signin',
                data() {
                    return {
                        signMsg: '开始登录',
                    }
                },
            },
        }
    })
</script>
```

## 3. vue路由

路由的使用步骤

1. 引入js文件，这个js需要放在vue的js后面

2. 创建路由new VueRouter(),接受的参数是一个对象

3. 在实例化的对象里配置属性routes:[],这个数组里的对象包含path属性和component属性

4. path属性是url的地址,component属性就是显示的组件（传组件的对象）
5. 创建的路由需要和vue实例关联一下
6. 路由到的组件显示的位置`<router-view></router-view>`

### 3.1 路由跳转

1. 引入router-link标签，并设置to属性

2.  默认编译成a标签，可以通过tag设置包裹标签

#### 3.1.2 编程时跳转
 - this.$router可以进行函数式跳转  
 - this.$router.push() 跳转到指定页面  
 - this.$router.replace() 这个会替换掉当前界面，当前界面就会从页面栈里被移除  
 - this.$router.back() 返回上一级  
 - this.$router.go() 跳转到指定的界面  

### 3.2 路由重定向

在`new VueRouter()`对象的`routes`属性中，使用`redirect`进行重定向

### 3.3 路由高亮

通过默认`router-link-active`类名设置点击后的路由链接样式

### 3.4 参数定义

两种路由传参的办法，query传参和params传参

1. 通过在`<router-link></router-link>`的to属性中直接 ? 拼接的方法。通过在绑定to属性传对象，例如`:to="{path:'/mine',query:{id:7}}"`。通过`$route.query.参数名`来取到

2. 通过在routes列表中给路由添加name属性并在path后拼接`/:变量名`，在`<router-link></router-link>`中给`to`绑定`{name:'register',params:{id:6}}`。通过`$route.params.参数名`来取到

```html
<body>
    <div id='app'>
        <router-link to="/login">去登陆</router-link>
        <router-link :to="{name:'register',params:{id:6}}">去注册</router-link>
        <router-link :to="{path:'/mine',query:{id:7}}"> 去个人中心</router-link>
        <router-view></router-view>
    </div>
</body>
<template id="login">
    <div>
        <h3>已有帐号?来登录吧</h3>
    </div>
</template>
<template id='register'>
    <div>
        <h3>呀嘞呀嘞，还没帐号？来注册吧</h3>
    </div>
</template>
<template id='mine'>
    <div>
        <h3>yokoso，这里是个人中心</h3>
    </div>
</template>
<script>
    const login = {
        template: '#login',
    }
    const register = {
        template: '#register',
    }
    const mine = {
        template: '#mine',
        created() {
            console.log(this.$route.query);
        },
    }
    const router = new VueRouter({
        routes: [
            {
                // 重定向
                path: '/',
                redirect: '/index'
            },
            {
                path: '/index',
                component: app,
            },
            {
                path: '/login',
                component: login,
            },
            {
                path: '/register/:id', 
                name: 'register'
                component: register,
            },
            {
                path: '/mine',
                component: mine,
            }
        ]
    })
    let vm = new Vue({
        el: '#app',
        data: {},
        methods: {},
        router,
    })
</script>
```

### 3.5 路由嵌套

使用路由嵌套后必须在父组件中写入`<router-view></router-view>`来给子组件预留位置

```
const routes = [
  {
    path: '/travel', component: TravelPage,
    children: [
      { path: '/travel/america', component: TravelAmericaPage },
      { path: '/travel/china', component: TravelChinaPage}
    ]
  },
  {
    path: '/about', component: AboutPage
  }
];
```

### 3.6 命名视图

命名视图可以做到一个地址对应多个组件

```html
<router-view></router-view>
    <div class='my-container'>
        <router-view name='sidebar'></router-view>
        <router-view name='main'></router-view>
    </div>
```

## 4. watch和computed

`watch`侦听属性：当data中的某个数据需要随其他数据的变化而变化时，更通用的方法是使用watch侦听器

```vue
watch: {
    firstName: function (val) {
      this.fullName = val + ' ' + this.lastName
    },
    lastName: function (val) {
      this.fullName = this.firstName + ' ' + val
    }
  }
```

`computed`计算属性：当需要对data的数据进行复杂逻辑操作的时候，应当使用computed属性

在computed里计算的属性不能生命在data中

```vue
computed: {
  Name: function () {
		//默认使用computed只有getter方法
        return this.firstName + ' ' + this.lastName
      	}
  fullName: {
    // getter
    get: function () {
      return this.firstName + ' ' + this.lastName
    },
    // setter
    set: function (newValue) {
      var names = newValue.split(' ')
      this.firstName = names[0]
      this.lastName = names[names.length - 1]
    }
  }
}
```

#### method、computed和watch的区别

1. `computed`属性的结果会被缓存，除非依赖的响应式属性变化才会重新计算。主要当作属性来使用,使用的时候不加（）；

2. `methods`方法表示一个具体的操作，主要书写业务逻辑；

3. `watch`一个对象，键是需要观察的表达式，值是对应回调函数。主要用来监听某些特定数据的变化，从而进行某些具体的业务逻辑操作；可以看作是computed和methods的结合体

