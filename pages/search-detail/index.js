import { getKeywordsList, getSearchResultByKeyword, getSearchSuggest } from "../../service/search_api"
import debounce from '../../utils/debounce.js'
const debounceGetSearchSuggest = debounce(getSearchSuggest, 300)

const pageOptions = {
  // 页面数据
  data: {
    keyWords:[],
    keyword:'',
    allMatchSuggest:[],
    searchResultNodes:[],
    songsList:[],
  },
  // 页面载入时
  onLoad() {
    this.getPageData()
  },
  // 获取页面进入时所需数据
  getPageData: function() {
    getKeywordsList().then(res => {
      this.setData({
        keyWords:res.result.hots
      })
    })
  },
  // 搜索框输入数据
  handleInput:async function(event) {
    this.setData({
      keyword:event.detail
    })

    if(!event.detail) {
      this.setData({
        allMatchSuggest:[],
        songsList:[],
        searchValue:''
      })
      debounceGetSearchSuggest.cancel()
      return
    }
    // 发送请求
    const res = await debounceGetSearchSuggest(event.detail)
    this.setData({
      allMatchSuggest:res.result.allMatch
    })
    if(!res.result.allMatch) {
      this.setData({
        allMatchSuggest:[]
      })
      return
    }
    // 防止请求数据异步发送导致搜索数组一直不为空
    // if(!this.data.keyword){
    //   this.setData({
    //     allMatchSuggest:[]
    //   })
    // }

    this.getRichTextNodes()

  },

  // 获取
  getRichTextNodes: function() {
    // 搜索到的所有名字
    const searchResultNodes = []
    const searchResult =  this.data.allMatchSuggest.map(item => item.keyword)
    const keyword = this.data.keyword
    for (let item of searchResult) {
      if(item.toUpperCase().startsWith(keyword.toUpperCase())){
        const key1 = item.slice(0, keyword.length)
        const key2 = item.slice(keyword.length)
        const nodes = [
          {
            name:'span',
            attrs:{
              style: 'color: #229c72;'
            },
            children: [{
              type: 'text',
              text: key1
            }]
          },
          {
            type:'text',
            text: key2
          }
        ]
        searchResultNodes.push(nodes)
      }
    }
    this.setData({searchResultNodes})
  },

  // 点击搜索时触发
  handleSearchAction: function() {
    getSearchResultByKeyword(this.data.keyword).then(res => {
      this.setData(
        {
          songsList:res.result.songs
        }
      )
    })  
  },

  //点击搜索建议和热门关键词搜索
  handleSearchActionByKeyword: function(event) {
    const keyword = event.currentTarget.dataset.forword
    if(!keyword) {
      return
    }
    this.setData({
      keyword
    })
    getSearchResultByKeyword(keyword).then(res => {
      this.setData(
        {
          songsList:res.result.songs
        }
      )
    })  
  }
}

Page(pageOptions)
