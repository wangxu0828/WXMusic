const innerAudioContext = wx.createInnerAudioContext()
import {HYEventStore} from 'hy-event-store'

const { getSongDetailById, getSongLyricById } = require("../service/music_api")
import { handleLyric } from "../utils/handleLyric.js";
const audioStroe = new HYEventStore({
  state: {
    id:'',
    songDetail:{},
    duration:0,
    LyricResultArr:[],

    currentTime:0,
    // sliderValue:0,
    currentLyric:'',
    currentLyricIndex:1,

    playing:false,
    playModeIndex:0,
    playListSongs: [],
    playListIndex: 0
  },
  actions: {
    setupPageDataAction: function (ctx, {id}) {
      if(id === ctx.id) {
        return
      }
      ctx.duration=0,
      ctx.LyricResultArr=[],

      ctx.currentTime=0,
      // sliderValue:0,
      ctx.currentLyric='',
      ctx.currentLyricIndex=1,

      ctx.playing=true,
      ctx.playModeIndex=0,
      ctx.id = id
      getSongDetailById(id).then(res => {
        ctx.duration = res.songs[0].dt
        ctx.songDetail=res.songs[0]      
        innerAudioContext.src = `https://music.163.com/song/media/outer/url?id=${id}.mp3`
        this.dispatch('ListenMusicPlay')
      })
      // 获取歌词信息
      getSongLyricById(id).then(res => {
      const LyricResultArr =  handleLyric(res.lrc.lyric)
      ctx.LyricResultArr = LyricResultArr
      })
    },
    // 监听歌曲时间
    ListenMusicPlay: function(ctx) {
      innerAudioContext.onCanplay(() => {
        // if(!this.data.sliderChangeing) {
          innerAudioContext.play()
        // }
      })
      innerAudioContext.onTimeUpdate(() => {
        const time = innerAudioContext.currentTime
        const currentTime = time * 1000
        ctx.currentTime = currentTime
        for(let i = 0; i<ctx.LyricResultArr.length; i++) {
          
          if((Object.keys(ctx.LyricResultArr[i])[0] - 0)>currentTime) {
           const currentLyric =  Object.values(ctx.LyricResultArr[i-1])[0]
           if(currentLyric === Object.values(ctx.LyricResultArr[ctx.currentLyricIndex - 1])[0]) return
           ctx.currentLyric = currentLyric
            ctx.currentLyricIndex = i
            break
          }  
        }
      })
      innerAudioContext.onEnded(() => {
        this.dispatch('handleChangeMusicClick', 'next')
      })
    },

    changeMusicPlaying: function(ctx) {
      if(ctx.playing) {
        innerAudioContext.pause()
      } else {
        innerAudioContext.play()
      }
      ctx.playing=!ctx.playing
      console.log(ctx.playing);
    },
    
    handleChangePlayModeClick: function(ctx) {
      ctx.playModeIndex++
      if(ctx.playModeIndex === 3) {
        ctx.playModeIndex = 0
      }
    },

    handleChangeMusicClick: function(ctx, {btn}) {
      if(ctx.playModeIndex === 0) {
        btn === "prev" ? ctx.playListIndex-- : ctx.playListIndex++
        if(ctx.playListIndex === ctx.playListSongs.length) ctx.playListIndex = 0
        if(ctx.playListIndex === -1) ctx.playListIndex = ctx.playListSongs.length -1
      }else if(ctx.playModeIndex === 1) {
        return
      }else if(ctx.playModeIndex === 2){
        ctx.playListIndex =  Math.floor(Math.random() * ctx.playListSongs.length)
      }

      const id =  ctx.playListSongs[ctx.playListIndex].id
      this.dispatch('setupPageDataAction', {id})

    }
  }
}) 

export {
  innerAudioContext,
  audioStroe
}