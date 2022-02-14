import wxRequest from './index.js'

/**
 * 获取轮播图列表
 */
export const getBannerList = () => {
  return wxRequest.get('/banner', {
    type: 2,
  })
}

/**
 * 获取推荐歌曲
 * @param {*} idx 
 */
export const getMusicRanking = (idx) => {
  return wxRequest.get('/top/list', {
    idx
  })
}


/**
 * 
 * @param {*} cat  tag, 比如 " 华语 "、" 古风 " 、" 欧美 "、" 流行 ", 默认为 "全部",可从歌单分类接口获取(/playlist/catlist)
 * @param {*} limit 取出歌单数量 , 默认为 50
 * @param {*} offset 偏移数量 , 用于分页 , 如 :( 评论页数 -1)*50, 其中 50 为 limit 的值
 */
export const getMusicMenuList = (cat="全部", limit=50, offset=0) => {
  return wxRequest.get('/top/playlist', {
    cat,
    limit,
    offset
  })
}

/**
 * 获取歌单详情数据
 * @param {*} id 
 */
export const getSongMenu = (id) => {
  return wxRequest.get('/playlist/detail/dynamic', {
    id
  })
}