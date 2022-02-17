import { getSongMenu } from "../../service/music_api.js"
import { audioStroe, musicRankingStore } from "../../store/index.js"

// pages/detail-songs-list/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    rankingCategoty:'',
    songMenuId:'',
    songListInfo:{}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if(options.type === 'ranking'){
      this.setData({
        rankingCategoty:options.categoty
      })
      musicRankingStore.onState(this.data.rankingCategoty,this.getPageData)
    }else if(options.type === 'menu') {
      this.setData({
        songMenuId:options.id
      })

      getSongMenu(this.data.songMenuId).then((res) => {
        this.setData({
          songListInfo:res.playlist
        })
      })
    }

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    if(!this.data.rankingCategoty) return
    musicRankingStore.offState(this.data.rankingCategoty, this.getPageData)
  },

  getPageData: function(res) {
    this.setData({
      songListInfo:res
    })
  },

  handleClickStorage(e) {
    audioStroe.setState('playListSongs', this.data.songListInfo.tracks)
    audioStroe.setState('playListIndex', e.currentTarget.dataset.index)
  }
})