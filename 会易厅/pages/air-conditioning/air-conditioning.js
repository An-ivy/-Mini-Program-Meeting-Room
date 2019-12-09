// pages/ airConditioning/ airConditioning.js
const app = getApp();
console.log(app)
const base_url = app.base_url;
console.log(base_url)
let base_url1 = app.base_images;
var opiens = wx.getStorageSync('UTR')
Page({
  data: {
    airStatus: {
      Airconditioner: 27, //当前空调温度
      ConditionerPattern: "ZhiLeng", //当前空调模式
      ConditionerStatus: "开", //当前空调状态
      Indoortemperature: "27°", //当前室内温度,
      Outdoortemperature: "15°", //当前室外温度,
    },
    hiddenName: '',
    airModel: ['ZhiLeng', 'ZhiRe', 'ZiDong', 'ChuShi'],
    airModelIndex: 0,
    imgswitch1: base_url1 + '/kongtiaotiaojiehongse.png',
    imgswitch2: base_url1 + '/kongtiaokaiguanhuise.png',
    imgleft1: base_url1 + '/kongtiaoleftjiantouhongse.png',
    imgleft2: base_url1 + '/kongtiaoleftjiantouhuise.png',
    imgright1: base_url1 + '/kongtiaorightjiantouhongse.png',
    imgright2: base_url1 + '/kongtiaorightjiantouhuise.png',
    imgplus1: base_url1 + '/kongtiaojiahaohongse.png',
    imgplus2: base_url1 + '/kongtiaojiahaohuise.png',
    imgminus1: base_url1 + '/kongtiaojianhaohongse.png',
    imgminus2: base_url1 + '/kongtiaojianhaohuise.png'
  },

  onLoad: function(options) {
    console.log(options)
    this.setData({
      OrderId:options.OrderId
    })
    this.getSearchAirstatus()
  },

  /*   //查询空调状态 */
  getSearchAirstatus() {
    wx.request({
      url: base_url+'/v2.0/userroom/getConditioner?orderId='+this.data.OrderId,
      data: '',
      header: {
        userId: opiens.UserId,
        token: opiens.Token
      },
      method: 'GET',
      dataType: 'json',
      responseType: 'text',
      success: res => {
        console.log(res)
        let airData = res.data,
          dataValue = res.data.Value;
        /* //空调控件on/off, */
        if (airData.Status === true) {
          let conditionStatus = '';
          if (dataValue.ConditionerStatus === "Guan") {
            conditionStatus = "关"
            this.setData({
              hiddenName: true,
              airStatus: {
                Airconditioner: dataValue.Airconditioner, //当前空调温度
                ConditionerPattern: dataValue.ConditionerPattern,
                ConditionerStatus: conditionStatus, //当前空调模式
                Indoortemperature: dataValue.Indoortemperature, //当前室内温度,
                Outdoortemperature: dataValue.Outdoortemperature, //当前室外温度,
              }
            })
            // 空调模式枚举
            if (dataValue.ConditionerPattern === "ZhiLeng") {
              this.setData({
                [`airStatus.ConditionerPattern`]: "制冷"
              })
            } else if (dataValue.ConditionerPattern === "ZhiRe") {
              this.setData({
                [`airStatus.ConditionerPattern`]: "制热"
              })
            } else if (dataValue.ConditionerPattern === "ZiDong") {
              this.setData({
                [`airStatus.ConditionerPattern`]: "自动"
              })
            } else if (dataValue.ConditionerPattern === "ChuShi") {
              this.setData({
                [`airStatus.ConditionerPattern`]: "除湿"
              })
            }
          } else if (dataValue.ConditionerStatus === "Kai") {
            conditionStatus = "开"
            this.setData({
              hiddenName: false,
              airStatus: {
                Airconditioner: dataValue.Airconditioner, //当前空调温度
                ConditionerPattern: dataValue.ConditionerPattern,
                ConditionerStatus: conditionStatus, //当前空调模式
                Indoortemperature: dataValue.Indoortemperature, //当前室内温度,
                Outdoortemperature: dataValue.Outdoortemperature, //当前室外温度,
              }
            })
            // 空调模式枚举
            if (dataValue.ConditionerPattern === "ZhiLeng") {
              this.setData({
                [`airStatus.ConditionerPattern`]: "制冷"
              })
            } else if (dataValue.ConditionerPattern === "ZhiRe") {
              this.setData({
                [`airStatus.ConditionerPattern`]: "制热"
              })
            } else if (dataValue.ConditionerPattern === "ZiDong") {
              this.setData({
                [`airStatus.ConditionerPattern`]: "自动"
              })
            } else if (dataValue.ConditionerPattern === "ChuShi") {
              this.setData({
                [`airStatus.ConditionerPattern`]: "除湿"
              })
            }
          }
        }
      },
      fail: function(res) {
        console.log(res)
      },
      complete: function(res) {},
    })
  },
  /* 开关按钮 */
  onOff() {
    console.log(this.data.airStatus.ConditionerStatus)
    if (this.data.airStatus.ConditionerStatus === "关") {
      this.setData({
        [`airStatus.ConditionerStatus`]: "开",
        hiddenName: false
      });
      console.log(this.data.airStatus.ConditionerStatus)
      this.getAirCtrlClick(); //调节空调开关状态
    } else {
      console.log(this.data.airStatus.ConditionerStatus)
      this.setData({
        [`airStatus.ConditionerStatus`]: "关",
        hiddenName: true
      })
      this.getAirCtrlClick()
      console.log(this.data.airStatus.ConditionerStatus)
    }
  },
  //调节空调开关状态
  getAirCtrlClick() {
    // const option = wx.setg
    wx.request({
      url: base_url+'/v2.0/userroom/updateConditioner',
      data: {
        OrderId: this.data.OrderId,
        ConditionerStatus: this.data.airStatus.ConditionerStatus
      },
      header: {
        userId: opiens.UserId,
        token: opiens.Token
      },
      method: 'PUT',
      dataType: 'json',
      responseType: 'text',
      success: function(res) {
        console.log(res);

      },
      fail: function(res) {},
      complete: function(res) {},
    })
  },
  /* 调节温度 */
  tempU(e) {
    console.log(e)
    let tmpUpdate = parseInt(this.data.airStatus.Airconditioner);
    if (tmpUpdate < 27) {
      tmpUpdate += 1;
      this.setData({
        [`airStatus.Airconditioner`]: tmpUpdate 
      })
      this.getAirTemperature()
    } else if (tmpUpdate >= 27) {
      this.setData({
        [`airStatus.Airconditioner`]: 27 
      })
      this.getAirTemperature()
      wx.showToast({
        title: '温度已到尽头',
        duration: 1000,
        mask: true
      })
    }

  },
  tempD() {
    let tmpUpdate = parseInt(this.data.airStatus.Airconditioner);
    if (tmpUpdate > 16) {
      tmpUpdate -= 1;
      this.setData({
        [`airStatus.Airconditioner`]: tmpUpdate 
      })
      this.getAirTemperature()
    } else if (tmpUpdate <= 16) {
      this.setData({
        [`airStatus.Airconditioner`]: 16 
      })
      this.getAirTemperature()
      wx.showToast({
        title: '温度已到尽头',
        duration: 1000,
        mask: true
      })
    }
  },
  /* 调节模式 */
  modelL() {
    //console.log(this.data.airModel.indexOf(this.data.airStatus.ConditionerPattern))
    var currentConditionerPattern = "" //当前currentConditionerPattern
    if (this.data.airStatus.ConditionerPattern === "制冷") {
      currentConditionerPattern = "ZhiLeng"
    } else if (this.data.airStatus.ConditionerPattern === "制热") {
      currentConditionerPattern = "ZhiRe"
    } else if (this.data.airStatus.ConditionerPattern === "自动") {
      currentConditionerPattern = "ZiDong"
    } else if (this.data.airStatus.ConditionerPattern === "除湿") {
      currentConditionerPattern = "ChuShi"
    } //else {
    //   currentConditionerPattern = this.data.airStatus.ConditionerPattern
    // }
    let itemIndex = this.data.airModel.indexOf(currentConditionerPattern); //查询当前ConditionerPattern索引
    console.log(itemIndex)
    if (itemIndex > 0) {
      itemIndex-=1
      this.setData({
        airModelIndex: itemIndex, //改变索引
        [`airStatus.ConditionerPattern`]: this.data.airModel[this.data.airModelIndex] //更新ConditionerPattern
      })
    } else if (itemIndex = 0) {
      itemIndex=3
      this.setData({
        airModelIndex: itemIndex, //改变索引
        [`airStatus.ConditionerPattern`]: this.data.airModel[this.data.airModelIndex] //更新ConditionerPattern
      })
    }
    this.getAirTemperature(); //调节空调模式, 温度
    //console.log(this.data.airModelIndex)
    this.changeToChinese()  //空调模式转换成中文

  },

  modelR() {
    var currentConditionerPattern = "" //当前currentConditionerPattern
    if (this.data.airStatus.ConditionerPattern === "制冷") {
      currentConditionerPattern = "ZhiLeng"
    } else if (this.data.airStatus.ConditionerPattern === "制热") {
      currentConditionerPattern = "ZhiRe"
    } else if (this.data.airStatus.ConditionerPattern === "自动") {
      currentConditionerPattern = "ZiDong"
    } else if (this.data.airStatus.ConditionerPattern === "除湿") {
      currentConditionerPattern = "ChuShi"
    }// else {
     // currentConditionerPattern = this.data.airStatus.ConditionerPattern
    //}
    let itemIndex = this.data.airModel.indexOf(currentConditionerPattern); //查询当前ConditionerPattern索引
    console.log(itemIndex)
    if (itemIndex < 3) {
      this.setData({
        airModelIndex: itemIndex + 1, //改变索引
        [`airStatus.ConditionerPattern`]: this.data.airModel[this.data.airModelIndex] //更新ConditionerPattern
      })
    } else if (itemIndex = 3) {
      //itemIndex=5
      this.setData({
        airModelIndex: 0, //改变索引
        [`airStatus.ConditionerPattern`]: this.data.airModel[this.data.airModelIndex] //更新ConditionerPattern
      })
    }
    this.getAirTemperature();//调节空调模式,温度
    this.changeToChinese() //空调模式转换成中文
  },


  //调节空调模式,温度
  getAirTemperature() {
    wx.request({
      url: base_url+'/v2.0/userroom/conditionerPattern',
      data: {
        "OrderId": this.data.OrderId,
        "Airconditioner": this.data.airStatus.Airconditioner,
        "ConditionerPattern": this.data.airStatus.ConditionerPattern
      },
      header: {
        userId: opiens.UserId,
        token: opiens.Token
      },
      method: 'PUT',
      dataType: 'json',
      responseType: 'text',
      success: function(res) {
        console.log(res)
      },
      fail: function(res) {},
      complete: function(res) {},
    })
  },

  /**
   * 空调模式转换成中文
   */
  changeToChinese(){
    if (this.data.airStatus.ConditionerPattern === "ZhiLeng") {
      this.setData({ [`airStatus.ConditionerPattern`]: "制冷"})   
    } else if (this.data.airStatus.ConditionerPattern === "ZhiRe" ) {
      this.setData({ [`airStatus.ConditionerPattern`]: "制热" })   
    } else if (this.data.airStatus.ConditionerPattern === "ZiDong") {
      this.setData({ [`airStatus.ConditionerPattern`]: "自动" })    
    } else if (this.data.airStatus.ConditionerPattern === "ChuShi") {
      this.setData({ [`airStatus.ConditionerPattern`]: "除湿" })
    } 
  }
})