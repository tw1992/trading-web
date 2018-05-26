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
            <el-button type="primary" class="submitBtn" @click="resetPwd()">确认</el-button>
          </el-form-item>
          </div>
      </el-form>
    </div>
    <login-footer></login-footer>
  </div>
</template>

<script>
import loginFooter from './components/loginFooter'
import { isPoneAvailable,isPassword } from '../utils/common'
import axios from '../api/axios'
export default {
  data() {
      var validatePass = (rule, value, callback) => {
        if (!isPassword(value)) {
          callback(new Error('请输入正确的密码'));
        } else {
          if (this.resetForm.pass2 !== '') {
            this.$refs.resetForm.validateField('pass2');
          }
          callback();
        }
      };
      var validatePass2 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'));
        } else if (value !== this.resetForm.pass1) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      };
      return {
        resetForm:{
          pass1:"",
          pass2:""
        },
        rules:{
          pass1:[{ validator: validatePass, trigger: 'blur' }],
          pass2:[{ validator: validatePass2, trigger: 'blur' }],
        },
        uuid: "",
      };
    },
    methods: {
      resetPwd() {                     
        var _this = this; 
        this.$refs['resetForm'].validate((valid) => {
          if (valid) {
            axios.post(`/api/auth/password_reset/${this.uuid}`,{
                password: this.resetForm.pass1,
            }).then(function(res){  
                
                console.log(res)
                _this.$router.push('/login')
            }).catch(function (res){  
                console.log(res);
            }); 
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      }
    },
    created() {
        this.uuid = this.$route.query.uuid
        //console.log(this.$route.query.uuid)
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
