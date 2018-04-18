<template>
  <div class="wrapper">
      <v-head></v-head>
      
      <div class="content">
          <router-view class="contentMain"></router-view>
          <v-foot></v-foot>
      </div>
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
  .content{
    padding-top: 62px;
    .contentMain{
      min-height: 686px;
      box-sizing: border-box;
    }
  }
}
</style>


