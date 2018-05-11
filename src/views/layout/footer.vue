<template>
<div class="footerbg">
  <el-row class="footer">
    <el-col :span="24">
      <div class="fTop">
        <ul class="linkList">
          <li>
            <a href="#">{{$t('home.about')}}</a>
          </li>
          <li>
            <router-link to="/terms">{{$t('home.terms')}}</router-link>
          </li>
          <!-- <li>
            <a href="#">隐私声明</a>
          </li> -->
          <li>
            <a href="#">{{$t('home.fees')}}</a>
          </li>
          <li>
            <a href="#">{{$t('home.api')}}</a>
          </li>
          <li>
            <a href="#">{{$t('home.applyToList')}}</a>
          </li>
          <li>
            <a href="#">{{$t('home.contact')}}</a>
          </li>
        </ul>
        <ul class="iconList">
          <li><i class="iconfont icon-iconset0360"></i></li>
          <li><i class="iconfont icon-iconset0360"></i></li>
          <li><i class="iconfont icon-iconset0360"></i></li>
          <li><i class="iconfont icon-iconset0360"></i></li>
        </ul>
      </div>
      <div class="fLine"></div>
      <div class="fDown">
        <div class="reserved">
          @  2017-2018   coin plus.com  All  Rights  Reserved
        </div>
        <ul class="priceList">
          <li>
            <span class="name">24h&nbsp;{{$t('home.volume')}}</span><span class="num">277,050.93</span>
          </li>
          <li>
            <span class="name">BNB&nbsp;/&nbsp;</span><span class="num">277,050.93</span>
          </li>
          <li>
            <span class="name">BTC&nbsp;/&nbsp;</span><span class="num">277,050.93</span>
          </li>
          <li>
            <span class="name">ETH&nbsp;/&nbsp;</span><span class="num">277,050.93</span>
          </li>
        </ul>
      </div>
    </el-col>
  </el-row>
</div>
</template>

<script>
export default {
  data() {
      return {
        
      };
    },
    methods: {
        
    },
    
}
</script>

<style lang="scss" >
  .footerbg{
    background: #000000;
    height: 126px;
    .footer{
      width: 1200px;
      margin: auto;
      height: 126px;
      font-size: 14px;
      color: #CCCCCC;
      line-height: 62px;
      li{
        margin-right: 18px;
        &:nth-last-child(1){
          margin-right: 0;
        }
      }
      a{
        color: #999999;
        &:hover{
          color:#ffffff;
          transition:color 0.3s cubic-bezier(0.645, 0.045, 0.355, 1), padding 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
        }
      }
      .fLine{
        border-top: 1px solid #515558;
      }
      ul,.fTop,.fDown{
        display: flex;
      }
      .fTop,.fDown{
        justify-content: space-between;
      }
      .priceList,.reserved{
        font-size: 12px;
      }
      .priceList .num{
        color: #ffffff;
      }
    }
  }
  
</style>


