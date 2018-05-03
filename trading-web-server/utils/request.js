const http = require('http')
const apiGet = (api) => {
  let resData
  return new Promise((resolve, reject) => {
    http.get(api, (req, res) => {
      req.on('data', function (data) {
        // console.log(data, '请求中')
        resData += data
      })
      req.on('end', function () {
        // console.log(resData, '请求完毕')
        resolve(resData.indexOf('undefined') === 0 ? resData.replace('undefined', '') : resData)
      })
    }).on('error', (error) => {
      reject(error)
      console.log(`${api} 报错`)
    })
  })
}
module.exports = {
  apiGet
}

