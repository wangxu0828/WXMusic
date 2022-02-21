import { wxLoginRequest } from "../service/index.js";

const getLoginCode = () => {
  return new Promise((resolve, reject) => {
    wx.login({
      timeout: 1000,
      success:function(res) {
        resolve(res.code)
      },
      fail:function(err) {
        reject(err)
      },
    })
  })
}

const codeToToken = (code) => {
  return wxLoginRequest.post("/login", { code })
}

const checkToken = () => {
  return wxLoginRequest.post('/auth', {}, true)
}

const checkSession = () => {
  return new Promise((resolve, reject) => {
    wx.checkSession({
      success: () => {
        resolve(true)
      },
      fail: () => {
        reject(false)
      },
    })
  })
}

export {
  getLoginCode,
  codeToToken,
  checkToken,
  checkSession
}