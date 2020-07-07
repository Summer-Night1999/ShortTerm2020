
Page({

  data: {
    height: 20,
    focus: false,
    date: '2016-09-01',
    time: '12:01',
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
    console.log(e.detail.value.textarea)
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
  }
 
})