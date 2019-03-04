'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  KLINE:'"https://api.pacex.io/api/market/kline"', //'"https://api.bjex.io/api/market/kline"',
  NODE_API: '"https://ws.pacex.io/"',
  AXIOS_API:'"https://api.pacex.io"',//'"local"' //'"https://api.bjex.io"' //
  SOCKET:'"wss://ws.pacex.io"'
})
