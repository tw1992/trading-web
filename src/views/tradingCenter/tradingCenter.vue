<template>
  <div class="tradingCenterBox">
    <div class="tradHeader">
      <router-link to="/Home" class="logoBox">
        <img src="../../assets/img/ID  hand.png" alt="logo">
      </router-link>
      <p class="time">2018-04-01    12:00:04</p>
      <div class="block"></div>
      <ul class="fz14 marketList">
        <li>最新价<span class="red fb16">6948.32</span>≈ 44851.40 CNY</li>
        <li>涨跌幅<span class="green"> +0.22%</span></li>
        <li>高 6984.99</li>
        <li>低 6868.67</li>
        <li>24H成交量 13728 BTC</li>
      </ul>
      <div class="goodsBox fz16 white">
        <a href="javascript:;" class="showGoods">BTC/USDT<i class="el-icon-caret-bottom baseColor"></i></a>
      </div>
      <div class="userBox fz16 white">
        <router-link to="/login">登录</router-link>
        <router-link to="/register">注册</router-link>
      </div>
      <div class="langsBox fz16 white">
        <a href="javascript:;" class="showLangs">简体中文<i class="el-icon-arrow-down"></i></a>
      </div>
    </div>
    <div class="tradMain">
      <div class="tradMainL">
        <!-- K线面板 -->
        <div class="tradMainLT">

        </div>
        <!-- 记录面板 -->
        <div class="tradMainLB">

        </div>
      </div>
      <div class="tradMainR">
        <!-- 行情面板 -->
        <div class="tradMainRT">
          <div class="marketL">
            <div class="marketLTop">
              <ul class="selectList">
                <li><a href="javascript:;" :class="marketSelect == 1?'tableActive':''" @click="marketSelect = 1"></a></li>
                <li><a href="javascript:;" :class="marketSelect == 2?'tableActive':''" @click="marketSelect = 2"></a></li>
                <li><a href="javascript:;" :class="marketSelect == 3?'tableActive':''" @click="marketSelect = 3"></a></li>
              </ul>
              <div class="flort">
                <span>深度合并</span>
                <a href="javascript:;" class="flortBtn">8位小数<i class="el-icon-caret-bottom"></i></a>
              </div>
            </div>

            <table class="table">
							<tbody>
                <tr>
                  <th class="f-left fz14">价格(BTC)</th>
                  <th class="f-center fz15">数量(IOST)</th>
                  <th class="f-right fz14">金额（BTC)</th>
                </tr>
							</tbody>
              <colgroup style="width:30%;"></colgroup>
							<colgroup style="width:30%;"></colgroup>
							<colgroup style="width:30%;"></colgroup>
						</table>

            <div class="markefive">
              <div class="tableBox" :class="marketSelect == 2?'toHeight100':marketSelect == 3?'toHeight0':''">
                <table class="table">
                  <colgroup style="width:30%;"></colgroup>
                  <colgroup style="width:30%;"></colgroup>
                  <colgroup style="width:30%;"></colgroup>
                  <tbody>
                    <tr v-for="(it,idx) in newmarket" :key="idx">
                      <td class="f-left red"><span>{{it.price}}</span></td>
                      <td class="f-center"><span>{{it.num}}</span></td>
                      <td class="f-right" style="color: #898989;"><span>{{it.time}}</span><div class="zhuzhuang redBg" :style="{width: Math.random()*346+'px'}"></div></td>
                    </tr>
                  </tbody>
                </table>
              </div>
              
              <div class="depth">
                <div class="depthL green fz14">
                  0.00000435<i class="el-icon-sort-up"></i><span class="price baseColor">&yen;0.18</span>
                </div>
                <div class="depthWrong">
                  <img src="https://resource.binance.com/resources/img/depthFail.gif">
                  <p>行情更新延迟</p>
                </div>
              </div>
              <div class="tableBox" :class="marketSelect == 3?'toHeight100':marketSelect == 2?'toHeight0':''">
                <table class="table">
                  <colgroup style="width:30%;"></colgroup>
                  <colgroup style="width:30%;"></colgroup>
                  <colgroup style="width:30%;"></colgroup>
                  <tbody>
                    <tr v-for="(it,idx) in newmarket" :key="idx">
                      <td class="f-left green"><span>{{it.price}}</span></td>
                      <td class="f-center"><span>{{it.num}}</span></td>
                      <td class="f-right" style="color: #898989;"><span>{{it.time}}</span><div class="zhuzhuang greenBg" :style="{width: Math.random()*346+'px'}"></div></td>
                    </tr>
                  </tbody>
                  
                </table>
              </div>
            </div>
          </div>
          <div class="marketR">
            <table class="table">
							<tbody>
                <tr>
                  <th class="f-left fz13">价格(BTC)</th>
                  <th class="f-center fz13">数量(IOST)</th>
                  <th class="f-right fz13">时间</th>
                </tr>
							</tbody>
              <colgroup style="width:30%;"></colgroup>
							<colgroup style="width:30%;"></colgroup>
							<colgroup style="width:30%;"></colgroup>
						</table>
            <div class="newmarket">
              <table class="table">
                <colgroup style="width:30%;"></colgroup>
                <colgroup style="width:30%;"></colgroup>
                <colgroup style="width:30%;"></colgroup>
                <tbody>
                  <tr v-for="(it,idx) in newmarket" :key="idx">
                    <td class="f-left" :class="it.direction==0?'red':'green'"><span>{{it.price}}</span></td>
                    <td class="f-center"><span>{{it.num}}</span></td>
                    <td class="f-right" style="color: #898989;"><span>{{it.time}}</span></td>
                  </tr>
                </tbody>
                
              </table>
            </div>
          </div>
        </div>
        <!-- 交易面板 -->
        <div class="tradMainRB">
          <ul class="dealSelect fz14">
            <li><a href="javascript:;" :class="dealSelect == 1?'active':''" @click="dealSelect=1">限价交易</a></li>
            <li><a href="javascript:;" :class="dealSelect == 2?'active':''" @click="dealSelect=2">市价交易</a></li>
            <li><a href="javascript:;" :class="dealSelect == 3?'active':''" @click="dealSelect=3">止盈止损</a></li>
          </ul>
          <div class="dealbox">
            <div class="dealItem">
              <div class="dealT">
                <span class="f-fl">买入 XRP</span>
                <span class="f-fr"><i class="el-icon-edit"></i>__BTC</span>
              </div>
              <div class="inputItem">
                <span class="fcB">价格：</span>
                <label>BTC</label>
                <input type="text">
                <span class="legalMoney">￥0.41</span>
                <div class="jiantou baseColor">
                  <i class="el-icon-caret-top"></i>
                  <i class="el-icon-caret-bottom"></i>
                </div>
              </div>
              <div class="inputItem">
                <span class="fcB">数量：</span>
                <label>XRP</label>
                <input type="text">
                <span class="most">最多购买<span>0</span></span>
                <div class="jiantou baseColor">
                  <i class="el-icon-caret-top"></i>
                  <i class="el-icon-caret-bottom"></i>
                </div>
              </div>
              <div class="numBox">
                <div class="numList">
                  <a href="javascript:;">25%</a>
                  <a href="javascript:;">50%</a>
                  <a href="javascript:;">75%</a>
                  <a href="javascript:;">100%</a>
                </div>
              </div>
              <div class="sumBox">
                <span class="fcB">交易额 ： </span>
                <span class="sum">0.00000000000<span>BTC</span></span>
              </div>
              <el-button class="buy" type="success">买入</el-button>
            </div>

            <div class="dealItem">
              <div class="dealT">
                <span class="f-fl">卖出 XRP</span>
                <span class="f-fr"><i class="el-icon-edit"></i>__BTC</span>
              </div>
              <div class="inputItem">
                <span class="fcB">价格：</span>
                <label>BTC</label>
                <input type="text">
                <span class="legalMoney">￥0.41</span>
                <div class="jiantou baseColor">
                  <i class="el-icon-caret-top"></i>
                  <i class="el-icon-caret-bottom"></i>
                </div>
              </div>
              <div class="inputItem">
                <span class="fcB">数量：</span>
                <label>XRP</label>
                <input type="text">
                <span class="most">最多购买<span>0</span></span>
                <div class="jiantou baseColor">
                  <i class="el-icon-caret-top"></i>
                  <i class="el-icon-caret-bottom"></i>
                </div>
              </div>
              <div class="numBox">
                <div class="numList">
                  <a href="javascript:;">25%</a>
                  <a href="javascript:;">50%</a>
                  <a href="javascript:;">75%</a>
                  <a href="javascript:;">100%</a>
                </div>
              </div>
              <div class="sumBox">
                <span class="fcB">交易额 ： </span>
                <span class="sum">0.00000000000<span>BTC</span></span>
              </div>
              <el-button class="sell" type="success">卖出</el-button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  
