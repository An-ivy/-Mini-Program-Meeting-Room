// pages/room/room.js
var Moment = require("../../utils/moment.js");
const app = getApp();
const map_key = app.map_key;
const base_url = app.base_url;
console.log(map_key);
var QQMapWX = require('../../libs/qqmap-wx-jssdk.js');
var qqmapsdk = new QQMapWX({
  //此key需要用户自己申请
  key: map_key
});
let _page, _this;
var DATE_LIST = [];
var DATE_YEAR = new Date().getFullYear()
var DATE_MONTH = new Date().getMonth() + 1
var DATE_DAY = new Date().getDate()

Page({
  data: {
    checkInDate: "",  //入住时间
    checkOutDate: "",  //离开时间
    indexst_:1,
    result: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30', '31', '32', '33', '34', '35', '36', '37', '38', '39', '40', '41', '42', '43', '44', '45', '46', '47', '48', '49', '50'],  //容纳人数50
    index: 0,
    items: [  
      { name: 'USA', value: '不限', checked: false },   //不限单选按钮
    ],
    instrument: [{  //交通工具
      id: 0,
      value: "步行10分钟",
      checked:true
    }, {
      id: 1,
      value: "骑行15分钟"
    }, {
      id: 2,
      value: "驾车30分钟"
    }, {
      id: 3,
      value: "地铁40分钟"
    }],
    how: [{  //入住方式
      value:"预定入住",
      }, //{
      //value:"立即入住",
      //}
      ],
    aa: 'CHN',
    pageone: [{  //点击不限隐藏价位
      name: 'pages1',
      text: 'pages1',
      checked: false
    }],
    buxing: "walk",
    indexst: 0,
    instrumentresult: '',
    nuu1: 0,  //最高价格
    nuu2: 0, //最低价格
    latitude: app.globalData.localLat,
    longitude: app.globalData.localLng,
    address: app.globalData.localPlace,
    src: "",
    show:true
  },

  // 不限按钮
  bindtap1: function(e) {
    var items = this.data.items;
    for (var i = 0; i < items.length; i++) {
      if (items[i].name == this.data.aa) {
        for (var j = 0; j < items.length; j++) {
          // console.log("items[j].checked = ", items[j].checked);
          if (items[j].checked && j != i) {
            items[j].checked = false;
          }
        }
        items[i].checked = !(items[i].checked);
        console.log("-----:", items);
        // this.setData(this.data.items[i]);
      }
    }
    this.setData({
      items: items
    });
    // 显示隐藏价位信息----不限
    var newpage = this.data.pageone; /*获取brand数组*/
    newpage[0].checked = !(newpage[0].checked);
    this.setData({
      pageone: newpage
    });
  },
  // 选择不限
  radioChange1: function(e) {
    this.data.aa = e.detail.value;
    console.log(this.data.aa);
    // 显示隐藏价位信息
    let pages1 = e.detail.value;
    this.setData({
      seleted: "选中的value：" + pages1
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    // console.log(options)
    console.log(app.globalData.localPlace + "," + app.globalData.localLng + "," + app.globalData.localLat);
    /*判断是第一次加载还是从position页面返回
    如果从position页面返回，会传递用户选择的地点*/
    if (options.address != null && options.address != "") {
      //设置变量 address 的值
      // console.log(options)
      console.log(app.globalData.localPlace + "," + app.globalData.localLng + "," + app.globalData.localLat);
      this.setData({
        latitude: options.latitude,
        longitude: options.longitude,
        address: options.address
      });
    } else {
      // 调用接口
      qqmapsdk.reverseGeocoder({
        success: (res) => {
          console.log(res)
          this.setData({
            address: res.result.address,
            latitude: res.result.ad_info.location.lat,
            longitude: res.result.ad_info.location.lng
          });
        },
        fail: function(res) {
          console.log(res);
        },
        complete: function(res) {
          console.log(res);
        }
      });
    }
  },
// 点击更改最佳户型/人数
bindTimeChange(e) {
  // 获取下标
  console.log(e.detail.value)
  this.setData({
    indexst_: parseInt(e.detail.value) + 1,
    indexst: parseInt(e.detail.value)
  })

},
// 跳转页面
  onClickFun(){
    wx.navigateTo({
      url: '/pages/dome1/dome1',
    })
    this.setData({
      show:false
    })
  },
  // instrument交通工具选择
  radio: function(e) {
    console.log(e.detail.value)
    switch (e.detail.value) {
      case "步行10分钟":
        this.setData({
          buxing: 'walk'
        })
        break;
      case "骑行15分钟":
        this.setData({
          qixing: 'riding'
        })
        break;
      case "驾车30分钟":
        this.setData({
          jqche: 'car'
        })
        break;
      case "地铁40分钟":
        this.setData({
          ditie: 'metro'
        })
        break;
    }
  },
 // 获取input价位的值
  inputFour(e) {
    console.log(e.detail.value)
    const inputs = e.detail.value;
    this.setData({
      inputs
    })
  },
  // 入住模式单选
  radioChange2: function (e) {
    const howto = e.detail.value
    if (howto == "立即入住") {
      this.setData({
        howtodo: 'now'
      })
    } else {
      this.setData({
        howtodo: 'order'
      })
    }
  },
  // 查看结果
  resultt(e) {
    // console.log(this.data.indexst_)
      var mor = this.data.inputs //输入的价位
      var type = Number(mor)
      if (this.data.items[0].checked) {  //设置不限的价位为0 0
        this.data.nuu1 = 0,//最高价格
          this.data.nuu2 = 0//最低价格
      } else { //输入价格加减100
        this.data.nuu1 = 0,//最高价格
          this.data.nuu2 = 0//最低价格
      }
      console.log(this.data.nuu1, this.data.nuu2)
      // 请求预订入住数据
      wx.request({
        url: base_url + '/v2.0/BlwRoom/findRoomHuiYi',
        data: {
          lat: this.data.latitude, //经度this.data.lat   
          lng: this.data.longitude, //纬度this.data.log  
          startTime: this.data.year + "-" + this.data.month + "-" + this.data.day + "-" + this.data.hours,//开始时间
          endTime: this.data.yearend + "-" + this.data.monthend + "-" + this.data.dayend + "-" + this.data.hoursend,//结束时间
          endPrice: 0 ,//this.data.nuu1,//最高价格
          startPrice:0 ,//this.data.nuu2,//最低价格
          //最高价格
          huxing: 'HuiYiShi', //户型
          renShu: this.data.indexst_, //人数
          instrument:'metro' //this.data.ditie  //|| this.data.qixing || this.data.jqche ||this.data.buxing, //交通工具
        },
        method: 'GET',
        success: res => {
          console.log(res.data.Value)
          const nusmes = res.data.Value     
          this.setData({
            nusmes
          })
          app.globalData.locationresult = this.data.nusmes;
          console.log(app.globalData.locationresult)
          wx.switchTab({
            url: '/pages/index/index',
          })
        },
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
    console.log(app.globalData.localPlace + "," + app.globalData.localLng + "," + app.globalData.localLat);
    console.log(app.globalData.locationresult)
    this.setData({
      latitude: app.globalData.localLat,
      longitude: app.globalData.localLng,
      address: app.globalData.localPlace
    });
    console.log(this.data.latitude+ "," + this.data.longitude)
    let getDate = wx.getStorageSync("daymonth");
    console.log(getDate)
    this.setData({
      day: getDate.day,
      hours: getDate.hours,
      month: getDate.month,
      year: getDate.year,
       dayend: getDate.dayend,
      hoursend: getDate.hoursend,
      monthend: getDate.monthend,
      yearend: getDate.yearend,
    })
  },
})