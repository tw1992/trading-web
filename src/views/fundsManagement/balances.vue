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
          
          <tr v-for="(item,idx) in balancesitems" :key="idx">
            <td class="firstCol">{{item.goods}}</td>
            <td>{{item.sum}}</td>
            <td>{{item.usable}}</td>
            <td>{{item.freeze}}</td>
            <td>{{item.appraisement}}</td>
            <td class="operation">
              <router-link :to="'/fundsManagement/deposits/'+item.id">{{$t('funds.deposit')}}</router-link>
              <router-link :to="'/fundsManagement/withdrawals/'+item.id">{{$t('funds.withdrawal')}}</router-link>
              
              <el-popover
                placement="right-start"
                width="80"
                trigger="click">
                <div class="pairsList" v-show="item.showPairsList&&item.showPairsList.length>0">
                  <router-link :to="'/tradingCenter/'+it" class="pairsItem" v-for="(it,idx) in item.showPairsList" :key="idx">{{it}}</router-link>
                </div>
                <p v-show="!item.showPairsList||item.showPairsList.length==0">暂无交易</p>
                <a class="linkPairs" slot="reference">{{$t('funds.trade')}}
                
              </a>
              </el-popover>
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
            coinItem.showPairsList = _this.findPairs(it.id);
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
      var name;
      this.coinList.forEach(it=>{
      if(it.coin_id == coin_id){
          name = it.coin_name
        }
      })
      return name;
    },
    findPairs(coin_id) {
        var name = this.findName(coin_id)
        var arr = [];
        this.pairsList.forEach(it=>{
        if(it.symbol.indexOf(name) != -1){
            arr.push(it.symbol);
            }
        })
      return arr;
    }
  },
  computed: {
    ...mapGetters([
        'marketList',
        'coinList',
        'pairsList'
    ]),
    balancesitems: function() {
        var _search = this.search.toLocaleLowerCase();
        var _this = this;
        if (_search) {
          return this.balances.filter(function(product) {
            return Object.keys(product).some(function(key) {
              if(key == 'goods'||key == 'sum'||key == 'usable'||key == 'freeze'||key == 'appraisement'){
                return String(product[key]).toLowerCase().indexOf(_search) > -1
              }
              
            })
          })
        }
        if(this.hidesmall){
          return this.balances.filter(function(product) {
            return Object.keys(product).some(function(key) {
              return product.appraisement*1 > 0.001
            })
          })
        }
        return this.balances;
      },
  },
  created() {
    this.getAccounts();
    console.log(this.pairsList)
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
    
  }
}

.pairsList{
      width: 80px;
      text-align: center;
      line-height: 28px;
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
      a{
          color: #333333;
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
.el-popover{
    min-width: 80px;
}
</style>