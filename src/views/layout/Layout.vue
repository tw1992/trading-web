<template>
<div class="maxBox">
  <div class="wrapper">
      <v-head></v-head>
      <div class="content">
        <transition name="fade"
		            mode="out-in">
          <router-view class="contentMain"></router-view>
        </transition>
      </div>

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
.maxBox{
  min-height: 100%;
  display: flex;
  flex-direction: column;
}
.wrapper{
  flex: 1;
  min-width: 1200px;
  .content{
    padding-top: 62px;
    .contentMain{
      // min-height: 686px;
      box-sizing: border-box;
    }
  }
}
</style>


