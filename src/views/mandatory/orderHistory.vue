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
        <el-select size="mini" v-model="trade" placeholder="请选择">
          <el-option
            v-for="item in tradeList"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </div>
      <div class="searchItem">
        <span class="searchLabel">{{$t('tradingCenter.coin')}}：</span>
        <el-select size="mini" v-model="currency" placeholder="请选择">
          <el-option
            v-for="item in currencyList"
            :key="item.value"
            :label="item.label"
            :value="item.value">
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
        <el-button type="primary" size="mini">{{$t('button.search')}}</el-button>
        <el-button size="mini">{{$t('button.reset')}}</el-button>
      </div>
      <div class="searchItem">
        <el-checkbox size="mini" v-model="conceal">{{$t('funds.hideallcanceled')}}</el-checkbox>
      </div>
      <div class="searchItem export">
        <a href="javascript:;">{{$t('funds.exportC')}}<i class="iconfont icon-excel"></i></a>
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
      </el-table>
    </div>
  </div>
</template>

<script>
export default {
  data() {
      return {
        time: '',
        trade: '',
        tradeList: [{
          value: '选项1',
          label: '黄金糕'
        }, {
          value: '选项2',
          label: '双皮奶'
        }],
        currency: '',
        currencyList: [{
          value: '选项1',
          label: '黄金糕'
        }, {
          value: '选项2',
          label: '双皮奶'
        }],
        direction: '',
        directionList: [{
          value: '选项1',
          label: '买入'
        },{
          value: '选项2',
          label: '卖出'
        }],
        conceal: false,
        openOrder: [{
          time: '2018-04-11 18:08:11',
          goods: 'BTC',
          type: '限价',
          direction: '卖出',
          prices: '0.00000051',
          num: '3,374.74628467',
          probability: '0.00029%',
          sum: '3,454.72846',
          condition: '—— ——',
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
          }]
        }]

      };
    },
}
</script>

<style lang="scss">
// @import "../../styles/mandatory.scss";
</style>


