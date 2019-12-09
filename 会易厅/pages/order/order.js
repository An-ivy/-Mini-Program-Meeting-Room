// pages/order/order.js
let app = getApp();
let base_url = app.base_url;

Page({
  data: {
    allMoney: '',
    Title:'',//房间信息
    hideModal: true, //模态框的状态 
    animationData: {}, //优惠券动画
    showModal: false, //模态框状态
    // curIdx: null,
    price: "", //最终价格
    curretsale: "未使用优惠券", //优惠价格
    hide: true, //显示隐藏“已选中”
    form: {
      name: '', //入住人姓名
      phone: '', //入住人电话
      idcard: '' //入住人身份证号
    },
    currentItem: '',
    Reserve: 'Reserve',
    show:true
  },
  // 房间信息请求
  getTitmle() {
    wx.request({
      url: base_url + '/v2.0/userroom/findofRoom?roomId=' + this.data.roomId,
      method: 'get',
      header: {
        userId: this.data.opiens.UserId,
        token: this.data.opiens.Token
      },
      success: res => {
        console.log("这是房间信息")
        console.log(res.data)
        const Title = res.data.Value
        this.setData({
          Title
        })
      }
    })
  },
  //跳转到日历
  funCtionClick(){
    wx.navigateTo({
      url: '/pages/logs/logs?roomId=' + this.data.roomId,
    })
    // wx.setStorageSync(roomId, data)
    this.setData({
      show:false
    })
  },
  //请求优惠券
  Forsale() {
    var infore = {
      RoomId: this.data.roomId,
      StartDate: this.data.year + "-" + this.data.month + "-" + this.data.day + "-" + this.data.hours,
      EndDate: this.data.yearend + "-" + this.data.monthend + "-" + this.data.dayend + "-" + this.data.hoursend
    }
    var info = JSON.stringify(infore)
    console.log(info)
    console.log(info)
    wx.request({
      url: base_url + '/v2.0/couponsController/algorithm',
      header: {
        userId: this.data.opiens.UserId,
        token: this.data.opiens.Token
      },
      data: info,
      method: "POST",
      success: res => {
        console.log(res.data.Value)
        const s2 = res.data.Value
        console.log(s2)
        this.setData({
          s2
        })
      }
    })

  },

  // 获取选择优惠券
  Choose(e) {
    console.log(e)
    let that = this
    var id = e.currentTarget.dataset.id;
    var id1 = id + 1
    console.log(id)
    //设置当前已选中样式
    that.setData({
      id,
      id1
    })
    // 获取当前优惠价格
    var curretsale = this.data.s2[id].Sale;
    console.log(curretsale)
    var curretsale1 = "-￥" + curretsale
    this.setData({
      curretsale,
      curretsale1
    })
    console.log(this.data.ret)
    //优惠券减价格得到最终价格
    if (this.data.curretsale !== null) {
      this.setData({
        price: (this.data.ret - this.data.curretsale)
      })
      console.log(this.data.price)
    } else {}
  },
  //点击不使用优惠券
  nosale(e) {
    console.log(e)
    this.setData({
      curretsale1: "",
      price: this.data.ret,
      id1:0
    })
  },

  // 获取选择联系人信息
  Chooseperson(e) {
    console.log(e.currentTarget.dataset.id)
    var i = e.currentTarget.dataset.id
    // console.log(this.data.contact[i])
    var ccontact = this.data.contact[i];
    console.log(ccontact.IdCard)
    this.setData({
      ['form.name']: ccontact.Name,
      ['form.phone']: ccontact.Phone,
      ['form.idcard']: ccontact.IdCard,
      showModal: !this.data.showModal
    })
  },
  // 请求数据
  onLoad: function(options) {
    var opiens = wx.getStorageSync('UTR')
    console.log(opiens)
    this.setData({ opiens })
    console.log(options)
    const roomId = options.roomID;
    this.setData({//将上一页缓存的roomId进行存储
      roomId
    })
    this.getTitmle()//调取房间信息
    console.log(this.data.Title)
    // 请求常用联系人信息
    wx.request({
      url: base_url + '/v2.0/userroom/findRelationperson',
      method: "GET",
      header: {
        userId: this.data.opiens.UserId,
        token: this.data.opiens.Token
      },
      success: res => {
        console.log(res.data.Value)
        const contact = res.data.Value;
        this.setData({
          contact
        })
      }
    })


  },

  // 添加联系人跳转页面
  jumpPage: function() {
    wx.navigateTo({
      url: '../addContact/addContact',
    })
  },
  /* 跳转入住条款 */
  catchCheckTerm() {
    wx.navigateTo({
      url: '/pages/CheckInTerms/CheckInTerms',
      success: function(res) {},
      fail: function(res) {},
      complete: function(res) {},
    })
  },
  // 显示遮罩层------优惠券+联系人
  showModal: function() {
    var that = this;
    that.setData({
      hideModal: false
    })
    var animation = wx.createAnimation({
      duration: 600, //动画的持续时间 默认400ms   数值越大，动画越慢   数值越小，动画越快
      timingFunction: 'ease', //动画的效果 默认值是linear
    })
    this.animation = animation
    setTimeout(function() {
      that.fadeIn(); //调用显示动画
    }, 200)
  },

  // 隐藏遮罩层------优惠券
  hideModal: function() {
    var that = this;
    var animation = wx.createAnimation({
      duration: 800, //动画的持续时间 默认400ms   数值越大，动画越慢   数值越小，动画越快
      timingFunction: 'ease', //动画的效果 默认值是linear
    })
    this.animation = animation
    that.fadeDown(); //调用隐藏动画   
    setTimeout(function() {
      that.setData({
        hideModal: true
      })
    }, 720) //先执行下滑动画，再隐藏模块

  },

  //动画集
  fadeIn: function() {
    this.animation.translateY(0).step()
    this.setData({
      animationData: this.animation.export() //动画实例的export方法导出动画数据传递给组件的animation属性
    })
  },
  fadeDown: function() {
    this.animation.translateY(300).step()
    this.setData({
      animationData: this.animation.export(),
    })
  },
  // 联系人模块
  openrule: function() {
    this.setData({ //打开模块
      showModal: true
    });
  },
  closerule: function() {
    this.setData({ //关闭模块
      showModal: false
    });
  },
  // 添加常用联系人
  // 入住人信息验证
  inputName(e) {
    const name1 = e.detail.value
    const checkname = /^[\u4E00-\u9FA5\uf900-\ufa2d·s]{2,20}$/.test(name1)
    this.setData({
      checkname,
      name1
    })
  },
  // 验证手机号
  inputPhoneNum(e) {
    const phone1 = e.detail.value
    const checkphone = /^1[34578]\d{9}$/.test(phone1)
    this.setData({
      checkphone,
      phone1
    })
  },
  // 验证身份证号
  inputId(e) {
    const idcard1 = e.detail.value
    const checkeid = /^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/.test(idcard1)
    this.setData({
      checkeid,
      idcard1
    })
  },
  // 我同意入住条款
  switchChange(e) {
    const agree = e.detail.value
    if (agree) {
      this.setData({
        cansubmit: true
      })
    }
  },
  // 获取input文本
  OnclickInpt(e) {
    console.log(e.detail.value)
    this.setData({
      test: e.detail.value
    })
  },
  //  验证信息
  Order() {
    console.log(!this.data.checkname || this.data.form.name)
    console.log(!this.data.checkphone || this.data.form.phone)

    // listName.forEach((item,index)=>{
    //   console.log(item.Name)
    // })
    if (!(this.data.checkname || this.data.form.name)) {
      wx.showModal({
        content: '请填写正确的姓名',
        showCancel: false,
      })
    } else if (!(this.data.checkphone || this.data.form.phone)) {
      wx.showModal({
        content: '请填写正确的手机号',
        showCancel: false,
      })
    } else if (!(this.data.checkeid || this.data.form.idcard)) {
      wx.showModal({
        content: '请填写正确的身份证号',
        showCancel: false,
      })
    } else if (!this.data.cansubmit) {
      wx.showModal({
        content: "请同意入住条款后再确认订单",
      })
    } else {
      console.log("46546464654546")
      // 请求页面信息
      var infore0 = {
        Phone: this.data.phone1 || this.data.form.phone,
        IdCard: this.data.idcard1 || this.data.form.idcard,
        UserName: this.data.name1 || this.data.form.name,
        RoomId: this.data.roomId,
        EndTime: this.data.yearend + "-" + this.data.monthend + "-" + this.data.dayend + "-" + this.data.hoursend, //结束时间
        StartTime: this.data.year + "-" + this.data.month + "-" + this.data.day + "-" + this.data.hours, //开始时间
        Text: this.data.test, //备注
        MapId: this.data.id1||0, //优惠券id
        ReserveType: this.data.Reserve //Immediately立即入住  Reserve预定
      }
      var info0 = JSON.stringify(infore0)
      console.log(info0)
      wx.request({
        url: base_url + '/v2.0/userroom/yudingroom',
        method: "POST",
        header: {
          userId: this.data.opiens.UserId,
          token: this.data.opiens.Token
        },
        data: info0,
        success: res => {
          console.log(res.data.Value)
          if (res.data.Value.Succeed == true) {
            const Msg = res.data.Value.Msg
            this.setData({
              Msg
            })
            wx.navigateTo({ // 确认订单跳转订单详情界面
              url: '/pages/Order_details/Order_details?orderId=' + this.data.Msg,
            })
          } else {
            wx.showModal({
              title: '该时间段已经被预定',
              content: '请重新预定',
            })
          }
        }
      })
    }
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    console.log(this.data.Title)
    //判断若无房间信息，则进行二次请求 
    !this.data.Title ? this.getTitmle():'';//调取房间信息
    //拿取日历缓存的时间进行data存储
    let getDate = wx.getStorageSync("daymonthCourter");
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
      // money: getDate.myDayMonth,
    })
    let pages = getCurrentPages()
    let curpage = pages[pages.length - 1]
    console.log(curpage)
      this.setData({
        ret: curpage.data.allMoney
      })
    this.setData({
      price: this.data.ret
    })
      this.Forsale()
  },
})