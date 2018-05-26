<template>
  <div class="bgBox">
    <!-- 国内使用 -->
    <remote-js :js-url="'https://g.alicdn.com/sd/ncpc/nc.js?t=2015052012'" :js-load-call-back="loadRongJs"></remote-js>
    <!-- 若您的主要用户来源于海外，请替换使用下面的js资源 -->
    <!-- <remote-js :js-url="'//aeis.alicdn.com/sd/ncpc/nc.js?t=2015052012'" :js-load-call-back="loadRongJs"></remote-js> -->
    <div class="loginBox" v-if="!sendFlag">
      <div class="logoBox">
        <img class="logo" src="../assets/img/logo.png" alt="logo">
      </div>
        <el-form :model="retrieveForm" size="small" :rules="rules" ref="retrieveForm" class="loginForm formbase">
            <div class="formT">
            <div class="formTitle">
                {{$t('login.resetPassword')}}
            </div>
            <el-form-item prop="email">
                <el-input
                placeholder="邮箱地址"
                v-model="retrieveForm.email">
                <i slot="prefix" class="iconfont icon-youjian1"></i>
                </el-input>
            </el-form-item>
            
            </div>
            <div class="formB">
                <el-form-item>
                    <div id="your-dom-id" class="nc-container"></div>
                    <el-button type="primary" :disabled="!btnFlag" class="submitBtn" @click="submitForm('retrieveForm')">{{$t('login.submit')}}</el-button>
                </el-form-item>
                
            </div>
            
            </el-form>
        <div class="linkList">
            <div class="toLogin"><router-link to="/login">{{$t('login.login2')}}</router-link></div>
        </div>
    </div>

    <div class="sendBox loginBox" v-if="sendFlag">
        <div class="logoBox">
           <img class="logo" src="../assets/img/logo.png" alt="logo">
        </div>
        <div class="line">
            <span class="title">{{$t('login.resetLoginPassword')}}</span>
        </div>
        <div class="tipBox">
            <p class="tip">{{$t('login.wesent')}}</p>
            <p class="tip">如果长时间未收到邮件,请尝试垃圾邮箱中寻找.</p>
        </div>
    </div>
    <login-footer></login-footer>
  </div>
</template>

<script>
import axios from '../api/axios'
import loginFooter from './components/loginFooter'
import RemoteJs from './components/loginTest'
export default {
  data() {
      var validateEmail = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入邮箱'));
        } else {
          var reg=new RegExp(/^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$/);
          if (!reg.test(value)) {
            callback(new Error('请输入正确的邮箱'));
          }else{
              callback();
          }
        }
        
      };
      return {
        btnFlag: false,
        retrieveForm:{
          email:"",
          sessionId: "",
          token: "",
          sig: "",
          scene: "",
        },
        rules:{
          email:[{ validator: validateEmail, trigger: 'blur' }]
        },
        sendFlag:false,
      };
    },
    methods: {
      submitForm(formName) {
          console.log(0)
        var _this = this;
        this.$refs[formName].validate((valid) => {
          if (valid) {
            var data = {
                email:this.retrieveForm.email,
                sessionId:this.retrieveForm.sessionId,
                token:this.retrieveForm.token,
                sig:this.retrieveForm.sig,
                scene:this.retrieveForm.scene
            }
            axios.post('/api/auth/password_reset',data).then(function(res){  
                console.log(res);
                _this.sendFlag = true;
            }).catch(function (res){  
                console.log(res);
                _this.loadRongJs()
            }); 
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      loadRongJs() {
        var _this = this;
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
                language: "cn",
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
                    _this.retrieveForm.sessionId = data.csessionid;
                    _this.retrieveForm.token = nc_token;
                    _this.retrieveForm.sig = data.sig;
                    _this.retrieveForm.scene = "nc_login";
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



<style lang="scss" scoped>
.iconfont{
    font-size: 24px;
}
.linkList{
    text-align:right;
    display: inline;
}
.sendBox{
    width: 600px;
    height: 260px;
    background: #FFFFFF;
    display: flex;
    flex-direction: column;
    align-items: center;
    .logoBox{
        height: 40px;
        margin-top:30px;
    }
    .line{
        width: 480px;
        position: relative;
        margin: 30px 0 50px;
        text-align: center;
        &::after{
            display: inline-block;
            content: " ";
            width: 100%;
            height: 1px;
            background: #979797;
            position: absolute;
            left: 0;
            top: 50%;
        }
        .title{
            font-family: PingFangSC-Regular;
            position: relative;
            z-index: 5;
            font-size:16px;
            padding:0 20px;
            background: #ffffff;
        }  
    }
    .tipBox{
        text-align:center;
        font-size:12px;
        .tip{
            color:#999999;
            
            .link{
                color: #151515;
            }
        }
    }
}
</style>

<style lang="scss">
@import "../styles/login.scss";
</style>

