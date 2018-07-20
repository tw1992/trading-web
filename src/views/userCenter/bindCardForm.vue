<template>
  <div class="accBox">
    <p class="topTip">{{$t('user.recommendations')}}</p>
    <div class="autTop">
      <router-link to="/userCenter/account"><i class="el-icon-d-arrow-left"></i></router-link>
      <p class="topTitle">{{$t('bindCardList.bindCard')}}</p>
    </div>
    <div class="bindCardForm">
      <el-form label-position="left" label-width="80px" :model="formLabelAlign" :rules="rules" ref="formLabelAlign">
        <el-form-item :label="$t('bindCardForm.name')" prop="name">
          <el-input v-model="formLabelAlign.name" :placeholder="$t('bindCardForm.namePlaceholder')"></el-input>
        </el-form-item>
        <el-form-item :label="$t('bindCardForm.usercard')" prop="usercard">
          <el-input v-model="formLabelAlign.usercard" :placeholder="$t('bindCardForm.idCardPlaceholder')"></el-input>
        </el-form-item>
        <el-form-item :label="$t('bindCardForm.bandNum')" prop="bankcard">
          <el-input v-model="formLabelAlign.bankcard" :placeholder="$t('bindCardForm.bandNumPlaceholder')"></el-input>
        </el-form-item>
        <el-form-item :label="$t('bindCardForm.phone')" prop="phone">
          <el-input v-model="formLabelAlign.phone" :placeholder="$t('bindCardForm.phonePlaceholder')"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">{{$t('bindCardList.bindCard')}}</el-button>
        </el-form-item>
      </el-form>
    </div>
    <!-- 谷歌认证 -->
    <el-dialog
      title="谷歌认证"
      :visible.sync="googleDialog"
      custom-class="baseDialog"
      center>
      <el-form :model="googleForm" status-icon :rules="googleForm.rules" ref="googleForm" class="googleForm">
        <el-form-item label="谷歌验证码" prop="verCode">
          <el-input class="inputBase" @input="googleInput(googleForm.verCode)" placeholder="6位动态数字" v-model.number="googleForm.verCode"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
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
        <el-form-item label="验证码" class="verCode" prop="verCode">
          <el-input class="inputBase" @input="phoneInput(phoneForm.verCode)" placeholder="请输入短信验证码" v-model="phoneForm.verCode" auto-complete="off"></el-input>
          <a class="verBtn" v-show="VerCodeFlag" href="javascript:;" @click="getVerificationCode()">{{$t('Dialog.sendSMS')}}</a>
          <span class="verBtn" v-show="!VerCodeFlag">{{verCodeTime}} S</span>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
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
  export default{
    computed:{
      ...mapGetters([
        'userInfo',
      ]),
      rules(){
        var validatePhone = (rule, value, callback) => {
          if (value === '') {
            callback(new Error(this.$t('bindCardForm.phonePlaceholder')));
          } else {
            var reg=new RegExp(/(^1[3|4|5|6|7|8|9]\d{9}$)|(^09\d{8}$)/);
            if (!reg.test(value)) {
              callback(new Error(this.$t('bindCardForm.phoneTip')));
            }
          }
          callback();
        };
        return {
          name: [{ required: true, message: this.$t('bindCardForm.namePlaceholder'), trigger: 'blur' }],
          usercard: [{ required: true, message: this.$t('bindCardForm.idCardPlaceholder'), trigger: 'blur' }],
          bankcard: [{ required: true, message: this.$t('bindCardForm.bandNumPlaceholder'), trigger: 'blur' }],
          phone: [{ required: true, validator:validatePhone, trigger: 'blur' }],
        }
      },
    },
    data(){
      return {
          formLabelAlign: {
            name: '',
            usercard: '',
            bankcard: '',
            phone: ''
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
          VerCodeFlag: true,
          verCodeTime: 60,
      }
    },
    methods:{
      onSubmit(){
        var _this = this;
        this.$refs['formLabelAlign'].validate((valid) => {
          if (valid) {
            if(this.userInfo.two_factor_auth_type == 'CLOSE'){
              _this.submitFin(_this.formLabelAlign);
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
      phoneInput(verCode) {             //手机验证
        var _this = this;
        var smsCode = verCode.trim();
        if(smsCode.length == 6){
          var phoneDate = this.formLabelAlign;
          phoneDate.smsId = this.phoneForm.smsId;
          phoneDate.smsCode = smsCode;
          _this.submitFin(phoneDate);
        }

      },
      googleInput(verCode) {            //谷歌验证
        var _this = this;
        var googleCode = verCode.trim();
        if(googleCode.length == 6){
          var googleDate = this.formLabelAlign;
          googleDate.googleCode = googleCode;
          _this.submitFin(googleDate);
        }
      },
      submitFin(data){
        var that = this;
        axios.post('/api/user/card',data).then(function(res){
          console.log(res)
          that.phoneDialog = false;
          that.googleDialog = false;
          that.doubleDialog = false;
          that.phoneForm.verCode = '';
          that.phoneForm.phone = '';
          that.googleForm.verCode = '';
          that.googleForm.pwd = '';
          that.formLabelAlign.name = '';
          that.formLabelAlign.usercard = '';
          that.formLabelAlign.bankcard = '';
          that.formLabelAlign.phone = '';
          that.$router.push({'path':'/bindCardList'})
        })
      }
    }
  }
</script>
<style lang='scss'>
  .accBox {
    width: 1200px;
    margin: auto;
    color: #4a4a4a;
  .topTip {
    height: 40px;
    line-height: 40px;
    background: #f6e7b2;
    color: #d79528;
    box-sizing: border-box;
    padding: 0 30px;
    margin: 20px 0 40px;
  }
  .autTop{
    display: flex;
    line-height: 40px;
    font-size: 18px;
    border-bottom: 1px solid #cccccc;
  a{
    color: #333333;
    margin-right: 14px;
  }
  }
  .bindCardForm{
    margin-top: 30px;
    width: 400px;
  .el-button.el-button--primary{
    width: 100%;
  }
  }
  }
</style>
