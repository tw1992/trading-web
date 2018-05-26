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
            <td class="firstCol">{{item.created_at}}</td>
            <td>{{item.symbol}}</td>
            <td>限价</td>
            <td :class="item.side=='SELL'?'red':'green'">{{item.side=='SELL'?'卖出':'买入'}}</td>
            <td>{{item.price}}</td>
            <td>{{item.number}}</td>
            <td>{{[([item.deal_number,item.number,2] | divide) , 2] | toPercent}}</td>
            <td>{{item.total}}</td>
            <td>—— ——</td>
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
        openOrder: []
      }
    },
    methods: {

    },
    created() {
      var _this = this;
      axios.get('/api/orders',{status:0}).then(function(res){  
          console.log(res);
          
          res.data.map(item => {
              item.show = false;
          })
          _this.openOrder = res.data;
          console.log(_this.openOrder)
      }).catch(function (res){  
          console.log(res);
      }); 
    }
  }
</script>