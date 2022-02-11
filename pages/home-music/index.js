import { getBannerList } from '../../service/music_api.js'

const pageOptions = {
  // 页面数据
  data: {
    banners: [],
    swiperHeight: 0,
  },
  // 页面载入时
  onLoad: function () {
    this.getPageData()
  },
  isFirstOnShow: true, // 是否为首次执行onShow
  handleSearchClick: function () {
    wx.navigateTo({
      url: '/pages/search-detail/index',
    })
  },

  getPageData: function () {
    getBannerList().then((res) => {
      this.setData({
        banners: res.banners,
      })
    })
  },
}

Page(pageOptions)
