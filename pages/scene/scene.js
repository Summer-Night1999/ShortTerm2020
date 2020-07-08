// pages/addOrder/addOrder.js
const DB = wx.cloud.database().collection("scene_list")
var util = require('../../utils/util.js');

Page({

  data: {
    height: 20,
    focus: false,
    date: '2016-09-01',
    time: '12:01',
    reason:"",
    name:"",
    tempFilePaths: ''
  },
  bindname:function(e){
    this.setData({
      name:e.detail.value
    })
  },
  bindreason:function(e){
    this.setData({
      reason:e.detail.value
    })
  },
  bindButtonTap: function() {
    this.setData({
      focus: true
    })
  },
  bindTextAreaBlur: function(e) {
    console.log(e.detail.value)
  },
  //表单提交确认
  bindFormSubmit: function(e) {
    this.textarea=e.detail.value.textarea,
    console.log(this.textarea)
  },
  //日期选择器变化
  bindDateChange: function(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      date: e.detail.value
    })
  },
  //时间选择器变化
  bindTimeChange: function(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      time: e.detail.value
    })
  },
  chooseimage: function () { 
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
      } 
    }) 
  },
  checkboxChange(e) {
    console.log('checkbox发生change事件，携带value值为：', e.detail.value)

    const items = this.data.items
    const values = e.detail.value
    for (let i = 0, lenI = items.length; i < lenI; ++i) {
      items[i].checked = false

      for (let j = 0, lenJ = values.length; j < lenJ; ++j) {
        if (items[i].value === values[j]) {
          items[i].checked = true
          break
        }
      }
    }

    this.setData({
      items
    })
  },
  confirm(){
    DB.add({
      data:{
        time:this.data.time,
        date:this.data.date,
        name:this.data.name,
        textarea:this.textarea,
        reason:this.data.reason
      },
      
      success(res){
        console.log("添加成功",res)
      },
      fail(res){
        console.log("添加失败",res)
      }
    })
  }
 
})