<template>
  <div class="depositsBox">
    <p class="title">
      {{$t('funds.deposit')}}
    </p>

    <div class="depLbox">
      <el-select class="selectInput" @change="changeSelect" v-model="state3" filterable :placeholder="$t('funds.placeHolder')">
        <el-option
          v-for="(item,idx) in restaurants"
          :key="idx"
          :label="item.coin_name"
          :value="item.coin_id">
        </el-option>
      </el-select>
      <div class="priceBox">
        <ul class="priceList">
          <li>
            <span class="name">{{$t('tradingCenter.totalBalance')}}</span>
            <span class="num">{{[accounts.address,accounts.disabled,8] | add}} {{coin_name}}</span>
          </li>
          <li>
            <span class="name">{{$t('tradingCenter.inOrder')}}</span>
            <span class="num">{{accounts.disabled}} {{coin_name}}</span>
          </li>
          <li>
            <span class="name">{{$t('tradingCenter.availableBalance')}}</span>
            <span class="num">{{accounts.available}} {{coin_name}}</span>
          </li>
        </ul>
        <a href="javascript:;" class="know baseColor"><i class="iconfont icon-shu"></i><span>{{$t('funds.whats')+coin_name}}？</span></a>
      </div>

      <div class="addBox">
        <p class="addTitle">{{coin_name+$t('funds.depositAddress')}}</p>
        <p class="add">{{accounts.address}}</p>
        <p class="warning">{{changeTips.tip1}}</p>
      </div>
      <div class="btnBox">
        <a href="javascript:;" class="copy" :data-clipboard-text = "depositsAdd" @click="copy"><i class="iconfont icon-fuzhi"></i>{{$t('funds.copyAddress')}}</a>
        <a href="javascript:;" class="showcode" @click="codeDialog = true"><i class="iconfont icon-erweima"></i><span>{{$t('funds.showQRCode')}}</span></a>
      </div>
      <div class="tipsBox">
        <p class="tipsT">{{$t('funds.tips')}}</p>
        <ul class="tipsList">
          <li>
            <span class="dot"></span>
            <p>{{changeTips.tip2}}<span class="baseColor">15</span>{{$t('funds.tips1b')}}</p>
          </li>
          <li>
            <span class="dot"></span>
            <p>{{$t('funds.tips2a')}}<router-link class="baseColor" to="/fundsManagement/transactionHistory">{{$t('funds.history')}}</router-link>{{$t('funds.tips2b')}}</p>
          </li>
        </ul>
      </div>

    </div>
    <div class="depRbox">
      <div class="depRtitle">
        <div class="titleL">{{$t('funds.Dhistory')}}</div>
        <div class="titleR">
          <el-popover
            ref="popover4"
            width="320"
            trigger="click">
            <p>{{$t('funds.notip')}} <a href="javascript:;" class="baseColor">{{$t('funds.more')}}</a></p>
          </el-popover>
          <a href="javascript:;" class="baseColor showtip" v-popover:popover4>{{$t('funds.notArrive')}}<i class="el-icon-question"></i></a>
          <router-link to="/fundsManagement/transactionHistory" class="more">{{$t('funds.viewAll')}}</router-link>
        </div>
      </div>

      <ul class="depList">
        <li class="depItem" v-for="(it,idx) in historyList" :key="idx">
          <div class="itemL">
            <div class="itemT">
              <div class="nodes">
                <p class="nodeTitle">{{it.status == 0?'成功':'失败'}}</p>
                <p class="nodeMain">{{it.created_at}}</p>
              </div>
            </div>
            <div class="itemB">
              <div class="nodes">
                <p class="nodeTitle">地址</p>
                <p class="nodeMain">{{it.address}}</p>
              </div>
            </div>
          </div>
          <div class="itemR">
            <div class="itemT">
              <div class="nodes">
                <p class="nodeTitle">币种</p>
                <p class="nodeMain">{{coin_name}}</p>
              </div>
              <div class="nodes">
                <p class="nodeTitle">数量</p>
                <p class="nodeMain">{{it.number}}</p>
              </div>
            </div>
            <div class="itemB">
              <div class="nodes">
                <p class="nodeTitle">Txid</p>
                <p class="nodeMain">{{it.txid}}</p>
              </div>
            </div>
          </div>
        </li>
      </ul>
    </div>

    <!-- 二维码弹窗 -->
    <el-dialog
        :title="coin_name+$t('funds.depositAddress')"
        :visible.sync="codeDialog"
        custom-class="baseDialog codeDialog"
        center>
        <div class="codeBox">
          <!-- <img src="../../assets/img/pic.jpg"> -->
          <vue-qr :text="accounts.address" :margin="0" :size="160" style="margin: auto;"></vue-qr>
        </div>
        <span slot="footer" class="dialog-footer">
            <p class="add">{{accounts.address}}</p>
        </span>
    </el-dialog>
  </div>
