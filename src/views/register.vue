<template>
  <div class="bgBox">
    <!-- 国内使用 -->
    <remote-js :js-url="'https://g.alicdn.com/sd/ncpc/nc.js?t=2015052012'" :js-load-call-back="loadRongJs" :lang="$store.state.app.language" @loadRongJs="loadRongJs"></remote-js>
    <!-- 若您的主要用户来源于海外，请替换使用下面的js资源 -->
    <!-- <remote-js :js-url="'//aeis.alicdn.com/sd/ncpc/nc.js?t=2015052012'" :js-load-call-back="loadRongJs" :lang="$store.state.app.language" @loadRongJs="loadRongJs"></remote-js> -->
    <div class="loginBox">
      <div class="logoBox">
        <img class="logo" src="../assets/img/logo.png" alt="logo">
      </div>
      <el-form :model="registerForm" size="small" :rules="rules" ref="registerForm" class="loginForm formbase">
        <div class="formT">
          <div class="formTitle">
            {{$t('login.register1')}}
          </div>
          <el-form-item prop="email">
            <el-input
              :placeholder="$t('login.email')"
              v-model="registerForm.email">
              <i slot="prefix" class="iconfont icon-youjian1"></i>
            </el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input
              :placeholder="$t('login.registerPassword')"
              type="password"
              v-model="registerForm.password">
              <i slot="prefix" class="iconfont icon-suozi"></i>
            </el-input>
          </el-form-item>
          <el-form-item prop="password2">
            <el-input
              :placeholder="$t('login.confirmPassword')"
              type="password"
              v-model="registerForm.password2">
              <i slot="prefix" class="iconfont icon-suozi"></i>
            </el-input>
          </el-form-item>
          <el-form-item class="recommend">
            <el-input
              :placeholder="$t('login.referralID')"
              v-model="registerForm.recommend">
              <i slot="prefix" class="iconfont icon-wo"></i>
            </el-input>
          </el-form-item>
          <el-form-item prop="consent" class="consent">
            <el-checkbox v-model="registerForm.consent">{{$t('login.Iagree')}}<router-link target="_blank" class="service" to="/terms">{{$t('login.termsOfUse')}}</router-link></el-checkbox>
          </el-form-item>
        </div>
        <div class="formB">
          <el-form-item>
            <div id="your-dom-id" class="nc-container"></div>
            <el-button type="primary" :disabled="!btnFlag" class="submitBtn" @click="submitForm('registerForm')">{{$t('login.register1')}}</el-button>
          </el-form-item>
          </div>
      </el-form>
      <div class="linkList">
        <div class="toLogin"><span>{{$t('login.alreadyRegistered')}}</span><router-link to="/login">{{$t('login.login1')}}</router-link></div>
      </div>
    </div>
    <login-footer></login-footer>
  </div>
</template>

<script>
//import { mapState } from 'vuex'
import loginFooter from './components/loginFooter'
import RemoteJs from './components/loginTest'
import { isPoneAvailable,isPassword } from '../utils/common'
export default {
  data() {
      return {
        btnFlag: false,
        registerForm:{
          password:"",  //123456
          email:"", //466865383@qq.com
          password2:"",
          recommend:"",
          consent:[],
          sessionId: "",
          token: "",
          sig: "",
          scene: "",
        },
      };
    },
    computed: {
      rules(){
        var validateEmail = (rule, value, callback) => {
          if (value === '') {
            callback(new Error(this.$t('login.retrieveTip')));
          } else {
            var reg=new RegExp(/^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$/);
            if (!reg.test(value)) {
              callback(new Error(this.$t('login.retrieveTip1')));
            }
            callback();
          }
        };
        var validatePass = (rule, value, callback) => {
          if (!isPassword(value)) {
            callback(new Error(this.$t('login.registerPassword')));
          } else {
            // if (this.changePwdForm.newpwd2 !== '') {
            //   this.$refs.changePwdForm.validateField('newpwd2');
            // }
            callback();
          }
        };
        var validatePass2 = (rule, value, callback) => {
          if (value === '') {
            callback(new Error(this.$t('login.inputPwd')));
          } else if (value !== this.registerForm.password) {
            callback(new Error(this.$t('login.marchPwd')));
          } else {
            callback();
          }
        };
        return {
          password:[{ validator: validatePass, trigger: 'blur' }],
          password2:[{ validator: validatePass2, trigger: 'blur'}],
          consent:[{ type: 'array',required: true, message: this.$t('login.agreeService'), trigger: 'change' }],
          email:[{ validator: validateEmail, trigger: 'blur' }],
        }
      },
    },
    methods: {
      submitForm(formName) {
          var _this = this;
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.$store.dispatch('Regist', this.registerForm).then((res) => {
              console.log(res)
              //this.loading = false;
              //this.$router.push({path: '/login'});
              this.$message({
                message: '注册成功',
                type: 'success'
              });
              var _this = this;
              this.$store.dispatch('emailActive', this.registerForm.email);
              setTimeout(()=>{
                _this.$router.push("/emaiActivation");
              },2000)
            }).catch((e) => {
              //this.loading = false
              // console.log("err")
              _this.loadRongJs()
            })
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      loadRongJs() {
        var _this = this;
        _this.btnFlag = false;
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
                language: this.$store.state.app.language,
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
                    _this.registerForm.sessionId = data.csessionid;
                    _this.registerForm.token = nc_token;
                    _this.registerForm.sig = data.sig;
                    _this.registerForm.scene = "nc_login";
                }
            }
        var nc = new noCaptcha(NC_Opt)
        nc.upLang('cn', {
            _startTEXT: "请按住滑块，拖动到最右边",
            _yesTEXT: "验证通过",
            _error300: "哎呀，出错了，点击<a href=\"javascript:__nc.reset()\">刷新</a>再来一次",
            _errorNetwork: "网络不给力，请<a href=\"javascript:__nc.reset()\">点击刷新</a>",
        })
        nc.reload();
      }
    },
    components: {
      loginFooter,
      RemoteJs
    },
}
</script>

<style lang="scss">
@import "../styles/login.scss";
.el-form-item--small.recommend{
  margin-bottom: 10px;
}
.consent .el-form-item__content{
  line-height: 26px;
}
</style>

<style lang="scss" scoped>
.service{
  color: #f7b84f;
}
.linkList{
  justify-content: center;
}
.iconfont{
  font-size: 24px;
}
</style>


