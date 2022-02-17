const innerAudioContext = wx.createInnerAudioContext()
import {HYEventStore} from 'hy-event-store'

const { getSongDetailById, getSongLyricById } = require("../service/music_api")
import { handleLyric } from "../utils/handleLyric.js";

const audioStroe = new HYEventStore({
  state: {
    songDetail:{},
    duration:0,
    LyricResultArr:[],

    currentTime:0,
    // sliderValue:0,
    currentLyric:'',
    currentLyricIndex:1,

    playing:false
  },
  actions: {
    setupPageDataAction: function (ctx, {id}) {
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
    },

    changeMusicPlaying: function(ctx, playState = true) {
      console.log(playState);
      ctx.playing = playState
      if(ctx.playing) {
        innerAudioContext.pause()
      } else {
        innerAudioContext.play()
      }
    }
  }
}) 

export {
  innerAudioContext,
  audioStroe
}