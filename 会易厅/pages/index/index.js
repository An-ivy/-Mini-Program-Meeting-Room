// 引入高德api
const app = getApp()
var city = require('../../libs/city.js');
let base_url = app.base_url;
let key = app.map_key;

console.log(key);
let _page, _this;
Page({
  /**
   * 页面的初始数据
   */
  data: {
    mapShow: false, //地图展示
    cityLShow: true, //城市隐藏
    longitude: '',
    latitude: '',
    names: '',
    circles: [],
    //城市下拉
    citySelected: '石家庄市',
    city: '石家庄市',
    cityData: {},
    hotCityData: [],
    _py: ["hot", "A", "B", "C", "D", "E", "F", "G", "H", "J", "K", "L", "M", "N", "P", "Q", "R", "S", "T", "W", "X", "Y", "Z"],
    //搜索列表
    cityListShow: false,
    inputListShow: false,
    hidden: true,
    showPy: '★',
    //搜索历史记录
    historyListShow: true,
    historyList: [],
    // markers: [ //标记
    //   {
    //     id: 1,
    //     iconPath: '/images/zuobiaobbbb.png',
    //     latitude: 22.3434,
    //     longitude: 113.535,
    //     zIndex: 100,
    //     width: 40,
    //     height: 40
    //   }
    // ]
  },

  /***
   *  点击气泡 
   * */
  getbindcallouttap(e){
    console.log('THE ROOMID IS'+' '+e.markerId)
    wx.navigateTo({
      url: '../Room_details/Room_details?roomID='+e.markerId,
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    
    this.getLocationInfo() // 获取地图的位置

    this.setData({
      cityData: city.all,
      hotCityData: city.hot
    });
    // console.log(this.data.cityData)
    // console.log(this.data.hotCityData)
  },


  /* 
   打开城市列表
            */
  openCityList: function () {
    this.setData({
      cityListShow: !this.data.cityListShow,
      inputListShow: !this.data.inputListShow,
      historyListShow: !this.data.historyList,
      mapShow: !this.data.mapShow,
      cityLShow: !this.data.cityLShow
    });
  },

  /* 
  选择城市 
        */
  selectCity: function(e) {
   var dataset = e.currentTarget.dataset;
   console.log(dataset.id) 
    //根据行政id查询会议室
    wx.request({
      url: base_url + '/v2.0/BlwRoom/queryAdministrativeRoomHuiYi?xingzhengId=' + dataset.id,
      data: '',
      header: {},
      method: 'GET',
      dataType: 'json',
      responseType: 'text',
      success: (res) => {
        console.log(res)
        if (res.data.Status === true) {
          let marker = []
          console.log(158)
          let roomData = res.data.Value;
          console.log(roomData)
          if(roomData!=null){
            roomData.forEach(item => {
              marker.push({
                id: item.RoomId,
                iconPath: '/images/zuobiaobbbb.png',
                latitude: item.Lat,
                longitude: item.Long,
                zIndex: 100,
                width: 60 + "rpx",
                height: 60 + "rpx",
                callout: {
                  content: '地址：' + item.Address + '\n' + '电话：' + item.Phone + '\n' + '价格：' + item.Price + '元',
                  color: "#ff0000",
                  fontSize: 10,
                  borderRadius: 10,
                  bgColor: "#ffffff",
                  padding: "10"
                }
              })
            })
          }
          console.log(181)
          console.log(marker)
          this.setData({
            mapShow: false,
            cityLShow: true,
            citySelected: dataset.fullname,
            city: dataset.fullname,
            cityListShow: false,
            inputListShow: false,
            historyListShow: true,
            latitude: dataset.lat,
            longitude: dataset.lng,
            markers: marker
          });
        }
      },
      fail: function(res) {},
      complete: function(res) {},
    })
    
  },


  /*
   获取文字信息 
          */
  getPy: function(e) {
    console.log(e)
    this.setData({
      hidden: false,
      showPy: e.target.id,
    })
  },

  setPy: function(e) {
    console.log(e)
    this.setData({
      hidden: true,
      scrollTopId: this.data.showPy
    })
  },
  /*
   滑动选择城市
         */
  tMove: function(e) {
    var y = e.touches[0].clientY,
      offsettop = e.currentTarget.offsetTop;
    //判断选择区域,只有在选择区才会生效
    if (y > offsettop) {
      var num = parseInt((y - offsettop) / 12);
      this.setData({
        showPy: this.data._py[num]
      })
    };
  },

  /*
   //触发全部开始选择
       */
  tStart: function() {
    this.setData({
      hidden: false
    })
  },

  /*
   //触发结束选择
         */
  tEnd: function() {
    this.setData({
      hidden: true,
      scrollTopId: this.data.showPy
    })
  },

  getLongit(lat, lng) {
    wx.request({
      url: 'https://www.samewarm.com/Sandy/v2.0/room/queryScopeRoom',
      method: 'get',
      data: {
        lat: lat,
        lng: lng
      },
      success: res => {
        console.log(res)
      }
    })
  },
  /*
   // 获取当前位置 
          */
  getLocationInfo() {
    wx.getLocation({
      type: 'gcj02',
      success: res => {
        console.log(res)
        const lat = res.latitude; //维度
        const log = res.longitude; //精度
        //根据经纬度查询会议室
        wx.request({
          url: base_url + '/v2.0/BlwRoom/queryScopeRoomHuiYi?lat=' + lat + '&&lng=' + log,
          data: '',
          header: {},
          method: 'GET',
          dataType: 'json',
          responseType: 'text',
          success: (res)=> {
            console.log(res)
            if (res.data.Status === true) {
              let roomData = res.data.Value;
              console.log(roomData)
              let marker = [];
              if(roomData!=null){
                roomData.forEach(item => {
                  marker.push({
                    id: item.RoomId,
                    iconPath: '/images/zuobiaobbbb.png',
                    latitude: item.Lat,
                    longitude: item.Long,
                    zIndex: 100,
                    width: 60 + "rpx",
                    height: 60 + "rpx",
                    callout: {
                      content: '地址：' + item.Address + '\n' + '电话：' + item.Phone + '\n' + '价格：' + item.Price + '元',
                      color: "#ff0000",
                      fontSize: 10,
                      borderRadius: 10,
                      bgColor: "#ffffff",
                      padding: "10"
                    }
                  })
                })
              }

              this.setData({
                longitude: log,
                latitude: lat,
                markers: marker
              })
            }
          },
          fail: function(res) {},
          complete: function(res) {},
        })
        this.getLongit(lat, log)
        this.loadCity(lat, log) // 显示当前位置
      }                                                   
    })
  },

  /*
    // 显示当前位置
          */
  loadCity: function(latitude, longitude) {
    _page = this;
    wx.request({
      url: `https://apis.map.qq.com/ws/geocoder/v1/?location=${latitude},${longitude}&key=${key}`,
      success: (res) => {
        console.log(res)
        let province = res.data.result.address_component.province;
        // 市
        var city = res.data.result.address_component.city;
        console.log(city)
        let district = res.data.result.address_component.district;
        this.setData({
          citySelected: city
        })
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
    var locationre = app.globalData.locationresult;
    console.log(app.globalData.locationresult);
    console.log(locationre.length+'间会议室')
    if(locationre!=''){
      wx.showToast({
        title: '找到' + (locationre.length) + '间会议室',
        icon: 'succes',
        duration: 2000,
        mask: true
      })
      let marker = [];
      if (locationre != null) {
        locationre.forEach(item => {
          marker.push({
            id: item.RoomId,
            iconPath: '/images/zuobiaobbbb.png',
            latitude: item.Lat,
            longitude: item.Long,
            zIndex: 100,
            width: 60 + "rpx",
            height: 60 + "rpx",
            callout: {
              content: '地址：' + item.Address + '\n' + '电话：' + item.Phone + '\n' + '价格：' + item.Price + '元',
              color: "#ff0000",
              fontSize: 10,
              borderRadius: 10,
              bgColor: "#ffffff",
              padding: "10"
            }
          })
        })
      } else {
        wx.showModal({
          title: '提示',
          content: '根据您的选房信息，没有筛选出更多的房间',
        })
      }
      this.setData({
        markers: marker
      })
    }
    
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