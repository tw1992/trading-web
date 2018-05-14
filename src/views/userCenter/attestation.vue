<template>
    <div class="attesBox">
        <p class="topTip">{{$t('user.recommendations')}}</p>
        <div class="googleBox">
            <div class="stepsBox">
                <el-steps :active="steps" align-center>
                    <el-step :title="$t('user.downloadApp')"><span slot="icon"></span></el-step>
                    <el-step :title="$t('user.backupKey')"><span slot="icon"></span></el-step>
                    <el-step :title="$t('user.enableGoogleAuthentication')"><span slot="icon"></span></el-step>
                </el-steps>
            </div>

            <div class="step1 stepItem" v-show="steps == 1">
                <img class="logo" src="../../assets/img/appstore.png">
                <img class="logo" src="../../assets/img/googlePlay.png">
                <el-button type="primary" size="mini" class="btnBase" @click="steps++">{{$t('user.nextStep')}}</el-button>
            </div>
            <div class="step2 stepItem" v-show="steps == 2">
                <p class="tips">谷歌二次验证16位密钥</p>
                <p class="theKey">{{this.googleQR}}</p>
                <div class="yardBox">
                    <!-- <img src="../../assets/img/pic.jpg" class="yard"> -->
                    <vue-qr :text="googleQR" :margin="0" :size="150"></vue-qr>
                    <p class="tips">{{$t('user.useGoogleAPP1')}}</p>
                    <p class="tips">{{$t('user.useGoogleAPP2')}}</p>
                </div>
                <p class="tips">请将16位密钥备份，并保存在安全的地方。如遇手机丢失，你可以通过该密钥恢复你的谷歌验证。</p>
                <p class="tips notice">{{$t('funds.important')}}: {{$t('user.Resetting')}}</p>
                <el-button type="primary" size="mini" class="btnBase" @click="steps++">{{$t('user.nextStep')}}</el-button>
            </div>
            <div class="step3 stepItem" v-show="steps == 3">
                <el-form :model="googleForm" size="small" label-width="210px" label-position="right" :rules="rules" ref="googleForm" class="formbase">
                    <div class="formT">
                    <el-form-item prop="googleAuthenticatorSecret" :label="$t('user.key')">
                        <el-input
                        class="inputBase"
                        placeholder=""
                        v-model="googleForm.googleAuthenticatorSecret">
                        </el-input>
                    </el-form-item>
                    <el-form-item prop="password" :label="$t('Dialog.loginPassword')">
                        <el-input
                        class="inputBase"
                        placeholder=""
                        type="password"
                        v-model="googleForm.password">
                        </el-input>
                    </el-form-item>
                    <el-form-item prop="googleCode" :label="$t('Dialog.googleAuthenticationCode')">
                        <el-input
                        class="inputBase"
                        placeholder=""
                        v-model="googleForm.googleCode">
                        </el-input>
                    </el-form-item>
                    </div>
                    <div class="formB">
                    <el-form-item>
                        <el-button type="primary" class="submitBtn btnBase" @click="submitForm('googleForm')">确定</el-button>
                    </el-form-item>
                    </div>
                </el-form>
            </div>
        </div>

        <!-- 完成谷歌验证 -->
        <el-dialog
            title="完成谷歌验证"
            :visible.sync="finishFlag"
            :show-close = "false"
            width="30%"
            custom-class="baseDialog"
            center>
            <p>恭喜您完成谷歌验证绑定</p>
            <span slot="footer" class="dialog-footer">
                <el-button type="primary" size="mini" @click="changeFinishFlag()">完成</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
