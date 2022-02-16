// app.js
App({
  globalData:{
    screenWidth:0,
    screenHeight:0,
    statusBarHeight:0,
    HWProportion:0
  },

  async onLaunch() {
    const res =await wx.getSystemInfo()
    this.globalData.screenWidth = res.screenWidth
    this.globalData.screenHeight = res.screenHeight
    this.globalData.statusBarHeight = res.statusBarHeight

    const HWProportion = res.screenHeight/res.screenWidth

    this.globalData.HWProportion = HWProportion
  }
})
