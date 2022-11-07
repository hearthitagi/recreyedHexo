---
title: 毕业设计技术总结 02
date: 2022-02-28 14:42:12
updated:
tags:
     - 毕业设计
     - mongoose
categories:
     - 技术回顾
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
## 2、mongoose
[mongoose](https://mongoosejs.com/docs/index.html)是node.js中操作mongodb的第三方库，它比原始的mongodb更方便，易用
### 2.1 连接
`mongoose.createConnection`第一个参数为mongodb地址,第二个是字符串解析器配置，第三个为回调函数。`mongoose.createConnection`有很多参数，只有地址为必选，其余都为可选
```javascript
// host:域名(本地为localhost)
// port:端口号(mongodb默认为27017)
// dbname:数据库名称 
const db = mongoose.createConnection(
    `mongodb://${configObj.host}:${configObj.port}/${configObj.dbname}`,
    { useNewUrlParser: true, useUnifiedTopology: true },
    (err) => {
    if (err) { console.log('数据库连接失败',configObj); return;}
    console.log('数据库连接成功');
})
```

## 3、express

## 4、在vue项目中的应用