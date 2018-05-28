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
            <td><span :class="item.side=='SELL'?'red':'green'">{{item.side=='SELL'?'卖出':'买入'}}</span></td>
            <td>{{item.price}}</td>
            <td>{{item.number}}</td>
            <td>{{[item.bargain , 2] | toPercent}}</td>
            <td>{{item.total}}</td>
            <td>—— ——</td>
            <td><span @click="item.show = !item.show;getDetail(item.id,item.show)" class="baseColor">成交详情</span></td>
            
          </tr>
          <tr v-show="item.show" :key="idx+'b'">
            <td colspan="10">
              <div class="detail">
                  <p class="title">成交总额<span class="sum">{{item.detailAll + " BTC"}}</span></p>
                <el-table
                  class="detailTable"
                  :data="item.detail"
                  style="width: 100%">
                    <el-table-column
                      class-name="firstCol"
                      prop="created_at"
                      label="成交时间">
                    </el-table-column>
                    <el-table-column
                      prop="price"
                      label="成交价格">
                    </el-table-column>
                    <el-table-column
                      prop="number"
                      label="成交数量">
                    </el-table-column>
                    <el-table-column
                      prop="fee"
                      label="手续费">
                    </el-table-column>
                    <el-table-column
                      label="成交金额">
                       <template slot-scope="scope">
                           <span>{{[scope.row.price,scope.row.number,8] | mul}}</span>
                       </template>
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
    <el-pagination
        layout="prev, pager, next"
        @current-change="pageChange"
        @next-click="pageChange"
        @prev-click="pageChange"
        v-show="pagination.total"
        :page-size="pagination.per_page*1"
        :total="pagination.total">
    </el-pagination>
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
import { add, mul, toFixed } from '../../utils/common.js'
import calc from 'calculatorjs'
  export default {
    data() {
      return {
        openOrder: [],
        pagination: {
            total: 0,
            links: [],
            count: '',
            current_page: 1,
            per_page: '',
            total_pages: ''
        },
      }
    },
    methods: {
        pageChange(page) {
            this.getOpenOrders(`/api/orders?page=${page}`);
        },
        getOpenOrders(url){
            var _this = this;
            axios.get(url,{status:0}).then(function(res){  
                console.log(res);
                res.data.map(item => {
                    item.show = false;
                    item.bargain = _this.div(item.deal_number,item.number,4);
                })
                _this.openOrder = res.data;
                _this.pagination = res.meta.pagination;
                item.detail = [{
                  "created_at": "",
                  "price": "",
                  "number": "",
                  "fee": ""
              }]
              item.detailAll = ""
            }).catch(function (res){  
                console.log(res);
            });
        },
        getDetail(id,show) {
          if(show){
                var _this = this;
                axios.get(`/api/orders/detail/${id}`).then(function(res){  
                    // console.log(res);
                    var sum = toFixed(0,8);
                    res.data.map(it => {
                        sum = add(sum,mul(it.price,it.number,8),8)
                    })

                    _this.openOrder.map(it => {
                        if(it.id == id){
                            it.detail = res.data;
                            it.detailAll = sum;
                        }
                    })
                    // res.data.map(item => {
                    //     item.show = false;
                    //     item.bargain = _this.div(item.deal_number,item.number,4);
                    // })
                    // _this.openOrder = res.data;
                    // _this.pagination = res.meta.pagination;
                }).catch(function (res){  
                    console.log(res);
                });
            }
        },
        div(value1, value2, fixed) {    //除
            if(!fixed){
                var fixed = 2;
            }
            if(value2 == 0){
                var val = 0;
                return calc.round(val,fixed);
            }
            return calc.div(value1, value2).toFixed(fixed);
        }
    },
    created() {
        this.getOpenOrders('/api/orders')
    }
  }
</script>