<template>
  <div class="wrapper">
      <v-head></v-head>
      
      <div class="content">
        <transition name="fade"
		            mode="out-in">
          <router-view class="contentMain"></router-view>
        </transition>
      </div>
      <v-foot></v-foot>
  </div>
</template>

<script>
import vHead from './header.vue';
import vFoot from './footer.vue';
export default {
  components:{
    vHead,vFoot
  }
}
</script>

<style lang='scss'>
.wrapper{
  min-height: 100%;
  min-width: 1200px;
  padding-bottom: -200px;
  .content{
    padding-top: 62px;
    .contentMain{
      min-height: 686px;
      box-sizing: border-box;
    }
  }
}
</style>


