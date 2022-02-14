import { HYEventStore  } from "hy-event-store";

import { getMusicMenuList, getMusicRanking } from "../service/music_api";

const rankingMusic = {0:'musicUpRanking',1:'musicHotRanking', 2:'musicNewRanking', 3:'musicOriginRanking' }
const musicRankingStore = new HYEventStore({
  state:{
    musicHotRanking:{},
    musicUpRanking:{},
    musicNewRanking:{},
    musicOriginRanking:{},
    musicHotMenuList:[],
    musicRecommandMenuList:[]
  },
  actions:{
    // 热门排行
    getMusicRankingAction: function(ctx, idx) {
      getMusicRanking(idx).then(res => {
        ctx[rankingMusic[idx]] = res.playlist
      })
    },
    // 飙升
    getMusicHotMenuListAction: function(ctx) {
      getMusicMenuList('全部').then(res => {
        ctx.musicHotMenuList = res.playlists
      })
    },
    getMusicRecommandMenuListAction: function(ctx) {
      getMusicMenuList('华语').then(res => {
        ctx.musicRecommandMenuList = res.playlists
      })
    }
  }
})

export {
  musicRankingStore,
  rankingMusic
}