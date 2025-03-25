---
title: 毕业设计技术总结 02
tags:
  - mongoDB
  - express
categories:
  - 代码
abbrlink: 41495c75
date: 2022-03-18 18:07:52
keywords:
description:
cover:
---
> 此篇开始简略描述实现过程
> 此篇只负责流程，错误解决待之后整理
## 1、服务器篇
部署环境为阿里云服务器，操作系统：Centos 8

### 1.1 安装mongoDB
在此之前，由于在2021年12月31日，CentOS 8操作系统版本结束了生命周期，CentOS 8的源地址`http://mirror.centos.org/centos/8/`内容已移除。所以继续使用阿里云默认源会报错，所以需要换源配置。 

详见这篇文章 [CentOS 8 EOL如何切换源](https://help.aliyun.com/document_detail/405635.html) 

`sudo vim /etc/yum.repos.d/mongodb-org.repo`
```conf
[mongodb-org-5.0]
name=MongoDB Repository
baseurl=https://repo.mongodb.org/yum/redhat/$releasever/mongodb-org/5.0/x86_64/
gpgcheck=1
enabled=1
gpgkey=https://www.mongodb.org/static/pgp/server-5.0.asc
```
`sudo dnf install mongodb-org`  

`sudo systemctl enable mongod --now`  

**验证安装 `mongo`**

MongoDB配置文件名为mongod.conf，位于/etc目录中。  
对于生产环境，建议取消对安全性部分的注释并启用授权
```conf
security:
  authorization: enabled
```
重启mongod服务`sudo systemctl restart mongod`

### 1.2 创建mongoDB管理员
`mongo`  
`use admin`  
`switched to db admin`  
**使用userAdminAnyDatabase角色创建新用户**
```shell
db.createUser(
  {
    user: "username", 
    pwd: "password", 
    roles: [ { role: "userAdminAnyDatabase", db: "admin" } ]
  }
)
```
`quit()`  

`mongo -u username -p --authenticationDatabase admin`
```shell
MongoDB shell version v5.0.5
Enter password: 
```
`use admin`  

`show users`

### 1.3 安装express
`npm i express-generator -g`
**选择express项目的位置，创建express(serve为项目名)**  
```shell
cd /opt
express serve
```
**安装框架依赖模块**  
```shell
cd serve
npm install
```
启动/访问测试 `npm start`  

访问服务器地址的3000端口`http://59.110.xxx.xx:3000`

### 1.4 连接数据库/模块化
serve根目录下创建`common/config.json`
```json
//mode为mongodb集合名称
{
    "db_config": {
        "host": "localhost",
        "port": 27017,
        "dbname": "mode"
    }
}
```
`npm i mongoose`  

**创建文件**`common/db.js`
```javascript
// 导入mongoose
const mongoose = require('mongoose');
// 导入配置文件
const configObj = require(process.cwd() + "/common/config.json").db_config
// 连接数据库
const db = mongoose.createConnection(
    `mongodb://${configObj.host}:${configObj.port}/${configObj.dbname}`,
    { useNewUrlParser: true, useUnifiedTopology: true },
    (err) => {
        if (err) { console.log('数据库连接失败：', configObj); return;}
        console.log('数据库连接成功');
    })
// 声明全局变量  全局都可以用
global.db = db
```
**创建文件**`common/utils.js`
```javascript
/**
 * 接口响应
 * @param {Object} res      响应对象
 * @param {Number} code     状态码
 * @param {String} message  提示信息
 * @param {mixed}  data     响应数据
 */
