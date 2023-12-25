---
title: ajax
tags:
  - ajax
categories:
  - 前端知识
abbrlink: c5a6a264
date: 2022-02-22 17:04:40
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
## 1. ajax简述

Asynchronous JavaScript + XML（异步JavaScript和XML）, 其本身不是一种新技术，而是一个在 2005年被Jesse James Garrett提出的新术语，用来描述一种使用现有技术集合的‘新’方法，包括: HTML 或 XHTML,  CSS, JavaScript, DOM, XML, XSLT, 以及最重要的 XMLHttpRequest。当使用结合了这些技术的AJAX模型以后， 网页应用能够快速地将增量更新呈现在用户界面上，而不需要重载（刷新）整个页面。这使得程序能够更快地回应用户的操作。

尽管X在Ajax中代表XML, 但由于JSON的许多优势，比如更加轻量以及作为Javascript的一部分，目前JSON的使用比XML更加普遍。JSON和XML都被用于在Ajax模型中打包信息

异步请求，局部刷新

### 1.1 ajax原理

<img src="https://img.hitagi.site/202211142240223.jpg" alt="ajax原理" style="zoom: 80%;" />

## 2. ajax语法

onreadystatechange事件

1. 当请求被发送到服务器时，我们需要执行一些基于响应的任务。。

2. 每当 readyState 改变时，就会触发 onreadystatechange 事件。

2. readyState 属性存有 XMLHttpRequest 的状态信息。

### 2.1 ajax状态码

| ajax状态码 | 含义                                                   |
| ---------- | ------------------------------------------------------ |
| 0          | (未初始化)还没有调用send()方法                         |
| 1          | (载入)已经调用send()方法，正在派发请求                 |
| 2          | (载入完成)send()已经执行完成，已经接收到全部的响应内容 |
| 3          | (交互)正在解析响应内容                                 |
| 4          | (完成)响应内容已经解析完成，用户可以调用               |

### 2.2 http状态码

| 1xx(临时响应)  | 表示临时响应并需要请求者继续执行操作的状态代码               |
| -------------- | ------------------------------------------------------------ |
| 100 (继续)     | 请求者应当继续提出请求。 服务器返回此代码表示已收到请求的第一部分，正在等待其余部分 |
| 101 (切换协议) | 请求者已要求服务器切换协议，服务器已确认并准备切换           |

| 2xx (成功)       | 表示成功处理了请求的状态代码                                |
| ---------------- | ----------------------------------------------------------- |
| 200 (成功)       | 服务器已成功处理了请求。 通常，这表示服务器提供了请求的网页 |
| 201 (已创建)     | 请求成功并且服务器创建了新的资源                            |
| 202 (已接受)     | 服务器已接受请求，但尚未处理                                |
| 203 (非授权信息) | 服务器已成功处理了请求，但返回的信息可能来自另一来源        |
| 204 (无内容)     | 服务器成功处理了请求，但没有返回任何内容                    |
| 205 (重置内容)   | 服务器成功处理了请求，但没有返回任何内容                    |
| 206 (部分内容)   | 服务器成功处理了部分 GET 请求                               |

| 3xx (重定向)       | 表示要完成请求，需要进一步操作。 通常，这些状态代码用来重定向 |
| ------------------ | ------------------------------------------------------------ |
| 300 (多种选择)     | 针对请求，服务器可执行多种操作。 服务器可根据请求者 (user agent) 选择一项操作，或提供操作列表供请求者选择 |
| 301 (永久移动)     | 请求的网页已永久移动到新位置。 服务器返回此响应(对 GET 或 HEAD 请求的响应)时，会自动将请求者转到新位置 |
| 302 (临时移动)     | 服务器目前从不同位置的网页响应请求，但请求者应继续使用原有位置来进行以后的请求 |
| 303 (查看其他位置) | 请求者应当对不同的位置使用单独的 GET 请求来检索响应时，服务器返回此代码 |
| 304 (未修改)       | 自从上次请求后，请求的网页未修改过。 服务器返回此响应时，不会返回网页内容 |
| 305 (使用代理)     | 请求者只能使用代理访问请求的网页。 如果服务器返回此响应，还表示请求者应使用代理 |
| 307 (临时重定向)   | 服务器目前从不同位置的网页响应请求，但请求者应继续使用原有位置来进行以后的请求 |

