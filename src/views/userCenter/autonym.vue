<!--<template>-->
    <!--<div class="autonymBox">-->
        <!--<p class="topTip">{{$t('user.recommendations')}}</p>-->
        <!--<div class="autTop">-->
            <!--<router-link to="/userCenter/account"><i class="el-icon-d-arrow-left"></i></router-link>-->
            <!--<p class="topTitle">{{$t('autonym.personal')}}</p>-->
        <!--</div>-->

        <!--<div class="formBox">-->
            <!--<div class="selectItem">-->
                <!--<p class="label">{{$t('autonym.cardType')}}</p>-->
                <!--<el-select v-model="type" :placeholder="$t('button.select')" @change="selectChange()">-->
                <!--<el-option :label="$t('autonym.IDcard')" value="0"></el-option>-->
                <!--<el-option :label="$t('autonym.passport')" value="1"></el-option>-->
                <!--</el-select>-->
            <!--</div>-->

            <!--&lt;!&ndash; 身份证form &ndash;&gt;-->
            <!--<el-form v-show="type=='0'" label-position="left" :model="IDForm" :rules="IDFormRules" ref="IDForm" label-width="100px" class="IDForm">-->
                <!--<el-form-item class="tipList">-->
                    <!--<p class="tips">{{$t('autonym.suppertType')}}</p>-->
                    <!--<p class="tips">{{$t('autonym.suppertType1')}}</p>-->
                    <!--<p class="tips">{{$t('autonym.suppertType2')}}</p>-->
                <!--</el-form-item>-->
                <!--<el-form-item :label="$t('autonym.name')" prop="name">-->
                    <!--<el-input :placeholder="$t('autonym.namePlaceholder')" v-model="IDForm.name"></el-input>-->
                <!--</el-form-item>-->

                <!--<el-form-item :label="$t('autonym.idCard')" class="mb76" prop="cardNum">-->
                    <!--<el-input  :placeholder="$t('autonym.idNumber')" v-model="IDForm.cardNum"></el-input>-->
                <!--</el-form-item>-->
                <!--<el-form-item :label="$t('autonym.cardPicture')" class="labelInit mb46">-->
                    <!--<p class="tips">{{$t('autonym.photoRequire1')}}</p>-->
                    <!--<p class="tips">{{$t('autonym.photoRequire2')}}</p>-->
                    <!--<p class="tips">{{$t('autonym.photoRequire3')}}</p>-->
                <!--</el-form-item>-->
                <!--<el-form-item class="upBox">-->
                    <!--<div class="itemL">-->
                        <!--<el-upload-->
                            <!--class="avatar-uploader"-->
                            <!--action="https://up-z2.qiniup.com"-->
                            <!--:show-file-list="false"-->
                            <!--:on-success="handleAvatarSuccess1"-->
                            <!--:before-upload="beforeAvatarUpload"-->
                            <!--:data="postData">-->
                            <!--<img v-if="front" :src="front" class="avatar">-->
                            <!--<i v-else class="el-icon-circle-plus-outline avatar-uploader-icon"></i>-->
                        <!--</el-upload>-->
                        <!--<p class="Ltips">{{$t('autonym.IDFrontSide')}}</p>-->
                    <!--</div>-->
                    <!--<div class="itemC">-->
                        <!--<p class="exampletip">{{$t('autonym.example')}}<i class="el-icon-caret-right"></i></p>-->
                    <!--</div>-->
                    <!--<div class="itemR">-->
                        <!--<img src="../../assets/img/ID  POSITIVE.png" alt="">-->
                    <!--</div>-->
                <!--</el-form-item>-->
                <!--<el-form-item class="upBox">-->
                    <!--<div class="itemL">-->
                        <!--<el-upload-->
                            <!--class="avatar-uploader"-->
                            <!--action="https://up-z2.qiniup.com"-->
                            <!--:show-file-list="false"-->
                            <!--:on-success="handleAvatarSuccess2"-->
                            <!--:before-upload="beforeAvatarUpload"-->
                            <!--:data="postData">-->
                            <!--<img v-if="back" :src="back" class="avatar">-->
                            <!--<i v-else class="el-icon-circle-plus-outline avatar-uploader-icon"></i>-->
                        <!--</el-upload>-->
                        <!--<p class="Ltips">{{$t('autonym.IDBackSide')}}</p>-->
                    <!--</div>-->
                    <!--<div class="itemC">-->
                        <!--<p class="exampletip">{{$t('autonym.example')}}<i class="el-icon-caret-right"></i></p>-->
                    <!--</div>-->
                    <!--<div class="itemR">-->
                        <!--<img src="../../assets/img/ID  left.png" alt="">-->
                    <!--</div>-->
                <!--</el-form-item>-->
                <!--<el-form-item class="upBox">-->
                    <!--<div class="itemL">-->
                        <!--<el-upload-->
                            <!--class="avatar-uploader"-->
                            <!--action="https://up-z2.qiniup.com"-->
                            <!--:show-file-list="false"-->
                            <!--:on-success="handleAvatarSuccess3"-->
                            <!--:before-upload="beforeAvatarUpload"-->
                            <!--:data="postData">-->
                            <!--<img v-if="image" :src="image" class="avatar">-->
                            <!--<i v-else class="el-icon-circle-plus-outline avatar-uploader-icon"></i>-->
                        <!--</el-upload>-->
                        <!--<p class="Ltips textl">{{$t('autonym.idphotoTip')}}</p>-->
                    <!--</div>-->
                    <!--<div class="itemC">-->
                        <!--<p class="exampletip">{{$t('autonym.example')}}<i class="el-icon-caret-right"></i></p>-->
                    <!--</div>-->
                    <!--<div class="itemR">-->
                        <!--<img src="../../assets/img/ID  hand.png" alt="">-->
                    <!--</div>-->
                <!--</el-form-item>-->

                <!--<el-form-item>-->
                    <!--<el-button class="btnBase" type="primary" @click="IDFormSubmit()">{{$t('button.submit')}}</el-button>-->
                <!--</el-form-item>-->
            <!--</el-form>-->

            <!--&lt;!&ndash; 护照form &ndash;&gt;-->
            <!--<el-form v-show="type=='1'" label-position="left" :model="passportForm" :rules="passportFormRules" ref="passportForm" label-width="100px" class="IDForm">-->
                <!--<el-form-item class="tipList">-->
                    <!--<p class="tips">{{$t('autonym.suppertType')}}</p>-->
                    <!--<p class="tips">{{$t('autonym.suppertType1')}}</p>-->
                    <!--<p class="tips">{{$t('autonym.suppertType2')}}</p>-->
                <!--</el-form-item>-->
                <!--<el-form-item :label="$t('autonym.country')" prop="country">-->
                    <!--<el-select v-model="country" filterable :placeholder="$t('button.select')">-->
                        <!--<el-option-->
                            <!--v-for="item in countryList"-->
                            <!--:key="item.id"-->
                            <!--:label="item.name"-->
                            <!--:value="item.id">-->
                        <!--</el-option>-->
                    <!--</el-select>-->
                <!--</el-form-item>-->

                <!--<el-form-item :label="$t('autonym.name')" prop="name">-->
                    <!--<el-input :placeholder="$t('autonym.namePlaceholder')" v-model="passportForm.name"></el-input>-->
                <!--</el-form-item>-->
                <!--<el-form-item :label="$t('autonym.passportNum')" class="mb76" prop="cardNum">-->
                    <!--<el-input :placeholder="$t('autonym.passportNumber')" v-model="passportForm.cardNum"></el-input>-->
                <!--</el-form-item>-->
                <!--<el-form-item :label="$t('autonym.cardPicture')" class="labelInit mb46">-->
                    <!--<p class="tips">{{$t('autonym.photoRequire1')}}</p>-->
                    <!--<p class="tips">{{$t('autonym.photoRequire2')}}</p>-->
                    <!--<p class="tips">{{$t('autonym.photoRequire3')}}</p>-->
                <!--</el-form-item>-->
                <!--<el-form-item class="upBox">-->
                    <!--<div class="itemL">-->
                        <!--<el-upload-->
                            <!--class="avatar-uploader"-->
                            <!--action="https://up-z2.qiniup.com"-->
                            <!--:show-file-list="false"-->
                            <!--:on-success="handleAvatarSuccess1"-->
                            <!--:before-upload="beforeAvatarUpload"-->
                            <!--:data="postData">-->
                            <!--<img v-if="front" :src="front" class="avatar">-->
                            <!--<i v-else class="el-icon-circle-plus-outline avatar-uploader-icon"></i>-->
                        <!--</el-upload>-->
                        <!--<p class="Ltips">{{$t('autonym.passportcover')}}</p>-->
                    <!--</div>-->
                    <!--<div class="itemC">-->
                        <!--<p class="exampletip">{{$t('autonym.example')}}<i class="el-icon-caret-right"></i></p>-->
                    <!--</div>-->
                    <!--<div class="itemR">-->
                        <!--<img src="../../assets/img/password.png" alt="">-->
                    <!--</div>-->
                <!--</el-form-item>-->
                <!--<el-form-item class="upBox">-->
                    <!--<div class="itemL">-->
                        <!--<el-upload-->
                            <!--class="avatar-uploader"-->
                            <!--action="https://up-z2.qiniup.com"-->
                            <!--:show-file-list="false"-->
                            <!--:on-success="handleAvatarSuccess2"-->
                            <!--:before-upload="beforeAvatarUpload"-->
                            <!--:data="postData">-->
                            <!--<img v-if="back" :src="back" class="avatar">-->
                            <!--<i v-else class="el-icon-circle-plus-outline avatar-uploader-icon"></i>-->
                        <!--</el-upload>-->
                        <!--<p class="Ltips">{{$t('autonym.passportdatapage')}}</p>-->
                    <!--</div>-->
                    <!--<div class="itemC">-->
                        <!--<p class="exampletip">{{$t('autonym.example')}}<i class="el-icon-caret-right"></i></p>-->
                    <!--</div>-->
                    <!--<div class="itemR">-->
                        <!--<img src="../../assets/img/ID passport.png" alt="">-->
                    <!--</div>-->
                <!--</el-form-item>-->
                <!--<el-form-item class="upBox">-->
                    <!--<div class="itemL">-->
                        <!--<el-upload-->
                            <!--class="avatar-uploader"-->
                            <!--action="https://up-z2.qiniup.com"-->
                            <!--:show-file-list="false"-->
                            <!--:on-success="handleAvatarSuccess3"-->
                            <!--:before-upload="beforeAvatarUpload"-->
                            <!--:data="postData">-->
                            <!--<img v-if="image" :src="image" class="avatar">-->
                            <!--<i v-else class="el-icon-circle-plus-outline avatar-uploader-icon"></i>-->
                        <!--</el-upload>-->
                        <!--<p class="Ltips textl">{{$t('autonym.passportphotoTip')}}</p>-->
                    <!--</div>-->
                    <!--<div class="itemC">-->
                        <!--<p class="exampletip">{{$t('autonym.example')}}<i class="el-icon-caret-right"></i></p>-->
                    <!--</div>-->
                    <!--<div class="itemR">-->
                        <!--<img src="../../assets/img/passport  hand.png" alt="">-->
                    <!--</div>-->
                <!--</el-form-item>-->

                <!--<el-form-item>-->
                    <!--<el-button class="btnBase" type="primary" @click="passportSubmit()">{{$t('button.submit')}}</el-button>-->
                <!--</el-form-item>-->
            <!--</el-form>-->
        <!--</div>-->
    <!--</div>-->
