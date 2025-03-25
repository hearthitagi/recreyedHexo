---
title: js文件格式相互转换
tags:
  - javaScript
categories:
  - 代码
date: 2024-12-03 12:42:27
updated: 2024-12-03 12:42:27
cover:
---
```javascript
// base64转blob
const b64ToBlob = async(base64, type = 'application/octet-stream') =>{
    return await (await fetch(`data:${type};base64,${base64}`)).blob()
}
// blob转base64
const blobToB64 = (blob) => new Promise((resolve, reject) => {
    const reader = new FileReader(); 
    reader.onerror = reject();
    reader.onload = () => {
        resolve(reader.result);
    };
    reader.readAsDataURL(blob);
});
// file转blob
const fileToBlob = async(file) => {
  return await (await fetch(URL.createObjectURL(file))).blob();
}
// 或者
const fileToBlob = async(file) =>{
  const reader = new FileReader();
  const result = await new Promise((resolve, reject) => {
    reader.onload = () => {
      resolve(reader.result);
    };
    reader.onerror = () => {
      reject(reader.error);
    };
    reader.readAsArrayBuffer(file);
  });
  return new Blob([result], { type: file.type });
}
// blob转file
function blobToFile(blob, fileName) {
  const file = new File([blob], fileName, { type: blob.type });
  return file;
}
//文件下载 blob或file
function download(blob, fileName) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = fileName;
  a.click();
  document.removeChild(a);
  URL.revokeObjectURL(url);
}
/* 获取文件夹下所有图片
参数 1.路径 2.是否遍历子目录 3.正则
本例中遍历获取的是assets/avatar目录下所有的.webp格式的图片
*/
const files = require.context("@/assets/avatar", true, /\.webp$/).keys();
files.forEach((item, index) => {
  this.avatarList.push({ code: `${index}`, url: require("../../../assets/avatar" + item.slice(1)) })
});
```