</template>

<script>
export default {
  data() {
      return {
        newmarket:[],
        marketSelect: 1,  //行情选项
        dealSelect:1,     //交易选项
      };
    },
    methods: {
      getTable() {
        var list = [{
          price: "0.00000438",
          num: "11,234",
          time: "18:09:07",
          direction: 0
        },{
          price: "0.00000438",
          num: "11,234",
          time: "18:09:07",
          direction: 0
        },{
          price: "0.00000438",
          num: "11,234",
          time: "18:09:07",
          direction: 0
        },{
          price: "0.00000438",
          num: "11,234",
          time: "18:09:07",
          direction: 0
        },{
          price: "0.00000438",
          num: "11,234",
          time: "18:09:07",
          direction: 0
        },{
          price: "0.00000438",
          num: "11,234",
          time: "18:09:07",
          direction: 1
        },{
          price: "0.00000438",
          num: "11,234",
          time: "18:09:07",
          direction: 0
        },{
          price: "0.00000438",
          num: "11,234",
          time: "18:09:07",
          direction: 1
        },{
          price: "0.00000438",
          num: "11,234",
          time: "18:09:07",
          direction: 1
        },{
          price: "0.00000438",
          num: "11,234",
          time: "18:09:07",
          direction: 0
        },{
          price: "0.00000438",
          num: "11,234",
          time: "18:09:07",
          direction: 0
        },{
          price: "0.00000438",
          num: "11,234",
          time: "18:09:07",
          direction: 0
        },{
          price: "0.00000438",
          num: "11,234",
          time: "18:09:07",
          direction: 0
        },{
          price: "0.00000438",
          num: "11,234",
          time: "18:09:07",
          direction: 0
        },{
          price: "0.00000438",
          num: "11,234",
          time: "18:09:07",
          direction: 0
        },{
          price: "0.00000438",
          num: "11,234",
          time: "18:09:07",
          direction: 1
        },{
          price: "0.00000438",
          num: "11,234",
          time: "18:09:07",
          direction: 1
        },{
          price: "0.00000438",
          num: "11,234",
          time: "18:09:07",
          direction: 0
        },{
          price: "0.00000438",
          num: "11,234",
          time: "18:09:07",
          direction: 0
        },{
          price: "0.00000438",
          num: "11,234",
          time: "18:09:07",
          direction: 0
        },{
          price: "0.00000438",
          num: "11,234",
          time: "18:09:07",
          direction: 0
        },{
          price: "0.00000438",
          num: "11,234",
          time: "18:09:07",
          direction: 0
        },{
          price: "0.00000438",
          num: "11,234",
          time: "18:09:07",
          direction: 1
        },{
          price: "0.00000438",
          num: "11,234",
          time: "18:09:07",
          direction: 0
        },{
          price: "0.00000438",
          num: "11,234",
          time: "18:09:07",
          direction: 1
        },{
          price: "0.00000438",
          num: "11,234",
          time: "18:09:07",
          direction: 1
        },{
          price: "0.00000438",
          num: "11,234",
          time: "18:09:07",
          direction: 0
        },{
          price: "0.00000438",
          num: "11,234",
          time: "18:09:07",
          direction: 0
        },{
          price: "0.00000438",
          num: "11,234",
          time: "18:09:07",
          direction: 0
        },{
          price: "0.00000438",
          num: "11,234",
          time: "18:09:07",
          direction: 0
        },{
          price: "0.00000438",
          num: "11,234",
          time: "18:09:07",
          direction: 0
        },{
          price: "0.00000438",
          num: "11,234",
          time: "18:09:07",
          direction: 0
        },{
          price: "0.00000438",
          num: "11,234",
          time: "18:09:07",
          direction: 1
        },{
          price: "0.00000438",
          num: "11,234",
          time: "18:09:07",
          direction: 1
        },{
          price: "0.00000438",
          num: "11,234",
          time: "18:09:07",
          direction: 0
        },{
          price: "0.00000438",
          num: "11,234",
          time: "18:09:07",
          direction: 0
        },{
          price: "0.00000438",
          num: "11,234",
          time: "18:09:07",
          direction: 0
        },{
          price: "0.00000438",
          num: "11,234",
          time: "18:09:07",
          direction: 0
        },{
          price: "0.00000438",
          num: "11,234",
          time: "18:09:07",
          direction: 0
        },{
          price: "0.00000438",
          num: "11,234",
          time: "18:09:07",
          direction: 1
        },{
          price: "0.00000438",
          num: "11,234",
          time: "18:09:07",
          direction: 0
        },{
          price: "0.00000438",
          num: "11,234",
          time: "18:09:07",
          direction: 1
        },{
          price: "0.00000438",
          num: "11,234",
          time: "18:09:07",
          direction: 1
        },{
          price: "0.00000438",
          num: "11,234",
          time: "18:09:07",
          direction: 0
        },{
          price: "0.00000438",
          num: "11,234",
          time: "18:09:07",
          direction: 0
        },{
          price: "0.00000438",
          num: "11,234",
          time: "18:09:07",
          direction: 0
        },{
          price: "0.00000438",
          num: "11,234",
          time: "18:09:07",
          direction: 0
        },{
          price: "0.00000438",
          num: "11,234",
          time: "18:09:07",
          direction: 0
        },{
          price: "0.00000438",
          num: "11,234",
          time: "18:09:07",
          direction: 0
        },{
          price: "0.00000438",
          num: "11,234",
          time: "18:09:07",
          direction: 1
        },{
          price: "0.00000438",
          num: "11,234",
          time: "18:09:07",
          direction: 1
        },{
          price: "0.00000438",
          num: "11,234",
          time: "18:09:07",
          direction: 0
        }];

        this.newmarket = list;

      }
    },
    mounted() {
      this.getTable();
    }
}
</script>

