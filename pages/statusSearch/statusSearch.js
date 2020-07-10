// pages/statusSearch/statusSearch.js
Page({
  data: {
    winWidth: 0,
    winHeight: 0,
    currentTab: 0,
    result:[],
    result1:[],
    result2:[],
    userId:1,
  },
  onLoad:function(){
      this.FinishQuery();
      this.StartingQuery()
      this. unStartQuery();
  },
  unStartQuery: function() {
    const db = wx.cloud.database()
    const _ = db.command
    // 查询当前用户所有的 counters
    db.collection('statusSearch_list').where({
      userId:this.userId,
      repairStatus:'未开始'
    }).get({
      success: res => {
        this.result2=res.data;
        console.log(this.result2)
        this.setData({
          result2: this.result2
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
  StartingQuery: function() {
    const db = wx.cloud.database()
    // 查询当前用户所有的 counters
    db.collection('statusSearch_list').where({
      userId:this.userId,
      repairStatus:'维修中'
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
  FinishQuery: function() {
    const db = wx.cloud.database()
    // 查询当前用户所有的 counters
    db.collection('statusSearch_list').where({
      userId:this.userId,
      repairStatus:'已完成'
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
  
})