// import WxValidate from '../../utils/WxValidate.js'  //引入验证表单
 const app = getApp()
const base_url=app.base_url;
console.log("this is base_url")
console.log(base_url)
Page({
  data: {
    items: [  //性别
      { name: 'man', value: '男', checked: 'true' }, 
      { name: 'woman', value: '女' },
    ],
    form: {  //表单内容
      name: '',
      phone: '',
      email: '',
      idcard: ''
    },
    add:false
  },
  // 性别单选
  radioChange: function (e) {
    console.log('radio携带value值为：', e.detail.value)
    if (e.detail.value =="男"){
      this.setData({
        sex1: "Male"   //性别为男
      })
    }else{
      this.setData({
        sex1: "Famale"  //性别为女
      })
    }
  },
  //  清空input内容
  clearInputEvent1: function (res) {
    this.setData({
      "form.name": ''   //清空姓名
    })
  },
  clearInputEvent2: function (res) {
    this.setData({
      'form.phone': ''    //清空手机号
    })
  },
  clearInputEvent3: function (res) {
    this.setData({
      'form.email': ''  //清空邮箱
    })
  },
  clearInputEvent4: function (res) {
    this.setData({
      'form.idcard': ''  //清空身份证号
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
  },
  // 获取姓名
  inputName(e){
    const name1 = e.detail.value;
    this.setData({
      name1
    })
  },
  // 获取并验证手机号
  inputPhoneNum(e){
    const phone1 = e.detail.value
    const checkphone = /^1[34578]\d{9}$/.test(phone1)
    this.setData({
      checkphone,
      phone1
    })
  },
  // 获取并验证邮箱地址
  inputemail(e){
    const email1 = e.detail.value
    const checkemail = /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/.test(email1)
    this.setData({
      checkemail,
      email1
    })
  },
  // 获取并验证身份证号
  inputid(e) {
    const idcard1 = e.detail.value
    const checkeid = /^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/.test(idcard1)
    this.setData({
      checkeid,
      idcard1
    })
  },
  // 点击按钮-----验证信息并添加
  Addcontact() {
    if (!this.data.checkphone) {
      wx.showModal({
        content: '请填写正确的手机号',
        showCancel: false,
      })
    }
    else if (!this.data.checkemail) {
      wx.showModal({
        content: '请填写正确的邮箱地址',
        showCancel: false,
      })
    }
    else if (!this.data.checkeid) {
      wx.showModal({
        content: '请填写正确的身份证号',
        showCancel: false
      })
    }else{
      // 发送数据
      var info0 = { // 添加的联系人信息
        Name: this.data.name1,
        Phone: this.data.phone1,
        IdCard: this.data.idcard1,
        Email: this.data.email1,
        Sex: this.data.sex1
      }
      var info = JSON.stringify(info0)
      console.log(info)
      //性别的枚举类型: Male(男), Famale(女), Null(未设置)
      var opiens = wx.getStorageSync('UTR')
      wx.request({
        url: base_url+'/v2.0/heart/saveRelationperson',
        method: "POST",
        header: {
          userId: opiens.UserId,
          token: opiens.Token,
        },
        data: info,
        success: res => {
          console.log(res)
          const add = res.data.Value.Succeed
          this.setData({
            add      //添加成功为true
          })         
        }
      })
      if (this.data.add ==true){    //添加成功弹框
        wx.showModal({
          content: '添加成功',
          showCancel: false,
        })
      }     
    }
  },
})
