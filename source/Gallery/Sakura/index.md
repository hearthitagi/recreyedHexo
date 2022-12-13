---
title: Sakura
date: 2022-12-09 17:05:42
updated:
type:
comments:
description:
keywords:
top_img:
mathjax:
katex:
aside:
aplayer:
highlight_shrink:
---
{% note info  %}
温馨提示：点击可以查看图片，`电脑端拖动图片/手机端长按图片` 可以实现切换壁纸哦~
{% endnote %}
{% gallery %}
![](https://img.recreyed.ml/202211142334890.jpg)
![](https://img.recreyed.ml/202211142234217.jpg)
![](https://img.recreyed.ml/202211142225482.jpg)
![](https://img.recreyed.ml/202211142225451.jpg)
![](https://img.recreyed.ml/202211142223334.jpg)
![](https://img.recreyed.ml/categories-4.jpg)
![](https://img.recreyed.ml/categories-3.jpg)
![](https://img.recreyed.ml/categories-2.jpg)
![](https://img.recreyed.ml/categories-1.jpg)
{% endgallery %}

<script>
let time = ''
let imgbox = document.querySelector('.fj-gallery')
imgbox.addEventListener('contextmenu', e => e.preventDefault())
imgbox.addEventListener('dragend', e => { changeBg('url(' + e.target.src + ')'); })
imgbox.addEventListener('touchstart', e => { time = setTimeout(() => { changeBg('url(' + e.target.src + ')'); }, 500); })
imgbox.addEventListener('touchend', ()=>{clearTimeout(time)})
</script>