import Vue from 'vue'
import App from './App'
import store from './store'
import Kline from "kline";
import ElementUI from 'element-ui';
import 'babel-polyfill';
import './styles/element-variables.scss';
// import 'element-ui/lib/theme-chalk/index.css';
import './styles/vars.scss'
import './styles/DialogInit.scss'
import './assets/iconfont/iconfont.css'
import router from './routes'
import i18n from './lang'
import * as custom from './filter/filters'

Object.keys(custom).forEach(key => {
    Vue.filter(key, custom[key])
})


Vue.use(ElementUI)

Vue.use(ElementUI, {
  size: 'medium', // set element-ui default size
  i18n: (key, value) => i18n.t(key, value)
})


// 页面刷新时，重新赋值token
// if (window.localStorage.getItem('token')) {
//   store.dispatch('initLogin');
// }


Vue.config.productionTip = false
/* eslint-disable no-new */
new Vue({
  el: '#app',
  ElementUI,
  i18n,
  store,
  router,
  components: { App },
  template: '<App/>'
})
