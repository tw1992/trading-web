<template>
  <div class="tradingCenterBox">
    <div class="tradHeader">
      <router-link to="/Home" class="logoBox">
        <img src="../../assets/img/logo.png" alt="logo">
      </router-link>
      <p class="time">2018-04-01 12:00:04</p>
      <div class="block"></div>
      <ul class="fz12 marketList">
        <li>{{$t('home.lastPrice')}}<span style="margin:0 2px;" class="fb16 red">6948.32</span>≈ 44851.40 CNY</li>
        <li>{{$t('tradingCenter.change')}}<span class="green"> +0.22%</span></li>
        <li>{{$t('home.high')}} 6984.99</li>
        <li>{{$t('home.low')}} 6868.67</li>
        <li>24H{{$t('home.volume')}} 13728 BTC</li>
      </ul>
      <div class="goodsBox fz14 white">
        <div class="showGoods options">BTC/USDT<i class="el-icon-caret-bottom baseColor"></i></div>
      </div>
      <div class="userBox fz14 white">
        <router-link to="/login">{{$t('route.login')}}</router-link>
        <router-link to="/register">{{$t('route.register')}}</router-link>
      </div>
      <div class="langsBox fz14 white">
        <div class="showLangs options">{{$t('route.lang')}}<i class="el-icon-arrow-down"></i></div>
      </div>
    </div>
    <div class="tradMain">
      <div class="tradMainL">
        <!-- K线面板 -->
        <div class="tradMainLT">

        </div>
        <!-- 订单面板 -->
        <div class="tradMainLB">
          <ul class="orderSelect fz14">
<<<<<<< HEAD
            <li><div class="options" :class="orderSelect == 1?'active':''" @click="orderSelect=1">{{$t('route.openOrders')}}</div></li>
            <li><div class="options" :class="orderSelect == 2?'active':''" @click="orderSelect=2">{{$t('route.orderHistory')}}</div></li>
            <li><div class="options" :class="orderSelect == 3?'active':''" @click="orderSelect=3">{{$t('tradingCenter.tradeHistory')}}</div></li>
            <li><div class="options" :class="orderSelect == 4?'active':''" @click="orderSelect=4">{{$t('route.funds')}}</div></li>
            <div class="block"></div>
            <div class="hideOrder"><el-checkbox v-model="hideOrder">{{$t('tradingCenter.hide')}}</el-checkbox></div>
=======
            <li>
              <div class="options" :class="orderSelect == 1?'active':''" @click="orderSelect=1">当前委托</div>
            </li>
            <li>
              <div class="options" :class="orderSelect == 2?'active':''" @click="orderSelect=2">历史委托</div>
            </li>
            <li>
              <div class="options" :class="orderSelect == 3?'active':''" @click="orderSelect=3">历史成交</div>
            </li>
            <li>
              <div class="options" :class="orderSelect == 4?'active':''" @click="orderSelect=4">资产管理</div>
            </li>
            <div class="block"></div>
            <div class="hideOrder">
              <el-checkbox v-model="hideOrder">隐藏其他交易对</el-checkbox>
            </div>
>>>>>>> 8d73bbd88f51a7aac30a69d0e99a53621d5331dc
          </ul>
          <div class="orderTableBox">
            <!-- 当前委托 -->
            <div class="slider" v-show="orderSelect == 1">
              <table class="table tableHead">
<<<<<<< HEAD
										<colgroup style="width: 12%"></colgroup>
										<colgroup style="width: 8%"></colgroup>
										<colgroup style="width: 8%"></colgroup>
										<colgroup style="width: 8%"></colgroup>
										<colgroup style="width: 9%"></colgroup>
										<colgroup style="width: 9%"></colgroup>
										<colgroup style="width: 9%"></colgroup>
										<colgroup style="width: 11%"></colgroup>
										<colgroup style="width: 11%"></colgroup>
										<colgroup style="width: 13%"></colgroup>
								<tbody>
                  <tr>
									<th style="padding-left: 24px;">{{$t('tradingCenter.date')}}</th>
									<th>{{$t('home.pair')}}</th>
									<th>{{$t('tradingCenter.type')}}</th>
									<th>{{$t('tradingCenter.side')}}</th>
									<th>{{$t('tradingCenter.price')}}</th>
									<th>{{$t('tradingCenter.amount')}}</th>
									<th>{{$t('tradingCenter.filled')}}%</th>
									<th>{{$t('tradingCenter.totalVal')}}</th>
									<th>{{$t('tradingCenter.trigger')}}</th>
									<th style="text-align: center;" class="cancels">
										<span class="btn">{{$t('tradingCenter.cancelAll')}}</span>
										<div class="btn iconfont-downsjsmall">
=======
                <colgroup style="width: 12%"></colgroup>
                <colgroup style="width: 8%"></colgroup>
                <colgroup style="width: 8%"></colgroup>
                <colgroup style="width: 8%"></colgroup>
                <colgroup style="width: 11%"></colgroup>
                <colgroup style="width: 11%"></colgroup>
                <colgroup style="width: 9%"></colgroup>
                <colgroup style="width: 11%"></colgroup>
                <colgroup style="width: 11%"></colgroup>
                <colgroup style="width: 13%"></colgroup>
                <tbody>
                <tr>
                  <th style="padding-left: 24px;">时间</th>
                  <th>市场</th>
                  <th>类型</th>
                  <th>方向</th>
                  <th>价格</th>
                  <th>数量</th>
                  <th>成交率%</th>
                  <th>成交金额</th>
                  <th>触发条件</th>
                  <th style="text-align: center;" class="cancels">
                    <span class="btn">全撤</span>
                    <div class="btn iconfont-downsjsmall">
>>>>>>> 8d73bbd88f51a7aac30a69d0e99a53621d5331dc
                      <i class="el-icon-more"></i>
                      <div class="cancelType">
                        <ul>
                          <li>{{$t('tradingCenter.all')}}</li>
                          <li>{{$t('tradingCenter.limitOrder')}}</li>
                          <li>{{$t('tradingCenter.stopLimitOrder')}}</li>
                        </ul>
                      </div>
                    </div>
                  </th>

                </tr>
                </tbody>
              </table>
              <div class="tableBox">
                <div class="tbody">
