<template>
  <div class="depositsBox">
    <p class="title">
      {{$t('route.withdrawals')}}
    </p>

    <div class="depLbox">
      <el-select class="selectInput" @change="changeSelect" v-model="state3" filterable :placeholder="$t('funds.placeHolder')">
        <el-option
          v-for="(item,idx) in restaurants"
          :key="idx"
          :label="item.coin_name"
          :value="item.coin_id">
        </el-option>
      </el-select>
      <div class="priceBox">
        <ul class="priceList">
          <li>
            <span class="name">{{$t('tradingCenter.totalBalance')}}</span>
            <span class="num">0.00000000 ADA</span>
          </li>
          <li>
            <span class="name">{{$t('tradingCenter.inOrder')}}</span>
            <span class="num">0.00000000 ADA</span>
          </li>
          <li>
            <span class="name">{{$t('tradingCenter.availableBalance')}}</span>
            <span class="num">0.00000000 ADA</span>
          </li>
        </ul>
        <a href="javascript:;" class="know baseColor"><i class="iconfont icon-shu"></i><span>{{$t('funds.whats')}}ADA？</span></a>
      </div>

      <div class="tipsBox">
        <p class="tipsT careful">{{$t('funds.important')}}</p>
        <ul class="tipsList">
          <li>
            
            <p class="careful"><span class="dot careful"></span>{{$t('funds.importantTip1')}}8.4ADA</p>
          </li>
          <li>
            
            <p class="careful"><span class="dot careful"></span>{{$t('funds.importantTip2')}}</p>
          </li>
        </ul>
      </div>

      <div class="siteBox">
        <p class="siteTitle">ADA{{$t('funds.withdrawalAddress')}}</p>
        <p class="siteTips">请在下方输入本次提现地址</p>
        <el-form :model="siteForm" status-icon :rules="siteForm.rules" ref="siteForm" class="siteForm">
          <div class="formT">
            <el-form-item class="label" prop="label">
              <el-input type="password" v-model="siteForm.label" auto-complete="off" placeholder="备注标签"></el-input>
            </el-form-item>
            <div class="to"></div>
            <el-form-item class="site" prop="site">
              <el-input type="password" v-model="siteForm.site" auto-complete="off" placeholder="地址"></el-input>
            </el-form-item>
          </div>
          <div class="formTip">
            {{$t('funds.amount')}}
          </div>
          <el-form-item prop="num">
            <el-input v-model.number="siteForm.num" placeholder="请输入内容">
              <template slot="append">ADA</template>
            </el-input>
          </el-form-item>
          <div class="formTip">
            <span>{{$t('funds.transactionFee')}}:  0.00000000</span>
            <span>{{$t('funds.youWillGet')}}:  0.00000000</span>
          </div>
          <el-form-item>
            <el-button class="submit" type="primary" @click="submitForm('siteForm')">{{$t('button.submit')}}</el-button>
          </el-form-item>
        </el-form>
      </div>
      
      <div class="tipsBox">
        <p class="tipsT">{{$t('funds.tips')}}</p>
        <ul class="tipsList">
          <li>
            <p><span class="dot"></span>{{$t('funds.tips3')}}</p>
          </li>
          <li>
            <span class="dot"></span>
            <p>{{$t('funds.tips4a')}}<router-link class="baseColor" to="/fundsManagement/transactionHistory">{{$t('funds.history')}}</router-link>{{$t('funds.tips2b')}}</p>
          </li>
        </ul>
      </div>

    </div>
    <div class="depRbox">
      <div class="depRtitle">
        <div class="titleL">{{$t('funds.Whistory')}}</div>
        <div class="titleR">
          <el-popover
            ref="popover5"
            width="320"
            trigger="click">
            <p>{{$t('funds.mailtip')}} <a href="javascript:;" class="baseColor">{{$t('funds.notReceived')}}</a></p>
          </el-popover>
          <a href="javascript:;" class="baseColor showtip" v-popover:popover5>{{$t('funds.theMail')}} <i class="el-icon-question"></i></a>
          <a href="javascript:;" class="more">{{$t('funds.viewAll')}}</a>
        </div>
      </div>
      <ul class="depList">
        <li class="depItem">
          <div class="itemL">
            <div class="itemT">
              <div class="nodes">
                <p class="nodeTitle">成功</p>
                <p class="nodeMain">2018-04-18  18:11-:25</p>
              </div>
            </div>
            <div class="itemB">
              <div class="nodes">
                <p class="nodeTitle">地址</p>
                <p class="nodeMain">NoLEfhWgZt29BfEBC1hphg3mxmGiPzYQvP4ZxcVo2zdAsgn9w479</p>
              </div>
            </div>
          </div>
          <div class="itemR">
            <div class="itemT">
              <div class="nodes">
                <p class="nodeTitle">币种</p>
                <p class="nodeMain">ADA</p>
              </div>
              <div class="nodes">
                <p class="nodeTitle">数量</p>
                <p class="nodeMain">3,374.74628467</p>
              </div>
            </div>
            <div class="itemB">
              <div class="nodes">
                <p class="nodeTitle">Txid</p>
                <p class="nodeMain">DdzFFzCqrhse3znvdFkhHVjNoLEfhWgZt29BfEBC1hphg3mxmGiPzYQvP4ZxcVo2zdAsgn9w479BeiCWk9Z956DsWE1StRxVb6uH6TaN</p>
              </div>
            </div>
          </div>
        </li>
        <li class="depItem">
          <div class="itemL">
            <div class="itemT">
              <div class="nodes">
                <p class="nodeTitle">成功</p>
                <p class="nodeMain">2018-04-18  18:11-:25</p>
              </div>
            </div>
            <div class="itemB">
              <div class="nodes">
                <p class="nodeTitle">地址</p>
                <p class="nodeMain">NoLEfhWgZt29BfEBC1hphg3mxmGiPzYQvP4ZxcVo2zdAsgn9w479</p>
              </div>
            </div>
          </div>
          <div class="itemR">
            <div class="itemT">
              <div class="nodes">
                <p class="nodeTitle">币种</p>
                <p class="nodeMain">ADA</p>
              </div>
              <div class="nodes">
                <p class="nodeTitle">数量</p>
                <p class="nodeMain">3,374.74628467</p>
              </div>
            </div>
            <div class="itemB">
              <div class="nodes">
                <p class="nodeTitle">Txid</p>
                <p class="nodeMain">DdzFFzCqrhse3znvdFkhHVjNoLEfhWgZt29BfEBC1hphg3mxmGiPzYQvP4ZxcVo2zdAsgn9w479BeiCWk9Z956DsWE1StRxVb6uH6TaN</p>
              </div>
            </div>
          </div>
        </li>
      </ul>
    </div>

    <!-- 谷歌认证 -->
    <el-dialog
        title="谷歌认证"
        :visible.sync="googleDialog"
        custom-class="baseDialog"
        center>
        <el-form :model="googleForm" status-icon :rules="googleForm.rules" ref="googleForm" class="googleForm">
            <el-form-item label="登录密码" prop="pwd">
                <el-input class="inputBase" type="password" placeholder="请输入登录密码" v-model="googleForm.pwd" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="谷歌验证码" prop="verCode">
                <el-input class="inputBase" placeholder="6位动态数字" v-model.number="googleForm.verCode"></el-input>
            </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
            <el-button class="btnBase" type="primary" size="mini" @click="googleDialog = false">确认</el-button>
        </span>
    </el-dialog>

    <!-- 手机验证 -->
    <el-dialog
        title="手机验证"
        :visible.sync="phoneDialog"
        width="30%"
        custom-class="baseDialog changePwd"
        center>
        <el-form :model="phoneForm" status-icon :rules="phoneForm.rules" ref="phoneForm">
            <el-form-item label="您的手机号" prop="phone">
                <el-input placeholder="(仅限中国大陆)" v-model="phoneForm.phone" type="tel" auto-complete="off" class="inputBase input-with-select">
                    <el-select v-model="phoneForm.select" slot="prepend" placeholder="请选择">
                    <el-option label="+86" value="+86"></el-option>
                    <el-option label="+88" value="+88"></el-option>
                    <el-option label="+89" value="+89"></el-option>
                    </el-select>
                </el-input>
            </el-form-item>
            <el-form-item label="验证码" class="verCode" prop="verCode">
                <el-input class="inputBase" placeholder="请输入短信验证码" v-model="phoneForm.newpwd" auto-complete="off"></el-input>
                <a class="verBtn" href="javascript:;">获取</a>
            </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
            <el-button type="primary" size="mini" @click="phoneDialog = false">确认</el-button>
        </span>
    </el-dialog>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import axios from '../../api/axios'
