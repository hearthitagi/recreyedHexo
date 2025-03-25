---
title: nas docker alist配置
tags:
  - nas
  - docker
  - alist
categories:
  - 杂记
date: 2025-02-17 10:37:00
updated: 2025-02-17 10:37:00
cover: https://lsky.kissshot.site/img/2025/02/17/67b2ade614b23.webp
---
>主要用于通过复制的方式从云盘向nas传文件
# 1.安装

**docker compose**

前置工作（以qnapContainer Station为例）：

- Container共享文件夹下新建alist文件夹
- 创建需要alist映射到本地的共享文件夹，如（video，picture，files等）


```yaml
services:
  alist:
    image: 'xhofe/alist'
    container_name: alist
    volumes:
      - '/share/Container/alist:/opt/alist/data'
      - '/share/video:/video'
      - '/share/picture:/picture'
      - '/share/files:/files'
    ports:
      - '33127:5244'
    environment:
      - PUID=0
      - PGID=0
      - UMASK=022
    restart: unless-stopped
```

>注意：
>默认账号：admin
>默认密码：从启动日志中获取
>Successfully created the admin user and the initial password is: xxxxxx

# 2.配置
## 2.1 个人资料
修改用户名密码

## 2.2 用户
配置用户信息

## 2.3 存储
**添加**（以[阿里云](https://alist.nn.ci/zh/guide/drivers/aliyundrive_open.html)为例）

**挂载路径**：自定义

**缓存过期时间**：0（实时）或自定义

**根文件夹ID**：root

**刷新令牌**：[获取链接](https://alist.nn.ci/tool/aliyundrive/request)

---
**添加**（以[本机存储](https://alist.nn.ci/zh/guide/drivers/local.html)为例）

**挂载路径**：自定义

**根文件夹路径**：容器创建时docker compose挂载的路径
