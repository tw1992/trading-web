const express = require('express')
const app = express()
const http = require('http').Server(app)
// const fs = require('fs');
const io = require('socket.io')(http)
const port = 9006

// //根据项目的路径导入生成的证书文件  
// var bjexKey  = fs.readFileSync('./bjex.io.key');  
// var bjexPem = fs.readFileSync('./bjex.io.pem');  
// var credentials = {key: bjexKey, cert: bjexPem}; 
// var httpsServer = https.createServer(credentials, app);  

const socket = require('./utils/tradingSocketIo.class')

// 设置跨域
app.all('*',function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild');
  res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
  if (req.method === 'OPTIONS') res.send(200)
  else next();
});

socket.StartSocketIo(io)

app.get('/', (req, res) => {
  res.end('traffic socket server init')
})

// 404
app.use(function(req, res, next) {
  var err = new Error('Not Found')
  err.status = 404
  next(err)
})

http.listen(port, () => {
  console.log('traffic server init:' + port)
})


