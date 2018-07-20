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

  <el-row class="message">
    <el-col :span="24">
      <ul class="messageList">
        <li v-for="(item,idx) in noticeList" :key="idx"><a target="_blank" :href="item.html_url">{{item.title}}</a></li>
      </ul>
    </el-col>
  </el-row>

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
                <span class="newPriceL">{{scope.row.close}}</span><span class="newPriceR">&nbsp;/&nbsp;&yen;&nbsp;0.67</span>
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

        <!--<el-tab-pane name="CCC">-->
          <!--<span slot="label">CCC {{$t('home.markets')}}</span>-->
          <!--<el-row class="tabContent">-->
            <!--<el-table-->
            <!--:data="CCCitems"-->
            <!--stripe-->
            <!--ref="CCCTable"-->
            <!--@row-click="linkToGoods"-->
            <!--style="width: 100%">-->
            <!--<span slot="empty">{{$t('home.noData')}}</span>-->
            <!--<el-table-column-->
              <!--align="center"-->
              <!--width="80">-->
              <!--<template slot-scope="scope">-->
                <!--<i @click.stop="changeStar(scope.row.symbol,scope.row.star)" class="el-icon-star-on" :class="scope.row.star == false?'star-off':'star-on'"></i>-->
              <!--</template>-->
            <!--</el-table-column>-->
            <!--<el-table-column-->
              <!--prop="symbol"-->
              <!--sortable-->
              <!--:label="$t('home.pair')"-->
              <!--width="180">-->
            <!--</el-table-column>-->
            <!--<el-table-column-->
              <!--:label="$t('home.lastPrice')"-->
              <!--width="188">-->
              <!--<template slot-scope="scope">-->
                <!--<span class="newPriceL">{{scope.row.close}}</span><span class="newPriceR">&nbsp;/&nbsp;&yen;&nbsp;0.67</span>-->
              <!--</template>-->
            <!--</el-table-column>-->
            <!--<el-table-column-->
              <!--align="right"-->
              <!--sortable-->
              <!--width="188"-->
              <!--:label="'24h'+$t('home.change')">-->
              <!--<template slot-scope="scope">-->
                <!--<span :class="scope.row.change>=0?'green':'red'">{{toPercent(scope.row.change,2)}}</span>-->
              <!--</template>-->
            <!--</el-table-column>-->
            <!--<el-table-column-->
              <!--prop="high"-->
              <!--align="right"-->
              <!--sortable-->
              <!--width="188"-->
              <!--:label="'24h'+$t('home.high')">-->
            <!--</el-table-column>-->
            <!--<el-table-column-->
              <!--prop="low"-->
              <!--align="right"-->
              <!--sortable-->
              <!--width="188"-->
              <!--:label="'24h'+$t('home.low')">-->
            <!--</el-table-column>-->
            <!--<el-table-column-->
              <!--prop="number"-->
              <!--align="right"-->
              <!--sortable-->
              <!--width="186"-->
              <!--class-name="lastList"-->
              <!--:label="'24h'+$t('home.volume')">-->
            <!--</el-table-column>-->
          <!--</el-table>-->
          <!--</el-row>-->
        <!--</el-tab-pane>-->

        <!--<el-tab-pane name="ETH">-->
          <!--<span slot="label">ETH {{$t('home.markets')}}</span>-->
          <!--<el-row class="tabContent">-->
            <!--<el-table-->
            <!--:data="ETHitems"-->
            <!--stripe-->
            <!--ref="ETHTable"-->
            <!--@row-click="linkToGoods"-->
            <!--style="width: 1198px">-->
            <!--<span slot="empty">{{$t('home.noData')}}</span>-->
            <!--<el-table-column-->
              <!--align="center"-->
              <!--width="80">-->
              <!--<template slot-scope="scope">-->
                <!--<i @click.stop="changeStar(scope.row.symbol,scope.row.star)" class="el-icon-star-on" :class="scope.row.star == false?'star-off':'star-on'"></i>-->
              <!--</template>-->
            <!--</el-table-column>-->
            <!--<el-table-column-->
              <!--prop="symbol"-->
              <!--sortable-->
              <!--:label="$t('home.pair')"-->
              <!--width="180">-->
            <!--</el-table-column>-->
            <!--<el-table-column-->
              <!--:label="$t('home.lastPrice')"-->
              <!--width="188">-->
              <!--<template slot-scope="scope">-->
                <!--<span class="newPriceL">{{scope.row.close}}</span><span class="newPriceR">&nbsp;/&nbsp;&yen;&nbsp;0.67</span>-->
              <!--</template>-->
            <!--</el-table-column>-->
            <!--<el-table-column-->
              <!--align="right"-->
              <!--sortable-->
              <!--width="188"-->
              <!--:label="'24h'+$t('home.change')">-->
              <!--<template slot-scope="scope">-->
                <!--<span :class="scope.row.change>=0?'green':'red'">{{toPercent(scope.row.change,2)}}</span>-->
              <!--</template>-->
            <!--</el-table-column>-->
            <!--<el-table-column-->
              <!--prop="high"-->
              <!--align="right"-->
              <!--sortable-->
              <!--width="188"-->
              <!--:label="'24h'+$t('home.high')">-->
            <!--</el-table-column>-->
            <!--<el-table-column-->
              <!--prop="low"-->
              <!--align="right"-->
              <!--sortable-->
              <!--width="188"-->
              <!--:label="'24h'+$t('home.low')">-->
            <!--</el-table-column>-->
            <!--<el-table-column-->
              <!--prop="number"-->
              <!--align="right"-->
              <!--sortable-->
              <!--width="186"-->
              <!--class-name="lastList"-->
              <!--:label="'24h'+$t('home.volume')">-->
            <!--</el-table-column>-->
          <!--</el-table>-->
          <!--</el-row>-->
        <!--</el-tab-pane>-->


        <el-tab-pane :name="allMarkets[index1][0].market_name" v-for="(item,index1) in allMarketShow" :key="index1">
          <span slot="label">{{allMarkets[index1][0].market_name}} {{$t('home.markets')}}</span>
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
                  <span class="newPriceL">{{scope.row.close}}</span><span class="newPriceR">&nbsp;/&nbsp;&yen;&nbsp;0.67</span>
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
import io from 'socket.io-client'
export default {
  data() {
      return {
        allMarkets:[],
        allMarketShow:[],
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
      };
    },
    methods: {
      handSearchDate(){
        var that = this;
        that.allMarketShow = JSON.parse(JSON.stringify(that.allMarkets));
        for(var i = 0; i<that.allMarkets.length; i++){
          that.allMarketShow[i] = [];
          if(that.allMarkets[i][0].market_name === that.activeName){
            that.allMarketShow[i] = that.allMarkets[i].filter(function(item){
              return item.symbol.toLowerCase().indexOf(that.search)>-1;
            })
          }
        }
      },
      searchItem(){
        var that = this;
        that.searchTimer = setTimeout(function(){
          clearTimeout(that.searchTimer);
          that.handSearchDate()
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
        this.$set(this.allMarketShow[index1], index, data)
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
      getNoticeList() {     //获取公告
        var _this = this;
        axios.get('https://support.bjex.io/api/v2/help_center/zh-cn/categories/360000431912/articles.json').then(function(res){
            var noticeList = res.articles.splice(0,2);
            _this.noticeList = noticeList;
        }).catch(function (res){
        });
      },
      getNewsList() {
        var _this = this;
        axios.get('/api/banners',{status:0}).then(function(res){
            _this.newList = res.data;
            _this.sliceArray(_this.newList,4);
        }).catch(function (res){
        });
      },
      initWebSocket(){
        this.websock = new WebSocket("wss://ws.pacex.io");
        this.websock.onmessage = this.websocketonmessage;
        this.websock.onclose = this.websocketclose;
        this.websock.onopen = this.websocketopen;
      },
      websocketonmessage(event){
        var that = this;
        if(event.data == 'success'){
          var myBlob = new Blob([JSON.stringify({type:'login',name:'home'})]);
          this.websock.send(myBlob);
          return;
        };
        if(event.type && event.type == "ping"){
          this.websock.send(JSON.stringify({type:'pong'}));
          return;
        }
        if (event.data instanceof Blob) {
          var newblob = event.data;
          that.reader.readAsText(newblob,'UTF-8');
          that.reader.onload = function (event) {
            if(that.reader.result.indexOf('code') == -1){
              return;
            }
            let res = JSON.parse(that.reader.result).data;
            that.allList = res;
            console.log(res)
            that.allMarkets = [[]];
            res.forEach(item => {
              if(that.localList.indexOf(item.symbol) == -1){
                item.star = false;
              }else{
                item.star = true;
              }
              item.number = Number(item.number).toFixed(8);
              for(let i = 0;i<that.allMarkets.length;i++){
                if(that.allMarkets[i].length === 0){
                  that.allMarkets[i].push(item);
                  if(that.activeName.length <= 1){
                    that.activeName = item.market_name;
                  }
                  that.$store.state.home['24volume'][item.market_name] = 0;
                  that.$store.state.home['24volume'][item.market_name] += item.total*1;
                  break;
                }else{
                  if(that.allMarkets[i][0].market_name ===  item.market_name){
                    that.allMarkets[i].push(item);
                    that.$store.state.home['24volume'][item.market_name] += item.total*1;
                    break;
                  }else{
                    that.allMarkets.push([item]);
                    that.$store.state.home['24volume'][item.market_name] = 0;
                    that.$store.state.home['24volume'][item.market_name] += item.total*1;
                    break;
                  }
                }
              }
            })
            that.$store.state.home['firstSymbol'] = that.allMarkets[0][0].symbol || 'CCC/CPT';
            that.handSearchDate();
          }
        }
      },
      websocketclose(e){
        this.websock.close();
      },
      websocketopen(){
      },
//      onReady() {
//        let that = this;
//        let c = 0;
//        var url = process.env.NODE_API;
//        // var url = 'http://192.168.22.208'
//        this.socket = io.connect(url)
//        this.socket.emit('home', {userId: 'shehui'})
//        this.socket.on('pairsData', function (data) {
//          let res = JSON.parse(JSON.parse(data).tradingList).data
//          c++
//          that.BTCList = [];
//          that.CCCList = [];
//          that.ETHList = [];
//          that.OMGList = [];
//          that.DOGEList = [];
//          that.WWWList = [];
//          that.RNGList = [];
//          that.allList = res;
//           that.collectList = [];
//          res.forEach(item => {
//            item.star = false;
//            item.number = item.number.toFixed(8);
//            if(item.market_name == "BTC"){
//              that.BTCList.push(item);
//            }else if(item.market_name == "ETH"){
//              that.ETHList.push(item);
//            }else if(item.market_name == "CCC"){
//              that.CCCList.push(item);
//            }else if(item.market_name == "OMG"){
//              that.OMGList.push(item);
//            }else if(item.market_name == "DOGE"){
//              that.DOGEList.push(item);
//            }else if(item.market_name == "WWW"){
//              that.WWWList.push(item);
//            }else if(item.market_name == "RNG"){
//              that.RNGList.push(item);
//            }
//             if(that.localList.indexOf(item.symbol)>-1){
//                 that.collectList.push(item);
//             }
//          })
//        })
//
//
//
//        // 调试部分
//        //
//        // let res = JSON.parse(JSON.parse(data).tradingList).data;
//        // console.log(res)
//        // c++;
//        // that.BTCList = [];
//        // that.CCCList = [];
//        // that.ETHList = [];
//        // that.OMGList = [];
//        // that.DOGEList = [];
//        // that.WWWList = [];
//        // that.RNGList = [];
//        // that.allList = res;
//        // //   that.collectList = [];
//        // res.forEach(item => {
//        //   console.log(item.total)
//        //   item.star = false;
//        //   item.number = item.number.toFixed(8);
//        //   if(item.market_name == "BTC"){
//        //     that.BTCList.push(item);
//        //     that.$store.state.home['24volumeBTC'] += item.total*1;
//        //   }else if(item.market_name == "ETH"){
//        //     that.ETHList.push(item);
//        //     that.$store.state.home['24volumeETH'] += item.total*1;
//        //   }else if(item.market_name == "CCC"){
//        //     that.CCCList.push(item);
//        //     that.$store.state.home['24volumeCCC'] += item.total*1;
//        //   }else if(item.market_name == "OMG"){
//        //     that.OMGList.push(item);
//        //     that.$store.state.home['24volumeOMG'] += item.total*1;
//        //   }else if(item.market_name == "DOGE"){
//        //     that.DOGEList.push(item);
//        //     that.$store.state.home['24volumeDOGE'] += item.total*1;
//        //   }else if(item.market_name == "WWW"){
//        //     that.WWWList.push(item);
//        //     that.$store.state.home['24volumeWWW'] += item.total*1;
//        //   }else if(item.market_name == "RNG"){
//        //     that.RNGList.push(item);
//        //     that.$store.state.home['24volumeRNG'] += item.total*1;
//        //   }
//        //
//        //   // if(that.localList.indexOf(item.symbol)>-1){
//        //   //     that.collectList.push(item);
//        //   // }
//        // })
//        // 调试部分
//      },
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
//      CCCitems: function() {
//        var _search = this.search.toLocaleLowerCase();
//        var starList = this.localList;
//        var _this = this;
//        this.CCCList.map((it,idx) => {
//          it.change = _this.div(_this.sub(it.close,it.open,8),it.open,8);
//          if(_this.localList.indexOf(it.symbol) != -1){
//            _this.$set(_this.$data.CCCList[idx], 'star', true);
//          }else{
//            _this.$set(_this.$data.CCCList[idx], 'star', false);
//          }
//        })
//        if (_search) {
//          return this.CCCList.filter(function(product) {
//            return Object.keys(product).some(function(key) {
//              return String(product.symbol).toLowerCase().indexOf(_search) > -1
//            })
//          })
//        }
//        return this.CCCList;
//      },
//      BTCitems: function() {
//        var _search = this.search.toLocaleLowerCase();
//        var starList = this.localList;
//        var _this = this;
//        this.BTCList.map((it,idx) => {
//          it.change = _this.div(_this.sub(it.close,it.open,8),it.open,8);
//          if(_this.localList.indexOf(it.symbol) != -1){
//            _this.$set(_this.$data.BTCList[idx], 'star', true);
//          }else{
//            _this.$set(_this.$data.BTCList[idx], 'star', false);
//          }
//        })
//        if (_search) {
//          return this.BTCList.filter(function(product) {
//            return Object.keys(product).some(function(key) {
//              return String(product.symbol).toLowerCase().indexOf(_search) > -1
//            })
//          })
//        }
//        return this.BTCList;
//      },
//      ETHitems: function() {
//        var _search = this.search.toLocaleLowerCase();
//        var _this = this;
//        this.ETHList.map(it => {
//          it.change = _this.div(_this.sub(it.close,it.open,8),it.open,8);
//          if(_this.localList.indexOf(it.symbol) != -1){
//            it.star = true;
//          }else{
//            it.star = false
//          }
//        })
//        if (_search) {
//          return this.ETHList.filter(function(product) {
//            return Object.keys(product).some(function(key) {
//              return String(product.symbol).toLowerCase().indexOf(_search) > -1
//            })
//          })
//        }
//        return this.ETHList;
//      },
//      OMGitems: function() {
//        var _search = this.search.toLocaleLowerCase();
//        var _this = this;
//        this.OMGList.map(it => {
//          it.change = _this.div(_this.sub(it.close,it.open,8),it.open,8);
//          if(_this.localList.indexOf(it.symbol) != -1){
//            it.star = true;
//          }else{
//            it.star = false
//          }
//        })
//        if (_search) {
//          return this.OMGList.filter(function(product) {
//            return Object.keys(product).some(function(key) {
//              return String(product.symbol).toLowerCase().indexOf(_search) > -1
//            })
//          })
//        }
//        return this.OMGList;
//      },
//      DOGEitems: function() {
//        var _search = this.search.toLocaleLowerCase();
//        var _this = this;
//        this.DOGEList.map(it => {
//          it.change = _this.div(_this.sub(it.close,it.open,8),it.open,8);
//          if(_this.localList.indexOf(it.symbol) != -1){
//            it.star = true;
//          }else{
//            it.star = false
//          }
//        })
//        if (_search) {
//          return this.DOGEList.filter(function(product) {
//            return Object.keys(product).some(function(key) {
//              return String(product.symbol).toLowerCase().indexOf(_search) > -1
//            })
//          })
//        }
//        return this.DOGEList;
//      },
//      WWWitems: function() {
//        var _search = this.search.toLocaleLowerCase();
//        var _this = this;
//        this.WWWList.map(it => {
//          it.change = _this.div(_this.sub(it.close,it.open,8),it.open,8);
//          if(_this.localList.indexOf(it.symbol) != -1){
//            it.star = true;
//          }else{
//            it.star = false
//          }
//        })
//        if (_search) {
//          return this.WWWList.filter(function(product) {
//            return Object.keys(product).some(function(key) {
//              return String(product.symbol).toLowerCase().indexOf(_search) > -1
//            })
//          })
//        }
//        return this.WWWList;
//      },
//      RNGitems: function() {
//        var _search = this.search.toLocaleLowerCase();
//        var _this = this;
//        this.RNGList.map(it => {
//          it.change = _this.div(_this.sub(it.close,it.open,8),it.open,8);
//          if(_this.localList.indexOf(it.symbol) != -1){
//            it.star = true;
//          }else{
//            it.star = false
//          }
//        })
//        if (_search) {
//          return this.RNGList.filter(function(product) {
//            return Object.keys(product).some(function(key) {
//              return String(product.symbol).toLowerCase().indexOf(_search) > -1
//            })
//          })
//        }
//        return this.RNGList;
//      },
      collectitems: function() {
        var _search = this.search.toLocaleLowerCase();
        var _this = this;
        var collectList = [];
        this.allList.map(it => {
          it.change = _this.div(_this.sub(it.close,it.open,8),it.open,8);
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
      this.getNoticeList();//notice
    },
    beforeMount () {
      window.addEventListener('scroll', this.handleScroll);
//      this.onReady();
      this.initWebSocket()
    },
    destroyed () {
      window.removeEventListener('scroll', this.handleScroll)
    },
    beforeRouteLeave(to,from,next){
      this.websocketclose();
      next();
    },
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