<style lang="scss" scoped>
$baseColor : #F5A623;
//基础样式
.tradingCenterBox{
  .fz13{
    font-size: 13px;
  }
  .fz14{
    font-size: 14px;
  }
  .fz16{
    font-size: 16px;
  }
  .fz18{
    font-size: 18px;
  }
  .baseColor{
    color: $baseColor;
  }
  .white{
    color: #ffffff;
  }
  .fcB{
    color: #7D7D7D;
  }
  .red{
    color: #DD6B73;
    &:hover{
      color: #E14655;
    }
  }
  .redBg{
    background: rgba(242,119,176,0.33);
  }
  .green{
    color: #7EC28D;
    &:hover{
      color: #69e083;
    }
  }
  .greenBg{
    background: rgba(142,201,25,0.21);;
  }
  a{
    color: #ffffff;
  }
  .f-left{
    text-align: left !important;
  }
  .f-right{
    text-align: right !important;
  }
  .f-center{
    text-align: center !important;
  }
  .f-fl{
    float: left;
  }
  .f-fr{
    float: right;
  }
}

.tradingCenterBox{
  overflow-x: hidden;
  width: 100%;
  height: 100%;
  color: #CDCDCD;
  background: #212121;
  font-size: 12px;
  box-sizing: border-box;
  padding-top: 40px;
  position: relative;
  .tradHeader{
    position: absolute;
    min-width: 1350px;
    top: 0;
    left: 0;
    width: 100%;
    height: 40px;
    // background: #212121;
    display: flex;
    align-items: center;
    .logoBox{
      display: block;
      width: 70px;
      height: 26px;
      margin-left: 10px;
      margin-right: 50px;
      img{
        width: 100%;
        height: 100%;
      }
    }
    .block{
      flex: 1;
    }
    .marketList{
      display: flex;
      li{
        margin-right: 20px;
        .red{
          margin: 0 4px;
        }
      }
    }
    .goodsBox{
      height: 100%;
      .showGoods{
        padding: 0 24px;
        width: 100%;
        height: 100%;
        line-height: 40px;
        display: block;
        border-left: 2px solid #333434;
        i{
          margin-left: 10px;
        }
      }
    }
    .userBox{
      height: 100%;
      a{
        padding: 0 10px;
        line-height: 40px;
        &:nth-child(1){
          border-right: 1px solid #ffffff;
        }
      }
    }
    .langsBox{
      height: 100%;
      a{
        padding: 0 14px;
        height: 100%;
        line-height: 40px;
        display: block;
        i{
          margin-left: 10px;
        }
      }
    }
  }

  .tradMain{
    width: 100%;
    height: 100%;
    display: flex;

    //滚动条
    .newmarket{
      &::-webkit-scrollbar{
        width:6px;
        height:10px;
      }
      &::-webkit-scrollbar-button{
        display: none;
      }
      &::-webkit-scrollbar-track{
        background-color:#3D454D;
      }
      &::-webkit-scrollbar-thumb{
        background:#5F6266;
      }
    }

    .tradMainLT,.tradMainLB,.marketL,.marketR,.tradMainRB{
      background: #000000;
    }
    .tradMainL{
      flex: 1;
      display: flex;
      flex-direction: column;
      .tradMainLT{
        flex: 1;
        min-width: 620px;
        min-height: 270px;
      }
      .tradMainLB{
        height: 254px;
        margin-top: 10px;
      }
    }
    .tradMainR{
      width: 654px;
      height: 100%;
      margin-left: 8px;
      display: flex;
      flex-direction: column;
      .tradMainRT{
        flex: 1;
        display: flex;
        .table{
          width: 100%;
          border-collapse: collapse;
          border-spacing: 0;
          cursor:pointer;
          th{
            padding: 2px 12px;
          }
          // th:nth-child(3){
          //   padding-right: 12px;
          // }
          tr{
            &:hover{
              background: #1B1B1B;
            }
          }
          td{
            box-sizing: border-box;
            padding: 2px 0px;
            line-height: 12px;
            position: relative;
            .zhuzhuang{
              position: absolute;
              top: 1px;
              bottom: 0;
              right: 0;
            }
          }
          tr td:nth-child(1){
            padding-left: 12px;
          }
          tr td:nth-child(3){
            padding-right: 6px;
          }
        }
        .marketL{
          height: 100%;
          width: 346px;
          display: flex;
          flex-direction: column;
          margin-right: 8px;
          .marketLTop{
            height: 30px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            .selectList{
              display: flex;
              li{
                margin-left: 12px;
                a{
                  display: block;
                  height: 14px;
                  width: 26px;
                  border: 1px solid #858282;
                }
                a.tableActive{
                  border-color: $baseColor;
                }
              }
            }
            .flort{
              .flortBtn{
                height: 18px;
                border: 1px solid #858282;
                padding: 0 6px;
                margin: 0 8px;
                i{
                  margin-left: 4px;
                }
              }
            }
          }
          .markefive{
            flex: 1;
            display: flex;
            flex-direction: column;
            .tableBox{
              height: 286px;
              overflow-y: hidden;
              transition: all 0.5s ease;
              tr td:nth-child(3){
                padding-right: 12px;
              }
              
            }
            .tableBox.toHeight0{
                height: 0;
              }
            .tableBox.toHeight100{
              height: 572px;
            }
            .depth{
              display: flex;
              justify-content: space-between;
              align-items: center;
              height: 20px;
              background: #56585B;
              padding: 0 12px;
              .depthL{
                i{
                  margin-right: 8px;
                }
              }
            }
            .depthWrong{
              position: relative;
              width: 20px;
              height: 10px;
              &:hover p{
                opacity: 1;
                z-index: 5;
              }
              img{
                border: 0;
                max-width: 100%;
                max-height: 100%;
              }
              p{
                opacity: 0;
                font-size: 12px;
                color: #666;
                padding: 4px 10px;
                background: #fff;
                box-shadow: 0 0 10px rgba(255,255,255,0.3);
                position: absolute;
                left: 50%;
                top: -5px;
                z-index: -1;
                white-space: nowrap;
                transform: translate(-50%,-100%);
                transition: all 0.3s ease-in-out;
              }
            }
          }
        }
        .marketR{
          height: 100%;
          width: 300px;
          display: flex;
          flex-direction: column;
          .newmarket{
            flex: 1;
            overflow-y: auto;
          }
        }
      }
      .tradMainRB{
        height: 254px;
        margin-top: 10px;
        display: flex;
        flex-direction: column;
        .dealSelect{
          display: flex;
          border-bottom: 1px solid #101010;
          li{
            a{
              line-height: 40px;
              margin: 0 24px;
              box-sizing: border-box;
              display: block;
              height: 100%;
            }
            a.active{
              border-bottom: 1px solid #7694EF;
            }
          }
        }
        .dealbox{
          flex: 1;
          padding: 0 24px;
          display: flex;
          justify-content: space-between;
          .dealItem{
            width: 288px;
            .dealT{
              height: 28px;
              line-height: 28px;
              i{
                margin-right: 10px;
              }
            }
            .inputItem{
              height: 32px;
              width: 100%;
              line-height: 32px;
              margin-bottom: 6px;
              position: relative;
              input{
                padding: 0 68px 0 18px;
                box-sizing: border-box;
                width: 226px;
                height: 32px;
                display: inline-block;
                float: right;
                background: #424C55;
                border: 0;
                color: #CDCDCD;
                &:focus + .legalMoney,&:focus + .most{
                  display: block;
                }
                &:hover{
                  border: 1px solid $baseColor;
                }
              }
              label{
                height: 32px;
                position: absolute;
                top: 0;
                right: 42px;
                z-index: 5;
              }
              .jiantou{
                height: 24px;
                position: absolute;
                top: 4px;
                right: 16px;
                display: flex;
                flex-direction: column;
                justify-content: space-between;
                i{
                  cursor:pointer;
                }
              }
              .legalMoney{
                padding: 4px 6px;
                font-size: 12px;
                color: #fff;
                border-radius: 3px;
                display: none;
                position: absolute;
                top: -48px;
                left: 95px;
                z-index: 99999;
                border: 1px solid rgba(0,0,0,1);
                background: #424c55;
                &::before{
                  content: " ";
                  border: 6px solid transparent;
                  border-top-color: #424c55;
                  position: absolute;
                  bottom: -12px;
                  left: 50%;
                  margin-left: -5px;
                  z-index: 999;
                }
                &::after{
                  content: " ";
                  border: 6px solid transparent;
                  border-top-color: #424c55;
                  position: absolute;
                  bottom: -12px;
                  left: 50%;
                  margin-left: -5px;
                  z-index: 999;
                }
              }
              .most{
                width: 226px;
                height: 20px;
                line-height: 20px;
                background: $baseColor;
                color: #333333;
                position: absolute;
                top:32px;
                right: 0;
                text-indent: 6px;
                display: none;
                span{
                  margin-left: 4px;
                }
              }
              .sum{
                margin-left: 6px;
                span{
                  margin-left: 6px;
                }
              }
            }
            .numBox{
              width: 100%;
              overflow: hidden;
              .numList{
                float: right;
                width: 226px;
                display: flex;
                justify-content: space-between;
                margin: 10px 0;
                a{
                  width: 40px;
                  height: 20px;
                  line-height: 20px;
                  display: block;
                  border: 1px dashed #424c55;
                  color: #808385;
                  text-align: center;
                  &:hover{
                    color: $baseColor;
                    border-color: $baseColor;
                  }
                }
              }
            }
            .sumBox{
              height: 20px;
              width: 100%;
              line-height: 20px;
              margin-bottom: 6px;
            }
            .el-button{
              width: 100%;
              height: 32px;
              font-size: 12px;
              border: 0;
            }
            .buy{
              background: #7EC28D;
              &:hover{
                background: #69e083;
              }
            }
            .sell{
              background: #DD6B73;
              &:hover{
                background: #FF9299;
              }
            }
          }
        }
      }
    }
  }
  
}
</style>


