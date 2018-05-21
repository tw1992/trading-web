const { tradingService } = require('./service')
exports.tradingSendData = async (userId, callback) => {
  callback(await tradingService.getTradingList(userId))
}
exports.tradingSendTrades= async (data, callback) => {
  callback(await tradingService.getTrades(data))
}
exports.tradingSendDepth= async (data, callback) => {
  callback(await tradingService.getDepth(data))
}
exports.tradingSendPairs= async (data, callback) => {
  callback(await tradingService.getPairs(data))
}
