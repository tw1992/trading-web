// const baseUrlTraffic =  'http://192.168.133.190:8080/static/'
const baseUrl = 'http://192.168.22.208'     //测试
// const baseUrl = 'https://api.bjex.io'        //线上
module.exports = {
  tradingCenter: {
    //   tradingList: baseUrlTraffic + 'trandingCenter/trandingCenter.json',  // 模拟数据
      trades: baseUrl + '/api/market/trades',     //最近成交
      depth: baseUrl + '/api/market/depth',       //市场深度图
      pairs: baseUrl + '/api/market/pairs',       //交易对
  }
}
