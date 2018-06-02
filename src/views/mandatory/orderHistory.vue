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
          type="datetimerange"
          value-format="yyyy-MM-dd HH:mm:ss"
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
        <el-select size="mini" filterable v-model="currency" placeholder="请选择">
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
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </div>
      <div class="searchItem">
        <el-button type="primary" size="mini" @click="searchClick()">{{$t('button.search')}}</el-button>
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
          
          <template v-for="(item,idx) in orderItems">
            <tr :key="idx+'a'">
              <td class="firstCol">{{item.created_at}}</td>
              <td>{{item.symbol}}</td>
              <td>{{item.type}}</td>
              <td><span :class="item.side=='SELL'?'red':'green'">{{item.side=='SELL'?'卖出':'买入'}}</span></td>
              <td>{{item.price}}</td>
              <td>{{item.number}}</td>
              <td>{{[item.probability,2] | toPercent}}</td>
              <td>{{item.total}}</td>
              <td>{{item.condition}}</td>
              <td><span @click="item.show = !item.show;getDetail(item.id,item.show)" class="baseColor">成交详情</span></td>
              
            </tr>
            <tr v-show="item.show" :key="idx+'b'">
              <td colspan="10">
                <div class="detail">
                  <p class="title">成交总额<span class="sum">{{item.detailAll + " BTC"}}</span></p>
                <el-table
                  class="detailTable"
                  :data="item.detail"
                  style="width: 100%">
                    <el-table-column
                      class-name="firstCol"
                      prop="created_at"
                      label="成交时间">
                    </el-table-column>
                    <el-table-column
                      prop="price"
                      label="成交价格">
                    </el-table-column>
                    <el-table-column
                      prop="number"
                      label="成交数量">
                    </el-table-column>
                    <el-table-column
                      prop="fee"
                      label="手续费">
                    </el-table-column>
                    <el-table-column
                      label="成交金额">
                       <template slot-scope="scope">
                           <span>{{[scope.row.price,scope.row.number,8] | mul}}</span>
                       </template>
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
      <el-pagination
        layout="prev, pager, next"
        @current-change="pageChange"
        @next-click="pageChange"
        @prev-click="pageChange"
        v-show="pagination.total"
        :page-size="pagination.per_page*1"
        :total="pagination.total">
      </el-pagination>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { add, mul, toFixed } from '../../utils/common.js'
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
        openOrder: [],
        pagination: {
            oldTotal: 0,
            total: 0,
            links: [],
            count: '',
            current_page: 1,
            per_page: '',
            total_pages: ''
        },
        postData: {}
      };
    },
    methods: {
      getEntrusted(url,postData){
        var _this = this;
        console.log(postData)
        axios.get(url,postData?postData:{}).then(function(res){  
            console.log(res);
            res.data.map(function(item){
              item.show = false;
              item.condition = '—— ——';
              item.type = "限价";
              item.probability = (item.deal_number/item.number).toFixed(2);
              item.detail = [{
                  "created_at": "",
                  "price": "",
                  "number": "",
                  "fee": ""
              }]
              item.detailAll = ""
            });
            _this.openOrder = res.data;
            _this.pagination = res.meta.pagination;
            _this.pagination.oldTotal = _this.pagination.total;
            // _this.googleQR = res.data.googleAuthenticatorSecret;
            // _this.googleForm.googleAuthenticatorSecret = res.data.googleAuthenticatorSecret;
        }).catch(function (res){  
            console.log(res);
        }); 
      },
      pageChange(page) {
            this.getEntrusted(`/api/orders?page=${page}`,this.postData);
      },
      getDetail(id,show) {
          if(show){
                var _this = this;
                axios.get(`/api/orders/detail/${id}`).then(function(res){  
                    // console.log(res);
                    var sum = toFixed(0,8);
                    res.data.map(it => {
                        sum = add(sum,mul(it.price,it.number,8),8)
                    })

                    _this.openOrder.map(it => {
                        if(it.id == id){
                            it.detail = res.data;
                            it.detailAll = sum;
                        }
                    })
                    // res.data.map(item => {
                    //     item.show = false;
                    //     item.bargain = _this.div(item.deal_number,item.number,4);
                    // })
                    // _this.openOrder = res.data;
                    // _this.pagination = res.meta.pagination;
                }).catch(function (res){  
                    console.log(res);
                });
            }
        },
      searchClick() {
          var postData = {};
          if(this.time.length>0){
              postData.from = this.time[0];
              postData.to = this.time[1];
          }
          postData.market = this.trade;
          postData.coin = this.currency;
          postData.side = this.direction;
          this.postData = postData;
          this.getEntrusted('/api/orders',postData)
      },
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
      ]),
      orderItems: function() {
          var showFlag = this.conceal;
          if(showFlag){
            return this.openOrder.filter(function(product) {
                return product.status != 2;
            })
          }
          return this.openOrder;
      }
    },
    watch: {
        conceal: function(val) {
            if(val){
                this.pagination.total = this.orderItems.length;
            }else{
                this.pagination.total = this.pagination.oldTotal;
            }
            
        }
    },
    created (){
      this.getEntrusted('/api/orders');
      console.log(this.marketList)
      this.getMarketList(this.marketList);
      this.getCoinList(this.coinList);
    }
}
</script>

<style lang="scss">
// @import "../../styles/mandatory.scss";
</style>


