'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  KLINE: '"http://api.bjex.io/api/market/kline"',
  NODE_API: '"http://ws.bjex.io:9006/"',
  AXIOS_API: '"http://api.bjex.io"'    //'"local"'
})