<<<<<<< HEAD
									<table class="table table-strip">
										<colgroup style="width: 12%"></colgroup>
										<colgroup style="width: 8%"></colgroup>
										<colgroup style="width: 8%"></colgroup>
										<colgroup style="width: 8%"></colgroup>
										<colgroup style="width: 9%"></colgroup>
										<colgroup style="width: 9%"></colgroup>
										<colgroup style="width: 9%"></colgroup>
										<colgroup style="width: 11%"></colgroup>
										<colgroup style="width: 11%"></colgroup>
										<colgroup style="width: 13%"></colgroup>
										<tbody>
                      <tr v-for="(item,idx) in openOrder" :key="idx">
                        <td><span>{{item.time}}</span></td>
                        <td><span>{{item.goods}}</span></td>
                        <td><span>{{item.type}}</span></td>
                        <td><span>{{item.direction}}</span></td>
                        <td><span>{{item.price}}</span></td>
                        <td><span>{{item.num}}</span></td>
                        <td><span>{{item.probability}}</span></td>
                        <td><span>{{item.sum}}</span></td>
                        <td><span>{{item.condition}}</span></td>
                        <td style="text-align: center;"><div class="options">{{$t('tradingCenter.cancel')}}</div></td>
                      </tr>
										</tbody>
									</table>
								</div>
=======
                  <table class="table table-strip">
                    <colgroup style="width: 12%"></colgroup>
                    <colgroup style="width: 8%"></colgroup>
                    <colgroup style="width: 8%"></colgroup>
                    <colgroup style="width: 8%"></colgroup>
                    <colgroup style="width: 11%"></colgroup>
                    <colgroup style="width: 11%"></colgroup>
                    <colgroup style="width: 9%"></colgroup>
                    <colgroup style="width: 11%"></colgroup>
                    <colgroup style="width: 11%"></colgroup>
                    <colgroup style="width: 13%"></colgroup>
                    <tbody>
                    <tr v-for="(item,idx) in openOrder" :key="idx">
                      <td><span>{{item.time}}</span></td>
                      <td><span>{{item.goods}}</span></td>
                      <td><span>{{item.type}}</span></td>
                      <td><span>{{item.direction}}</span></td>
                      <td><span>{{item.price}}</span></td>
                      <td><span>{{item.num}}</span></td>
                      <td><span>{{item.probability}}</span></td>
                      <td><span>{{item.sum}}</span></td>
                      <td><span>{{item.condition}}</span></td>
                      <td style="text-align: center;">
                        <div class="options">撤销</div>
                      </td>
                    </tr>
                    </tbody>
                  </table>
                </div>
>>>>>>> 8d73bbd88f51a7aac30a69d0e99a53621d5331dc
              </div>
            </div>

            <!-- 历史委托 -->
            <div class="slider" v-show="orderSelect == 2">
              <div class="scopeBox">
                <ul class="scopeList">
<<<<<<< HEAD
                  <li><div class="options">{{$t('tradingCenter.nowDay')}}</div></li>
                  <li><div class="options">{{$t('tradingCenter.oneWeek')}}</div></li>
                  <li><div class="options">{{$t('tradingCenter.oneMonth')}}</div></li>
                  <li><div class="options">{{$t('tradingCenter.threeMonth')}}</div></li>
=======
                  <li>
                    <div class="options">当日</div>
                  </li>
                  <li>
                    <div class="options">一周</div>
                  </li>
                  <li>
                    <div class="options">一个月</div>
                  </li>
                  <li>
                    <div class="options">三个月</div>
                  </li>
>>>>>>> 8d73bbd88f51a7aac30a69d0e99a53621d5331dc
                </ul>
                <div class="timeBox">
                  <span class="lable">{{$t('tradingCenter.form')}}</span>
                  <el-date-picker
                    v-model="startTime"
                    type="date"
                    size="mini"
                    prefix-icon="el-icon-caret-bottom"
                    :placeholder="$t('tradingCenter.dateOption')">
                  </el-date-picker>
                  <div class="line"></div>
                  <el-date-picker
                    v-model="endTime"
                    type="date"
                    size="mini"
                    prefix-icon="el-icon-caret-bottom"
                    :placeholder="$t('tradingCenter.dateOption')">
                  </el-date-picker>
                  <div class="searchTime">{{$t('button.search')}}</div>
                </div>
              </div>
              <table class="table tableHead">
<<<<<<< HEAD
										<colgroup style="width: 11%"></colgroup>
										<colgroup style="width: 7%"></colgroup>
										<colgroup style="width: 5%"></colgroup>
										<colgroup style="width: 7%"></colgroup>
										<colgroup style="width: 9%"></colgroup>
										<colgroup style="width: 9%"></colgroup>
										<colgroup style="width: 9%"></colgroup>
										<colgroup style="width: 9%"></colgroup>
                    <colgroup style="width: 9%"></colgroup>
										<colgroup style="width: 9%"></colgroup>
										<colgroup style="width: 9%"></colgroup>
								<tbody>
                  <tr>
									<th style="padding-left: 24px;">{{$t('tradingCenter.comTime')}}</th>
									<th>{{$t('home.pair')}}</th>
									<th>{{$t('tradingCenter.type')}}</th>
									<th>{{$t('tradingCenter.side')}}</th>
									<th>{{$t('tradingCenter.avg')}}</th>
									<th>{{$t('tradingCenter.price')}}</th>
									<th>Filled</th>
									<th>{{$t('tradingCenter.amount')}}</th>
                  <th>{{$t('tradingCenter.totalVal')}}</th>
									<th>{{$t('tradingCenter.trigger')}}</th>
									<th>{{$t('tradingCenter.status')}}</th>
=======
                <colgroup style="width: 9%"></colgroup>
                <colgroup style="width: 9%"></colgroup>
                <colgroup style="width: 9%"></colgroup>
                <colgroup style="width: 9%"></colgroup>
                <colgroup style="width: 9%"></colgroup>
                <colgroup style="width: 9%"></colgroup>
                <colgroup style="width: 9%"></colgroup>
                <colgroup style="width: 9%"></colgroup>
                <colgroup style="width: 9%"></colgroup>
                <colgroup style="width: 9%"></colgroup>
                <colgroup style="width: 9%"></colgroup>
                <tbody>
                <tr>
                  <th style="padding-left: 24px;">委托时间</th>
                  <th>市场</th>
                  <th>类型</th>
                  <th>方向</th>
                  <th>均价</th>
                  <th>价格</th>
                  <th>Filled</th>
                  <th>数量</th>
                  <th>成交金额</th>
                  <th>触发条件</th>
                  <th>状态</th>
