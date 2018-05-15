<template>
  <div class="historyBox">
    <p class="title">
      {{$t('route.orderHistory')}}
    </p>
    <div class="searchBox">
      <div class="searchItem">
        <span class="searchLabel">{{$t('tradingCenter.date')}}：</span>
        <el-date-picker
          v-model="time"
          size="mini"
          type="daterange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期">
        </el-date-picker>
      </div>
      <div class="searchItem">
        <span class="searchLabel">{{$t('funds.pair')}}：</span>
        <el-select size="mini" @change="marketChange" v-model="trade" placeholder="请选择">
          <el-option
            v-for="(item,idx) in tradeList"
            :key="idx"
            :label="item.market.name"
            :value="item.market.id">
          </el-option>
        </el-select>
      </div>
      <div class="searchItem">
        <span class="searchLabel">{{$t('tradingCenter.coin')}}：</span>
        <el-select size="mini" v-model="currency" placeholder="请选择">
          <el-option
            v-for="(item,idx) in currencyList"
            :key="idx"
            :label="item.coin_name"
            :value="item.coin_id">
          </el-option>
        </el-select>
      </div>
      <div class="searchItem">
        <span class="searchLabel">{{$t('tradingCenter.side')}}：</span>
        <el-select size="mini" v-model="direction" placeholder="请选择">
          <el-option
            v-for="item in directionList"
            :key="item.value"
            :label="item.name"
            :value="item.value">
          </el-option>
        </el-select>
      </div>
      <div class="searchItem">
        <el-button type="primary" size="mini">{{$t('button.search')}}</el-button>
        <el-button size="mini" @click="reset()">{{$t('button.reset')}}</el-button>
      </div>
      <div class="searchItem">
        <el-checkbox size="mini" v-model="conceal">{{$t('funds.hideallcanceled')}}</el-checkbox>
      </div>
      <div class="searchItem export">
        <a href="javascript:;">{{$t('funds.exportC')}}<i class="iconfont icon-excel"></i></a>
      </div>
    </div>

    <div class="orderBox">
      <!-- <el-table
        :data="openOrder"
        style="width: 100%">
        
        <el-table-column
          class-name="firstCol"
          :label="$t('tradingCenter.date')"
          width="180"
          prop="time">
        </el-table-column>
        <el-table-column
          :label="$t('home.pair')"
          width="60"
          prop="goods">
        </el-table-column>
        <el-table-column
          :label="$t('tradingCenter.type')"
          width="60"
          prop="type">
        </el-table-column>
        <el-table-column
          :label="$t('tradingCenter.side')"
          width="80">
          <template slot-scope="scope">
            <span :class="scope.row.direction=='卖出'?'red':'green'">{{ scope.row.direction }}</span>
          </template>
        </el-table-column>
        <el-table-column
          :label="$t('tradingCenter.price')"
          width="160"
          prop="prices">
        </el-table-column>
        <el-table-column
          :label="$t('tradingCenter.amount')"
          width="160"
          prop="num">
        </el-table-column>
        <el-table-column
          :label="$t('tradingCenter.filled')+'%'"
          width="120"
          prop="probability">
        </el-table-column>
        <el-table-column
          :label="$t('tradingCenter.sum')"
          prop="sum">
        </el-table-column>
        <el-table-column
          :label="$t('tradingCenter.trigger')"
          prop="condition">
        </el-table-column>
        <el-table-column label="查看详情" width="100" type="expand">
          <template slot-scope="props">
            <div class="detail">
              <p class="title">成交总额<span class="sum">{{ props.row.transaction}}</span></p>
              <el-table
              class="detailTable"
              :data="props.row.historyList"
              style="width: 100%">
              <el-table-column
                class-name="firstCol"
                prop="time"
                label="成交时间">
              </el-table-column>
              <el-table-column
                prop="prices"
                label="成交价格">
              </el-table-column>
              <el-table-column
                prop="num"
                label="成交数量">
              </el-table-column>
              <el-table-column
                prop="commission"
                label="手续费">
              </el-table-column>
              <el-table-column
                prop="sum"
                label="成交金额">
              </el-table-column>
            </el-table>
            </div>
          </template>
        </el-table-column>
      </el-table> -->

      <table class="orderTable">
        <colgroup style="width:180px;"></colgroup>
        <colgroup style="width:60px;"></colgroup>
        <colgroup style="width:60px;"></colgroup>
        <colgroup style="width:80px;"></colgroup>
        <colgroup style="width:160px"></colgroup>
        <colgroup style="width:160px;"></colgroup>
        <colgroup style="width:120px"></colgroup>
        <colgroup style=""></colgroup>
        <colgroup style=""></colgroup>
        <colgroup style=""></colgroup>
        <tbody>
          <tr>
            <th class="firstCol">{{$t('tradingCenter.date')}}</th>
            <th>{{$t('home.pair')}}</th>
            <th>{{$t('tradingCenter.type')}}</th>
            <th>{{$t('tradingCenter.side')}}</th>
            <th>{{$t('tradingCenter.price')}}</th>
            <th>{{$t('tradingCenter.amount')}}</th>
            <th>{{$t('tradingCenter.filled')+'%'}}</th>
            <th>{{$t('tradingCenter.sum')}}</th>
            <th>{{$t('tradingCenter.trigger')}}</th>
            <th>操作</th>
          </tr>
          
          <template v-for="(item,idx) in openOrder">
            <tr :key="idx+'a'">
              <td class="firstCol">{{item.created_at}}</td>
              <td>{{item.coin_id}}</td>
              <td>{{item.type}}</td>
              <td :class="item.direction=='SELL'?'red':'green'">{{item.direction}}</td>
              <td>{{item.prices}}</td>
              <td>{{item.number}}</td>
              <td>{{item.probability}}</td>
              <td>{{item.total}}</td>
              <td>{{item.condition}}</td>
              <td><span @click="item.show = !item.show" class="baseColor">成交详情</span></td>
              
            </tr>
            <tr v-show="item.show" :key="idx+'b'">
              <td colspan="10">
                <div class="detail">
                  <p class="title">成交总额<span class="sum">{{transaction}}</span></p>
                <el-table
                  class="detailTable"
                  :data="historyList"
                  style="width: 100%">
                    <el-table-column
                      class-name="firstCol"
                      prop="time"
                      label="成交时间">
                    </el-table-column>
                    <el-table-column
                      prop="prices"
                      label="成交价格">
                    </el-table-column>
                    <el-table-column
                      prop="num"
                      label="成交数量">
                    </el-table-column>
                    <el-table-column
                      prop="commission"
                      label="手续费">
                    </el-table-column>
                    <el-table-column
                      prop="sum"
                      label="成交金额">
                    </el-table-column>
                  </el-table>
                </div>
                
              </td>
            </tr>
          </template>
          <tr v-if="openOrder.length ==0">
            <td colspan="10"><div class="nodate"><span class="empty-text">暂无数据</span></div></td>
          </tr>
          
          
        </tbody>

      </table>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import axios from '../../api/axios'
