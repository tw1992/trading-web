<template>
<div class="home">
  <!-- <div class="goTop" v-show="!isTop" @click="smoothscroll()">
    <i class="el-icon-upload2"></i>
  </div> -->
  <el-row class="banner">
    <el-col :span="24">
      <swiper :options="swiperOption">
        <swiper-slide class="swiper-no-swiping" v-for="(slide, index) in swiperSlides" :key="index">
          <!-- I'm Slide {{ slide }} -->
          <div class="newBox" v-for="(item, idx) in slide" :key="idx">
            <a :href="item.linkTo" :title="item.name" target="_blank">
              <img :src="item.img">
              <div class="time" v-if="item.time">
                距活动结束<span>{{item.time}}</span>
              </div>
            </a>
          </div>
          
        </swiper-slide>
        <div class="swiper-pagination" slot="pagination"></div>
      </swiper>
    </el-col>
  </el-row>

  <el-row class="message">
    <el-col :span="24">
      <ul class="messageList">
        <li><a href="">关于本体（ONT）上线交易的风险通知</a></li>
        <li><a href="">第二期第二轮投票上币结果公布及第三轮投票开启通知</a></li>
        <li><a href="">全球首家数字货币开采与交易一体化的矿池平台上线</a></li>
      </ul>
    </el-col>
  </el-row>

  <el-row class="tabMain">
    <el-col class="tabBox" :span="24" ref="tabs">
      <div class="block" v-show="!hasBorder"></div>
      <el-tabs class="" :type="hasBorder?'card':''" :class="{'tabClass':!hasBorder}" v-model="activeName" @tab-click="handleClick">
        
        <el-tab-pane>
          <span slot="label"><i class="el-icon-star-on"></i> {{$t('home.favorites')}}</span>
          <el-row class="tabContent">
            <el-table
            :data="BTCList"
            stripe
            @row-click="linkToGoods"
            style="width: 100%">
            <span slot="empty">{{$t('home.noData')}}</span>
            <el-table-column
              align="center"
              width="80">
              <template slot-scope="scope">
                <i @click.stop="changeStar(scope.row.star)" class="el-icon-star-on" :class="scope.row.star=='off'?'star-off':'star-on'"></i>
              </template>
            </el-table-column>
            <el-table-column
              prop="name"
              :label="$t('home.pair')"
              width="180">
            </el-table-column>
            <el-table-column
              :label="$t('home.lastPrice')"
              width="188">
              <template slot-scope="scope">
                <span class="newPriceL">{{scope.row.newPrice1}}</span><span class="newPriceR">&nbsp;/&nbsp;&yen;&nbsp;{{scope.row.newPrice2}}</span>
              </template>
            </el-table-column>
            <el-table-column
              prop="scope"
              align="right"
              :label="'24h'+$t('home.change')">
              <template slot-scope="scope">
                <span :class="parseFloat(scope.row.scope)>=0?'green':'red'">{{scope.row.scope}}</span>
              </template>
            </el-table-column>
            <el-table-column
              prop="high"
              align="right"
              :label="'24h'+$t('home.high')">
            </el-table-column>
            <el-table-column
              prop="down"
              align="right"
              :label="'24h'+$t('home.low')">
            </el-table-column>
            <el-table-column
              prop="all"
              align="right"
              class-name="lastList"
              :label="'24h'+$t('home.volume')">
            </el-table-column>
          </el-table>
          </el-row>
        </el-tab-pane>

        <el-tab-pane name="BTC">
          <span slot="label">BTC {{$t('home.markets')}}</span>
          <el-row class="tabContent">
            <el-table
            :data="BTCList"
            stripe
            @row-click="linkToGoods"
            style="width: 100%">
            <span slot="empty">{{$t('home.noData')}}</span>
            <el-table-column
              align="center"
              width="80">
              <template slot-scope="scope">
                <i @click.stop="changeStar(scope.row.star)" class="el-icon-star-on" :class="scope.row.star=='off'?'star-off':'star-on'"></i>
              </template>
            </el-table-column>
            <el-table-column
              prop="name"
              :label="$t('home.pair')"
              width="180">
            </el-table-column>
            <el-table-column
              :label="$t('home.lastPrice')"
              width="188">
              <template slot-scope="scope">
                <span class="newPriceL">{{scope.row.newPrice1}}</span><span class="newPriceR">&nbsp;/&nbsp;&yen;&nbsp;{{scope.row.newPrice2}}</span>
              </template>
            </el-table-column>
            <el-table-column
              prop="scope"
              align="right"
              :label="'24h'+$t('home.change')">
              <template slot-scope="scope">
                <span :class="parseFloat(scope.row.scope)>=0?'green':'red'">{{scope.row.scope}}</span>
              </template>
            </el-table-column>
            <el-table-column
              prop="high"
              align="right"
              :label="'24h'+$t('home.high')">
            </el-table-column>
            <el-table-column
              prop="down"
              align="right"
              :label="'24h'+$t('home.low')">
            </el-table-column>
            <el-table-column
              prop="all"
              align="right"
              class-name="lastList"
              :label="'24h'+$t('home.volume')">
            </el-table-column>
          </el-table>
          </el-row>
        </el-tab-pane>

        <el-tab-pane name="ETH">
          <span slot="label">ETH {{$t('home.markets')}}</span>
          <el-row class="tabContent">
            <el-table
            :data="ETHList"
            stripe
            @row-click="linkToGoods"
            style="width: 100%">
            <span slot="empty">{{$t('home.noData')}}</span>
            <el-table-column
              align="center"
              width="80">
              <template slot-scope="scope">
                <i @click.stop="changeStar(scope.row.star)" class="el-icon-star-on" :class="scope.row.star=='off'?'star-off':'star-on'"></i>
              </template>
            </el-table-column>
            <el-table-column
              prop="name"
              :label="$t('home.pair')"
              width="180">
            </el-table-column>
            <el-table-column
              :label="$t('home.lastPrice')"
              width="188">
              <template slot-scope="scope">
                <span class="newPriceL">{{scope.row.newPrice1}}</span><span class="newPriceR">&nbsp;/&nbsp;&yen;&nbsp;{{scope.row.newPrice2}}</span>
              </template>
            </el-table-column>
            <el-table-column
              prop="scope"
              align="right"
              :label="'24h'+$t('home.change')">
              <template slot-scope="scope">
                <span :class="parseFloat(scope.row.scope)>=0?'green':'red'">{{scope.row.scope}}</span>
              </template>
            </el-table-column>
            <el-table-column
              prop="high"
              align="right"
              :label="'24h'+$t('home.high')">
            </el-table-column>
            <el-table-column
              prop="down"
              align="right"
              :label="'24h'+$t('home.low')">
            </el-table-column>
            <el-table-column
              prop="all"
              align="right"
              class-name="lastList"
              :label="'24h'+$t('home.volume')">
            </el-table-column>
          </el-table>
          </el-row>
        </el-tab-pane>

        <el-tab-pane :disabled="true">
          <span slot="label">
            <el-input
            class="search"
            placeholder=""
            prefix-icon="el-icon-search"
            >
        </el-input>
          </span>
        </el-tab-pane>
      </el-tabs>
      
    </el-col>
  </el-row>
