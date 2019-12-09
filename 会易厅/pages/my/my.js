// pages/my/my.js
let app = getApp();
let base_url = app.base_url
let base_images = app.base_images;
Page({
  data: {
    image: base_images + '/touxiangbeijing.jpg', //背景图
    collect: base_images + '/wodeshouchang.png',
    path: base_images + '/zhufhanglicheng.png',
    content: base_images + '/wodepingjia.png',
    friend: base_images + '/yaoqinghaoyou.png',
    volume: base_images + '/youhuijuan.png',
    vip: base_images + '/huiyuan.png',
    opinion: base_images + '/yijianfankui.png',
    software: base_images + '/shezhitubiao.png',
    circle: base_images + '/pinglunhongse.png',
    logInFo:'登录'
  },
  // 跳转到我的收藏
  navto1() {
    wx.navigateTo({
      url: '/pages/collection/collection',
    })
  },
  // 跳转到住房历程
  navto2() {
    wx.navigateTo({
      url: '/pages/course/course',
    })
  },
  // 跳转到我的评价
  navto3() {
    wx.navigateTo({
      url: '/pages/myEvaluation/myEvaluation',
    })
  },
  // 跳转到邀请好友
  navto4() {
    wx.navigateTo({
      url: '/pages/friends/friends',
    })
  },
  // 跳转到优惠券
  navto5() {
    wx.navigateTo({
      url: '/pages/volume/volume',
    })
  },
  // 跳转到会员
  navto6() {
    wx.navigateTo({
      url: '/pages/memberVip/memberVip',
    })
  },
  // 跳转到意见反馈
  navto7() {
    wx.navigateTo({
      url: '/pages/opinion/opinion',
    })
  },
  // 跳转到设置
  navto8() {
    wx.navigateTo({
      url: '/pages/Software/Software',
    })
  },

  // 点击头像跳转到个人信息
  Toown() {
    if (!this.data.opiens.Token) {
      wx.navigateTo({
        url: '/pages/login/login',
      })
    }else{
      wx.navigateTo({
        url: '/pages/own/own',
      })
    }

  },
  /**
   * 获取头像数据
   */
  getUserInformance() {

    wx.request({
      url: base_url + '/v2.0/profile/userprofile',
      header: {
        token: this.data.opiens.Token,
        userId: this.data.opiens.UserId,
      },
      method: 'GET',
      dataType: 'json',
      responseType: 'text',
      success: (res) => {
        this.setData({
          userInfo: res.data.Value
        })
      },
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var opiens = wx.getStorageSync('UTR')
    console.log(opiens.Token) 
      this.setData({
        opiens
      })
      this.getUserInformance() // 获取头像数据

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    //判断是否执行过
    var opiens = wx.getStorageSync('UTR')
    this.setData({
      opiens
    })
    this.getUserInformance() // 获取头像数据
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})