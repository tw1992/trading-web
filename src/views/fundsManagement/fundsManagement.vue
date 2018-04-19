<template>
  <transition name="fade"
		            mode="out-in">
    <router-view></router-view>
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


