import { setEmail,getEmail,getToken,setToken } from '@/utils/auth'  
import axios from '../../api/axios'

const user = {
  state: {
    email:'',  
    token:'',
    userInfo: '',
  },
  mutations: {
    SET_EMAIL: (state, email) => {  
        state.email = email;  
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
        console.log(userInfo)
        var loginData = {};
        loginData.email = userInfo.email.trim();   
        loginData.password = userInfo.password.trim();    
        return new Promise((resolve, reject) => {  
            axios.post("/api/auth/login", loginData).then(response => {  
                const data = response.data;  
                commit('SET_EMAIL', loginData.email);  
                commit('SET_TOKEN', data.token);  
                setEmail(loginData.email);  
                setToken(data.token);  
                localStorage.email = loginData.email;
                localStorage.token = data.token;
                resolve(response); 
            }).catch(error => { 
                reject(error) 
            }) 
        }) 
    },  
    // 注册   
    Regist({ commit }, userInfo) {   
        var data = {};
        data.email = userInfo.email.trim();   
        data.password = userInfo.password.trim();   
        data.pid = userInfo.recommend.trim() || "";
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
        return new Promise((resolve, reject) => { 
            axios.get('/api/auth/logout', '').then(response => {   
                setEmail('');  
                setToken(false);  
                commit('SET_EMAIL', '');  
                commit('SET_TOKEN', false);
                localStorage.removeItem("email");
                localStorage.removeItem("token");
                resolve(response);  
            }).catch(error => {   
                reject(error) 
            }) 
        })  
    },
    //从localstorage里取email和token
    initLogin({ commit }) {
        return new Promise(resolve => {  
            var email = localStorage.email || "";
            var token = localStorage.token || false;
            commit('SET_EMAIL', email);  
            commit('SET_TOKEN', token);
        })
    },
    //前端登出
    FedLogOut({ commit }) {   
        return new Promise(resolve => {  
            setEmail('');  
            setToken(false);  
            commit('SET_EMAIL', '');  
            commit('SET_TOKEN', false);  
            localStorage.removeItem("email");
            localStorage.removeItem("token");
            resolve()  
        })  
    },
    getUserInfo({ commit }){
        return new Promise((resolve, reject) => { 
            axios.get('/api/user/info', '').then(response => {   
                console.log(response);
                //commit('SET_USERINFO', '');  
                resolve(response);  
            }).catch(error => {   
                reject(error) 
            }) 
        }) 
    }
  }
}

export default user
