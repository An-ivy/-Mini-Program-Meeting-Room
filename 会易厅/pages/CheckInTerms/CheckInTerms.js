// pages/CheckInTerms/CheckInTerms.js
const app=getApp();
const base_http=app.base_http;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    
  },
  getTermsData() {
    wx.request({
      url: base_http + '/v2.0/agreement/checkInHotel',
      data: '',
      header: {},
      method: 'GET',
      dataType: 'json',
      responseType: 'text',
      success: (res) => {
        console.log(res)
        let dataValue = res.data.Value;
        if (res.data.Status === true) {
          console.log(dataValue)
          this.setData({
            dataValue
          })
        }
      },

    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getTermsData()
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