// pages/music-player/index.js

const { getSongDetailById } = require("../../service/music_api")
import { innerAudioContext } from "../../store/audio-store.js";
Page({

  /**
   * 页面的初始数据
   */
  data: {
    songDetail:{},
    screenHeight:0,
    currentPage:0,
    contentHeight:0,

    // 屏幕高宽比
    HWProportion:0,
    duration:0,
    // 歌曲正在播放时间
    currentTime:0,
    // 正在拖拽slider
    sliderChangeing:false,
    sliderValue:0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getPageData(options.id)
    
    const contentHeight = getApp().globalData.screenHeight - 44 - getApp().globalData.statusBarHeight

    const HWProportion = getApp().globalData.HWProportion
    // 获取页面高度
    
    this.setData({
      screenHeight:getApp().globalData.screenHeight,
      contentHeight,
      HWProportion,
    })
  },

  // 监听歌曲时间
  ListenMusicPlay: function() {
    innerAudioContext.onCanplay(() => {
      if(!this.data.sliderChangeing) {
        innerAudioContext.play()
      }
    })
    innerAudioContext.onTimeUpdate(() => {
      const time = innerAudioContext.currentTime
      const currentTime = time * 1000
      const sliderValue = ((currentTime/this.data.duration * 100) | 0)
      if(!this.data.sliderChangeing) {
        this.setData(
          {currentTime,sliderValue}
        )
      }
    })
  },

  // 点击滑动选择器监听
  handlesliderChange: function(e) {
    const time = this.data.duration*(e.detail.value/100)
    this.setData({
      sliderChangeing:false
    })
    if(!this.data.sliderChangeing) {
      innerAudioContext.pause()
      innerAudioContext.seek(time/1000)
      this.setData(
        {currentTime:time, sliderValue:e.detail.value}
      )
    }
    console.log(this.data.currentTime, this.data.sliderValue);
  },


  handlesliderChangeing: function(e) {
    this.setData({
      sliderChangeing:true
    })

  },
  // 发送请求
  getPageData: function(id) {
    getSongDetailById(id).then(res => {
      const duration = res.songs[0].dt
      this.setData({
        songDetail:res.songs[0],
        duration
      })
      innerAudioContext.src = `https://music.163.com/song/media/outer/url?id=${id}.mp3`
      this.ListenMusicPlay()
    })
  },

  handleMusicPageChange:function(event) {
    const currentPage = event.detail.current
    this.setData({currentPage})
  }

})