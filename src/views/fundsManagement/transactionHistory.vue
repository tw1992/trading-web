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
            width="120">
            <template slot-scope="scope">
              <span>{{findName(scope.row.coin_id)}}</span>
            </template>
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
              <div v-if="scope.row.coin_id == 1" class="tdItem"><p class="tdname">Txid</p><a target="_block" :href="'https://blockchain.info/zh-cn/tx/'+scope.row.txid" class="tdmain txLink">{{scope.row.txid}}</a></div>
              <div v-if="scope.row.coin_id == 2" class="tdItem"><p class="tdname">Txid</p><a target="_block" :href="'https://etherscan.io/tx/'+scope.row.txid" class="tdmain txLink">{{scope.row.txid}}</a></div>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination
            layout="prev, pager, next"
            @current-change="pageChange1"
            @next-click="pageChange1"
            @prev-click="pageChange1"
            :page-size="pagination1.per_page*1"
            :total="pagination1.total">
        </el-pagination>
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
            width="120">
            <template slot-scope="scope">
              <span>{{findName(scope.row.coin_id)}}</span>
            </template>
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
              <div v-if="scope.row.coin_id == 1" class="tdItem"><p class="tdname">Txid</p><a target="_block" :href="'https://blockchain.info/zh-cn/tx/'+scope.row.txid" class="tdmain txLink">{{scope.row.txid}}</a></div>
              <div v-if="scope.row.coin_id == 2" class="tdItem"><p class="tdname">Txid</p><a target="_block" :href="'https://etherscan.io/tx/'+scope.row.txid" class="tdmain txLink">{{scope.row.txid}}</a></div>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination
            layout="prev, pager, next"
            @current-change="pageChange2"
            @next-click="pageChange2"
            @prev-click="pageChange2"
            :page-size="pagination2.per_page*1"
            :total="pagination2.total">
        </el-pagination>
      </div>
      
    </div>

    
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import axios from '../../api/axios'
export default {
  data() {
      return {
        activeIdx: 0,
        pagination: {},
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
        },],
        pagination1: {
            total: 0,
            links: [],
            count: '',
            current_page: 1,
            per_page: '',
            total_pages: ''
        },
        pagination2: {
            total: 0,
            links: [],
            count: '',
            current_page: 1,
            per_page: '',
            total_pages: ''
        },

      };
    },
    methods: {
      changeActive(idx) {
        this.activeIdx = idx;
      },
      getRecharge(url){
        var _this = this;
        axios.get(url).then(function(res){  
            console.log(res);
            _this.recharge = res.data;
            _this.pagination1 = res.meta.pagination;
        }).catch(function (res){  
            console.log(res);
        });
      },
      getWithdraw(url){
        var _this = this;
        axios.get(url).then(function(res){  
            console.log(res);
            _this.withdraw = res.data;
            _this.pagination2 = res.meta.pagination;
        }).catch(function (res){  
            console.log(res);
        });
      },
      pageChange1(page) {
        this.getRecharge(`/api/accounts/imports?page=${page}`);
      },
      pageChange2(page) {
        this.getWithdraw(`/api/accounts/exports?page=${page}`);
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
      },
      findName(coin_id) {
        var _this = this;
        var name;
        this.coinList.forEach(it=>{
        if(it.coin_id == coin_id){
            name = it.coin_name
          }
        })
        return name;
      },
    },
    computed: {
      ...mapGetters([
          'coinList',
      ])
    },
    created() {
      this.getRecharge('/api/accounts/imports');
      this.getWithdraw('/api/accounts/exports');
    }
}
</script>

<style lang="scss">
.transactionBox{
  padding-bottom: 40px;
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
    .txLink:hover{
      color: #FC9217;
      text-decoration: underline;
    }
  }
}
</style>