<!--</template>-->

<!--<script>-->
<!--import { mapGetters } from 'vuex'-->
<!--import axios from '../../api/axios'-->

<!--export default {-->
  <!--data() {-->
      <!--// var validateEmail = (rule, value, callback) => {-->
      <!--//   if (value === '') {-->
      <!--//     callback(new Error(this.$t('login.retrieveTip')));-->
      <!--//   } else {-->
      <!--//     var reg=new RegExp(/^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$/);-->
      <!--//     if (!reg.test(value)) {-->
      <!--//       callback(new Error(this.$t('login.retrieveTip1')));-->
      <!--//     }-->
      <!--//   }-->
      <!--// };-->
    <!--return {-->
        <!--supportWebp: false,   // 是否支持webp-->
        <!--bucketHost: '',   // 上传图片的外链域名-->
        <!--countryUrl:"/static/country",-->
        <!--countryList:[],-->
        <!--country: '',-->
        <!--type: '0',-->
        <!--front: '',-->
        <!--back: '',-->
        <!--image: '',-->
        <!--IDForm: {-->
            <!--name: '',-->
            <!--cardNum: '',-->
            <!--// rules :{-->
            <!--//     name:[{ required: true, message: '请输入姓名', trigger: 'blur' }],-->
            <!--//     cardNum:[{ required: true, message: '请输入证件号码', trigger: 'blur' },]-->
            <!--// },-->
        <!--},-->
        <!--passportForm: {-->
            <!--name: '',-->
            <!--cardNum: '',-->
            <!--// rules :{-->
            <!--//     country:[{ required: true, message: '请选择国籍', trigger: 'blur' }],-->
            <!--//     name:[{ required: true, message: '请输入姓名', trigger: 'blur' }],-->
            <!--//     cardNum:[{ required: true, message: '请输入证件号码', trigger: 'blur' },]-->
            <!--// },-->
        <!--},-->
        <!--googleForm:{-->
          <!--email:"",-->
          <!--pass:"",-->
          <!--verification:"",-->
        <!--},-->
        <!--// rules:{-->
        <!--//   email:[{ validator: validateEmail, trigger: 'blur' }],-->
        <!--//   pass:[{  message: '请输入密码', trigger: 'blur' },]-->
        <!--// },-->
        <!--finishFlag: false,-->
        <!--postData: {-->
            <!--token: ''-->
        <!--}-->
    <!--};-->
  <!--},-->
  <!--methods: {-->
      <!--submitForm(formName) {-->
        <!--this.finishFlag = true;-->
      <!--},-->
      <!--selectChange() {-->
        <!--this.front = ''-->
        <!--this.back = ''-->
        <!--this.image = ''-->
      <!--},-->
      <!--changeFinishFlag() {-->
          <!--//this.finishFlag = false;-->
          <!--this.$router.push("/userCenter/account")-->
      <!--},-->
      <!--handleAvatarSuccess1(res, file) {-->
        <!--//this.front = URL.createObjectURL(file.raw);-->
        <!--let key = res.key-->
        <!--let name = file.name-->
        <!--let prefix = this.supportWebp ? 'webp/' : ''-->
        <!--let img = `http://${this.bucketHost}/${prefix}${encodeURI(key)}`-->
        <!--this.front = img-->
        <!--console.log(img)-->
      <!--},-->
      <!--handleAvatarSuccess2(res, file) {-->
        <!--//this.back = URL.createObjectURL(file.raw);-->
        <!--let key = res.key-->
        <!--let name = file.name-->
        <!--let prefix = this.supportWebp ? 'webp/' : ''-->
        <!--let img = `http://${this.bucketHost}/${prefix}${encodeURI(key)}`-->
        <!--this.back = img-->
        <!--console.log(img)-->
      <!--},-->
      <!--handleAvatarSuccess3(res, file) {-->
        <!--//this.image = URL.createObjectURL(file.raw);-->
        <!--let key = res.key-->
        <!--let name = file.name-->
        <!--let prefix = this.supportWebp ? 'webp/' : ''-->
        <!--let img = `http://${this.bucketHost}/${prefix}${encodeURI(key)}`-->
        <!--this.image = img-->
        <!--console.log(img)-->
      <!--},-->
      <!--beforeAvatarUpload(file) {-->
        <!--const isJPG = file.type === 'image/jpeg'||'image/png';-->
        <!--const isLt5M = file.size / 1024 / 1024 < 5;-->

        <!--if (!isJPG) {-->
          <!--this.$message.error('上传头像图片只能是 JPG 格式!');-->
        <!--}-->
        <!--if (!isLt5M) {-->
          <!--this.$message.error('上传头像图片大小不能超过 5MB!');-->
        <!--}-->
        <!--return isJPG && isLt5M;-->
      <!--},-->
      <!--IDFormSubmit() {-->
        <!--var _this = this;-->
        <!--this.$refs['IDForm'].validate((valid) => {-->
          <!--if (valid) {-->
              <!--if(this.front||this.back||this.image){-->
                  <!--var IDdata = {-->
                    <!--passportType: this.type,-->
                    <!--name: this.IDForm.name,-->
                    <!--country: "zh",-->
                    <!--passportId: this.IDForm.cardNum,-->
                    <!--passportFront: this.front,-->
                    <!--passportBack: this.back,-->
                    <!--passportImage: this.image,-->
                <!--}-->
                <!--axios.post('/api/user/kyc',IDdata).then(function(res){-->
                    <!--console.log(res);-->
                    <!--_this.bucketHost = res.data.domain;-->
                    <!--_this.postData.token = res.data.token;-->
                    <!--_this.$message({-->
                            <!--message: '提交成功',-->
                            <!--type: 'success'-->
                        <!--});-->
                    <!--setTimeout(()=>{-->
                        <!--_this.$router.push('/userCenter/account');-->
                    <!--},2000)-->
                <!--}).catch(function (res){-->
                    <!--console.log(res);-->
                <!--});-->
              <!--}else{-->
                  <!--this.$message({-->
                      <!--message: '请上传图片',-->
                      <!--type: 'warning'-->
                  <!--})-->
              <!--}-->

          <!--} else {-->
            <!--console.log('error submit!!');-->
            <!--return false;-->
          <!--}-->
        <!--});-->


      <!--},-->
      <!--passportSubmit() {-->
          <!--var _this = this;-->
          <!--this.$refs['passportForm'].validate((valid) => {-->
          <!--if (valid) {-->
              <!--if(this.front||this.back||this.image){-->
                  <!--var passportdata = {-->
                    <!--passportType: this.type,-->
                    <!--name: this.passportForm.name,-->
                    <!--country: this.country,-->
                    <!--passportId: this.passportForm.cardNum,-->
                    <!--passportFront: this.front,-->
                    <!--passportBack: this.back,-->
                    <!--passportImage: this.image,-->
                <!--}-->
                <!--axios.post('/api/user/kyc',passportdata).then(function(res){-->
                    <!--console.log(res);-->
                    <!--_this.bucketHost = res.data.domain;-->
                    <!--_this.postData.token = res.data.token;-->
                    <!--_this.$message({-->
                            <!--message: '提交成功',-->
                            <!--type: 'success'-->
                        <!--});-->
                    <!--setTimeout(()=>{-->
                        <!--_this.$router.push('/userCenter/account');-->
                    <!--},2000)-->
                <!--}).catch(function (res){-->
                    <!--console.log(res);-->
                <!--});-->
              <!--}else{-->
                  <!--this.$message({-->
                      <!--message: '请上传图片',-->
                      <!--type: 'warning'-->
                  <!--})-->
              <!--}-->

          <!--} else {-->
            <!--console.log('error submit!!');-->
            <!--return false;-->
          <!--}-->
        <!--});-->
      <!--},-->
      <!--getCountry() {-->
        <!--var _this = this;-->
        <!--if(this.language == "zh"){-->
            <!--var url = this.countryUrl+"/zh.json"-->
        <!--}else if(this.language == "zh-TW"){-->
            <!--var url = this.countryUrl+"/zh-TW.json"-->
        <!--}else if(this.language == "en"){-->
            <!--var url = this.countryUrl+"/en.json"-->
        <!--}-->
        <!--axios.get(url).then(function(res){-->
            <!--console.log(res);-->
            <!--var country = res;-->
            <!--var list = [];-->
            <!--for(var i in country){-->
                <!--var countryItem = {-->
                    <!--id: i,-->
                    <!--name: country[i]-->
                <!--}-->
                <!--list.push(countryItem);-->
            <!--}-->
            <!--_this.countryList = list;-->
            <!--// _this.domain = res.data.domain;-->
            <!--// _this.postData.token = res.data.token;-->
        <!--}).catch(function (res){-->
            <!--console.log(res);-->
        <!--});-->
      <!--}-->
    <!--},-->
    <!--computed: {-->
        <!--...mapGetters([-->
            <!--'language',-->
        <!--]),-->
        <!--language() {-->
          <!--return this.$store.getters.language-->
        <!--},-->
        <!--rules(){-->
            <!--var validateEmail = (rule, value, callback) => {-->
              <!--if (value === '') {-->
                <!--callback(new Error(this.$t('login.retrieveTip')));-->
              <!--} else {-->
                <!--var reg=new RegExp(/^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$/);-->
                <!--if (!reg.test(value)) {-->
                  <!--callback(new Error(this.$t('login.retrieveTip1')));-->
                <!--}-->
              <!--}-->
            <!--};-->
            <!--return {-->
              <!--email:[{ validator: validateEmail, trigger: 'blur' }],-->
              <!--pass:[{  message: this.$t('login.pwd'), trigger: 'blur' },]-->
          <!--}-->
        <!--},-->
        <!--passportFormRules(){-->
          <!--return {-->
            <!--country:[{ required: true, message:this.$t('login.selectCountry') , trigger: 'blur' }],-->
            <!--name:[{ required: true, message: this.$t('autonym.inputName'), trigger: 'blur' }],-->
            <!--cardNum:[{ required: true, message: this.$t('autonym.inputIdNum'), trigger: 'blur' },]-->
          <!--}-->
        <!--},-->
        <!--IDFormRules(){-->
          <!--return {-->
            <!--name:[{ required: true, message: this.$t('autonym.inputName'), trigger: 'blur' }],-->
            <!--cardNum:[{ required: true, message: this.$t('autonym.inputIdNum'), trigger: 'blur' },]-->
          <!--}-->
        <!--}-->
    <!--},-->
    <!--watch: {-->
        <!--language: function() {-->
            <!--this.getCountry();-->
        <!--}-->
    <!--},-->
    <!--created() {-->
        <!--var _this = this;-->
        <!--axios.get('/api/qiniu_upload_token').then(function(res){-->
            <!--console.log(res);-->
            <!--_this.bucketHost = res.data.domain;-->
            <!--_this.postData.token = res.data.token;-->
        <!--}).catch(function (res){-->
            <!--console.log(res);-->
        <!--});-->
        <!--this.getCountry();-->
    <!--}-->
<!--};-->
<!--</script>-->

