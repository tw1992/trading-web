<template>
  <div class="bgBox">
    <div class="loginBox">
      <div class="logoBox">
        <p class="logo">LOGO</p>
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
          <el-form-item prop="pass">
            <el-input
              placeholder="密码"
              type="password"
              v-model="loginForm.pass">
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
        doubleDialog: true,
        doubleSelect: 1,
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

<style lang="scss" scoped>
.linkList{
  justify-content: space-between;
}
.iconfont{
  font-size:24px;
}
.doubleSelect{
  border: 1px solid #F5A623;
  display: flex;
  margin-bottom: 30px;
  li{
    cursor:pointer;
    width:120px;
    height:40px;
    line-height: 40px;
    font-size: 14px;
    text-align: center;
    color: #F5A623;
    &:nth-child(1){
      border-right: 1px solid #F5A623;
    }
  }
  li.active{
    background: #F5A623;
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
        color: #F5A623;
      }
    }
  }
}
</style>





