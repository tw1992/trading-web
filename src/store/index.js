import Vue from 'vue'
import Vuex from 'vuex'
import vuexAlong from 'vuex-along'
import app from './modules/app'
import user from './modules/user'
import getters from './getters'

Vue.use(Vuex)

vuexAlong.watchSession(['user','app'],true);

const store = new Vuex.Store({
  modules: {
    app,
    user
  },
  getters,
  plugins: [vuexAlong]
})

export default store
