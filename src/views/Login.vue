<template>
  <div class="bgBox">
    <div class="loginBox">
      <div class="logoBox">
        <img class="logo" src="../assets/img/logo.png" alt="logo">
      </div>
      <el-form :model="loginForm" size="small" :rules="rules" ref="loginForm" class="loginForm formbase">
        <div class="formT">
          <div class="formTitle">
            登录
          </div>
          <el-form-item prop="email">
            <el-input
              placeholder="邮箱地址"
              v-model="loginForm.email">
              <i slot="prefix" class="iconfont icon-youjian1"></i>
            </el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input
              placeholder="密码"
              type="password"
              v-model="loginForm.password">
              <i slot="prefix" class="iconfont icon-suozi"></i>
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
        <router-link to="/retrieve">忘记密码</router-link>
        <div class="register"><span>还没有账号? </span><router-link to="/register">马上注册</router-link></div>
      </div>
    </div>
    <p class="footer">@  2017-2018   coin plus.com  All  Rights  Reserved</p>

    <!-- 手机验证 -->
    <el-dialog
        title="手机验证"
        :visible.sync="phoneDialog"
        custom-class="baseDialog"
        center>
        <el-form :model="phoneForm" status-icon :rules="phoneForm.rules" ref="phoneForm">
            <el-form-item label="验证码" class="verCode" prop="verCode">
                <el-input class="inputBase" placeholder="请输入短信验证码" v-model="phoneForm.verCode" auto-complete="off"></el-input>
                <a href="javascript:;">获取</a>
            </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <p class="tips">
            如果您遗失了手机或无法收到验证码,请 <a href="javascript:;">联系客服</a>
          </p>
        </span>
    </el-dialog>

    <!-- 谷歌验证 -->
    <el-dialog
        title="谷歌验证"
        :visible.sync="googleDialog"
        custom-class="baseDialog"
        center>
        <el-form :model="googleForm" status-icon :rules="googleForm.rules" ref="googleForm">
            <el-form-item label="谷歌验证码" class="verCode" prop="verCode">
                <el-input class="inputBase" placeholder="请输入谷歌验证码" v-model="googleForm.verCode" auto-complete="off"></el-input>
                <a href="javascript:;">获取</a>
            </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <p class="tips">
            如果您遗失了谷歌验证,请 <a href="javascript:;">联系客服</a>
          </p>
        </span>
    </el-dialog>

    <!-- 双重验证 -->
    <el-dialog
        title="双重验证"
        :visible.sync="doubleDialog"
        custom-class="baseDialog"
        center>
        <ul class="doubleSelect">
          <li :class="doubleSelect == 1?'active':''" @click="doubleSelect = 1">谷歌验证</li>
          <li :class="doubleSelect == 2?'active':''" @click="doubleSelect = 2">手机验证</li>
        </ul>

        <el-form v-show="doubleSelect == 1" :model="googleForm" status-icon :rules="googleForm.rules" ref="googleForm">
            <el-form-item label="谷歌验证码" class="verCode" prop="verCode">
                <el-input class="inputBase" placeholder="请输入谷歌验证码" v-model="googleForm.verCode" auto-complete="off"></el-input>
                <a href="javascript:;">获取</a>
            </el-form-item>
        </el-form>
        <el-form v-show="doubleSelect == 2" :model="phoneForm" status-icon :rules="phoneForm.rules" ref="phoneForm">
            <el-form-item label="验证码" class="verCode" prop="verCode">
                <el-input class="inputBase" placeholder="请输入短信验证码" v-model="phoneForm.verCode" auto-complete="off"></el-input>
                <a href="javascript:;">获取</a>
            </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <p v-show="doubleSelect == 1" class="tips">
            如果您遗失了谷歌验证,请 <a href="javascript:;">联系客服</a>
          </p>
          <p v-show="doubleSelect == 2" class="tips">
            如果您遗失了手机或无法收到验证码,请 <a href="javascript:;">联系客服</a>
          </p>
        </span>
    </el-dialog>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import VueRouter from 'vue-router'
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
        callback();
      };
      return {
        loginForm:{
          email:"466865383@qq.com",
          password:""
        },
        rules:{
          email:[{ validator: validateEmail, trigger: 'blur' }],
          password:[{ required: true, message: '请输入密码', trigger: 'blur' },],
        },

        phoneDialog: false,  //手机验证
        phoneForm: {
          verCode: '',
          rules: {
            verCode: { required: true, message: '请输入验证码', trigger: 'blur' }
          }
        },
        googleDialog: false,
        googleForm: {
          verCode: '',
          rules: {
            verCode: { required: true, message: '请输入验证码', trigger: 'blur' }
          }
        },
        doubleDialog: false,
        doubleSelect: 1,
      };
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.$store.dispatch('Login', this.loginForm).then((res) => {  
              console.log(res)
              //this.loading = false;  
              //this.$router.push({path: '/login'});  
              this.$message({
                message: '登录成功',
                type: 'success'
              });
              var _this = this;
              setTimeout(()=>{
                let redirect = decodeURIComponent(_this.$route.query.redirect || '/');
                console.log(redirect)
                _this.$router.push({ path: redirect })
                console.log(123)
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
    },
    computed: {
    ...mapGetters([
        'email',
        'token',
        'userInfo',
      ]),
    },
    mounted (){
      console.log(this.email)
      console.log(this.token)
    }
}
</script>

<style lang="scss" scoped>
.linkList{
  justify-content: space-between;
}
.iconfont{
  font-size:24px;
}
.doubleSelect{
  border: 1px solid #FC9217;
  display: flex;
  margin-bottom: 30px;
  li{
    cursor:pointer;
    width:120px;
    height:40px;
    line-height: 40px;
    font-size: 14px;
    text-align: center;
    color: #FC9217;
    &:nth-child(1){
      border-right: 1px solid #FC9217;
    }
  }
  li.active{
    background: #FC9217;
    color: #ffffff;
  }
}
</style>

<style lang="scss">
@import "../styles/login.scss";

.bgBox{
  .baseDialog .el-dialog__footer{
    .tips{
      margin-bottom: 40px;
      a{
        color: #FC9217;
      }
    }
  }
}
</style>





