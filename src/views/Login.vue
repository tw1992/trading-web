<template>
  <div class="bgBox">
    <div class="loginBox">
      <router-link to="/home" class="logoBox">
        <img class="logo" src="../assets/img/logo.png" alt="logo">
      </router-link>
      <el-form :model="loginForm" size="small" :rules="rules" ref="loginForm" class="loginForm formbase">
        <div class="formT">
          <div class="formTitle">
            {{$t('login.login')}}
          </div>
          <el-form-item prop="email">
            <el-input
              :placeholder="$t('login.email')"
              v-model="loginForm.email">
              <i slot="prefix" class="iconfont icon-youjian1"></i>
            </el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input
              :placeholder="$t('login.password')"
              type="password"
              @keyup.enter.native="submitForm('loginForm')"
              v-model="loginForm.password">
              <i slot="prefix" class="iconfont icon-suozi"></i>
            </el-input>
          </el-form-item>
        </div>
        <div class="formB">
          <el-form-item>
            <div id="your-dom-id" class="nc-container"></div>
            <el-button type="primary" :disabled="!btnFlag" class="submitBtn" @click="submitForm('loginForm')" >{{$t('login.login')}}</el-button>
          </el-form-item>
          </div>
      </el-form>
      <div class="linkList">
        <router-link to="/retrieve">{{$t('login.forgotPassword')}}</router-link>
        <div class="register"><span>{{$t('login.NotonBJEXyet')}}</span><router-link to="/register">{{$t('login.register')}}</router-link></div>
      </div>
    </div>
    <login-footer></login-footer>

    <!-- 手机验证 -->
    <el-dialog
        :title="$t('Dialog.SMSAuthentication')"
        :visible.sync="phoneDialog"
        custom-class="baseDialog"
        center>
        <el-form :model="phoneForm" status-icon :rules="phoneForm.rules" ref="phoneForm">
            <el-form-item :label="$t('Dialog.SMSAuthenticationCode')" class="verCode" prop="verCode">
                <el-input class="inputBase" @input="phoneLogin(phoneForm.verCode)" :placeholder="$t('Dialog.SMSCode')" v-model="phoneForm.verCode" auto-complete="off"></el-input>
                <a class="verBtn" v-show="VerCodeFlag" href="javascript:;" @click="getVerificationCode(phoneForm.phone)">{{$t('Dialog.sendSMS')}}</a>
                <span class="verBtn" v-show="!VerCodeFlag">{{verCodeTime}} S</span>
            </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <p class="tips">
            {{$t('Dialog.contract1')}}<a href="javascript:;">{{$t('Dialog.contract2')}}</a>
          </p>
        </span>
    </el-dialog>

    <!-- 谷歌验证 -->
    <el-dialog
        :title="$t('user.GoogleAuthentication')"
        :visible.sync="googleDialog"
        custom-class="baseDialog"
        center>
        <el-form :model="googleForm" status-icon :rules="googleForm.rules" ref="googleForm">
            <el-form-item :label="$t('Dialog.googleAuthenticationCode')" class="verCode" prop="verCode">
                <el-input class="inputBase" @input="googleLogin(googleForm.verCode)" :placeholder="$t('login.goolCode')" v-model="googleForm.verCode" auto-complete="off"></el-input>
                <!-- <a class="verBtn" href="javascript:;">获取</a> -->
            </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <p class="tips">
            {{$t('Dialog.contractGool')}} <a href="javascript:;">{{$t('Dialog.contract2')}}</a>
          </p>
        </span>
    </el-dialog>

    <!-- 双重验证 -->
    <el-dialog
        :title="$t('user.DualAuthentication')"
        :visible.sync="doubleDialog"
        custom-class="baseDialog"
        center>
        <ul class="doubleSelect">
          <li :class="doubleSelect == 1?'active':''" @click="doubleSelect = 1">{{$t('user.GoogleAuthentication')}}</li>
          <li :class="doubleSelect == 2?'active':''" @click="doubleSelect = 2">{{$t('user.SMSAuthentication')}}</li>
        </ul>

        <el-form v-show="doubleSelect == 1" :model="googleForm" status-icon :rules="googleFormRules" ref="googleForm">
            <el-form-item :label="$t('Dialog.googleAuthenticationCode')" class="verCode" prop="verCode">
                <el-input class="inputBase" @change="googleLogin(googleForm.verCode)" :placeholder="$t('login.goolCode')" v-model="googleForm.verCode" auto-complete="off"></el-input>
                <!-- <a class="verBtn" href="javascript:;">获取</a> -->
            </el-form-item>
        </el-form>
        <el-form v-show="doubleSelect == 2" :model="phoneForm" status-icon :rules="phoneFormRules" ref="phoneForm">
            <el-form-item :label="$t('Dialog.SMSAuthenticationCode')" class="verCode" prop="verCode">
                <el-input class="inputBase" @input="phoneLogin(phoneForm.verCode)"  :placeholder="$t('Dialog.SMSCode')" v-model="phoneForm.verCode" auto-complete="off"></el-input>
                <a class="verBtn" v-show="VerCodeFlag" href="javascript:;" @click="getVerificationCode(phoneForm.phone)">{{$t('Dialog.sendSMS')}}</a>
                <span class="verBtn" v-show="!VerCodeFlag">{{verCodeTime}} S</span>
            </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <p v-show="doubleSelect == 1" class="tips">
            {{$t('Dialog.contractGool')}} <a href="javascript:;">{{$t('Dialog.contract2')}}</a>
          </p>
          <p v-show="doubleSelect == 2" class="tips">
            {{$t('Dialog.contract1')}} <a href="javascript:;">{{$t('Dialog.contract2')}}</a>
          </p>
        </span>
    </el-dialog>

    <!-- 国内使用 -->
    <remote-js :js-url="'https://g.alicdn.com/sd/ncpc/nc.js?t=201802012'" :js-load-call-back="loadRongJs" :lang="$store.state.app.language" @loadRongJs="loadRongJs"></remote-js>
    <!-- 若您的主要用户来源于海外，请替换使用下面的js资源 -->
    <!-- <remote-js :js-url="'//aeis.alicdn.com/sd/ncpc/nc.js?t=2015052012'" :js-load-call-back="loadRongJs" :lang="$store.state.app.language" @loadRongJs="loadRongJs"></remote-js>-->
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import VueRouter from 'vue-router'
import axios from '../api/axios'
import loginFooter from './components/loginFooter'
import RemoteJs from './components/loginTest'
export default {
  data() {
      return {
        btnFlag: false,
        redirectUrl: 'https://bjex.zendesk.com/access/jwt?jwt=',
        return_to: "",
        redirectFlag: false,
        nc: {},
        loginForm:{
          email:"", //466865383@qq.com
          password:"",
          sessionId: "",
          token: "",
          sig: "",
          scene: "",
        },
        VerCodeFlag: true,
        verCodeTime: 60,
        phoneDialog: false,  //手机验证
        phoneForm: {
          verCode: '',
          phone: '',
          // rules: {
          //   verCode: { required: true, message: '请输入验证码', trigger: 'blur' }
          // }
        },
        googleDialog: false,
        googleForm: {
          verCode: '',
          // rules: {
          //   verCode: { required: true, message: '请输入验证码', trigger: 'blur' }
          // }
        },
        doubleDialog: false,
        doubleSelect: 1,
        loginToken: "",
        twoFactorAuthType: "",
      };
    },
    methods: {
      submitForm(formName) {
          var _this = this;
          if(this.btnFlag){
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    this.$store.dispatch('Login', this.loginForm).then((res) => {
                    console.log(res)
                    if(res.code == 100){    //双重验证
                        this.loginToken = res.data.loginToken;
                        this.twoFactorAuthType = res.data.twoFactorAuthType;
                        this.phoneForm.phone = res.data.mobile;
                        if(this.twoFactorAuthType == "MOBILE"){
                            this.phoneDialog = true;
                        }else if(this.twoFactorAuthType == "GOOGLE"){
                            this.googleDialog = true;
                        }else if(this.twoFactorAuthType == "BOTH"){
                            this.doubleDialog = true;
                        }
                    }else{
                        console.log('loginSuccess')
                        this.loginSuccess(res);
                    }
                    //this.loading = false;
                    //this.$router.push({path: '/login'});

                    }).catch((e) => {
                    //this.loading = false
                    // console.log("err")
                    // console.log(e)
                        this.loginErr();
                    })
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
        }else{
            this.$message({
                message: '请先完成验证',
                type: 'error'
            });
        }
      },
      getVerificationCode(mobile) {     //获取验证码
        var _this = this;
        axios.get(`/api/sms/to_mobile/${mobile}`).then(function(res){
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
      phoneLogin(verCode) {             //手机验证
        var smsCode = verCode.trim();
        if(smsCode.length == 6){
          var phoneLoginDate = {
            loginToken: this.loginToken,
            twoFactorAuthType: 'MOBILE',
            smsId: this.phoneForm.smsId,
            smsCode: smsCode
          };
          this.$store.dispatch('phoneLogin', phoneLoginDate).then((res) => {
            this.loginSuccess(res);
          }).catch((e) => {
            //this.loading = false
            // console.log("err")
            // console.log(e)
            this.loginErr();
          })
        }

      },
      googleLogin(verCode) {            //谷歌验证
        var googleCode = verCode.trim();
        if(googleCode.length == 6){
          var googleLoginDate = {
            loginToken: this.loginToken,
            twoFactorAuthType: 'GOOGLE',
            googleCode: googleCode
          };
          this.$store.dispatch('googleLogin', googleLoginDate).then((res) => {
            this.loginSuccess(res);
          }).catch((e) => {
            //this.loading = false
            // console.log("err")
            // console.log(e)
            this.loginErr();
          })
        }
      },
      loginSuccess(res,type) {
          this.$message({
              message: '登录成功',
              type: 'success'
            });
            if(this.redirectFlag){
                var token = res.data.token;
                var url = this.redirectUrl+token+'&return_to='+this.return_to;
                window.location.href = url;
                if(!type){
                    window.open(window.location.origin + '/Home')
                }else{
                    window.open(window.location.origin + '/userCenter/account')
                }
            }else{
                if(!type){
                    var _this = this;
                    // setTimeout(()=>{
                    let redirect = decodeURIComponent(_this.$route.query.redirect || '/');
                    _this.$router.push({ path: redirect })
                    // },2000)
                }else{
                    _this.$router.push("/userCenter/account")
                }
            }

      },
      loginErr() {
          this.btnFlag = false;
          this.nc.reload();
          this.$store.dispatch('emailActive', this.loginForm.email);
      },
      loadRongJs() {
        var _this = this;
        _this.btnFlag = true;
        var nc_token = ["FFFF0N00000000005F77", (new Date()).getTime(), Math.random()].join(':');
        var NC_Opt =
            {
                renderTo: "#your-dom-id",
                appkey: "FFFF0N00000000005F77",
                // appkey: "CF_APP_1",
                scene: "nc_login",
                token: nc_token,
                customWidth: 340,
                trans: { "key1": "code0" },
                elementID: ["usernameID"],
                is_Opt: 0,
                language:_this.$store.state.app.language ,
                isEnabled: true,
                timeout: 3000,
                times: 5,
                apimap: {
                    // 'analyze': '//a.com/nocaptcha/analyze.jsonp',
                    // 'get_captcha': '//b.com/get_captcha/ver3',
                    // 'get_captcha': '//pin3.aliyun.com/get_captcha/ver3'
                    // 'get_img': '//c.com/get_img',
                    // 'checkcode': '//d.com/captcha/checkcode.jsonp',
                    // 'umid_Url': '//e.com/security/umscript/3.2.1/um.js',
                    // 'uab_Url': '//aeu.alicdn.com/js/uac/909.js',
                    // 'umid_serUrl': 'https://g.com/service/um.json'
                },
                callback: function (data) {
                    // window.console && console.log(nc_token)
                    // window.console && console.log(data.csessionid)
                    // window.console && console.log(data.sig)
                    _this.btnFlag = true;
                    _this.loginForm.sessionId = data.csessionid;
                    _this.loginForm.token = nc_token;
                    _this.loginForm.sig = data.sig;
                    _this.loginForm.scene = "nc_login";
                }
            }
        this.nc = new noCaptcha(NC_Opt)
        this.nc.upLang('cn', {
            _startTEXT: "请按住滑块，拖动到最右边",
            _yesTEXT: "验证通过",
            _error300: "哎呀，出错了，点击<a href=\"javascript:__nc.reset()\">刷新</a>再来一次",
            _errorNetwork: "网络不给力，请<a href=\"javascript:__nc.reset()\">点击刷新</a>",
        })
        this.nc.reload();
      }
    },
    computed: {
    ...mapGetters([
        'email',
        'token',
        'userInfo',
      ]),
      rules(){
        var validateEmail = (rule, value, callback) => {
          if (value === '') {
            callback(new Error(this.$t('login.retrieveTip')));
          } else {
            var reg=new RegExp(/^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$/);
            if (!reg.test(value)) {
              callback(new Error(this.$t('login.retrieveTip1')));
            }
          }
          callback();
        };
        return {
          email:[{ validator: validateEmail, trigger: 'blur' }],
            password:[{ required: true, message: this.$t('login.pwd'), trigger: 'blur' },],
        }
      },
      phoneFormRules(){
        return {
          verCode: { required: true, message: this.$t('login.code'), trigger: 'blur' }
        }
      },
      googleFormRules() {
        return {
          verCode: { required: true, message: this.$t('login.code'), trigger: 'blur' }
        }
      }
    },
    components: {
      loginFooter,
      RemoteJs
    },
    beforeMount() {
      if(this.$route.query.return_to){
          this.redirectFlag = true;
          this.return_to = this.$route.query.return_to;
      }
    }
}
</script>

<style lang="scss" scoped>
.linkList{
  justify-content: space-between;
}
.iconfont{
  font-size:24px;
}
.doubleSelect{
  border: 1px solid #FC9217;
  display: flex;
  margin-bottom: 30px;
  li{
    cursor:pointer;
    width:120px;
    height:40px;
    line-height: 40px;
    font-size: 14px;
    text-align: center;
    color: #FC9217;
    &:nth-child(1){
      border-right: 1px solid #FC9217;
    }
  }
  li.active{
    background: #FC9217;
    color: #ffffff;
  }
}
</style>

<style lang="scss">
@import "../styles/login.scss";

.bgBox{
  .baseDialog .el-dialog__footer{
    .tips{
      margin-bottom: 40px;
      a{
        color: #FC9217;
      }
    }
  }
}
</style>





