import axios from 'axios'
import qs from 'qs'
import VueRouter from 'vue-router'
import baseConfig from '@/api/baseConfig'
import store from '@/store'
import { getToken } from '@/utils/auth'
import {
    Loading,
    Message
} from 'element-ui'


axios.defaults.timeout = 60000;
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';
//axios.defaults.headers.common['certification'] = localStorage.getItem('certification') || '';

// 这里可以设置统一请求前缀
console.log(baseConfig.apiUrl)
axios.defaults.baseURL = baseConfig.apiUrl;

//请求发出拦截器
var loading;
axios.interceptors.request.use(
    config => {
        //添加loading
        loading = Loading.service({
            fullscreen: true
        });
        if (store.getters.token) {
            config.headers['Authorization'] = getToken() // 让每个请求携带token
        }
        config.headers['X-Requested-With'] = 'XMLHttpRequest';

        //初始化post参数
        if (config.method === 'post' || config.method === 'put') {
            config.data = qs.stringify(config.data);
        }
        return config;
    },
    error => {
        Message.error({
            message: '参数错误'
        })
        return Promise.reject(error);
    });

//请求响应拦截器
axios.interceptors.response.use(
    res => {
        loading.close();
        if (res.status == 200) {
            var errorCode = res.code || undefined;
            if (!errorCode) {
                return {
                    status: 0,
                    data: res.data
                }
            }
            var errorObj = {
                status: 1,
                msg: ''
            };
            switch (parseInt(errorCode)) {
                case 100:
                    errorObj.msg = "Two Factor Auth";
                    return errorObj;
                    break;
                case 10400:
                    errorObj.msg = "Invalid authentication credentials";
                    return errorObj;
                    break;
                case 10401:
                    errorObj.msg = "The token has been blacklisted";
                    return errorObj;
                    break;
                case 10402:
                    errorObj.msg = "Token has expired";     //token过期
                    Message.error({
                        message: '登录信息已失效，即将跳转至登录页面',
                        type: 'error',
                        duration: 3000
                    });
                    setTimeout(function () {
                        this.$router.push('/login');
                    }, 3000);
                    return false;
                    break;
                case 10403:
                    errorObj.msg = "Login Token has expired";
                    return errorObj;
                    break;
                case 10404:
                    errorObj.msg = "Email is not validated";
                    return errorObj;
                    break;
                case 10405:
                    errorObj.msg = "The link not found or has expired";
                    return errorObj;
                    break;
                case 10406:
                    errorObj.msg = "Account forbidden";
                    return errorObj;
                    break;
                case 10407:
                    errorObj.msg = "The two factor authentication type is invalid";
                    return errorObj;
                    break;
                case 10408:
                    errorObj.msg = "The google authenticator code is invalid";
                    return errorObj;
                    break;
                case 10409:
                    errorObj.msg = "The google authenticator secret key has set";
                    return errorObj;
                    break;
                case 10410:
                    errorObj.msg = "Unable to authenticate with invalid token";
                    return errorObj;
                    break;
                case 10411:
                    errorObj.msg = "Unrealized certification";
                    return errorObj;
                    break;
                case 10412:
                    errorObj.msg = "Not enough money";
                    return errorObj;
                    break;
                case 10500:
                    errorObj.msg = "Failed to authenticate because of bad credentials or an invalid authorization header";
                    return errorObj;
                    break;
                case -1:
                    errorObj.msg = "Unknown exception";
                    return errorObj;
                    break;
                
                case 9:
                    errorObj.msg = res.data.subErrors[0].message;

                    console.log(errorObj);
                    return errorObj;
                    break;
                default:
                    errorObj.msg = "服务未知异常";
                    return errorObj;
                    break;
            }
        } else {
            return Promise.reject('服务器异常');
        }
    },
    error => {
        // 关闭loaading
        loading.close();
        switch (error.response.status) {
            case 400:
                Message.error("数据请求异常:400");
                break;
            case 401:
                Message.error("数据请求异常:401");
                break;
            case 403:
                Message.error("请求资源无权访问:403");
                break;
            case 404:
                Message.error("请求资源不存在:404");
                break;
            case 500:
                Message.error("服务器错误:500");
                break;
            default:
                Message.error("服务器异常");
                break;
        }
        //这里屏蔽掉promise的错误返回值，否则前端axios不做catch处理时控制台会出错！
        return Promise.reject(error.response.data.msg || '服务器异常');
    });


var fetch = {
    post: (url, params)=>{
        return new Promise((resolve, reject) => {
            axios.post(url, params)
              .then(response => {
                resolve(response.data);
              }, err => {
                reject(err);
              })
              .catch((error) => {
                reject(error)
              })
          })  
    },
    get: (url, params)=>{
        return new Promise((resolve, reject) => {
            axios.get(url, params)
              .then(response => {
                resolve(response.data);
              }, err => {
                reject(err);
              })
              .catch((error) => {
                reject(error)
              })
          }) 
    },
    del: (url, params)=>{
        return new Promise((resolve, reject) => {
            axios.delete(url, params)
              .then(response => {
                resolve(response.data);
              }, err => {
                reject(err);
              })
              .catch((error) => {
                reject(error)
              })
          }) 
    },
}
export default fetch;