>>>>>>> 8d73bbd88f51a7aac30a69d0e99a53621d5331dc

                </tr>
                </tbody>
              </table>
              <div class="tableBox" style="height: 140px;">
                <div class="tbody">
<<<<<<< HEAD
									<table class="table table-strip">
										<colgroup style="width: 11%"></colgroup>
										<colgroup style="width: 7%"></colgroup>
										<colgroup style="width: 5%"></colgroup>
										<colgroup style="width: 7%"></colgroup>
										<colgroup style="width: 9%"></colgroup>
										<colgroup style="width: 9%"></colgroup>
										<colgroup style="width: 9%"></colgroup>
										<colgroup style="width: 9%"></colgroup>
=======
                  <table class="table table-strip">
                    <colgroup style="width: 9%"></colgroup>
                    <colgroup style="width: 9%"></colgroup>
                    <colgroup style="width: 9%"></colgroup>
                    <colgroup style="width: 9%"></colgroup>
                    <colgroup style="width: 9%"></colgroup>
                    <colgroup style="width: 9%"></colgroup>
>>>>>>> 8d73bbd88f51a7aac30a69d0e99a53621d5331dc
                    <colgroup style="width: 9%"></colgroup>
                    <colgroup style="width: 9%"></colgroup>
                    <colgroup style="width: 9%"></colgroup>
                    <colgroup style="width: 9%"></colgroup>
                    <colgroup style="width: 9%"></colgroup>
                    <tbody>
                    <tr v-for="(item,idx) in openOrder" :key="idx">
                      <td><span>{{item.time}}</span></td>
                      <td><span>{{item.goods}}</span></td>
                      <td><span>{{item.type}}</span></td>
                      <td><span>{{item.direction}}</span></td>
                      <td><span>{{item.price}}</span></td>
                      <td><span>{{item.num}}</span></td>
                      <td><span>{{item.num}}</span></td>
                      <td><span>{{item.sum}}</span></td>
                      <td><span>{{item.sum}}</span></td>
                      <td><span>{{item.condition}}</span></td>
                      <td><span>{{item.sum}}</span></td>
                    </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            <!-- 历史成交 -->
            <div class="slider" v-show="orderSelect == 3">
              <div class="scopeBox">
                <ul class="scopeList">
<<<<<<< HEAD
                   <li><div class="options">{{$t('tradingCenter.nowDay')}}</div></li>
                  <li><div class="options">{{$t('tradingCenter.oneWeek')}}</div></li>
                  <li><div class="options">{{$t('tradingCenter.oneMonth')}}</div></li>
                  <li><div class="options">{{$t('tradingCenter.threeMonth')}}</div></li>
=======
                  <li>
                    <div class="options">当日</div>
                  </li>
                  <li>
                    <div class="options">一周</div>
                  </li>
                  <li>
                    <div class="options">一个月</div>
                  </li>
                  <li>
                    <div class="options">三个月</div>
                  </li>
>>>>>>> 8d73bbd88f51a7aac30a69d0e99a53621d5331dc
                </ul>
                <div class="timeBox">
                  <span class="lable">{{$t('tradingCenter.form')}}</span>
                  <el-date-picker
                    v-model="startTime"
                    type="date"
                    size="mini"
                    prefix-icon="el-icon-caret-bottom"
                    :placeholder="$t('tradingCenter.dateOption')">
                  </el-date-picker>
                  <div class="line"></div>
                  <el-date-picker
                    v-model="endTime"
                    type="date"
                    size="mini"
                    prefix-icon="el-icon-caret-bottom"
                    :placeholder="$t('tradingCenter.dateOption')">
                  </el-date-picker>
                  <div class="searchTime">{{$t('button.search')}}</div>
                </div>
              </div>
              <table class="table tableHead">
<<<<<<< HEAD
										<colgroup style="width: 20%"></colgroup>
										<colgroup style="width: 10%"></colgroup>
										<colgroup style="width: 10%"></colgroup>
										<colgroup style="width: 14%"></colgroup>
										<colgroup style="width: 14%"></colgroup>
										<colgroup style="width: 14%"></colgroup>
										<colgroup style="width: 14%"></colgroup>
								<tbody>
                  <tr>
									<th style="padding-left: 24px;">{{$t('tradingCenter.finishTime')}}</th>
									<th>{{$t('home.pair')}}</th>
									<th>{{$t('tradingCenter.side')}}</th>
									<th>{{$t('tradingCenter.finishPrice')}}</th>
									<th>{{$t('tradingCenter.finishFilled')}}</th>
                  <th>{{$t('tradingCenter.totalVal')}}</th>
									<th>{{$t('tradingCenter.fee')}}</th>
=======
                <colgroup style="width: 14%"></colgroup>
                <colgroup style="width: 14%"></colgroup>
                <colgroup style="width: 14%"></colgroup>
                <colgroup style="width: 14%"></colgroup>
                <colgroup style="width: 14%"></colgroup>
                <colgroup style="width: 14%"></colgroup>
                <colgroup style="width: 14%"></colgroup>
                <tbody>
                <tr>
                  <th style="padding-left: 24px;">成交时间</th>
                  <th>市场</th>
                  <th>方向</th>
                  <th>成交均价</th>
                  <th>数量</th>
                  <th>成交金额</th>
                  <th>手续费</th>
>>>>>>> 8d73bbd88f51a7aac30a69d0e99a53621d5331dc

                </tr>
                </tbody>
              </table>
              <div class="tableBox" style="height: 156px;">
                <div class="tbody">
<<<<<<< HEAD
									<table class="table table-strip">
										<colgroup style="width: 20%"></colgroup>
										<colgroup style="width: 10%"></colgroup>
										<colgroup style="width: 10%"></colgroup>
										<colgroup style="width: 14%"></colgroup>
										<colgroup style="width: 14%"></colgroup>
										<colgroup style="width: 14%"></colgroup>
										<colgroup style="width: 14%"></colgroup>
										<tbody>
                      <tr v-for="(item,idx) in openOrder" :key="idx">
                        <td><span>{{item.time}}</span></td>
                        <td><span>{{item.goods}}</span></td>
                        <td><span>{{item.direction}}</span></td>
                        <td><span>{{item.price}}</span></td>
                        <td><span>{{item.num}}</span></td>
                        <td><span>{{item.sum}}</span></td>
                        <td><span>{{item.sum}}</span></td>
                      </tr>
										</tbody>
									</table>
								</div>
