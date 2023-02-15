---
title: html基础
tags:
  - html
categories:
  - 前端知识
description:
  - 浏览器内核
  - 标签
  - 表格
  - 表单
  - h5
  - h5表单
  - h5音视频
copyright_url: 'https://recreyed.github.io/2022/01/26/html/'
abbrlink: 1a147173
date: 2022-01-26 15:01:00
updated: 2022-01-28 09:23:00
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
copyright_info:
mathjax:
katex:
aplayer:
highlight_shrink:
aside:
---
## 1. 常用编辑器
dreamweaver、sublime、webstorm、Hbuilder、vscode
## 2. 浏览器内核
分为渲染引擎和JS引擎  
渲染引擎：它负责取得网页的内容（HTML、XML、图像等等）、整理讯息（例如加入CSS 等），以及计算网页的显示方式，然后会输出至显示器或打印机  
JS引擎：JS引擎则是解析Javascript语言，执行javascript语言来实现网页的动态效果
- IE: Trident
- Firefox: Gecko
- Chrome: Webkit 到 Blink
- Safari: Webkit
- Opera: Presto 到 Webkit 到 Blink
## 3. 标签
```html
<b>粗体</b> <strong></strong>
<i>斜体</i> <em></em>
<s>删除</s> <del></del>
<u>下划</u> <ins></ins>
<img src="图片路径" alt="出错显示信息">
<a href="跳转链接" target="_blank">_blank在新窗口中打开</a>
<!-- 锚点定位 -->
<a href="#one"></a>
<p id="one">段落</p>
<ul><!-- 有序列表 -->
	<li></li>
</ul>
<ol><!-- 无序列表 -->
	<li></li>
</ol>
<dl><!-- 自定义列表 -->
	<dt></dt>
</dl>
```
![特殊字符](https://img.recreyed.tk/202211142245421.jpg)
## 4. 表格
align对齐方式、border边框宽度、cellspacing单元格间距、cellpadding单元格内边距  

合并单元格的步骤
1. 先判断是跨行(rowspan)还是跨列(colspan)
2. 把属性名和合并的行数写在第一个要合并的单元格上
3. 把多余的单元格注释掉
```html
<table align="center" border="1" cellspacing="0" cellpadding="10">
    <caption>年中工资报表</caption>
    <thead>
        <tr>
            <th>标题1</th>
            <th>标题2</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td rowspan="2" colspan="2">abc</td>
            <!-- <td>跨列注释掉</td> -->
        </tr>
        <tr>
            <!-- <td>跨行注释掉</td> -->
            <td>abc</td>
        </tr>
    </tbody>
</table>
```
## 5. 表单
action提交的地址、method提交的方式、name表单名字
```html
<form action="https://www.baidu.com" method="GET" name="form1">
    <div>
        <label for="user">姓名</label>
        <input type="text" id="user" value="默认值" placeholder="提示信息">
    </div>
    <div>
        <label for="pwd">密码</label>
        <input type="password" id="pwd" size="30">
    </div>
    <!-- 单选框，选中checked -->
    <input type="radio" name="sex" checked><span>男</span>
    <!-- 多选框 -->
    <input type="checkbox" checked><span>1</span>
    <input type="checkbox"><span>2</span>
    </div>
    <!-- 下拉框，选中selected -->
    <select name="" id="">
        <option value="">石家庄</option>
        <option value="" selected>迁安</option>
    </select>
    <!-- 多行文本框 row长 cols宽 -->
    <textarea name="" id="" cols="30" rows="7"></textarea>
    <input type="reset" value="重新设置">
    <input type="button" value="普通按钮">
    <input type="submit" value="提交按钮">
</form>
```
## 6. HTML5
```html
<header>头部标签</header>
<!-- 导航标签 -->
<nav>
    <ul>
        <li><a href="#">导航标签链接1</a></li>
        <li><a href="#">导航标签链接2</a></li>
    </ul>
</nav>
<section>小节标签</section>
<!-- 侧边栏标签aside -->
<aside>
    <ul>
        <li>侧边栏</li>
    </ul>
</aside>    
<article>文章标签</article>
<footer>尾部标签</footer>
<!-- 进度条标签 -->
<progress max="600" value="100"></progress>
```

## 7. HTML5-form

```html
<form action="#" method="GET" name="form-1">
    <!-- h5选择框 -->
    <input type="text" list="l1">
    <datalist id="l1">
        <option value="op3"></option>
        <option value="op4"></option>
        <option value="op5"></option>
    </datalist>
    <button>h5普通按钮</button>
    <section>小节标签，类div</section>
    <label for="user">姓名</label>
    <!-- placeholder：占位符、required：不能为空、autofocus：自动获取焦点、autocomplete：自动完成 -->
    <input type="text" id="user" name="user" placeholder="占位符" required autofocus autocomplete="off">
    <label for="pwd">密码</label>
    <!-- maxlength最大长度 -->
    <input type="password" id="pwd" name="pwd" placeholder="占位符" maxlength="6" minlength="3">
    <!-- 新增table属性 -->
    <label for="">邮箱</label>
    <input type="email" autocomplete="off">
    <label for="">地址</label>
    <input type="url" name="" id="">
    <!-- 颜色选择器 -->
    <input type="color">
    <label for="">搜索框</label>
    <input type="search" placeholder="输入搜索内容">
    <label for="">时间</label>
    <input type="time" name="" id="">
    <label for="">日期</label>
    <input type="date" name="" id="">
    <label for="">月份</label>
    <input type="month" name="" id="">
    <label for="">周</label>
    <input type="week" name="" id="">
</form>
```
## 8. HTML5-media
控件controls、循环loop、静音muted
```html
<audio src="音频地址" controls loop muted></audio>
<audio controls>
    <source src="">
</audio>
<video src="" controls loop muted width="200" height="300"></video>
```