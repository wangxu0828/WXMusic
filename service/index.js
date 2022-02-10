const BASE_URL = 'http://123.207.32.32:9001'

class WXRequest {
  request(url, method, params) {
    return new Promise((resolve, reject) => {
      wx.request({
        url: BASE_URL + url,
        method,
        data: params,
        success: function (res) {
          resolve(res)
        },
        fail: function (err) {
          reject(err)
        },
      })
    })
  }

  get(url, params) {
    return this.request(url, 'GET', params)
  }

  post(url, params) {
    return this.request(url, 'POST', params)
  }
}

const wxRequest = new WXRequest()

export default wxRequest
