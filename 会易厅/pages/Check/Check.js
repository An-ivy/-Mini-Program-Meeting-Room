// pages/go/go.js
const app=getApp();
const base_url=app.base_url;
var dateTimePicker = require('../../utils/dateTimePicker.js')
Page({
  data: {
    date: '2018-10-01',
    time: '12:00',
    dateTimeArray1: null,
    dateTime1: null,
    startYear: 2000,
    endYear: 2050,
    checkOutTime:''
  },
  onLoad(option) {
    console.log(option)
    const OrderId = option.OrderId
    console.log(OrderId)
    //初始化时间
    this.setData({
      checkOutTime:option.EndDate,
      OrderId
    })
    // 获取完整的年月日 时分秒，以及默认显示的数组
    var obj = dateTimePicker.dateTimePicker(this.data.startYear, this.data.endYear);
    var obj1 = dateTimePicker.dateTimePicker(this.data.startYear, this.data.endYear, this.data.checkOutTime);
    // 精确到分的处理，将数组的秒去掉
    var lastArray = obj1.dateTimeArray.pop();
    var lastTime = obj1.dateTime.pop();
    console.log(obj1.dateTime)

    this.setData({
      dateTimeArray1: obj1.dateTimeArray,
      dateTime1: obj1.dateTime
    });
  },

  changeDateTime1(e) { //有用
    const aa = e.detail.value
    console.log(aa)

    this.setData({ dateTime1: e.detail.value });
  },

  changeDateTimeColumn1(e) {//有用
    var arr = this.data.dateTime1, dateArr = this.data.dateTimeArray1;
    arr[e.detail.column] = e.detail.value;
    console.log(arr)
    dateArr[2] = dateTimePicker.getMonthDay(dateArr[0][arr[0]], dateArr[1][arr[1]]);

    this.setData({
      dateTimeArray1: dateArr,
      dateTime1: arr
    });
  },
  //获取留言的数据
  inputValue(e) {
    console.log(e.detail.value)
    //把value值拿出来
    const ValueIs = e.detail.value
    this.setData({
      ValueIs
    })

  },
  // 调取数据
  _getTimes() {
    var aa = this.data.ValueIs
    console.log(aa)
    if (this.data.ValueIs == undefined ){
      wx.showToast({
        title: '请输入留言',
        icon: 'succes',
        duration: 1200,
        mask: true
      })
    }else{
      const ront = this.data.dateTimeArray1[0][this.data.dateTime1[0]]
      const yue = this.data.dateTimeArray1[1][this.data.dateTime1[1]]
      const ri = this.data.dateTimeArray1[2][this.data.dateTime1[2]]
      const hour = this.data.dateTimeArray1[3][this.data.dateTime1[3]]
      const fen = this.data.dateTimeArray1[4][this.data.dateTime1[4]]
      var str = ront + "-" + yue + "-" + ri + " " + hour + ":" + fen
      console.log(str)
      var opiens = wx.getStorageSync('UTR')
      var objs = { "OrderId": this.data.OrderId, "CloseTime": str, "Text": this.data.ValueIs }
      console.log(objs)
      var obj = JSON.stringify(objs)
      wx.request({
        url: base_url + '/v2.0/result/retreatRoom',
        method: 'post',
        header: {
          userId: opiens.UserId,
          token: opiens.Token
         },
        data: objs,
        success:res=>{
          console.log(res)
          if (res.data.Value == true) {
            wx.showToast({
              title: '退房成功',
              icon: 'success',
              duration: 1000
            })
          }else{
            wx.showToast({
              title: '退房失败',
              icon: 'loading',
              duration: 1000
            })
          }
        }
      })
    }
  },
})