<template>
  <div class="depositsBox">
    <ul class="select">
      <li :class="type == '0'?'active':''" @click="changeActive(0)"><a href="javascript:;">{{$t('route.submoney')}}</a></li>
      <li class="line active"></li>
      <li :class="type == '1'?'active':''" @click="changeActive(1)"><a href="javascript:;">{{$t('route.withdrawals')}}</a></li>
    </ul>
    <div class="depLbox">
      <div class="selectBox">
        <p v-show="tipFlag" class="selectTip">{{$t('funds.placeHolder')}}</p>
        <el-select class="selectInput" @visible-change="tipshow" @change="changeSelect" v-model="state3" filterable :placeholder="$t('funds.placeHolder')">
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
        <a href="javascript:;" class="know baseColor"><i class="iconfont icon-shu"></i><span>{{$t('funds.whats')+coin_name}}</span></a>
      </div>

      <div class="tipsBox">
        <p class="tipsT careful">{{$t('funds.important')}}</p>
        <ul class="tipsList">
          <li>
            <p class="careful"><span class="dot careful"></span>{{$t('funds.importantTip1')}}{{accounts.export_min}}{{coin_name}}</p>
          </li>
          <li>
            <p class="careful"><span class="dot careful"></span>{{$t('funds.importantTip2')}}</p>
          </li>
        </ul>
      </div>
      <div class="siteBox">
        <p class="siteTitle" v-if="type==0">{{coin_name + '银行卡账号'}}</p>
        <p class="siteTitle" v-if="type==1">{{coin_name + $t('route.withdrawals') + $t('fundsManagement.address')}}</p>
        <p class="siteTips" v-if="type==0">{{'请选择银行卡账号'}}</p>
        <p class="siteTips" v-if="type==1">{{$t('fundsManagement.withdrawalsInputTip')}}</p>
        <el-form :model="siteForm" status-icon :rules="siteFormRules" ref="siteForm" class="siteForm">
          <!--提现-->
          <el-form-item prop="cardId" v-if="type==0">
            <el-select class="addList" @change="getTagCurr" v-model="siteForm.cardId" :placeholder="$t('fundsManagement.withdrawalsPlaceholder')">
              <el-option key="addBindCard" :label="$t('bindCardList.addBindCard')" value="addBindCard"></el-option>
              <el-option
                v-for="(item,idx) in bandList"
                :key="idx"
                :label="item.bankname"
                :value="item.id"
              >
                <span style="float: left">{{ item.bankname }}</span>
                <span style="float: right; color: #8492a6; font-size: 13px">{{ item.reduce }}</span>
              </el-option>
            </el-select>
          </el-form-item>
          <!--提币-->
          <el-form-item prop="addSelect" v-if="type == 1">
              <el-select class="addList" @change="getTag" v-model="siteForm.addSelect" :placeholder="$t('fundsManagement.withdrawalsPlaceholder')">
                <el-option key="new" :label="$t('fundsManagement.withdrawalsNewAddress')" value="new"></el-option>
                <el-option
                  v-for="(item,idx) in addList"
                  :key="idx"
                  :label="item.label"
                  :value="item.address"
                  >
                  <a :title="item.tag+' - '+item.address">{{item.label}}</a>
                </el-option>
              </el-select>
          </el-form-item>
          <div class="formT" v-if="siteForm.addSelect == 'new' && coin_type === 0">
            <el-form-item class="label" prop="label">
              <el-input type="text" v-model="siteForm.label" auto-complete="off" placeholder="备注标签"></el-input>
            </el-form-item>
            <div class="to"></div>
            <el-form-item class="site" prop="site">
              <el-input type="text" v-model="siteForm.site" auto-complete="off" placeholder="地址"></el-input>
            </el-form-item>
          </div>
          <div class="formTip">
            {{$t('funds.amount')}}
          </div>
          <el-form-item prop="num">
            <el-input v-model.number="siteForm.num" :placeholder="$t('fundsManagement.withdrawalsCon')">
              <template slot="append">{{coin_name}}</template>
            </el-input>
          </el-form-item>
          <div class="formTip">
            {{$t('login.password')}}
          </div>
          <el-form-item prop="payPassword">
            <el-input v-model.number="siteForm.payPassword" :placeholder="$t('tradingCenter.inputPwdPlaceholder')">
            </el-input>
          </el-form-item>
          <div class="formTip">
            <span>{{$t('funds.transactionFee')}}:
              <span v-if="accounts.export_type==0">{{accounts.export_fee}}%</span>
              <span v-if="accounts.export_type==1">{{accounts.export_feeb}}{{coin_name}}</span>
              <span v-if="accounts.export_type==2">{{accounts.export_fee}}% + {{accounts.export_fee}}{{coin_name}}</span>
            </span>
            <span>{{$t('funds.youWillGet')}}:
              <span v-if="accounts.export_type==0">{{siteForm.num*(1 - accounts.export_fee*0.01) || '0.00000000'}}</span>
              <span v-if="accounts.export_type==1">{{siteForm.num?(siteForm.num - accounts.export_feeb):'0.00000000'}}</span>
              <span v-if="accounts.export_type==2">{{(siteForm.num -  accounts.export_feeb - siteForm.num*0.01*accounts.export_fee) || '0.00000000'}}</span>
            </span>
          </div>
          <el-form-item>
            <el-button class="submit" type="primary" @click="siteSubmit()">{{$t('button.submit')}}</el-button>
          </el-form-item>
        </el-form>
      </div>

      <div class="tipsBox">
        <p class="tipsT">{{$t('funds.tips')}}</p>
        <ul class="tipsList">
          <li>
            <p><span class="dot"></span>{{$t('funds.tips3')}}</p>
          </li>
          <li>
            <span class="dot"></span>
            <p>{{$t('funds.tips4a')}}<router-link class="baseColor" to="/fundsManagement/transactionHistory">{{$t('funds.history')}}</router-link>{{$t('funds.tips2b')}}</p>
          </li>
        </ul>
      </div>
    </div>
    <div class="depRbox">
      <div class="depRtitle">
        <div class="titleL">{{$t('funds.Whistory')}}</div>
        <div class="titleR">
          <el-popover
            ref="popover5"
            width="320"
            trigger="click">
            <p>{{$t('funds.mailtip')}} <a href="javascript:;" class="baseColor">{{$t('funds.notReceived')}}</a></p>
          </el-popover>
          <a href="javascript:;" class="baseColor showtip" v-popover:popover5>{{$t('funds.theMail')}} <i class="el-icon-question"></i></a>
          <router-link to="/fundsManagement/transactionHistory" class="more">{{$t('funds.viewAll')}}</router-link>
        </div>
      </div>
      <ul class="depList">
        <li class="depItem" v-for="(it,idx) in historyList" :key="idx">
          <div class="itemL">
            <div class="itemT">
              <div class="nodes">
                <p class="nodeTitle">{{it.status == 0?'确认中':'成功'}}</p>
                <p class="nodeMain">{{it.created_at}}</p>
              </div>
            </div>
            <div class="itemB">
              <div class="nodes">
                <p class="nodeTitle">地址</p>
                <a :title="it.address" class="nodeMain">{{it.address | tooLong}}</a>
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
                <a v-if="coin_name == 'BTC'" :href="'https://blockchain.info/zh-cn/tx/'+it.txid" class="nodeMain linkTo">{{it.txid}}</a>
                <a v-if="coin_name == 'ETH'" :href="'https://etherscan.io/tx/'+it.txid" class="nodeMain linkTo">{{it.txid}}</a>
              </div>
            </div>
          </div>
        </li>

      </ul>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import axios from '../../api/axios'
