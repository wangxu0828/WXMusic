import { HYEventStore  } from "hy-event-store";

import { getMusicRanking } from "../service/music_api";
const musicRankingStore = new HYEventStore({
  state:{
    musicRanking:{}
  },
  actions:{
    getMusicRankingAction: function(ctx) {
      getMusicRanking(1).then(res => {
        ctx.musicRanking = res.playlist
      })
    }
  }
})

export {
  musicRankingStore
}