<template>
  <div class="depositsBox">
    <!--<p class="title">-->
      <!--{{type == 0?$t('funds.deposit'):$t('funds.addmoney')}}-->
    <!--</p>-->
    <ul class="select">
      <li :class="type == '0'?'active':''" @click="changeActive(0)"><a href="javascript:;">{{$t('funds.deposit')}}</a></li>
      <li class="line active"></li>
      <li :class="type == '1'?'active':''" @click="changeActive(1)"><a href="javascript:;">{{$t('funds.addmoney')}}</a></li>
    </ul>
    <div class="depLbox">
      <div class="selectBox">
        <p v-show="tipFlag" class="selectTip">{{$t('funds.placeHolder')}}</p>
        <el-select class="selectInput" @visible-change="tipshow" @change="changeSelect" v-model="state3" filterable placeholder="">
            <el-option
            v-for="(item,idx) in restaurants"
            :key="idx"
            :label="item.coin_name"
            :value="item.coin_id">
            </el-option>
        </el-select>
      </div>
      <div class="priceBox">
        <ul class="priceList">
          <li>
            <span class="name">{{$t('tradingCenter.totalBalance')}}</span>
            <span class="num">{{[accounts.available,accounts.disabled,8] | add}} {{coin_name}}</span>
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



      <!--eos-->
      <div v-if="type == 1&&coin_name == 'TBL'">
        <div>
          账号
        </div>
        <div style="border: 1px solid #dcdfe6;height: 40px;line-height: 40px;padding:0 10px;background: #fff;margin-top: 10px;">
          <span>ajsdlfkajsldkfjalksdjf</span>
          <span style="float: right">
            <a href="javascript:;" class="copy" data-clipboard-text = "ajsdlfkajsldkfjalksdjf" @click="copy" style="color:#666666;">复制</a>
          </span>
        </div>
        <div class="btnBox" style="margin-bottom: 0;">
          <a href="javascript:;" class="showcode" @click="codeDialog = true;qrcode = accounts.address" style="margin-right: 0;"><i class="iconfont icon-erweima"></i><span>{{$t('funds.showQRCode')}}</span></a>
        </div>
        <div style="margin-top: 10px;">
          备注
        </div>
        <div style="border: 1px solid #dcdfe6;height: 40px;line-height: 40px;padding:0 10px;background: #fff;margin-top: 10px;">
          <span>ajsdlfkajsldkfjalksdjf</span>
          <span style="float: right;">
            <a href="javascript:;" data-clipboard-text = "123123123123" class="copy" @click="copy" style="color:#666666;">复制</a>
          </span>
        </div>
        <div class="btnBox">
          <!--<a href="javascript:;" class="copy" :data-clipboard-text = "accounts.address" @click="copy"><i class="iconfont icon-fuzhi"></i>{{$t('funds.copyAddress')}}</a>-->
          <a href="javascript:;" class="showcode" @click="codeDialog = true" style="margin-right: 0;"><i class="iconfont icon-erweima"></i><span>{{$t('funds.showQRCode')}}</span></a>
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
        <!--非法币-->
      <div v-if="type == 1&&coin_name != 'TBL'">
        <div class="addBox">
          <p class="addTitle">{{coin_name+$t('funds.depositAddress')}}</p>
          <p class="add">{{accounts.address}}</p>
          <p class="warning">{{changeTips.tip1}}</p>
        </div>
        <div class="btnBox">
          <a href="javascript:;" class="copy" :data-clipboard-text = "accounts.address" @click="copy"><i class="iconfont icon-fuzhi"></i>{{$t('funds.copyAddress')}}</a>
          <a href="javascript:;" class="showcode" @click="codeDialog = true;qrcode = accounts.address"><i class="iconfont icon-erweima"></i><span>{{$t('funds.showQRCode')}}</span></a>
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
      <!--法币-->
      <div class="serviceBox" v-if="type == 0">
          <p class="serverTitle">{{$t('Dialog.contract2')}}</p>
          <div class="imgbox">
            <div class="imgItem">
                <img src="../../assets/recharge/wx.jpg" alt="微信">
                <p class="serverTips">{{$t('fundsManagement.weixin')}}</p>
            </div>
            <div class="imgItem">
                <img src="../../assets/recharge/qq.jpg" alt="QQ">
                <p class="serverTips">QQ</p>
            </div>
          </div>
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
                <p class="nodeTitle">{{it.status == 0?$t('fundsManagement.fail'):$t('fundsManagement.success')}}</p>
                <p class="nodeMain">{{it.created_at}}</p>
              </div>
            </div>
            <div class="itemB">
              <div class="nodes">
                <p class="nodeTitle">{{$t('fundsManagement.address')}}</p>
                <p class="nodeMain">{{it.address | tooLong}}</p>
              </div>
            </div>
          </div>
          <div class="itemR">
            <div class="itemT">
              <div class="nodes">
                <p class="nodeTitle">{{$t('tradingCenter.coin')}}</p>
                <p class="nodeMain">{{coin_name}}</p>
              </div>
              <div class="nodes">
                <p class="nodeTitle">{{$t('tradingCenter.amount')}}</p>
                <p class="nodeMain">{{it.number}}</p>
              </div>
            </div>
            <div class="itemB">
              <div class="nodes">
                <p class="nodeTitle">Txid</p>
                <a v-if="coin_name == 'BTC'" :href="'https://blockchain.info/zh-cn/tx/'+it.txid" class="nodeMain linkTo">{{it.txid}}</a>
                <a v-if="coin_name == 'ETH'" :href="'https://etherscan.io/tx/'+it.txid" class="nodeMain linkTo">{{it.txid}}</a>
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
          <vue-qr :text="qrcode" :margin="0" :size="160" style="margin: auto;"></vue-qr>
        </div>
        <span slot="footer" class="dialog-footer">
            <p class="add">{{qrcode}}</p>
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
        type:'',//0充值 1充币
        coin_id: '',
        coin_name : '',
        restaurants: [],
        state3: '3',
        codeDialog: false,
        depositsAdd: "",
        changeTips: {
          tip1: '',
          tip2: '',
        },
        changeFlag: false,      //判断进入页面后是否改变过币种
        tipFlag: false,
        historyList: [],
        accounts: {
          available: '',
          disabled: '',
          address: ''
        },
        tag: '',
        currentStatus:'',
        qrcode:''
      };
    },
    methods: {
      changeActive(data){
        this.type = data;
        var url = '/fundsManagement/deposits/'+this.coin_id+'/'+this.type;
        this.$router.push(url)
      },
      getRechargeHistory(coin_id) {
        var _this = this;
        axios.get(`/api/accounts/imports/${coin_id}`).then(function(res){
            _this.historyList = res.data;
        }).catch(function (res){
        });
      },
      getAccounts(coin_id) {
        var _this = this;
        axios.get(`/api/accounts/${coin_id}`).then(function(res){
            _this.accounts.available = res.data.available;
            _this.accounts.disabled = res.data.disabled;
            _this.accounts.address = res.data.address || '网络错误';
        }).catch(function (res){
            console.log(res);
        });
      },
      changeSelect(value){
        this.changeFlag = true;   //改变过币
        this.coin_id = value;
        var name = this.findName(value);
        this.currentStatus = this.findName(this.coin_id,'status');
        this.coin_name = name;
        this.changeTip(name);        //替换change
        this.getRechargeHistory(value);
        this.getAccounts(value);
      },
      tipshow(flag) {
          this.tipFlag = flag;
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
      findName(coin_id,type) {
        var _this = this;
        var name,status;
        this.coinList.forEach(it=>{
        if(it.coin_id == coin_id){
            name = it.coin_name;
            status = it.status;
          }
        })
        if(type){
          return status;
        }
        return name;
      },
      init(coin_id,type){
        this.coin_id = coin_id;
        this.type = type;
        this.coin_name = this.findName(this.coin_id);
        this.currentStatus = this.findName(this.coin_id,'status');
        this.state3 = this.coin_name;
        if(this.type == 0){//充值
          this.restaurants = [];
          for(var i = 0;i<this.coinList.length;i++){
            if(this.coinList[i].status == 1){
              this.restaurants.push(this.coinList[i])
            }
          }
        }else{//提币
          this.restaurants = this.coinList;
        }

        this.getRechargeHistory(this.coin_id);
        this.getAccounts(this.coin_id);
        this.changeTip(this.coin_name);        //替换change
      }
    },
    computed: {
      ...mapGetters([
          'marketList',
          'coinList',
      ])
    },
    filters: {
      tooLong: function(value) {
        if(value.length>70){
          var str = value.slice(0,70) + "...";
          return str;
        }
        return value;
      }
    },
    components: {VueQr},
    created() {
      this.init(this.$route.params.coin_id,this.$route.params.type)
    },
    beforeRouteUpdate(to,from,next){
      this.init(to.params.coin_id,to.params.type)
      next();
    },
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
        text-align: center;
      }
    }
}
</style>
<style lang="scss">
  .select{
    display: flex;
    margin-bottom: 20px;
    margin-top:20px;
  li{
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
    color:#333333;
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
</style>
