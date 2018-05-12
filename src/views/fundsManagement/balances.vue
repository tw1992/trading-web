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
      <el-table
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
            <router-link to="">{{$t('funds.deposit')}}</router-link>
            <router-link to="">{{$t('funds.withdrawal')}}</router-link>
            <router-link to="">{{$t('funds.trade')}}</router-link>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
  
</template>
<script>
import axios from '../../api/axios'
export default {
  data() {
    return {
      search: '',
      hidesmall: false,
      sum:'0.00000000',
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
            coinItem.goods = it.id;
            coinItem.sum = it.available*1 + it.disabled*1;
            coinItem.usable = it.available;
            coinItem.freeze = it.disabled;
            coinItem.appraisement = coinItem.sum * it.price;
            sum += coinItem.appraisement;
            balances.push(coinItem);
          });
          _this.balances = balances;
          _this.sum = sum;
      }).catch(function (res){  
          console.log(res);
      }); 
    }
  },
  created() {
    this.getAccounts();
  },
}
</script>

<style lang="scss">
@import '../../styles/tableBase.scss';
</style>


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
}

</style>