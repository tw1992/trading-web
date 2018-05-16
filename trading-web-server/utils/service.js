const request = require('./request')
const api = require('./api')
const getTradingList = (userId) => {
    return request.apiGet(`${api.tradingCenter.tradingList}?id=${userId}`)
}
const getTrades = (data) => {
  return request.apiGet(`${api.tradingCenter.trades}?${data}`)
}
const getDepth = (data) => {
  return request.apiGet(`${api.tradingCenter.depth}?${data}`)
}
module.exports = {
  tradingService: {getTradingList,getTrades,getDepth}
}
