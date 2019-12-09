let app = getApp();
let base_url = app.base_url;
let base_images = app.base_images;
Page({
  data: {
    image: base_images + "/wushuju.png",
    hide: false,
    sv: true,
    left: 20,
    top: 250,
    isIos: true
  },
  /**
   * 房间列表
   */
  Myroom() {
    // console.log(opiens)
    console.log("123")
    wx.request({
      url: base_url + '/v2.0/Blwzflc/queryuserRoom',
      header: {
        token: this.data.opiens.Token,
        userId: this.data.opiens.UserId,
      },
      method: 'GET',
      success: res => {
        console.log(res)
        console.log(res.data.Value)
        const myRoom = res.data.Value
        if (myRoom == null) {
          this.setData({
            sv: false
          })
        } else {
          this.setData({
            myRoom: myRoom
          })
        }

      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var opiens = wx.getStorageSync('UTR')
    console.log(opiens.Token)
    if (opiens.Token) {
      this.setData({
        opiens
      })
      this.Myroom() //获取页面信息
    }else{
      wx.navigateTo({
        url: '/pages/login/login',
      })
    }
  },

  setTouchMove: function(e) {
    console.log(e)
    if (e.touches[0].clientX > 0 && e.touches[0].clientY > 0) {
      this.setData({
        left: e.touches[0].clientX - 30,
        top: e.touches[0].clientY - 30
      })
    } else {
      this.setData({
        left: 20, //默认显示位置 left距离
        top: 250 //默认显示位置 top距离
      })
    }
  },
  /**
   * 跳转入住中
   */
  bindMyRoom(e) {
    console.log(e)
    var id = e.currentTarget.dataset.id;
    const currentRoom = this.data.myRoom[id]
    console.log(currentRoom)
    let currentOrderId = currentRoom.OrderId
    console.log(currentOrderId)
    console.log(e.Type)
    if (currentRoom.Type == "待付款") {
      wx.navigateTo({
        url: '/pages/Order_details/Order_details?orderId=' + currentOrderId,
      })
    } else if (currentRoom.Type == "已列入备选") {
      wx.navigateTo({
        url: '/pages/Room_details/Room_details?roomID=' + e.currentTarget.dataset.roomid,
      })
    } else { //跳转入住中
      wx.navigateTo({
        url: '/pages/checkin/checkin?orderId=' + currentOrderId,
        success: function(res) {
          console.log(res)
        },
      })
    }
  },
  //扫码开门或者分享
  scan() {
    wx.scanCode({
      success: res => {
        // 获取扫码的url
        let url = res.result;
        console.log(url)
        let shareHome = /^\{"Time":"\d{4}-[01]\d-[0-3]\d [0-2]\d:[0-5]\d:[0-5]\d","OrderId":\d+\}$/;
        if (shareHome.test(url)) {
          console.log("我是share")
          wx.request({
            url: base_url + '/v2.0/share/savesharePerson',
            data: url,
            header: {
              token: this.data.opiens.Token,
              userId: this.data.opiens.UserId,
            },
            method: 'POST',
            dataType: 'json',
            responseType: 'text',
            success: function(res) {
              console.log('成功')
              console.log(res)
              if (res.data.Value == true) {
                wx.showToast({
                  title: '分享成功',
                  icon: 'succes',
                  duration: 2000,
                  mask: true
                })
              } else {
                wx.showToast({
                  title: '已分享',
                  icon: 'succes',
                  duration: 2000,
                  mask: true
                })
              }
            },
            fail: function(res) {
              console.log(res)
              wx.showModal({
                title: '提示',
                content: '分享失败',
                showCancel: false, //是否显示取消按钮
                cancelColor: 'skyblue', //取消文字的颜色
                confirmText: "确定", //默认是“确定”
                confirmColor: 'skyblue', //确定文字的颜色
              })
            },
            complete: function(res) {
              console.log(res)
            },
          })
        } else {
          console.log("我是扫码开门")
          // // 截取url里面的参数（roomId）
          let obj = {};
          let reg = /[?&][^?&]+=[^?&]+/g;
          let arr = url.match(reg);
          if (arr) {
            arr.forEach((item) => {
              let tempArr = item.substring(1).split('=');
              let key = decodeURIComponent(tempArr[0]);
              let val = decodeURIComponent(tempArr[1]);
              this.setData({
                val
              })
            });

          }
          // 向后台请求数据（开房间）
          // console.log(val)
          var codes = this.data.val
          console.log(codes)
          var objs = {
            RoomId: codes
          };
          var info = JSON.stringify(objs)
          // console.log(RoomId)
          wx.request({
            url: base_url + '/v2.0/open/twoCodeOpenDoor',
            method: 'post',
            header: {
              token: this.data.opiens.Token,
              userId: this.data.opiens.UserId,
            },
            data: info,
            success: res => {
              console.log(res)
              wx.showModal({
                title: '提示',
                content: res.data.Value.Message,
                showCancel: false, //是否显示取消按钮
                cancelColor: 'skyblue', //取消文字的颜色
                confirmText: "确定", //默认是“确定”
                confirmColor: 'skyblue', //确定文字的颜色
              })

            },
            fail: function(err) {
              console.log(err)
            }

          })
        }


      }
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    this.Myroom() //获取页面信息
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})