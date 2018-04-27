import { setEmail,getEmail,getToken,setToken } from '@/utils/auth'  
import axios from '../../api/axios'

const user = {
  state: {
    email:'',  
    token:'',
  },
  mutations: {
    SET_EMAIL: (state, email) => {  
        state.name = email;  
    },  
    SET_TOKEN: (state, token) => {  
        state.token = token;  
        setToken(token);  
    }  
  },
  actions: {
    // 登录  
    Login({ commit }, userInfo) {  
        const email = userInfo.email.trim();  
        const password = userInfo.password.trim();  
        return new Promise((resolve, reject) => {  
            axios.post(name, userInfo).then(response => {  
                const data = response.data;  
                commit('SET_EMAIL', data.email);  
                commit('SET_TOKEN', data.token);  
                setEmail(data.email);  
                setToken(data.token);  
                localStorage.email = data.email;
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
                const data = response.data;   
                commit('SET_EMAIL', data.email);   
                commit('SET_TOKEN', data.token);  
                setEmail(data.email);
                setToken(data.token);   
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
        var email = localStorage.email || "";
        var token = localStorage.token || false;
        commit('SET_EMAIL', email);  
        commit('SET_TOKEN', token);
    }
  }
}

export default user
