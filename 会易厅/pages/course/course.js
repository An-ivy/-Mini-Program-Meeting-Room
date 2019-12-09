// pages/course/course.js
let app = getApp();
let base_url = app.base_url;
let base_url1 = app.base_url1;
let base_images = app.base_images;

Page({
  data: {
    image: base_images + "/wushuju.png", //无数据图片
    hide1: true,
    hideorder: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var opiens = wx.getStorageSync('UTR');
    this.setData({
      opiens
    })
    this._getData() // 获取页面的数据
  },

  // 获取页面的数据
  _getData() {
    wx.request({
      url: base_url + '/v2.0/getRoomMessage/getRoomProgress',
      header: {
        userId: this.data.opiens.UserId,
        token: this.data.opiens.Token
      },
      data: {},
      success: res => {
        console.log(res)
        const value = res.data.Value //取出数据
        console.log(value)
        // this.setData({ value})
        if (value !== null) {
          this.setData({
            value: value,
            hide1: !this.data.hide1
          })
        }
      }
    })
  },
  /* 跳转到房间详情 */
  toRoomDetail(e) {
    console.log(e.currentTarget.dataset.id)
    let roomID = e.currentTarget.dataset.id
    wx.navigateTo({
      url: '/pages/Room_details/Room_details?roomID=' + roomID,
    })
  },
  // 跳转到订单详情
  todetails(e) {
    console.log(e)
    console.log(e.currentTarget.dataset.id)
    var orderid = e.currentTarget.dataset.id
    console.log(orderid)
    wx.navigateTo({
      url: '/pages/orderstatus/orderstatus?OrderId=' + orderid,
    })
  },
})