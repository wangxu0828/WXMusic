import { TOKEN_KEY } from './constants/token_const.js'
// app.js
import {codeToToken, getLoginCode, checkToken, checkSession} from './service/login_api.js'
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

    this.handleLogin()
  },

  handleLogin:async function() {
    const token = await wx.getStorageSync(TOKEN_KEY) 
    // 检查TOKEN是否过期
    const res = await checkToken()
    // 判断session是否过期
   const res1 = await checkSession()
   if(!token && res.errorCode, !res1) {
     this.handleLogin()
   }
  },

  loginAction:async function() {
    // 获取code
   const code =  await getLoginCode()
   // 发送到服务端获取token
   const res = await codeToToken(code)


   wx.setStorageSync(TOKEN_KEY, res.token)
  
  }
})