=======
                  <table class="table table-strip">
                    <colgroup style="width: 14%"></colgroup>
                    <colgroup style="width: 14%"></colgroup>
                    <colgroup style="width: 14%"></colgroup>
                    <colgroup style="width: 14%"></colgroup>
                    <colgroup style="width: 14%"></colgroup>
                    <colgroup style="width: 14%"></colgroup>
                    <colgroup style="width: 14%"></colgroup>
                    <tbody>
                    <tr v-for="(item,idx) in openOrder" :key="idx">
                      <td><span>{{item.time}}</span></td>
                      <td><span>{{item.goods}}</span></td>
                      <td><span>{{item.direction}}</span></td>
                      <td><span>{{item.price}}</span></td>
                      <td><span>{{item.num}}</span></td>
                      <td><span>{{item.sum}}</span></td>
                      <td><span>{{item.sum}}</span></td>
                    </tr>
                    </tbody>
                  </table>
                </div>
>>>>>>> 8d73bbd88f51a7aac30a69d0e99a53621d5331dc
              </div>
            </div>

            <!-- 资产管理 -->
            <div class="slider" v-show="orderSelect == 4">
              <table class="table tableHead">
<<<<<<< HEAD
										<colgroup style="width: 20%"></colgroup>
										<colgroup style="width: 20%"></colgroup>
										<colgroup style="width: 20%"></colgroup>
										<colgroup style="width: 20%"></colgroup>
										<colgroup style="width: 20%"></colgroup>
								<tbody>
                  <tr style="line-height:22px;">
									<th style="padding-left: 24px;">{{$t('tradingCenter.coin')}}</th>
									<th>{{$t('tradingCenter.totalBalance')}}</th>
									<th>{{$t('tradingCenter.availableBalance')}}</th>
									<th>{{$t('tradingCenter.inOrder')}}</th>
									<th>BTC{{$t('tradingCenter.value')}}</th>
								</tr>
								</tbody>
=======
                <colgroup style="width: 20%"></colgroup>
                <colgroup style="width: 20%"></colgroup>
                <colgroup style="width: 20%"></colgroup>
                <colgroup style="width: 20%"></colgroup>
                <colgroup style="width: 20%"></colgroup>
                <tbody>
                <tr>
                  <th style="padding-left: 24px;">币种</th>
                  <th>总额</th>
                  <th>可用余额</th>
                  <th>下单冻结</th>
                  <th>BTC估值</th>
                </tr>
                </tbody>
>>>>>>> 8d73bbd88f51a7aac30a69d0e99a53621d5331dc
              </table>
              <div class="tableBox">
                <div class="tbody" v-show="funds.length>0">
                  <table class="table table-strip">
                    <colgroup style="width: 20%"></colgroup>
                    <colgroup style="width: 20%"></colgroup>
                    <colgroup style="width: 20%"></colgroup>
                    <colgroup style="width: 20%"></colgroup>
                    <colgroup style="width: 20%"></colgroup>
                    <tbody>
                    <tr v-for="(item,idx) in funds" :key="idx">
                      <td><span>{{item.goods}}</span></td>
                      <td><span>{{item.sum}}</span></td>
                      <td><span>{{item.usable}}</span></td>
                      <td><span>{{item.freeze}}</span></td>
                      <td><span>{{item.value}}</span></td>
                    </tr>
                    </tbody>
                  </table>
                </div>

                <!-- 暂无记录 -->
                <p v-show="funds.length==0" style="width:100%;text-align:center;margin-top:80px;">{{$t('tradingCenter.noData')}}</p>
              </div>


            </div>

          </div>
        </div>
      </div>
      <div class="tradMainR">
        <!-- 行情面板 -->
        <div class="tradMainRT">
          <div class="marketL">
            <div class="marketLTop">
              <ul class="selectList">
                <li>
                  <div class="options" href="javascript:;" :class="marketSelect == 1?'tableActive':''"
                       @click="marketSelect = 1"></div>
                </li>
                <li>
                  <div class="options" :class="marketSelect == 2?'tableActive':''" @click="marketSelect = 2"></div>
                </li>
                <li>
                  <div class="options" :class="marketSelect == 3?'tableActive':''" @click="marketSelect = 3"></div>
                </li>
              </ul>
              <div class="flort">
                <span>{{$t('tradingCenter.groups')}}</span>
                <div class="flortBtn options">8{{$t('tradingCenter.decimals')}}<i class="el-icon-caret-bottom"></i></div>
              </div>
            </div>

            <table class="table">
<<<<<<< HEAD
							<tbody>
                <tr>
                  <th class="f-left fz13">{{$t('tradingCenter.price')}}(BTC)</th>
                  <th class="f-center fz13">{{$t('tradingCenter.amount')}}(IOST)</th>
                  <th class="f-right fz13">{{$t('tradingCenter.sum')}}(BTC)</th>
                </tr>
							</tbody>
=======
              <tbody>
              <tr>
                <th class="f-left fz14">价格(BTC)</th>
                <th class="f-center fz15">数量(IOST)</th>
                <th class="f-right fz14">金额（BTC)</th>
              </tr>
              </tbody>
              <colgroup style="width:30%;"></colgroup>
