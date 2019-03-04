<template>
  <div class="historyBox">
    <p class="title">
      {{$t('route.tradeHistory')}}
    </p>
    <div class="searchBox">
      <div class="searchItem">
        <span class="searchLabel">{{$t('tradingCenter.date')}}：</span>
        <el-date-picker
          v-model="time"
          size="mini"
          type="datetimerange"
          value-format="yyyy-MM-dd"
          :range-separator="$t('mandatory.to')"
          :start-placeholder="$t('mandatory.startTime')"
          :end-placeholder="$t('mandatory.endTime')">
        </el-date-picker>
      </div>
      <div class="searchItem">
        <span class="searchLabel">{{$t('funds.pair')}}：</span>
        <el-select size="mini" v-model="trade" :placeholder="$t('button.select')">
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
        <el-select size="mini" filterable v-model="currency" :placeholder="$t('button.select')">
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
        <el-select size="mini" v-model="direction" :placeholder="$t('button.select')">
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
      <div class="searchItem export">
        <a href="javascript:;">{{$t('funds.exportCT')}}<i class="iconfont icon-excel"></i></a>
      </div>
    </div>

    <div class="orderBox">
      <el-table
        :data="openOrder"
        style="width: 100%">

        <el-table-column
          class-name="firstCol"
          :label="$t('tradingCenter.date')"
          width="180"
          prop="created_at">
        </el-table-column>
        <el-table-column
          :label="$t('home.pair')"
          prop="symbol">
        </el-table-column>
        <el-table-column
          :label="$t('tradingCenter.side')">
            <template slot-scope="scope">
                <span :class="scope.row.side=='SELL'?'red':'green'">{{scope.row.side=='SELL'?$t('tradingCenter.sell'):$t('tradingCenter.buy')}}</span>
            </template>
        </el-table-column>
        <el-table-column
          :label="$t('tradingCenter.price')"
          prop="price">
        </el-table-column>
        <el-table-column
          :label="$t('funds.filled')"
          prop="number">
        </el-table-column>
        <el-table-column
          :label="$t('tradingCenter.fee')"
          prop="fee">
        </el-table-column>
        <el-table-column
          :label="$t('tradingCenter.sum')"
          prop="sum">
            <template slot-scope="scope">
                <span>{{[scope.row.price,scope.row.number,8] | mul}}</span>
            </template>
        </el-table-column>
      </el-table>
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
        directionList: [{
          value: 'BUY',
          label: '买入'
        },{
          value: 'SELL',
          label: '卖出'
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
      getRecord(url,postData) {
        var _this = this;
        if(postData){
          postData.status = 1;
        }
        axios.get(url,postData?postData:{status:1}).then(function(res){
            console.log(res);
            _this.openOrder = res.data;
            _this.openOrder.map(function(item){
              item.show = false;
              item.condition = '—— ——';
              item.type = "限价";
              item.probability = (item.deal_number/item.number).toFixed(5);
            });
            _this.pagination = res.meta.pagination;
            _this.pagination.oldTotal = _this.pagination.total;
        }).catch(function (res){
            console.log(res);
        });
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
          this.getRecord('/api/orders/trades',postData)
      },
      pageChange(page) {
            this.getRecord(`/api/orders/trades?page=${page}`,this.postData);
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
        this.searchClick();
      }
    },
    computed: {
      ...mapGetters([
          'marketList',
          'coinList',
      ]),
    },
    created (){
      this.getRecord('/api/orders/trades');
      this.getMarketList(this.marketList);
      this.getCoinList(this.coinList);
    }
}
</script>

<style lang="scss">
// @import "../../styles/mandatory.scss";
</style>
