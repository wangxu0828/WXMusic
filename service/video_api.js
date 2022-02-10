import wxRequest from './index.js'

export const getTopMvs = (offset) => {
  return wxRequest.get('/top/mv', { offset, limit: 10 })
}
