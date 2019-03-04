<template>
  <div class="balancesBox">
    <p class="title">
      {{$t('route.balances')}}
    </p>
    <div class="balT">
      <div class="titem">
        <el-input
          :placeholder="$t('route.balances')"
          class="inputBase search"
          v-model="search">
          <i slot="prefix" class="el-input__icon el-icon-search"></i>
        </el-input>
        <el-checkbox v-model="hidesmall">{{$t('funds.hideSmallBalances')}}</el-checkbox>
      </div>
      <div class="titem">
        <p class="sum">{{$t('funds.estimatedValue')}}：&yen;{{sum}}</p>
      </div>
    </div>
    <div class="orderBox">
      <table class="orderTable">
        <colgroup style="width:14.7%"></colgroup>
        <colgroup style="width:14%"></colgroup>
        <colgroup style="width:14%"></colgroup>
        <colgroup style="width:14%"></colgroup>
        <colgroup style="width:15%"></colgroup>
        <colgroup style="width:25%"></colgroup>
        <tbody>
        <tr>
          <th class="firstCol">{{$t('tradingCenter.coin')}}</th>
          <th>{{$t('tradingCenter.totalBalance')}}</th>
          <th>{{$t('tradingCenter.availableBalance')}}</th>
          <th>{{$t('tradingCenter.inOrder')}}</th>
          <th>{{$store.state.app.area.name+$t('tradingCenter.value')}}</th>
          <th>{{$t('funds.operation')}}</th>
        </tr>

        <tr v-for="(item,idx) in balancesitems" :key="idx">
          <td class="firstCol">{{item.goods}}</td>
          <td>{{item.sum*1}}</td>
          <td>{{item.usable*1}}</td>
          <td>{{item.freeze*1}}</td>
          <td>{{item.appraisement}}</td>
          <td class="operation">
            <router-link :to="'/fundsManagement/deposits/'+item.id+'/0'" v-if="item.status == 1">{{$t('funds.deposit')}}</router-link>
            <router-link :to="'/fundsManagement/withdrawals/'+item.id+'/0'" v-if="item.status == 1">{{$t('funds.withdrawal')}}</router-link>
            <router-link :to="'/fundsManagement/deposits/'+item.id+'/1'">充币</router-link>
            <router-link :to="'/fundsManagement/withdrawals/'+item.id+'/1'">提币</router-link>
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
  import { add} from "../../utils/common.js"
  export default {
    data() {
      return {
        search: '',
        hidesmall: false,
        sum:'0.00000000',
        showPairsList: [],
        balances: []
      };
    },
    methods: {
      getAccounts() {
        var _this = this;
        axios.get('/api/accounts').then(function(res){
          var dataList = res.data.accounts;
          var balances = [];
          var sum = 0;
          dataList.forEach(it => {
            var coinItem = {};
            coinItem.id = it.coin_id;
            coinItem.status = it.status;
            coinItem.goods = it.name;
            coinItem.sum = add(it.available,it.disabled,8);
            coinItem.usable = it.available;
            coinItem.freeze = it.disabled;
            coinItem.appraisement = it.cny;
            coinItem.showPairsFlag = false;  //交易对列表
            coinItem.showPairsList = _this.findPairs(it.coin_id);
            balances.push(coinItem);
          });
          _this.balances = balances;
          _this.sum = res.data.cny;
          console.log(res)
        }).catch(function (res){
          console.log(res);
        });
      },
      findName(coin_id) {
        var name;
        this.coinList.forEach(it=>{
          if(it.coin_id == coin_id){
            name = it.coin_name;
          }
        })
        return name;
      },
      findPairs(coin_id) {
        var name = this.findName(coin_id)
        var arr = [];
        for (var it in this.pairsList){
          for(var i = 0;i<this.pairsList[it].length;i++){
            if(this.pairsList[it][i].symbol.indexOf(name) != -1){
              arr.push(this.pairsList[it][i].symbol);
            }
          }
        }
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
        console.log(this.balances)
        return this.balances;
      },
    },
    created() {
      this.getAccounts();
//    console.log(this.pairsList)
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
