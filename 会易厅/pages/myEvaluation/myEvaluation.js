// pages/myevaluation/evaluation.js
let app=getApp();
let base_url = app.base_url;
let base_images = app.base_images;
// let base_url1 = app.base_url1;
var opiens = wx.getStorageSync('UTR')
Page({
  data: {
    Pj: ['未评价', '已评价'],
    newIndex: 0,
    newList: '',
    flt: true,
    flt1: false,
    UserName: [],
    wjxs: ['☆', '☆', '☆', '☆', '☆'],
    image: base_images  + "/wushuju.png",
    hide: true
  },
  pingJia() {
    // console.log("12321")
    wx.navigateTo({
      url: '../evaluate/evaluate',
    })
  },
  myClickPinja(e) {
    // console.log(e.currentTarget.dataset.index)
    //获取下表
    const newIndex = e.currentTarget.dataset.index;
    // 未评价
    if (newIndex == 1) {
      this.setData({
        flt: false
      })
    } else {
      this.setData({
        flt: true
      })
    }
    // 已评价
    if (newIndex == 0) {
      this.setData({
        flt1: false
      })
    } else {
      this.setData({
        flt1: true
      })
    }
    // 更新状态
    this.setData({
      newIndex
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 调取未评价的数据
    this.wpjGget()
    //已评价
    this.ypGet()
  },
  //未评价调用数据
  wpjGget() {
    this.setData({
      id: 1
    })
    wx.request({
      url: base_url + '/v2.0/Blwzflc/getNoappraise',
      header: {
        userId: opiens.UserId,
        token: opiens.Token
      },
      success: res => {
        const list = res.data.Value
        this.setData({
          newList: list
        })
      }
    })
  },
  // 已评价
  ypGet() {
    wx.request({
      url: base_url + '/v2.0/Blwzflc/getAppraise',
      header: {
        userId: opiens.UserId,
        token: opiens.Token
      },
      success: res => {
        console.log(res)
        console.log(res.data.Value)
        //取出数据
        this.setData({
          UserName: res.data.Value
        })
      }
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