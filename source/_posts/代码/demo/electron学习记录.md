---
title: electron学习记录
tags:
  - electron
categories:
  - 代码
abbrlink: d98589a8
date: 2024-12-23 11:00:57
cover: https://lsky.kissshot.site/img/2025/02/17/67b29eacb7048.webp
---
[demo仓库](https://github.com/hearthitagi/electron-demo)
# 1. 安装
`npm init`
修改package.json为以下内容
```json
// package.json
{
  "name": "electron-demo",
  "version": "1.0.0",
  "description": "demo",
  "main": "main.js",
  "scripts": {
    "start": "electron .",
    "build": "electron-builder",
    "build:icon": "electron-icon-builder --input=./public/icon.png --output=release --flatten"
  },
  "author": {
    "name": "cai",
    "email": "your-email.com",
  },
  "license": "ISC"
}
```
安装`electron`、打包工具`electron-builder`和图标打包工具`electron-icon-builder`

`npm install -D electron electron-builder electron-icon-builder`

配置打包内容
```json
// package.json
{
  "build": {
    "appId": "com.kissshot.electrondemo",
    "productName": "ElectronDemo",
    "directories": {
      "output": "dist"
    },
    "linux": {
      "icon": "./release/icons",
      "target": "deb",
      "category": "Utility"
    },
    "deb": {
      "afterInstall": "./entries/install.sh"
    },
    "extraFiles": [
      {
        "from": "entries",
        "to": "entries"
      }
    ],
    "win": {
      "icon": "./release/icons",
      "target": ["nsis","zip"]
    },
    "nsis": {
      "oneClick": false,
      "perMachine": false,
      "allowElevation": true,
      "allowToChangeInstallationDirectory": true,
      "createDesktopShortcut": true,
      "createStartMenuShortcut": false,
      "deleteAppDataOnUninstall": true
    }
  }
}
```
# 2. 基本配置
## 2.1 打包准备
- 图标
  根据`package.json`中script的配置，新建文件夹public放入图片icon.png
- linux
  新建文件夹entries编写脚本文件install.sh。在linux中，electron在沙箱中运行，安装时给沙箱更改所有者并设置权限
    ```shell
    #! /bin/sh
    # 设置 chrome-sandbox 的所有者为 root 并设置正确的权限
    # 确保使用正确的路径到您的 chrome-sandbox 文件
    chromeSandboxPath="/opt/ElectronDemo/chrome-sandbox"
    # 检查 chrome-sandbox 文件是否存在
    if [ -f "$chromeSandboxPath" ]; then
      # 更改所有者为 root
      chown root:root "$chromeSandboxPath"
      # 设置权限为 4755
      chmod 4755 "$chromeSandboxPath"
      echo "chrome-sandbox 权限和所有者已设置。"
    else
      echo "警告：未找到 chrome-sandbox 文件：$chromeSandboxPath"
    fi
    ```
## 2.2 新建main.js,分平台编写代码
```javascript
const { app, BrowserWindow, Menu } = require('electron')
const path = require('node:path')
app.commandLine.appendSwitch('ignore-certificate-errors') // 忽略证书错误

const createWindow = () => {
  Menu.setApplicationMenu(null)
  // 根据不同的操作系统选择不同的 preload 文件
  let preloadPath = '';
  switch (process.platform) {
    case 'win32': // Windows
      preloadPath = path.join(__dirname, 'platform/win32/win32Preload.js');
      break;
    case 'linux': // Linux
      preloadPath = path.join(__dirname, 'platform/linux/linuxPreload.js');
      break;
  }
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: preloadPath,  // 动态选择 preload 文件
      contextIsolation: true, // 必须启用上下文隔离
      nodeIntegration: false, // 禁用 Node.js 集成
    }
  })

  // 加载 index.html
  if (process.platform === 'win32') {
    mainWindow.loadFile('./paltform/win32/win32.html')
    // 打开开发工具
    mainWindow.webContents.openDevTools()
  } else if (process.platform === 'linux') {
    mainWindow.loadFile('./paltform/linux/linux.html')
  }
}
app.whenReady().then(() => {
  createWindow()
  // macOS
  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})
// win linux
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit()
})


// 在当前文件中你可以引入所有的主进程代码 也可以拆分成几个文件，然后用 require 导入。
let platformCode
if (process.platform === 'win32') {
  platformCode = require('./paltform/win32/win32Main.js')
} else if (process.platform === 'linux') {
  platformCode = require('./paltform/linux/linuxMain.js')
}
platformCode()
```
目录结构
```
project-name/
│
├── platform/
│   ├── linux/
│   │   └── linux.html
│   │   └── linuxMain.js
│   │   └── linuxPreload.js
│   │   └── linuxRenderer.js
│   ├── win32/
│   │   └── win32.html
│   │   └── win32Main.js
│   │   └── win32Preload.js
│   │   └── win32Renderer.js
│
...
```
# 3. 进程间通信
main为主进程代码，renderer为子进程（渲染进程代码），preload为进程通信控制代码
- invoke/handle
  适用于渲染进程向主进程提交异步请求并期待返回的情况，例如接口请求，命令执行
- send/on
  适用于单线发送消息的情况，类似udp