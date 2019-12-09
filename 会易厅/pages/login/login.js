
var encryptedDataUid;//微信登陆
var ivUid;//微信登陆
var ivPh;// 手机号
var encryptedDataPh;//手机号
var Country;
var Headimgurl;
var Nickname;
var Province;
var city;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    isHide: false,
    hide: true,
    authorization: false,
    imges: '../../images/logo.png',
    img: false,
    sfz: true,
    sfz1: true
  },
  /**
   * 生命周期函数--监听页面加载
   */

  bindGetUserInfo(e) { //获取用户信息 //授权登录； 
    // console.log(e)
    if (e.detail.errMsg == 'getUserInfo:fail auth deny') { //拒绝授权
      ///等写完后出来一个弹框
      wx.showModal({
        title: '提示',
        content: '请授权后登陆~~',
        showCancel: false,//是否显示取消按钮
        cancelColor: 'skyblue',//取消文字的颜色
        confirmText: "确定",//默认是“确定”
        confirmColor: 'skyblue',//确定文字的颜色
      })


    } else { //同意授权
      encryptedDataUid = e.detail.encryptedData;
      ivUid = e.detail.iv;
       var hide = this.data.hide
      var authorization = this.data.authorization
      var rawData = e.detail.userInfo
      Country = e.detail.userInfo.country //国家
      Headimgurl = e.detail.userInfo.avatarUrl //头像
      Nickname = e.detail.userInfo.nickName //微信名字
      Province = e.detail.userInfo.province //省
      city = e.detail.userInfo.city
      // EncryptedDataUid = e.detail.encryptedData//后台Unid
      const sfz = this.data.sfz //显示身份证号
      const sfz1 = this.data.sfz1 //显示姓名
      this.setData({
        hide: false,
        authorization: true,
        img: true,
        rawData,
        sfz: false,
        sfz1: false
      })
      // wx.request({
      //   url: '',
      // })
    }
  },
  InputSfz(e) {//获取身份证号
    const zhengjianhao = e.detail.value;
    this.setData({
      zhengjianhao
    })
  },
  Inputname(e) {//获取姓名
    const name = e.detail.value;
    this.setData({ name })
  },
  getPhoneNumber(e) { //获取手机号 //微信登录
    // console.log(e)
    if (e.detail.errMsg == "getPhoneNumber:fail user deny") { //拒绝授权
      wx.showModal({
        title: '提示',
        content: '需要授权微信信息才可以使用~~',
        showCancel: false,//是否显示取消按钮
        cancelColor: 'skyblue',//取消文字的颜色
        confirmText: "确定",//默认是“确定”
        confirmColor: 'skyblue',//确定文字的颜色
      })
    } else { //同意授权
      encryptedDataPh = e.detail.encryptedData; //微信加密数据
      ivPh = e.detail.iv; //微信加密数据
      var zhengjianhao = this.data.zhengjianhao //获取到身份证号
      if (zhengjianhao == undefined || zhengjianhao.length != 18 || this.data.name == undefined) {
        wx.showToast({
          title: '请输入正确信息',
          icon: 'loading',
          duration: 2000
        })
      } else {
        var opiens = wx.getStorageSync('key') //拿出缓存数据
        var obj = { //后台解析数据
          EncryptedDataPh: encryptedDataPh,//微信内部信息
          IvPh: ivPh,//微信内部信息
          EncryptedDataUid: encryptedDataUid,
          IvUid: ivUid,
          Country: Country, //国家
          Headimgurl: Headimgurl,//头像
          NickName: Nickname,//微信名字
          Province: Province,//
          IdCard: this.data.zhengjianhao,//身份证号码
          UnionId: opiens.UnionId1,
          OpenId: opiens.openId1,
          SessionKey: opiens.SessionKey1,
          City: city,//城市
          Name: this.data.name//姓名
        }
        const info = JSON.stringify(obj) //把数据格式转换成json
        console.log(info)
        wx.request({
          url: 'https://www.samewarm.com/Sandy/v2.0/userOpenIdHuiYiShi/bindingPhone',
          method: 'post',
          data: info,
          success: res => {
            console.log(res)
            if (res.data.Status == true) {
              if (res.data.Value.WeChat == 'Login') {//验证成功
                this._getGo()
              } else {
                wx.showModal({
                  title: '提示',
                  content: '绑定失败请重新绑定',
                  showCancel: false,//是否显示取消按钮
                  cancelColor: 'skyblue',//取消文字的颜色
                  confirmText: "确定",//默认是“确定”
                  confirmColor: 'skyblue',//确定文字的颜色
                })
              }
            } else {
              wx.showModal({
                title: '提示',
                content: '绑定失败请重新绑定',
                showCancel: false,//是否显示取消按钮
                cancelColor: 'skyblue',//取消文字的颜色
                confirmText: "确定",//默认是“确定”
                confirmColor: 'skyblue',//确定文字的颜色
              })
            }
          },
          fail: err => {
            console.log(err);
          }
        })
      }
    }
  },
  onLoad: function (options) {

    this._login()//授权登录
  },
  //页面跳转
  _getGo() {
    wx.switchTab({
      url: '../index/index'
    })
  },
  _login() {
    wx.login({
      success: res => {
        console.log(res)
        // 获取code
        const code = res.code;
        console.log(code)
        wx.request({
          url: 'https://www.samewarm.com/Sandy/v2.0/userOpenIdHuiYiShi/getOpenIdInfo',
          data: {
            code
          },
          method: 'get',
          success: res => {
            console.log(res.data.Value)
            const str = res.data.Status;
            const names = res.data.Value.WeChat; //判断用户是否认证

            if (str == true) {
              if (names == "Initialize") { //新用户没有登录过
                let openId = res.data.Value.OpenId; //获取的openid
                let SessionKey = res.data.Value.SessionKey; //获取的SessionKey
                // let UnionId = res.data.Value.UnionId; //获取的UnionId
                if (openId == null || SessionKey == null){
                  wx.showModal({
                    title: '提示',
                    content: '没有获取openId和Tocke',
                    showCancel: false,//是否显示取消按钮
                    cancelColor: 'skyblue',//取消文字的颜色
                    confirmText: "确定",//默认是“确定”
                    confirmColor: 'skyblue',//确定文字的颜色
                  })
                }else{
                  this.setData({ //更新状态
                    openId,
                    SessionKey,
                    // UnionId
                  })
                  wx.setStorageSync('key', { //缓存数据 
                    SessionKey1: this.data.SessionKey,
                    openId1: this.data.openId,
                    // UnionId1: this.data.UnionId
                  })

                  const sfz = this.data.isHide //如果是新用户就显示授权页面
                  this.setData({
                    isHide: true
                  })
                }
              

               

              } else { //老用户 //把这些缓存上UserId Token
                console.log("123")
                this._getGo()
                /*缓存token和userId**/
                wx.setStorageSync('UTR', { /*缓存token和userId**/
                  UserId: res.data.Value.UserId,
                  Token: res.data.Value.Token,
                  RefreshToken: res.data.Value.RefreshToken
                })
                this.setData({
                  isHide: false
                })
              }
            } else { //数据或其他异常
              wx.showToast({
                title: '数据异常请重新登录',
                icon: 'loading',
                duration: 2000
              })
              this.setData({
                isHide: true
              })
            }

          }
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