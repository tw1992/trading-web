<template>
<div class="mandBox">
  <!-- <ul class="mandNav">
    <li :class="activeName == 'openOrders'?'active':''"><router-link to="/mandatory/openOrders">当前委托</router-link></li>
    <li class="line" :class="activeName=='openOrders'||activeName=='orderHistory'?'active':''"></li>
    <li :class="activeName == 'orderHistory'?'active':''"><router-link to="/mandatory/orderHistory">历史委托</router-link></li>
    <li class="line" :class="activeName=='orderHistory'||activeName=='tradeHistory'?'active':''"></li>
    <li :class="activeName == 'tradeHistory'?'active':''"><router-link to="/mandatory/tradeHistory">成交记录</router-link></li>
  </ul> -->
  <transition name="fade"
		            mode="out-in">
    <router-view></router-view>
  </transition>
</div>
</template>

<script>
export default {
  data() {
      return {
        activeName: 'openOrders'
      };
    },
    methods: {
      handleClick(tab, event) {
        //console.log(tab.$el.dataset.router);
        this.$router.push(tab.$el.dataset.router)
      },
      // changeMark() {
      //   var path = this.$route.path;
      //   this.activeName = path.split("/")[2];
      //   //console.log(path.split("/")[2])
      // }
    },
    // beforeMount () {
    //   this.changeMark();
    // },
    // beforeUpdate () {
    //   this.changeMark();
    // }
}
</script>

<style lang="scss">
@import "../../styles/mandatory.scss";
.mandBox{
  padding-bottom:60px;
  width: 1200px;
  margin: auto;
  // a{
  //   color: #333333;
  // }
  // .mandNav{
  //   display: flex;
  //   margin-bottom: 20px;
  //   li{
  //     width: 80px;
  //     height: 30px;
  //     line-height: 30px;
  //     border: 1px solid #cccccc;
  //     text-align: center;
  //     border-left: 0;
  //     border-right:0;
  //     &:nth-child(1){
  //       border-left: 1px solid #cccccc;
  //     }
  //     &:nth-last-child(1){
  //       border-right: 1px solid #cccccc;
  //     }
  //     a{
  //       display: block;
  //       width: 100%;
  //     }
  //   }
  //   .line{
  //     width: 0;
  //     border-left: 1px solid #cccccc;
  //   }
  //   li.active{
  //     border-color: #FC9217;
  //   }
  //   li.active a{
  //     color:#FC9217;
  //     transition:color 0.3s cubic-bezier(0.645, 0.045, 0.355, 1), padding 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
  //   }
  // }
  
}




</style>


