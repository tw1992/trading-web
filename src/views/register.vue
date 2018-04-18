<template>
  <div class="bgBox">
    <div class="loginBox">
      <div class="logoBox">
        <p class="logo">LOGO</p>
      </div>
      <el-form :model="registerForm" size="small" :rules="rules" ref="registerForm" class="loginForm formbase">
        <div class="formT">
          <div class="formTitle">
            注册
          </div>
          <el-form-item prop="email">
            <el-input
              placeholder="邮箱地址"
              v-model="registerForm.email">
              <i slot="prefix" class="el-input__icon el-icon-search"></i>
            </el-input>
          </el-form-item>
          <el-form-item prop="pass">
            <el-input
              placeholder="密码"
              type="password"
              v-model="registerForm.pass">
              <i slot="prefix" class="el-input__icon el-icon-search"></i>
            </el-input>
          </el-form-item>
          <el-form-item prop="pass2">
            <el-input
              placeholder="确认密码"
              type="password"
              v-model="registerForm.pass2">
              <i slot="prefix" class="el-input__icon el-icon-search"></i>
            </el-input>
          </el-form-item>
          <el-form-item prop="recommend" class="recommend">
            <el-input
              placeholder="推荐人（选填）"
              v-model="registerForm.recommend">
              <i slot="prefix" class="el-input__icon el-icon-search"></i>
            </el-input>
          </el-form-item>
          <el-form-item prop="consent" class="consent">
            <el-checkbox v-model="registerForm.consent">我已阅读并同意币加<router-link class="service" to="">服务条款</router-link></el-checkbox>
          </el-form-item>
        </div>
        <div class="formB">
          <el-form-item>
            <el-button type="primary" class="submitBtn" @click="submitForm('registerForm')">注册</el-button>
          </el-form-item>
          </div>
      </el-form>
      <div class="linkList">
        <div class="toLogin"><span>已有账号? </span><router-link to="/login">马上登录</router-link></div>
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
        registerForm:{
          email:"",
          pass:"",
          pass2:"",
          recommend:"",
          consent:false
        },
        rules:{
          email:[{ validator: validateEmail, trigger: 'blur' }],
          pass:[{ required: true, message: '请输入密码', trigger: 'blur' },],
          consent:[{ type: 'array',required: true, message: '未同意服务条款', trigger: 'change' },],
        },
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
.el-form-item--small.recommend{
  margin-bottom: 4px;
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
</style>


