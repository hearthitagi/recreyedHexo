---
title: vue多页面构建
tags:
  - vue
categories:
  - 前端知识
description: vue多页面实现案例
cover: 'https://img.hitagi.site/96475bde-c9b9-453d-af03-c81267192811.webp'
abbrlink: '5325484'
date: 2022-12-09 14:44:55
updated:
keywords:

top_img:
comments:
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
具体实现后续补充  
参考内容：[Vue 项目构建与开发入门](https://www.kancloud.cn/sllyli/vueproject/1244252)  
代码仓库：[vue-mpa-demo](https://github.com/hearthitagi/vue-mpa-demo)  
## 目录结构
> ├── node_modules               # 项目依赖包目录  
> ├── build                      # 项目 webpack 功能目录  
> ├── config                     # 项目配置项文件夹  
> ├── src                        # 前端资源目录  
> │   ├── images                 # 图片目录  
> │   ├── components             # 公共组件目录  
> │   ├── pages                  # 页面目录  
> │   │   ├── page1              # page1 目录  
> │   │   │   ├── components     # page1 组件目录  
> │   │   │   ├── router         # page1 路由目录  
> │   │   │   ├── views          # page1 页面目录  
> │   │   │   ├── page1.html     # page1 html 模板  
> │   │   │   ├── page1.vue      # page1 vue 配置文件  
> │   │   │   └── page1.js       # page1 入口文件  
> │   │   ├── page2              # page2 目录  
> │   │   └── index              # index 目录  
> │   ├── common                 # 公共方法目录  
> │   └── store                  # 状态管理 store 目录  
> ├── .gitignore                 # git 忽略文件  
> ├── .env                       # 全局环境配置文件  
> ├── .env.dev                   # 开发环境配置文件  
> ├── .postcssrc.js              # postcss 配置文件  
> ├── babel.config.js            # babel 配置文件  
> ├── package.json               # 包管理文件  
> ├── vue.config.js              # CLI 配置文件  
> └── yarn.lock                  # yarn 依赖信息文件  

## 改造内容
。。。