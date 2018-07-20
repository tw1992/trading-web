import { setEmail,getEmail,getToken,setToken } from '@/utils/auth'
import vuexAlong from 'vuex-along'
import axios from '../../api/axios'
import router from '../../routes'

const user = {
  state: {
    email:'',
    token:'',
    userInfo: '',
    emailActive: '',
  },
  mutations: {
    SET_EMAIL: (state, email) => {
        state.email = email;
    },
    SET_EMAILACTIVE: (state, email) => {
        state.emailActive = email;
    },
    SET_TOKEN: (state, token) => {
        state.token = token;
        setToken(token);
    },
    SET_USERINFO: (state, userInfo) => {
        state.userInfo = userInfo;
    },
  },
  actions: {
    // 登录
    Login({ commit }, userInfo) {
        var loginData = {};
        loginData.email = userInfo.email.trim();
        loginData.password = userInfo.password.trim();
        loginData.sessionId = userInfo.sessionId;
        loginData.token = userInfo.token;
        loginData.sig = userInfo.sig;
        loginData.scene = userInfo.scene;
        return new Promise((resolve, reject) => {
            axios.post("/api/auth/login", loginData).then(response => {
                const data = response.data;
                commit('SET_EMAIL', loginData.email);
                setEmail(loginData.email);
                if(response.code == 0){
                    commit('SET_TOKEN', data.token);
                    setToken(data.token);
                }

                // localStorage.email = loginData.email;
                // localStorage.token = data.token;
                resolve(response);
            }).catch(error => {
                reject(error)
            })
        })
    },
    phoneLogin({ commit }, userInfo) {
        return new Promise((resolve, reject) => {
            axios.post("/api/auth/2fa", userInfo).then(response => {
                const data = response.data;
                console.log(response)
                if(response.code == 0){
                    commit('SET_TOKEN', data.token);
                    setToken(data.token);
                }
                resolve(response);
            }).catch(error => {
                reject(error)
            })
        })
    },
    googleLogin({ commit }, userInfo) {
        return new Promise((resolve, reject) => {
            axios.post("/api/auth/2fa", userInfo).then(response => {
                const data = response.data;
                console.log(response)
                if(response.code == 0){
                    commit('SET_TOKEN', data.token);
                    setToken(data.token);
                }
                resolve(response);
            }).catch(error => {
                reject(error)
            })
        })
    },
    //存下邮箱信息
    emailActive({ commit }, email) {
      console.log(email)
        commit('SET_EMAILACTIVE', email);
    },
    // 注册
    Regist({ commit }, userInfo) {
        var data = {};
        data.email = userInfo.email.trim();
        data.password = userInfo.password.trim();
        data.pid = userInfo.recommend.trim() || "";
        data.sessionId = userInfo.sessionId;
        data.token = userInfo.token;
        data.sig = userInfo.sig;
        data.scene = userInfo.scene;
        return new Promise((resolve, reject) => {
            axios.post('/api/auth/register', data).then(response => {
                resolve(response);
            }).catch(error => {
                reject(error)
            })
        })
    },
      // 登出
    LogOut({ commit, state }) {
        var _this = this;
        return new Promise((resolve, reject) => {
            axios.get('/api/auth/logout', '').then(response => {
                setEmail('');
                setToken(false);
                commit('SET_EMAIL', '');
                commit('SET_TOKEN', false);
                vuexAlong.clean()
                router.replace({ //跳转到home
                    path: '/'
                });
                resolve(response);
            }).catch(error => {
                reject(error)
            })
        })
    },
    tcLogOut({ commit, state }) {       //交易中心退出
        var _this = this;
        return new Promise((resolve, reject) => {
            axios.get('/api/auth/logout', '').then(response => {
                setEmail('');
                setToken(false);
                commit('SET_EMAIL', '');
                commit('SET_TOKEN', false);
                vuexAlong.clean()
                resolve(response);
            }).catch(error => {
                reject(error)
            })
        })
    },
    //从localstorage里取email和token
    // initLogin({ commit }) {
    //     return new Promise(resolve => {
    //         var email = localStorage.email || "";
    //         var token = localStorage.token || false;
    //         commit('SET_EMAIL', email);
    //         commit('SET_TOKEN', token);
    //     })
    // },
    //前端登出
    FedLogOut({ commit }) {
        return new Promise(resolve => {
            setEmail('');
            setToken(false);
            commit('SET_EMAIL', '');
            commit('SET_TOKEN', false);
            vuexAlong.clean();
            router.replace({ //跳转到home
                path: '/'
            });
            resolve()
        })
    },
    //修改密码登出
    changeLogOut({ commit }) {
        return new Promise(resolve => {
            setEmail('');
            setToken(false);
            commit('SET_EMAIL', '');
            commit('SET_TOKEN', false);
            vuexAlong.clean();
            router.replace({ //跳转到login
                path: '/login'
            });
            resolve()
        })
    },
    getUserInfo({ commit }){
        return new Promise((resolve, reject) => {
            axios.get('/api/user/info', '').then(response => {
                // console.log(response);
                commit('SET_USERINFO', response.data);
                resolve(response);
            }).catch(error => {
                reject(error)
            })
        })
    }
  }
}

export default user
