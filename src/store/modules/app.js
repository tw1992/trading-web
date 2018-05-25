import Cookies from 'js-cookie'
import axios from '../../api/axios'

const app = {
  state: {
    sidebar: {
      opened: !+Cookies.get('sidebarStatus')
    },
    language: Cookies.get('language') || 'zh',
    marketList: [],
    coinList: [],
    pairsList: [],
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
    SET_PAIRS: (state, pairs) => {
      state.pairsList = pairs
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
    getMarket({ commit }) {
      return new Promise((resolve, reject) => {  
        axios.get("/api/market/markets_and_pairs").then(response => {  
            commit('SET_MARKET', response.data)
            console.log(response.data)
            resolve(response); 
        }).catch(error => { 
            reject(error) 
        }) 
      }) 
    },
    getPairs({ commit }) {
      return new Promise((resolve, reject) => {  
        axios.get("/api/market/pairs").then(response => {  
            commit('SET_PAIRS', response.data)
            resolve(response); 
        }).catch(error => { 
            reject(error) 
        }) 
      }) 
    },
    getCoin({ commit }) {
      return new Promise((resolve, reject) => {  
        axios.get("/api/market/assets").then(response => {  
            commit('SET_COIN', response.data)
            resolve(response); 
        }).catch(error => { 
            reject(error) 
        }) 
      }) 
    }
  }
}

export default app
