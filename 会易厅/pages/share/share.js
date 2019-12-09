// pages/main/index.js
var QR = require("../../utils/qrcode.js");
let app = getApp();
let base_url = app.base_url;
var opiens = wx.getStorageSync('UTR')
Page({
  data: {
    canvasHidden: false,
    maskHidden: true,
    imagePath: '',
    placeholder: '',//默认二维码生成文本
  },
  /* 分享列表 */
  shareList(){
    wx.request({
      url: base_url+'/v2.0/share/shareperson?dingdanid='+this.data.OrderId,
      header: {
        token: opiens.Token,
        userId: opiens.UserId,
      },
      method: 'GET',
      dataType: 'json',
      responseType: 'text',
      success: (res)=> {
        console.log(res.data.Value)
        this.setData({
          shareList:res.data.Value
        })
      },
      fail: function(res) {},
      complete: function(res) {},
    })
  },
  /* 授权共享||解除授权 */
  shareTo(e){
    console.log(e.currentTarget.dataset.id)
    let startId = e.currentTarget.dataset.id
    wx.request({
      url: base_url+'/v2.0/share/revamp',
      data: { "StartId": startId, "OrderId": this.data.OrderId },
      header:{
        token: opiens.Token,
        userId: opiens.UserId,
      },
      method: 'PUT',
      dataType: 'json',
      responseType: 'text',
      success: (res)=> {
        console.log("授权成功")
        console.log(res)
        this.shareList()
      },
      fail: function(res) {},
      complete: function(res) {},
    })
  },
  onLoad: function (options) {
    console.log(options)
    const OrderId = options.OrderId
    this.setData({
      OrderId
    })

    // 页面初始化 options为页面跳转所带来的参数
    var size = this.setCanvasSize();//动态设置画布大小
    var initUrl = this.data.placeholder;
    this.createQrCode(initUrl, "mycanvas", size.w, size.h);
    this.formSubmit()
    this.shareList()

  },
  onReady: function () {

  },
  onShow: function () {

    // 页面显示
  },
  onHide: function () {
    // 页面隐藏
  },

  onUnload: function () {
    // 页面关闭

  },
  //适配不同屏幕大小的canvas
  setCanvasSize: function () {
    var size = {};
    try {
      var res = wx.getSystemInfoSync();
      var scale = 750 / 686;//不同屏幕下canvas的适配比例；设计稿是750宽
      var width = res.windowWidth / scale;
      var height = width;//canvas画布为正方形
      size.w = width;
      size.h = height;
    } catch (e) {
      // Do something when catch error
      console.log("获取设备信息失败" + e);
    }
    return size;
  },
  createQrCode: function (url, canvasId, cavW, cavH) {
    //调用插件中的draw方法，绘制二维码图片
    QR.api.draw(url, canvasId, cavW, cavH);
    setTimeout(() => { this.canvasToTempImage(); }, 10);

  },
  //获取临时缓存照片路径，存入data中
  canvasToTempImage: function () {
    var that = this;
    wx.canvasToTempFilePath({
      canvasId: 'mycanvas',
      success: function (res) {
        var tempFilePath = res.tempFilePath;
        console.log(tempFilePath);
        that.setData({
          imagePath: tempFilePath,
          // canvasHidden:true
        });
      },
      fail: function (res) {
        console.log(res);
      }
    });
  },
  //点击图片进行预览，长按保存分享图片
  previewImg: function (e) {
    var img = this.data.imagePath;
    console.log(img);
    wx.previewImage({
      current: img, // 当前显示图片的http链接
      urls: [img] // 需要预览的图片http链接列表
    })
  },
  formSubmit: function (e) {
    var that = this;
    wx.request({
      url: base_url + '/v2.0/share/shareRoom',
      method: 'get',
      header: {
        userId: opiens.UserId,
        token: opiens.Token
      },
      data: {
        dingdanid: this.data.OrderId
      },
      success: res => {
        console.log(res.data)
        if (res.data.Status == true) {
          var aa = res.data.Value
          var url = JSON.stringify(aa)

          var st = setTimeout(function () {
            wx.hideToast()
            var size = that.setCanvasSize();
            //绘制二维码
            that.createQrCode(url, "mycanvas", size.w, size.h);
            that.setData({
              maskHidden: true
            });
            clearTimeout(st);
          }, 2000)
          that.setData({
            maskHidden: false,
          });
          wx.showToast({
            title: '生成中...',
            icon: 'loading',
            duration: 2000
          });
        }
      }
    })

  }

})