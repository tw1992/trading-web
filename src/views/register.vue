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
              <i slot="prefix" class="iconfont icon-youjian1"></i>
            </el-input>
          </el-form-item>
          <el-form-item prop="pass">
            <el-input
              placeholder="密码"
              type="password"
              v-model="registerForm.password">
              <i slot="prefix" class="iconfont icon-suozi"></i>
            </el-input>
          </el-form-item>
          <el-form-item prop="pass2">
            <el-input
              placeholder="确认密码"
              type="password"
              v-model="registerForm.password2">
              <i slot="prefix" class="iconfont icon-suozi"></i>
            </el-input>
          </el-form-item>
          <el-form-item class="recommend">
            <el-input
              placeholder="推荐人（选填）"
              v-model="registerForm.recommend">
              <i slot="prefix" class="iconfont icon-wo"></i>
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
//import { mapState } from 'vuex'
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
          callback();
        }
      };
      var validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'));
        } else {
          if (this.registerForm.pass2 !== '') {
            this.$refs.registerForm.validateField('pass2');
          }
          callback();
        }
      };
      var validatePass2 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'));
        } else if (value !== this.registerForm.pass) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      };
      return {
        registerForm:{
          email:"466865383@qq.com",
          password:"123456",
          password2:"123456",
          recommend:"",
          consent:[]
        },
        rules:{
          email:[{ validator: validateEmail, trigger: 'blur' }],
          pass:[{ validator: validatePass, trigger: 'blur' },],
          pass2:[{ validator: validatePass2, trigger: 'blur' },],
          consent:[{ type: 'array',required: true, message: '未同意服务条款', trigger: 'change' },],
        },
      };
    },
    // computed: {
    //   ...mapState([
    //       'email',
    //       'token'
    //   ]),
    // }, 
    methods: {
      submitForm(formName) {
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
              setTimeout(()=>{
                _this.$router.push("/login");
              },2000)
            }).catch((e) => {  
              //this.loading = false  
              // console.log("err")
              // console.log(e)
            }) 
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