export default {
  data() {
      return {
        type:'',//0提现 1提币
        coin_id: '',
        coin_name : '',
        restaurants: [],
        state3: '3',
        coin_type:0,
        addList:[],
        changeFlag: false,      //判断进入页面后是否改变过币种
        tipFlag: false,
        tag: "",
        bank:'',
        realCount:'',
        accounts: {
          available: '',
          disabled: '',
          address: '',
          export_min:'',
          export_type:'',
          export_fee:'',
          export_feeb:'',
        },
        siteForm: {
          label: '',
          site: '',
          addSelect:'',
          num: '',
          cardId:'',
          payPassword:''
        },
        historyList: [],
        submitData: {},    //提现信息
        VerCodeFlag: true,
        verCodeTime: 60,
        bandList:[],
      };
    },
    methods: {
      changeActive(data){
        this.type = data;
        var url = '/fundsManagement/withdrawals/'+this.coin_id+'/'+this.type;
        this.$router.push(url)
      },
      getVerificationCode() {     //获取验证码
        var _this = this;
        axios.get('/api/sms/to_user').then(function(res){
            _this.VerCodeFlag = false;
            _this.verCodeTime = 60;
            _this.verCodeTimeStart ();
            _this.phoneForm.smsId = res.data.smsId;
        }).catch(function (res){
            console.log(res);
        });
      },
      verCodeTimeStart (){              //验证码计时器
        var _this = this;
        var timer = setInterval(()=>{
          if(_this.verCodeTime>1){
              _this.verCodeTime--;
          }else{
              clearInterval(timer);
              this.VerCodeFlag = true;
          }
        },1000)
      },
      getAccounts(coin_id) {
        var _this = this;
        axios.get(`/api/accounts/${coin_id}`).then(function(res){
            _this.accounts.available = res.data.available;
            _this.accounts.disabled = res.data.disabled;
            _this.accounts.address = res.data.address;
            _this.accounts.export_min = res.data.export_min;
            _this.accounts.export_fee = res.data.export_fee;
            _this.accounts.export_feeb = res.data.export_feeb;
            _this.accounts.export_type = res.data.export_type;
        }).catch(function (res){
            console.log(res);
        });
      },
      siteSubmit() {
        var _this = this;
        this.$refs['siteForm'].validate((valid) => {
          if (valid) {
            var submitData = {};
            this.submitData.coinId = this.coin_id;
            this.submitData.number = this.siteForm.num;
            this.submitData.pay_password = this.siteForm.payPassword;
            this.submitData.type = this.type*1 + 1;
            if(this.type == 1){
              this.submitData.address = this.bank.reduce;
              this.submitData.tag = this.bank.bankname;
              this.submitData.card_id = this.bank.id;
            }else if(this.type == 0){
              if(this.siteForm.addSelect == 'new'){
                this.submitData.address = this.siteForm.site;
                this.submitData.tag = this.siteForm.label;
                this.submitData.card_id = this.siteForm.label;
              }else{
                this.submitData.address = this.siteForm.addSelect;
                this.submitData.tag = this.tag;
                this.submitData.card_id = this.tag;
              }
            }

            if(this.userInfo.two_factor_auth_type == 'CLOSE'){
              axios.post('/api/accounts/exports',this.submitData).then(function(res){
                _this.submitFin();
              }).catch(function (res){
                  console.log(res);
              });
            }else if(this.userInfo.two_factor_auth_type == 'MOBILE'){
              this.phoneDialog = true;
            }else if(this.userInfo.two_factor_auth_type == 'GOOGLE'){
              this.googleDialog = true;
            }else if(this.userInfo.two_factor_auth_type == 'BOTH'){
              this.doubleDialog = true;
            }

          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      phoneInput(verCode) {             //手机验证
        var _this = this;
        var smsCode = verCode.trim();
        if(smsCode.length == 6){
          var phoneDate = this.submitData;
          phoneDate.smsId = this.phoneForm.smsId;
          phoneDate.smsCode = smsCode;
          axios.post('/api/accounts/exports',phoneDate).then(function(res){
                _this.phoneDialog = false;
                _this.submitFin();
          }).catch(function (res){
              console.log(res);
          });
        }

      },
      googleInput(verCode) {            //谷歌验证
        var _this = this;
        var googleCode = verCode.trim();
        if(googleCode.length == 6){
          var googleDate = this.submitData;
          googleDate.googleCode = googleCode;
          axios.post('/api/accounts/exports',googleDate).then(function(res){
                _this.googleDialog = false;
                _this.submitFin();
          }).catch(function (res){
              console.log(res);
          });
        }
      },
      submitFin() {
          this.$message({
                message: '提现成功',
                type: 'success'
            });
          this.siteForm.label = "";
          this.siteForm.site = "";
          this.siteForm.addSelect = "";
          this.siteForm.cardId="";
          this.siteForm.num = "";
          this.siteForm.payPassword = "";
          this.getWithdrawHistory(this.coin_id)
          this.getAccounts(this.coin_id);
          this.phoneForm.verCode = "";
          this.googleForm.verCode = "";
      },
      changeSelect(value){
        this.coin_id = value;
        var url = '/fundsManagement/withdrawals/'+this.coin_id+'/'+this.type;
        this.$router.push(url);
      },
      tipshow(flag) {
          this.tipFlag = flag;
      },
      getWithdrawHistory(coin_id) {
        var _this = this;
        axios.get(`/api/accounts/exports/${coin_id}`,{
          type:this.type == 0?1:0
        }).then(function(res){
            _this.historyList = res.data;
        }).catch(function (res){
            console.log(res);
        });
      },
      getWithdrawAdd(coin_id) {
        var _this = this;
        axios.get(`/api/accounts/addresses/${coin_id}`).then(function(res){
            res.data.forEach(it => {
                var label = it.tag + " - " +it.address;
                if(label.length > 50){
                    label = label.slice(0,50) + "...";
                }
                it.label = label;
            })
            _this.addList = res.data.slice(0,5);
        }).catch(function (res){
            console.log(res);
        });
      },
      findName(coin_id,type) {
        var _this = this;
        var name;
        var status;
        this.coinList.forEach((it,index)=>{
          if(it.coin_id == coin_id){
            status = it.status;
              name = it.coin_name;
            }
        })
        if(type){
          return status;
        }
        return name;
      },
      getTag(add){
        var _this = this;
        var tag = "";
        this.addList.forEach(it=>{
          if(it.address == add){
            tag = it.tag
          }
        })
        this.tag = tag;
      },
      getTagCurr(add){
        var _this = this;
        if(add === 'addBindCard'){
          this.$router.push({path:'/bindCardForm'});
          return;
        }
        this.bandList.forEach(it=>{
          if(it.id == add){
            this.bank = it;
          }
        });
      },
      card_list(){
        axios.get('/api/user/card_list').then((res)=>{
          this.bandList = res.data;
        })
      },
      init(coin_id,type){
        this.coin_id = coin_id;
        this.type = type;
        this.coin_name = this.findName(this.coin_id);
        this.state3 = this.coin_name;
        this.coin_type = this.findName(this.coin_id,'type');
        if(this.type == 0){//提现
          this.restaurants = [];
          for(var i = 0;i<this.coinList.length;i++){
            if(this.coinList[i].status == 1){
              this.restaurants.push(this.coinList[i])
            }
          }
        }else{//提币
          this.restaurants = this.coinList;
        }
        this.getWithdrawHistory(this.coin_id)
        this.getWithdrawAdd(this.coin_id)
        this.getAccounts(this.coin_id);
        this.card_list();
      }
    },
    computed: {
      ...mapGetters([
          'marketList',
          'coinList',
          'userInfo',
      ]),
      siteFormRules(){
        return {
          addSelect: [{ required: true, message: this.$t('fundsManagement.withdrawalsNowAddress'), trigger: 'change' }],
          label:[{ required: true, message: this.$t('fundsManagement.withdrawalsNote'), trigger: 'blur' }],
          site: [{ required: true, message: this.$t('fundsManagement.withdrawalsAddress'), trigger: 'blur' }],
          num: [{ required: true, message: this.$t('fundsManagement.withdrawalsNum'), trigger: 'blur' }],
          cardId: [
            { required: true, message: this.type==0?'请选择银行卡':'请选择提币地址', trigger: 'change' }
          ],
          payPassword:[{ required: true, message: '请输入交易密码', trigger: 'blur' }]
        }
      }
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
    beforeRouteUpdate(to,from,next){
      this.init(to.params.coin_id,to.params.type)
      next();
    },
    beforeMount(){
      this.init(this.$route.params.coin_id,this.$route.params.type)
    }
}
</script>

<style lang="scss">
.dot.careful{
  background: #D0021B !important;
}

//带选项的input
  .el-form-item.is-error .el-input-group__prepend{
      border-color: #f56c6c;
  }
  .el-form-item.is-success .el-input-group__prepend{
      border-color: #67c23a;
  }
  .el-input-group__prepend{
      width: 10px;
      border: 0;
      border-bottom: 1px solid #dcdfe6;
      border-radius: 0;
      background: #ffffff;
      padding-right: 16px;
      text-indent: 4px;
      .el-input__inner{
          padding-right: 0;
      }
      .el-input__suffix{
          display: none;
      }
  }

  .addList.el-select{
    width: 100%;
  }
.siteBox{
  .siteTitle{
    line-height: 36px;
  }
  .siteTips{
    line-height: 40px;
    color:#999999;
  }
  .siteForm{
    input,.el-button{
      border-radius: 0;
    }
    .formTip{
      line-height: 24px;
      width: 100%;
      display: flex;
      justify-content: space-between;
    }
    .formT{
      display: flex;
      .label{
        width: 120px;
      }
      .to{
        width: 10px;
        height: 1px;
        border-top: 1px solid #979797;
        margin: 20px 6px;;
      }
      .site{
        width: 316px;
      }
    }
    .submit{
      margin-top: 10px;
      width: 100%;
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

<!--&lt;!&ndash; 谷歌认证 &ndash;&gt;-->
<!--<el-dialog-->
  <!--title="谷歌认证"-->
  <!--:visible.sync="googleDialog"-->
  <!--custom-class="baseDialog"-->
  <!--center>-->
  <!--<el-form :model="googleForm" status-icon :rules="googleForm.rules" ref="googleForm" class="googleForm">-->
    <!--<el-form-item label="谷歌验证码" prop="verCode">-->
      <!--<el-input class="inputBase" @input="googleInput(googleForm.verCode)" placeholder="6位动态数字" v-model.number="googleForm.verCode"></el-input>-->
    <!--</el-form-item>-->
  <!--</el-form>-->
  <!--<span slot="footer" class="dialog-footer">-->
            <!--<p class="tips">-->
              <!--如果您遗失了谷歌验证,请 <a href="javascript:;">联系客服</a>-->
            <!--</p>-->
        <!--</span>-->
<!--</el-dialog>-->

<!--&lt;!&ndash; 手机验证 &ndash;&gt;-->
<!--<el-dialog-->
  <!--title="手机验证"-->
  <!--:visible.sync="phoneDialog"-->
  <!--width="30%"-->
  <!--custom-class="baseDialog changePwd"-->
  <!--center>-->
  <!--<el-form :model="phoneForm" status-icon :rules="phoneForm.rules" ref="phoneForm">-->
    <!--<el-form-item label="验证码" class="verCode" prop="verCode">-->
      <!--<el-input class="inputBase" @input="phoneInput(phoneForm.verCode)" placeholder="请输入短信验证码" v-model="phoneForm.verCode" auto-complete="off"></el-input>-->
      <!--<a class="verBtn" v-show="VerCodeFlag" href="javascript:;" @click="getVerificationCode()">{{$t('Dialog.sendSMS')}}</a>-->
      <!--<span class="verBtn" v-show="!VerCodeFlag">{{verCodeTime}} S</span>-->
    <!--</el-form-item>-->
  <!--</el-form>-->
  <!--<span slot="footer" class="dialog-footer">-->
            <!--<p class="tips">-->
              <!--如果您遗失了手机或无法收到验证码,请 <a href="javascript:;">联系客服</a>-->
            <!--</p>-->
        <!--</span>-->
<!--</el-dialog>-->
<!--&lt;!&ndash; 双重验证 &ndash;&gt;-->
<!--<el-dialog-->
  <!--title="双重验证"-->
  <!--:visible.sync="doubleDialog"-->
  <!--custom-class="baseDialog"-->
  <!--center>-->
  <!--<ul class="doubleSelect">-->
    <!--<li :class="doubleSelect == 1?'active':''" @click="doubleSelect = 1">谷歌验证</li>-->
    <!--<li :class="doubleSelect == 2?'active':''" @click="doubleSelect = 2">手机验证</li>-->
  <!--</ul>-->

  <!--<el-form v-show="doubleSelect == 1" :model="googleForm" status-icon :rules="googleForm.rules" ref="googleForm">-->
    <!--<el-form-item label="谷歌验证码" class="verCode" prop="verCode">-->
      <!--<el-input class="inputBase" @input="googleLogin(googleForm.verCode)" placeholder="请输入谷歌验证码" v-model="googleForm.verCode" auto-complete="off"></el-input>-->
    <!--</el-form-item>-->
  <!--</el-form>-->
  <!--<el-form v-show="doubleSelect == 2" :model="phoneForm" status-icon :rules="phoneForm.rules" ref="phoneForm">-->
    <!--<el-form-item label="验证码" class="verCode" prop="verCode">-->
      <!--<el-input class="inputBase" @input="phoneInput(phoneForm.verCode)"  placeholder="请输入短信验证码" v-model="phoneForm.verCode" auto-complete="off"></el-input>-->
      <!--<a class="verBtn" v-show="VerCodeFlag" href="javascript:;" @click="getVerificationCode()">{{$t('Dialog.sendSMS')}}</a>-->
      <!--<span class="verBtn" v-show="!VerCodeFlag">{{verCodeTime}} S</span>-->
    <!--</el-form-item>-->
  <!--</el-form>-->
  <!--<span slot="footer" class="dialog-footer">-->
          <!--<p v-show="doubleSelect == 1" class="tips">-->
            <!--如果您遗失了谷歌验证,请 <a href="javascript:;">联系客服</a>-->
          <!--</p>-->
          <!--<p v-show="doubleSelect == 2" class="tips">-->
            <!--如果您遗失了手机或无法收到验证码,请 <a href="javascript:;">联系客服</a>-->
          <!--</p>-->
        <!--</span>-->
<!--</el-dialog>-->
