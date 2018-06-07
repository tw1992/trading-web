const request = require('./request')
const api = require('./api')
// const getTradingList = (userId) => {
//     return request.apiGet(`${api.tradingCenter.tradingList}?id=${userId}`)
// }
const getTrades = (data) => {
  return request.apiGet(`${api.tradingCenter.trades}?${data}`)
}
const getDepth = (data) => {
  return request.apiGet(`${api.tradingCenter.depth}?${data}`)
}
const getPairs = (data) => {
  return request.apiGet(`${api.tradingCenter.pairs}?${data}`)
}
module.exports = {
  tradingService: {getTrades,getDepth,getPairs}
}
