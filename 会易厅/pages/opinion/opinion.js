// pages/opinion/Opinion.js
let app = getApp();
let base_url = app.base_url;
var opiens = wx.getStorageSync('UTR')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    pontion: ['关于客房', '关于客服', '关于软件', '关于其他',],
    index: 6,
    arrts: ['轻微', '较严重', '很严重'],
    yanindex: 6,
    uploaderList: [],
    uploaderNum: 0,
    showUpload: true,
    KeFang: '',
    Photos: [
      { Photo: '', Mime: '' }
    ]
  },
  bindMultiPickerChange(e) {
    if (e.detail.value == 0) {
      this.setData({
        KeFang: "KeFang"
      })
    } else if (e.detail.value == 1) {
      this.setData({
        KeFang: "FuWu"
      })
    } else if (e.detail.value == 2) {
      this.setData({
        RuanJian: "RuanJian"
      })
    } else {
      this.setData({
        QiTa: "QiTa"
      })
    }
    this.setData({
      index: e.detail.value
    })

  },
  bindMultiPickerColumnChange(e) {
    console.log(e.detail.value)
    this.setData({
      index: e.detail.value
    })
  },
  // 严重程度
  bindClickAchange(e) {
    console.log(e.detail.value)
    this.setData({
      yanindex: e.detail.value
    })
  },
  listClick(e) {
    if (e.detail.value == 0) {
      this.setData({
        Ji1: "Ji1"
      })
    } else if (e.detail.value == 1) {
      this.setData({
        Ji2: "Ji2"
      })
    } else {
      this.setData({
        Ji3: "Ji3"
      })
    }
    console.log(e.detail.value)
    this.setData({
      yanindex: e.detail.value
    })
  },
  // 上传文件
  clearImg: function (e) {
    var nowList = []; //新数据
    var uploaderList = this.data.uploaderList; //原数据

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
        console.log(res)
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        let tempFilePaths = res.tempFilePaths;
        for (var i = 0; i < tempFilePaths.length; i++) {
          var name = tempFilePaths[i]
          var obj = name.substring(name.lastIndexOf(".") + 1) //截取png

          const lib = wx.getFileSystemManager().readFileSync(res.tempFilePaths[i], "base64") //图片转成64
          that.setData({
            ['Photos.Mime']: obj,
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
  // 调取数据
  getBtN() {
    console.log(this.data.KeFang || this.data.FuWu || this.data.RuanJian || this.data.RuanJian || this.data.QiTa)
    console.log(this.data.Ji1 || this.data.Ji2 || this.data.Ji3)
    var objst = {
      Type: this.data.KeFang || this.data.FuWu || this.data.RuanJian || this.data.RuanJian || this.data.QiTa,
      QiTa: this.data.Ji1 || this.data.Ji2 || this.data.Ji3,
      Describe: this.data.Describe,
      Photos: [{
        Photo: this.data.Photo,
        Mime: this.data.Mime
      }]
    }
    var info = JSON.stringify(objst)
    console.log(info)
    wx.request({
      url: base_url+ '/v2.0/appraise/suggestion',
      method: 'post',
      header: {
        userId: opiens.UserId,
        token: opiens.Token
        // userId: 22,
        // token: '0F94A511C2DC425D7FEB0E43B6DC369A80C9B4ECBBC93A33402A4170C8AEB4AA0DD1D756BCC3B2D63B8BEA54D3DEDC0A'
      },
      data: info,
      success: res => {
        console.log(res)
        wx.showToast({
          title: '反馈成功',
          icon: 'success',
        })
      }
    })
  },
  banind(e) {
    const Describe = e.detail.valu//取出下标
    //跟新数据
    this.setData({ Describe })
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