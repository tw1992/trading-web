<template>
    <div class="accBox">
        <p class="topTip">{{$t('user.recommendations')}}</p>
        <div class="emailBox">
            <div class="email">
                <p class="name">{{userInfo.email}}</p>
                <p class="lastLogin">
                    <span class="time">{{$t('user.LastloginTime')}}: {{tableData[0]?tableData[0].time:""}}</span>
                    <span class="IP">IP: {{tableData[0]?tableData[0].ip:""}}</span>
                </p>
                <p class="UID">UID: {{userInfo.id}}</p>
            </div>
            <div class="attest">
                <router-link class="toattest" to="/autonym" v-if="userInfo.is_human_validated == 0">{{$t('user.unverified')}}&nbsp;&nbsp;&nbsp;<i class="el-icon-d-arrow-right"></i></router-link>
                <a v-if="userInfo.is_human_validated == 1" class="toattest" style="color:#3ABC56">已实名认证</a>
                <a v-if="userInfo.is_human_validated == 2" class="toattest">实名认证审核中</a>
                <router-link v-if="userInfo.is_human_validated == 3" class="toattest" to="/autonym">实名认证失败，请重新实名认证&nbsp;&nbsp;&nbsp;<i class="el-icon-d-arrow-right"></i></router-link>
            </div>
        </div>
        <div class="otherBox">
            <div class="otherT">
                <div class="passBox itemBox">
                    <div class="boxL">
                        <p class="titles">
                            <i class="iconfont icon-suozi"></i>
                            <span class="title">{{$t('user.loginPassword')}}</span>
                        </p>
                        <p class="tips" style="font-size:16px;">
                            * * * * * *
                        </p>
                    </div>
                    <div class="boxR">
                        <el-button type="primary" @click="changePwdDialog = true">{{$t('user.change')}}</el-button>
                    </div>

                </div>
                <div class="phoneBox itemBox">
                    <div class="boxL">
                        <p class="titles">
                            <i class="iconfont icon-shouji"></i>
                            <span class="title">{{$t('user.SMSAuthentication')}}</span>
                        </p>
                        <p class="tips">
                        {{$t('user.SMStips')}}
                        </p>
                    </div>
                    <div class="boxR" style="padding-right:40px;">
                        <div class="switchBtn" @click="switchClick('phoneFlag')"></div>
                        <el-switch
                        v-model="phoneFlag"
                        active-color="#3ABC56"
                        inactive-color="#CCCCCC">
                        </el-switch>
                        <!-- <el-button type="primary" @click="switchClick('phoneFlag')">{{phoneFlag?$t('user.close'):$t('user.enable')}}</el-button> -->
                    </div>
                </div>
            </div>
            <div class="otherB">
                <div class="APIBox itemBox">
                        <div class="boxL">
                            <p class="titles">
                                <i class="iconfont icon-APIwendang"></i>
                                <span class="title">API</span>
                            </p>
                            <p class="tips">
                               {{$t('user.APItips')}}
                            </p>
                        </div>
                        <div class="boxR">
                            <el-button disabled type="primary">{{$t('user.enable')}}</el-button>
                        </div>
                </div>
                <div class="GoogleBox itemBox">
                        <div class="boxL">
                            <p class="titles">
                                <i class="googleLogo"></i>
                                <span class="title">{{$t('user.GoogleAuthentication')}}</span>
                            </p>
                            <p class="tips">
                                {{$t('user.Googletips')}}
                            </p>
                        </div>
                        <div class="boxR" style="padding-right:40px;">
                            <div class="switchBtn" @click="switchClick('googleFlag')"></div>
                            <el-switch
                            @change="googleClick"
                            v-model="googleFlag"
                            active-color="#3ABC56"
                            inactive-color="#CCCCCC">
                            </el-switch>
                        </div>
                </div>
            </div>
            <div class="otherB">
              <div class="APIBox itemBox">
                <div class="boxL">
                  <p class="titles">
                    <i class="iconfont icon-card"></i>
                    <span class="title">{{$t('account.card')}}</span>
                  </p>
                  <p class="tips">
                    {{$t('account.cardTip1')}}
                  </p>
                </div>
                <div class="boxR">
                  <el-button type="primary" @click="bindCard">{{$t('account.bind')}}</el-button>
                </div>
              </div>
            </div>
        </div>

        <div class="tableBox">
                <p class="tabTip">{{$t('user.distribution')}}</p>
                <el-table
                :data="tableData"
                class="latelyTab"
                style="width: 100%">
                <span slot="empty">{{$t('home.noData')}}</span>
                <el-table-column
                prop="time"
                :label="$t('user.date')"
                class-name="firstCol">
                </el-table-column>
                <el-table-column
                prop="ip"
                :label="$t('tradingCenter.type')">
                </el-table-column>
                <el-table-column
                prop="time"
                :label="$t('tradingCenter.coin')">
                </el-table-column>
                <el-table-column
                prop="address"
                :label="$t('tradingCenter.amount')">
                </el-table-column>
                <el-table-column
                prop="address"
                :label="$t('user.note')">
                </el-table-column>
            </el-table>
        </div>

        <div class="tableBox">
                <p class="tabTip">{{$t('user.lastlogin')}}</p>
                <el-table
                :data="tableData"
                class="latelyTab"
                style="width: 100%">
                <span slot="empty">{{$t('home.noData')}}</span>
                <el-table-column
                prop="time"
                :label="$t('user.date')"
                class-name="firstCol">
                </el-table-column>
                <el-table-column
                prop="ip"
                label="IP">
                </el-table-column>
                <el-table-column
                prop="address"
                :label="$t('user.Location')">
                </el-table-column>
            </el-table>
        </div>

        <!-- 修改密码 -->
        <el-dialog
            :title="$t('Dialog.modifyPassword')"
            :visible.sync="changePwdDialog"
            width="30%"
            custom-class="baseDialog changePwd"
            center>
            <el-form :model="changePwdForm" status-icon :rules="changePwdFormRules" ref="changePwdForm">
                <el-form-item :label="$t('Dialog.oldPassword')" prop="pwd1">
                    <el-input class="inputBase" type="password" :placeholder="$t('account.oldPwd')" v-model="changePwdForm.pwd1" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item :label="$t('Dialog.newPassword')" prop="newpwd1">
                    <el-input class="inputBase" type="password" :placeholder="$t('account.pwdTip')" v-model="changePwdForm.newpwd1" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item :label="$t('Dialog.confirmPassword')" prop="newpwd2">
                    <el-input class="inputBase" type="password" :placeholder="$t('account.newPwdRe')" v-model="changePwdForm.newpwd2" auto-complete="off"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button type="primary" size="mini" @click="changePwd()">{{$t('Dialog.confirm')}}</el-button>
            </span>
        </el-dialog>

        <!-- 开启/解除 手机验证 -->
        <el-dialog
            :title="(phoneFlag?$t('Dialog.disable'):$t('Dialog.open')) + $t('Dialog.SMSAuthentication')"
            :visible.sync="phoneDialog"
            width="30%"
            custom-class="baseDialog changePwd"
            center>
            <el-form :model="phoneForm" status-icon :rules="phoneFormRules" ref="phoneForm">
                <el-form-item :label="$t('Dialog.loginPassword')" prop="pwd">
                    <el-input class="inputBase" type="password" :placeholder="$t('account.loginPwd')" v-model="phoneForm.pwd" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item v-if="!phoneFlag" :label="$t('Dialog.phoneNumber')" prop="phone">
                    <el-input :placeholder="$t('account.limitCountry')" v-model="phoneForm.phone" type="tel" auto-complete="off" class="inputBase input-with-select">
                        <el-select :disabled="true" v-model="phoneForm.select" slot="prepend" placeholder="请选择">
                        <el-option label="+86" value="+86"></el-option>
                        <!-- <el-option label="+88" value="+88"></el-option>
                        <el-option label="+89" value="+89"></el-option> -->
                        </el-select>
                    </el-input>
                </el-form-item>
                <el-form-item :label="$t('Dialog.SMSAuthenticationCode')" class="verCode" prop="verCode">
                    <el-input class="inputBase" :placeholder="$t('Dialog.SMSCode')" v-model="phoneForm.verCode" auto-complete="off"></el-input>
                    <a class="verBtn" v-show="VerCodeFlag&&!phoneFlag" href="javascript:;" @click="getVerificationCode(phoneForm.phone)">{{$t('Dialog.sendSMS')}}</a>
                    <a class="verBtn" v-show="VerCodeFlag&&phoneFlag" href="javascript:;" @click="getTheVerificationCode()">{{$t('Dialog.sendSMS')}}</a>
                    <span class="verBtn" v-show="!VerCodeFlag">{{verCodeTime}} S</span>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button v-if="!phoneFlag" type="primary" size="mini" @click="openSMS()">{{$t('Dialog.confirm')}}</el-button>
                <el-button v-if="phoneFlag" type="primary" size="mini" @click="disableSMS()">{{$t('Dialog.confirm')}}</el-button>
            </span>
        </el-dialog>

        <!-- 开启谷歌验证 -->
        <el-dialog
            :title="$t('Dialog.enableGoogleAuthentication')"
            :visible.sync="googleAddDialog"
            width="30%"
            custom-class="baseDialog"
            center>
            <div class="flexBox">
                <a href="javascript:;"><img src="../../assets/img/google.png"></a>
                <p class="tips">{{$t('account.googleTip1')}}</p>
                <p class="tips">{{$t('account.googleTip2')}}</p>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button type="primary" size="mini" @click="googleStart()">{{$t('Dialog.begin')}}</el-button>
            </span>
        </el-dialog>

        <!-- 解除谷歌验证 -->
        <el-dialog
            :title="$t('account.comfirmGoole')"
            :visible.sync="googleDelDialog"
            width="30%"
            custom-class="baseDialog"
            center>
            <el-form :model="googleDelForm" status-icon :rules="googleDelFormRules" ref="googleDelForm" class="googleDelForm">
                <el-form-item :label="$t('user.loginPassword')" prop="pwd">
                    <el-input class="inputBase" type="password" :placeholder="$t('account.loginPwd')" v-model="googleDelForm.pwd" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item :label="$t('Dialog.googleAuthenticationCode')" prop="verCode">
                    <el-input class="inputBase" placeholder="$t('Dialog.dynamicPwd')" v-model="googleDelForm.verCode"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button class="btnBase" type="primary" size="mini" @click="disableGoogle()">{{$t('Dialog.confirm')}}</el-button>
            </span>
        </el-dialog>

        <!-- 风险提示 -->
        <el-dialog
            :title="$t('Dialog.riskwarning')"
            :show-close = "false"
            :visible.sync="riskDialog"
            width="30%"
            :close-on-click-modal="false"
            custom-class="baseDialog riskwarning"
            class="right"
            center>
            <div class="flexBox">
                <p class="tips">{{$t('Dialog.riskwarningtip1')}}</p>
                <p class="tips">{{$t('Dialog.riskwarningtip2')}}</p>
                <div class="startBox">
                    <a href="javascript:;" @click="riskDialog = false;googleAddDialog = true"><img src="../../assets/img/google.png"></a>
                    <a href="javascript:;" @click="riskDialog = false;phoneDialog = true"><img src="../../assets/img/phone.png"></a>
                </div>
            </div>
            <span slot="footer" class="dialog-footer">
                <span class="tips">{{$t('Dialog.understand')}}</span>
                <el-button :style="{fontSize:'12px'}" type="primary" size="mini" @click="riskDialog = false">{{$t('Dialog.skipfornow')}}</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
