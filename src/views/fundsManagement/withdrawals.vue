<template>
  <div class="depositsBox">
    <p class="title">
      {{$t('route.withdrawals')}}
    </p>

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
            
            <p class="careful"><span class="dot careful"></span>{{$t('funds.importantTip1')}}8.4{{coin_name}}</p>
          </li>
          <li>
            
            <p class="careful"><span class="dot careful"></span>{{$t('funds.importantTip2')}}</p>
          </li>
        </ul>
      </div>

      <div class="siteBox">
        <p class="siteTitle">{{coin_name+$t('funds.withdrawalAddress')}}</p>
        <p class="siteTips">请在下方输入本次提现地址</p>
        <el-form :model="siteForm" status-icon :rules="siteForm.rules" ref="siteForm" class="siteForm">
          <el-form-item prop="addSelect">
              <el-select class="addList" @change="getTag" v-model="siteForm.addSelect" placeholder="请选择">
                <el-option key="new" label="新地址" value="new"></el-option>
                <el-option
                  v-for="item in addList"
                  :key="item.address"
                  :label="item.address"
                  :value="item.address">
                </el-option>
              </el-select>
          </el-form-item>
          <div class="formT" v-if="siteForm.addSelect == 'new'">
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
            <el-input v-model.number="siteForm.num" placeholder="请输入内容">
              <template slot="append">{{coin_name}}</template>
            </el-input>
          </el-form-item>
          <div class="formTip">
            <span>{{$t('funds.transactionFee')}}:  0.00000000</span>
            <span>{{$t('funds.youWillGet')}}:  0.00000000</span>
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

    <!-- 谷歌认证 -->
    <el-dialog
        title="谷歌认证"
        :visible.sync="googleDialog"
        custom-class="baseDialog"
        center>
        <el-form :model="googleForm" status-icon :rules="googleForm.rules" ref="googleForm" class="googleForm">
            <!-- <el-form-item label="登录密码" prop="pwd">
                <el-input class="inputBase" type="password" placeholder="请输入登录密码" v-model="googleForm.pwd" auto-complete="off"></el-input>
            </el-form-item> -->
            <el-form-item label="谷歌验证码" prop="verCode">
                <el-input class="inputBase" @input="googleInput(googleForm.verCode)" placeholder="6位动态数字" v-model.number="googleForm.verCode"></el-input>
            </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
            <!-- <el-button class="btnBase" type="primary" size="mini" @click="googleDialog = false">确认</el-button> -->
            <p class="tips">
              如果您遗失了谷歌验证,请 <a href="javascript:;">联系客服</a>
            </p>
        </span>
    </el-dialog>

    <!-- 手机验证 -->
    <el-dialog
        title="手机验证"
        :visible.sync="phoneDialog"
        width="30%"
        custom-class="baseDialog changePwd"
        center>
        <el-form :model="phoneForm" status-icon :rules="phoneForm.rules" ref="phoneForm">
            <!-- <el-form-item label="您的手机号" prop="phone">
                <el-input placeholder="(仅限中国大陆)" v-model="phoneForm.phone" type="tel" auto-complete="off" class="inputBase input-with-select">
                    <el-select v-model="phoneForm.select" slot="prepend" placeholder="请选择">
                    <el-option label="+86" value="+86"></el-option>
                    <el-option label="+88" value="+88"></el-option>
                    <el-option label="+89" value="+89"></el-option>
                    </el-select>
                </el-input>
            </el-form-item> -->
            <el-form-item label="验证码" class="verCode" prop="verCode">
                <el-input class="inputBase" @input="phoneInput(phoneForm.verCode)" placeholder="请输入短信验证码" v-model="phoneForm.verCode" auto-complete="off"></el-input>
                <a class="verBtn" v-show="VerCodeFlag" href="javascript:;" @click="getVerificationCode()">{{$t('Dialog.sendSMS')}}</a>
                <span class="verBtn" v-show="!VerCodeFlag">{{verCodeTime}} S</span>
            </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
            <!-- <el-button type="primary" size="mini" @click="phoneDialog = false">确认</el-button> -->
            <p class="tips">
              如果您遗失了手机或无法收到验证码,请 <a href="javascript:;">联系客服</a>
            </p>
        </span>
    </el-dialog>

    <!-- 双重验证 -->
    <el-dialog
        title="双重验证"
        :visible.sync="doubleDialog"
        custom-class="baseDialog"
        center>
        <ul class="doubleSelect">
          <li :class="doubleSelect == 1?'active':''" @click="doubleSelect = 1">谷歌验证</li>
          <li :class="doubleSelect == 2?'active':''" @click="doubleSelect = 2">手机验证</li>
        </ul>

        <el-form v-show="doubleSelect == 1" :model="googleForm" status-icon :rules="googleForm.rules" ref="googleForm">
            <el-form-item label="谷歌验证码" class="verCode" prop="verCode">
                <el-input class="inputBase" @input="googleLogin(googleForm.verCode)" placeholder="请输入谷歌验证码" v-model="googleForm.verCode" auto-complete="off"></el-input>
                <!-- <a class="verBtn" href="javascript:;">获取</a> -->
            </el-form-item>
        </el-form>
        <el-form v-show="doubleSelect == 2" :model="phoneForm" status-icon :rules="phoneForm.rules" ref="phoneForm">
            <el-form-item label="验证码" class="verCode" prop="verCode">
                <el-input class="inputBase" @input="phoneInput(phoneForm.verCode)"  placeholder="请输入短信验证码" v-model="phoneForm.verCode" auto-complete="off"></el-input>
                <a class="verBtn" v-show="VerCodeFlag" href="javascript:;" @click="getVerificationCode()">{{$t('Dialog.sendSMS')}}</a>
                <span class="verBtn" v-show="!VerCodeFlag">{{verCodeTime}} S</span>
            </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <p v-show="doubleSelect == 1" class="tips">
            如果您遗失了谷歌验证,请 <a href="javascript:;">联系客服</a>
          </p>
          <p v-show="doubleSelect == 2" class="tips">
            如果您遗失了手机或无法收到验证码,请 <a href="javascript:;">联系客服</a>
          </p>
        </span>
    </el-dialog>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import axios from '../../api/axios'
