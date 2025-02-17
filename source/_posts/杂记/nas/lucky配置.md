---
title: nas docker lucky配置
tags:
  - nas
  - docker
  - lucky
categories:
  - 杂记
date: 2025-02-11 13:16:00
abbrlink: f402307
cover: https://lsky.kissshot.site/img/2025/02/17/67b29e0d87828.webp
updated:
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

>注意：
>网络环境必须为host，详见[常见问题与反馈](https://lucky666.cn/docs/problemset)
>默认登陆地址 : http://IP地址:16601
>默认账号：666
>默认密码：666

# 2.配置
## 2.1 设置

修改外网访问，监听端口，管理账号密码
## 2.2 动态域名

 **从cloudflare获取具有编辑dns权限的token** 

创建完成后保存token
![|501x303](https://lsky.kissshot.site/img/2025/02/14/67aea56f750b3.png)

**添加任务**
![|309x392](https://lsky.kissshot.site/img/2025/02/14/67aeb6f01fb32.png)

**添加同步记录**（此为三级通配符域名，主域名添加类似）
![|314x331](https://lsky.kissshot.site/img/2025/02/14/67aeb61abdf40.png)

## 2.3 SSl/TLS证书
**添加证书**
![|309x316](https://lsky.kissshot.site/img/2025/02/14/67aeb82d6e587.png)
## 2.4 web服务
**添加Web服务规则**
![|337x350](https://lsky.kissshot.site/img/2025/02/14/67aeba00115d3.png)

**添加子规则**
![|328x422](https://lsky.kissshot.site/img/2025/02/14/67aebb8c426c5.png)

**（可选）添加重定向**

作用：可免去输入`https://`，直接输入域名即可跳转

添加Web服务规则，除TLS必须关闭，其余与2.4第一步保持一致

默认规则中：服务类型选重定向；默认目标地址输入`https://{hostAndPort}`；其余随意
## 2.5 STUN内网穿透

>网络类型必须为NAT1（全锥形网络）
>参考教程：
>[「LUCKY STUN穿透」使用Cloudflare的页面规则固定和隐藏网页端口](https://www.bilibili.com/opus/953960881273700352)
>[「扩展篇」使用Cloudflare的重定向规则传递资源路径和查询字符串](https://www.bilibili.com/opus/971100369193009187)

**添加穿透规则**（需要在主路由中配置端口转发）
![|406x325](https://lsky.kissshot.site/img/2025/02/14/67aec444e8755.png)

**添加IPV4配置**

参考2.2，2.4的内容添加一套IPV4的配置

>注意区别：
>**2.2添加任务**开启IPV4，关闭IPV6
>**2.2添加同步记录**记录类型选择A类型，记录内容填写`{ipv4Addr}`
>IPV4添加两条记录`*.example.com`和`*.stun.example.com`，前者为重定向前，后者为重定向后
>**2.4添加Web服务规则**勾选tcp4，取消勾选tcp6
>**2.4添加子规则**前端地址填写重定向后的域名，如`alist.stun.example.com`。后端地址同IPV6
>**2.4添加重定向**不必为IPV4配置，使用下文中cloudflare的重定向

## 2.6 固定穿透IP
 
 **从cloudflare获取重定向权限的token** 

创建完成后保存token
![|526x280](https://lsky.kissshot.site/img/2025/02/14/67aecfbbf3de7.png)

**创建重定向规则**

规则-概述-重定向规则-创建规则

规则名称：随意；

自定义筛选表达式：主机名-通配符-二级通配符域名，如`*.example.com`

url重定向：动态-表达式`wildcard_replace(http.request.full_uri, "*://*.example.com/*", "https://${2}.stun.example.com:6666/${3}")`-状态码302

> example.com替换成自己的主域名

![|568x420](https://lsky.kissshot.site/img/2025/02/14/67aed1552a4bb.png)

**点击保存前打开F12，找到如下图类似的请求，复制请求网址**
![|573x161](https://lsky.kissshot.site/img/2025/02/14/67aed3e984731.png)



**STUN内网穿透启用Webhook**

请求地址：`https://api.cloudflare.com/client/v4/zones/区域ID/rulesets/规则集ID/rules/规则ID`

请求方法：PATCH

请求头： 
```json
Authorization: Bearer kgaThYAjGd0_FhOkc8H3ljwJlQ97iW2y6LGbOMNK
Content-Type: application/json
```
请求体：
```json
//将其中example.com替换成自己的域名
{
  "description": "stun-redirect",
  "expression": "(http.host wildcard \"*.example.com\")",
  "action": "redirect",
  "action_parameters": {
    "from_value": {
      "status_code": 302,
      "target_url": {
        "expression": "wildcard_replace(http.request.full_uri, \"*://*.example.com/*\", \"https://${2}.stun.example.com:#{port}/${3}\")"
      },
      "preserve_query_string": true
    }
  }
}
```

关闭**禁用接口调用成功字符串检测**

**接口调用成功包含的字符串**输入`"success": true`


