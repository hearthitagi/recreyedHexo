---
title: javaScript嵌套函数return
tags:
  - javaScript
categories:
  - 代码
date: 2022-03-31 15:23:20
updated: 2022-03-31 15:23:20
cover:
---
在遇到树形结构数据，js进行遍历时，return不会跳出整个函数。需要用到throw
```javascript
check(list){
   for (const item of list) {
       if (item.name=='张三孙') {//这里可以校验其他情况
           console.log(item.name);
           //...一些操作
           // 这里return并不会跳除整个check()函数，可以使用throw
           throw true;
       }
       if (item.child) {
           this.check(item.child);
       }
   } 
}
//另一个组件，或者需要检测check()函数返回的其他地方
let arr = [
    {
        name:'张三',
        child:[
            {
                name:'张三子',
                child:[
                    {
                        name:'张三孙',
                    }
                ]
            }
        ]
    }
]
try {
    this.check(arr);
} catch (stat) {
    if (stat) { return; }
}
```