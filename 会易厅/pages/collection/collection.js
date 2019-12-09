// pages/collection/collection.js
let app = getApp();
let base_url = app.base_url;
let base_url1 = app.base_url1;
let base_images = app.base_images;

Page({
  data: {
    image: base_images + "/wushuju.png",
    hide1: true,
    hide2: false
  },
  // 跳转到房间详情
  Detail(e) {
    console.log(e.currentTarget.dataset.roomid)
    wx.navigateTo({
      url: '/pages/Room_details/Room_details?roomID=' + e.currentTarget.dataset.roomid,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var opiens = wx.getStorageSync('UTR');
    this.setData({
      opiens
    })
    // 请求数据
    wx.request({
      url: base_url + '/v2.0/Blwzflc/getCollect',
      header: {
        userId: this.data.opiens.UserId,
        token: this.data.opiens.Token
      },
      method: "GET",
      success: res => {
        console.log(res.data.Value)
        const collection = res.data.Value
        this.setData({
          collection: collection,
        })
        console.log(collection)
        if (collection == null) {
          this.setData({
            hide1: false,
            hide2: true
          })
        }
      }
    })
  },
})