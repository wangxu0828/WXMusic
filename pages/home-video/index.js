// import wxRequest from '../../service/index.js'
import { getTopMvs } from '../../service/video_api.js'
const pageOptions = {
  // 页面数据
  data: {
    topMvs: [],
    hasMore: true,
  },

  getTopMvData: async function (offset) {
    if (!this.data.hasMore) return
    // 展示加载动画
    wx.showNavigationBarLoading()
    const res = await getTopMvs(offset)
    let newData = res.data

    if (offset === 0) {
      newData = newData
    } else {
      newData = [...this.data.topMvs, ...newData]
    }
    this.setData({
      topMvs: newData,
      hasMore: res.hasMore,
    })
    wx.hideNavigationBarLoading()
    if (offset === 0) {
      wx.stopPullDownRefresh()
    }
  },
  // 页面载入时
  onLoad: function () {
    this.getTopMvData(0)
  },

  // 滑动触底时
  onReachBottom: async function () {
    this.getTopMvData(this.data.topMvs.length)
  },

  // 上拉刷新时
  onPullDownRefresh: async function () {
    this.getTopMvData(0)
  },

  // 点击视频跳转
  handleVideoItemClick: function (e) {
    const id = e.currentTarget.dataset.id

    wx.navigateTo({
      url: '/pages/video-detail/index?id=' + id,
    })
  },
}

Page(pageOptions)
