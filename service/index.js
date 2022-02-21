const BASE_URL = 'http://123.207.32.32:9001'

const LOGIN_BASE_URL = 'http://123.207.32.32:3000'

import { TOKEN_KEY } from "../constants/token_const.js";

const token = wx.getStorageSync(TOKEN_KEY)

class WXRequest {

  constructor(baseURL, authheader = {}) {
    this.baseURL = baseURL
    this.authheader = authheader
  }

  request(url, method, params, isAuth, header = {})      {
    const finalHeader = isAuth ? {...this.authheader, ...header} : header
    return new Promise((resolve, reject) => {
      wx.request({
        url: this.baseURL + url,
        method,
        data: params,
        header: finalHeader,
        success: function (res) {
          resolve(res.data)
        },
        fail: reject,
      })
    })
  }

  get(url, params, isAuth = false, header = {}) {
    return this.request(url, 'GET', params, header, isAuth = false)
  }

  post(url, data, isAuth = false, header = {}) { 
    return this.request(url, 'POST', data, header, isAuth = false)
  }
}

const wxRequest = new WXRequest(BASE_URL)

export const wxLoginRequest = new WXRequest(LOGIN_BASE_URL, {
  token
})

export default wxRequest
