<template>
  <transition name="fade"
		            mode="out-in">
    <router-view class="fundsmain"></router-view>
  </transition>
</template>

<script>
export default {
  data() {
      return {
        
      };
    },
}
</script>

<style lang="scss">
@import "../../styles/fundsManagement.scss";
</style>


