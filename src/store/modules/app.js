import Cookies from 'js-cookie'
import axios from '../../api/axios'

const app = {
  state: {
    sidebar: {
      opened: !+Cookies.get('sidebarStatus')
    },
    language: Cookies.get('language') || 'en',
    marketList: [],
    coinList: []
  },
  mutations: {
    TOGGLE_SIDEBAR: state => {
      if (state.sidebar.opened) {
        Cookies.set('sidebarStatus', 1)
      } else {
        Cookies.set('sidebarStatus', 0)
      }
      state.sidebar.opened = !state.sidebar.opened
    },
    SET_LANGUAGE: (state, language) => {
      state.language = language
      Cookies.set('language', language)
    },
    SET_MARKET: (state, market) => {
      state.marketList = market
    },
    SET_COIN: (state, coin) => {
      state.coinList = coin
    },
  },
  actions: {
    toggleSideBar({ commit }) {
      commit('TOGGLE_SIDEBAR')
    },
    setLanguage({ commit }, language) {
      commit('SET_LANGUAGE', language)
    },
    getPairs({ commit }) {
      return new Promise((resolve, reject) => {  
        axios.get("/api/market/pairs").then(response => {  
            const data = response.data;  
            console.log(data)
            var market = [];
            var coin = [];
            var json = {};
            data.forEach(it => {
              if(!json[it.market_name]){  

              }else{

              }
              if(!json[it.coin_name]){

              }else{
                
              }
            });
            
            resolve(response); 
        }).catch(error => { 
            reject(error) 
        }) 
    }) 
    }
  }
}

export default app
