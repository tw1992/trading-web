const request = require('./request')
const api = require('./api')
const getTradingList = (userId) => {
    return request.apiGet(`${api.tradingCenter.tradingList}?id=${userId}`)
}
module.exports = {
  tradingService: {getTradingList}
}
