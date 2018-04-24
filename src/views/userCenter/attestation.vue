<template>
    <div class="attesBox">
        <p class="topTip">安全建议：检查访问网址、开启二次验证、不要给他人转账和透露密码信息等。</p>
        <div class="googleBox">
            <div class="stepsBox">
                <el-steps :active="steps" align-center>
                    <el-step title="下载APP"><span slot="icon"></span></el-step>
                    <el-step title="扫描及备份密匙"><span slot="icon"></span></el-step>
                    <el-step title="绑定谷歌认证"><span slot="icon"></span></el-step>
                </el-steps>
            </div>

            <div class="step1 stepItem" v-show="steps == 1">
                <img class="logo" src="../../assets/appstore.png">
                <img class="logo" src="../../assets/googlePlay.png">
                <el-button type="primary" size="mini" class="btnBase" @click="steps++">下一步</el-button>
            </div>
            <div class="step2 stepItem" v-show="steps == 2">
                <p class="tips">谷歌二次验证16位密钥</p>
                <p class="theKey">UDFH478ITJ39JKRU</p>
                <div class="yardBox">
                    <img src="../../assets/pic.jpg" class="yard">
                    <p class="tips">试用谷歌验证器APP</p>
                    <p class="tips">扫描该二维码</p>
                </div>
                <p class="tips">请将16位密钥备份，并保存在安全的地方。如遇手机丢失，你可以通过该密钥恢复你的谷歌验证。</p>
                <p class="tips notice">注意: 通过人工客服重置你的谷歌验证需提交工单，可能需要至少7天时间来处理。</p>
                <el-button type="primary" size="mini" class="btnBase" @click="steps++">下一步</el-button>
            </div>
            <div class="step3 stepItem" v-show="steps == 3">
                <el-form :model="googleForm" size="small" label-width="120px" label-position="left" :rules="rules" ref="googleForm" class="formbase">
                    <div class="formT">
                    <el-form-item prop="email" label="16位密钥">
                        <el-input
                        class="inputBase"
                        placeholder=""
                        v-model="googleForm.email">
                        </el-input>
                    </el-form-item>
                    <el-form-item prop="pass" label="登录密码">
                        <el-input
                        class="inputBase"
                        placeholder=""
                        type="password"
                        v-model="googleForm.pass">
                        </el-input>
                    </el-form-item>
                    <el-form-item prop="verification" label="谷歌验证码">
                        <el-input
                        class="inputBase"
                        placeholder=""
                        v-model="googleForm.verification">
                        </el-input>
                    </el-form-item>
                    </div>
                    <div class="formB">
                    <el-form-item>
                        <el-button type="primary" class="submitBtn btnBase" @click="submitForm('googleForm')">确定</el-button>
                    </el-form-item>
                    </div>
                </el-form>
            </div>
        </div>

        <!-- 完成谷歌验证 -->
        <el-dialog
            title="完成谷歌验证"
            :visible.sync="finishFlag"
            :show-close = "false"
            width="30%"
            custom-class="baseDialog"
            center>
            <p>恭喜您完成谷歌验证绑定</p>
            <span slot="footer" class="dialog-footer">
                <el-button type="primary" size="mini" @click="changeFinishFlag()">完成</el-button>
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
        // this.$refs[formName].validate((valid) => {
        //   if (valid) {
        //     alert('submit!');
        //   } else {
        //     console.log('error submit!!');
        //     return false;
        //   }
        // });
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
.attesBox{
    width: 1200px;
    margin: auto;
    color: #4a4a4a;
    .topTip {
        height: 40px;
        line-height: 40px;
        background: #f6e7b2;
        color: #d79528;
        box-sizing: border-box;
        padding: 0 30px;
        margin: 20px 0 40px;
        
    }
    .googleBox{
        width: 800px;
        margin: auto;
        padding-top: 20px;
        .stepsBox{
            margin-bottom: 30px;
            .el-step__title.is-process{
                font-weight: 500;
            }
            .el-step__head.is-process{
                border-color: #E5E5E5;
                color: #E5E5E5;
            }
            .el-step__head.is-finish{
                color: #d79528;
                .el-step__icon{
                    background-color: #E89E12;
                    border-color: #F3CD87;
                }
            }
            .el-step__title.is-finish{
                color: #4a4a4a;
            }
            .el-step__head.is-wait{
                border-color: #E5E5E5;
                color: #E5E5E5;
            }
            .el-step__line{
                background-color: #E5E5E5;
            }
            .el-step.is-horizontal .el-step__line{
                top: 20px;
                width: 64%;
                margin: auto !important;
            }
            .el-step__icon{
                width: 40px;
                height: 40px;
            }
            .el-step__icon.is-text{
                border: 5px solid;
            }
            .el-step__title{
                font-size: 14px;
            }
        }
        .stepItem{
            display: flex;
            flex-direction: column;
            align-items: center;
            .el-button{
                margin-top: 20px;
            }
        }
        .step1{
            .logo{
                width: 200px;
                height: 60px;
                margin: 20px 0; 
            }
            
        }
        .step2{
            padding: 20px 0;
            .tips{
                font-size: 12px;
                color: #333333;
                width: 100%;
                text-align: center;
                margin: 4px 0;

            }
            .theKey{
                background: #D8D8D8;
                padding: 4px 28px;
                margin: 10px 0;
            }
            .yardBox{
                width: 180px;
                height: 180px;
                border: 1px solid #cccccc;
                padding: 10px 0px;
                display: flex;
                flex-direction: column;
                align-items: center;
                margin: 20px 0;
                .tips{
                    margin: 0;
                }
                .yard{
                    width: 150px;
                    height: 150px;
                }
            }
            .notice{
                color: #D0021B;
            }
        }
        .step3{
            .formbase{
                display: flex;
                flex-direction: column;
                align-items: center;
                width: 600px;
                .inputBase{
                    width: 300px;
                }
                .el-form-item{
                    margin-bottom: 28px;
                }
                .el-button{
                    margin-left: -150px;
                }
            }
        }
    }
    .baseDialog{
        .el-dialog__body{
            text-align: center;
            p{
                padding: 30px 0;
                display: block;
                width: 100%;
            }
        }
    }
}


</style>