</div>
</template>

<script>
import 'swiper/dist/css/swiper.css';
import { swiper, swiperSlide } from 'vue-awesome-swiper';
export default {
  data() {
      return {
        isTop: true,
        activeName: 'BTC',
        hasBorder:true,
        swiperOption: {
          direction : 'vertical',
          autoplay:{
            disableOnInteraction: false,
          },
          // loop : true,
          noSwiping : true,
          pagination: {
            el: '.swiper-pagination',
            clickable :true
          }
        },
        swiperSlides: [],
        newList:[{
          name: "new1",
          img: "https://gss0.bdstatic.com/7051cy89QMgCncy6lo7D0j9wexYrbOWh7c50/shangcheng%2FGreenTaxes270*170.png?t=1523157245",
          time: "2天17小时26分12秒",
          linkTo: "https://www.baidu.com/"
        },{
          name: "new2",
          img: "https://gss0.bdstatic.com/7051cy89QMgCncy6lo7D0j9wexYrbOWh7c50/shangcheng%2FGreenTaxes270*170.png?t=1523157245",
          time: "",
          linkTo: "https://www.baidu.com/"
        },{
          name: "new3",
          img: "https://gss0.bdstatic.com/7051cy89QMgCncy6lo7D0j9wexYrbOWh7c50/shangcheng%2FGreenTaxes270*170.png?t=1523157245",
          time: "",
          linkTo: "https://www.baidu.com/"
        },{
          name: "new1",
          img: "https://gss0.bdstatic.com/7051cy89QMgCncy6lo7D0j9wexYrbOWh7c50/shangcheng%2FGreenTaxes270*170.png?t=1523157245",
          time: "",
          linkTo: "https://www.baidu.com/"
        },{
          name: "new1",
          img: "https://gss0.bdstatic.com/7051cy89QMgCncy6lo7D0j9wexYrbOWh7c50/shangcheng%2FGreenTaxes270*170.png?t=1523157245",
          time: "",
          linkTo: "https://www.baidu.com/"
        }],
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
        ETHList: [],
      };
    },
    methods: {
      handleClick(tab, event) {
        //console.log(tab, event);
      },
      sliceArray(array, size){
        var result = [];
        for (var x = 0; x < Math.ceil(array.length / size); x++) {
            var start = x * size;
            var end = start + size;
            result.push(array.slice(start, end));
        }
        this.swiperSlides = result;
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
        if(scrollTop>540){
          this.hasBorder = false;
          this.isTop = false;
        }else{
          this.hasBorder = true;
          this.isTop = true;
        }
      },
      smoothscroll() {
        document.body.scrollTop = 0
        document.documentElement.scrollTop = 0
      },
    },
    components: {
      swiper,
      swiperSlide
    },
    beforeCreate () {
      
    },
    mounted () {
      window.addEventListener('scroll', this.handleScroll);
      this.sliceArray(this.newList,4);
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
  .goTop{
    height: 46px;
    width: 46px;
    border-radius: 50%;
    color: #ffffff;
    line-height: 46px;
    font-size: 26px;
    background: #000000;
    text-align: center;
    position: fixed;
    right: 60px;
    bottom: 240px;
    cursor:pointer;
    z-index: 100;
  }
  .banner{
    height: 330px;
    background: #000000;
    display: flex;
    justify-content: center;
    
    .swiper-container{
      padding-right: 20px;
      width: 1200px;
      height: 240px;
      margin-top: 50px;
      .swiper-pagination{
        right: 0px;
      }
      .swiper-slide{
        display: flex;
        justify-content: space-between;
        align-items: center;
        .newBox{
          position: relative;
          width: 226px;
          height: 180px;
          img{
            width: 100%;
            height: 100%;
          }
          a{
            width: 100%;
            height: 100%;
            display: block;
          }
          .time{
            box-sizing: border-box;
            height: 30px;
            width: 100%;
            background: #8A8A8A;
            position: absolute;
            left: 0;
            bottom: 0;
            font-size: 12px;
            line-height: 30px;
            padding-left: 10px;
            color: #CCCCCC;
            span{
              margin-left: 20px;
              color: #ffffff;
            }
          }
        }
      }
    }
  }
  .swiper-pagination-bullet{
    background: #cccccc;
  }
  .swiper-pagination-bullet-active{
    opacity: 1;
    background: #FC9217;
  }
  .message{
    height: 46px;
    background: #333333;
    .messageList{
      width: 1200px;
      margin: auto;
      height: 46px;
      display: flex;
      justify-content: center;
      align-items: center;
      // color: #EEEEEE;
      li{
        font-size: 12px;
        padding: 0 60px;
        line-height: 16px;
        border-right: 1px solid #cccccc;
        &:nth-last-child(1){
          border: 0;
        }
        a{
          color: #cccccc;
        }
      }
    }
  }
  .tabMain{
    padding-bottom: 120px;
    width: 1200px;
    margin: auto;
    padding-top: 40px;
    .block{
      width: 100%;
      height: 41px;
    }
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
          color: #FC9217;
        }
        .star-off{
          color: #cccccc;
        }
        .green{
          color: #3ABC56;
        }
        .red{
          color: #F73946;
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
      @keyframes top
      {
      from {top:-60px;}
      to {top:0;}
      }
      .tabClass .el-tabs__header{
        position: fixed;
        top: 0;
        left: 0;
        padding: 0 10px;
        animation:top 0.5s ease;
        z-index: 10;
        background: #fff;
        width: 100%;
        height: 60px;
        line-height: 60px;
        box-shadow: 0 2px 4px 0 #999999;
        .el-tabs__nav-wrap{
          width: 1200px;
          margin: auto;
        }
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

