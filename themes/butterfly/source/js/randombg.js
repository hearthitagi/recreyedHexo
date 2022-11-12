//随机背景图片数组,图片可以换成图床链接，注意最后一条后面不要有逗号
var backimg =[
    "url(https://f004.backblazeb2.com/file/recreyed/hexo/63e5a771-8126-4e3d-a4fd-7c0ccafe0ab5.jpeg)",
    "url(https://f004.backblazeb2.com/file/recreyed/hexo/84bbd08f-3b2b-4afc-b52f-aad101b0128e.jpeg)",
    "url(https://f004.backblazeb2.com/file/recreyed/hexo/5e0596f2-3891-4a3f-a698-763e4f49f567.jpeg)",
    "url(https://f004.backblazeb2.com/file/recreyed/hexo/378d0dfd-6724-4f9a-90ca-15a2d8052143.jpeg)",
    "url(https://f004.backblazeb2.com/file/recreyed/hexo/db1b57c8-2b26-45d3-a277-535a612d57b4.jpeg)"
  ];
  //获取背景图片总数，生成随机数
  var bgindex =Math.floor(Math.random() * backimg.length);
  //重设背景图片
  document.getElementById("web_bg").style.backgroundImage = backimg[bgindex];
  //随机banner数组,图片可以换成图床链接，注意最后一条后面不要有逗号
  var bannerimg =[
    
  ];
  //获取banner图片总数，生成随机数
  var bannerindex =Math.floor(Math.random() * bannerimg.length);
  //重设banner图片
  document.getElementById("page-header").style.backgroundImage = bannerimg[bannerindex];