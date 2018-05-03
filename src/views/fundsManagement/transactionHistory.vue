<template>
  <div class="transactionBox">
    <p class="title">
      充值提现记录
    </p>

    <div class="selectBox">
      <ul class="select">
        <li :class="activeIdx == '0'?'active':''" @click="changeActive(0)"><a href="javascript:;">充值</a></li>
        <li class="line active"></li>
        <li :class="activeIdx == '1'?'active':''" @click="changeActive(1)"><a href="javascript:;">提现</a></li>
      </ul>

      <div class="export">
        <a v-show="activeIdx == 0" href="javascript:;">导出充值记录<i class="iconfont icon-excel"></i></a>
        <a v-show="activeIdx == 1" href="javascript:;">导出提现记录<i class="iconfont icon-excel"></i></a>
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
              <span class="success" v-if="scope.row.state == 1">成功</span>
              <span class="defeat" v-if="scope.row.state == 0">失败</span>
              <span class="processed" v-if="scope.row.state == 2">处理中</span>
            </template>
          </el-table-column>
          <el-table-column
            label="币种"
            width="120"
            prop="goods">
          </el-table-column>
          <el-table-column
            label="数量"
            width="180"
            prop="num">
          </el-table-column>
          <el-table-column
            label="时间"
            width="240"
            prop="time">
          </el-table-column>
          <el-table-column
            label="信息">
            <template slot-scope="scope">
              <div style="margin-bottom:4px;" class="tdItem"><p class="tdname">地址</p><p class="tdmain">{{scope.row.message.add}}</p></div>
              <div class="tdItem"><p class="tdname">Txid</p><p class="tdmain">{{scope.row.message.Txid}}</p></div>
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
            label="状态"
            width="120">
            <template slot-scope="scope">
              <span class="success" v-if="scope.row.state == 1">成功</span>
              <span class="defeat" v-if="scope.row.state == 0">失败</span>
              <span class="processed" v-if="scope.row.state == 2">处理中</span>
            </template>
          </el-table-column>
          <el-table-column
            label="币种"
            width="120"
            prop="goods">
          </el-table-column>
          <el-table-column
            label="数量"
            width="180"
            prop="num">
          </el-table-column>
          <el-table-column
            label="时间"
            width="240"
            prop="time">
          </el-table-column>
          <el-table-column
            label="信息">
            <template slot-scope="scope">
              <div class="tdItem"><p class="tdname">地址</p><p class="tdmain">{{scope.row.message.add}}</p></div>
              <div class="tdItem"><p class="tdname">Txid</p><p class="tdmain">{{scope.row.message.Txid}}</p></div>
            </template>
          </el-table-column>
        </el-table>
      </div>
      
    </div>

    
  </div>
</template>

<script>
export default {
  data() {
      return {
        activeIdx: 0,
        recharge: [{
          state: 1,
          goods: 'BTC',
          num: '3,374.74628467',
          time: '2018-04-11 18:08:11',
          message: {
            add: 'NoLEfhWgZt29BfEBC1hphg3mxmGiPzYQvP4ZxcVo2zdAsgn9w479',
            Txid: 'DdzFFzCqrhse3znvdFkhHVjNoLEfhWgZt29BfEBC1hphg3mxmGiPzYQvP4ZxcVo2zdAsgn9w479BeiCWk9Z956DsWE1StRxVb6uH6TaN'
          }
        },{
          state: 0,
          goods: 'BTC',
          num: '3,374.74628467',
          time: '2018-04-11 18:08:11',
          message: {
            add: 'NoLEfhWgZt29BfEBC1hphg3mxmGiPzYQvP4ZxcVo2zdAsgn9w479',
            Txid: 'DdzFFzCqrhse3znvdFkhHVjNoLEfhWgZt29BfEBC1hphg3mxmGiPzYQvP4ZxcVo2zdAsgn9w479BeiCWk9Z956DsWE1StRxVb6uH6TaN'
          }
        },{
          state: 2,
          goods: 'BTC',
          num: '3,374.74628467',
          time: '2018-04-11 18:08:11',
          message: {
            add: 'NoLEfhWgZt29BfEBC1hphg3mxmGiPzYQvP4ZxcVo2zdAsgn9w479',
            Txid: 'DdzFFzCqrhse3znvdFkhHVjNoLEfhWgZt29BfEBC1hphg3mxmGiPzYQvP4ZxcVo2zdAsgn9w479BeiCWk9Z956DsWE1StRxVb6uH6TaN'
          }
        }],
        withdraw: [{
          state: 1,
          goods: 'BTC',
          num: '3,374.74628467',
          time: '2018-04-11 18:08:11',
          message: {
            add: 'NoLEfhWgZt29BfEBC1hphg3mxmGiPzYQvP4ZxcVo2zdAsgn9w479',
            Txid: 'DdzFFzCqrhse3znvdFkhHVjNoLEfhWgZt29BfEBC1hphg3mxmGiPzYQvP4ZxcVo2zdAsgn9w479BeiCWk9Z956DsWE1StRxVb6uH6TaN'
          }
        },{
          state: 2,
          goods: 'BTC',
          num: '3,374.74628467',
          time: '2018-04-11 18:08:11',
          message: {
            add: 'NoLEfhWgZt29BfEBC1hphg3mxmGiPzYQvP4ZxcVo2zdAsgn9w479',
            Txid: 'DdzFFzCqrhse3znvdFkhHVjNoLEfhWgZt29BfEBC1hphg3mxmGiPzYQvP4ZxcVo2zdAsgn9w479BeiCWk9Z956DsWE1StRxVb6uH6TaN'
          }
        }]

      };
    },
    methods: {
      changeActive(idx) {
        this.activeIdx = idx;
      }
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
      width: 80px;
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