export default {
  data() {
      return {
        coin_id: '',
        coin_name : '',
        restaurants: [],
        state3: '3',
        addList:[],
        changeFlag: false,      //判断进入页面后是否改变过币种
        tipFlag: false,
        tag: "",
        accounts: {
          available: '',
          disabled: '',
          address: ''
        },
        siteForm: {
          label: '',
          site: '',
          addSelect:'',
          num: '',
          rules:{ 
            addSelect: [{ required: true, message: '请选择提现地址', trigger: 'change' }],
            label:[{ required: true, message: '请输入备注', trigger: 'blur' }],
            site: [{ required: true, message: '请输入提现地址', trigger: 'blur' }],
            num: [{ required: true, message: '请输入提现数量', trigger: 'blur' }]
          }
        },
        googleDialog: false,
        googleForm: {      //谷歌认证
            pwd: "",
            verCode: "",
            rules: {
              pwd:[{ required: true, message: '请输入密码', trigger: 'blur' }],
              verCode:[{ required: true,min: 6, max: 6, message: '请输入6位动态数字', trigger: 'blur' }],
          }
        },
        phoneDialog: false,
        phoneForm: {      //手机验证
          phone: "",
          verCode: "",
          select: "+86",
          rules: {
            phone:[{ required: true, message: '请输入手机号', trigger: 'blur' }],
            verCode:[{ required: true, message: '请输入验证码', trigger: 'blur' }],
          }
        },
        doubleDialog: false,
        doubleSelect: 1,
        historyList: [],
        submitData: {},    //提现信息
        VerCodeFlag: true,
        verCodeTime: 60,
      };
    },
    methods: {
      getVerificationCode() {     //获取验证码
        var _this = this;
        axios.get('/api/sms/to_user').then(function(res){  
            console.log(res);
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
            console.log(res);
            _this.accounts.available = res.data.available;
            _this.accounts.disabled = res.data.disabled;
            _this.accounts.address = res.data.address;
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
            if(this.siteForm.addSelect == 'new'){
              this.submitData.address = this.siteForm.site
            }else{
              this.submitData.address = this.siteForm.addSelect
            }
            if(this.tag != ''){
              this.submitData.tag = this.tag;
            }
            // console.log(this.submitData)
            if(this.userInfo.two_factor_auth_type == 'CLOSE'){
              axios.post('/api/accounts/exports',this.submitData).then(function(res){  
                console.log(res)
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
                console.log(res)
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
                console.log(res)
                _this.googleDialog = false;
                _this.submitFin();
          }).catch(function (res){  
              console.log(res);
          }); 
        }
      },
      submitFin() {
          this.siteForm.label = "";
          this.siteForm.site = "";
          this.siteForm.addSelect = "";
          this.siteForm.num = "";
          this.getWithdrawHistory(this.coin_id)
          this.getAccounts(this.coin_id);
          this.phoneForm.verCode = "";
          this.googleForm.verCode = "";
      },
      changeSelect(value){
        this.changeFlag = true;   //改变过币
        this.coin_id = value;
        var name = this.findName(value)
        this.coin_name = name;
        console.log(name)
        this.getWithdrawHistory(value);
        this.getWithdrawAdd(value);
        this.getAccounts(value);
      },
      tipshow(flag) {
          //console.log(flag)
          this.tipFlag = flag;
      },
      getWithdrawHistory(coin_id) {
        var _this = this;
        axios.get(`/api/accounts/exports/${coin_id}`).then(function(res){  
            console.log(res);
            _this.historyList = res.data;
        }).catch(function (res){  
            console.log(res);
        }); 
      },
      getWithdrawAdd(coin_id) {
        var _this = this;
        axios.get(`/api/accounts/addresses/${coin_id}`).then(function(res){  
            console.log(res);
            _this.addList = res.data;
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
      getTag(add){
        var _this = this;
        var tag = "";
        this.addList.forEach(it=>{
        if(it.address == add){
            tag = it.tag
          }
        })
        this.tag = tag;
      }
    },
    computed: {
      ...mapGetters([
          'marketList',
          'coinList',
          'userInfo',
      ])
    },
    beforeMount() {
      this.coin_id = this.$route.params.coin_id;
      this.coin_name = this.findName(this.coin_id);
      this.state3 = this.coin_name;
      this.restaurants = this.coinList;
      this.getWithdrawHistory(this.coin_id)
      this.getWithdrawAdd(this.coin_id)
      this.getAccounts(this.coin_id);
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