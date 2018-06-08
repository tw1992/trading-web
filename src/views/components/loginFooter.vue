<template>
  <div class="Lfooter">
    <ul class="LFnav">
        <li><router-link to="/Home">首页</router-link></li>
        <li><a href="https://support.bjex.io/hc/zh-cn" target="_block">帮助中心</a></li>
        <li><a href="javascript:;" :class="language==='zh'?'active':''" @click="handleSetLanguage('zh')">简体中文</a></li>
        <li><a href="javascript:;" :class="language==='en'?'active':''" @click="handleSetLanguage('en')">English</a></li>
        </ul>
        <p class="pLFtips">@  2017-2018   coin plus.com  All  Rights  Reserved</p>
    </div>
</template>

<script>
export default {
  data() {
      return {
        
      };
    },
    methods: {
      handleSetLanguage(lang) {
        this.$i18n.locale = lang
        this.$store.dispatch('setLanguage', lang)
      }
    },
    computed: {
        language() {
            return this.$store.getters.language
        }
    }
}
</script>

<style lang="scss" scoped>
.Lfooter{
    font-family: ArialMT;
    font-size: 12px;
    color: #999999;
    width: 100%;
    text-align: center;
    position: absolute;
    bottom: 30px;
    left: 0;
    .LFnav{
        display: flex;
        justify-content: center;
        a{
            color: #999999;
            margin: 0 16px;
            line-height: 28px;
            &:hover{
                color: #333333;
            }
        }
        a.active{
            color: #333333;
        }
        
    }
}
</style>






