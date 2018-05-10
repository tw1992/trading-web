<template>
    <div class="autonymBox">
        <p class="topTip">安全建议：检查访问网址、开启二次验证、不要给他人转账和透露密码信息等。</p>
        <div class="autTop">
            <router-link to=""><i class="el-icon-d-arrow-left"></i></router-link>
            <p class="topTitle">实名认证</p>
        </div>

        <div class="formBox">
            <div class="selectItem">
                <p class="label">证件类型</p>
                <el-select v-model="type" @change="selectChange()">
                <el-option label="居民二代身份证" value="0"></el-option>
                <el-option label="护照" value="1"></el-option>
                </el-select>
            </div>
            
            <!-- 身份证form -->
            <el-form v-if="type=='0'" label-position="left" :model="IDForm" :rules="IDForm.rules" ref="IDForm" label-width="100px" class="IDForm">
                <el-form-item class="tipList">
                    <p class="tips">目前支持的证件类型如下：</p>
                    <p class="tips">1. 国内用户可提供：国内居民二代身份证</p>
                    <p class="tips">2. 海外用户可提供：护照（不含中国公民）</p>
                </el-form-item>
                <el-form-item label="姓名" placeholder="请填写姓名" prop="name">
                    <el-input v-model="IDForm.name"></el-input>
                </el-form-item>
                
                <el-form-item label="证件号"  placeholder="请填写证件号码" class="mb76" prop="cardNum">
                    <el-input v-model="IDForm.cardNum"></el-input>
                </el-form-item>
                <el-form-item label="证件照片" class="labelInit mb46">
                    <p class="tips">照片形式请参考示例进行拍摄，图片横拍，脸部光线均匀不要有阴影，背景简单，头顶拍全。</p>
                    <p class="tips">身份证信息清晰可见，照片大小不要超过5M</p>
                    <p class="tips">(认证的身份证信息不可修改，请谨慎填写)</p>
                </el-form-item>
                <el-form-item prop="IDImg" class="upBox">
                    <div class="itemL">
                        <el-upload
                            class="avatar-uploader"
                            action="https://up-z2.qiniup.com"
                            :show-file-list="false"
                            :on-success="handleAvatarSuccess1"
                            :before-upload="beforeAvatarUpload"
                            :data="postData">
                            <img v-if="front" :src="front" class="avatar">
                            <i v-else class="el-icon-circle-plus-outline avatar-uploader-icon"></i>
                        </el-upload>
                        <p class="Ltips">上传身份证正面</p>
                    </div>
                    <div class="itemC">
                        <p class="exampletip">示例<i class="el-icon-caret-right"></i></p> 
                    </div>
                    <div class="itemR">
                        <img src="../../assets/img/ID  POSITIVE.png" alt="">
                    </div>
                </el-form-item>
                <el-form-item prop="IDImg" class="upBox">
                    <div class="itemL">
                        <el-upload
                            class="avatar-uploader"
                            action="https://up-z2.qiniup.com"
                            :show-file-list="false"
                            :on-success="handleAvatarSuccess2"
                            :before-upload="beforeAvatarUpload"
                            :data="postData">
                            <img v-if="back" :src="back" class="avatar">
                            <i v-else class="el-icon-circle-plus-outline avatar-uploader-icon"></i>
                        </el-upload>
                        <p class="Ltips">上传身份证反面</p>
                    </div>
                    <div class="itemC">
                        <p class="exampletip">示例<i class="el-icon-caret-right"></i></p> 
                    </div>
                    <div class="itemR">
                        <img src="../../assets/img/ID  left.png" alt="">
                    </div>
                </el-form-item>
                <el-form-item prop="IDImg" class="upBox">
                    <div class="itemL">
                        <el-upload
                            class="avatar-uploader"
                            action="https://up-z2.qiniup.com"
                            :show-file-list="false"
                            :on-success="handleAvatarSuccess3"
                            :before-upload="beforeAvatarUpload"
                            :data="postData">
                            <img v-if="image" :src="image" class="avatar">
                            <i v-else class="el-icon-circle-plus-outline avatar-uploader-icon"></i>
                        </el-upload>
                        <p class="Ltips textl">请您上传一张手持身份证正面照和个人签字的照片，个人签字的内容包含“币加”和当前日期。请确保照片和个人签字的内容清晰可见。</p>
                    </div>
                    <div class="itemC">
                        <p class="exampletip">示例<i class="el-icon-caret-right"></i></p> 
                    </div>
                    <div class="itemR">
                        <img src="../../assets/img/ID  hand.png" alt="">
                    </div>
                </el-form-item>
                
                <el-form-item>
                    <el-button class="btnBase" type="primary" @click="IDFormSubmit()">确定</el-button>
                </el-form-item>
            </el-form>

            <!-- 护照form -->
            <el-form v-if="type=='1'" label-position="left" :model="passportForm" :rules="passportForm.rules" ref="passportForm" label-width="100px" class="IDForm">
                <el-form-item class="tipList">
                    <p class="tips">目前支持的证件类型如下：</p>
                    <p class="tips">1. 国内用户可提供：国内居民二代身份证</p>
                    <p class="tips">2. 海外用户可提供：护照（不含中国公民）</p>
                </el-form-item>
                <el-form-item label="国籍" placeholder="请填写国籍" prop="name">
                    <el-input v-model="passportForm.name"></el-input>
                </el-form-item>

                <el-form-item label="姓名" placeholder="请填写姓名" prop="name">
                    <el-input v-model="passportForm.name"></el-input>
                </el-form-item>
                
                <el-form-item label="护照号码" class="mb76" placeholder="请填写护照号码" prop="cardNum">
                    <el-input v-model="passportForm.cardNum"></el-input>
                </el-form-item>
                <el-form-item label="证件照片" class="labelInit mb46">
                    <p class="tips">照片形式请参考示例进行拍摄，图片横拍，脸部光线均匀不要有阴影，背景简单，头顶拍全。</p>
                    <p class="tips">身份证信息清晰可见，照片大小不要超过5M</p>
                    <p class="tips">(认证的身份证信息不可修改，请谨慎填写)</p>
                </el-form-item>
                <el-form-item prop="IDImg" class="upBox">
                    <div class="itemL">
                        <el-upload
                            class="avatar-uploader"
                            action="https://up-z2.qiniup.com"
                            :show-file-list="false"
                            :on-success="handleAvatarSuccess1"
                            :before-upload="beforeAvatarUpload"
                            :data="postData">
                            <img v-if="front" :src="front" class="avatar">
                            <i v-else class="el-icon-circle-plus-outline avatar-uploader-icon"></i>
                        </el-upload>
                        <p class="Ltips">请上传护照封面</p>
                    </div>
                    <div class="itemC">
                        <p class="exampletip">示例<i class="el-icon-caret-right"></i></p> 
                    </div>
                    <div class="itemR">
                        <img src="../../assets/img/password.png" alt="">
                    </div>
                </el-form-item>
                <el-form-item prop="IDImg" class="upBox">
                    <div class="itemL">
                        <el-upload
                            class="avatar-uploader"
                            action="https://up-z2.qiniup.com"
                            :show-file-list="false"
                            :on-success="handleAvatarSuccess2"
                            :before-upload="beforeAvatarUpload"
                            :data="postData">
                            <img v-if="back" :src="back" class="avatar">
                            <i v-else class="el-icon-circle-plus-outline avatar-uploader-icon"></i>
                        </el-upload>
                        <p class="Ltips">请上传护照信息页</p>
                    </div>
                    <div class="itemC">
                        <p class="exampletip">示例<i class="el-icon-caret-right"></i></p> 
                    </div>
                    <div class="itemR">
                        <img src="../../assets/img/ID passport.png" alt="">
                    </div>
                </el-form-item>
                <el-form-item prop="IDImg" class="upBox">
                    <div class="itemL">
                        <el-upload
                            class="avatar-uploader"
                            action="https://up-z2.qiniup.com"
                            :show-file-list="false"
                            :on-success="handleAvatarSuccess3"
                            :before-upload="beforeAvatarUpload"
                            :data="postData">
                            <img v-if="image" :src="image" class="avatar">
                            <i v-else class="el-icon-circle-plus-outline avatar-uploader-icon"></i>
                        </el-upload>
                        <p class="Ltips textl">请您上传一张手持护照信息页和个人签字的照片，个人签字的内容包含“币加”和当前日期。请确保照片和个人签字的内容清晰可见。</p>
                    </div>
                    <div class="itemC">
                        <p class="exampletip">示例<i class="el-icon-caret-right"></i></p> 
                    </div>
                    <div class="itemR">
                        <img src="../../assets/img/passport  hand.png" alt="">
                    </div>
                </el-form-item>
                
                <el-form-item>
                    <el-button class="btnBase" type="primary" @click="submitForm('passportForm')">确定</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<script>
