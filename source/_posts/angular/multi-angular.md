---
title: 多模块angular项目的搭建
date: 2022-10-13 13:38:13
updated:
tags:
    - angular
categories:
    - 前端框架
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
[参考文章](https://segmentfault.com/a/1190000021711128)  
[示例链接](https://github.com/recreyed/angular-multi-application)  

## 创建项目
1. 三个选项意为不创建Application，不进行交互，跳过依赖的安装  
`ng new project-name --createApplication=false --interactive=false --skipInstall=true`
2. 创建库和应用
`ng g library library --skipInstall=true`
`ng g application sso --style=lcss --routing=true --skipInstall=true`
3. 安装依赖
`npm install`

## 引用本地公共库

library作为公共库，可以编写一些常用框架或组件。  
可以将其发布到npm仓库，也可以本地引用。本地引用如下:  

- 打包
`ng build library`
- 在module模块中引用
```javascript
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LibraryModule } from 'library';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    LibraryModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
```
