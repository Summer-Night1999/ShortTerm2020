const DB = wx.cloud.database().collection("orderconfirm_list")
var util = require('../../utils/util.js');

Page({

  data: {
    height: 20,
    focus: false,
    date: '2016-09-01',
    time: '12:01',
    name:"",
    number:"",
    textarea:""
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
  confirm(){
    DB.add({
      data:{
        time:this.data.time,
        date:this.data.date,
        name:this.data.name,
        textarea:this.textarea,
        number:this.data.number
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