---
title: node
tags:
  - node
categories:
  - 代码
date: 2022-02-22 17:06:17
updated: 2022-02-22 17:06:17
cover:
---
## 1. 介绍

node是javaScript的运行环境，可以解析和执行javaScript代码

node没有BOM和DOM，只有EcmaScript

node特性：事件驱动；非阻塞的I/O模型；轻量高效

## 2. npm

npm是node的包管理工具；用来管理javaScript相关的包

**npm镜像源配置**  

因为npm默认镜像地址是国外地址，所以改成国内的淘宝镜像

`npm config set registry http://registry.npmmirror.com`

**安装包**  

npm install -g全局安装 --save/-S生产环境 -dev/-D开发环境

## 3. 核心模块

### 3.1 读写文件

```js
var fs = require('fs');
//读文件
fs.readFile('./demo.html',function (error,data) {
    //成功输出data，失败输出error
    console.log(error); console.log(data.toString());
})
//写文件
fs.writeFile('./demo.html','写入的东西',function (error) {
    console.log(error); console.log(data.toString());
})
//读文件夹
fs.readdir('./node',function (error,data) {
    // 失败输出error,成功输出目录下文件/文件夹名数组
    console.log(error); console.log(data);    
})
```

### 3.2 http服务

四步走：

1. 加载http核心模块
2. 创建一个Web服务器
3. 注册request请求事件
4. 绑定端口号，启动服务器

```js
var http = require('http');
var  sever = http.createServer();
sever.on('request',function (request,response) {
    console.log('注册请求事件');             
})
server.listen(3000,function () {
    console.log('请求成功了访问:localhost:3000');    
})
//链式调用
http.createServer().on('request',function (request,response) {
    console.log('注册请求事件');             
}).listen(3000,function () {
    console.log('请求成功了访问:localhost:3000');    
})
```

### 3.3 模板引擎art-template

**核心方法**  

```js
// 基于模板名渲染模板
template(filename, data);
// 将模板源代码编译成函数
template.compile(source, options);
// 将模板源代码编译成函数并立即执行
template.render(source, data, options);//source 模板文件、data需要导入模板的数据
```

**常用语句**  

```html
<!-- 单 if 判断 -->
{{if value}} 
... 
{{/if}}
<!-- if ... else ... 判断 -->
{{if v1}} 
... 
{{else if v2}}
 ... 
{{/if}}
<!-- 循环 -->
{{each target}}
  {{$index}} {{$value}}
{{/each}}
<!-- 原生语法 -->
<% for (var i = 0; i < target.length; i++) { %>
<%= i %> <%= target[i] %>
<% } %>
```

> `target`是一个数组，`each`用于对数组遍历，`$index` 是数组的下标， `$value`是数组的值

**浏览器下使用（单html文件）**  

```html
<script src="https://npm.elemecdn.com/art-template@4.13.2/lib/template-web.js"></script>
<body>
    <div id="container"></div>
</body>
<!-- 创建 script 标签创建模板,注意下面几点 -->
    <!-- 1. type="text/该斜杠后可以是 html,template... 不是script即可)" -->
    <!-- 2. 给 script 标签添加 id ，此 id 即为模板 id -->
    <!-- 3.模板 script 标签必须在 template() 方法调用的 script 标签之前 -->
<script type="text/html" id="tpl">
    {{if user}}
    <h2>{{user.name}}</h2>
    {{/if}}
</script>
<script>
    var user = {
        name: 'Template username'
    }
    var html = template('tpl', {user: user})
    var container = document.querySelector('#container');
    container.innerHTML = html;
</script>
```

**node下使用**  

```html
<tbody>
    {{each commentsList}}
    <tr>
        <td><span>{{$value.name}}</span></td>
    </tr>
    {{/each}}
</tbody>
```

```js
let result = [{name:vivy},{name:violet},{name:hitaki}]
let html = template.render(data.toString(), { commentsList: results})
//第二个参数为对象
```

### 3.4 mysql

**引入流程**  

```js
var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'kkk',
    database: 'comment'
});
connection.connect();
let sql = 'SELECT * FROM comments';
connection.query(sql, function (error, results) {
    if (error) throw error;
    console.log(results);
});
connection.end();
```

**sql增删改查语句**  

```sql
selelt * from table;//查询所有
insert into table (id,name) values (1,'vivy');//插入数据
delete from table where id = 1;//删除数据
update table set id = 2, name = 'vivy' where id =1;//修改数据
```

