// pages/orderdetialed/orderdetialed.js
let app = getApp();
let base_url = app.base_url;
var opiens = wx.getStorageSync('UTR')
Page({
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    const orderid = options.orderId
    this.setData({
      orderid
    })
    // 请求数据
    wx.request({
      url: base_url + '/v2.0/result/countDetailed?orderId=' + this.data.orderid,
      method: "GET",
      header: {
        userId: opiens.UserId,  
        token: opiens.Token
        //23
        //'FA7AE8BD5F84429FFC1B7F525EAF5403D9732D3C05EF80FC9CAE2AD6879A58E3FDB3C9027FF3DE03B635BAA5197FFE36'
      },
      success: res => {
        console.log(res)
        console.log(res.data.Value)
        var taskdetails = res.data.Value
        this.setData({
          taskdetails
        })
        //"DeductTaskMoney" : 花费的服务费, 
        //"SumDeductMoney" : 总花费,
        //"DeductMoney": 房费, 
        //"CouponSale :优惠劵, 
        //"OrderNumber": "编号",
        //"Time": 起止时间, 
        //"OrderId" : 订单id,
        //"ResideDays": 住了几天 
        //"SingleRoomMoney" : 房间单价,
        //"SumMoney": 总支付, 
        //"SumResideueMoney": 剩余金额,
        // "TaskDetailed": 服务清单
// TaskDetailed : {
        //"TaskMoney": 服务单价, 
        //"UserName": 用户姓名, 
        //"TaskCount": 数量 , 
        //"TaskType": 服务类型, 
        //"Time": 时间, 
        //"TaskSumMoney": 服务总价
       //CouponSale 说明 {
            //"StartDate": 开始时间, 
            //"Sale": 优惠金额, 
            //"Type": "类型, 
            //"Only": 限制条件 , 
            //"Employ": 满足金额, 
            //"EndDate":结束时间 , 
            //"Name": 名称
  //退款类型 : WeiZhiFu(未支付 ), YiZhiFu(已支付), YiTuiKuan(已退款), WuCaoZuo(无操作), TuiKuanZhong(退款中)
//活动优惠枚举说明 :HuiYuanZheKou : 会员折扣, ZheKou : 折扣 , MianJian : 满减
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