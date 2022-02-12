import { getBannerList } from '../../service/music_api.js'
import throttle from '../../utils/throttle'

import { musicRankingStore } from '../../store/index.js' 
const pageOptions = {
  // 页面数据
  data: {
    banners: [],
    swiperHeight: 0,
    musicRankingListTopSix:[]
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

    musicRankingStore.dispatch('getMusicRankingAction')
    musicRankingStore.onState('musicRanking', (res) => {
      if(!res.tracks) return
      const musicRankingListTopSix =  res.tracks.slice(0,6)
      this.setData({
        musicRankingListTopSix:musicRankingListTopSix
      })
    })
  },
  handleImageLoad: function(e) {
      const throttleGetImageHeader = throttle(this.getImageHeader)
      throttleGetImageHeader().then(res =>{
        this.setData({
          swiperHeight:res[0].height
        })
      })
  },
  getImageHeader: function() {
    return new Promise((resolve, reject) => {
      const query = wx.createSelectorQuery()
      query.select('.image-item').boundingClientRect()
      query.exec(resolve)
    })
  }
}

Page(pageOptions)