| 4xx(请求错误)            | 这些状态代码表示请求可能出错，妨碍了服务器的处理             |
| ------------------------ | ------------------------------------------------------------ |
| 400 (错误请求)           | 服务器不理解请求的语法                                       |
| 401 (未授权)             | 请求要求身份验证。 对于需要登录的网页，服务器可能返回此响应  |
| 403 (禁止)               | 服务器拒绝请求                                               |
| 404 (未找到)             | 服务器找不到请求的网页                                       |
| 405 (方法禁用)           | 禁用请求中指定的方法                                         |
| 406 (不接受)             | 无法使用请求的内容特性响应请求的网页                         |
| 407 (需要代理授权)       | 此状态代码与 401(未授权)类似，但指定请求者应当授权使用代理   |
| 408 (请求超时)           | 服务器等候请求时发生超时                                     |
| 409 (冲突)               | 服务器在完成请求时发生冲突。 服务器必须在响应中包含有关冲突的信息 |
| 410 (已删除)             | 如果请求的资源已永久删除，服务器就会返回此响应               |
| 411 (需要有效长度)       | 服务器不接受不含有效内容长度标头字段的请求                   |
| 412 (未满足前提条件)     | 服务器未满足请求者在请求中设置的其中一个前提条件             |
| 413 (请求实体过大)       | 服务器无法处理请求，因为请求实体过大，超出服务器的处理能力   |
| 414 (请求的 URI 过长)    | 请求的 URI(通常为网址)过长，服务器无法处理                   |
| 415 (不支持的媒体类型)   | 请求的格式不受请求页面的支持                                 |
| 416 (请求范围不符合要求) | 如果页面无法提供请求的范围，则服务器会返回此状态代码         |
| 417 (未满足期望值)       | 服务器未满足"期望"请求标头字段的要求                         |

| 5xx(服务器错误)         | 这些状态代码表示服务器在尝试处理请求时发生内部错误。 这些错误可能是服务器本身的错误，而不是请求出错 |
| ----------------------- | ------------------------------------------------------------ |
| 500 (服务器内部错误)    | 服务器遇到错误，无法完成请求                                 |
| 501 (尚未实施)          | 服务器不具备完成请求的功能。 例如，服务器无法识别请求方法时可能会返回此代码 |
| 502 (错误网关)          | 服务器作为网关或代理，从上游服务器收到无效响应               |
| 503 (服务不可用)        | 服务器目前无法使用(由于超载或停机维护)。 通常，这只是暂时状态 |
| 504 (网关超时)          | 服务器作为网关或代理，但是没有及时从上游服务器收到请求       |
| 505 (HTTP 版本不受支持) | 服务器不支持请求中所用的 HTTP 协议版本                       |

### 2.3 实例

以下通过实例的方式来演示ajax原生使用

- get请求

```html
<body>
    <div id='myDiv'></div>
</body>
<script>
// 兼容性处理
var xmlhttp;
if (window.XMLHttpRequest) {
    // IE7+,和其他浏览器
    xmlhttp = new XMLHttpRequest();
} else {
    // IE5,IE6
    xmlhttp = new ActiveXObject('Microsoft.XMLHTTP');
}
//ajax打开链接
xmlhttp.open(
    "GET",
    "http://wkt.myhope365.com/weChat/applet/course/banner/list?number=3",
    true
);
//ajax发送请求
xmlhttp.send();
//检测请求状态
xmlhttp.onreadystatechange = function () {
    if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
        let imgList = JSON.parse(xmlhttp.responseText).data;
        console.log(imgList);
        imgList.forEach((value) => {
            $('#myDiv')[0].innerHTML += `<img src=${value.imgUrl}>`;
        });
    }
}
</script>
```

- post请求

