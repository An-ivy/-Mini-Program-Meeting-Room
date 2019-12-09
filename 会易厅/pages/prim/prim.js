// pages/prim/prim.js
let app = getApp();
let base_url = app.base_url;
var opiens = wx.getStorageSync('UTR')
var val;
Page({
  data: {

  },
  scan(){
    wx.scanCode({
      success:res=>{
        // 获取扫码的url
        let url = res.result;
        console.log(url)
      
        // 截取url里面的参数（roomId）   
        let obj = {};
        let reg = /[?&][^?&]+=[^?&]+/g;
        let arr = url.match(reg);
        if (arr) {
          arr.forEach((item) => {
            let tempArr = item.substring(1).split('=');
            let key = decodeURIComponent(tempArr[0]);
             val = decodeURIComponent(tempArr[1]);
          });
          
        }
        
        // 向后台请求数据（开房间）
        console.log(val)
        var RoomId = JSON.stringify(val)
      wx.request({
        url: base_url + '/v2.0/open/twoCodeOpenDoor',
        method: 'post',
        header: {
          'content-type': 'application/x-www-form-urlencoded',
          'Accept': 'application/json',
          userId: opiens.UserId ,
        },
        data: RoomId,
        success:res=>{
          console.log(res.Value)
        },
        fail:function(err){
          console.log(err)
        }
  
      })
 
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
    
    // var array = '130633199812083893'
    // var mphone = array.substring(0, 3) + '****' + array.substring(7);
    // console.log(mphone)
    
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