export default {
  data() {
      return {
        restaurants: [],
        state3: '3',
        siteForm: {
          label: '',
          site: '',
          num: '',
          rules:{ 
            label:[{ required: true, message: '请选择活动资源', trigger: 'blur' }],
            site: [{ required: true, message: '请选择活动资源', trigger: 'blur' }],
            num: [{ required: true, message: '请选择活动资源', trigger: 'blur' }]
          }
        },
        googleDialog: false,
        googleForm: {      //谷歌认证
            pwd: "",
            verCode: "",
            rules: {
              pwd:[{ required: true, message: '请输入密码', trigger: 'blur' }],
              verCode:[{ required: true,min: 6, max: 6, message: '请输入6位动态数字', trigger: 'blur' }],
          }
        },
        phoneDialog: false,
        phoneForm: {      //手机验证
          phone: "",
          verCode: "",
          select: "+86",
          rules: {
            phone:[{ required: true, message: '请输入手机号', trigger: 'blur' }],
            verCode:[{ required: true, message: '请输入验证码', trigger: 'blur' }],
        }
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
      changeSelect(value){
        console.log(value)
        console.log(this.state3)
      },
      getWithdrawHistory(coin_id) {
        var _this = this;
        axios.get(`/api/finance/record_withdraw/${coin_id}`).then(function(res){  
            console.log(res);
            //_this.tableData = res.data;
        }).catch(function (res){  
            console.log(res);
        }); 
      }
    },
    computed: {
      ...mapGetters([
          'marketList',
          'coinList',
      ])
    },
    mounted() {
      this.restaurants = this.coinList;
      this.getWithdrawHistory(1)
    }
}
</script>

<style lang="scss">
.dot.careful{
  background: #D0021B !important;
}

//带选项的input
  .el-form-item.is-error .el-input-group__prepend{
      border-color: #f56c6c;
  }
  .el-form-item.is-success .el-input-group__prepend{
      border-color: #67c23a;
  }
  .el-input-group__prepend{
      width: 10px;
      border: 0;
      border-bottom: 1px solid #dcdfe6;
      border-radius: 0;
      background: #ffffff;
      padding-right: 16px;
      text-indent: 4px;
      .el-input__inner{
          padding-right: 0;
      }
      .el-input__suffix{
          display: none;
      }
  }

.siteBox{
  .siteTitle{
    line-height: 36px;
  }
  .siteTips{
    line-height: 40px;
    color:#999999;
  }
  .siteForm{
    input,.el-button{
      border-radius: 0;
    }
    .formTip{
      line-height: 24px;
      width: 100%;
      display: flex;
      justify-content: space-between;
    }
    .formT{
      display: flex;
      .label{
        width: 120px;
      }
      .to{
        width: 10px;
        height: 1px;
        border-top: 1px solid #979797;
        margin: 20px 6px;;
      }
      .site{
        width: 316px;
      }
    }
    .submit{
      margin-top: 10px;
      width: 100%;
    }
  }
}
</style>