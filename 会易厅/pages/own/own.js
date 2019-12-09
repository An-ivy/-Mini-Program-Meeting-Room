let app = getApp();
let base_url = app.base_url;

Page({
  data: {
    array: ['美国', '中国', '巴西', '日本'],
    objectArray: [
      {
        id: 0,
        name: '美国'
      },
      {
        id: 1,
        name: '中国'
      },
      {
        id: 2,
        name: '巴西'
      },
      {
        id: 3,
        name: '日本'
      }
    ],
    multiIndex: [0, 0, 0],
    date: '2016-09-01',
    time: '12:01',
    region: ['', '', ''], //默认地址
    customItem: '全部',
    items: [
      { name: 'Male', value: '男', checked: true },  //性别选择
      { name: 'Female', value: '女' },
    ],
    tempFilePaths: '',
    inputValue1: null,
    inputValue2: null,
    inputValue3: null,
    inputValue4: null,
    inputValue5: null,
    interval: 5000,
    duration: 2000,
    name: "",
    phone: "",
    email: "",
    id: "",
    userNames: '',
    uploaderList: [],
    uploaderNum: 0,
    showUpload: true,
    index: 1,
    hide1:false,
    hide2:true
  },
  changepic(){
    if(this.data.hide1==false){
      this.setData({
        hide1: true,
        hide2: false
      })
        this.upload()    
    }else{
    }
  },
  // 选择常驻地
  bindRegionChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    const region0 = e.detail.value
    const region = e.detail.value.toString()
    console.log(region)
    this.setData({
      region,
      region0
    })
  },
  // 选择性别
  radioChange: function (e) {
    console.log('radio发生change事件，携带value值为：', e.detail.value)
    const sex = e.detail.value;
    if (sex=="男"){
      this.setData({
        sex: "Male"
      })
    } else if (sex == "女"){
      this.setData({
        sex: "Famale"
      })
    }
  },
  //展示图片
  showImg: function (e) {
    var that = this;
    wx.previewImage({
      urls: that.data.uploaderList,
      current: that.data.uploaderList[e.currentTarget.dataset.index]
    })
  },
  /**
   *  //图片转码
   *  **/
  upload: function (e) {
    var that = this;
    wx.chooseImage({
      count: 2 - that.data.uploaderNum, // 默认9
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        console.log(res)
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        let tempFilePaths = res.tempFilePaths;
        for (var i = 0; i < tempFilePaths.length; i++) {
          var name = tempFilePaths[i]
          var obj = name.substring(name.lastIndexOf(".") + 1) //截取png

          const lib = wx.getFileSystemManager().readFileSync(res.tempFilePaths[i], "base64") //图片转成64
          that.setData({
            ['Photos.Mime']: obj,
            ['Photos.Photo']: lib
          })
          let uploaderList = that.data.uploaderList.concat(tempFilePaths);
          if (uploaderList.length == 1) {
            that.setData({
              showUpload: false
            })
          }
          that.setData({
            uploaderList: uploaderList,
            uploaderNum: uploaderList.length,
          })
        }
      }
    })
  },
  /**
   * 将转码图片发给服务器**/
   sendImgSever(){
     console.log("base64码","photo格式")
     console.log(this.data.Photos.Photo, this.data.Photos.Mime)
     wx.request({
       url: base_url+'/v2.0/userphoto/saveuserPhoto',
       data: {
         "File": this.data.Photos.Photo, "Mime": this.data.Photos.Mime
       },
       header: {
         userId: this.data.opiens.UserId,
         token: this.data.opiens.Token,
       },
       method: 'POST',
       dataType: 'json',
       responseType: 'text',
       success: (res)=> {
         console.log("图片成功",res)
       },
       fail: function(res) {},
       complete: function(res) {},
     })
   },

  //  清空input内容
  clearInputEvent1: function (res) {
    this.setData({
      'userNames.Nickname': ''  //清空昵称
    })
  },
  clearInputEvent3: function (res) {
    this.setData({
      'userNames.Phone': ''//清空电话
    })
  },
  clearInputEvent4: function (res) {
    this.setData({
      'userNames.Email': ''//清空邮箱
    })
  },
  // 获取昵称
  inputnick(e) {
    const nick1 = e.detail.value;
    this.setData({
      nick1
    })
  },
  // 获取并验证手机号
  inputPhoneNum(e) {
    const phone1 = e.detail.value
    const checkphone = /^1[34578]\d{9}$/.test(phone1)
    this.setData({
      checkphone,
      phone1
    })
  },
  // 获取并验证邮箱地址
  inputemail(e) {
    const email1 = e.detail.value
    const checkemail = /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/.test(email1)
    this.setData({
      checkemail,
      email1
    })
  },
  // 点击按钮-----验证信息并保存
  Save() {
    if (this.data.checkphone==false && this.data.Phone==undefined) {
      wx.showModal({
        content: '请填写正确的手机号',
        showCancel: false,
      })
    }
    else if (this.data.checkemail == false && this.data.Email == undefined) {
      wx.showModal({
        content: '请填写正确的邮箱地址',
        showCancel: false,
      })
    }else {//保存信息
    const userinfo ={
        Nickname: this.data.nick1 || this.data.userNames.Nickname, 
        Email: this.data.email1 || this.data.userNames.Email,
        Permanentland: this.data.region|| this.data.userNames.Permanentland,
        Sex: this.data.sex || this.data.userNames.Sex,    //Male(男),  Famale(女) 
        IdCard: this.data.userNames.IdCard, 
        UserName: this.data.userNames.UserName
    }
    const info = JSON.stringify(userinfo);
    console.log(info)
    // 将个人信息发送
      wx.request({
        url: base_url + '/v2.0/heart/updateuserMessage',
        method:'PUT',
        data: info,
        header: {
          userId:this.data.opiens.UserId,
          token: this.data.opiens.Token,      
        },
        success:res=>{
          console.log(res)
          this.sendImgSever()//上传图片
          this.UserName()//保存
          wx.showModal({
            content: '保存成功',
            showCancel: false,
          })
        }
      })
    }     
  },
  onLoad: function (options) {
    var opiens = wx.getStorageSync('UTR');
    this.setData({
      opiens
    })
    this.UserName() //获取页面信息
  },
  // 请求页面数据
  UserName() {
    wx.request({
      url: base_url + '/v2.0/profile/userprofile',
      header: {
        userId: this.data.opiens.UserId,
        token: this.data.opiens.Token,
      },
      method: 'GET',
      success: res => {
        console.log("请求页面数据",res.data.Value)
        const userNames = res.data.Value
        this.setData({
          userNames: userNames
        })
      }
    })
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
