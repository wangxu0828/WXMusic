import wxRequest from './index.js'

/**
 * 获取热门搜索
 */
export const getKeywordsList = () => {
  return wxRequest.get('/search/hot')
}

/**
 * 根据关键字获取搜索建议
 * @param {*} keywords 
 */
export const getSearchSuggest = (keywords) => {
  return wxRequest.get('/search/suggest',
    {
      type:"mobile",
      keywords
    }
  )
}

// 根据关键字搜索歌曲结果
export const getSearchResultByKeyword = (keywords) => {
  return wxRequest.get("/search", {
    keywords
  })
}