import axios from '../../api/axios'
import { isPoneAvailable,isPassword } from '../../utils/common'
export default {
  data() {
    return {
      phoneFlag: false,
      googleFlag: false,
      googleAddDialog: false,
      phoneDialog: false,
      changePwdDialog: false,
      googleDelDialog: false,
      riskDialog: false,        //风险提示
      VerCodeFlag: true,
      verCodeTime: 60,
      bindList:[],
      googleDelForm: {      //解除谷歌验证
          pwd: "",
          verCode: "",
      },
      changePwdForm: {  //修改密码
          pwd1: "",
          newpwd1: "",
          newpwd2: "",
      },
      phoneForm: {      // 开启/解除 手机验证
          pwd: "",
          phone: "",
          verCode: "",
          select: "+86",
          smsId: "",
      },
      tableData: [],            //登录历史

    };
  },
  methods: {
      bindCard(){
        if(this.bindList.length == 0){
          this.$router.push({path:'/bindCardList'})
        }else{
          this.$router.push({path:'/bindCardForm'})
        }
      },
      googleClick(eve) {
          console.log(eve);
          if(eve){
              this.googleAddDialog =true;
          }
          return false;
        // if(this.googleFlag == true){
        //
        // }

      },
      googleStart() {
        this.$router.push("/attestation")
      },
      switchClick(target) {     //判断swich显示对应弹窗
        var flag = this[target];
        if(target == 'phoneFlag'){
            if(flag){
                this.phoneDialog = true;
            }else{
                this.phoneDialog = true;
            }
        }else if(target == 'googleFlag'){
            if(flag){
                this.googleDelDialog = true;
            }else{
                this.googleAddDialog = true;
            }
        }
      },
      getVerificationCode(mobile) {     //获取验证码
            var _this = this;
            if(isPoneAvailable(mobile)){
                axios.get(`/api/sms/to_mobile/${mobile}`).then(function(res){
                    console.log(res);
                    _this.VerCodeFlag = false;
                    _this.verCodeTime = 60;
                    _this.verCodeTimeStart ();
                    _this.phoneForm.smsId = res.data.smsId;
                }).catch(function (res){
                    console.log(res);
                });
            }else{
                this.$message({
                    message: '请填写正确的手机号码',
                    type: 'warning'
                    });
            }
      },
      getTheVerificationCode() {     //获取指定手机验证码
            var _this = this;
            axios.get(`/api/sms/to_user`).then(function(res){
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
      openSMS() {                       //开启手机验证
        var _this = this;
        this.$refs['phoneForm'].validate((valid) => {
          if (valid) {
            axios.post('/api/user/mobile',{
                password: this.phoneForm.pwd,
                smsId: this.phoneForm.smsId,
                smsCode: this.phoneForm.verCode
            }).then(function(res){
                console.log(res)
                _this.initInput();
                _this.$store.dispatch('getUserInfo');
                _this.phoneDialog = false;
                _this.phoneFlag = true;
            }).catch(function (res){
                _this.initInput();
                console.log(res);
            });
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      disableSMS() {                    //解除手机验证
        var _this = this;
        this.$refs['phoneForm'].validate((valid) => {
          if (valid) {
            axios.del('/api/user/mobile',{
                password: this.phoneForm.pwd,
                smsId: this.phoneForm.smsId,
                smsCode: this.phoneForm.verCode
            }).then(function(res){
                _this.initInput();
                console.log(res)
                _this.$store.dispatch('getUserInfo');
                _this.phoneDialog = false;
                _this.phoneFlag = false;
            }).catch(function (res){
                _this.initInput();
                console.log(res);
            });
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      disableGoogle() {                 //解除谷歌验证
        var _this = this;
        this.$refs['googleDelForm'].validate((valid) => {
          if (valid) {
            axios.del('/api/user/google_authenticator',{
                password: this.googleDelForm.pwd,
                googleCode: this.googleDelForm.verCode
            }).then(function(res){
                _this.initInput();
                _this.$store.dispatch('getUserInfo');
                _this.googleDelDialog = false;
                _this.googleFlag = false;
            }).catch(function (res){
                _this.initInput();
                console.log(res);
            });
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      changePwd() {                     //修改密码
        var _this = this;
        this.$refs['changePwdForm'].validate((valid) => {
          if (valid) {
            axios.post('/api/user/password_update',{
                password: this.changePwdForm.pwd1,
                newPassword: this.changePwdForm.newpwd1,
            }).then(function(res){
                _this.initInput();
                console.log(res)
                _this.changePwdDialog = false;
                _this.$store.dispatch('changeLogOut');
                this.$message({
                    message: '修改成功',
                    type: 'success'
                    });
            }).catch(function (res){
                _this.initInput();
                console.log(res);
            });
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      initInput() {             //重置input
        this.googleDelForm.pwd = '';
        this.googleDelForm.verCode = '';
        this.changePwdForm.pwd1 = '';
        this.changePwdForm.newpwd1 = '';
        this.changePwdForm.newpwd2 = '';
        this.phoneForm.pwd = '';
        this.phoneForm.phone = '';
        this.phoneForm.verCode = '';
      }
    },
    computed: {
        ...mapGetters([
            'email',
            'token',
            'userInfo',
        ]),
      googleDelFormRules(){
        var valiVer = (rule, value, callback) => {
          if (value === '') {
            callback(new Error(this.$t('login.code')));
          } else if (value.length != 6) {
            callback(new Error(this.$t('login.codeTip')));
          } else {
            callback();
          }
        };
          return {
            pwd:[{ required: true, message: this.$t('login.pwd'), trigger: 'blur' }],
            verCode:[{ validator: valiVer, trigger: 'blur' }],
          }
      },
      changePwdFormRules(){
        var validatePass = (rule, value, callback) => {
          if (!isPassword(value)) {
            callback(new Error(this.$t('account.newPwdTip')));
          } else {
            if (this.changePwdForm.newpwd2 !== '') {
              this.$refs.changePwdForm.validateField('newpwd2');
            }
            callback();
          }
        };
        var validatePass2 = (rule, value, callback) => {
          if (value === '') {
            callback(new Error(this.$t('login.inputPwd')));
          } else if (value !== this.changePwdForm.newpwd1) {
            callback(new Error(this.$t('login.marchPwd')));
          } else {
            callback();
          }
        };
          return {
            pwd1:[{ required: true, message: this.$t('login.pwd'), trigger: 'blur' }],
            newpwd1:[{ validator: validatePass, trigger: 'blur' }],
            newpwd2:[{ validator: validatePass2, trigger: 'blur' }],
          }
      },
      phoneFormRules(){
          var valiVer = (rule, value, callback) => {
            if (value === '') {
              callback(new Error(this.$t('login.code')));
            } else if (value.length != 6) {
              callback(new Error(this.$t('login.codeTip')));
            } else {
              callback();
            }
          };
          return {
            pwd:[{ required: true, message: this.$t('login.pwd'), trigger: 'blur' }],
            phone:[{ required: true, message: this.$t('account.inputPhone'), trigger: 'blur' }],
            verCode:[{ validator: valiVer, trigger: 'blur' }],
          }
      }
    },
    created() {
        var _this = this;
        this.$store.dispatch('getUserInfo');
        console.log(this.userInfo,this.userInfo.two_factor_auth_type == "CLOSE");
        if(this.userInfo.two_factor_auth_type == "CLOSE"){
            this.riskDialog = true;
            this.phoneFlag = false;
            this.googleFlag = false;
        }else if(this.userInfo.two_factor_auth_type == "MOBILE"){
            this.riskDialog = false;
            this.phoneFlag = true;
            this.googleFlag = false;
        }else if(this.userInfo.two_factor_auth_type == "GOOGLE"){
            this.riskDialog = false;
            this.phoneFlag = false;
            this.googleFlag = true;
        }else if(this.userInfo.two_factor_auth_type == "BOTH"){
            this.riskDialog = false;
            this.phoneFlag = true;
            this.googleFlag = true;
        }else{
            this.riskDialog = true;
        }


        axios.get('/api/user/login_log').then(function(res){
            console.log(res);
            _this.tableData = res.data;
        }).catch(function (res){
            console.log(res);
        });
    }
};
</script>

<style lang='scss'>
.accBox{
    .riskwarning{
        width: 540px !important;
    }
}

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
  .emailBox,
  .itemBox {
    border: 1px solid #cccccc;
  }
  .emailBox {
    height: 140px;
    box-sizing: border-box;
    padding: 16px 30px;
    display: flex;

    justify-content: space-between;
    margin-bottom: 20px;
    .email {
        display: flex;
        flex-direction: column;
        .name {
            font-size: 20px;
            font-weight: 600;
            margin-bottom: 20px;
        }
        .lastLogin,.UID{
            font-size: 12px;
            margin-bottom: 20px;
        }

    }
    .attest{
        .toattest {
            color: #FC9217;
            font-size: 14px;
            padding-right: 10px;
            line-height: 26px;
            font-weight: 600;
        }
    }
  }
  .itemBox {
    width: 580px;
    height: 140px;
    box-sizing: border-box;
    padding: 30px 20px;
    display: flex;
    justify-content: space-between;
    .boxL{
        width: 360px;
        .titles{
            height: 30px;
            margin-bottom: 12px;
            vertical-align: middle;
            i{
                color: #999999 ;
                font-size: 30px;
                margin-right: 6px;
                vertical-align: middle;
            }
            .googleLogo{
                vertical-align: middle;
                height: 30px;
                width: 30px;
                display: inline-block;
                background: url('../../assets/img/googleLogo.svg') no-repeat center;
            }
            .title{
                font-size: 15px;
                vertical-align: middle;
                line-height: 30px;
            }
        }
        .tips{
            font-size: 12px;
        }
    }
    .boxR{
        display: flex;
        justify-content: center;
        align-items: center;
        position: relative;
        .el-button{
            border-radius: 0;
            width: 100px;
            height: 40px;
        }
        // .el-switch__core{
        //     margin-right: 30px;
        // }
        .switchBtn{
            width: 58%;
            height: 28%;
            position: absolute;
            left: 0;
            top: 36%;
            z-index: 5;
            border-radius: 10px;
            cursor:pointer;
        }
    }
  }
  .otherBox {
    height: 450px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    margin-bottom: 30px;
    .otherT,
    .otherB {
      display: flex;
      justify-content: space-between;
    }
  }
  .tableBox{
        margin-bottom: 50px;
        .tabTip{
            line-height: 24px;
            font-size: 14px;
        }
        .latelyTab{
            margin: 20px 0;
            border: 1px solid #ccc;

        }
        .el-table th, .el-table td{
            padding: 0;
            height: 30px;
            font-size: 12px;
        }
        .el-table th{
            background: #eeeeee;
            font-weight: 500;
        }
        .el-table th.is-leaf, .el-table td{
            border-bottom: 1px solid #ccc;
        }
        .el-table--enable-row-hover .el-table__body tr:hover > td{
          background-color: rgba(245,166,35,0.10);
        }
        .firstCol{
            padding-left: 50px !important;
        }
  }

  .right.el-dialog__wrapper .el-dialog__footer{
        text-align: right;
        .el-button{
          margin-right: 20px;
        }
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
}
</style>