>>>>>>> 8d73bbd88f51a7aac30a69d0e99a53621d5331dc
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
                    <td class="f-left red hoverB"><span>{{it.price}}</span></td>
                    <td class="f-center"><span class="hoverSpan">{{it.num}}</span></td>
                    <td class="f-right" style="color: #898989;"><span class="hoverSpan">{{it.time}}</span>
                      <div class="zhuzhuang redBg" :style="{width: Math.random()*346+'px'}"></div>
                    </td>
                  </tr>
                  </tbody>
                </table>
              </div>

              <div class="depth">
                <div style="color: #7EC28D;" class="depthL fz14">
                  0.00000435<i class="el-icon-sort-up"></i><span class="price baseColor">&yen;0.18</span>
                </div>
                <div class="depthWrong">
                  <img src="https://resource.binance.com/resources/img/depthFail.gif">
                  <p>{{$t('tradingCenter.marketStatus')}}:{{$t('tradingCenter.delay')}}</p>
                </div>
              </div>
              <div class="tableBox" :class="marketSelect == 3?'toHeight100':marketSelect == 2?'toHeight0':''">
                <table class="table">
                  <colgroup style="width:30%;"></colgroup>
                  <colgroup style="width:30%;"></colgroup>
                  <colgroup style="width:30%;"></colgroup>
                  <tbody>
                  <tr v-for="(it,idx) in newmarket" :key="idx">
                    <td class="f-left green hoverB"><span>{{it.price}}</span></td>
                    <td class="f-center"><span class="hoverSpan">{{it.num}}</span></td>
                    <td class="f-right" style="color: #898989;"><span class="hoverSpan">{{it.time}}</span>
                      <div class="zhuzhuang greenBg" :style="{width: Math.random()*346+'px'}"></div>
                    </td>
                  </tr>
                  </tbody>

                </table>
              </div>
            </div>
          </div>
          <div class="marketR">
            <table class="table">
<<<<<<< HEAD
							<tbody>
                <tr>
                  <th class="f-left fz13">{{$t('tradingCenter.price')}}(BTC)</th>
                  <th class="f-center fz13">XVG</th>
                  <th class="f-right fz13">{{$t('tradingCenter.time')}}</th>
                </tr>
							</tbody>
=======
              <tbody>
              <tr>
                <th class="f-left fz13">价格(BTC)</th>
                <th class="f-center fz13">数量(IOST)</th>
                <th class="f-right fz13">时间</th>
              </tr>
              </tbody>
              <colgroup style="width:30%;"></colgroup>
              <colgroup style="width:30%;"></colgroup>
>>>>>>> 8d73bbd88f51a7aac30a69d0e99a53621d5331dc
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
<<<<<<< HEAD
            <li><div class="options" :class="dealSelect == 1?'active':''" @click="dealSelect=1">{{$t('tradingCenter.limit')}}</div></li>
            <li><div class="options" :class="dealSelect == 2?'active':''" @click="dealSelect=2">{{$t('tradingCenter.market')}}</div></li>
            <li><div class="options" :class="dealSelect == 3?'active':''" @click="dealSelect=3">{{$t('tradingCenter.stopLimit')}}</div></li>
=======
            <li>
              <div class="options" :class="dealSelect == 1?'active':''" @click="dealSelect=1">限价交易</div>
            </li>
            <li>
              <div class="options" :class="dealSelect == 2?'active':''" @click="dealSelect=2">市价交易</div>
            </li>
            <li>
              <div class="options" :class="dealSelect == 3?'active':''" @click="dealSelect=3">止盈止损</div>
            </li>
>>>>>>> 8d73bbd88f51a7aac30a69d0e99a53621d5331dc
          </ul>
          <div class="dealbox">
            <div class="dealItem">
              <div class="dealT">
                <span class="f-fl">{{$t('tradingCenter.buy')}} XRP</span>
                <span class="f-fr"><i class="el-icon-edit"></i>__BTC</span>
              </div>
              <div class="inputItem">
                <span class="fcB">{{$t('tradingCenter.price')}}：</span>
                <label>BTC</label>
                <input type="text">
                <span class="legalMoney">￥0.41</span>
                <div class="jiantou baseColor">
                  <i class="el-icon-caret-top"></i>
                  <i class="el-icon-caret-bottom"></i>
                </div>
              </div>
              <div class="inputItem">
                <span class="fcB">{{$t('tradingCenter.amount')}}：</span>
                <label>XRP</label>
                <input type="text">
                <span class="most">{{$t('tradingCenter.maxBuy')}}<span>0</span></span>
                <!-- <div class="jiantou baseColor">
                  <i class="el-icon-caret-top"></i>
                  <i class="el-icon-caret-bottom"></i>
                </div> -->
              </div>
              <div class="numBox">
                <div class="numList">
                  <div class="options">25%</div>
                  <div class="options">50%</div>
                  <div class="options">75%</div>
                  <div class="options">100%</div>
                </div>
              </div>
              <div class="sumBox">
                <span class="fcB">{{$t('tradingCenter.total')}} ： </span>
                <span class="sum">0.00000000000<span>BTC</span></span>
              </div>
              <el-button class="buy" type="success">{{$t('tradingCenter.buy')}}</el-button>
            </div>

            <div class="dealItem">
              <div class="dealT">
                <span class="f-fl">{{$t('tradingCenter.sell')}} XRP</span>
                <span class="f-fr"><i class="el-icon-edit"></i>__BTC</span>
              </div>
              <div class="inputItem">
                <span class="fcB">{{$t('tradingCenter.price')}}：</span>
                <label>BTC</label>
                <input type="text">
                <span class="legalMoney">￥0.41</span>
                <div class="jiantou baseColor">
                  <i class="el-icon-caret-top"></i>
                  <i class="el-icon-caret-bottom"></i>
                </div>
              </div>
              <div class="inputItem">
                <span class="fcB">{{$t('tradingCenter.amount')}}：</span>
                <label>XRP</label>
                <input type="text">
                <span class="most">{{$t('tradingCenter.maxBuy')}}<span>0</span></span>
                <!-- <div class="jiantou baseColor">
                  <i class="el-icon-caret-top"></i>
                  <i class="el-icon-caret-bottom"></i>
                </div> -->
              </div>
              <div class="numBox">
                <div class="numList">
                  <div class="options">25%</div>
                  <div class="options">50%</div>
                  <div class="options">75%</div>
                  <div class="options">100%</div>
                </div>
              </div>
              <div class="sumBox">
                <span class="fcB">{{$t('tradingCenter.total')}} ： </span>
                <span class="sum">0.00000000000<span>BTC</span></span>
              </div>
              <el-button class="sell" type="success">{{$t('tradingCenter.sell')}}</el-button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

</template>

