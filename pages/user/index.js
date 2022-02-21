// pages/user/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  handleGetUser:function() {
    wx.getUserInfo({
      lang: "ch-zn",
    })
  },

  handleGetProfile:async function() {
    wx.getUserProfile({
      desc:'完善资料',
      success(res) {
        console.log(res);
      }
    })
  }
})