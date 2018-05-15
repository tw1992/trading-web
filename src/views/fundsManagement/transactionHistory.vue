<template>
  <div class="transactionBox">
    <p class="title">
      {{$t('route.transactionHistory')}}
    </p>

    <div class="selectBox">
      <ul class="select">
        <li :class="activeIdx == '0'?'active':''" @click="changeActive(0)"><a href="javascript:;">{{$t('funds.deposit')}}</a></li>
        <li class="line active"></li>
        <li :class="activeIdx == '1'?'active':''" @click="changeActive(1)"><a href="javascript:;">{{$t('funds.withdrawal')}}</a></li>
      </ul>

      <div class="export">
        <a v-show="activeIdx == 0" href="javascript:;" @click="exportD()">{{$t('funds.exportD')}}<i class="iconfont icon-excel"></i></a>
        <a v-show="activeIdx == 1" href="javascript:;" @click="exportW()">{{$t('funds.exportW')}}<i class="iconfont icon-excel"></i></a>
      </div>
    </div>

    <div class="page1" v-show="activeIdx == 0">
      <div class="orderBox">
        <el-table
          :data="recharge"
          style="width: 100%">
          
          <el-table-column
            class-name="firstCol"
            label="状态"
            width="120">
            <template slot-scope="scope">
              <span class="success" v-if="scope.row.status == 1">成功</span>
              <span class="defeat" v-if="scope.row.status == 0">失败</span>
              <span class="processed" v-if="scope.row.status == 2">处理中</span>
            </template>
          </el-table-column>
          <el-table-column
            label="币种"
            width="120"
            prop="coin_id">
          </el-table-column>
          <el-table-column
            label="数量"
            width="180"
            prop="number">
          </el-table-column>
          <el-table-column
            label="时间"
            width="240"
            prop="created_at">
          </el-table-column>
          <el-table-column
            label="信息">
            <template slot-scope="scope">
              <div style="margin-bottom:4px;" class="tdItem"><p class="tdname">地址</p><p class="tdmain">{{scope.row.address}}</p></div>
              <div class="tdItem"><p class="tdname">Txid</p><p class="tdmain">{{scope.row.txid}}</p></div>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>

    <div class="page2" v-show="activeIdx == 1">
      <div class="orderBox">
        <el-table
          :data="withdraw"
          style="width: 100%">
          
          <el-table-column
            class-name="firstCol"
            :label="$t('tradingCenter.status')"
            width="120">
            <template slot-scope="scope">
              <span class="success" v-if="scope.row.status == 1">成功</span>
              <span class="defeat" v-if="scope.row.status == 0">失败</span>
              <span class="processed" v-if="scope.row.status == 2">处理中</span>
            </template>
          </el-table-column>
          <el-table-column
            :label="$t('tradingCenter.coin')"
            width="120"
            prop="coin_id">
          </el-table-column>
          <el-table-column
            :label="$t('tradingCenter.amount')"
            width="180"
            prop="number">
          </el-table-column>
          <el-table-column
            :label="$t('tradingCenter.date')"
            width="240"
            prop="created_at">
          </el-table-column>
          <el-table-column
            :label="$t('funds.information')">
            <template slot-scope="scope">
              <div class="tdItem"><p class="tdname">地址</p><p class="tdmain">{{scope.row.address}}</p></div>
              <div class="tdItem"><p class="tdname">Txid</p><p class="tdmain">{{scope.row.txid}}</p></div>
            </template>
          </el-table-column>
        </el-table>
      </div>
      
    </div>

    
  </div>
</template>

