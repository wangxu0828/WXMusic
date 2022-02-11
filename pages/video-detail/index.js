import { getMvUrl, getMvData, getAllVideo } from '../../service/video_api'
const pageOptions = {
  // 页面数据
  data: {
    videoData: {},
    videoDetail: {},
    allVideo: [],
  },
  // 页面载入时
  onLoad(e) {
    this.getPageData(e.id)
  },

  getPageData: function (id) {
    // 获取mv播放地址
    getMvUrl(id).then((res) => {
      this.setData({
        videoData: res.data,
      })
    })
    // 获取mv数据
    getMvData(id).then((res) => {
      this.setData({
        videoDetail: res.data,
      })
    })
    // 获取mv相关视频
    getAllVideo(id).then((res) => {
      this.setData({
        allVideo: res.data,
      })
    })
  },

  handleRecommendVideoClick(e) {
    const id = e.currentTarget.dataset.id

    wx.navigateTo({
      url: '/pages/video-detail/index?id=' + 'id',
    })
  },
}

Page(pageOptions)
