import Vue from 'vue'
import Vuex from 'vuex'
import vuexAlong from 'vuex-along'
import app from './modules/app'
import user from './modules/user'
import getters from './getters'
import home from './modules/home'

Vue.use(Vuex)

vuexAlong.watchSession(['home'],false);

const store = new Vuex.Store({
  modules: {
    app,
    user,
    home
  },
  getters,
  plugins: [vuexAlong]
})

export default store
