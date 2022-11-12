---
title: vue基础 02
date: 2022-02-22 17:07:46
updated:
tags:
    - vue
categories:
    - 前端知识
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
## 1. 过滤器

过滤器可被用在插值表达式中和v-bind:中

```html
<!-- 变量 | 过滤器名 -->
{{ message | capitalize }}
<div v-bind:id="rawId | formatId"></div>
```

过滤器可分为全局过滤器和私有过滤器器

全局过滤器所有vue实例对象都能引用；私有过滤器只有在自己的实例化vue对象中能引用

- 全局过滤器(格式化时间)

```js
{{item.time | dataFormat('YYYY/MM/DD')}}
//带参数的过滤器
//data是引用过滤器的变量
//format的实参是过滤器dataFormat('YYYY/MM/DD')传的字符串
Vue.filter('dataFormat', function (data, format) {
    var dt = new Date(data);
    var y = dt.getFullYear();
    var m = (dt.getMonth() + 1).toString().padStart(2, '0');
    var d = dt.getDate().toString().padStart(2, '0');
    return format.replace('YYYY', y).replace('MM', m).replace('DD', d);
});
```

- 私有过滤器

```js
new Vue({
    el: '#app',
    filters: {
        dateFormat(data, format) {...}
    }
});
```

## 2. 键盘修饰符

Vue 允许为 `v-on` 在监听键盘事件时添加按键修饰符

- 使用键盘码

`<button v-on:keyup.65="change"></button>`

键盘码对照表

| **字母和数字键的键码值(keyCode)** |      |      |      |      |      |      |      |
| --------------------------------- | ---- | ---- | ---- | ---- | ---- | ---- | ---- |
| 按键                              | 键码 | 按键 | 键码 | 按键 | 键码 | 按键 | 键码 |
| A                                 | 65   | J    | 74   | S    | 83   | 1    | 49   |
| B                                 | 66   | K    | 75   | T    | 84   | 2    | 50   |
| C                                 | 67   | L    | 76   | U    | 85   | 3    | 51   |
| D                                 | 68   | M    | 77   | V    | 86   | 4    | 52   |
| E                                 | 69   | N    | 78   | W    | 87   | 5    | 53   |
| F                                 | 70   | O    | 79   | X    | 88   | 6    | 54   |
| G                                 | 71   | P    | 80   | Y    | 89   | 7    | 55   |
| H                                 | 72   | Q    | 81   | Z    | 90   | 8    | 56   |
| I                                 | 73   | R    | 82   | 0    | 48   | 9    | 57   |

------

| **数字键盘上的键的键码值(keyCode)** | **功能键键码值(keyCode)** |       |      |      |      |      |      |
| ----------------------------------- | ------------------------- | ----- | ---- | ---- | ---- | ---- | ---- |
| 按键                                | 键码                      | 按键  | 键码 | 按键 | 键码 | 按键 | 键码 |
| 0                                   | 96                        | 8     | 104  | F1   | 112  | F7   | 118  |
| 1                                   | 97                        | 9     | 105  | F2   | 113  | F8   | 119  |
| 2                                   | 98                        | *     | 106  | F3   | 114  | F9   | 120  |
| 3                                   | 99                        | +     | 107  | F4   | 115  | F10  | 121  |
| 4                                   | 100                       | Enter | 108  | F5   | 116  | F11  | 122  |
| 5                                   | 101                       | -     | 109  | F6   | 117  | F12  | 123  |
| 6                                   | 102                       | .     | 110  |      |      |      |      |
| 7                                   | 103                       | /     | 111  |      |      |      |      |

------

| **控制键键码值(keyCode)** |      |            |      |             |      |      |      |
| ------------------------- | ---- | ---------- | ---- | ----------- | ---- | ---- | ---- |
| 按键                      | 键码 | 按键       | 键码 | 按键        | 键码 | 按键 | 键码 |
| BackSpace                 | 8    | Esc        | 27   | Right Arrow | 39   | -_   | 189  |
| Tab                       | 9    | Spacebar   | 32   | Dw Arrow    | 40   | .>   | 190  |
| Clear                     | 12   | Page Up    | 33   | Insert      | 45   | /?   | 191  |
| Enter                     | 13   | Page Down  | 34   | Delete      | 46   | `~   | 192  |
| Shift                     | 16   | End        | 35   | Num Lock    | 144  | [{   | 219  |
| Control                   | 17   | Home       | 36   | ;:          | 186  | /\|  | 220  |
| Alt                       | 18   | Left Arrow | 37   | =+          | 187  | ]}   | 221  |
| Cape Lock                 | 20   | Up Arrow   | 38   | ,<          | 188  | '"   | 222  |

- 使用别名

`v-on:keyup.enter`

`.enter`、`.tab`、`.delete` (“删除”和“退格”键)、`.esc`、`.space`

`.up`、`.down`、`.left`、`.right`

- 自定义按键别名

`Vue.config.keyCodes.f1 = 112`

新版可以直接监听键盘按键

监听键盘a按下：`v-on:keyup.a`

## 3. 自定义指令

directive

自定义指令的三个钩子方法

- bind 只调用一次，指令第一次绑定到元素时调用。在这里可以进行一次性的初始化设置

- inserted 这个元素已经渲染到界面上之后执行

- update 当元素有更新的时候执行

钩子函数的一些参数

el：指令所绑定的元素，可以用来直接操作 DOM 。

binding：一个对象，包含以下属性：

​	name：指令名，不包括 v- 前缀。

​	value：指令的绑定值，例如：v-my-directive="1 + 1" 中，绑定值为 2。

​	oldValue：指令绑定的前一个值，仅在 update 和 componentUpdated钩子中可用

自定义指令也分为全局自定义指令和私有自定义指令

```vue
// 注册一个全局自定义指令 `v-focus`
Vue.directive('focus', {
  bind(el,binding){}
  // 当被绑定的元素插入到 DOM 中时……
  inserted(el) {
    // 聚焦元素
    el.focus()
  }
})
```

```
new Vue({
    el: '#app',
    directives: {
        focus: {
            inserted(el) {
                el.focus();
            },
        }
    }
})
```

