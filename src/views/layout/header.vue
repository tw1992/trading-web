<template>
  <el-col :span="24" type="flex" class="header">
      <el-menu
        :default-active="$route.path"
        router
        menu-trigger="click"
        :unique-opened="true"
        class="homeNav"
        mode="horizontal"
        @select="handleSelect"
        @open="openSelect"
        text-color="#333333"
        active-text-color="#FC9217">
          <el-menu-item index="/Home" class="logo"><img src="../../assets/img/logo.png" alt="logo"></el-menu-item>
          <el-menu-item :index="'/tradingCenter/'+ $store.state.home['firstSymbol']">{{$t('route.tradingCenter')}}</el-menu-item>
          <el-menu-item index="" class="blank" disabled></el-menu-item>

        <el-submenu index="/fundsManagement" v-if="email">
            <template slot="title">{{$t('route.funds')}}</template>
            <el-menu-item index="/fundsManagement/balances">{{$t('route.balances')}}</el-menu-item>
            <!--<el-menu-item index="/fundsManagement/deposits/16">{{$t('route.deposits')}}</el-menu-item>-->
            <!--<el-menu-item index="/fundsManagement/withdrawals/16">{{$t('route.withdrawals')}}</el-menu-item>-->
            <el-menu-item index="/fundsManagement/transactionHistory">{{$t('route.transactionHistory')}}</el-menu-item>
        </el-submenu>
        <el-submenu index="/mandatory" v-if="email">
            <template slot="title">{{$t('route.orders')}}</template>
            <el-menu-item index="/mandatory/openOrders">{{$t('route.openOrders')}}</el-menu-item>
            <el-menu-item index="/mandatory/orderHistory">{{$t('route.orderHistory')}}</el-menu-item>
            <el-menu-item index="/mandatory/tradeHistory">{{$t('route.tradeHistory')}}</el-menu-item>
        </el-submenu>
        <el-menu-item index=""><a href="https://support.bjex.io/hc/zh-cn" target="_block">{{$t('route.support')}}</a></el-menu-item>
          <el-menu-item v-if="!email" index="/login">{{$t('route.login')}}</el-menu-item>
          <el-menu-item v-if="!email" index="/register">{{$t('route.register')}}</el-menu-item>
        <el-submenu index="/userCenter" v-if="email">
            <template slot="title">{{$t('route.account')}}</template>
            <el-menu-item index="/userCenter/account">{{email}}</el-menu-item>
            <el-menu-item class="sum" index="">
              <p>{{$t('route.assessment')}}</p>
              <p>{{sum}} {{$store.state.app.area.name}}</p>
            </el-menu-item>
            <el-menu-item index="" @click="logout">{{$t('route.logout')}}</el-menu-item>
        </el-submenu>
        <!-- <el-menu-item index="">{{$t('route.join')}}</el-menu-item>
        <el-menu-item index="/helpCenter">{{$t('route.support')}}</el-menu-item>
        <el-menu-item index="">{{$t('route.news')}}</el-menu-item> -->
        <!-- <el-menu-item index="">
            <el-dropdown class="changeLang" @command="handleSetLanguage">
                <span class="el-dropdown-link">
                    {{$t('route.lang')}}
                </span>
                <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item command="zh" :disabled="language==='zh'">简体中文</el-dropdown-item>
                    <el-dropdown-item command="en" :disabled="language==='en'">English</el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>
        </el-menu-item> -->
        <el-submenu index="changeLang">
            <template slot="title">{{$t('route.lang')}}</template>
            <el-menu-item index="" v-show="language!='zh'" @click="handleSetLanguage('zh')">简体中文</el-menu-item>
            <el-menu-item index="" v-show="language!='tw'" @click="handleSetLanguage('tw')">繁体中文</el-menu-item>
            <el-menu-item index="" v-show="language!='en'" @click="handleSetLanguage('en')">English</el-menu-item>

        </el-submenu>
        </el-menu>
        </el-col>
</template>

<script>
import { mapGetters } from 'vuex'
import axios from '../../api/axios'
export default {
  data() {
    return {
      sum: 0,
    };
  },
  methods: {
    open(index) {},
    handleSelect(key, keyPath) {
        if(!key){}
    },
    openSelect() {},
    //退出登录
    logout: function() {
      this.$store.dispatch('LogOut');
    },
    handleSetLanguage(lang) {

      this.$i18n.locale = lang
      this.$store.dispatch('setLanguage', lang)
      //console.log(this.$i18n.locale)
    //   this.$message({
    //     message: 'switch language success',
    //     type: 'success'
    //   })
    },
    getAccounts() {
      var _this = this;
      axios.get('/api/accounts').then(function(res){
          _this.sum = res.data.cny;
      }).catch(function (res){
          console.log(res);
      });
    }
  },
  computed: {
    ...mapGetters([
        'email',
        'token',
        'userInfo',
    ]),
    language() {
      return this.$store.getters.language
    }
  },
  beforeMount (){
    // this.$store.dispatch('initLogin');
    if(this.email){
      this.$store.dispatch('getUserInfo');    //获取用户信息
      this.$store.dispatch('getMarket');       //获取市场列表
      this.$store.dispatch('getCoin');        //获取币种列表
      this.$store.dispatch('getPairs');        //获取交易对列表
      this.$store.dispatch('area');        //获取默认法币
      this.getAccounts();

    }
  }
};
</script>




<style scoped lang="scss">
@import "~scss_vars";
.header{
  box-shadow: 0 2px 4px 0 #CCCCCC;

}
.homeNav{
  padding: 0 60px;
  min-width: 1200px;
  display: flex;
  box-sizing: border-box;
  // background: #131520;
  // .el-menu-item{
  //   float: left;
  // }
  .blank{
    flex: 1;
    cursor:auto;
  }
}
.el-menu--horizontal{
  .el-menu-item{
    &:hover{
      background: #EEEEEE;
    }
  }
}
</style>

<style lang="scss">
.el-menu--horizontal .el-menu--popup{
  min-width: 120px;
  text-indent: 8px;
}
.el-menu--horizontal{
  border:0;
}
.el-submenu__title{
    -webkit-touch-callout: none; /* iOS Safari */

    -webkit-user-select: none; /* Chrome/Safari/Opera */

    -khtml-user-select: none; /* Konqueror */

    -moz-user-select: none; /* Firefox */

    -ms-user-select: none; /* Internet Explorer/Edge */

    user-select: none; /* Non-prefixed version, currently

    not supported by any browser */
}
.el-menu-item.sum{
  height: 60px!important;
  line-height: 24px!important;
  display: flex;
  justify-content: center;
  flex-direction: column;
}
.logo.el-menu-item.is-active{
  border-bottom:0 !important;
}
.logo.el-menu-item{
  img{
    max-height:26px;
    display: inline-block;
    vertical-align: middle;
  }
}
</style>
