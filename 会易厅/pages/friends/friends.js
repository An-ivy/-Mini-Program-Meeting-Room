// pages/friends/friends.js
let app = getApp();
let base_url1 = app.base_url1;
let base_images = app.base_images;
Page({
  data:{
    pic: base_images +'/yaoqinghaoyou1.png'
  },
  onShareAppMessage: function () {
    return {
      title: "转发给好友",
      imageUrl: "/images/home_index.png",
      path: "/pages/welcome/welcome"
    }
  }

})