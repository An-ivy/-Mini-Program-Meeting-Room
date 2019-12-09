const app = getApp();
const base_url = app.base_url;
Page({
  data: {
    clock: '' //支付倒计时
  },
  // 取消订单
  cancel() {
    wx.request({
      url: base_url + '/v2.0/userroom/cancelOrderMessage',
      data: {
        OrderId: this.data.orderId
      },
      header: {
        userId: this.data.opiens.UserId,
        token: this.data.opiens.Token,
      },
      method: 'PUT',
      dataType: 'json',
      responseType: 'text',
      success: (res) => {
        console.log("取消成功", res.data.Value)
        if (res.data.Value === true) {
          wx.switchTab({
            url: '/pages/roomList/roomList',
          })
        }
      },
    })

  },
  /**
   * 定时器
   */
  getTimerData() {//获取秒数
    wx.request({
      url: base_url + '/v2.0/userroom/getOrderMinute?orderId=' + this.data.orderId,
      header: {
        userId: this.data.opiens.UserId,
        token: this.data.opiens.Token,
      },
      method: 'GET',
      dataType: 'json',
      responseType: 'text',
      success: (res)=> {
        console.log("定时器调取成功",res)
        //转化分钟
        let minute, second
        if(res.data.Value.ValidTime<0){
          minute=0;
          second=0;
          this.unpaid_overtime();//调取删除超时未支付订单
        }else{
          minute = parseInt(res.data.Value.ValidTime / 60);
          second = res.data.Value.ValidTime % 60;//秒
        }
        // let minute = parseInt(res.data.Value.ValidTime / 60) 
        // let second = res.data.Value.ValidTime%60
        console.log("分",minute,"秒",second)
        this.setData({
          minute,
          second
        })
      },

    })
  },

  /**
   * 定时器递归
    */
  getCountdown() {
    var timerTem = setTimeout(() => {
      this.getTimerData()
      console.log(111111)
      this.getCountdown()//自己调自己
    }, 500)

  },
  /**
   * 删除超时支付订单
    */
  unpaid_overtime(){
    wx.request({
      url: base_url_ +'/v2.0/userroom/deleOrderMessage',
      data: { OrderId: this.data.orderId },
      header: {
        userId: this.data.opiens.UserId,
        token: this.data.opiens.Token,
      },
      method: 'Put',
      dataType: 'json',
      responseType: 'text',
      success: (res)=> {
        console.log(res)
        if(res.data.Value==true){
          console.log("删除成功")
        }
      },
    })
  },
  // 支付
  pay() {
    let orderId = {
      orderId: this.data.orderId
    };
    let info = JSON.stringify(orderId);
    wx.request({
      url: base_url + "/v2.0/Blwzflc/payInAdvance",
      data: info,
      header: {
        userId: this.data.opiens.UserId //下单支付所需参数
      },
      method: 'POST',
      success: (res) => {
        console.log(res)
        var data = res.data.Value
        /* 吊起支付 */
        // var MD5 = 'MD5'
        wx.requestPayment({
          // 'appId': data.appid,
          'timeStamp': data.timeStamp, //时间戳
          'nonceStr': data.nonceStr, //随机串
          'package': data.package, //统一下单接口返回的 prepay_id 参数值，提交格式如：prepay_id=***
          'signType': 'MD5', //签名类型
          'paySign': data.paySign, //支付签名，具体签名方案参见 
          success: res => {
            console.log(res.errMsg)
            if (res.errMsg == 'requestPayment:ok') {
              wx.switchTab({
                url: '/pages/roomList/roomList'
              })
            }
          },
          fail: function(res) {
            console.log("这是失败了")
            console.log(res)
          },
        })
      }
    })
  },
  /**
   * onload
   */
  onLoad: function(options) {
    var opiens = wx.getStorageSync('UTR')
    console.log(options)
    const orderId = options.orderId //获取订单号orderId
    this.setData({
      opiens,
      orderId
    })
    // countdown(this);
    this.getCountdown();
    // 请求数据
    wx.request({
      url: base_url + '/v2.0/userroom/getOrderMessage',
      method: "GET",
      header: {
        userId: this.data.opiens.UserId,
        token: this.data.opiens.Token,
      },
      data: {
        orderId: orderId
      },
      success: res => {
        console.log(124, res.data.Value)
        const s3 = res.data.Value
        console.log(res.data.Value.Time)
        const time = res.data.Value.Time
        const starttime = time.substring(0, 16)
        const endtime = time.substring(19, 36)
        console.log(starttime)
        console.log(endtime)
        this.setData({
          s3,
          starttime,
          endtime
        })

      }
    })
  },
});