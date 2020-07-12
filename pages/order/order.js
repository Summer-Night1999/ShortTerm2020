Page({
  data: {
    winWidth: 0,
    winHeight: 0,
    currentTab: 0,
    result:[],
    result1:[],
    orderid:1,
  },
  onLoad:function(){
      this.orderedQuery();
      this.unorderedQuery()
  },
  orderedQuery: function() {
    const db = wx.cloud.database()
    const _ = db.command
    // 查询当前用户所有的 counters
    db.collection('order_list').where({
      orderid:this.orderid,
      orderStatus:'已接单'
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
  },
  unorderedQuery: function() {
    const db = wx.cloud.database()
    // 查询当前用户所有的 counters
    db.collection('order_list').where({
      orderid:this.orderid,
      orderStatus:'未接单'
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
    that.setData({
      currentTab: e.detail.current
    });
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
  toOrderConfirm:function(event){
    let value= event.currentTarget.dataset.value
    console.log(value)
    wx.navigateTo({
      url: '../orderConfirm/OrderConfirm?orderid='+value,
    })
  }
})