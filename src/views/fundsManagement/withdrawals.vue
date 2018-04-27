<template>
  <div class="depositsBox">
    <p class="title">
      提现
    </p>

    <div class="depLbox">
      <el-autocomplete
        class="selectInput"
        popper-class="my-autocomplete"
        v-model="state3"
        :fetch-suggestions="querySearch"
        placeholder="请输入币种关键字"
        @select="handleSelect">
        <template slot-scope="{ item }">
          <div class="name">{{ item.value }}</div>
        </template>
      </el-autocomplete>
      <div class="priceBox">
        <ul class="priceList">
          <li>
            <span class="name">总额</span>
            <span class="num">0.00000000 ADA</span>
          </li>
          <li>
            <span class="name">下单冻结</span>
            <span class="num">0.00000000 ADA</span>
          </li>
          <li>
            <span class="name">可用余额</span>
            <span class="num">0.00000000 ADA</span>
          </li>
        </ul>
        <a href="javascript:;" class="know baseColor"><i class="iconfont icon-shu"></i><span>什么是ADA？</span></a>
      </div>

      <div class="tipsBox">
        <p class="tipsT careful">注意</p>
        <ul class="tipsList">
          <li>
            <span class="dot careful"></span>
            <p class="careful">最小提现数量为8.4ADA</p>
          </li>
          <li>
            <span class="dot careful"></span>
            <p class="careful">请勿直接提现至众筹或ICO地址,我们不会处理未来货币的发放</p>
          </li>
        </ul>
      </div>

      <div class="siteBox">
        <p class="siteTitle">ADA提现地址</p>
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
            提现数量
          </div>
          <el-form-item prop="num">
            <el-input v-model.number="siteForm.num" placeholder="请输入内容">
              <template slot="append">ADA</template>
            </el-input>
          </el-form-item>
          <div class="formTip">
            <span>手续费:  0.00000000</span>
            <span>实际到账:  0.00000000</span>
          </div>
          <el-form-item>
            <el-button class="submit" type="primary" @click="submitForm('siteForm')">提交</el-button>
          </el-form-item>
        </el-form>
      </div>
      
      <div class="tipsBox">
        <p class="tipsT">温馨提示</p>
        <ul class="tipsList">
          <li>
            <span class="dot"></span>
            <p>提现请求申请成功后,请去邮箱点击链接确认本次操作。</p>
          </li>
          <li>
            <span class="dot"></span>
            <p>充值完成后，你可以进入<router-link class="baseColor" to="">充值提现记录</router-link>页面跟踪进度。</p>
          </li>
        </ul>
      </div>

    </div>
    <div class="depRbox">
      <div class="depRtitle">
        <div class="titleL">提现记录</div>
        <div class="titleR">
          <el-popover
            ref="popover5"
            width="320"
            trigger="click">
            <p>如果长时间未收到邮件，请尝试在垃圾邮件或其他文件中查找。 <a href="javascript:;" class="baseColor">仍未收到</a></p>
          </el-popover>
          <a href="javascript:;" class="baseColor showtip" v-popover:popover5>未收到确认邮件<i class="el-icon-question"></i></a>
          <a href="javascript:;" class="more">更多</a>
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
                <a href="javascript:;">获取</a>
            </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
            <el-button type="primary" size="mini" @click="phoneDialog = false">确认</el-button>
        </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
      return {
        restaurants: [],
        state3: '三全鲜食（北新泾店）',
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
        phoneDialog: true,
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
      querySearch(queryString, cb) {
        var restaurants = this.restaurants;
        var results = queryString ? restaurants.filter(this.createFilter(queryString)) : restaurants;
        // 调用 callback 返回建议列表的数据
        cb(results);
      },
      createFilter(queryString) {
        return (restaurant) => {
          return (restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
        };
      },
      loadAll() {
        return [
          { "value": "三全鲜食（北新泾店）", "address": "长宁区新渔路144号" },
          { "value": "Hot honey 首尔炸鸡（仙霞路）", "address": "上海市长宁区淞虹路661号" },
          { "value": "新旺角茶餐厅", "address": "上海市普陀区真北路988号创邑金沙谷6号楼113" },
          { "value": "泷千家(天山西路店)", "address": "天山西路438号" },
          { "value": "胖仙女纸杯蛋糕（上海凌空店）", "address": "上海市长宁区金钟路968号1幢18号楼一层商铺18-101" },
          { "value": "贡茶", "address": "上海市长宁区金钟路633号" },
          { "value": "豪大大香鸡排超级奶爸", "address": "上海市嘉定区曹安公路曹安路1685号" },
          { "value": "茶芝兰（奶茶，手抓饼）", "address": "上海市普陀区同普路1435号" },
          { "value": "十二泷町", "address": "上海市北翟路1444弄81号B幢-107" },
          { "value": "星移浓缩咖啡", "address": "上海市嘉定区新郁路817号" },
          { "value": "阿姨奶茶/豪大大", "address": "嘉定区曹安路1611号" },
          { "value": "新麦甜四季甜品炸鸡", "address": "嘉定区曹安公路2383弄55号" },
          { "value": "Monica摩托主题咖啡店", "address": "嘉定区江桥镇曹安公路2409号1F，2383弄62号1F" },
          { "value": "浮生若茶（凌空soho店）", "address": "上海长宁区金钟路968号9号楼地下一层" },
          { "value": "NONO JUICE  鲜榨果汁", "address": "上海市长宁区天山西路119号" },
          { "value": "CoCo都可(北新泾店）", "address": "上海市长宁区仙霞西路" },
          { "value": "快乐柠檬（神州智慧店）", "address": "上海市长宁区天山西路567号1层R117号店铺" },
          { "value": "Merci Paul cafe", "address": "上海市普陀区光复西路丹巴路28弄6号楼819" },
          { "value": "猫山王（西郊百联店）", "address": "上海市长宁区仙霞西路88号第一层G05-F01-1-306" },
          { "value": "枪会山", "address": "上海市普陀区棕榈路" },
          { "value": "纵食", "address": "元丰天山花园(东门) 双流路267号" },
          { "value": "钱记", "address": "上海市长宁区天山西路" },
          { "value": "壹杯加", "address": "上海市长宁区通协路" },
          { "value": "唦哇嘀咖", "address": "上海市长宁区新泾镇金钟路999号2幢（B幢）第01层第1-02A单元" },
          { "value": "爱茜茜里(西郊百联)", "address": "长宁区仙霞西路88号1305室" },
          { "value": "爱茜茜里(近铁广场)", "address": "上海市普陀区真北路818号近铁城市广场北区地下二楼N-B2-O2-C商铺" },
          { "value": "鲜果榨汁（金沙江路和美广店）", "address": "普陀区金沙江路2239号金沙和美广场B1-10-6" },
          { "value": "开心丽果（缤谷店）", "address": "上海市长宁区威宁路天山路341号" },
          { "value": "超级鸡车（丰庄路店）", "address": "上海市嘉定区丰庄路240号" },
          { "value": "妙生活果园（北新泾店）", "address": "长宁区新渔路144号" },
          { "value": "香宜度麻辣香锅", "address": "长宁区淞虹路148号" },
          { "value": "凡仔汉堡（老真北路店）", "address": "上海市普陀区老真北路160号" },
          { "value": "港式小铺", "address": "上海市长宁区金钟路968号15楼15-105室" },
          { "value": "蜀香源麻辣香锅（剑河路店）", "address": "剑河路443-1" },
          { "value": "北京饺子馆", "address": "长宁区北新泾街道天山西路490-1号" },
          { "value": "饭典*新简餐（凌空SOHO店）", "address": "上海市长宁区金钟路968号9号楼地下一层9-83室" },
          { "value": "焦耳·川式快餐（金钟路店）", "address": "上海市金钟路633号地下一层甲部" },
          { "value": "动力鸡车", "address": "长宁区仙霞西路299弄3号101B" },
          { "value": "浏阳蒸菜", "address": "天山西路430号" },
          { "value": "四海游龙（天山西路店）", "address": "上海市长宁区天山西路" },
          { "value": "樱花食堂（凌空店）", "address": "上海市长宁区金钟路968号15楼15-105室" },
          { "value": "壹分米客家传统调制米粉(天山店)", "address": "天山西路428号" },
          { "value": "福荣祥烧腊（平溪路店）", "address": "上海市长宁区协和路福泉路255弄57-73号" },
          { "value": "速记黄焖鸡米饭", "address": "上海市长宁区北新泾街道金钟路180号1层01号摊位" },
          { "value": "红辣椒麻辣烫", "address": "上海市长宁区天山西路492号" },
          { "value": "(小杨生煎)西郊百联餐厅", "address": "长宁区仙霞西路88号百联2楼" },
          { "value": "阳阳麻辣烫", "address": "天山西路389号" },
          { "value": "南拳妈妈龙虾盖浇饭", "address": "普陀区金沙江路1699号鑫乐惠美食广场A13" }
        ];
      },
      handleSelect(item) {
        console.log(item);
      },
      handleIconClick(ev) {
        console.log(ev);
      }
    },
    mounted() {
      this.restaurants = this.loadAll();
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
        width: 280px;
      }
    }
    .submit{
      margin-top: 10px;
      width: 100%;
    }
  }
}
</style>