<script>
import axios from '../../api/axios'
export default {
  data() {
      return {
        activeIdx: 0,
        recharge: [{
          status: 0,
          coin_id: 'BTC',
          number: '3,374.74628467',
          created_at: '2018-04-11 18:08:11',
          address: 'NoLEfhWgZt29BfEBC1hphg3mxmGiPzYQvP4ZxcVo2zdAsgn9w479',
          txid: 'DdzFFzCqrhse3znvdFkhHVjNoLEfhWgZt29BfEBC1hphg3mxmGiPzYQvP4ZxcVo2zdAsgn9w479BeiCWk9Z956DsWE1StRxVb6uH6TaN'
        },{
          status: 1,
          coin_id: 'BTC',
          number: '3,374.74628467',
          created_at: '2018-04-11 18:08:11',
          address: 'NoLEfhWgZt29BfEBC1hphg3mxmGiPzYQvP4ZxcVo2zdAsgn9w479',
          txid: 'DdzFFzCqrhse3znvdFkhHVjNoLEfhWgZt29BfEBC1hphg3mxmGiPzYQvP4ZxcVo2zdAsgn9w479BeiCWk9Z956DsWE1StRxVb6uH6TaN'
        },{
          status: 2,
          coin_id: 'BTC',
          number: '3,374.74628467',
          created_at: '2018-04-11 18:08:11',
          address: 'NoLEfhWgZt29BfEBC1hphg3mxmGiPzYQvP4ZxcVo2zdAsgn9w479',
          txid: 'DdzFFzCqrhse3znvdFkhHVjNoLEfhWgZt29BfEBC1hphg3mxmGiPzYQvP4ZxcVo2zdAsgn9w479BeiCWk9Z956DsWE1StRxVb6uH6TaN'
        },],
        withdraw: [{
          status: 1,
          coin_id: 'BTC',
          number: '3,374.74628467',
          created_at: '2018-04-11 18:08:11',
          address: 'NoLEfhWgZt29BfEBC1hphg3mxmGiPzYQvP4ZxcVo2zdAsgn9w479',
          txid: 'DdzFFzCqrhse3znvdFkhHVjNoLEfhWgZt29BfEBC1hphg3mxmGiPzYQvP4ZxcVo2zdAsgn9w479BeiCWk9Z956DsWE1StRxVb6uH6TaN'
        },{
          status: 2,
          coin_id: 'BTC',
          number: '3,374.74628467',
          created_at: '2018-04-11 18:08:11',
          address: 'NoLEfhWgZt29BfEBC1hphg3mxmGiPzYQvP4ZxcVo2zdAsgn9w479',
          txid: 'DdzFFzCqrhse3znvdFkhHVjNoLEfhWgZt29BfEBC1hphg3mxmGiPzYQvP4ZxcVo2zdAsgn9w479BeiCWk9Z956DsWE1StRxVb6uH6TaN'
        },]

      };
    },
    methods: {
      changeActive(idx) {
        this.activeIdx = idx;
      },
      getRecharge(){
        var _this = this;
        axios.get('/api/accounts/imports').then(function(res){  
            console.log(res);
            // _this.openOrder = res.data;
        }).catch(function (res){  
            console.log(res);
        });
      },
      getWithdraw(){
        var _this = this;
        axios.get('/api/accounts/exports').then(function(res){  
            console.log(res);
            // _this.openOrder = res.data;
        }).catch(function (res){  
            console.log(res);
        });
      },
      exportD() {
        require.ensure([], () => {
          const { export_json_to_excel } = require('@/vendor/Export2Excel')
          const tHeader = ['状态', '币种', '数量', '时间', '地址', 'Txid']
          const filterVal = ['statu', 'coin_id', 'number', 'created_at', 'address', 'txid']
          this.recharge.map(it =>{
            it.statu = it.status == 0?'失败':it.status == 1?'成功':'处理中';
          })
          const list = this.recharge
          const data = this.formatJson(filterVal, list)
          export_json_to_excel(tHeader, data, '充值记录')
        })
      },
      exportW() {
        require.ensure([], () => {
          const { export_json_to_excel } = require('@/vendor/Export2Excel')
          const tHeader = ['状态', '币种', '数量', '时间', '地址', 'Txid']
          const filterVal = ['statu', 'coin_id', 'number', 'created_at', 'address', 'txid']
          this.withdraw.map(it =>{
            it.statu = it.status == 0?'失败':it.status == 1?'成功':'处理中';
          })
          const list = this.withdraw
          const data = this.formatJson(filterVal, list)
          export_json_to_excel(tHeader, data, '提现记录')
        })
      },
      formatJson(filterVal, jsonData) {
        return jsonData.map(v => filterVal.map(j => v[j]))
      }
    },
    created() {
      this.getRecharge();
      this.getWithdraw();
    }
}
</script>

<style lang="scss">
.transactionBox{
  a{
    color: #333333;
  }
  .selectBox{
    overflow: hidden;
    .export{
      float: right;
      padding-right: 0;
      line-height: 28px;
      display: flex;
      align-items: center;
      a{
        color: #333333;
        &:hover{
          color: #FC9217;
        }
      }
      i{
          margin-left: 8px;
          font-size: 16px;
          line-height: 28px;
      }
    }
  }
  .select{
    float: left;
    display: flex;
    margin-bottom: 20px;
    li{
      // width: 80px;
      padding: 0 12px;
      height: 30px;
      line-height: 30px;
      border: 1px solid #cccccc;
      text-align: center;
      border-left: 0;
      border-right:0;
      &:nth-child(1){
        border-left: 1px solid #cccccc;
      }
      &:nth-last-child(1){
        border-right: 1px solid #cccccc;
      }
      a{
        display: block;
        width: 100%;
      }
    }
    .line{
      width: 0;
      border-left: 1px solid #cccccc;
      padding: 0;
    }
    li.active{
      border-color: #FC9217;
    }
    li.active a{
      color:#FC9217;
      transition:color 0.3s cubic-bezier(0.645, 0.045, 0.355, 1), padding 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
    }
  }

  .processed{
    color: #D0021B;
  }
  .tdItem{
    line-height: 16px;
    display: flex;
    justify-content: space-between;
    margin: 6px 0;
    .tdmain{
      width: 400px;
      padding-right: 60px;
    }
  }
}
</style>