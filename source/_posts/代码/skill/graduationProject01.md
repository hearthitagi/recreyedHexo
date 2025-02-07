---
title: 毕业设计技术总结 01
tags:
  - mongoDB
  - mongoose
categories:
  - 代码
description:
  - mongoDB
  - 概念
  - 基础CURD命令
abbrlink: af473d59
date: 2022-02-22 17:14:07
updated:
keywords:
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
## 1、mongoDB
[中文文档](https://docs.mongoing.com/)  
MongoDB是一种面向文档的数据库管理系统，是专为可扩展性，高性能和高可用性而设计的数据库。
### 1.1概念

- 文档：mongodb将数据以BSON文档的形式存储，每一行数据即为一个文档，文档的值可以是任意BSON类型，或者是嵌套的其他文档，数组和文档数组；相当于关系数据库的行。  
- 集合：MongoDB将文档存储在集合中。集合类似于关系数据库中的表。

### 1.2 基本CURD命令
#### 插入文档
`db.collection.insertOne()`将单个文档插入集合中。
```javascript
db.inventory.insertOne({ //mode为集合名
    item: "canvas", qty: 100, tags: ["cotton"], 
    size: { h: 28, w: 35.5, uom: "cm" } 
})
```
`db.collection.insertMany()`可以将多个文档插入一个集合中, 将文档数组传递给该方法
```javascript
db.inventory.insertMany([
    { item: "journal", qty: 25 }, 
    { item: "mat", qty: 85 },
    { item: "mousepad", qty: 25 }
])
```
#### 查询文档
`db.inventory.find({})`查询集合中的所有文档  
`db.inventory.find({ status: "D" })`查询集合中status等于'D'的文档  
使用查询操作符：查询集合中status等于'A'或'D'的文档  
`db.inventory.find({ status: {$in: ["A","D"]} })`  
[查询操作符](https://docs.mongodb.com/manual/reference/operator/query/)
|  Name   |               描述               |
| :-----: | :------------------------------: |
|   $eq   |                =                 |
|   $gt   |                >                 |
|  $gte   |                >=                |
|   $in   |    查询包含数组中任一值的文档    |
|  $nin   |   查询不包含数组中任一值的文档   |
|   $lt   |                <                 |
|  $lte   |                <=                |
|   $ne   |                !=                |
|  $and   |               and                |
|   $or   |                or                |
|  $not   |    匹配不符合查询表达式的文档    |
|  $nor   |  匹配两个查询子句都不符合的文档  |
| $exists |      匹配具有指定字段的文档      |
|  $type  | 如果字段属于指定类型，则选择文档 |

#### 更新文档
`db.collection.updateOne()`更新单个文档
```javascript
//更新集合中item等于paper的第一个文档,将这个文档的status设置为'p'
//如果status不存在，则会创建该字段
db.inventory.updateOne( 
    { item: "paper" },
    { $set: { status: "P" } }
)
```
`db.collection.updateMany()`更新多个文档
```javascript
//更新集合中score<60的所有文档,将这个文档的status设置为'p'
db.inventory.updateMany( 
    { score: { $lt: 60 } },
    { $set: { status: "P" } }
)
```
[更新操作符](https://docs.mongodb.com/manual/reference/operator/update/)  
|     Name     |                     描述                     |
| :----------: | :------------------------------------------: |
| $currentDate | 将字段的值设置为当前日期，可以是日期或时间戳 |
|     $inc     |           将字段的值增加指定的数量           |
|     $min     |     仅当指定值小于现有字段值时才更新字段     |
|     $max     |     仅当指定值大于现有字段值时才更新字段     |
|     $mul     |           将字段的值乘以指定的数量           |
|   $rename    |                  重命名字段                  |
|     $set     |              设置文档中字段的值              |
|    $unset    |            从文档中删除指定的字段            |
`db.collection.replaceOne()`替换`_id`字段以外的文档的全部内容
```javascript
//更新集合中item等于paper的第一个文档,将这个文档除_id字段以外的所有字段替换成第二个参数
db.inventory.replaceOne(
   { item: "paper" },
   { item: "paper", instock: [1,2,3] }
)
```
#### 删除文档
`db.collection.deleteMany({}) `删除所有文档  
`db.collection.deleteMany({ status : "A" })`删除所有status等于"A"的文档  
`db.collection.deleteOne( { status: "D" } )`删除status等于"D"的第一个文档

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