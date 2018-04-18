import Home from './views/layout/Home.vue'
let routes = [{
  path: '/login',
  component: function (resolve) {
      require(['./views/Login.vue'], resolve)
  },
  name: '登录',
  hidden: true
},
{
  path: '/register',
  component: function (resolve) {
      require(['./views/register.vue'], resolve)
  },
  name: '注册',
  hidden: true
},
{
    path: '/retrieve',
    component: function (resolve) {
        require(['./views/retrieve.vue'], resolve)
    },
    name: '找回密码',
    hidden: true
  },
{
  path: '/404',
  component: function (resolve) {
      require(['./views/404.vue'], resolve)
  },
  name: '',
  hidden: true
},
{
  path: '/',
  component: function (resolve) {
      require(['./views/layout/Layout.vue'], resolve)
  },
  name: '',
  children: [{
      path: '/Home',
      component: Home,
      name: '首页'
  }],
  redirect: {
      path: '/Home'
  }
},
{
  path: '/',
  component: function (resolve) {
      require(['./views/layout/Layout.vue'], resolve)
  },
  children: [{
      path: '/tradingCenter/:goodsId',
      component: function (resolve) {
          require(['./views/tradingCenter/tradingCenter.vue'], resolve)
      },
      name: '交易中心'
  },
  {
      path: '/fundsManagement',
      component: function (resolve) {
          require(['./views/fundsManagement/fundsManagement.vue'], resolve)
      },
      name: '资金管理'
  },
  {
      path: '/mandatory',
      component: function (resolve) {
          require(['./views/mandatory/mandatory.vue'], resolve)
      },
      children: [{
            path: '/mandatory/openOrders',
            component: function (resolve) {
                require(['./views/mandatory/openOrders.vue'], resolve)
            },
            name: '当前委托'
        },
        {
            path: '/mandatory/orderHistory',
            component: function (resolve) {
                require(['./views/mandatory/orderHistory.vue'], resolve)
            },
            name: '历史委托'
        },
        {
            path: '/mandatory/tradeHistory',
            component: function (resolve) {
                require(['./views/mandatory/tradeHistory.vue'], resolve)
            },
            name: '成交记录'
        }],
        redirect: {
            path: '/openOrders'
        },
      name: '委托管理'
  },
  {
      path: '/userCenter',
      component: function (resolve) {
          require(['./views/userCenter/user.vue'], resolve)
      },
      name: '个人中心'
  },
  {
      path: '/helpCenter',
      component: function (resolve) {
          require(['./views/helpCenter/helpCenter.vue'], resolve)
      },
      name: '帮助中心'
  }]
},
{
  path: '*',
  hidden: true,
  redirect: {
      path: '/404'
  }
}
];

export default routes;