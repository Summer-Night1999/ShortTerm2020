// pages/addOrder/addOrder.js
const DB = wx.cloud.database().collection("order_list")
var util = require('../../utils/util.js');

Page({

  data: {
    height: 20,
    focus: false,
    date: '',
    time: '',
    address:'',
    name:"",
    number:"",
    errorDesc:'',
    tempFilePaths: '',
    result:[]
  },
  onLoad(){
    DB.orderBy('orderid','desc').get({
      success: res => {
        this.result=res.data;
        this.setData({
          result: this.result
        })
      },
      fail: err => {
        wx.showToast({
          icon: 'none',
          title: '查询记录失败'
        })
        console.error('[数据库] [查询记录] 失败：', err)
      }
    })
  },
  bindButtonTap: function() {
    this.setData({
      focus: true
    })
  },
  //表单提交确认s
  bindFormSubmit: function(e) {
    this.errorDesc=e.detail.value;
    this.setData({
      errorDesc: e.detail.value
    })
  },
  //日期选择器变化
  bindDateChange: function(e) {
    this.setData({
      date: e.detail.value
    })
    console.log('picker发送选择改变，携带值为', this.data.date)
  },
  //时间选择器变化
  bindTimeChange: function(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      time: e.detail.value
    })
  },
  chooseimage: function() { 
    var _this = this; 
    wx.chooseImage({ 
      count: 1, // 默认9 
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有 
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有 
      success: function (res) { 
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片 
        _this.setData({ 
          tempFilePaths:res.tempFilePaths 
        })
        console.log();
      } 
    }) 
  },
  bindname:function(e){
    this.setData({
      name:e.detail.value
    })
  },
  bindnumber:function(e){
    this.setData({
      number:e.detail.value
    })
  },
  bindaddress:function(e){
    this.setData({
      address:e.detail.value
    })
  },
  bindTextArea: function(e) {
    this.errorDesc=e.detail.value;
    this.setData({
      errorDesc: e.detail.value
    })
  }, 



  confirm(){
    console.log(this.errorDesc)
    DB.add({
      data:{
        orderid:this.result[0].orderid+1,
        address:this.data.address,
        Date:this.data.date+' '+this.data.time,
        userId:this.data.name,
        errorDesc:this.errorDesc,
        Tel:this.data.number,
        orderStatus:'未接单'
      },
      success(res){
        console.log("添加成功",res)
      },
      fail(res){
        console.log("添加失败",res)
      }
    })
    wx.navigateBack({
        delta: 0,
      })
  }
 
})