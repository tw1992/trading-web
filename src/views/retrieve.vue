<template>
  <div class="bgBox">
    <div class="loginBox" v-if="!sendFlag">
      <div class="logoBox">
        <p class="logo">LOGO</p>
      </div>
        <el-form :model="retrieveForm" size="small" :rules="rules" ref="retrieveForm" class="loginForm formbase">
            <div class="formT">
            <div class="formTitle">
                找回密码
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
                    <el-button type="primary" class="submitBtn" @click="submitForm('retrieveForm')">下一步</el-button>
                </el-form-item>
                
            </div>
            
            </el-form>
        <div class="linkList">
            <div class="toLogin"><router-link to="/login">返回登录</router-link></div>
        </div>
    </div>

    <div class="sendBox" v-if="sendFlag">
        <div class="logoBox">
            <p class="logo">LOGO</p>
        </div>
        <div class="line">
            <span class="title">重置密码确认</span>
        </div>
        <div class="tipBox">
            <p class="tip">已向您的邮箱发送了一封重置密码的邮件,点击邮件中的<span class="link">链接</span>去重置登录密码.</p>
            <p class="tip">如果长时间未收到邮件,请尝试垃圾邮箱中寻找.</p>
        </div>
    </div>
    <p class="footer">@  2017-2018   coin plus.com  All  Rights  Reserved</p>
  </div>
</template>

<script>
export default {
  data() {
      var validateEmail = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入邮箱'));
        } else {
          var reg=new RegExp(/^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$/);
          if (!reg.test(value)) {
            callback(new Error('请输入正确的邮箱'));
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
        this.$refs[formName].validate((valid) => {
          if (valid) {
            alert('submit!');
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
    }
}
</script>

<style lang="scss">
@import "../styles/login.scss";
</style>

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
        border-top: 1px solid #979797;
        position: relative;
        margin: 30px 0 50px;
        .title{
            font-family: PingFangSC-Regular;
            position: absolute;
            font-size:16px;
            padding:0 20px;
            background: #ffffff;
            top:-12px;
            left: 172px;

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


