// import wxRequest from '../../service/index.js'
import { getTopMvs } from '../../service/video_api.js'
const pageOptions = {
  // 页面数据
  data: {
    topMvs: [],
  },
  // 页面载入时
  onLoad() {
    // wxRequest
    //   .request('/top/mv', 'GET', {
    //     offset: 0,
    //     limit: 10,
    //   })
    //   .then((res) => {
    //     this.setData({
    //       topMvs: res.data.data,
    //     })
    //   })
    // wx.request({
    //   url: 'http://123.207.32.32:9001/top/mv',
    //   data: {
    //     offset: 0,
    //     limit: 10,
    //   },
    //   success: (res) => {
    //     console.log(res.data.data)
    //     this.setData({
    //       topMvs: res.data.data,
    //     })
    //   },
    //   fail: function () {},
    // })
    getTopMvs(0).then((res) => {
      this.setData({
        topMvs: res.data.data,
      })
    })
  },
}

Page(pageOptions)