</template>

<script>
import Clipboard from 'clipboard';
import calc from 'calculatorjs'
import VueQr from 'vue-qr'
import { mapGetters } from 'vuex'
import axios from '../../api/axios'
export default {
  data() {
      return {
        coin_id: '',
        coin_name : '',
        restaurants: [],
        state3: '3',
        codeDialog: false,
        depositsAdd: "DdzFFzCqrhse3znvdFkhHVjNoLEfhWgZt29BfEBC1hphg3mxmGiPzYQvP4ZxcVo2zdAsgn9w479BeiCWk9Z956DsWE1StRxVb6uH6TaN",
        changeTips: {
          tip1: '',
          tip2: '',
        },
        changeFlag: false,      //判断进入页面后是否改变过币种
        historyList: [],
        accounts: {
          available: '',
          disabled: '',
          address: ''
        },
        tag: ''
      };
    },
    methods: {
      getRechargeHistory(coin_id) {
        var _this = this;
        axios.get(`/api/accounts/imports/${coin_id}`).then(function(res){  
            console.log(res);
            _this.historyList = res.data;
        }).catch(function (res){  
            console.log(res);
        }); 
      },
      getAccounts(coin_id) {
        var _this = this;
        axios.get(`/api/accounts/${coin_id}`).then(function(res){  
            console.log(res);
            _this.accounts.available = res.data.available;
            _this.accounts.disabled = res.data.disabled;
            _this.accounts.address = res.data.address;
        }).catch(function (res){  
            console.log(res);
        }); 
      },
      changeSelect(value){
        this.changeFlag = true;   //改变过币
        this.coin_id = value;
        var name = this.findName(value)
        this.coin_name = name;
        this.changeTip(name);        //替换change
        console.log(name)
        this.getRechargeHistory(value);
        this.getAccounts(value);
      },
      copy(){
        var clipboard = new Clipboard('.copy')  
        clipboard.on('success', e => {  
          this.$message({
            message: '复制成功',
            type: 'success'
          }); 
          // 释放内存  
          clipboard.destroy()  
        })  
        clipboard.on('error', e => {  
          // 不支持复制  
          this.$message.error('该浏览器不支持自动复制'); 
          // 释放内存  
          clipboard.destroy()  
        }) 
      },
      changeTip(name) {
        this.changeTips.tip1 = this.$t('funds.importantTip').replace(/change/g,name);
        this.changeTips.tip2 = this.$t('funds.tips1a').replace(/change/g,name);
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
      }
    },
    computed: {
      ...mapGetters([
          'marketList',
          'coinList',
      ])
    },
    filters: {
      add: ([value1,value2,fixed]) => {
        return calc.add(value1, value2).toFixed(fixed)
      }
    },
    components: {VueQr},
    created() {
      this.coin_id = this.$route.params.coin_id;
      this.coin_name = this.findName(this.coin_id);
      this.state3 = this.coin_name;
      this.restaurants = this.coinList;
      this.getRechargeHistory(this.coin_id);
      this.getAccounts(this.coin_id);
      this.changeTip(this.coin_name);        //替换change
    }
}
</script>

<style lang="scss">
.codeDialog{
    .el-dialog__body{
      img{
        max-width: 160px;
        max-height: 160px;
        margin: auto;
      }
    }
    .el-dialog__footer{
      .add{
        font-size: 12px;
        word-wrap:break-word; 
        word-break:break-all; 
        text-align: left;
        width: 310px;
        margin: auto;
        padding-bottom: 20px;
      }
    }
}
</style>