---
title: backblaze图床管理工具
tags:
  - vue
  - express
categories:
  - 博客
description:
cover: 
abbrlink: 5951a346
date: 2023-04-19 14:41:41
updated:
keywords:


---
基于vue3前端，express作中间件，vercel部署的backblaze图床管理工具开发记录。

项目地址：[bz-view](https://github.com/hearthitagi/bz-view)
## 1、存储桶配置，参考[这个文档](https://blazeb2.js.org/guide/prepare.html)
### 1.1、[注册](https://www.backblaze.com/b2/sign-up.html)并[登录](https://secure.backblaze.com/user_signin.htm)Backblaze存储桶

### 1.2、创建一个桶，并修改桶设定，生成Key
### 1.3、查看存储桶友好url
### 1.4、cloudflare配置，参考[这篇文章](https://www.ivu4e.com/blog/cld-services/2022-06-18/1249.html)
## 2、图床管理工具开发
### 2.1、前端vue3，参考[github代码](https://github.com/hearthitagi/bz-view)
### 2.2、中间件express代理请求
因backblaze存储桶api有动态变化，采用个人比较熟悉的express来进行接口代理请求。
### 2.3、vercel部署express，并用cloudflare加速
写好的[express代码](https://github.com/hearthitagi/bz-view/tree/main/serve)部署到vercel：
1. 新建`vercel.json`
```json
{
  "version": 2,
  "builds": [
      {
          "src": "./index.js",
          "use": "@vercel/node"
      }
  ],
  "routes": [
      {
          "src": "/(.*)",
          "dest": "/"
      }
  ]
}
```
2. 选择部署仓库，[链接](https://vercel.com/new/clone?s=https://github.com/hearthitagi/bz-view/tree/serve)

3. 最为关键的，在前端打包好，放到expres静态文件中时，`.js`后缀改为`.mjs`。html中的引用路径也修改。