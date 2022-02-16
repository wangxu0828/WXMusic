// app.js
App({
  globalData:{
    screenWidth:0,
    screenHeight:0,
    statusBarHeight:0
  },

  async onLaunch() {
    const res =await wx.getSystemInfo()
    this.globalData.screenWidth = res.screenWidth
    this.globalData.screenHeight = res.screenHeight
    this.globalData.statusBarHeight = res.statusBarHeight
    console.log(res);
  }
})
