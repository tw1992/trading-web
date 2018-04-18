<template>
<div class="orderBox">
  <el-table
    :data="openOrder"
    style="width: 100%">
    
    <el-table-column
      class-name="firstCol"
      label="时间"
      width="180"
      prop="time">
    </el-table-column>
    <el-table-column
      label="市场"
      prop="goods">
    </el-table-column>
    <el-table-column
      label="类型"
      prop="type">
    </el-table-column>
    <el-table-column
      label="方向"
      prop="direction">
    </el-table-column>
    <el-table-column
      label="价格"
      prop="prices">
    </el-table-column>
    <el-table-column
      label="委托数量"
      prop="num">
    </el-table-column>
    <el-table-column
      label="成交率%"
      prop="probability">
    </el-table-column>
    <el-table-column
      label="金额"
      prop="sum">
    </el-table-column>
    <el-table-column
      label="触发"
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
  
</template>

<style>

</style>

<style lang="scss">
@import "../../styles/mandatory.scss";
</style>


<script>
  export default {
    data() {
      return {
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
    }
  }
</script>