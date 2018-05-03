const { tradingService } = require('./service')
exports.tradingSendData = async (userId, callback) => {
  callback(await tradingService.getTradingList(userId))
}
