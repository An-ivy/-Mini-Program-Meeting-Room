// pages/evaluate/evaluate.js
let app = getApp();
let base_url = app.base_url;
var opiens = wx.getStorageSync('UTR')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    wjx: ['/images/star_gray.png', '/images/star_gray.png', '/images/star_gray.png', '/images/star_gray.png', '/images/star_gray.png'],
    indexs: 5,
    indexTo: 5,
    indexTos: 5,
    uploaderList: [],
    uploaderNum: 0,
    indexs: 5,
    showUpload: true,
    Photos: [
      { Photo: '', Mime: '' }
    ]
  },
  // 点击评价列表颜色
  colorActive(e) {//舒适度评价
    console.log(e.currentTarget.dataset.index)
    this.setData({
      indexs: e.currentTarget.dataset.index + 1
    })

  },
  // 安全度评价
  sxdPing(e) {
    this.setData({
      indexTo: e.currentTarget.dataset.index + 1
    })
  },
  // 房间资源
  fjactive(e) {
    this.setData({
      indexTos: e.currentTarget.dataset.index + 1
    })
  },
  bat(e) {
    const val = e.detail.value
    this.setData({
      val
    })

  },
  // 上传文件
  clearImg: function (e) {
    var nowList = [];//新数据
    var uploaderList = this.data.uploaderList;//原数据
    for (let i = 0; i < uploaderList.length; i++) {
      if (i == e.currentTarget.dataset.index) {
        continue;
      } else {
        nowList.push(uploaderList[i])
      }
    }
    this.setData({
      uploaderNum: this.data.uploaderNum - 1,
      uploaderList: nowList,
      showUpload: true
    })
  },
  //展示图片
  showImg: function (e) {
    console.log("123")
    var that = this;
    wx.previewImage({
      urls: that.data.uploaderList,
      current: that.data.uploaderList[e.currentTarget.dataset.index]
    })
  },
  //上传图片
  upload: function (e) {
    var that = this;
    wx.chooseImage({
      count: 2 - that.data.uploaderNum, // 默认9
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        let tempFilePaths = res.tempFilePaths;
        for (var i = 0; i < tempFilePaths.length; i++) {
          var name = tempFilePaths[i]
          const ojb = name.substring(name.lastIndexOf(".") + 1)
          const lib = wx.getFileSystemManager().readFileSync(res.tempFilePaths[i], "base64") //小程序转码base64
          // console.log('data:image/jpeg;base64,'+lib)
          that.setData({
            ['Photos.Mime']: ojb,
            ['Photos.Photo']: lib
          })

          let uploaderList = that.data.uploaderList.concat(tempFilePaths);
          if (uploaderList.length == 2) {
            that.setData({
              showUpload: false
            })
          }

          that.setData({
            uploaderList: uploaderList,
            uploaderNum: uploaderList.length,
          })
        }
      }

    })


  },
  //提交按钮
  forTame() {
    const Degree = this.data.indexs;
    const Comfort = this.data.indexTo;
    const Full = this.data.indexTos;
    const Text = this.data.val
    const OrderId = "30";
    var objs = {
      Degree: "Xing" + Degree,
      Comfort: "Xing" + Comfort,
      Full: "Xing" + Full,
      OrderId: OrderId,
      Text: Text,
      Photos: [{
        Mime: this.data.Photos.Mime,
        Photo: this.data.Photos.Photo,
      }]
    }
    var info = JSON.stringify(objs)
    console.log(objs.Photos == "")
    if (objs.Photos == undefined || objs.Text == undefined) {
      wx.showLoading({
        title: '请填写内容或上传图片',
        icon: 'loading',
        duration: 800
      })
      setTimeout((res) => {
        wx.hideToast()
      }, 5000)
    } else {
      wx.showToast({
        title: '评价成功',
        icon: 'success',
      })
      wx.request({
        url: base_url + '/v2.0/appraise/roomAppraise',
        method: 'post',
        header: {
          userId: opiens.UserId,
          token: opiens.Token
        },
        data: info,
        success: res => {
          console.log(res)
          wx.hideToast()
        }
      })
    }


  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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