// pages/orderstatus/orderstatus.js
let app = getApp();
let base_url = app.base_url;
var opiens = wx.getStorageSync('UTR')

Page({
  data: {
    showModal: false,
    hide:true
  },
  // 跳转订单明细
  toDetailed(){
    wx.navigateTo({
      url: '/pages/orderdetialed/orderdetialed?orderId=' + this.data.orderid,
    })
  },
  // 打开弹出层
  submit: function () {
    this.setData({
      showModal: true
    })
  },
  preventTouchMove: function () {

  },
// 关闭弹出层
  go: function () {
    this.setData({
      showModal: false
    })
  },
  // 跳转房间详情
  toroomdetail(){
    wx.navigateTo({
      url: '/pages/Room_details/Room_details?roomID=' + this.data.dataTo.RoomId,
    })

  },
  // 退款
  tuikuan(){
    console.log(this.data.orderid)
    var info_ = { orderId: this.data.orderid}
    var info = JSON.stringify(info_)
    wx.request({
      url: base_url+'/v2.0/Blwzflc/applicationForRefund',
      method: "POST",
      header: {
        userId: opiens.UserId,
        //23,
      },
      data:info,
      success: res => {
        console.log(res)
        const Msg = res.data.Value.Msg
        const succeed = res.data.Value.Succeed
        if (succeed==false){
          wx.showModal({
            title: '退款失败',
            content: Msg,
          })
        }else{
          wx.showModal({
            title: '退款成功',
            content: Msg,
          })
        }
  
      }
    })
  },
  onLoad: function (options) {
    // console.log(NaN=="0")
    console.log(options)
    var orderid = options.OrderId
    this.setData({
      orderid
    })
    console.log(orderid)
  // 请求页面数据
  wx.request({
    url: base_url + '/v2.0/heart/progressStatus?orderId=' + this.data.orderid,
    method:"GET",
    header:{
      userId: opiens.UserId,
      token: opiens.Token
    },
    success:res=>{   
      console.log(res)
      const dataTo = res.data.Value
      this.setData({dataTo})
      if (dataTo.OrderType == "JinxingZhong") {
        this.setData({
          ordertype: "进行中"
        })
      } else if (dataTo.OrderType == "DaiJinXING"){
        this.setData({
          ordertype: "待进行"
        })
      } else if (dataTo.OrderType == "WanCheng") {
        this.setData({
          ordertype: "已完成",
          hide:false
        })
      } else if (dataTo.OrderType == "CheXiao") {
        this.setData({
          ordertype: "已撤销",
          hide: false
        })
      } else if(dataTo.OrderType == "ShenQing") {
        this.setData({
          ordertype: "已申请",
          hide: false
        })
      }
    }
  })
  // 请求紧急密码
      wx.request({
        url: base_url + '/v2.0/userroom/findPassword?orderId=' + this.data.orderid,
        method: "GET",
        header: {
          userId: opiens.UserId,
          token: opiens.Token
        },
        success: res => {
          console.log(res.data.Value.Password)
          var password = res.data.Value.Password
          this.setData({
            password
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