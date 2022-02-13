// app.js
App({
  globalData:{
    screenWidth:''
  },

  async onLaunch() {
    const res =await wx.getSystemInfo()
    this.globalData.screenWidth = res.screenWidth
  }
})
