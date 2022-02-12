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