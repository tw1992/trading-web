// var apiUrl = ' http://192.168.22.208/';      //测试
// var apiUrl = ' http://api.bjex.io';         //线上
var apiUrl = process.env.AXIOS_API; 
export default{
    apiUrl: apiUrl,
}