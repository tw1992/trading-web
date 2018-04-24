<template>
<div class="footerbg">
  <el-row class="footer">
    <el-col :span="24">
      <div class="fTop">
        <ul class="linkList">
          <li>
            <a href="#">关于我们</a>
          </li>
          <li>
            <a href="#">服务协议</a>
          </li>
          <li>
            <a href="#">隐私声明</a>
          </li>
          <li>
            <a href="#">费率标准</a>
          </li>
          <li>
            <a href="#">API文档</a>
          </li>
          <li>
            <a href="#">上币申请</a>
          </li>
          <li>
            <a href="#">联系我们</a>
          </li>
        </ul>
        <ul class="iconList">
          <li>上</li>
          <li>上</li>
          <li>上</li>
          <li>上</li>
        </ul>
      </div>
      <div class="fLine"></div>
      <div class="fDown">
        <div class="reserved">
          @  2017-2018   coin plus.com  All  Rights  Reserved
        </div>
        <ul class="priceList">
          <li>
            <span class="name">24h&nbsp;成交额</span><span class="num">277,050.93</span>
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
    background: #333333;
  }
  .footer{
    width: 1200px;
    margin: auto;
    height: 200px;
    font-size: 14px;
    color: #CCCCCC;
    line-height: 98px;
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
      border: 1px solid #979797;
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
</style>


