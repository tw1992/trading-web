<template>
    <div class="accBox">
        <p class="topTip">安全建议：检查访问网址、开启二次验证、不要给他人转账和透露密码信息等。</p>
        <div class="emailBox">
                <div class="email">
                    <span class="name">2970973119@qq.com</span>
                    <router-link to="">未实名认证&nbsp;&nbsp;&nbsp;<i class="el-icon-d-arrow-right"></i></router-link>
                </div>
                <p class="loginTime">
                    <span class="time">最后登录时间: 2018-04-16 17:45:20</span>
                    <span class="IP">IP: 103.192.224.102</span>
                </p>
                <p class="UID">UID:23298</p>
        </div>
        <div class="otherBox">
            <div class="otherT">
                <div class="passBox itemBox">
                    <div class="boxL">
                        <p class="titles">
                            <i class="el-icon-edit"></i>
                            <span class="title">登录密码</span>
                        </p>
                        <p class="tips">
                            * * * * * *
                        </p>
                    </div>
                    <div class="boxR">
                        <el-button type="primary" @click="changePwdFlag = true">修改</el-button>
                    </div>
                    
                </div>
                <div class="phoneBox itemBox">
                    <div class="boxL">
                        <p class="titles">
                            <i class="el-icon-edit"></i>
                            <span class="title">手机验证</span>
                        </p>
                        <p class="tips">
                        提现,修改密码及安全设置时,用以收取短信验证
                        </p>
                    </div>
                    <div class="boxR">
                        <div class="switchBtn" @click="switchClick('phoneFlag')"></div>
                        <el-switch
                        v-model="phoneFlag"
                        active-color="#13ce66"
                        inactive-color="#ff4949">
                        </el-switch>
                    </div>
                </div>
            </div>
            <div class="otherB">
                <div class="APIBox itemBox">
                        <div class="boxL">
                            <p class="titles">
                                <i class="el-icon-edit"></i>
                                <span class="title">API</span>
                            </p>
                            <p class="tips">
                                创建API密钥可以让您借助第三方网站或移动应用使用币加的行情查询，实时交易等服务。请参阅API文档了解如何使用您的API Keys
                            </p>
                        </div>
                        <div class="boxR">
                            <el-button type="primary">启用</el-button>
                        </div>
                </div>
                <div class="GoogleBox itemBox">
                        <div class="boxL">
                            <p class="titles">
                                <i class="el-icon-edit"></i>
                                <span class="title">谷歌验证</span>
                            </p>
                            <p class="tips">
                                提现,修改密码及安全设置时,用以收取短信验证
                            </p>
                        </div>
                        <div class="boxR">
                            <div class="switchBtn" @click="switchClick('googleFlag')"></div>
                            <el-switch
                            @change="googleClick"
                            v-model="googleFlag"
                            active-color="#13ce66"
                            inactive-color="#ff4949">
                            </el-switch>
                        </div>
                </div>
            </div>
        </div>
        <div class="tableBox">
                <p class="tabTip">最近登录</p>
                <el-table
                :data="tableData"
                class="latelyTab"
                style="width: 100%">
                <el-table-column
                prop="time"
                label="登录时间"
                class-name="firstCol">
                </el-table-column>
                <el-table-column
                prop="IP"
                label="IP">
                </el-table-column>
                <el-table-column
                prop="address"
                label="登录所在地">
                </el-table-column>
            </el-table>
        </div>

        <!-- 修改密码 -->
        <el-dialog
            title="提示"
            :visible.sync="changePwdDialog"
            width="30%"
            custom-class="baseDialog changePwd"
            center>
            <span>需要注意的是内容是默认不居中的</span>
            <span slot="footer" class="dialog-footer">
                <el-button type="primary" size="mini" @click="changePwdDialog = false">确 定</el-button>
            </span>
        </el-dialog>

        <!-- 开启谷歌验证 -->
        <el-dialog
            title="开启谷歌验证"
            :visible.sync="googleAddDialog"
            width="30%"
            custom-class="baseDialog"
            center>
            <span>需要注意的是内容是默认不居中的</span>
            <span slot="footer" class="dialog-footer">
                <el-button type="primary" size="mini" @click="googleStart()">开始</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
