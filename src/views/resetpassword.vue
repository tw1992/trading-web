<template>
  <div class="bgBox">
    <div class="loginBox">
      <div class="logoBox">
        <img class="logo" src="../assets/img/logo.png" alt="logo">
      </div>
      <el-form :model="resetForm" size="small" :rules="rules" ref="resetForm" class="resetForm formbase">
        <div class="formT">
          <div class="formTitle">
            重置密码
          </div>
          <el-form-item prop="pass1">
            <el-input
              placeholder="新密码"
              type="password"
              v-model="resetForm.pass1">
              <i slot="prefix" class="iconfont icon-suozi"></i>
            </el-input>
          </el-form-item>
          <el-form-item prop="pass2">
            <el-input
              placeholder="确认密码"
              type="password"
              v-model="resetForm.pass2">
              <i slot="prefix" class="iconfont icon-suozi"></i>
            </el-input>
          </el-form-item>
        </div>
        <div class="formB">
          <el-form-item>
            <el-button type="primary" class="submitBtn" @click="submitForm('loginForm')">确认</el-button>
          </el-form-item>
          </div>
      </el-form>
    </div>
    <login-footer></login-footer>
  </div>
</template>

<script>
import loginFooter from './components/loginFooter'
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
        resetForm:{
          pass1:"",
          pass2:""
        },
        rules:{
          email:[{ validator: validateEmail, trigger: 'blur' }],
          pass1:[{ required: true, message: '请输入密码', trigger: 'blur' },],
          pass2:[{ required: true, message: '请输入密码', trigger: 'blur' },],
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
    },
    components: {
      loginFooter
    },
}
</script>

<style lang="scss">
@import "../styles/login.scss";
</style>


<style lang="scss" scoped>
.linkList{
  justify-content: space-between;
}
.iconfont{
  font-size:24px;
}
</style>
