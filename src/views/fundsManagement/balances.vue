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
        <el-checkbox v-model="hidesmall">隐藏小额资产</el-checkbox>
      </div>
      <div class="titem">
        <p class="sum">总当前估值：0.00000000 BTC / &yen;0.00</p>
      </div>
    </div>
    <div class="orderBox">
      <el-table
        :data="balances"
        style="width: 100%">
        <el-table-column
          class-name = "firstCol"
          label="币种"
          prop="goods">
        </el-table-column>
        <el-table-column
          label="总额"
          prop="sum">
        </el-table-column>
        <el-table-column
          label="可用余额"
          prop="usable">
        </el-table-column>
        <el-table-column
          label="下单冻结"
          prop="freeze">
        </el-table-column>
        <el-table-column
          label="BTC估值"
          prop="appraisement">
        </el-table-column>
        <el-table-column class-name = "operation" label="操作">
          <template slot-scope="scope">
            <router-link to="">充值</router-link>
            <router-link to="">提现</router-link>
            <router-link to="">交易</router-link>
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
        search: '',
        hidesmall: false,
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