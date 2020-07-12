// pages/main/main.js
const DB = wx.cloud.database().collection("report_list")

var util = require('../../utils/util.js');

Page({
  data: {
    weekday: '',
    week: ['星期天', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'],
    business:3500
  },

  onShow: function () {
     var today=new Date().getDay(); 
     console.log("today:"+today);
    switch (today){
        case 0:
        this.setData({
          weekday: this.data.week[0]
        }) 
        break; 
        case 1:
        case 2:
        case 3:
        case 4:
        case 5:
        case 6:
       this.setData({
         weekday: this.data.week[today]
       })
        break;
      }
    },
  onLoad:function(){
     // 调用函数时，传入new Date()参数，返回值是日期和时间
     var time = util.formatTime(new Date());
     // 再通过setData更改Page()里面的data，动态更新页面的数据
     this.setData({
       time: time
     });
  },
  addData(){
    DB.add({
      data:{
        _report_reason_:"broken"
      },
      success(res){
        console.log("添加成功",res)
      },
      fail(res){
        console.log("添加失败",res)
      }
    })
  },
  toAddOrder:function(e){
    wx.navigateTo({
      url: '../addOrder/addOrder',
    })
  },
  toOrder:function(e){
    wx.navigateTo({
      url: '../order/order',
    })
  },
  toRepairReturn:function(e){
    wx.navigateTo({
      url: '../repairReturn/repairReturn',
    })
  },
  toStatusSearch:function(e){
    wx.navigateTo({
      url: '../statusSearch/statusSearch',
    })
  }
})