<!--<style lang='scss'>-->
<!--.autonymBox{-->
    <!--width: 1200px;-->
    <!--margin: auto;-->
    <!--color: #333333;-->
    <!--.topTip {-->
        <!--height: 40px;-->
        <!--line-height: 40px;-->
        <!--background: #f6e7b2;-->
        <!--color: #d79528;-->
        <!--box-sizing: border-box;-->
        <!--padding: 0 30px;-->
        <!--margin: 20px 0;-->

    <!--}-->
    <!--.autTop{-->
        <!--display: flex;-->
        <!--line-height: 40px;-->
        <!--font-size: 18px;-->
        <!--border-bottom: 1px solid #cccccc;-->
        <!--a{-->
            <!--color: #333333;-->
            <!--margin-right: 14px;-->
        <!--}-->
    <!--}-->
    <!--.mb76{-->
        <!--margin-bottom: 76px;-->
    <!--}-->
    <!--.mb46{-->
        <!--margin-bottom: 46px;-->
    <!--}-->
    <!--.textl{-->
        <!--text-align: left !important;-->
    <!--}-->
    <!--.formBox{-->
        <!--padding: 30px 0;-->

        <!--.tips{-->
            <!--font-size: 14px;-->
            <!--color: #999999;-->
            <!--line-height: 20px;-->
        <!--}-->
        <!--.tipList{-->
            <!--margin-bottom: 40px;-->
        <!--}-->
        <!--.labelInit{-->
            <!--label{-->
                <!--line-height: 20px;-->
            <!--}-->
        <!--}-->
        <!--input{-->
            <!--width: 300px;-->
            <!--border-radius: 0;-->
        <!--}-->
        <!--.selectItem{-->
            <!--margin-bottom: 100px;-->
            <!--.label{-->
                <!--width: 100px;-->
                <!--vertical-align: middle;-->
                <!--float: left;-->
                <!--font-size: 14px;-->
                <!--color: #606266;-->
                <!--line-height: 40px;-->
                <!--padding: 0 12px 0 0;-->
                <!--box-sizing: border-box;-->
            <!--}-->
        <!--}-->
        <!--.el-form-item.is-required .el-form-item__label:before{-->
            <!--content: '';-->
            <!--margin-right: 0;-->
        <!--}-->
        <!--.el-upload&#45;&#45;text{-->
            <!--background:  #EEEEEE;-->
        <!--}-->
        <!--.avatar-uploader .el-upload {-->
            <!--border: 1px dashed #d9d9d9;-->
            <!--border-radius: 6px;-->
            <!--cursor: pointer;-->
            <!--position: relative;-->
            <!--overflow: hidden;-->
        <!--}-->
        <!--.avatar-uploader .el-upload:hover {-->
            <!--border-color: #FC9217;-->
        <!--}-->
        <!--.avatar-uploader-icon {-->
            <!--font-size: 80px;-->
            <!--color: #ffffff;-->
            <!--width: 300px;-->
            <!--height: 200px;-->
            <!--line-height: 200px;-->
            <!--text-align: center;-->
        <!--}-->
        <!--.avatar {-->
            <!--width: 300px;-->
            <!--height: 200px;-->
            <!--display: block;-->
        <!--}-->
        <!--.upBox{-->
            <!--margin-bottom: 36px;-->
        <!--}-->
        <!--.upBox .el-form-item__content{-->
            <!--margin-left: 60px !important;-->
            <!--width: 800px;-->
            <!--display: flex;-->
            <!--justify-content: space-between;-->
            <!--.Ltips{-->
                <!--color: #999999;-->
                <!--width: 302px;-->
                <!--line-height: 18px;-->
                <!--text-align: center;-->
            <!--}-->
            <!--.itemC{-->
                <!--line-height: 200px;-->
            <!--}-->
        <!--}-->
        <!--.el-button{-->
            <!--margin: 30px 0;-->
        <!--}-->
    <!--}-->