```html
<body>
    <div id='myDiv'></div>
</body>
<script>
// 兼容性处理
var xmlhttp;
if (window.XMLHttpRequest) {
    // IE7+,和其他浏览器
    xmlhttp = new XMLHttpRequest();
} else {
    // IE5,IE6
    xmlhttp = new ActiveXObject('Microsoft.XMLHTTP');
}
//ajax打开链接
xmlhttp.open(
    "POST",
    "http://wkt.myhope365.com//weChat/applet/course/list/type",
    true
);
// ajax设置请求头
xmlhttp.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded')
//ajax发送请求
xmlhttp.send("type=free&pageNum=1&pageSize=5");
//检测请求状态
xmlhttp.onreadystatechange = function () {
    if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
        console.log(JSON.parse(xmlhttp.responseText).rows);
        JSON.parse(xmlhttp.responseText).rows.forEach(item => {
            $('#myDiv')[0].innerHTML += `<dl class="course"><dt><img src="${item.coverFileUrl}"alt="" /></dt><dt>${item.courseTitle}</dt><dt>共${item.learningNum}节课|${item.participationsCount}人报名</dt><dt>免费</dt></dl>`
        });
    }
}
</script>
```

## 3. 引入jQuery的ajax实例

### 3.1 jquery-get

```html
<body>
    <div id='box'></div>
</body>
<script>
    $.get(
        'http://wkt.myhope365.com/weChat/applet/course/banner/list?number=5',
        function (data, status) {
            if (status == 'success') {
                data.data.forEach(item => {
                    $('#box').append(`<img src="${item.imgUrlPc}" alt="">`)
                });
            }
        }
    )
</script>
```

### 3.2 jquery-post

```html
<body>
    <div id='box'></div>
</body>
<script>
    // $.post()请求不能设置JOSN格式的请求头，所以请求头类型是JSON格式的话需要用$.ajax()
    $.post(
        "http://wkt.myhope365.com/weChat/applet/course/list/type", "type=free&pageNum=1&pageSize=10",
        function (data, status) {
            if (status == "success") {
                data.rows.forEach((item) => {
                    console.log(item.courseTitle);
                });
            }
        }
    );
    $.ajax({
        url: 'http://wkt.myhope365.com/weChat/applet/subject/list',
        type: 'POST',
        data: JSON.stringify({ enable: 1 }),
        contentType: 'application/json',
        success: function (res, status) {
            res.rows.forEach(item => {
                $('#box')[0].innerHTML += `<p>${item.title}</p>`
            });
        }
    })
</script>
```

ajax方法对象参数属性列表

| 属性名      | 含义                                                         |
| ----------- | ------------------------------------------------------------ |
| url         | 规定发送请求的 URL。默认是当前页面                           |
| type        | 规定请求的类型（GET 或 POST                                  |
| timeout     | 设置本地的请求超时时间（以毫秒计）                           |
| async       | 布尔值，表示请求是否异步处理。默认是 true                    |
| cache       | 布尔值，表示浏览器是否缓存被请求页面。默认是 true            |
| data        | 规定要发送到服务器的数据                                     |
| dataType    | 预期的服务器响应的数据类型                                   |
| contentType | 发送数据到服务器时所使用的内容类型。默认是："application/x-www-form-urlencoded" |

## 4. json

JSON 是存储和交换文本信息的语法。类似 XML。

JSON 比 XML 更小、更快，更易解析。

JSON 是轻量级的文本数据交换格式

### 4.1 JSON.parse和JSON.stringify

```js
JSON.parse('{ "name":"vivy", "ability":"sing"}')//将字符串传话为JSON对象
JSON.stringify({ "name":"vivy", "ability":"sing"});//将JSON对象转化为字符串
```

### 4.2 JSONP

JSON的一种使用模式，用来解决跨域问题；

- 同源策略

同源即协议、域名、端口号都相同。`http://`(同为http协议)`recreyed.com`(相同域名):`7070`(相同端口号)

随着互联网的发展，"同源政策"越来越严格。目前，如果非同源，共有三种行为受到限制。

> （1） Cookie、LocalStorage 和 IndexDB 无法读取。
>
> （2） DOM 无法获得。
>
> （3） AJAX 请求不能发送。

- 跨域

解决跨域问题的三种主要方式：

后台放开；jsonp；配置代理

后台放开:

```
response.setHeader("Access-Control-Allow-Origin", "*")
```

以后应该会写一篇解决跨域的总结
