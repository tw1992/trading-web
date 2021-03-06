import Home from './views/layout/Home.vue'
import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '@/store'

Vue.use(VueRouter)

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
    path: '/resetpassword',
    component: function (resolve) {
        require(['./views/resetpassword.vue'], resolve)
    },
    name: '重置密码',
    hidden: true
},
{
    path: '/emaiActivation',
    component: function (resolve) {
        require(['./views/hint/emaiActivation.vue'], resolve)
    },
    name: '邮箱激活确认',
    hidden: true
},
{
    path: '/activationSuccess',
    component: function (resolve) {
        require(['./views/hint/activationSuccess.vue'], resolve)
    },
    name: '账号激活成功',
    hidden: true
},
{
    path: '/lose',
    component: function (resolve) {
        require(['./views/hint/lose.vue'], resolve)
    },
    name: '邮件失效',
    hidden: true
},
{
    path: '/withTimeout',
    component: function (resolve) {
        require(['./views/hint/withTimeout.vue'], resolve)
    },
    name: '提现失效',
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
    path: '/tradingCenter/:coin/:market',
    component: function (resolve) {
        require(['./views/tradingCenter/tradingCenter.vue'], resolve)
    },
    name: '交易中心'
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
      path: '/fundsManagement',
      component: function (resolve) {
          require(['./views/fundsManagement/fundsManagement.vue'], resolve)
      },
      name: '资金管理',
      meta: {
        requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录的
      },
      children: [{
            path: '/fundsManagement/balances',
            component: function (resolve) {
                require(['./views/fundsManagement/balances.vue'], resolve)
            },
            name: '我的资产'
        },
        {
            path: '/fundsManagement/deposits/:coin_id/:type',//type 0充值 1充币
            component: function (resolve) {
                require(['./views/fundsManagement/deposits.vue'], resolve)
            },
            name: '充值'
        },
        {
            path: '/fundsManagement/withdrawals/:coin_id/:type',//type 0提现 1提币
            component: function (resolve) {
                require(['./views/fundsManagement/withdrawals.vue'], resolve)
            },
            name: '提现'
        },
        {
            path: '/fundsManagement/transactionHistory',
            component: function (resolve) {
                require(['./views/fundsManagement/transactionHistory.vue'], resolve)
            },
            name: '充值提现记录'
        }],
        redirect: {
            path: '/balances'
        }
  },
  {
      path: '/mandatory',
      component: function (resolve) {
          require(['./views/mandatory/mandatory.vue'], resolve)
      },
      meta: {
        requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录的
      },
      name: '委托管理',
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
        }

  },
  {
      path: '/userCenter',
      component: function (resolve) {
          require(['./views/userCenter/user.vue'], resolve)
      },
      name: '个人',
      meta: {
        requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录的
      },
      children: [{
            path: '/userCenter/account',
            component: function (resolve) {
                require(['./views/userCenter/account.vue'], resolve)
            },
            name: '个人中心'
        }],
        redirect: {
            path: '/openOrders'
        },
  },
  {
      path: '/attestation',
      component: function (resolve) {
          require(['./views/userCenter/attestation.vue'], resolve)
      },
      meta: {
        requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录的
      },
      name: '谷歌认证'
  },
  {
    path: '/autonym',
    component: function (resolve) {
        require(['./views/userCenter/autonym.vue'], resolve)
    },
    meta: {
        requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录的
      },
    name: '实名认证'
  },
    {
      path: '/bindCardList',
      component: function (resolve) {
        require(['./views/userCenter/bindCardList.vue'], resolve)
      },
      meta: {
        requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录的
      },
      name: '绑定银行卡列表'
    },
    {
      path: '/bindCardForm',
      component: function (resolve) {
        require(['./views/userCenter/bindCardForm.vue'], resolve)
      },
      meta: {
        requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录的
      },
      name: '绑定银行卡表单'
    },
  {
    path: '/terms',
    component: function (resolve) {
        require(['./views/layout/other/terms.vue'], resolve)
    },
    name: '服务条款'
  },
  {
    path: '/fees',
    component: function (resolve) {
        require(['./views/layout/other/fees.vue'], resolve)
    },
    name: '费率标准'
  },
  {
    path: '/about',
    component: function (resolve) {
        require(['./views/layout/other/aboutUs.vue'], resolve)
    },
    name: '关于我们'
  },
  {
    path: '/brand',
    component: function (resolve) {
        require(['./views/layout/other/brand.vue'], resolve)
    },
    name: '品牌形象'
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
      path: '/Home'
  }
}
];


const router = new VueRouter({
    mode: 'history',
    routes
});

router.beforeEach((to, from, next) => {
    if (to.matched.some(r => r.meta.requireAuth)) {
        if (store.getters.token) {
            next();
        }
        else {
            // next({
            //     path: '/login',
            //     query: {redirect: to.fullPath}
            // })
        }
    }
    else {
        next();
    }
})


export default router;