<script>
  import calc from 'calculatorjs'
  import io from 'socket.io-client'

  export default {
    data() {
      return {
        newmarket: [],
        marketSelect: 1,    //行情选项
        dealSelect: 1,       //交易选项
        orderSelect: 1,     //订单选项
        hideOrder: false,
        openOrder: [],      //当前委托
        funds: [],          //资产管理
        startTime: '',
        endTime: '',

      };
    },
    mounted() {
      this.onReady()
      this.getOpenOrde();
      this.getFunds();
      var num = calc.add(0.00000001, 0.00000002)
      console.log(num.toFixed(8))
    },
    methods: {
      onReady() {
        let that = this
        let c = 0;
        console.log('建立长连接！')
        const socket = io.connect('http://192.168.133.187:9006/')
        socket.emit('join', {userId: 'linxi'})
        socket.on('tradingData', function (data) {
          let res = JSON.parse(JSON.parse(data).tradingList).data
          c++
          console.log(c)
          console.log(res)
          that.newmarket = res
        })
      },
      getOpenOrde() {
        var list = [];
        var item = {
          time: '01-09 15:03:07',
          goods: 'LRC/BTC',
          type: '限价',
          direction: '买入',
          price: '0.00000000',
          num: '0.00000000',
          probability: '100%',
          sum: '0.00000000',
          condition: '条件'
        };
        for (var i = 0; i < 12; i++) {
          list.push(item);
        }

        this.openOrder = list;
      },
      getFunds() {
        var obj = {
          goods: 'LRC',
          sum: '0.00000000',
          usable: '0.00000000',
          freeze: '0.00000000',
          value: '0.00000000'
        }
        var list = [];
        for (var i = 0; i < 12; i++) {
          list.push(obj);
        }

        this.funds = list;
      }
    }
  }
</script>

