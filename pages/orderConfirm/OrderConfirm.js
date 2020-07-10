const DB = wx.cloud.database().collection("sceneOrderConfirm_list")
const db = wx.cloud.database().collection("longRangeOrderConfirm_list")
var util = require('../../utils/util.js');

Page({

  data: {
    winWidth: 0,
    winHeight: 0,
    currentTab: 0,
    height: 20,
    focus: false,
    date: '2016-09-01',
    time: '12:01',
    name:"",
    number:"",
    textarea:"",
    result:'',
    resultDesc:'',
    scenerepair:true,
    result:[],
  },
  onReady: function() {
    var that = this;
    wx.getSystemInfo({
      success: function(res) {
        that.setData({
          winWidth: res.windowWidth,
          winHeight: res.windowHeight
        });
      }
    });
  },
  // 滑动切换tab
  bindChange: function(e) {
    var that = this;
    if(this.scenerepair){
      that.setData({
        currentTab: e.detail.current,
        scenerepair:false
      });
    }
    else{
      that.setData({
        currentTab: e.detail.current,
        scenerepair:true
      });
    }
  },
  // 点击tab切换
  swichNav: function(e) {
    var that = this;
    if (this.data.currentTab === e.target.dataset.current) {
      return false;
    } else {
      that.setData({
        currentTab: e.target.dataset.current
      })
    }
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
  bindResult:function(e){
    this.setData({
      result:e.detail.value
    })
  },
  bindresultDesc:function(e){
    this.setData({
      resultDesc:e.detail.value
    })
  },
  onLoad(){
    DB.orderBy('orderid','desc').get({
      success: res => {
        this.result=res.data;
        console.log(res)
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
  confirm1(){

  },
  confirm(){
      console.log('结果为：'+this.result[0].orderid);
      DB.add({
        data:{
            orderid:this.result[0].orderid+1,
            repairid:this.data.name,
            userTel:this.data.number,
            appointmentDate:this.data.date+this.data.time
        },
        success(res){
          console.log("添加成功",res)
        },
        fail(res){
          console.log("添加失败",res)
        }
      })
    // DB.add({
    //   data:{
    //     time:this.data.time,
    //     date:this.data.date,
    //     name:this.data.name,
    //     textarea:this.textarea,
    //     number:this.data.number
    //   },
      
    //   success(res){
    //     console.log("添加成功",res)
    //   },
    //   fail(res){
    //     console.log("添加失败",res)
    //   }
    // })
  }
})