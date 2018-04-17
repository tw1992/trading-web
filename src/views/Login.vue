<template>
  <div class="bgBox">
    <div class="loginBox">
      <div class="logoBox">
        <p class="logo">LOGO</p>
      </div>
      <el-form :model="loginForm" size="medium" :rules="rules" ref="loginForm" class="loginForm formbase">
        <div class="formT">
          <div class="formTitle">
            登录
          </div>
          <el-form-item prop="email">
            <el-input
              placeholder="邮箱地址"
              v-model="loginForm.email">
              <i slot="prefix" class="el-input__icon el-icon-search"></i>
            </el-input>
          </el-form-item>
          <el-form-item prop="pass">
            <el-input
              placeholder="密码"
              v-model="loginForm.pass">
              <i slot="prefix" class="el-input__icon el-icon-search"></i>
            </el-input>
          </el-form-item>
        </div>
        <div class="formB">
          <el-form-item>
            <el-button type="primary" class="submitBtn" @click="submitForm('loginForm')">登录</el-button>
          </el-form-item>
          </div>
      </el-form>
      <div class="linkList">
        <router-link to="">忘记密码</router-link>
        <div class="register"><span>还没有账号? </span><router-link to="">马上注册</router-link></div>
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
        loginForm:{
          email:"",
          pass:""
        },
        rules:{
          email:[{ validator: validateEmail, trigger: 'blur' }],
          pass:[{ required: true, message: '请输入密码', trigger: 'blur' },],
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

</style>


