<template>
<div class="openBox">
  <p class="title">
    {{$t('route.openOrders')}}
  </p>
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
        width="160"
        :label="$t('tradingCenter.price')"
        prop="prices">
      </el-table-column>
      <el-table-column
        width="160"
        :label="$t('tradingCenter.amount')"
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
            <td class="firstCol">{{item.time}}</td>
            <td>{{item.goods}}</td>
            <td>{{item.type}}</td>
            <td :class="item.direction=='卖出'?'red':'green'">{{item.direction}}</td>
            <td>{{item.prices}}</td>
            <td>{{item.num}}</td>
            <td>{{item.probability}}</td>
            <td>{{item.sum}}</td>
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
        
      </tbody>

    </table>
  </div>
</div>

  
</template>

<style>

</style>

<style lang="scss">
// @import "../../styles/mandatory.scss";
</style>


<script>
import axios from '../../api/axios'
  export default {
    data() {
      return {
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
        transaction:'0.28738938 BTC',
        openOrder: [{
          time: '2018-04-11 18:08:11',
          goods: 'BTC',
          type: '限价',
          direction: '买入',
          prices: '0.00000051',
          num: '3,374.74628467',
          probability: '0.00029%',
          sum: '3,454.72846',
          condition: '—— ——',
          transaction: '0.28738938 BTC',
          show: false,
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
        }, {
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
          show: false,
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
        },{
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
          show: false,
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
        },{
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
          show: false,
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
      }
    },
    methods: {

    },
    created() {
      var _this = this;
      axios.get('/api/finance/entrusting').then(function(res){  
          console.log(res);
          _this.tableData = res.data;
      }).catch(function (res){  
          console.log(res);
      }); 
    }
  }
</script>