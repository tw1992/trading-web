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
              <a :href="item.link" :title="item.title" target="_blank">
                <img :src="item.picture">
                <div class="time" v-if="item.type">
                  距活动结束<span>2天17小时26分12秒</span>
                </div>
              </a>
            </div>

          </swiper-slide>
          <div class="swiper-pagination" slot="pagination"></div>
        </swiper>
      </el-col>
    </el-row>

    <!--<el-row class="message">-->
    <!--<el-col :span="24">-->
    <!--<ul class="messageList">-->
    <!--<li v-for="(item,idx) in noticeList" :key="idx"><a target="_blank" :href="item.html_url">{{item.title}}</a></li>-->
    <!--</ul>-->
    <!--</el-col>-->
    <!--</el-row>-->

    <el-row class="tabMain">
      <el-col class="tabBox" :span="24" ref="tabs">
        <div class="block" v-show="!hasBorder"></div>
        <el-tabs :type="hasBorder?'card':''" :class="{'tabClass':!hasBorder}" v-model="activeName" @tab-click="handleClick">
          <el-tab-pane name="star">
            <span slot="label"><i class="el-icon-star-on"></i> {{$t('home.favorites')}}</span>
            <el-row class="tabContent">
              <el-table
                :data="collectitems"
                stripe
                ref="starTable"
                @row-click="linkToGoods"
                style="width: 100%">
                <span slot="empty">{{$t('home.noData')}}</span>
                <el-table-column
                  align="center"
                  width="80">
                  <template slot-scope="scope">
                    <i @click.stop="changeStar(scope.row.symbol,scope.row.star)" class="el-icon-star-on" :class="scope.row.star == false?'star-off':'star-on'"></i>
                  </template>
                </el-table-column>
                <el-table-column
                  prop="symbol"
                  sortable
                  :label="$t('home.pair')"
                  width="180">
                </el-table-column>
                <el-table-column
                  :label="$t('home.lastPrice')"
                  width="188">
                  <template slot-scope="scope">
                    <span class="newPriceL">{{scope.row.close}}</span><span class="newPriceR">&nbsp;/&nbsp;&yen;&nbsp;{{scope.row.close | cny(scope.row.cny)}}</span>
                  </template>
                </el-table-column>
                <el-table-column
                  align="right"
                  sortable
                  width="188"
                  :label="'24h'+$t('home.change')">
                  <template slot-scope="scope">
                    <span :class="scope.row.change>=0?'green':'red'">{{toPercent(scope.row.change,2)}}</span>
                  </template>
                </el-table-column>
                <el-table-column
                  prop="high"
                  align="right"
                  sortable
                  width="188"
                  :label="'24h'+$t('home.high')">
                </el-table-column>
                <el-table-column
                  prop="low"
                  align="right"
                  sortable
                  width="188"
                  :label="'24h'+$t('home.low')">
                </el-table-column>
                <el-table-column
                  prop="number"
                  align="right"
                  sortable
                  width="186"
                  class-name="lastList"
                  :label="'24h'+$t('home.volume')">
                </el-table-column>
              </el-table>
            </el-row>
          </el-tab-pane>
          <el-tab-pane :name="index1" v-for="(item,index1) in allMarketShow" :key="index1">
            <span slot="label">{{index1}} {{$t('home.markets')}}</span>
            <!--<span slot="label">{{allMarkets[index1][0].market_name}} {{$t('home.markets')}}</span>-->
            <el-row class="tabContent">
              <el-table
                :data="item"
                stripe
                @row-click="linkToGoods"
                style="width: 100%">
                <span slot="empty">{{$t('home.noData')}}</span>
                <el-table-column
                  align="center"
                  width="80">
                  <template slot-scope="scope">
                    <i @click.stop="changeStar(scope.row,scope.$index,index1,item)" class="el-icon-star-on" :class="scope.row.star == false?'star-off':'star-on'"></i>
                  </template>
                </el-table-column>
                <el-table-column
                  prop="symbol"
                  sortable
                  :label="$t('home.pair')"
                  width="180">
                </el-table-column>
                <el-table-column
                  :label="$t('home.lastPrice')"
                  width="188">
                  <template slot-scope="scope">
                    <span class="newPriceL">{{scope.row.close*1}}</span><span class="newPriceR">&nbsp;/&nbsp;&yen;&nbsp;{{scope.row.close | cny(scope.row.cny)}}</span>
                  </template>
                </el-table-column>
                <el-table-column
                  align="left"
                  sortable
                  width="188"
                  :label="'24h'+$t('home.change')">
                  <template slot-scope="scope">
                    <span :class="scope.row.change[0]=='+'?'green':'red'">{{scope.row.change}}</span>
                  </template>
                </el-table-column>
                <el-table-column
                  align="left"
                  sortable
                  width="188"
                  :label="'24h'+$t('home.high')">
                  <template slot-scope="scope">
                    <span>{{scope.row.high*1 || '0'}}</span>
                  </template>
                </el-table-column>
                <el-table-column
                  align="left"
                  sortable
                  width="188"
                  :label="'24h'+$t('home.low')">
                  <template slot-scope="scope">
                    <span>{{scope.row.low*1 || '0'}}</span>
                  </template>
                </el-table-column>
                <el-table-column
                  align="left"
                  sortable
                  width="186"
                  class-name="lastList"
                  :label="'24h'+$t('home.volume')">
                  <template slot-scope="scope">
                    <span>{{scope.row.number*1 || '0'}}</span>
                  </template>
                </el-table-column>
              </el-table>
            </el-row>
          </el-tab-pane>
          <el-tab-pane name="search" :disabled="true">
          <span slot="label">
            <el-input
              class="search"
              placeholder=""
              prefix-icon="el-icon-search"
              v-model="search"
              @input="searchItem"
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
  import calc from 'calculatorjs'
  import 'swiper/dist/css/swiper.css';
  import axios from '../../api/axios';
  import { toFixed, add, sub, mul, div } from '../../filter/filters.js'
  import { swiper, swiperSlide } from 'vue-awesome-swiper';
  import { mapGetters } from 'vuex'
  export default {
    data() {
      return {
        allMarkets:[],
        allMarketShow:{},
        websock:null,
        isTop: true,
        activeName:'',
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
        search: '',
        newList:[],
        List: [],
        localList: [],
        collectList: [],
        CCCList: [],
        BTCList: [],
        ETHList: [],
        OMGList: [],
        DOGEList: [],
        WWWList: [],
        RNGList: [],
        allList: [],
        noticeList: [],
        index: 0,
        socket:null,
        reader:new FileReader(),
        searchTimer:null,
        allSource:'',
      };
    },
    methods: {
      handSearchDate(){
        var that = this;
        that.allMarketShow = JSON.parse(JSON.stringify(that.allSource));
        for(var i in that.allSource){
          that.allMarketShow[i] = [];
          if(that.allSource[i].length>0 && (that.allSource[i][0].market_name === that.activeName)){
            that.allMarketShow[i] = that.allSource[i].filter(function(item){
              return item.symbol.toLowerCase().indexOf(that.search)>-1;
            })
          }
        }
      },
      searchItem(){
        var that = this;
        that.searchTimer = setTimeout(function(){
          clearTimeout(that.searchTimer);
          that.handSearchDate();
        },100)
      },
      handleClick(tab, event) {
        this.search = '';
        if(tab.name != 'star'){
          this.activeName = tab.name;
          this.handSearchDate()
        }
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
      linkToGoods(row){
        this.$router.push('/tradingCenter/'+row.symbol)
      },
      changeStar(item,index,index1,dataSource){
        if(item.star){
          var idx = this.localList.indexOf(item.symbol);
          this.localList.splice(idx, 1);
        }else{
          this.localList.push(item.symbol);
        }
        var data = dataSource[0];
        data.star = !data.star;
        this.$set(this.allSource[index1], index, data)
      },
      handleScroll(){
        var scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
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
//      getNoticeList() {     //获取公告
//        var _this = this;
//        axios.get('https://support.bjex.io/api/v2/help_center/zh-cn/categories/360000431912/articles.json').then(function(res){
//            var noticeList = res.articles.splice(0,2);
//            _this.noticeList = noticeList;
//        }).catch(function (res){
//        });
//      },
      getNewsList() {
        var _this = this;
        axios.get('/api/banners',{}).then(function(res){
          _this.newList = res.data;
          _this.sliceArray(_this.newList,4);
        }).catch(function (res){
        });
      },
      initWebSocket(){
        var socketUrl = process.env.SOCKET;
        this.websock = new WebSocket(socketUrl)
//        this.websock = new WebSocket("ws://ws.ioup.io");
        this.websock.onmessage = this.websocketonmessage;
        this.websock.onclose = this.websocketclose;
        this.websock.onopen = this.websocketopen;
      },
      websocketonmessage(event){
        var that = this;
        if(event.type && event.type == "ping"){
          this.websock.send(JSON.stringify({type:'pong'}));
          return;
        }

        if (event.data instanceof Blob) {
          var newblob = event.data;
          that.reader.readAsText(newblob,'UTF-8');
          that.reader.onload = function (event) {
            if(that.reader.result == 'success'){
              var myBlob = new Blob([JSON.stringify({type:'login',name:'home'})]);
              that.websock.send(myBlob);
              return;
            };
            let res = JSON.parse(that.reader.result);
            that.allList = [];
//            that.allMarkets = [];
            that.allSource = '';
            for(var i in res){
              that.$store.state.home['24volume'][i] = 0;
              that.activeName = that.activeName<1?i:that.activeName;
              for(var j=0;j<res[i].length;j++){
                that.$store.state.home['firstSymbol'] = res[i][0].symbol;
                if(that.localList.indexOf(res[i][j].symbol) == -1){
                  res[i][j].star = false;
                }else{
                  res[i][j].star = true;
                }
                res[i][j].number = Number(res[i][j].number).toFixed(8);
                that.$store.state.home['24volume'][res[i][j].market_name] += res[i][j].total*1;
              }
//              that.allMarkets.push(res[i]);
              that.allList = that.allList.concat(res[i]);
            }
            that.allSource = res;
            that.handSearchDate();
          }
        }
      },
      websocketclose(e){
        this.websock.close();
      },
      websocketopen(){
      },
      sub(value1,value2,fixed) {
        return calc.sub(value1, value2).toFixed(fixed)
      },
      div(value1,value2,fixed) {
        if(value2 == 0){
          var val = 0;
          return val.toFixed(fixed)
        }
        return calc.div(value1, value2).toFixed(fixed)
      },
      toPercent(point,num){
        var str=Number(point*100).toFixed(num);
        str+="%";
        return str;
      },
    },
    components: {
      swiper,
      swiperSlide
    },
    watch: {
      localList: function() {
        localStorage.localList = JSON.stringify(this.localList);
      }
    },
    computed: {
      ...mapGetters([
        'marketList',
        'pairsList'
      ]),
      collectitems: function() {
        var _search = this.search.toLocaleLowerCase();
        var _this = this;
        var collectList = [];
        this.allList.map(it => {
          if(_this.localList.indexOf(it.symbol) != -1){
            it.star = true;
            collectList.push(it)
          }
        })
        if (_search) {
          return collectList.filter(function(product) {
            return Object.keys(product).some(function(key) {
              return String(product.symbol).toLowerCase().indexOf(_search) > -1
            })
          })
        }
        return collectList;
      },
    },
    created() {
      this.getNewsList();//banner
      if(localStorage.localList){
        this.localList = JSON.parse(localStorage.localList);
      }
    },
    beforeMount () {
      window.addEventListener('scroll', this.handleScroll);
      this.initWebSocket()
    },
    destroyed () {
      window.removeEventListener('scroll', this.handleScroll)
    },
    beforeRouteLeave(to,from,next){
      this.websocketclose();
      next();
    },
    filters:{
      cny:function(val1,val2){
        var val = calc.mul(val1,val2);
        var stringVal = String(val).split('.');
        if(stringVal[1] && stringVal.length>8){
          return stringVal[0] + '.' + stringVal[1];
        }else{
          return val;
        }

      }
    }
  }
</script>

<style lang="scss">
  .home{
    height: 100%;
    min-width: 1200px;
    color: #333333;
  .el-tabs__item{
    color:#303133;
  }
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
    /*background: #000000;*/
    display: flex;
    justify-content: center;
    /*background:url('../../assets/img/bannerBg.png');*/
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
  // justify-content: space-between;
    align-items: center;
  .newBox{
    position: relative;
    width: 226px;
    height: 180px;
    margin-right:90px;
  &:nth-last-child(1){
     margin-right:0;
   }
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
    background: #0071BA;
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
  #tab-search{
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
  // .el-table__header,.el-table__body,.el-table__empty-block{
     //   width: 1198px !important;
     // }
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
    color: #0071BA;
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

