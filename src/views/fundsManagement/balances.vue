<template>
  <div class="balancesBox">
    <p class="title">
      {{$t('route.balances')}}
    </p>
    <div class="balT">
      <div class="titem">
        <el-input
          placeholder="请输入内容"
          class="inputBase search"
          v-model="search">
          <i slot="prefix" class="el-input__icon el-icon-search"></i>
        </el-input>
        <el-checkbox v-model="hidesmall">{{$t('funds.hideSmallBalances')}}</el-checkbox>
      </div>
      <div class="titem">
        <p class="sum">{{$t('funds.estimatedValue')}}：{{sum}} BTC / &yen;0.00</p>
      </div>
    </div>
    <div class="orderBox">
      <!-- <el-table
        :data="balances"
        style="width: 100%">
        <el-table-column
          class-name = "firstCol"
          :label="$t('tradingCenter.coin')"
          prop="goods">
        </el-table-column>
        <el-table-column
          :label="$t('tradingCenter.totalBalance')"
          prop="sum">
        </el-table-column>
        <el-table-column
          :label="$t('tradingCenter.availableBalance')"
          prop="usable">
        </el-table-column>
        <el-table-column
          :label="$t('tradingCenter.inOrder')"
          prop="freeze">
        </el-table-column>
        <el-table-column
          :label="'BTC'+$t('tradingCenter.value')"
          prop="appraisement">
        </el-table-column>
        <el-table-column class-name = "operation" width="280" :label="$t('funds.operation')">
          <template slot-scope="scope">
            <router-link :to="'/fundsManagement/deposits/'+scope.row.id">{{$t('funds.deposit')}}</router-link>
            <router-link :to="'/fundsManagement/withdrawals/'+scope.row.id">{{$t('funds.withdrawal')}}</router-link>
            <a class="linkPairs" :to="'/tradingCenter/'+scope.row.goods">{{$t('funds.trade')}}
              <div class="pairsList">
                <p v-for="(it,idx) in showPairsList" :key="idx">{{it}}</p>
              </div>
            </a>
          </template>
        </el-table-column>
      </el-table> -->

      <table class="orderTable">
        <colgroup style="width:16.7%"></colgroup>
        <colgroup style="width:15%"></colgroup>
        <colgroup style="width:15%"></colgroup>
        <colgroup style="width:15%"></colgroup>
        <colgroup style="width:15%"></colgroup>
        <colgroup style="width:20%"></colgroup>
        <tbody>
          <tr>
            <th class="firstCol">{{$t('tradingCenter.coin')}}</th>
            <th>{{$t('tradingCenter.totalBalance')}}</th>
            <th>{{$t('tradingCenter.availableBalance')}}</th>
            <th>{{$t('tradingCenter.inOrder')}}</th>
            <th>{{'BTC'+$t('tradingCenter.value')}}</th>
            <th>{{$t('funds.operation')}}</th>
          </tr>
          
          <tr v-for="(item,idx) in balances" :key="idx">
            <td class="firstCol">{{item.goods}}</td>
            <td>{{item.sum}}</td>
            <td>{{item.usable}}</td>
            <td>{{item.freeze}}</td>
            <td>{{item.appraisement}}</td>
            <td class="operation">
              <router-link :to="'/fundsManagement/deposits/'+item.id">{{$t('funds.deposit')}}</router-link>
              <router-link :to="'/fundsManagement/withdrawals/'+item.id">{{$t('funds.withdrawal')}}</router-link>
              <a class="linkPairs" @click="item.showPairsFlag = !item.showPairsFlag" :to="'/tradingCenter/'+item.goods">{{$t('funds.trade')}}
                <div class="pairsList" v-show="item.showPairsFlag">
                  <router-link :to="'/tradingCenter/'+it" class="pairsItem" v-for="(it,idx) in showPairsList" :key="idx">{{it}}</router-link>
                </div>
              </a>
            </td>
            
          </tr>
          
          <tr v-if="balances.length ==0">
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
      search: '',
      hidesmall: false,
      sum:'0.00000000',
      showPairsList: ['ETH/BTC','ETH/BTC'],
      balances: [{
        goods: 'BTC',
        sum: '3,454.72846',
        usable: '0.00000051',
        freeze: '0.00000067',
        appraisement: '23455.34847598',
      },{
        goods: 'BTC',
        sum: '3,454.72846',
        usable: '0.00000051',
        freeze: '0.00000067',
        appraisement: '23455.34847598',
      }]
    };
  },
  methods: {
    getAccounts() {
      var _this = this;
      axios.get('/api/accounts').then(function(res){  
          console.log(res);
          var dataList = res.data;
          var balances = [];
          var sum = 0;
          dataList.forEach(it => {
            var coinItem = {};
            coinItem.id = it.id;
            coinItem.goods = _this.findName(it.id);
            coinItem.sum = it.available*1 + it.disabled*1;
            coinItem.usable = it.available;
            coinItem.freeze = it.disabled;
            coinItem.appraisement = coinItem.sum * it.price;
            coinItem.showPairsFlag = false;  //交易对列表
            sum += coinItem.appraisement;
            balances.push(coinItem);
          });
          _this.balances = balances;
          _this.sum = sum;
      }).catch(function (res){  
          console.log(res);
      }); 
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
    findPairs(coin_name) {

    }
  },
  computed: {
    ...mapGetters([
        'marketList',
        'coinList',
        'pairsList'
    ])
  },
  created() {
    this.getAccounts();
    console.log(this.coinList)
  },
}
</script>




<style lang="scss" scoped>
.balancesBox{
  .balT{
    display: flex;
    justify-content: space-between;
    margin-bottom: 20px;
    .search{
      width: 200px;
      margin-right: 30px;
    }
    .sum{
      font-size:18px;
    }
  }
  .operation{
    a{
      color: #333333;
      margin-right:32px;
    }
  }
  .linkPairs{
    display: inline-block;
    position: relative;
    // overflow: auto;
    .pairsList{
      position: absolute;
      width: 80px;
      text-align: center;
      line-height: 28px;
      top: 0;
      right: -84px;
      background: #fff;
      z-index: 10;
      border: 1px solid #ccc;
      .pairsItem{
        border-bottom: 1px solid #ccc;
        display: block;
        width: 100%;
        &:hover{
          background: rgba(245,166,35,0.10);
        }
        &:nth-last-child(1){
          border-bottom: 0;
        }
      }
    }
  }
}

</style>

<style lang="scss">
@import '../../styles/tableBase.scss';
.balancesBox{
  .el-table .cell{
    overflow: auto;
  }
}
</style>