// pages/addRepairReturn/addRepairReturn.js
const db = wx.cloud.database().collection('order_list')
const database = wx.cloud.database().collection('statusSearch_list')
const DB= wx.cloud.database().collection('repairReturn_list')
Page({

  /**
   * 页面的初始数据
   */
  data: {
      orderid:0,
      result:[],
      result1:[],
      satisfactionScore:0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that=this;
    that.setData({
      orderid:options.id,
    })
    console.log(that.data.orderid)
    db.where({
      orderid:this.orderid,
    }).get({
      success: res => {
        this.result=res.data;
        console.log(this.result)
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
    let id=parseInt(this.data.orderid) 
    database.where({
      orderid:id,
    }).get({
      success: res => {
        this.result1=res.data;
        console.log(this.result1)
        this.setData({
          result1: this.result1
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
  bindScore: function(e) {
    var that = this;
    that.setData({
      satisfactionScore: e.detail.value
    });
    console.log(this.data.satisfactionScore);
  },
  confirm:function(e){
    if(this.data.satisfactionScore<0||this.data.satisfactionScore>10){
      wx.showToast({
        title: '评分需要输入0-10之间的数字！',
        icon: 'none',
        duration: 2000//持续的时间
   
      })
    }
    else{
      DB.add({
        data:{
            orderid:this.result[0].orderid,
            repairid:this.result1[0].repairid,
            repairStatus:'未开始',
            returnTime:'2020/7/13',
            satisfactionScore:this.data.satisfactionScore,
            userId:this.result[0].userId
        },
        success(res){
          console.log("添加成功",res)
        },
        fail(res){
          console.log("添加失败",res)
        }
      })
    }
  }
})