import VueQr from 'vue-qr'
import axios from '../../api/axios'
export default {
  data() {
      var validateEmail = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密钥'));
        } else {
          var reg=new RegExp(/^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$/);
          if (!reg.test(value)) {
            callback(new Error('请输入正确的密钥'));
          }
        }
      };
    return {
        steps: 1,
        googleForm:{
          googleAuthenticatorSecret:"",
          password:"",
          googleCode:"",
        },
        rules:{
          googleAuthenticatorSecret:[{ required: true, message: '请输入16位密钥', trigger: 'blur' }],
          password:[{ required: true, message: '请输入密码', trigger: 'blur' },],
          googleCode: [{ required: true, message: '请输入谷歌验证码', trigger: 'blur' },]
        },
        finishFlag: false,
        googleQR: '',

    };
  },
  methods: {
      submitForm(formName) {
        var _this = this;
        this.$refs[formName].validate((valid) => {
          if (valid) {
            axios.post('/api/user/google_authenticator',this.googleForm).then(function(res){  
                console.log(res);
                _this.finishFlag = true;
                _this.$store.dispatch('getUserInfo');
                // _this.googleQR = res.data.googleAuthenticatorSecret;
                // _this.googleForm.googleAuthenticatorSecret = res.data.googleAuthenticatorSecret;
            }).catch(function (res){  
                console.log(res);
            }); 
          } else {
            console.log('error submit!!');
            return false;
          }
        });
        
      },
      changeFinishFlag() {
          //this.finishFlag = false;
          this.$router.push("/userCenter/account")
      }
    },
    components: {VueQr},
    created() {
        var _this = this;

        axios.get('/api/user/google_authenticator').then(function(res){  
            console.log(res);
            _this.googleQR = res.data.googleAuthenticatorSecret;
            _this.googleForm.googleAuthenticatorSecret = res.data.googleAuthenticatorSecret;
        }).catch(function (res){  
            console.log(res);
        }); 
    }
};
</script>

<style lang='scss'>
.attesBox{
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
    .googleBox{
        width: 800px;
        margin: auto;
        padding-top: 20px;
        .stepsBox{
            margin-bottom: 30px;
            .el-step__title.is-process{
                font-weight: 500;
            }
            .el-step__head.is-process{
                border-color: #E5E5E5;
                color: #E5E5E5;
            }
            .el-step__head.is-finish{
                color: #d79528;
                .el-step__icon{
                    background-color: #E89E12;
                    border-color: #F3CD87;
                }
            }
            .el-step__title.is-finish{
                color: #4a4a4a;
            }
            .el-step__head.is-wait{
                border-color: #E5E5E5;
                color: #E5E5E5;
            }
            .el-step__line{
                background-color: #E5E5E5;
            }
            .el-step.is-horizontal .el-step__line{
                top: 20px;
                width: 64%;
                margin: auto !important;
            }
            .el-step__icon{
                width: 40px;
                height: 40px;
            }
            .el-step__icon.is-text{
                border: 5px solid;
            }
            .el-step__title{
                font-size: 14px;
            }
        }
        .stepItem{
            display: flex;
            flex-direction: column;
            align-items: center;
            .el-button{
                margin-top: 20px;
            }
        }
        .step1{
            .logo{
                width: 200px;
                height: 60px;
                margin: 20px 0; 
            }
            
        }
        .step2{
            padding: 20px 0;
            .tips{
                font-size: 12px;
                color: #333333;
                width: 100%;
                text-align: center;
                margin: 4px 0;

            }
            .theKey{
                background: #D8D8D8;
                width: 182px;
                text-align: center;
                padding: 4px 0;
                margin: 10px 0;
            }
            .yardBox{
                width: 180px;
                height: 180px;
                border: 1px solid #cccccc;
                padding: 10px 0px;
                display: flex;
                flex-direction: column;
                align-items: center;
                margin: 20px 0;
                .tips{
                    margin: 0;
                }
                .yard{
                    width: 150px;
                    height: 150px;
                }
            }
            .notice{
                color: #D0021B;
            }
        }
        .step3{
            .formbase{
                display: flex;
                flex-direction: column;
                align-items: center;
                // width: 600px;
                .inputBase{
                    width: 300px;
                }
                .el-form-item{
                    margin-bottom: 28px;
                }
                .el-button{
                    margin-left: -150px;
                }
            }
            .el-form-item.is-required .el-form-item__label:before{
                content: '';
            }
        }
    }
    .baseDialog{
        .el-dialog__body{
            text-align: center;
            p{
                padding: 30px 0;
                display: block;
                width: 100%;
            }
        }
    }
}


</style>