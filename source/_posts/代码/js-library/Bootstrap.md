---
title: Bootstrap
tags:
  - BootStrap
categories:
  - 代码
abbrlink: d352c4d3
date: 2022-02-22 17:05:54
updated:
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
## 1. 介绍

bootstrap是开源前端模板工具集，是由Twitter公司的两名前端工程师开发的

特点是：根据类名引用工具，移动端优先

[官方下载文档](https://github.com/twbs/bootstrap/releases/download/v3.4.1/bootstrap-3.4.1-dist.zip)

[jsdelivr下载](https://www.jsdelivr.com/package/npm/bootstrap?version=3.4.1&path=dist)

> 线上CDN地址
>
> https://npm.elemecdn.com/bootstrap@3.4.1/dist/js/bootstrap.min.js
>
> https://npm.elemecdn.com/bootstrap@3.4.1/dist/css/bootstrap.min.css

##  2. 使用

bootstrap是基于jQuery开发的，所以在引入bootstrap的js文件前要先引入jQuery

```html
<script src="https://npm.elemecdn.com/jquery@3.5.1/dist/jquery.min.js"></script>
<script src="https://npm.elemecdn.com/bootstrap@3.4.1/dist/js/bootstrap.min.js"></script>
<link rel="stylesheet" href="https://npm.elemecdn.com/bootstrap@3.4.1/dist/css/bootstrap.min.css">
```

具体类名引用参考[bootstrap3官方文档](https://v3.bootcss.com/css/)或[菜鸟教程](https://www.runoob.com/bootstrap/bootstrap-grid-system.html)

这里列举几个常用的组件

### 2.1 网格系统

网格系统是将container容器内以网格的形式分成12列，可根据不同设备屏幕大小的差异来规划内同所占的列数

由于bootstrap是移动设备优先，所以屏幕大小不同时是向上兼容的

```html
<div class="container">
   <div class="row">
      <div class="col-xs-n"></div>
      <div class="col-xs-n"></div>      
   </div>
   <div class="row">
      <div class="col-xs-n"></div>
      <div class="col-xs-n"></div> 
   </div>
</div>
```

|                       | 超小屏幕 手机 (<768px) | 小屏幕 平板 (≥768px) | 中等屏幕 桌面显示器 (≥992px) | 大屏幕 大桌面显示器 (≥1200px) |
| :-------------------- | :--------------------- | :------------------- | :--------------------------- | :---------------------------- |
| `.container` 最大宽度 | None （自动）          | 750px                | 970px                        | 1170px                        |
| 类前缀                | `.col-xs-`             | `.col-sm-`           | `.col-md-`                   | `.col-lg-`                    |

- 响应式

可以配合clearfix类和响应式工具类来实现响应式显示/隐藏元素；显示时可以后接`-block`或`-inline-block`来设置显示模式

| 显示       | 隐藏      |
| ---------- | --------- |
| visible-xs | hidden-xs |
| visible-sm | hidden-sm |
| visible-md | hidden-md |
| visible-lg | hidden-lg |

- 列偏移

可以使用`col-md-offset-n`来设置当前元素在网格系统中便宜的列数

```html
<!-- xs大小时每个div占六列，每行显示两个;sm大小及以上时每个div占3列,每行显示4个 -->
<!-- xs大小时第一个div左侧偏移两列,本身占4列 -->
<!-- xs大小时后面两个div隐藏 -->
<div class="container">
    <div class="row">
        <div class="col-xs-offset-2 col-xs-4 col-sm-3">
            <p>123</p>
        </div>
        <div class="col-xs-6 col-sm-3">
            <p>123</p>
        </div>
        <div class="clearfix hidden-xs col-xs-6 col-sm-3">
            <p>123</p>
        </div>
        <div class="clearfix hidden-xs col-xs-6 col-sm-3">
            <p>123</p>
        </div>
    </div>
</div>
```

### 2.2 表格

```html
<!-- table 基本表、table-bordered 表格带边框、table-hover鼠标悬停有浅灰色背景、table-condensed 表格更紧凑、table-responsive 响应式表格 -->
<table class="table table-bordered table-hover table-condensed table-responsive">
    <caption>表头</caption>
    <thead>
        <tr>
            <th>名称</th>
            <th>城市</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>Tanmay</td>
            <td>Bangalore</td>
        </tr>
        <tr>
            <td>Sachin</td>
            <td>Mumbai</td>
        </tr>
    </tbody>
</table>
```

### 2.3 表单

```html
<!-- 水平排列的表单 -->
<!-- <form class="form-inline"> -->
<!-- 纵向排列的表单 -->
<form class="form-horizontal">
    <!-- 通过为表单添加 .form-horizontal 类，并联合使用 Bootstrap 预置的栅格类，可以将 label 标签和控件组水平并排布局。这样做将改变 .form-group 的行为，使其表现为栅格系统中的行（row），因此就无需再额外添加 .row 了 -->
  <div class="form-group">
    <label for="user" class="col-sm-2 control-label">用户名</label>
    <div class="col-sm-10">
      <input type="text" class="form-control" id="user" placeholder="username">
    </div>
  </div>
  <div class="form-group">
    <label for="password" class="col-sm-2 control-label">密码</label>
    <div class="col-sm-10">
      <input type="password" class="form-control" id="password" placeholder="Password">
    </div>
  </div>
  <div class="form-group">
    <div class="col-sm-offset-2 col-sm-10">
      <button type="submit" class="btn btn-default">Sign in</button>
    </div>
  </div>
</form>
```

其余常用组件慢慢整理；目前先用这些

## 3. 插件

### 3.1 模态框

```html
<!-- 触发模态框 -->
<button class="btn btn-default" data-toggle="modal" data-target="#mod1">
	模态框
</button>
<!-- 模态框（Modal） -->
<div class="modal fade" id="mod1">
		<div class="modal-content">
			<div class="modal-header">
				<button type="button" class="close" data-dismiss="modal">&times;</button>
				模态框标题
			</div>
			<div class="modal-body">
				模态框主体
			</div>
			<div class="modal-footer">
				模态框底部
				<button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>
				<button type="button" class="btn btn-primary">确定</button>
			</div>
		</div>
</div>
```

3.2 tab切换

```html
<ul class="nav nav-tabs">
	<li><a class="active" href="#tab1" data-toggle="tab">菜鸟教程</a></li>
	<li><a href="#tab2" data-toggle="tab">iOS</a></li>
</ul>
<div class="tab-content">
	<div class="tab-pane fade in active" id="tab1">
		tab1的内容
	</div>
	<div class="tab-pane fade" id="tab2">
		tab2的内容
	</div>
</div>
```

