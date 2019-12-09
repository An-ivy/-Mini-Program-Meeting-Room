// pages/ locationSearch/ locationSearch.js
const app=getApp();
const key=app.map_key;
console.log(key);
var QQMapWX = require('../../libs/qqmap-wx-jssdk.js');
var qqmapsdk = new QQMapWX({
  key: key
});
Page({
  data: {
    latitude: 0,//地图初次加载时的纬度坐标
    longitude: 0, //地图初次加载时的经度坐标
    name: "" //选择的位置名称
  },
  onLoad: function () {
    // 实例化API核心类
    this.moveToLocation();
  },
  //移动选点
  moveToLocation: function () {
    var that = this;
    wx.chooseLocation({
      success: function (res) {
        // console.log(res)
        // console.log(res.name);
        // console.log(res.latitude);
        // console.log(res.longitude);
        app.globalData.localPlace=res.name;
        app.globalData.localLng = res.longitude;
        app.globalData.localLat = res.latitude;
        console.log(app.globalData.localPlace + "," + app.globalData.localLng + "," + app.globalData.localLat);
        
        //选择地点之后返回到原来页面
        wx.switchTab({
          url: "../name/name"
          // ?address=" + res.name + "&&latitude=" + res.latitude + "&&longitude=" + res.longitude
        });
      },
      fail: function (err) {
        console.log(err)
      }
    });
  }
});