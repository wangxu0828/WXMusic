import { audioStroe,innerAudioContext  } from "../../store/index.js";
const playModeContant = ['order', 'repeat', 'random']

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
    sliderValue:0,
    LyricResultArr:[],
    currentLyric:'',
    currentLyricIndex:1,
    // 是否正在播放音乐
    playing: true,
    playMode:'order'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
    const contentHeight = getApp().globalData.screenHeight - 44 - getApp().globalData.statusBarHeight

    const HWProportion = getApp().globalData.HWProportion
    // 获取页面高度
    
    this.setData({
      screenHeight:getApp().globalData.screenHeight,
      contentHeight,
      HWProportion,
    })
    this.setupPageData(options.id)
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
  },


  handlesliderChangeing: function(e) {
    const time = this.data.duration*(e.detail.value/100)
    this.setData({
      sliderChangeing:true,
      currentTime:time
    })

  },
  
  handleMusicPageChange:function(event) {
    const currentPage = event.detail.current
    this.setData({currentPage})
  },

  hanleLeftClick: function() {
    wx.navigateBack({
      delta: 1,
    })
  },

  setupPageData: function(id) {
    audioStroe.dispatch('setupPageDataAction', {id})
    audioStroe.onStates(['songDetail', 'duration', 'LyricResultArr'], ({songDetail, duration, LyricResultArr}) => {
      if(songDetail) {this.setData({songDetail})}
      if(duration) {this.setData({duration})}
      if(LyricResultArr) {this.setData({LyricResultArr})}
      
    })
    
    audioStroe.onStates(['currentTime',  'currentLyric', 'currentLyricIndex'], ({currentTime, currentLyric, currentLyricIndex}) => {
      if(!this.data.sliderChangeing){
        if(currentTime) {
          this.setData({currentTime})
          if(this.data.duration) {
            const sliderValue = ((currentTime/this.data.duration * 100) | 0)
            this.setData({sliderValue})
          }
        }
      }
      if(currentLyric) this.setData({currentLyric})
      if(currentLyricIndex) this.setData({currentLyricIndex})
    })

    audioStroe.onState('playing', (res) => {
      this.setData({playing:res})
    })

    audioStroe.onState('playModeIndex', (res) => {
      console.log(res);
      this.setData({playMode:playModeContant[res]})
    })
  },

  handleChangePlayingClick: function() {
    console.log(this.data.playing);
    audioStroe.dispatch('changeMusicPlaying')
  },

  handleChangePlayModeClick: function() {
    audioStroe.dispatch('handleChangePlayModeClick')
  },

  handleChangeMusicClick: function(e) {
    const btn = e.currentTarget.dataset.btn
    audioStroe.dispatch('handleChangeMusicClick', {btn})
    this.setData({currentLyric:''})
  }
})