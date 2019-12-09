// pages/Room_details/Room_details.js
let app = getApp();
let base_url = app.base_url;
Page({
  /**
   * 页面的初始数据
   */
  data: {
    "bnrUrl": [{ //轮播图图片
      "url": "/images/logo_03.gif"
    }, {
      "url": "/images/logo_03.gif"
    }, {
      "url": "/images/logo_03.gif"
    }, {
      "url": "/images/logo_03.gif"
    }],
    loges: ['/images/star_yellow.png', '/images/star_yellow.png', '/images/star_yellow.png', '/images/star_yellow.png', '/images/star_yellow.png'] //评价五角星
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var opiens = wx.getStorageSync('UTR')
    console.log(opiens)
    console.log(options)
    if (opiens.Token) {
      this.setData({
        opiens
      })
      // 这块是获取点击详情的时候，通过options来接收的id
      let detId = options.roomID;
      let _this = this;
      _this.setData({
        collectData: detId //获取房间号roomid为collectData
      })
      _this.getCollected(); //获取缓存中的状态
      console.log(this.data.collectData)
      this.Details()
    }else{
      wx.navigateTo({
        url: '/pages/login/login',
      })
    }


  },
  // 房间详情请求
  Details() {
    wx.request({
      url: base_url + '/v2.0/room/findRoomparticulars',
      method: 'GET',
      data: {
        roomId: this.data.collectData
      },
      header: {
        userId: this.data.opiens.UserId,
        token: this.data.opiens.Token
      },
      success: res => {
        console.log(res)
        const details = res.data.Value
        console.log(details)
        this.setData({
          details
        })
      }
    });
    //房间评价请求
    wx.request({
      url: base_url + '/v2.0/room/findAppraiseRoom?roomId=' + this.data.collectData,
      method: "GET",
      success: res => {
        console.log(res)
        var content = res.data.Value;
        this.setData({
          content
        })
      }
    })
    // 轮播图请求
    wx.request({
      url: base_url + '/v2.0/room/photos?roomId=' + this.data.collectData,
      method: "GET",
      success: res => {
        console.log(res.data.Value)
        const pics = res.data.Value;
        this.setData({
          pics
        })
      }
    })
  },
  //点击成功或取消收藏
  bindCollecting() {

    // var opiens = wx.getStorageSync('UTR')
    // console.log(opiens)
    console.log(this.data.collectData)
    // var roomIdJson = JSON.stringify(this.data.collectData)
    // console.log(this.data.details.Collect)
    if (this.data.details.Collect === false) {

      wx.request({
        url: base_url + '/v2.0/room/collectRoom',
        data: {
          RoomId: this.data.collectData
        },
        header: {
          userId: this.data.opiens.UserId,
          token: this.data.opiens.Token
        },
        method: 'POST',
        dataType: 'json',
        responseType: 'text',
        success: res => {
          console.log(res)
          this.setData({
            [`details.Collect`]: true
          })
          console.log("收藏成功")
          console.log(res)
        },
      })
    } else {
      wx.request({
        url: base_url + '/v2.0/room/delecollect',
        data: {
          RoomId: this.data.collectData
        },
        header: {
          userId: this.data.opiens.UserId,
          token: this.data.opiens.Token
        },
        method: 'PUT',
        dataType: 'json',
        responseType: 'text',
        success: res => {
          this.setData({
            [`details.Collect`]: false
          })
          console.log("取消成功")
          console.log(res)
        },
      })
    }
  },

  //点击成功或者取消备选
  bindAlternative() {
    // var opiens = wx.getStorageSync('UTR')
    console.log(this.data.details.Alternative)
    if (this.data.details.Alternative === false) {
      wx.request({
        url: base_url + '/v2.0/room/acternativeRoom',
        data: {
          RoomId: this.data.collectData
        },
        header: {
          userId: this.data.opiens.UserId,
          token: this.data.opiens.Token
        },
        method: 'POST',
        dataType: 'json',
        responseType: 'text',
        success: res => {
          console.log("备选成功")
          console.log(res)
          this.setData({
            [`details.Alternative`]: true
          })
        }
      })
    } else {
      wx.request({
        url: base_url + '/v2.0/room/deleAlternative',
        data: {
          RoomId: this.data.collectData
        },
        header: {
          userId: this.data.opiens.UserId,
          token: this.data.opiens.Token
        },
        method: 'PUT',
        dataType: 'json',
        responseType: 'text',
        success: res => {
          console.log("取消成功")
          console.log(res)
          this.setData({
            [`details.Alternative`]: false
          })
        }
      })
    }

  },

  //立即预定跳转
  bindBookNow() {
    wx.navigateTo({
      url: '../order/order?roomID=' + this.data.collectData,
    })
  },
  //获取缓存
  getCollected() {
    let CollectState = wx.getStorageSync("_collect"); //获取缓存状态
    //如果缓存中有这个值，取到状态存到data中，
    //如果没有这个值,状态设置为false
    if (CollectState) { // 判断如果缓存中有这个值 
      // 获取当前状态
      let collcetState = CollectState[this.data.collectData];
      this.setData({
        isShow1: collcetState, //把这个状态存到data中
        isShow2: collcetState,
        isShow3: collcetState
      })
    } else {
      let CollectState = {};
      CollectState[this.data.collectData] = false; //没有这个值，默认把点赞的这个状态设置为false，
      // 当然不设置false，它默认也是false，未选中的状态
      wx.setStorageSync("_collect", CollectState);
    }
  },

  handleClickShow1(event) {
    // 获取当前缓存中的所有状态
    let getSecCollect = wx.getStorageSync("_collect");
    // 获取当前页面的收藏按钮的状态  this.data.collectData就是当前的页面的id，在data中存储的
    let getSecCollectState = getSecCollect[this.data.collectData];
    // 然后当前收藏按钮的状态取反
    getSecCollectState = !getSecCollectState;
    // 把取反的值的状态 在赋给 当前按钮的状态
    getSecCollect[this.data.collectData] = getSecCollectState;
    wx.setStorageSync("_collect", getSecCollect) //在缓存中设置改变之后的状态
    this.setData({
      isShow1: getSecCollectState //把更新过的收藏按钮的状态赋值给isShow
    })
  },
  handleClickShow2(event) {
    // 获取当前缓存中的所有状态
    let getSecCollect = wx.getStorageSync("_collect");
    // 获取当前页面的收藏按钮的状态  this.data.collectData就是当前的页面的id，在data中存储的
    let getSecCollectState = getSecCollect[this.data.collectData];
    // 然后当前收藏按钮的状态取反
    getSecCollectState = !getSecCollectState;
    // 把取反的值的状态 在赋给 当前按钮的状态
    getSecCollect[this.data.collectData] = getSecCollectState;
    wx.setStorageSync("_collect", getSecCollect) //在缓存中设置改变之后的状态
    this.setData({
      isShow2: getSecCollectState //把更新过的收藏按钮的状态赋值给isShow
    })
  },
  handleClickShow3(event) {
    // 获取当前缓存中的所有状态
    let getSecCollect = wx.getStorageSync("_collect");
    // 获取当前页面的收藏按钮的状态  this.data.collectData就是当前的页面的id，在data中存储的
    let getSecCollectState = getSecCollect[this.data.collectData];
    // 然后当前收藏按钮的状态取反
    getSecCollectState = !getSecCollectState;
    // 把取反的值的状态 在赋给 当前按钮的状态
    getSecCollect[this.data.collectData] = getSecCollectState;
    wx.setStorageSync("_collect", getSecCollect) //在缓存中设置改变之后的状态
    this.setData({
      isShow3: getSecCollectState //把更新过的收藏按钮的状态赋值给isShow
    })
  },
})