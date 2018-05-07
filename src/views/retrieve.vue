<template>
  <div class="bgBox">
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
                    <el-button type="primary" class="submitBtn" @click="submitForm('retrieveForm')">{{$t('login.submit')}}</el-button>
                </el-form-item>
                
            </div>
            
            </el-form>
        <div class="linkList">
            <div class="toLogin"><router-link to="/login">{{$t('login.login2')}}</router-link></div>
        </div>
    </div>

    <div class="sendBox" v-if="sendFlag">
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
    <p class="footer">@  2017-2018   coin plus.com  All  Rights  Reserved</p>
  </div>
</template>

<script>
import axios from '../api/axios'
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
        retrieveForm:{
          email:""
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
            axios.post('/api/auth/password_reset',{email:this.retrieveForm.email}).then(function(res){  
                console.log(res);
                _this.sendFlag = true;
            }).catch(function (res){  
                console.log(res);
            }); 
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
    }
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

