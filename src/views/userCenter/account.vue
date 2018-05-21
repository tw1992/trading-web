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
                <router-link v-if="!userInfo.is_human_validated" class="toattest" to="/autonym">{{$t('user.unverified')}}&nbsp;&nbsp;&nbsp;<i class="el-icon-d-arrow-right"></i></router-link>
                <a v-if="userInfo.is_human_validated" class="toattest" style="color:#3ABC56">已实名认证</a>
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
                    <div class="boxR" style="padding-right: 30px;">
                        <div class="switchBtn" @click="switchClick('phoneFlag')"></div>
                        <el-switch
                        v-model="phoneFlag"
                        active-color="#F73946"
                        inactive-color="#3ABC56">
                        </el-switch>
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
                                <i class="iconfont icon-APIwendang"></i>
                                <span class="title">{{$t('user.GoogleAuthentication')}}</span>
                            </p>
                            <p class="tips">
                                {{$t('user.Googletips')}}
                            </p>
                        </div>
                        <div class="boxR" style="padding-right: 30px;">
                            <div class="switchBtn" @click="switchClick('googleFlag')"></div>
                            <el-switch
                            @change="googleClick"
                            v-model="googleFlag"
                            active-color="#F73946"
                            inactive-color="#3ABC56">
                            </el-switch>
                        </div>
                </div>
            </div>
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
            <el-form :model="changePwdForm" status-icon :rules="changePwdForm.rules" ref="changePwdForm">
                <el-form-item :label="$t('Dialog.oldPassword')" prop="pwd1">
                    <el-input class="inputBase" type="password" placeholder="请输入原密码" v-model="changePwdForm.pwd1" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item :label="$t('Dialog.newPassword')" prop="newpwd1">
                    <el-input class="inputBase" type="password" placeholder="(至少8个字符,必须包含大小写字母和数字)" v-model="changePwdForm.newpwd1" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item :label="$t('Dialog.confirmPassword')" prop="newpwd2">
                    <el-input class="inputBase" type="password" placeholder="请再次输入新密码" v-model="changePwdForm.newpwd2" auto-complete="off"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button type="primary" size="mini" @click="changePwdDialog = false">{{$t('Dialog.confirm')}}</el-button>
            </span>
        </el-dialog>

        <!-- 开启/解除 手机验证 -->
        <el-dialog
            :title="(phoneFlag?$t('Dialog.disable'):$t('Dialog.open')) + $t('Dialog.SMSAuthentication')"
            :visible.sync="phoneDialog"
            width="30%"
            custom-class="baseDialog changePwd"
            center>
            <el-form :model="phoneForm" status-icon :rules="phoneForm.rules" ref="phoneForm">
                <el-form-item :label="$t('Dialog.loginPassword')" prop="pwd">
                    <el-input class="inputBase" type="password" placeholder="请输入登录密码" v-model="phoneForm.pwd" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item :label="$t('Dialog.phoneNumber')" prop="phone">
                    <el-input placeholder="(仅限中国大陆)" v-model="phoneForm.phone" type="tel" auto-complete="off" class="inputBase input-with-select">
                        <el-select v-model="phoneForm.select" slot="prepend" placeholder="请选择">
                        <el-option label="+86" value="+86"></el-option>
                        <el-option label="+88" value="+88"></el-option>
                        <el-option label="+89" value="+89"></el-option>
                        </el-select>
                    </el-input>
                </el-form-item>
                <el-form-item :label="$t('Dialog.SMSAuthenticationCode')" class="verCode" prop="verCode">
                    <el-input class="inputBase" placeholder="请输入短信验证码" v-model="phoneForm.verCode" auto-complete="off"></el-input>
                    <a class="verBtn" v-show="VerCodeFlag" href="javascript:;" @click="getVerificationCode(phoneForm.phone)">{{$t('Dialog.sendSMS')}}</a>
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
                <p class="tips">在开始绑定之前,请确保您的手机畅通</p>
                <p class="tips">并可以访问苹果商店或谷歌商店</p>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button type="primary" size="mini" @click="googleStart()">{{$t('Dialog.begin')}}</el-button>
            </span>
        </el-dialog>

        <!-- 解除谷歌验证 -->
        <el-dialog
            title="解除谷歌验证"
            :visible.sync="googleDelDialog"
            width="30%"
            custom-class="baseDialog"
            center>
            <el-form :model="googleDelForm" status-icon :rules="googleDelForm.rules" ref="googleDelForm" class="googleDelForm">
                <el-form-item label="登录密码" prop="pwd">
                    <el-input class="inputBase" type="password" placeholder="请输入登录密码" v-model="googleDelForm.pwd" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="谷歌验证码" prop="verCode">
                    <el-input class="inputBase" placeholder="6位动态数字" v-model="googleDelForm.verCode"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button class="btnBase" type="primary" size="mini" @click="disableGoogle()">确认</el-button>
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
      var validatePass = (rule, value, callback) => {
        if (!isPassword(value)) {
          callback(new Error('请输入正确的密码'));
        } else {
          if (this.changePwdForm.newpwd2 !== '') {
            this.$refs.changePwdForm.validateField('newpwd2');
          }
          callback();
        }
      };
      var validatePass2 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'));
        } else if (value !== this.changePwdForm.newpwd1) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      };
      var valiVer = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入验证码'));
        } else if (value.length != 6) {
          callback(new Error('请输入正确的验证码!'));
        } else {
          callback();
        }
      };
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
      googleDelForm: {      //解除谷歌验证
          pwd: "",
          verCode: "",
          rules: {
            pwd:[{ required: true, message: '请输入密码', trigger: 'blur' }],
            verCode:[{ validator: valiVer, trigger: 'blur' }],
        }
      },
      changePwdForm: {      //修改密码
          pwd1: "",
          newpwd1: "",
          newpwd2: "",
          rules: {
            pwd1:[{ required: true, message: '请输入密码', trigger: 'blur' }],
            newpwd1:[{ validator: validatePass, trigger: 'blur' }],
            newpwd2:[{ validator: validatePass2, trigger: 'blur' }],
        }
      },
      phoneForm: {      // 开启/解除 手机验证
          pwd: "",
          phone: "",
          verCode: "",
          select: "+86",
          smsId: "",
          rules: {
            pwd:[{ required: true, message: '请输入密码', trigger: 'blur' }],
            phone:[{ required: true, message: '请输入手机号', trigger: 'blur' }],
            verCode:[{ validator: valiVer, trigger: 'blur' }],
        }
      },
      tableData: [],            //登录历史
        
    };
  },
  methods: {
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
        console.log(this[target],target);
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
                _this.$store.dispatch('getUserInfo');
                _this.phoneDialog = false;
                _this.phoneFlag = true;
            }).catch(function (res){  
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
                console.log(res)
                _this.$store.dispatch('getUserInfo');
                _this.phoneDialog = false;
                _this.phoneFlag = false;
            }).catch(function (res){  
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
                console.log(res)
                _this.$store.dispatch('getUserInfo');
                _this.googleDelDialog = false;
                _this.googleFlag = false;
            }).catch(function (res){  
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
                
                console.log(res)
                // _this.phoneDialog = false;
                // _this.phoneFlag = true;
            }).catch(function (res){  
                console.log(res);
            }); 
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      }
    },
    computed: {
        ...mapGetters([
            'email',
            'token',
            'userInfo',
        ])
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
    // .loginTime {
    //   // margin: 32px 0;
    //   font-size: 12px;
    //   span {
    //     margin-right: 20px;
    //   }
    // }
    // .UID {
    //   font-size: 12px;
    // }
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
    height: 300px;
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

