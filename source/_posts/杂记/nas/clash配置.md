---
title: nas docker clash配置
tags:
  - nas
  - docker
  - clash
categories:
  - 杂记
date: 2025-02-17 11:37:00
abbrlink: 5df89f22
cover: https://lsky.kissshot.site/img/2025/02/17/67b2b3314d412.webp
---
>主要用于nas和docker容器科学上网
# 1.安装

**docker compose**

前置工作（以qnapContainer Station为例）：

- Container共享文件夹下新建clash文件夹


```yaml
services:
  alist:
    image: 'dreamacro/clash'
    container_name: clash
    volumes:
      - '/share/Container/clash:/root/.config/clash'
    ports:
      - '7890:7890'
    restart: unless-stopped
```

# 2.配置
## 2.1 获取配置文件
>dns、proxies、proxy-groups、rules根据自己的订阅或节点修改
```yaml
ipv6: true
mixed-port: 7890
udp: true
allow-lan: true
bind-address: '*'
mode: rule
log-level: info
external-controller: '127.0.0.1:9090'
unified-delay: true
secret: ''
experimental:
    ignore-resolve-fail: true
cfw-latency-timeout: 8000
cfw-latency-url: 'https://www.gstatic.com/generate_204'
cfw-conn-break-strategy: true
dns:
proxies:
proxy-groups:
rules:
```

## 2.2 替换配置文件
将上述文件保存`config.yaml`，替换/share/Container/clash中的同名配置文件；若没有则新增