<!--}-->


<!--</style>-->


<template>
  <div class="autonymBox">
    <p class="topTip">{{$t('user.recommendations')}}</p>
    <div class="autTop">
      <router-link to="/userCenter/account"><i class="el-icon-d-arrow-left"></i></router-link>
      <p class="topTitle">{{$t('autonym.personal')}}</p>
    </div>

    <div class="formBox">
      <div class="selectItem">
        <p class="label">{{$t('autonym.cardType')}}</p>
        <el-select v-model="type" :placeholder="$t('button.select')" @change="selectChange()">
          <el-option :label="$t('autonym.IDcard')" value="0"></el-option>
          <!--<el-option :label="$t('autonym.passport')" value="1"></el-option>-->
        </el-select>
      </div>

      <!-- 身份证form -->
      <el-form v-show="type=='0'" label-position="left" :model="IDForm" :rules="IDFormRules" ref="IDForm" label-width="100px" class="IDForm">
        <el-form-item class="tipList">
          <p class="tips">{{$t('autonym.suppertType')}}</p>
          <p class="tips">{{$t('autonym.suppertType1')}}</p>
          <!--<p class="tips">{{$t('autonym.suppertType2')}}</p>-->
        </el-form-item>
        <el-form-item :label="$t('autonym.name')" prop="name">
          <el-input :placeholder="$t('autonym.namePlaceholder')" v-model="IDForm.name"></el-input>
        </el-form-item>

        <el-form-item :label="$t('autonym.idCard')" class="mb76" prop="cardNum">
          <el-input  :placeholder="$t('autonym.idNumber')" v-model="IDForm.cardNum"></el-input>
        </el-form-item>
        <el-form-item :label="$t('autonym.cardPicture')" class="labelInit mb46">
          <p class="tips">{{$t('autonym.photoRequire1')}}</p>
          <p class="tips">{{$t('autonym.photoRequire2')}}</p>
          <p class="tips">{{$t('autonym.photoRequire3')}}</p>
        </el-form-item>
        <!--<el-form-item class="upBox">-->
        <!--<div class="itemL">-->
        <!--<el-upload-->
        <!--class="avatar-uploader"-->
        <!--action="https://up-z2.qiniup.com"-->
        <!--:show-file-list="false"-->
        <!--:on-success="handleAvatarSuccess1"-->
        <!--:before-upload="beforeAvatarUpload"-->
        <!--:data="postData">-->
        <!--<img v-if="front" :src="front" class="avatar">-->
        <!--<i v-else class="el-icon-circle-plus-outline avatar-uploader-icon"></i>-->
        <!--</el-upload>-->
        <!--<p class="Ltips">{{$t('autonym.IDFrontSide')}}</p>-->
        <!--</div>-->
        <!--<div class="itemC">-->
        <!--<p class="exampletip">{{$t('autonym.example')}}<i class="el-icon-caret-right"></i></p>-->
        <!--</div>-->
        <!--<div class="itemR">-->
        <!--<img src="../../assets/img/ID  POSITIVE.png" alt="">-->
        <!--</div>-->
        <!--</el-form-item>-->
        <!--<el-form-item class="upBox">-->
        <!--<div class="itemL">-->
        <!--<el-upload-->
        <!--class="avatar-uploader"-->
        <!--action="https://up-z2.qiniup.com"-->
        <!--:show-file-list="false"-->
        <!--:on-success="handleAvatarSuccess2"-->
        <!--:before-upload="beforeAvatarUpload"-->
        <!--:data="postData">-->
        <!--<img v-if="back" :src="back" class="avatar">-->
        <!--<i v-else class="el-icon-circle-plus-outline avatar-uploader-icon"></i>-->
        <!--</el-upload>-->
        <!--<p class="Ltips">{{$t('autonym.IDBackSide')}}</p>-->
        <!--</div>-->
        <!--<div class="itemC">-->
        <!--<p class="exampletip">{{$t('autonym.example')}}<i class="el-icon-caret-right"></i></p>-->
        <!--</div>-->
        <!--<div class="itemR">-->
        <!--<img src="../../assets/img/ID  left.png" alt="">-->
        <!--</div>-->
        <!--</el-form-item>-->
        <el-form-item class="upBox">
          <div class="itemL">
            <!--<el-upload-->
            <!--class="avatar-uploader"-->
            <!--action="https://up-z2.qiniup.com"-->
            <!--:show-file-list="false"-->
            <!--:on-success="handleAvatarSuccess3"-->
            <!--:before-upload="beforeAvatarUpload"-->
            <!--:data="postData">-->
            <!--<img v-if="image" :src="image" class="avatar">-->
            <!--<i v-else class="el-icon-circle-plus-outline avatar-uploader-icon"></i>-->
            <!--</el-upload>-->
            <div class="uploadWrap" @click="clickImg">
              <input type="file" style="display: none;" ref="avatarInput" accept="image/jpg,image/png,image/jpeg" name="" @change="changeImgInput">
              <img v-if="image" :src="image" class="avatar">
              <i v-else class="el-icon-circle-plus-outline avatar-uploader-icon"></i>
            </div>
            <p class="Ltips textl">{{$t('autonym.idphotoTip')}}</p>
          </div>
          <div class="itemC">
            <p class="exampletip">{{$t('autonym.example')}}<i class="el-icon-caret-right"></i></p>
          </div>
          <div class="itemR">
            <img src="../../assets/img/ID  hand.png" alt="">
          </div>
        </el-form-item>

        <el-form-item>
          <el-button class="btnBase" type="primary" @click="IDFormSubmit()">{{$t('button.submit')}}</el-button>
        </el-form-item>
      </el-form>

      <!-- 护照form -->
      <!--<el-form v-show="type=='1'" label-position="left" :model="passportForm" :rules="passportFormRules" ref="passportForm" label-width="100px" class="IDForm">-->
      <!--<el-form-item class="tipList">-->
      <!--<p class="tips">{{$t('autonym.suppertType')}}</p>-->
      <!--<p class="tips">{{$t('autonym.suppertType1')}}</p>-->
      <!--<p class="tips">{{$t('autonym.suppertType2')}}</p>-->
      <!--</el-form-item>-->
      <!--<el-form-item :label="$t('autonym.country')" prop="country">-->
      <!--<el-select v-model="country" filterable :placeholder="$t('button.select')">-->
      <!--<el-option-->
      <!--v-for="item in countryList"-->
      <!--:key="item.id"-->
      <!--:label="item.name"-->
      <!--:value="item.id">-->
      <!--</el-option>-->
      <!--</el-select>-->
      <!--</el-form-item>-->

      <!--<el-form-item :label="$t('autonym.name')" prop="name">-->
      <!--<el-input :placeholder="$t('autonym.namePlaceholder')" v-model="passportForm.name"></el-input>-->
      <!--</el-form-item>-->
      <!--<el-form-item :label="$t('autonym.passportNum')" class="mb76" prop="cardNum">-->
      <!--<el-input :placeholder="$t('autonym.passportNumber')" v-model="passportForm.cardNum"></el-input>-->
      <!--</el-form-item>-->
      <!--<el-form-item :label="$t('autonym.cardPicture')" class="labelInit mb46">-->
      <!--<p class="tips">{{$t('autonym.photoRequire1')}}</p>-->
      <!--<p class="tips">{{$t('autonym.photoRequire2')}}</p>-->
      <!--<p class="tips">{{$t('autonym.photoRequire3')}}</p>-->
      <!--</el-form-item>-->
      <!--<el-form-item class="upBox">-->
      <!--<div class="itemL">-->
      <!--<el-upload-->
      <!--class="avatar-uploader"-->
      <!--action="https://up-z2.qiniup.com"-->
      <!--:show-file-list="false"-->
      <!--:on-success="handleAvatarSuccess1"-->
      <!--:before-upload="beforeAvatarUpload"-->
      <!--:data="postData">-->
      <!--<img v-if="front" :src="front" class="avatar">-->
      <!--<i v-else class="el-icon-circle-plus-outline avatar-uploader-icon"></i>-->
      <!--</el-upload>-->
      <!--<p class="Ltips">{{$t('autonym.passportcover')}}</p>-->
      <!--</div>-->
      <!--<div class="itemC">-->
      <!--<p class="exampletip">{{$t('autonym.example')}}<i class="el-icon-caret-right"></i></p>-->
      <!--</div>-->
      <!--<div class="itemR">-->
      <!--<img src="../../assets/img/password.png" alt="">-->
      <!--</div>-->
      <!--</el-form-item>-->
      <!--<el-form-item class="upBox">-->
      <!--<div class="itemL">-->
      <!--<el-upload-->
      <!--class="avatar-uploader"-->
      <!--action="https://up-z2.qiniup.com"-->
      <!--:show-file-list="false"-->
      <!--:on-success="handleAvatarSuccess2"-->
      <!--:before-upload="beforeAvatarUpload"-->
      <!--:data="postData">-->
      <!--<img v-if="back" :src="back" class="avatar">-->
      <!--<i v-else class="el-icon-circle-plus-outline avatar-uploader-icon"></i>-->
      <!--</el-upload>-->
      <!--<p class="Ltips">{{$t('autonym.passportdatapage')}}</p>-->
      <!--</div>-->
      <!--<div class="itemC">-->
      <!--<p class="exampletip">{{$t('autonym.example')}}<i class="el-icon-caret-right"></i></p>-->
      <!--</div>-->
      <!--<div class="itemR">-->
      <!--<img src="../../assets/img/ID passport.png" alt="">-->
      <!--</div>-->
      <!--</el-form-item>-->
      <!--<el-form-item class="upBox">-->
      <!--<div class="itemL">-->
      <!--<el-upload-->
      <!--class="avatar-uploader"-->
      <!--action="https://up-z2.qiniup.com"-->
      <!--:show-file-list="false"-->
      <!--:on-success="handleAvatarSuccess3"-->
      <!--:before-upload="beforeAvatarUpload"-->
      <!--:data="postData">-->
      <!--<img v-if="image" :src="image" class="avatar">-->
      <!--<i v-else class="el-icon-circle-plus-outline avatar-uploader-icon"></i>-->
      <!--</el-upload>-->
      <!--<p class="Ltips textl">{{$t('autonym.passportphotoTip')}}</p>-->
      <!--</div>-->
      <!--<div class="itemC">-->
      <!--<p class="exampletip">{{$t('autonym.example')}}<i class="el-icon-caret-right"></i></p>-->
      <!--</div>-->
      <!--<div class="itemR">-->
      <!--<img src="../../assets/img/passport  hand.png" alt="">-->
      <!--</div>-->
      <!--</el-form-item>-->

      <!--<el-form-item>-->
      <!--<el-button class="btnBase" type="primary" @click="passportSubmit()">{{$t('button.submit')}}</el-button>-->
      <!--</el-form-item>-->
      <!--</el-form>-->
    </div>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  import axios from '../../api/axios'

  export default {
    data() {
      // var validateEmail = (rule, value, callback) => {
      //   if (value === '') {
      //     callback(new Error(this.$t('login.retrieveTip')));
      //   } else {
      //     var reg=new RegExp(/^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$/);
      //     if (!reg.test(value)) {
      //       callback(new Error(this.$t('login.retrieveTip1')));
      //     }
      //   }
      // };
      return {
        supportWebp: false,   // 是否支持webp
        bucketHost: '',   // 上传图片的外链域名
        countryUrl:"/static/country",
        countryList:[],
        country: '',
        type: '0',
        front: '',
        back: '',
        image: '',
        IDForm: {
          name: '',
          cardNum: '',
          // rules :{
          //     name:[{ required: true, message: '请输入姓名', trigger: 'blur' }],
          //     cardNum:[{ required: true, message: '请输入证件号码', trigger: 'blur' },]
          // },
        },
        passportForm: {
          name: '',
          cardNum: '',
          // rules :{
          //     country:[{ required: true, message: '请选择国籍', trigger: 'blur' }],
          //     name:[{ required: true, message: '请输入姓名', trigger: 'blur' }],
          //     cardNum:[{ required: true, message: '请输入证件号码', trigger: 'blur' },]
          // },
        },
        googleForm:{
          email:"",
          pass:"",
          verification:"",
        },
        // rules:{
        //   email:[{ validator: validateEmail, trigger: 'blur' }],
        //   pass:[{  message: '请输入密码', trigger: 'blur' },]
        // },
        finishFlag: false,
        postData: {
          token: ''
        },
        imgDataBase64:'',
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
        //this.front = URL.createObjectURL(file.raw);
        let key = res.key
        let name = file.name
        let prefix = this.supportWebp ? 'webp/' : ''
        let img = `http://${this.bucketHost}/${prefix}${encodeURI(key)}`
        this.front = img
        console.log(img)
      },
      handleAvatarSuccess2(res, file) {
        //this.back = URL.createObjectURL(file.raw);
        let key = res.key
        let name = file.name
        let prefix = this.supportWebp ? 'webp/' : ''
        let img = `http://${this.bucketHost}/${prefix}${encodeURI(key)}`
        this.back = img
        console.log(img)
      },
      handleAvatarSuccess3(res, file) {
        //this.image = URL.createObjectURL(file.raw);
        let key = res.key
        let name = file.name
        let prefix = this.supportWebp ? 'webp/' : ''
        let img = `http://${this.bucketHost}/${prefix}${encodeURI(key)}`
        this.image = img
        console.log(img)
      },
      clickImg(){
        this.$refs.avatarInput.click()
      },
      changeImgInput(){
        if(this.$refs.avatarInput.files.length){
          var file = this.$refs.avatarInput.files[0];
          var reader = new FileReader();
          var that = this;
          if((file.size/1024*1000)/1000 > 2048){
            that.$notify.error({
              title: '图片大小超过2M'
            });
            return;
          };
          if(file.type != 'image/png'&& file.type != 'image/jpg' && file.type != 'image/jpeg'){
            that.$notify.error({
              title: '不符合所需的图片格式'
            });
            return;
          }
          reader.readAsDataURL(file);
          reader.onload = function() {
            that.image =  reader.result;
          }
        }
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
            if(this.image){
              var IDdata = {
                passportType: this.type,
                name: this.IDForm.name,
                country: "zh",
                passportId: this.IDForm.cardNum,
                passportFront: this.front,
                passportBack: this.back,
                passportImage: this.image,
              }
              axios.post('/api/user/kyc',IDdata).then(function(res){
                console.log(res);
                _this.$message({
                  message: '提交成功',
                  type: 'success'
                });
                _this.$store.dispatch('getUserInfo');
                setTimeout(()=>{
                  _this.$router.push('/userCenter/account');
                },2000)
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


      },
      passportSubmit() {
        var _this = this;
        this.$refs['passportForm'].validate((valid) => {
          if (valid) {
            if(this.image){
              var passportdata = {
                passportType: this.type,
                name: this.passportForm.name,
                country: this.country,
                passportId: this.passportForm.cardNum,
                passportImage: this.image,
              }
              console.log(passportdata)
              axios.post('/api/user/kyc',passportdata).then(function(res){
                _this.bucketHost = res.data.domain;
                _this.postData.token = res.data.token;
                _this.$message({
                  message: '提交成功',
                  type: 'success'
                });
                console.log(234)
                _this.dispatch('getUserInfo');
                setTimeout(()=>{
                  _this.$router.push('/userCenter/account');
                },2000)
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
      },
      getCountry() {
        var _this = this;
        if(this.language == "zh"){
          var url = this.countryUrl+"/zh.json"
        }else if(this.language == "zh-TW"){
          var url = this.countryUrl+"/zh-TW.json"
        }else if(this.language == "en"){
          var url = this.countryUrl+"/en.json"
        }
        axios.get(url).then(function(res){
          console.log(res);
          var country = res;
          var list = [];
          for(var i in country){
            var countryItem = {
              id: i,
              name: country[i]
            }
            list.push(countryItem);
          }
          _this.countryList = list;
        }).catch(function (res){
          console.log(res);
        });
      }
    },
    computed: {
      ...mapGetters([
        'language',
      ]),
      language() {
        return this.$store.getters.language
      },
      rules(){
        var validateEmail = (rule, value, callback) => {
          if (value === '') {
            callback(new Error(this.$t('login.retrieveTip')));
          } else {
            var reg=new RegExp(/^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$/);
            if (!reg.test(value)) {
              callback(new Error(this.$t('login.retrieveTip1')));
            }
          }
        };
        return {
          email:[{ validator: validateEmail, trigger: 'blur' }],
          pass:[{  message: this.$t('login.pwd'), trigger: 'blur' },]
        }
      },
      passportFormRules(){
        return {
          country:[{ required: true, message:this.$t('login.selectCountry') , trigger: 'blur' }],
          name:[{ required: true, message: this.$t('autonym.inputName'), trigger: 'blur' }],
          cardNum:[{ required: true, message: this.$t('autonym.inputIdNum'), trigger: 'blur' },]
        }
      },
      IDFormRules(){
        return {
          name:[{ required: true, message: this.$t('autonym.inputName'), trigger: 'blur' }],
          cardNum:[{ required: true, message: this.$t('autonym.inputIdNum'), trigger: 'blur' },]
        }
      }
    },
    watch: {
      language: function() {
//            this.getCountry();
      }
    },
    created() {
      var _this = this;
//        axios.get('/api/qiniu_upload_token').then(function(res){
//            _this.bucketHost = res.data.domain;
//            _this.postData.token = res.data.token;
//        }).catch(function (res){
//            console.log(res);
//        });
//        this.getCountry();
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
  .uploadWrap{
    display: inline-block;
    width:300px;
    height: 200px;
    background: #EEEEEE;
    border-radius: 3px;
    border:1px dashed #d9d9d9;
    cursor:pointer;
  }
  .uploadWrap:hover{
    border:1px dashed #c0ccda;
  }
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
    border-color: #0071BA;
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

