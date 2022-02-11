import wxRequest from './index.js'

/**
 * 获取轮播图列表
 */
export const getBannerList = () => {
  return wxRequest.get('/banner', {
    type: 2,
  })
}
