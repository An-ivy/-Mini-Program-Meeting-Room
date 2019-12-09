//引用腾讯地图API
let app=getApp(),
    key=app.map_key
    console.log(key)
    // 实例化API核心类 
var QQMapWX = require('../../libs/qqmap-wx-jssdk.js');
var qqmapsdk = new QQMapWX({
  //此key需要用户自己申请
  key: key
});
Page({
  /**
   * 页面的初始数据
   */
  data: {
    latitude:"",
    longitude:"",
    address: "",
    src: ""
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    /*判断是第一次加载还是从position页面返回
    如果从position页面返回，会传递用户选择的地点*/
    if (options.address != null && options.address != '') {
      //设置变量 address 的值
      console.log(options)
      this.setData({
        latitude: options.latitude,
        longitude: options.longitude,
        address: options.address
      });
    } else {
       
      // 调用接口
      qqmapsdk.reverseGeocoder({
        success: (res)=> {
          console.log(res)
          this.setData({
            address: res.result.address,
            latitude:res.result.ad_info.location.lat,
            longitude: res.result.ad_info.location.lng
          });
        },
        fail: function (res) {
          console.log(res);
        },
        complete: function (res) {
          console.log(res);
        }
      });
    }
  },
  onChangeAddress: function (e) {
    wx.navigateTo({
      url: "/pages/ locationSearch/ locationSearch"
    });
  }
})