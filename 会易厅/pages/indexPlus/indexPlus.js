// pages/indexPlus/indexPlus.js
Page({
  data: {
  },
  // 从选房页面接收数据
  onLoad: function (options) {
    console.log(options)
    var that = this;
    var s1 = new Array();
    s1 = JSON.parse(options.ss);
    that.setData({
      s1: s1
    });
    console.log(s1)
  },
  // 跳转页面到房间详情
  jump: function () {
    wx.navigateTo({
      url: '/pages/Room_details/Room_details',
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})