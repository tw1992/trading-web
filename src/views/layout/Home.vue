<template>
<div class="home">

  <el-row class="banner">
    <el-col :span="24">
      
    </el-col>
  </el-row>

  <el-row class="message">
    <el-col :span="24">
      <ul class="messageList">
        <li><a href="">芯链正式开放交易</a></li>
        <li><a href="">关于本体（ONT）上线交易的风险通知</a></li>
        <li><a href="">第二期第二轮投票上币结果公布及第三轮投票开启通知</a></li>
        <li><a href="">全球首家数字货币开采与交易一体化的矿池平台上线</a></li>
      </ul>
    </el-col>
  </el-row>

  <el-row class="tabMain">
    <el-col class="tabBox" :span="24" ref="tabs">
      <el-tabs class="" :type="hasBorder?'card':''" :class="{'tabClass':!hasBorder}" v-model="activeName" @tab-click="handleClick">
        
        <el-tab-pane>
          <span slot="label"><i class="el-icon-star-on"></i> 自选</span>
          <el-row class="tabContent">
            <el-table
            :data="BTCList"
            stripe
            @row-click="linkToGoods"
            style="width: 100%">
            <el-table-column
              align="center"
              width="80">
              <template slot-scope="scope">
                <i @click.stop="changeStar(scope.row.star)" class="el-icon-star-on" :class="scope.row.star=='off'?'star-off':'star-on'"></i>
              </template>
            </el-table-column>
            <el-table-column
              prop="name"
              label="市场"
              width="180">
            </el-table-column>
            <el-table-column
              label="最新价"
              width="188">
              <template slot-scope="scope">
                <span class="newPriceL">{{scope.row.newPrice1}}</span><span class="newPriceR">&nbsp;/&nbsp;&yen;&nbsp;{{scope.row.newPrice2}}</span>
              </template>
            </el-table-column>
            <el-table-column
              prop="scope"
              align="right"
              label="24h涨跌">
              <template slot-scope="scope">
                <span :class="parseFloat(scope.row.scope)>=0?'green':'red'">{{scope.row.scope}}</span>
              </template>
            </el-table-column>
            <el-table-column
              prop="high"
              align="right"
              label="24h最高价">
            </el-table-column>
            <el-table-column
              prop="down"
              align="right"
              label="24h最低价">
            </el-table-column>
            <el-table-column
              prop="all"
              align="right"
              class-name="lastList"
              label="24h成交量">
            </el-table-column>
          </el-table>
          </el-row>
        </el-tab-pane>

        <el-tab-pane label="BTC市场" name="BTC">
          <el-row class="tabContent">
            <el-table
            :data="BTCList"
            stripe
            @row-click="linkToGoods"
            style="width: 100%">
            <el-table-column
              align="center"
              width="80">
              <template slot-scope="scope">
                <i @click.stop="changeStar(scope.row.star)" class="el-icon-star-on" :class="scope.row.star=='off'?'star-off':'star-on'"></i>
              </template>
            </el-table-column>
            <el-table-column
              prop="name"
              label="市场"
              width="180">
            </el-table-column>
            <el-table-column
              label="最新价"
              width="188">
              <template slot-scope="scope">
                <span class="newPriceL">{{scope.row.newPrice1}}</span><span class="newPriceR">&nbsp;/&nbsp;&yen;&nbsp;{{scope.row.newPrice2}}</span>
              </template>
            </el-table-column>
            <el-table-column
              prop="scope"
              align="right"
              label="24h涨跌">
              <template slot-scope="scope">
                <span :class="parseFloat(scope.row.scope)>=0?'green':'red'">{{scope.row.scope}}</span>
              </template>
            </el-table-column>
            <el-table-column
              prop="high"
              align="right"
              label="24h最高价">
            </el-table-column>
            <el-table-column
              prop="down"
              align="right"
              label="24h最低价">
            </el-table-column>
            <el-table-column
              prop="all"
              align="right"
              class-name="lastList"
              label="24h成交量">
            </el-table-column>
          </el-table>
          </el-row>
        </el-tab-pane>

        <el-tab-pane label="ETH市场" name="ETH">
          <el-row class="tabContent">
            <el-table
            :data="ETHList"
            stripe
            @row-click="linkToGoods"
            style="width: 100%">
            <el-table-column
              align="center"
              width="80">
              <template slot-scope="scope">
                <i @click.stop="changeStar(scope.row.star)" class="el-icon-star-on" :class="scope.row.star=='off'?'star-off':'star-on'"></i>
              </template>
            </el-table-column>
            <el-table-column
              prop="name"
              label="市场"
              width="180">
            </el-table-column>
            <el-table-column
              label="最新价"
              width="188">
              <template slot-scope="scope">
                <span class="newPriceL">{{scope.row.newPrice1}}</span><span class="newPriceR">&nbsp;/&nbsp;&yen;&nbsp;{{scope.row.newPrice2}}</span>
              </template>
            </el-table-column>
            <el-table-column
              prop="scope"
              align="right"
              label="24h涨跌">
              <template slot-scope="scope">
                <span :class="parseFloat(scope.row.scope)>=0?'green':'red'">{{scope.row.scope}}</span>
              </template>
            </el-table-column>
            <el-table-column
              prop="high"
              align="right"
              label="24h最高价">
            </el-table-column>
            <el-table-column
              prop="down"
              align="right"
              label="24h最低价">
            </el-table-column>
            <el-table-column
              prop="all"
              align="right"
              class-name="lastList"
              label="24h成交量">
            </el-table-column>
          </el-table>
          </el-row>
        </el-tab-pane>

        <el-tab-pane :disabled="true">
          <span slot="label">
            <el-input
          class="search"
          placeholder="请输入内容"
          prefix-icon="el-icon-search"
          >
        </el-input>
          </span>
        </el-tab-pane>
      </el-tabs>
      
    </el-col>
  </el-row>

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
        activeName: 'BTC',
        hasBorder:true,
        BTCList: [
          {id:"1",name:"XVG/BTC",newPrice1:"0.00001257",newPrice2:"0.67",scope:"17.48%",high:"0.00001310",down:"0.00000975",all:"17,245.43037969",star:"off"},
          {id:"2",name:"ADA/BTC",newPrice1:"0.00001257",newPrice2:"1.67",scope:"-17.48%",high:"0.00001310",down:"0.00000975",all:"17,245.43037969",star:"on"},
          {id:"1",name:"XVG/BTC",newPrice1:"0.00001257",newPrice2:"0.67",scope:"17.48%",high:"0.00001310",down:"0.00000975",all:"17,245.43037969",star:"off"},
          {id:"2",name:"ADA/BTC",newPrice1:"0.00001257",newPrice2:"1.67",scope:"-17.48%",high:"0.00001310",down:"0.00000975",all:"17,245.43037969",star:"on"},{id:"1",name:"XVG/BTC",newPrice1:"0.00001257",newPrice2:"0.67",scope:"17.48%",high:"0.00001310",down:"0.00000975",all:"17,245.43037969",star:"off"},
          {id:"2",name:"ADA/BTC",newPrice1:"0.00001257",newPrice2:"1.67",scope:"-17.48%",high:"0.00001310",down:"0.00000975",all:"17,245.43037969",star:"on"},{id:"1",name:"XVG/BTC",newPrice1:"0.00001257",newPrice2:"0.67",scope:"17.48%",high:"0.00001310",down:"0.00000975",all:"17,245.43037969",star:"off"},
          {id:"2",name:"ADA/BTC",newPrice1:"0.00001257",newPrice2:"1.67",scope:"-17.48%",high:"0.00001310",down:"0.00000975",all:"17,245.43037969",star:"on"},{id:"1",name:"XVG/BTC",newPrice1:"0.00001257",newPrice2:"0.67",scope:"17.48%",high:"0.00001310",down:"0.00000975",all:"17,245.43037969",star:"off"},
          {id:"2",name:"ADA/BTC",newPrice1:"0.00001257",newPrice2:"1.67",scope:"-17.48%",high:"0.00001310",down:"0.00000975",all:"17,245.43037969",star:"on"},{id:"1",name:"XVG/BTC",newPrice1:"0.00001257",newPrice2:"0.67",scope:"17.48%",high:"0.00001310",down:"0.00000975",all:"17,245.43037969",star:"off"},
          {id:"2",name:"ADA/BTC",newPrice1:"0.00001257",newPrice2:"1.67",scope:"-17.48%",high:"0.00001310",down:"0.00000975",all:"17,245.43037969",star:"on"},
          {id:"1",name:"XVG/BTC",newPrice1:"0.00001257",newPrice2:"0.67",scope:"17.48%",high:"0.00001310",down:"0.00000975",all:"17,245.43037969",star:"off"},
          {id:"2",name:"ADA/BTC",newPrice1:"0.00001257",newPrice2:"1.67",scope:"-17.48%",high:"0.00001310",down:"0.00000975",all:"17,245.43037969",star:"on"},{id:"1",name:"XVG/BTC",newPrice1:"0.00001257",newPrice2:"0.67",scope:"17.48%",high:"0.00001310",down:"0.00000975",all:"17,245.43037969",star:"off"},
          {id:"2",name:"ADA/BTC",newPrice1:"0.00001257",newPrice2:"1.67",scope:"-17.48%",high:"0.00001310",down:"0.00000975",all:"17,245.43037969",star:"on"},{id:"1",name:"XVG/BTC",newPrice1:"0.00001257",newPrice2:"0.67",scope:"17.48%",high:"0.00001310",down:"0.00000975",all:"17,245.43037969",star:"off"},
          {id:"2",name:"ADA/BTC",newPrice1:"0.00001257",newPrice2:"1.67",scope:"-17.48%",high:"0.00001310",down:"0.00000975",all:"17,245.43037969",star:"on"},{id:"1",name:"XVG/BTC",newPrice1:"0.00001257",newPrice2:"0.67",scope:"17.48%",high:"0.00001310",down:"0.00000975",all:"17,245.43037969",star:"off"},
          {id:"2",name:"ADA/BTC",newPrice1:"0.00001257",newPrice2:"1.67",scope:"-17.48%",high:"0.00001310",down:"0.00000975",all:"17,245.43037969",star:"on"},{id:"1",name:"XVG/BTC",newPrice1:"0.00001257",newPrice2:"0.67",scope:"17.48%",high:"0.00001310",down:"0.00000975",all:"17,245.43037969",star:"off"},
          {id:"2",name:"ADA/BTC",newPrice1:"0.00001257",newPrice2:"1.67",scope:"-17.48%",high:"0.00001310",down:"0.00000975",all:"17,245.43037969",star:"on"},{id:"1",name:"XVG/BTC",newPrice1:"0.00001257",newPrice2:"0.67",scope:"17.48%",high:"0.00001310",down:"0.00000975",all:"17,245.43037969",star:"off"},
          {id:"2",name:"ADA/BTC",newPrice1:"0.00001257",newPrice2:"1.67",scope:"-17.48%",high:"0.00001310",down:"0.00000975",all:"17,245.43037969",star:"on"},
        ],
        ETHList: []
      };
    },
    methods: {
      handleClick(tab, event) {
        //console.log(tab, event);
      },
      star(row, column, cellValue) {

      },
      linkToGoods(row, event, column){
        console.log(row.id);
      },
      changeStar(star){
        console.log(star)
      },
      handleScroll(){
        var scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
        // console.log(scrollTop)
        if(scrollTop>600){
          this.hasBorder = false;
        }else{
          this.hasBorder = true;
        }
      }
    },
    mounted () {
      window.addEventListener('scroll', this.handleScroll)
    },
    destroyed () {
      window.removeEventListener('scroll', this.handleScroll)
    },
}
</script>

