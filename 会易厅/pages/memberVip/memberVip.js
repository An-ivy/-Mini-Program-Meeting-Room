// pages/memberVip/memberVip.js
const app=getApp(),
  base_url=app.base_url;
  console.log(base_url)
let base_url1 = app.base_url1;
let base_images = app.base_images;
var opiens = wx.getStorageSync('UTR')
console.log(opiens)
Page({
  data: {
    /* 上部分信息 */
    userPhoto: "",
    vip:"",
    nickName:"",
    /* 下部分信息 */
    discountPrice:{},//价格优惠
    firstCheck:{},//抢先入住
    birthdayGift:{},//生日有礼
    icon1: base_images +'/huiyuanjiageyouhui.png', //图标
    icon2: base_images + '/huiyuanqiangxianruzhu.png',
    icon3: base_images + '/huiyuanshengriyouli.png',
    icon4: base_images + '/huiyuanqitayouhui.png',
    huiyuan: base_images + '/huiyuantequan.png',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getVipHeadData()
    this.getVipListData()
  },


  /* VIP上部分信息 */
  getVipHeadData() {
    wx.request({
      url: base_url + '/v2.0/heart/getusernicknameAndphoto',
      data: '',
      header: {
        userId: opiens.UserId,
        token: opiens.Token
      },
      method: 'GET',
      dataType: 'json',
      responseType: 'text',
      success: (res)=>{
        console.log(res)
        let dataValue=res.data.Value;
        console.log(dataValue)
        if(res.data.Status===true){
          this.setData({
            userPhoto: dataValue.UserPhoto,
            vip: dataValue.Vip,
            nickName: dataValue.Nickname
          })
        }         
          console.log(this.data)
      },
      fail: function (res) { },
      complete: function (res) { },
    })
  },
  /* VIP下部分信息 */
  getVipListData(){
    wx.request({
      url: base_url +'/v2.0/heart/memberCenter',
      data: '',
      header: {
        userId: opiens.UserId,
        token: opiens.Token
      },
      method: 'GET',
      dataType: 'json',
      responseType: 'text',
      success: (res)=> {
        console.log(res)
        this.setData({
          discountPrice:res.data.Value[0],
          firstCheck: res.data.Value[1],//抢先入住
          birthdayGift: res.data.Value[2]//生日有礼
        })
        console.log(this.data)
      },
      fail: function(res) {},
      complete: function(res) {},
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