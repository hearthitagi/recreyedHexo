---
title: lucky配置记录
tags:
  - nas
  - docker
categories:
  - 杂记
date: 2025-02-11 13:16:00
abbrlink: f402307
cover: 
updated: 
description:
---
# 1.安装

**docker compose**

前置工作（以威联通Container Station为例）：

- Container共享文件夹下新建lucky文件夹
```yaml
services:
	lucky:
	image: gdy666/lucky
	container_name: lucky
	volumes:
		- /share/Container/lucky:/goodluck
	network_mode: host
	restart: always
```

> 注意：
> 网络环境必须为host，详见[常见问题与反馈](https://lucky666.cn/docs/problemset)
> 默认登陆地址 : http://IP地址:16601
> 默认账号：666
> 默认密码：666

# 2.配置
## 2.1 设置
修改外网访问，监听端口，管理账号密码
## 2.2 动态域名
### 2.2.1 IPV6
添加任务
<img src="https://lsky.kissshot.site/img/2025/02/14/67aea56f750b3.png" alt="1739498847732.png" title="1739498847732.png" />


## 2.3 SSl/TLS证书
## 2.4 web服务
## 2.5  STUN内网穿透
