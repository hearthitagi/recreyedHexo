---
title: nas docker qbittorrent配置
tags:
  - nas
  - docker
  - qbittorrent
categories:
  - 代码
date: 2025-03-25 16:46:00 
cover: https://lsky.kissshot.site/img/2025/03/24/67e1171d73f23.webp
---
# 1.安装

前置工作（以qnap Container Station为例）：

- Container共享文件夹下新建qbittorrent文件夹

```yaml
services:
  qbittorrent:
    image: linuxserver/qbittorrent
    container_name: qbittorrent
    volumes:
      - /share/Container/qbittorrent/config:/config
      - /share/video:/video #自定义
    ports:
      - 33128:8080
    restart: unless-stopped
```

# 2.Track List

设置-BitTorrent-自动附加这些tracker到新下载

[ngosang / trackerslist](https://github.com/ngosang/trackerslist)

[XIU2 / TrackersListCollection](https://github.com/XIU2/TrackersListCollection)

[DeSireFire / animeTrackerList](https://github.com/DeSireFire/animeTrackerList)

