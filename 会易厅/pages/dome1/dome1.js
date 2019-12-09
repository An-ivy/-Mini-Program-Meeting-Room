const app = getApp()
var fly6 = true;
var cc;
Page({
  data: {
    year: 0,
    month: 0,
    date: ['日', '一', '二', '三', '四', '五', '六'],
    dateArr: [],
    isToday: 0,
    isTodayWeek: false,
    todayIndex: 0,
    hide: true,
    showky: true,
    showthrees: true,
    show: true,
    fly4:true,
    room:true,
    fly1:true,
    qtt:true,
    myTimeTime: true, //记录第一个时间值
    myTimeNoTime: true, //判断是否点击了小时数如果点击了就是false
    hideTime:true,
    dayfast: true,//当天的天数
    
  },
  onLoad: function() {
    // var str = '123131564641654'
    // var str1 = str.substr(0,4)+'*****'+str.substr(9)
    // console.log(str1)
    let now = new Date();
    let year = now.getFullYear();
    let month = now.getMonth() + 1;

    cc = now.getMonth() + 1;
    console.log(cc == month)

    let day = now.getDate()

    this.dateInit();
    var newDate = new Date()
    var h = newDate.getHours();
    this.setData({
      // monthTe: monthTe,
      year: year,
      month: month,
      h: h,
      cc: cc,
      day: day,
      isToday: '' + year + month + now.getDate()
    })

    if (cc == this.data.month) {
      var active = 'active'
      var nowDay = 'nowDay' //点击出现的圆圈
      this.setData({
        active: active,
        nowDay: nowDay //点击出现的圆圈
      })
    }

    //    this.data.list.forEach((item, index) => {
    //   console.log(item)

    // })
  

  },
  dateInit: function(setYear, setMonth) {
    //全部时间的月份都是按0~11基准，显示月份才+1
    let dateArr = []; //需要遍历的日历数组数据
    let arrLen = 0; //dateArr的数组长度
    let now = setYear ? new Date(setYear, setMonth) : new Date();
    let year = setYear || now.getFullYear();
    let nextYear = 0;
    let month = setMonth || now.getMonth(); //没有+1方便后面计算当月总天数
    let nextMonth = (month + 1) > 11 ? 1 : (month + 1);
    let startWeek = new Date(year + '/' + (month + 1) + '/' + 1).getDay(); //目标月1号对应的星期
    let dayNums = new Date(year, nextMonth, 0).getDate(); //获取目标月有多少天
    let obj = {};
    let num = 0;

    if (month + 1 > 11) {
      nextYear = year + 1;
      dayNums = new Date(nextYear, nextMonth, 0).getDate();
    }
    arrLen = startWeek + dayNums;
    for (let i = 0; i < arrLen; i++) {
      if (i >= startWeek) {
        num = i - startWeek + 1;
        obj = {
          // isToday: '' + year + (month + 1) + num,
          isToday: (month + 1),
          dateNum: num,
          weight: 5,
        }
      } else {
        obj = {};
      }
      dateArr[i] = obj;
    }
    this.setData({
      dateArr: dateArr
    })

    let nowDate = new Date();
    let nowYear = nowDate.getFullYear();
    let nowMonth = nowDate.getMonth() + 1;
    let nowWeek = nowDate.getDay();
    let getYear = setYear || nowYear;
    let getMonth = setMonth >= 0 ? (setMonth + 1) : nowMonth;

    if (nowYear == getYear && nowMonth == getMonth) {
      this.setData({
        isTodayWeek: true,
        todayIndex: nowWeek
      })
    } else {
      this.setData({
        isTodayWeek: false,
        todayIndex: -1
      })
    }
  },
  lastMonth: function() {
    //全部时间的月份都是按0~11基准，显示月份才+1
    let year = this.data.month - 2 < 0 ? this.data.year - 1 : this.data.year;
    let month = this.data.month - 2 < 0 ? 11 : this.data.month - 2;
    this.setData({
      year: year,
      month: (month + 1)
    })
    this.dateInit(year, month);
    if (thlist) {
      if (this.data.cc == this.data.month) {
        console.log("1")
        kynO = true
        kyFalse = false;
        fly5 = true
        var active = 'active' //本月不能点击的圆圈
        var nowDay = 'nowDay' //点击出现圆圈
        var activeKy = 'activeKy'
        var tt = 'tt'
        var nowColor = 'nowColor'
        this.setData({
          active: active,
          nowDay: nowDay,
          activeKy: tt,
          nowColor: nowColor,
          showthrees:true,
          // show: true
        })
        if (this.data.zuot != undefined) { //判断是否为undefined 如果是就让时间列表隐藏如果不是就显示出来
          this.setData({
            show: false
          })
        }
        if (kyqx) { //这里是判断是否点击了跨月如果没有点击就是false
          var webzkl = 'webzkl'
          console.log("-------------------------------")
          this.setData({
            webzkl: webzkl,
          })
          if (this.data.day == this.data.qhrq) { //判断的时间表
            console.log("2")
            this.setData({ //第一张时间表
              hide: false,
              showthrees: true
            })
          } else { //第二张时间表
            this.setData({
              show: false,
              showthrees: true
            })
          }
        }

      } else {
        console.log("123")
        var tt = 'tt'
        this.setData({
          active: tt,
          nowDay: tt,
          nowColor: tt,
        })
      }
    } else {
      if (cc == this.data.month) { //这里是判断清空后的状态
        console.log("3")
        kynO = true
        fly5 = true
        var active = 'active' //本月不能点击的圆圈
        var nowDay = 'nowDay' //点击出现圆圈
        var tt = 'tt'
        var nowroomday = 'nowroomday'
        this.setData({
          active: active,
          nowDay: nowDay,
          activeKy: tt,
          nowroomday: tt,
          show: false,
          showthrees: true
        })
      } else {
        console.log("123")
        var tt = 'tt'
        this.setData({
          active: tt,
          nowDay: tt,
          nowColor: tt,
        })
      }
    }
  },
  /**获取日期的天数
   */
  daybindTo(e) {
    const qhrq = e.currentTarget.dataset.index;
    if (this.data.dayfast){
    if (fly6) {
      if (this.data.day > qhrq) {
        console.log("不能选择")
      }
      if (qhrq == "") {

      } else {
        // fly4 = false
        this.setData({
          qhrq,
          hide: false,
          fly4:false,
          dayfast:false
        })
        // dayzuo = false
      }
    }
    
    }
  },
  // 不是当天天数
  zuoBing(e) {
    const lset = e.currentTarget.dataset.index;
    // console.log(lset)
    // this.setData({ lset })
    if (this.data.dayfast){
    if (lset >this.data.day){
      if(this.data.qtt){
      this.setData({ lset,
        qtt:false,
        hideTime:false,
        dayfast:false
      })
      }
    }
    }
  },
  /**---------------------------时间表------------------------------------------*/

  huorOnclick(e) {
    const indextime = e.currentTarget.dataset.index
    // console.log(this.data.noday2 && this.data.noday && this.data.time2)

      if (this.data.noday2 == undefined && this.data.noday == undefined && this.data.time2 == undefined) {
        if (this.data.time1 > indextime) {

        } else {
          if (this.data.h >= indextime) { //这里是判断如果当前时间大于等于之前的时间不能选择

          } else {
            // fly4 = true //判断点击今天后其他天数不能点击

            this.setData({
              indextime
            })
            if (this.data.fly1) {
              const time1 = e.currentTarget.dataset.index; //记录第一个下标
              console.log(time1)
              this.setData({
                time1,
                fly1:false
              })
              // leftNex = true
              // fly10 = false
              // fly1 = false
            } else {
            
              const time2 = e.currentTarget.dataset.index //记录最后一个下标
              console.log(time2)
              this.setData({
                time2
              })
            }
          }
          // // 判断结束时间是是否为空
          // if (this.data.time2 == undefined) {
          //   fly3 = true
          // } else {
          //   console.log("123")
          //   fly3 = false
          // }
        }
    }

  },
  /**-----------------------------------------------其他时间表-------------------------------------------------* */
  huorOnclickTime(e) {
    if (this.data.h1Time == undefined || this.data.h2Time == undefined) { //判断是否选择完第一个值和第二个值
      let horstTime = e.target.dataset.index
      let pink = "pink"
      // console.log(this.data.hideTime == this.data.hideTime)
      if (this.data.hideTime == this.data.hideTime) {
        if (this.data.myTimeNoTime) {
          this.setData({
            horstTime,
            pink,
            myTimeNoTime: false,
          })
        }
        if (this.data.myTimeTime) { //记录第一个值
          let h1Time = e.target.dataset.index
          this.setData({
            h1Time,
            myTimeTime: false,
            qxtime: true,
            color: 'color'
          })
        } else {
          let h2Time = e.target.dataset.index
          this.setData({
            h2Time,
            timeDayqtts: false
          })
        }
      }
    }

  },
  bindclick3(e) {
    console.log(e.currentTarget.dataset.index)
    const zuiones = e.currentTarget.dataset.index;
    if (this.data.zuiones == undefined) {
      if (this.data.zuiones1 > zuiones) { //当点击的第一个下标之前的不能选择
        // console.log("不能选择")
      } else {
        this.setData({
          zuiones
        })
        if (threes) {
          const zuiones1 = e.currentTarget.dataset.index; //记录第一个值
          console.log(zuiones1)
          this.setData({
            zuiones1
          })
          fly5 = false //判断其他日期的时间点
          threes = false //如果获取到第一个值就让他为false
        } else {

          const zuiones2 = e.currentTarget.dataset.index; //记录第二个值
          console.log(zuiones2)
          this.setData({
            zuiones2
          })

        }
      }

    } else {

    }

  },
  /**清空时间表*/
  roomClass() {
   
    wx.redirectTo({
      url: '../dome1/dome1',
    })
  },
  nextMonth: function() {
    let year = this.data.month > 11 ? this.data.year + 1 : this.data.year;
    let month = this.data.month > 11 ? 0 : this.data.month;
    console.log(month)
    this.setData({
      year: year,
      month: (month + 1)
    })
    //判断月份
    if (cc != this.data.month) { //切换比当前多一个月的时候改变class的状态
      kynO = false
      kyFalse = true; //这里是跨月方法属于false
      fly5 = false //禁止记录第二个值
      // console.log('123')
      var tt = 'tt';
      var nowDay = 'nowDay';
      var activeKy = 'activeKy'
      var nowColor = 'nowColor'
      var nowroomday = 'nowroomday'
      if (this.data.zuot == undefined) {
        this.setData({
          active: tt, //禁止本月点击的日期
          nowDay: nowDay, //点击出现颜色
          activeKy: activeKy,
          nowroomday: nowroomday,
          nowColor: tt,
          webzkl: tt,
          show: true,
          hide: true,
        })
      } else {
        this.setData({
          active: tt, //禁止本月点击的日期
          nowDay: tt, //点击出现颜色
          activeKy: activeKy,
          nowroomday: nowroomday,
          nowColor: tt,
          webzkl: tt,
          show: true,
          hide: true,
        })
      }

      if (this.data.kyMonth == undefined) { //判断的是第三个时间表
        // console.log("123---")
        this.setData({
          showthrees: true,
        })
      } else {
        console.log("123---")
        this.setData({
          showthrees: false,
        })
      }

      console.log(this.data.kyMonth == '')
      if (this.data.kyMonth == '') { //判断的是第三个时间表清空判断
        console.log("123---")
        this.setData({
          showthrees: true,
          // hide:true
        })
      }



    } else {
      var active = 'active'; //禁止本月点击的日期
      var nowDay = 'nowDay';
      var nowroomday = 'nowroomday'
      var tt = 'tt'
      this.setData({
        active: active, //不是本月的日期
        nowDay: nowDay, //点击出现的圆圈
        nowroomday: nowroomday,
        // webzkl:tt
        // nowColor: nowColor,

      })
    }
    this.dateInit(year, month);
    //不选中小时不能切换月份
    //全部时间的月份都是按0~11基准，显示月份才+1

  },
  // 确定按钮
  qdClickbind() {
    // if (qd) {
    //   if (this.data.qhrq == undefined && this.data.zuot11 == undefined && this.data.qhrq == undefined && this.data.zuot == undefined && this.data.zuorq1 == undefined) {
    //     // console.log("选择开始日期")
    //     wx.showToast({
    //       icon: 'loading',
    //       title: '选择开始日期',
    //     })
    //   } else if (this.data.zuot12 == undefined && this.data.zuot11 == undefined && this.data.zuot1 == undefined && this.data.zuot == undefined && this.data.qhrq == undefined && this.data.zuorq == undefined) {
    //     console.log("没有选择结束日期")
    //     wx.showToast({
    //       icon: 'loading',
    //       title: '没有选择结束日期',
    //     })
    //   } else if (this.data.nodayone == undefined && this.data.noday1 == undefined && this.data.time12 == undefined && this.data.time1 == undefined && this.data.daty1 == undefined) {
    //     console.log("选择开始时间")
    //     wx.showToast({
    //       icon: 'loading',
    //       title: '选择开始时间',
    //     })
    //   } else if (this.data.time2 == undefined && this.data.zuiones == undefined && this.data.zuiones2 == undefined && this.data.noday4 == undefined && this.data.zuiones1 == undefined && this.data.zuot12 == undefined && this.data.zuiones2 == undefined && this.data.noday23 == undefined && this.data.noday2 == undefined && this.data.time23 == undefined && this.data.noday3 == undefined) {
    //     wx.showToast({
    //       icon: 'loading',
    //       title: '选择结束时间',
    //     })
    //     console.log("选择j结束时间")
    //   } else {
    //     wx.setStorageSync('daymonth', {
    //       year: this.data.year,
    //       month: this.data.month,
    //       day: this.data.qhrq || this.data.zuot11 || this.data.qhrq || this.data.zuot || this.data.zuorq1,
    //       hours: this.data.nodayone || this.data.noday1 || this.data.time12 || this.data.time1 || this.data.daty1,
    //       yearend: this.data.year,
    //       monthend: this.data.month,
    //       dayend: this.data.zuot12 || this.data.zuot11 || this.data.zuot1 || this.data.zuot || this.data.qhrq || this.data.zuorq,
    //       hoursend: this.data.time2 || this.data.zuiones || this.data.zuiones2 || this.data.noday4 || this.data.zuiones1 || this.data.zuot12 || this.data.zuiones2 || this.data.noday23 || this.data.noday2 || this.data.time23 || this.data.noday3
    //     })
    //     wx.switchTab({
    //       url: '/pages/name/name',
    //     }) 
    //   }
    // }




    if (this.data.qhrq == undefined && this.data.lset == undefined) {
      wx.showToast({
        icon: 'loading',
        title: '选择开始日期',
      })
    } else if (this.data.horstTime == undefined && this.data.time1 == undefined) {
      console.log("选择开始时间")
      wx.showToast({
        icon: 'loading',
        title: '选择开始时间',
      })
    } else if (this.data.h2Time == undefined && this.data.time2 == undefined) {
      wx.showToast({
        icon: 'loading',
        title: '选择结束时间',
      })
      console.log("选择j结束时间")
    } else {
      // this.allMoney() //调取价钱接口
      wx.setStorageSync('daymonth', {
        year: this.data.year,
        month: this.data.month,
        day: this.data.qhrq || this.data.lset,
        hours: this.data.time1 || this.data.h1Time,
        yearend: this.data.year,
        monthend: this.data.month,
        dayend: this.data.qhrq || this.data.lset,
        hoursend: this.data.time2 || this.data.h2Time,
      })
      wx.switchTab({
          url: '/pages/name/name',
        }) 
      // this.roomClass()
      // wx.navigateBack({
      //   delta: 1, // 回退前 delta(默认为1) 页面
      // });

    }


  },
  onReady: function() {

  }
})