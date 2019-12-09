// pages/Software/Software.js
Page({
  data: {

  },
  onShareAppMessage: function () {  //转发给好友
    return {
      title: "转发给好友",
      path: "/pages/welcome/welcome"
    }
  },
  aboutus(){     //关于我们
    wx.navigateTo({
      url: '/pages/detailsArr/detailsArr',
    })
  },
  onShareAppMessage: function (res) {

    if (res.from === 'button') {
      // 来自页面内转发按钮
      return {
        title: goods_title,//标题
        path: '/page/details?id=' + goods_id,//路径
        imageUrl: goods_img //不设置则默认为当前页面的截图
      }
    }

  }
})