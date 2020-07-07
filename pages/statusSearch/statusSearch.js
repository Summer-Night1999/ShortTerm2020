// pages/statusSearch/statusSearch.js
Page({
  data: {
    winWidth: 0,
    winHeight: 0,
    currentTab: 0,
    result:[],
    result1:[],
    result2:[],
    data:[1,2,3]
  },
  onLoad:function(){
    if(this.data.currentTab===0){
      let date=new Date();
      let date1=new Date(date.getTime()-24*60*60*1000);
      let date2=new Date(date.getTime()-7*24*60*60*1000);
      let year=date.getFullYear();
      let month=date.getMonth()+1;
      let day=date.getDate();
      let year1=date1.getFullYear();
      let month1=date1.getMonth()+1;
      let day1=date1.getDate();
      let year2=date2.getFullYear();
      let month2=date2.getMonth()+1;
      let day2=date2.getDate();
      var time=year+'/'+month+'/'+day;
      var time1=year1+'/'+month1+'/'+day1;
      var time2=year2+'/'+month2+'/'+day2;
      console.log(time2);
      this.TodayonQuery(time);
      this.YesterdayonQuery(time1)
      this.WeekQuery(date,date2);
    } 
  },
  WeekQuery: function(_nowdate,_weekdate) {
    const db = wx.cloud.database()
    const _ = db.command
    // 查询当前用户所有的 counters
    db.collection('repairReturn_list').where({
      returnTime: _.gte(_weekdate).and(_.lte(_nowdate))
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
  YesterdayonQuery: function(_date) {
    const db = wx.cloud.database()
    // 查询当前用户所有的 counters
    db.collection('repairReturn_list').where({
      returnTime:_date
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
  TodayonQuery: function(_date) {
    const db = wx.cloud.database()
    // 查询当前用户所有的 counters
    db.collection('repairReturn_list').where({
      returnTime:_date
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