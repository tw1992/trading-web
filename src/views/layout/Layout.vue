<template>
  <div class="wrapper">
      <v-head></v-head>
      
      <div class="content">
          <router-view></router-view>
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
    min-height: 100%;
  }
}
</style>


