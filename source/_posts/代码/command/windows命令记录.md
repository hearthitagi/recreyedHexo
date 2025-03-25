---
title: windows命令记录
tags:
  - windows
categories:
  - 代码
date: 2025-03-24 13:17:00
cover: https://lsky.kissshot.site/img/2025/03/24/67e1171d7248e.webp
---
# 网络
## 添加webdav磁盘映射

`net use Z: \\[WebDAV服务器地址]\[共享文件夹] /user:[用户名] [密码] /persistent:yes`

>`Z:` 是您要分配给 WebDAV 共享的驱动器字母（可以更改为任何未使用的字母）。
>`/persistent:yes`持久连接
>`[WebDAV服务器地址]` 是 WebDAV 服务器的 URL 地址（如 `http://example.com/webdav`）。
>`[共享文件夹]` 是 WebDAV 共享的文件夹路径。
>`[用户名]` 和 `[密码]` 是登录 WebDAV 服务器的凭据（如果需要）。


`net use Z: /del`删除已创建的网络地址映射

## 输出文件夹内指定拓展名的所有文件名

`dir /b /s *.扩展名 > 输出文件名.txt`

>/b：仅显示文件名（不包含文件大小、日期等信息）
>/s：递归搜索子目录中的文件（若不需要子目录则省略此参数）
>*.扩展名：通配符过滤指定后缀
>`>`：将结果输出到指定文本文件


