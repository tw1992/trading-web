<template>
  <div class="bgBox">
    <div class="sendBox">
        <div class="logoBox">
           <img class="logo" src="../../assets/img/logo.png" alt="logo">
        </div>
        <div class="line">
            <span class="title">邮箱激活确认</span>
        </div>
        <div class="tipBox">
            <p class="tip">已向您的邮箱发送了一封账户激活的邮件,点击邮件中的链接去激活账户.</p>
            <p class="tip">如果未收到邮件,请尝试重新发送.</p>
            <p class="tip">如果长时间未收到邮件,请尝试垃圾邮箱中寻找.</p>
        </div>
    </div>
    <login-footer></login-footer>
  </div>
</template>

<script>
import axios from '../../api/axios'
import loginFooter from '../components/loginFooter'
export default {
  data() {
      return {

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
    },
    components: { loginFooter }
}
</script>



<style lang="scss" scoped>
.iconfont{
    font-size: 24px;
}
.sendBox{
    width: 600px;
    // height: 260px;
    padding-bottom: 40px;
    background: #FFFFFF;
    display: flex;
    flex-direction: column;
    align-items: center;
    .logoBox{
        height: 40px;
        margin-top:30px;
        .logo{
            max-height: 100%;
            max-width: 100%;
        }
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
            line-height: 24px;
            .link{
                color: #151515;
            }
        }
    }
}
</style>

<style lang="scss">
@import "../../styles/login.scss";
</style>
