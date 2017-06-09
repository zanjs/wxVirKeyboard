// pages/index/set-time-demo.js
var app = getApp();
Page({
  data: {
    text: "获取验证码"
  },
  onLoad: function (options) {
    // 页面初始化 options为页面跳转所带来的参数
    var self = this;
    //调用应用实例的方法获取全局数据
    app.getUserInfo(function (userInfo) {
      //更新数据
      self.setData({
        userInfo: userInfo
      })
      console.log('userInfo=============' + JSON.stringify(userInfo))
    })
  },
  onReady: function () {
    // 页面渲染完成

  },
  onShow: function () {
    // 页面显示
  },
  onHide: function () {
    // 页面隐藏
  },
  onUnload: function () {
    // 页面关闭
  },
  default: function (e) {
    var self = this;
    var second = 60;
    self.countdown(second);
  },
  // 从60到到0倒计时  
  countdown: function (second) {
    var self = this;
    var text = self.data.second;
    if (second == 0) {
      self.setData({
        text: text
      });
      return;
    }
    var time = setTimeout(function () {
      second = second - 1
      self.setData({
        text: second
      });
      self.countdown(second);
    }
      , 1000)
  }
})