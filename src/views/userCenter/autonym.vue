<template>
    <div class="autonymBox">
        <p class="topTip">安全建议：检查访问网址、开启二次验证、不要给他人转账和透露密码信息等。</p>
        <div class="autTop">
            <router-link to=""><i class="el-icon-d-arrow-left"></i></router-link>
            <p class="topTitle">实名认证</p>
        </div>

        <div class="formBox">
            
        </div>
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
        steps: 1,
        googleForm:{
          email:"",
          pass:"",
          verification:"",
        },
        rules:{
          email:[{ validator: validateEmail, trigger: 'blur' }],
          pass:[{  message: '请输入密码', trigger: 'blur' },]
        },
        finishFlag: false,
    };
  },
  methods: {
      submitForm(formName) {
        this.finishFlag = true;
      },
      changeFinishFlag() {
          //this.finishFlag = false;
          this.$router.push("/userCenter/account")
      }
    }
};
</script>

<style lang='scss'>
.autonymBox{
    width: 1200px;
    margin: auto;
    color: #333333;
    .topTip {
        height: 40px;
        line-height: 40px;
        background: #f6e7b2;
        color: #d79528;
        box-sizing: border-box;
        padding: 0 30px;
        margin: 20px 0;
        
    }
    .autTop{
        display: flex;
        line-height: 40px;
        font-size: 18px;
        border-bottom: 1px solid #cccccc;
        a{
            color: #333333;
            margin-right: 14px;
        }
    }

    .formBox{

    }
}


</style>