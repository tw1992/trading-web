'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  KLINE: '"https://api.bjex.io/api/market/kline"',
  NODE_API: '"https://ws.bjex.io/"',
  AXIOS_API: '"https://api.bjex.io"'    //'"local"'
})
