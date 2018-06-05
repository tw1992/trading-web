'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  KLINE: '"http://192.168.22.208/api/market/kline"',
  NODE_API: '"http://192.168.133.190:9006/"',
  AXIOS_API: '"local"'
})
