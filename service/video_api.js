import wxRequest from './index.js'

/**
 * 获取顶部mv列表
 * @param {*} offset
 * @returns
 */
export const getTopMvs = (offset) => {
  return wxRequest.get('/top/mv', { offset, limit: 10 })
}

/**
 * 获取mv播放地址
 * @param {*} id
 * @returns
 */
export const getMvUrl = (id) => {
  return wxRequest.get('/mv/url', { id })
}

/**
 * 获取mv数据
 * @param {*} mvid
 * @returns
 */
export const getMvData = (mvid) => {
  return wxRequest.get('/mv/detail', { mvid })
}

/**
 * 获取相关视频数据
 * @returns
 */
export const getAllVideo = (id) => {
  return wxRequest.get('/related/allvideo', { id })
}