global.sendJson = (res, state, message, data = null) => {
    res.send({ state,message,data });
}
```
**app.js中引入数据库配置**
```javascript
// 在入口文件app.js头部引入
require(process.cwd() + '/common/db.js')
require(process.cwd() + '/common/utils.js')
```
### 1.5 express路由
**创建文件** `routes/posts.js`
```javascript
var express = require('express');
var router = express.Router();
router.post('/', function(req,res,next) {
    res.send("response data")
})
module.exports = router;
```
`app.js`中导入、激活路由
```javascript
var postsRouter = require('./routes/posts');//导入
app.use('/postList', postsRouter);//激活
```
### 1.6 后端利用MVC,代码分离
**创建`model/posts.js`,获取数据**
```javascript
const postsModel = db.model('posts', {
    avatar: { type: String },
    categoryId: { type: Number },
    createTime: { type: String },
    title: { type: String },
    updateTime: { type: String },
    userId: { type: String },
    userName: { type: String },
    content: { type: String },
    coverImgUrl: { type: String },
    readNum: { type: Number },
    zan: { type: Number },
}, 'posts')
// 贴子列表的查询
const postList = () => {
    return postsModel.find()
        .then(res => { return res })
        .catch(err => { console.log('查询错误：' + err); return null })
}
module.exports = {
    postList,postsModel
}
```
**修改`controller/posts.js`，获取model数据并处理**
```javascript
const { postList } = require(process.cwd() + "/model/posts")

const getPostList = async (req, res) => {
    let postData = await postList();
    if(req.body.postsId){ //根据贴子id查询
        postData = postData.filter((value)=>{ 
            return value.postsId == req.body.postsId })
    }
    if (req.body.title) { //根据贴子标题查询
        postData = postData.filter((value)=>{ 
            return value.title.includes(req.body.title) })
    }
    if (req.body.categoryId) { //根据贴子分类查询
        postData = postData.filter((value)=>{ 
            return value.categoryId == req.body.categoryId })
    }
    if (req.body.pageNum && req.body.pageSize) { //根据页码查询
        postData = postData.splice( (req.body.pageNum-1)*req.body.pageSize,req.body.pageSize )
    }
    sendJson(res, 200, "操作成功", {total:postData.length,rows:postData})
}
module.exports = {
    getPostList
}
```
**修改`routes/posts.js`**
```javascript
var express = require('express');
var router = express.Router();
// 引入controller/posts.js中的方法
const { getPostList } = require(process.cwd() + '/controller/posts')
router.post('/', getPostList)
module.exports = router;
```
### 1.7 post接口传参与文件上传
#### 1.7.1 post传参
> 上文中的`req.body.postsId`,`req.body.title`等
> 拿到的是前端post请求传递的参数，需要引入express中间件
> 
> 创建express项目时，也自动下载了body-parser这个包，可直接使用

`npm install body-parser`  

```javascript
//app.js文件头部
const bodyParser = require('body-parser')
```
#### 1.7.2 文件上传
> 需要文件上传操作时，需要使用multer这个包来获取上传的信息

`npm install multer`  

详细使用参考[github文档](https://github.com/expressjs/multer/blob/master/doc/README-zh-cn.md)  

`controller/saveImage.js`中
```javascript
let multer = require('multer');//multer插件
// 磁盘存储
let storage = multer.diskStorage({
    destination:(req, file, cb)=>{
    //存入目标文件夹
    cb(null, './public/images')
    },
    filename:(req, file, cb)=> {
    //重命名
    cb(null, `${Date.now()}-${file.originalname}`)
    }
  })
const upload = multer({ storage:storage })

const getSaveImage =  (req, res) => {
    let url = `http://59.110.124.95:3000/images/${req.file.filename}`
    sendJson(res, 200, "上传成功", Object.assign(req.file,{ url }))
}
module.exports = {
    getSaveImage,upload
}
```
`routes/posts.js`中
```javascript
var express = require('express');
var router = express.Router();

const { getSaveImage,upload } = require(process.cwd() + '/controller/saveImage');
// 传单个文件
router.post('/',upload.single('file'), getSaveImage);

module.exports = router;
```

post请求传参与express中间件参考：[Express中间件,bodyparser,multer,formidable区别浅谈](https://www.jianshu.com/p/828fdf02de06)  

## 2、前端设计