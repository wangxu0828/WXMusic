// pages/music-player/index.js

const { getSongDetailById } = require("../../service/music_api")

Page({

  /**
   * 页面的初始数据
   */
  data: {
    songDetail:{},
    screenHeight:0,
    currentPage:0,
    contentHeight:0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getPageData(options.id)
    
  },

  getPageData: function(id) {
    getSongDetailById(id).then(res => {
      this.setData({
        songDetail:res.songs[0]
      })
    })

    const contentHeight = getApp().globalData.screenHeight - 44 - getApp().globalData.statusBarHeight

    // 获取页面高度
    this.setData({
      screenHeight:getApp().globalData.screenHeight,
      contentHeight
    })

    const innerAudioContext =  wx.createInnerAudioContext()
    innerAudioContext.src = `https://music.163.com/song/media/outer/url?id=${id}.mp3`
    // innerAudioContext.play()   
  },

  handleMusicPageChange:function(event) {
    const currentPage = event.detail.current
    this.setData({currentPage})
  }

})