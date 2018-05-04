const {tradingSendData} = require('./asyncHttp')
const dateFormat = require('dateformat')
const schedule = require("node-schedule")
const dateLabel = 'yyyy-mm-dd HH:MM:ss' // 时间格式
// const scheduleRule = '30 */3 * * * *' // 定时任务格式 每隔3分
const scheduleRule = new schedule.RecurrenceRule();
// const times = [1, 6, 11, 16, 21, 26, 31, 36, 41, 46, 51, 56];
// scheduleRule.second = times; // 定时任务格式 每隔5秒
const times = [];
for (let i = 1; i < 60; i++) {
  times.push(i);
}
scheduleRule.second = times; // 定时任务格式 每隔1秒

class SocketIo {
  constructor(io) {
    this.io = io
    this.socket = null
    this.socketNum = 0
    this.userId = null // 用户标识
  }

  init() {
    this.io.on('connection', (socket) => { // 建立长连接
      this.socket = socket
      // 监听用户进入了
      this.into()
    })
  }

  into() {
    this.socket.on('join', ({userId}) => {
      console.log(`用户:${userId}进入了, 开始调接口, 时间:${dateFormat(new Date(), dateLabel)}`)
      this.userId = userId
      this.getSocketData() // 默认调接口
      // this.setSchedule() // 执行定时任务
      this.socketNum = this.socketNum + 1
      if (this.socketNum === 1) {
        console.log(this.socketNum)
        this.setSchedule() // 执行定时任务
      }
    })
    //  监听城市切换
    this.socket.on('userChange', ({userId}) => {
      console.log(`用户切到userId:${userId}了, 开始调接口, 当前时间:${dateFormat(new Date(), dateLabel)}`)
      this.userId = userId
      this.getSocketData() // 默认调接口
    })
  }

  setSchedule() { // 定时任务
    console.log(`已开启定时任务，当前时间:${dateFormat(new Date(), dateLabel)}`)
    let c = 0
    schedule.scheduleJob(scheduleRule, () => {
      console.log(`定时任务执行完毕，当前时间:${dateFormat(new Date(), dateLabel)}`)
      c++
      console.log(c)
      this.getData()
    })
  }

  getSocketData() { // 获取数据并定向推送
    tradingSendData(this.userId, (tradingList) => {
      console.log(`初始化用户数据成功1，当前时间: ${dateFormat(new Date(), dateLabel)}`)
      this.socket.emit('tradingData', JSON.stringify({
        tradingList
      }))
    })
  }

  getData() { // 获取数据并广播
    tradingSendData(this.userId, (tradingList) => {
      console.log(`初始化用户数据成功2，当前时间: ${dateFormat(new Date(), dateLabel)}`)
      this.io.sockets.emit('tradingData', JSON.stringify({
        tradingList
      }))
    })
  }
}

module.exports = {
  StartSocketIo: (io) => {
    new SocketIo(io).init()
  }
}