export default {
  data() {
      return {
        time: '',
        trade: '',
        tradeList: [],
        currency: '',
        currencyList: [],
        direction: '',
        directionList:[{
          label: "买入",
          value: "BUY",
        },
        {
          label: "卖出",
          value: "SELL",
        }],
        conceal: false,
        transaction: '0.28738938 BTC',
          historyList: [{
            time: '2018-04-11 13:05:17',
            prices: '0.00003287',
            num: '1.29387478',
            commission: '34.239 BTC',
            sum: '445.161 BTC'
          },{
            time: '2018-04-11 13:05:17',
            prices: '0.00003287',
            num: '1.29387478',
            commission: '34.239 BTC',
            sum: '445.161 BTC'
          }],
        openOrder: [{
          created_at: '2018-04-11 18:08:11',
          coin_id: 'BTC',
          type: '限价',
          side: '卖出',
          price: '0.00000051',
          number: '3,374.74628467',
          deal_number: '0.00029%',
          total: '3,454.72846',
          condition: '—— ——',
          status: "",
          show: false
        }]

      };
    },
    methods: {
      getEntrusted(postData){
        var _this = this;
        axios.get('/api/orders',postData?postData:{}).then(function(res){  
            console.log(res);
            _this.openOrder = res.data;
            _this.openOrder.map(function(item){
              item.show = false;
              item.condition = '—— ——';
              item.type = "限价";
              item.probability = item.deal_number/item.number.toFixed(5);
            });
            // _this.googleQR = res.data.googleAuthenticatorSecret;
            // _this.googleForm.googleAuthenticatorSecret = res.data.googleAuthenticatorSecret;
        }).catch(function (res){  
            console.log(res);
        }); 
      },
      // getTrades() {
      //   var _this = this;
      //   axios.get('/api/market/pairs').then(function(res){  
      //       console.log(res);
      //       _this.tradeList = res.data;
            
      //   }).catch(function (res){  
      //       console.log(res);
      //   }); 
      // },
      getMarketList(marketList) {
        this.tradeList = marketList;
      },
      getCoinList(coinList) {
        this.currency = "";
        this.currencyList = coinList;
      },
      marketChange(value) {
        console.log(value)
        this.marketList.forEach(item => {
          if(item.market.id == value){
            this.getCoinList(item.pairs);
          }
        });
      },
      reset() {
        this.time = "";
        this.trade = "";
        this.currency = "";
        this.direction = "";
        this.getCoinList(this.coinList);
      }
    },
    computed: {
      ...mapGetters([
          'marketList',
          'coinList',
      ])
    },
    created (){
      this.getEntrusted();
      console.log(this.marketList)
      this.getMarketList(this.marketList);
      this.getCoinList(this.coinList);
    }
}
</script>

<style lang="scss">
// @import "../../styles/mandatory.scss";
</style>