import axios from '../../api/axios'
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
        type: '0',
        front: '',
        back: '',
        image: '',
        IDForm: {
            name: '',
            cardNum: '',
            rules :{
                name:[{ required: true, message: '请输入姓名', trigger: 'blur' }],
                cardNum:[{ required: true, message: '请输入证件号码', trigger: 'blur' },]
            },
        },
        passportForm: {
            name: '',
            cardNum: '',
            rules :{
                name:[{ required: true, message: '请输入姓名', trigger: 'blur' }],
                cardNum:[{ required: true, message: '请输入证件号码', trigger: 'blur' },]
            },
        },
        googleForm:{
          email:"",
          pass:"",
          verification:"",
        },
        rules:{
          email:[{ validator: validateEmail, trigger: 'blur' }],
          pass:[{  message: '请输入密码', trigger: 'blur' },]
        },
        domain:'',
        finishFlag: false,
        postData: {
            token: ''
        }
    };
  },
  methods: {
      submitForm(formName) {
        this.finishFlag = true;
      },
      selectChange() {
        this.front = ''
        this.back = ''
        this.image = ''
      },
      changeFinishFlag() {
          //this.finishFlag = false;
          this.$router.push("/userCenter/account")
      },
      handleAvatarSuccess1(res, file) {
        this.front = URL.createObjectURL(file.raw);
      },
      handleAvatarSuccess2(res, file) {
        this.back = URL.createObjectURL(file.raw);
      },
      handleAvatarSuccess3(res, file) {
        this.image = URL.createObjectURL(file.raw);
      },
      beforeAvatarUpload(file) {
        const isJPG = file.type === 'image/jpeg'||'image/png';
        const isLt5M = file.size / 1024 / 1024 < 5;

        if (!isJPG) {
          this.$message.error('上传头像图片只能是 JPG 格式!');
        }
        if (!isLt5M) {
          this.$message.error('上传头像图片大小不能超过 5MB!');
        }
        return isJPG && isLt5M;
      },
      IDFormSubmit() {
        var _this = this;
        this.$refs['IDForm'].validate((valid) => {
          if (valid) {
              if(this.front||this.back||this.image){
                  var IDdata = {
                    passportType: this.type,
                    name: this.IDForm.name,
                    country: "中国",
                    passportId: this.IDForm.cardNum,
                    passportFront: this.front,
                    passportBack: this.back,
                    passportImage: this.image,
                }
                axios.post('/api/user/kyc',IDdata).then(function(res){  
                    console.log(res);
                    _this.domain = res.data.domain;
                    _this.postData.token = res.data.token;
                }).catch(function (res){  
                    console.log(res);
                });
              }else{
                  this.$message({
                      message: '请上传图片',
                      type: 'warning'
                  })
              }
            
          } else {
            console.log('error submit!!');
            return false;
          }
        });
        
        
      }
    },
    created() {
        var _this = this;
        axios.get('/api/qiniu_upload_token').then(function(res){  
            console.log(res);
            _this.domain = res.data.domain;
            _this.postData.token = res.data.token;
        }).catch(function (res){  
            console.log(res);
        });
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
    .mb76{
        margin-bottom: 76px;
    }
    .mb46{
        margin-bottom: 46px;
    }
    .textl{
        text-align: left !important;
    }
    .formBox{
        padding: 30px 0;
        
        .tips{
            font-size: 14px;
            color: #999999;
            line-height: 20px;
        }
        .tipList{
            margin-bottom: 40px;
        }
        .labelInit{
            label{
                line-height: 20px;
            }
        }
        input{
            width: 300px;
            border-radius: 0;
        }
        .selectItem{
            margin-bottom: 100px;
            .label{
                width: 100px;
                vertical-align: middle;
                float: left;
                font-size: 14px;
                color: #606266;
                line-height: 40px;
                padding: 0 12px 0 0;
                box-sizing: border-box;
            }
        }
        .el-form-item.is-required .el-form-item__label:before{
            content: '';
            margin-right: 0;
        }
        .el-upload--text{
            background:  #EEEEEE;
        }
        .avatar-uploader .el-upload {
            border: 1px dashed #d9d9d9;
            border-radius: 6px;
            cursor: pointer;
            position: relative;
            overflow: hidden;
        }
        .avatar-uploader .el-upload:hover {
            border-color: #FC9217;
        }
        .avatar-uploader-icon {
            font-size: 80px;
            color: #ffffff;
            width: 300px;
            height: 200px;
            line-height: 200px;
            text-align: center;
        }
        .avatar {
            width: 300px;
            height: 200px;
            display: block;
        }
        .upBox{
            margin-bottom: 36px;
        }
        .upBox .el-form-item__content{
            margin-left: 60px !important;
            width: 800px;
            display: flex;
            justify-content: space-between;
            .Ltips{
                color: #999999;
                width: 302px;
                line-height: 18px;
                text-align: center;
            }
            .itemC{
                line-height: 200px;
            }
        }
        .el-button{
            margin: 30px 0;
        }
    }
}


</style>