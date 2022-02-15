import { getKeywordsList, getSearchSuggest } from "../../service/search_api"

const pageOptions = {
  // 页面数据
  data: {
    keyWords:[],
    keyword:'',
    allMatchSuggest:[]
  },
  // 页面载入时
  onLoad() {
    this.getPageData()
  },
  getPageData: function() {
    getKeywordsList().then(res => {
      this.setData({
        keyWords:res.result.hots
      })
    })
  },
  handleInput: function(event) {
    if(event.detail === '') {
      this.setData({
        allMatchSuggest:[]
      })
    }
    this.setData({
      keyword:event.detail
    })

    getSearchSuggest(event.detail).then(res => {
      this.setData({
        allMatchSuggest:res.result.allMatch
      })
    })
  }
}

Page(pageOptions)
