import { getBannerList } from '../../service/music_api.js'
import throttle from '../../utils/throttle'

import { musicRankingStore, rankingMusic } from '../../store/index.js' 

const pageOptions = {
  // 页面数据
  data: {
    banners: [],
    swiperHeight: 0,
    musicRankingListTopSix:[],
    musicHotMenuListTopSix:[],
    musicRecommandMenuListTopSix:[],
    rankingMusic:{0:{}, 2:{}, 3:{}}
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
    
    // 获取推荐歌曲列表歌曲
    for(let i = 0; i < 4; i++) {
      musicRankingStore.dispatch('getMusicRankingAction', i)
    }
    musicRankingStore.onState('musicHotRanking', (res) => {
      if(!res.tracks) return
      const musicRankingListTopSix =  res.tracks.slice(0,6)
      this.setData({
        musicRankingListTopSix:musicRankingListTopSix
      })
    })
    // 获取热门歌单列表
    musicRankingStore.dispatch('getMusicHotMenuListAction')
    musicRankingStore.onState('musicHotMenuList', (res) => {
      if(res.length === 0) return
      const musicRankingListTopSix =  res.slice(0,6)
      this.setData({
        musicHotMenuListTopSix:musicRankingListTopSix
      })
    })
    // 获取推荐歌单列表
    musicRankingStore.dispatch('getMusicRecommandMenuListAction')
    musicRankingStore.onState('musicRecommandMenuList', (res) => {
      if(res.length === 0) return
      const musicRankingListTopSix =  res.slice(0,6)
      this.setData({
        musicRecommandMenuListTopSix:musicRankingListTopSix
      })
    })

    // 获取歌曲排行
    musicRankingStore.onState('musicUpRanking', this.handleRanking(0))
    musicRankingStore.onState('musicNewRanking', this.handleRanking(2))
    musicRankingStore.onState('musicOriginRanking', this.handleRanking(3))
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
  },
  handleRanking(idx) {
    return (res) => {
      if(Object.keys(res).length === 0) return
      const name = res.name
      const coverImgUrl = res.coverImgUrl
      const playCount = res.playCount
      const musicList = res.tracks.slice(0, 3)
      const id = res.id

      const rankObj = {id, name, coverImgUrl, playCount, musicList}

      const newRanking = {...this.data.rankingMusic, [idx]:rankObj}
      this.setData({
        rankingMusic: newRanking
      })
    }
  },

  handleClickGoSongList:function(e) {
    const type = e.currentTarget.dataset.type
    if (type === "menu") {
      const id = e.detail.id
      wx.navigateTo({
        url: `/pages/detail-songs-list/index?type=${type}&id=${id}`,
      })
    }else if (type === "ranking"){
      const rankMap = e.currentTarget.dataset.value
      wx.navigateTo({
        url: `/pages/detail-songs-list/index?type=${type}&categoty=${rankingMusic[rankMap]}`,
      })
    }
  },
}

Page(pageOptions)