export default {
  data() {
    return {
      phoneFlag: true,
      googleFlag: false,
      googleAddDialog: false,
      phoneAddDialog: false,
      changePwdDialog: false,
      googleDelDialog: false,
      phoneDelDialog: false,
      tableData: [{
          time: '2018-04-10  15:47:28',
          IP: '192.103.104.101',
          address: 'Hong Kong'
        }, {
          time: '2018-04-10  15:47:28',
          IP: '192.103.104.101',
          address: 'Hong Kong'
        }, {
          time: '2018-04-10  15:47:28',
          IP: '192.103.104.101',
          address: 'Hong Kong'
        }, {
          time: '2018-04-10  15:47:28',
          IP: '192.103.104.101',
          address: 'Hong Kong'
        },],
        
    };
  },
  methods: {
      googleClick(eve) {
          console.log(eve);
          if(eve){
              this.googleAddDialog =true;
          }
          return false;
        // if(this.googleFlag == true){
        //     
        // }

      },
      googleStart() {
        this.$router.push("/attestation")
      },
      switchClick(target) {     //判断swich显示对应弹窗
        console.log(this[target],target);
        var flag = this[target],target;
        if(target == 'phoneFlag'){
            if(flag){

            }else{

            }
        }else if(target == 'googleFlag'){
            if(flag){
                this.googleDelDialog = true;
            }else{
                this.googleAddDialog = true;
            }
        }
      }
    },
};
</script>

<style lang='scss'>
.accBox {
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
  .emailBox,
  .itemBox {
    border: 1px solid #cccccc;
  }
  .emailBox {
    height: 200px;
    box-sizing: border-box;
    padding: 16px 30px;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    margin-bottom: 20px;
    .email {
      display: flex;
      justify-content: space-between;
      align-items: center;
      .name {
        font-size: 20px;
      }
      a {
        color: #f5a623;
        font-size: 14px;
        padding-right: 10px;
      }
    }
    .loginTime {
      // margin: 32px 0;
      font-size: 12px;
      span {
        margin-right: 20px;
      }
    }
    .UID {
      font-size: 12px;
    }
  }
  .itemBox {
    width: 580px;
    height: 140px;
    box-sizing: border-box;
    padding: 30px 20px;
    display: flex;
    justify-content: space-between;
    .boxL{
        width: 360px;
        .titles{
            line-height: 20px;
            margin-bottom: 10px;
            i{
                color: #999999 ;
                font-size: 20px;
                margin-right: 6px;
            }
            .title{
                font-size: 15px;
                
            }
        }
        .tips{
            font-size: 12px;
        }
    }
    .boxR{
        display: flex;
        justify-content: center;
        align-items: center;
        position: relative;
        .el-button{
            border-radius: 0;
            width: 120px;
            height: 40px;
        }
        .el-switch__core{
            margin-right: 30px;
        }
        .switchBtn{
            width: 56%;
            height: 26%;
            position: absolute;
            left: 0;
            top: 36%;
            z-index: 5;
            border-radius: 10px;
            cursor:pointer;
        }
    }
  }
  .otherBox {
    height: 300px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    margin-bottom: 30px;
    .otherT,
    .otherB {
      display: flex;
      justify-content: space-between;
    }
  }
  .tableBox{
        margin-bottom: 50px;
        .tabTip{
            line-height: 24px;
            font-size: 14px;
        }
        .latelyTab{
            margin: 20px 0;
            border: 1px solid #ccc;
            
        }
        .el-table th, .el-table td{
            padding: 0;
            height: 30px;
            font-size: 12px;
        }
        .el-table th{
            background: #eeeeee;
            font-weight: 500;
        }
        .el-table th.is-leaf, .el-table td{
            border-bottom: 1px solid #ccc;
        }
        .el-table--enable-row-hover .el-table__body tr:hover > td{
          background-color: rgba(245,166,35,0.10);
        }
        .firstCol{
            padding-left: 50px !important;
        }
  }

  .changePwd{
      
  }
}
</style>