<style lang="scss">
.home{
  height: 100%;
  min-width: 1200px;
  color: #333333;
  .banner{
    height: 400px;
    background: #000;
  }
  .message{
    height: 80px;
    background: #333333;
    .messageList{
      height: 80px;
      display: flex;
      justify-content: center;
      align-items: center;
      color: #EEEEEE;
      li{
        font-size: 14px;
        padding: 0 60px;
        line-height: 16px;
        border-right: 1px solid #cccccc;
        &:nth-last-child(1){
          border: 0;
        }
        a{
          color: #EEEEEE;
        }
      }
    }
  }
  .tabMain{
    padding: 60px;
    padding-bottom: 120px;
    .tabBox{
      #tab-3{
        margin-top:-1px; 
        margin-right:-1px; 
        border-top:1px solid #ffffff; 
        border-right:1px solid #ffffff; 
      }
      .search{
        height: 28px;
        width: 200px;
        input{
          border-radius: 0;
          height: 28px;
        }
        span{
          height: 28px;
          i{
            line-height: 28px;
          }
        }
      }
      .tabContent{
        .el-table--enable-row-hover .el-table__body tr:hover > td{
          background-color: rgba(245,166,35,0.10);
        }
        .el-table td{
          cursor:pointer;
        }
        .el-table th, .el-table td{
          padding: 0;
          font-weight: 500;
          font-size: 12px;
          line-height: 30px;
          height: 30px;
        }
        .el-icon-star-on{
          font-size: 13px;
        }
        .star-on{
          color: #F5A623;
        }
        .star-off{
          color: #cccccc;
        }
        .green{
          color: #70a800;
        }
        .red{
          color: #ea0070;
        }
        .newPriceR{
          color: #999999
        }
        tbody,thead{
          .lastList{
            padding: 0 26px;
          }
        }
        
      }
      .tabClass .el-tabs__header{
        position: fixed;
        top: 0;
        left: 0;
        padding: 0 60px;
        z-index: 10;
        background: #fff;
        width: 100%;
        height: 60px;
        line-height: 60px;
        box-shadow: 0 2px 4px 0 #999999;
      }
      

      .el-tabs__nav{
        border-radius: 0;
      }
      .el-tabs--card > .el-tabs__header{
        border: 0;
      }
      .el-tabs__header{
        margin: 0;
      }
      .el-tabs__content{
        border: 1px solid #eeeeee;
      }
    }
    
  }

  .footer{
    height: 200px;
    background: #333333;
    padding: 0 60px;
    font-size: 14px;
    color: #CCCCCC;
    line-height: 98px;
    li{
      margin-right: 18px;
    }
    a{
      color: #999999;
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

  .el-tabs__active-bar{
    background-color: #fff;
  }
  .el-tabs__nav-wrap::after{
    background-color: #fff;
  }
}

</style>

<style scoped lang="scss">
.el-tabs__active-bar{
  background-color: #fff;
}
</style>

