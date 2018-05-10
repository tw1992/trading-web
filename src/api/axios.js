import axios from 'axios'
import qs from 'qs'
import router from '../routes'
import baseConfig from '@/api/baseConfig'
import store from '@/store'
import { getToken } from '@/utils/auth'
import {
    Loading,
    Message
} from 'element-ui'


axios.defaults.timeout = 60000;
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';
axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';

// 这里可以设置统一请求前缀
// axios.defaults.baseURL = baseConfig.apiUrl;

//请求发出拦截器
var loading;
axios.interceptors.request.use(
    config => {
        //添加loading
        loading = Loading.service({
            fullscreen: true
        });
        console.log(store.getters.language)
        //语言切换
        if(store.getters.language == "zh"){
            
        }else if(store.getters.language == "en"){
            config.headers['Accept-Language'] = "en-us,en;q=0.5"
        }
        if (store.getters.token) {
            config.headers['Authorization'] = 'Bearer'+getToken() // 让每个请求携带token
        }

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
        return {
            status: 0,
            data: res.data
        }
    },
    error => {
        // 关闭loaading
        loading.close();
        var errData = error.response.data;
        switch (error.response.status) {
            case 400:;
            case 401:;
            case 403:
                var errorCode = errData.code || undefined;
                switch (parseInt(errorCode)) {
                    case 100:
                        Message.error("Two Factor Auth");       //双重验证
                        break;
                    case 10399:
                    //errorObj.msg = "Token invalid";     //token无效
                    Message.error('登录信息已失效，即将跳转至登录页面');
                    store.dispatch('FedLogOut');
                    setTimeout(function () {
                        router.replace({ //跳转到登录页面
                            path: 'login',
                            query: { redirect: router.currentRoute.fullPath } // 将跳转的路由path作为参数，登录成功后跳转到该路由
                        });
                    }, 3000);
                        break;
                    case 10400:
                        Message.error("Invalid authentication credentials");    //无效的身份验证凭证
                        break;
                    case 10401:
                        Message.error("The token has been blacklisted");        //令牌已被列入黑名单。
                        break;
                    case 10402:
                        //errorObj.msg = "Token has expired";     //token过期
                        Message.error('登录信息已失效，即将跳转至登录页面');
                        store.dispatch('FedLogOut');
                        setTimeout(function () {
                            router.replace({ //跳转到登录页面
                                path: '/login',
                                query: { redirect: router.currentRoute.fullPath } // 将跳转的路由path作为参数，登录成功后跳转到该路由
                            });
                        }, 3000);
                        break;
                    case 10403:
                        Message.error("Login Token has expired");   //登录令牌过期了
                        break;
                    case 10404:
                        Message.error("Email is not validated");    //电子邮件是无效的
                        break;
                    case 10405:
                        Message.error("The link not found or has expired"); //链接未找到或已过期。
                        break;
                    case 10406:
                        Message.error("Account forbidden");     //帐号被禁止的
                        break;
                    case 10407:
                        Message.error("The two factor authentication type is invalid"); //这两个因素验证类型无效。
                        break;
                    case 10408:
                        Message.error("The google authenticator code is invalid");  //验证器代码无效。
                        break;
                    case 10409:
                        Message.error("The google authenticator secret key has set");   //这个谷歌验证器的秘密密钥已经设置好了。
                        break;
                    case 10410:
                        Message.error("Unable to authenticate with invalid token"); //无法使用无效的令牌进行身份验证。
                        break;
                    case 10411:
                        Message.error("Unrealized certification");  //未实现认证
                        break;
                    case 10412:
                        Message.error("Not enough money");          //没有足够的钱
                        break;
                    case 10500:
                        Message.error("Failed to authenticate because of bad credentials or an invalid authorization header");      //由于糟糕的凭据或无效的授权标题而无法进行身份验证。
                        store.dispatch('FedLogOut');
                        setTimeout(function () {
                            router.replace({ //跳转到登录页面
                                path: 'login',
                                query: { redirect: router.currentRoute.fullPath } // 将跳转的路由path作为参数，登录成功后跳转到该路由
                            });
                        }, 3000);
                        break;
                    case -1:
                        Message.error("Unknown exception"); //未知的异常
                        break;
                    
                    case 9:
                        errorObj.msg = res.data.subErrors[0].message;
    
                        console.log(errorObj);
                        return errorObj;
                        break;
                    default:
                        Message.error("服务未知异常");
                        break;
                }
                break;
            case 404:
                Message.error("请求资源不存在:404");
                break;
            case 405:
                Message.error("Method Not Allowed:405");
                break;
            case 422:
                Message.error(errData.errors[0].errors[0]);
                break;
            case 500:
                Message.error("服务器错误:500");
                break;
            default:
                Message.error("服务器异常");
                break;
        }
        //这里屏蔽掉promise的错误返回值，否则前端axios不做catch处理时控制台会出错！
        return Promise.reject(error.response || '服务器异常');
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
        console.log(params)
        return new Promise((resolve, reject) => {
            axios.delete(url, {data:params})
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