<style lang="scss" scoped>
<<<<<<< HEAD
$baseColor : #FC9217;
//基础样式
.tradingCenterBox{
  .hoverB{
    &:hover{
      font-weight: 600;
    }
  }
  .fz12{
    font-size: 12px;
  }
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
=======
  $baseColor: #F5A623;
  //基础样式
  .tradingCenterBox {
    .hoverB {
      &:hover {
        font-weight: 600;
      }
    }
    .fz13 {
      font-size: 13px;
>>>>>>> 8d73bbd88f51a7aac30a69d0e99a53621d5331dc
    }
    .fz14 {
      font-size: 14px;
    }
    .fz16 {
      font-size: 16px;
    }
    .fz18 {
      font-size: 18px;
    }
    .baseColor {
      color: $baseColor;
    }
    .white {
      color: #ffffff;
    }
    .fcB {
      color: #7D7D7D;
    }
    .red {
      color: #DD6B73;
      &:hover {
        color: #E14655;
      }
    }
    .redBg {
      background: rgba(242, 119, 176, 0.33);
    }
    .green {
      color: #7EC28D;
      &:hover {
        color: #69e083;
      }
    }
    .greenBg {
      background: rgba(142, 201, 25, 0.21);;
    }
    a {
      color: #ffffff;
    }
    .f-left {
      text-align: left !important;
    }
    .f-right {
      text-align: right !important;
    }
    .f-center {
      text-align: center !important;
    }
    .f-fl {
      float: left;
    }
    .f-fr {
      float: right;
    }
  }

  .tradingCenterBox {
    .options {
      cursor: pointer;
    }
    overflow-x: hidden;
    width: 100%;
    height: 100%;
    color: #CDCDCD;
    background: #212121;
    font-size: 12px;
    box-sizing: border-box;
    padding-top: 40px;
    position: relative;
    .tradHeader {
      position: absolute;
      min-width: 1350px;
      top: 0;
      left: 0;
      width: 100%;
      height: 40px;
      // background: #212121;
      display: flex;
      align-items: center;
      .logoBox {
        display: block;
        // width: 70px;
        // height: 26px;
        margin-left: 10px;
        margin-right: 30px;
        img {
          max-width: 100%;
          max-height: 26px;
        }
      }
      .block {
        flex: 1;
      }
      .marketList {
        display: flex;
        li {
          margin-right: 20px;
          .red {
            margin: 0 4px;
          }
        }
      }
      .goodsBox {
        height: 100%;
        .showGoods {
          padding: 0 24px;
          width: 100%;
          height: 100%;
          line-height: 40px;
          display: block;
          border-left: 2px solid #333434;
          i {
            margin-left: 10px;
          }
        }
      }
      .userBox {
        height: 100%;
        a {
          padding: 0 10px;
          line-height: 40px;
          &:nth-child(1) {
            border-right: 1px solid #ffffff;
          }
        }
      }
      .langsBox {
        height: 100%;
        .showLangs {
          padding: 0 14px;
          height: 100%;
          line-height: 40px;
          display: block;
          i {
            margin-left: 10px;
          }
        }
      }
    }

    .tradMain {
      width: 100%;
      height: 100%;
      display: flex;

      //选项卡样式
      .orderSelect, .dealSelect {
        display: flex;
        border-bottom: 1px solid #101010;
        li {
          .options {
            line-height: 40px;
            margin: 0 24px;
            box-sizing: border-box;
            height: 100%;
            cursor: pointer;
          }
          .options.active {
            color: $baseColor;
            border-bottom: 1px solid $baseColor;
          }
        }
        .block {
          flex: 1;
        }
        .hideOrder {
          margin-right: 66px;
          line-height: 40px;
        }
      }
      //滚动条
      .newmarket, .tableBox {
        &::-webkit-scrollbar {
          width: 6px;
          height: 10px;
        }
        &::-webkit-scrollbar-button {
          display: none;
        }
        &::-webkit-scrollbar-track {
          background-color: #3D454D;
        }
        &::-webkit-scrollbar-thumb {
          background: #5F6266;
        }
      }

      .tradMainLT, .tradMainLB, .marketL, .marketR, .tradMainRB {
        background: #000000;
      }
      .tradMainL {
        flex: 1;
        display: flex;
        flex-direction: column;
        .tradMainLT {
          flex: 1;
          min-width: 620px;
          min-height: 270px;
        }
        .tradMainLB {
          height: 254px;
          margin-top: 10px;
          display: flex;
          flex-direction: column;
          .orderTableBox {
            flex: 1;
            display: flex;
            flex-direction: column;
            .slider {
              height: 100%;
              width: 100%;
              .scopeBox {
                display: flex;
                height: 30px;
                .scopeList {
                  height: 100%;
                  padding-left: 24px;
                  display: flex;
                  align-items: center;
                  .options {
                    border: 1px solid #969696;
                    margin-right: 16px;
                    padding: 0 4px;
                    &:hover {
                      border-color: #7EC28D;
                    }
                  }
                }
                .timeBox {
                  margin-left: 54px;
                  display: flex;
                  align-items: center;
                  .lable {
                    margin-right: 8px;
                  }
                  .line {
                    height: 1px;
                    width: 8px;
                    margin: 0 2px;
                    border-top: 1px solid #969696;
                  }
                }
                .searchTime {
                  display: block;
                  width: 38px;
                  height: 20px;
                  line-height: 20px;
                  text-align: center;
                  background: #8DCC9B;
                  color: #ffffff;
                  margin-left: 12px;
                  cursor: pointer;
                }
              }
<<<<<<< HEAD
              .searchTime{
                display: block;
                // width: 38px;
                padding: 0 4px;
                height: 20px;
                line-height: 20px;
                text-align: center;
                background: #8DCC9B;
                color: #ffffff;
                margin-left: 12px;
                cursor:pointer;
              }
            }
            .tableBox{
              height:170px;
              overflow-y: auto;
            }
=======
              .tableBox {
                height: 180px;
                overflow-y: auto;
              }
            }
>>>>>>> 8d73bbd88f51a7aac30a69d0e99a53621d5331dc
          }
          .table {
            width: 100%;
            border-collapse: collapse;
            border-spacing: 0;
            cursor: pointer;
            th {
              padding: 5px 0;
              text-align: left;
            }
            // th:nth-child(3){
            //   padding-right: 12px;
            // }
            tr {
              &:hover {
                background: #424C55;
              }
            }
            td {
              text-align: left;
              box-sizing: border-box;
              padding: 2px 0px;
              height: 26px;
              position: relative;
            }
            tr td:nth-child(1) {
              padding-left: 24px;
            }
            tr td:nth-last-child(1) {
              .options {
                color: #7D7D7D;
                &:hover {
                  color: #ffffff;
                }
              }
            }
          }
          .tableHead {
            th {
              font-weight: 500;
            }
            tr {
              &:hover {
                background: #050505;
              }
            }
            th.cancels .btn {
              border: 1px solid #465461;
              background-color: #3b4752;
              padding: 0 5px;
              height: 20px;
              line-height: 20px;
              display: inline-block;
              border-radius: 2px;
            }
            th.cancels .iconfont-downsjsmall {
              position: relative;
              display: inline-block;
              margin: 0;
              &:hover .cancelType {
                z-index: 5;
                opacity: 1;
              }
              .cancelType {
                position: absolute;
                top: 20px;
                right: -1px;
                min-width: 120px;
                z-index: -1;
                opacity: 0;
                padding-top: 2px;
                transition: all 0.5s ease-in-out;
                ul {
                  box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
                }
                li {
                  padding: 0 10px;
                  font-size: 12px;
                  color: #999;
                  text-align: center;
                  line-height: 22px;
                  border: 1px solid #465461;
                  border-top: 0;
                  background-color: #3b4752;
                  &:first-of-type {
                    border-top: 1px solid #465461;
                  }
                  &:hover {
                    background: #2b2c27;
                  }
                }
              }
            }
          }
        }
      }
<<<<<<< HEAD
    }
    .tradMainR{
      width: 530px;
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
            font-weight: 500;
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
            span{
              z-index:2;
              position: relative;
=======
      .tradMainR {
        width: 654px;
        height: 100%;
        margin-left: 8px;
        display: flex;
        flex-direction: column;
        .tradMainRT {
          flex: 1;
          display: flex;
          .table {
            width: 100%;
            border-collapse: collapse;
            border-spacing: 0;
            cursor: pointer;

            th {
              padding: 2px 12px;
>>>>>>> 8d73bbd88f51a7aac30a69d0e99a53621d5331dc
            }
            // th:nth-child(3){
            //   padding-right: 12px;
            // }
            tr {
              &:hover {
                background: #1B1B1B;
              }
            }
<<<<<<< HEAD
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
          width: 280px;
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
                .options{
                  display: block;
                  height: 14px;
                  width: 26px;
                  border: 1px solid #858282;
                }
                .options.tableActive{
                  border-color: $baseColor;
                }
=======
            td {
              box-sizing: border-box;
              padding: 2px 0px;
              line-height: 12px;
              position: relative;
              span {
                z-index: 2;
                position: relative;
>>>>>>> 8d73bbd88f51a7aac30a69d0e99a53621d5331dc
              }
              .hoverSpan {
                &:hover {
                  font-weight: 600;
                  color: #ffffff;
                }
              }
              .zhuzhuang {
                position: absolute;
                top: 1px;
                bottom: 0;
                right: 0;
              }
            }
            tr td:nth-child(1) {
              padding-left: 12px;
            }
            tr td:nth-child(3) {
              padding-right: 6px;
            }
          }
          .marketL {
            height: 100%;
            width: 346px;
            display: flex;
            flex-direction: column;
            margin-right: 8px;
            .marketLTop {
              height: 30px;
              display: flex;
              justify-content: space-between;
              align-items: center;
              .selectList {
                display: flex;
                li {
                  margin-left: 12px;
                  .options {
                    display: block;
                    height: 14px;
                    width: 26px;
                    border: 1px solid #858282;
                  }
                  .options.tableActive {
                    border-color: $baseColor;
                  }
                }
              }
              .flort {
                .flortBtn {
                  display: inline-block;
                  height: 18px;
                  border: 1px solid #858282;
                  padding: 0 6px;
                  margin: 0 8px;
                  i {
                    margin-left: 4px;
                  }
                }
              }
            }
            .markefive {
              flex: 1;
              display: flex;
              flex-direction: column;
              .tableBox {
                height: 286px;
                overflow-y: hidden;
                transition: all 0.5s ease;
                tr td:nth-child(3) {
                  padding-right: 12px;
                }

              }
              .tableBox.toHeight0 {
                height: 0;
              }
              .tableBox.toHeight100 {
                height: 572px;
              }
              .depth {
                display: flex;
                justify-content: space-between;
                align-items: center;
                height: 20px;
                background: #56585B;
                padding: 0 12px;
                .depthL {
                  i {
                    margin-right: 8px;
                  }
                }
              }
              .depthWrong {
                position: relative;
                width: 20px;
                height: 10px;
                &:hover p {
                  opacity: 1;
                  z-index: 5;
                }
                img {
                  border: 0;
                  max-width: 100%;
                  max-height: 100%;
                }
                p {
                  opacity: 0;
                  font-size: 12px;
                  color: #666;
                  padding: 4px 10px;
                  background: #fff;
                  box-shadow: 0 0 10px rgba(255, 255, 255, 0.3);
                  position: absolute;
                  left: 50%;
                  top: -5px;
                  z-index: -1;
                  white-space: nowrap;
                  transform: translate(-50%, -100%);
                  transition: all 0.3s ease-in-out;
                }
              }
            }
          }
          .marketR {
            height: 100%;
            width: 300px;
            display: flex;
            flex-direction: column;
            .newmarket {
              flex: 1;
              overflow-y: auto;
            }
          }
        }
<<<<<<< HEAD
        .marketR{
          height: 100%;
          width: 248px;
=======
        .tradMainRB {
          height: 254px;
          margin-top: 10px;
>>>>>>> 8d73bbd88f51a7aac30a69d0e99a53621d5331dc
          display: flex;
          flex-direction: column;

          .dealbox {
            flex: 1;
<<<<<<< HEAD
            overflow-y: auto;
          }
        }
      }
      .tradMainRB{
        height: 254px;
        margin-top: 10px;
        display: flex;
        flex-direction: column;
        
        .dealbox{
          flex: 1;
          padding: 0 14px;
          display: flex;
          justify-content: space-between;
          .dealItem{
            width: 240px;
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
                width: 180px;
                height: 32px;
                float: right;
                background: #424C55;
                border: 0;
                color: #CDCDCD;
                &:focus + .legalMoney,&:focus + .most{
                  display: block;
                }
                &:hover{
                  border: 1px solid $baseColor;
=======
            padding: 0 24px;
            display: flex;
            justify-content: space-between;
            .dealItem {
              width: 288px;
              .dealT {
                height: 28px;
                line-height: 28px;
                i {
                  margin-right: 10px;
>>>>>>> 8d73bbd88f51a7aac30a69d0e99a53621d5331dc
                }
              }
              .inputItem {
                height: 32px;
                width: 100%;
                line-height: 32px;
                margin-bottom: 6px;
                position: relative;
                input {
                  padding: 0 68px 0 18px;
                  box-sizing: border-box;
                  width: 226px;
                  height: 32px;
                  float: right;
                  background: #424C55;
                  border: 0;
                  color: #CDCDCD;
                  &:focus + .legalMoney, &:focus + .most {
                    display: block;
                  }
                  &:hover {
                    border: 1px solid $baseColor;
                  }
                }
                label {
                  height: 32px;
                  position: absolute;
                  top: 0;
                  right: 42px;
                  z-index: 5;
                }
                .jiantou {
                  height: 24px;
                  position: absolute;
                  top: 4px;
                  right: 16px;
                  display: flex;
                  flex-direction: column;
                  justify-content: space-between;
                  i {
                    cursor: pointer;
                  }
                }
                .legalMoney {
                  padding: 4px 6px;
                  font-size: 12px;
                  color: #fff;
                  border-radius: 3px;
                  display: none;
                  position: absolute;
                  top: -48px;
                  left: 95px;
                  z-index: 99999;
                  border: 1px solid rgba(0, 0, 0, 1);
                  background: #424c55;
                  &::before {
                    content: " ";
                    border: 6px solid transparent;
                    border-top-color: #424c55;
                    position: absolute;
                    bottom: -12px;
                    left: 50%;
                    margin-left: -5px;
                    z-index: 999;
                  }
                  &::after {
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
                .most {
                  width: 226px;
                  height: 20px;
                  line-height: 20px;
                  background: $baseColor;
                  color: #333333;
                  position: absolute;
                  top: 32px;
                  right: 0;
                  text-indent: 6px;
                  display: none;
                  span {
                    margin-left: 4px;
                  }
                }
                .sum {
                  margin-left: 6px;
                  span {
                    margin-left: 6px;
                  }
                }
              }
<<<<<<< HEAD
            }
            .numBox{
              width: 100%;
              overflow: hidden;
              .numList{
                float: right;
                width: 180px;
                display: flex;
                justify-content: space-between;
                margin: 6px 0;
                .options{
                  width: 37px;
                  height: 20px;
                  line-height: 20px;
                  display: block;
                  border: 1px dashed #424c55;
                  color: #808385;
                  text-align: center;
                  &:hover{
                    color: $baseColor;
                    border-color: $baseColor;
=======
              .numBox {
                width: 100%;
                overflow: hidden;
                .numList {
                  float: right;
                  width: 226px;
                  display: flex;
                  justify-content: space-between;
                  margin: 10px 0;
                  .options {
                    width: 40px;
                    height: 20px;
                    line-height: 20px;
                    display: block;
                    border: 1px dashed #424c55;
                    color: #808385;
                    text-align: center;
                    &:hover {
                      color: $baseColor;
                      border-color: $baseColor;
                    }
>>>>>>> 8d73bbd88f51a7aac30a69d0e99a53621d5331dc
                  }
                }
              }
              .sumBox {
                height: 20px;
                width: 100%;
                line-height: 20px;
                margin-bottom: 6px;
              }
              .el-button {
                width: 100%;
                height: 32px;
                font-size: 12px;
                border: 0;
              }
              .buy {
                background: #7EC28D;
                &:hover {
                  background: #69e083;
                }
              }
              .sell {
                background: #DD6B73;
                &:hover {
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

<style lang="scss">
  .tradingCenterBox {
    .el-checkbox__inner {
      background: #050505;
    }

    .timeBox .el-date-editor.el-input {
      &:hover .el-input__prefix {
        display: none;
      }
      width: 94px;
      font-size: 12px;
      .el-input__prefix {
        left: 68px;
        i {
          line-height: 20px;
        }
      }
      input {
        padding-left: 8px;
        padding-right: 12px;
        background: #050505;
        height: 20px;
        line-height: 20px;
        border-radius: 0;

      }
      .el-input__suffix {
        right: 0px;
        i {
          line-height: 20px;
        }
      }
    }
  }
</style>

