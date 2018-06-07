<template>
  <div class="tradingCenterBox">
      <!-- 登录框 -->
      <div class="bgBox toLogin" @click="loginFlag = false" v-show="loginFlag">
          <div @click.stop><login-box></login-box></div>
      </div>

      <!-- 谷歌认证 -->
    <el-dialog
        title="谷歌认证"
        :visible.sync="googleDialog"
        custom-class="baseDialog"
        center>
        <el-form :model="googleForm" status-icon :rules="googleForm.rules" ref="googleForm" class="googleForm">
            <!-- <el-form-item label="登录密码" prop="pwd">
                <el-input class="inputBase" type="password" placeholder="请输入登录密码" v-model="googleForm.pwd" auto-complete="off"></el-input>
            </el-form-item> -->
            <el-form-item label="谷歌验证码" prop="verCode">
                <el-input class="inputBase" @input="googleInput(googleForm.verCode)" placeholder="6位动态数字" v-model.number="googleForm.verCode"></el-input>
            </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
            <!-- <el-button class="btnBase" type="primary" size="mini" @click="googleDialog = false">确认</el-button> -->
            <p class="tips">
              如果您遗失了谷歌验证,请 <a href="javascript:;">联系客服</a>
            </p>
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
            <!-- <el-form-item label="您的手机号" prop="phone">
                <el-input placeholder="(仅限中国大陆)" v-model="phoneForm.phone" type="tel" auto-complete="off" class="inputBase input-with-select">
                    <el-select v-model="phoneForm.select" slot="prepend" placeholder="请选择">
                    <el-option label="+86" value="+86"></el-option>
                    <el-option label="+88" value="+88"></el-option>
                    <el-option label="+89" value="+89"></el-option>
                    </el-select>
                </el-input>
            </el-form-item> -->
            <el-form-item label="验证码" class="verCode" prop="verCode">
                <el-input class="inputBase" @input="phoneInput(phoneForm.verCode)" placeholder="请输入短信验证码" v-model="phoneForm.verCode" auto-complete="off"></el-input>
                <a class="verBtn" v-show="VerCodeFlag" href="javascript:;" @click="getVerificationCode()">{{$t('Dialog.sendSMS')}}</a>
                <span class="verBtn" v-show="!VerCodeFlag">{{verCodeTime}} S</span>
            </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
            <!-- <el-button type="primary" size="mini" @click="phoneDialog = false">确认</el-button> -->
            <p class="tips">
              如果您遗失了手机或无法收到验证码,请 <a href="javascript:;">联系客服</a>
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
                <el-input class="inputBase" @input="googleLogin(googleForm.verCode)" placeholder="请输入谷歌验证码" v-model="googleForm.verCode" auto-complete="off"></el-input>
                <!-- <a class="verBtn" href="javascript:;">获取</a> -->
            </el-form-item>
        </el-form>
        <el-form v-show="doubleSelect == 2" :model="phoneForm" status-icon :rules="phoneForm.rules" ref="phoneForm">
            <el-form-item label="验证码" class="verCode" prop="verCode">
                <el-input class="inputBase" @input="phoneInput(phoneForm.verCode)"  placeholder="请输入短信验证码" v-model="phoneForm.verCode" auto-complete="off"></el-input>
                <a class="verBtn" v-show="VerCodeFlag" href="javascript:;" @click="getVerificationCode()">{{$t('Dialog.sendSMS')}}</a>
                <span class="verBtn" v-show="!VerCodeFlag">{{verCodeTime}} S</span>
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
    
    <div class="tradHeader">
      <router-link to="/Home" class="logoBox">
        <img src="../../assets/img/logo.png" alt="logo">
      </router-link>
      <p class="time">{{nowTime}}</p>
      <div class="block"></div>
      <ul class="fz12 marketList">
        <li>{{$t('home.lastPrice')}}<span style="margin:0 2px;" class="fb16 red">{{[nowPairs.close,2] | toFixed}}</span></li>
        <li>{{$t('tradingCenter.change')}}<span class="green"> +0.22%</span></li>
        <li>{{$t('home.high')}} <span style="color:#fff;">{{[nowPairs.high,2] | toFixed}}</span></li>
        <li>{{$t('home.low')}} <span style="color:#fff;">{{[nowPairs.low,2] | toFixed}}</span></li>
        <li>24H{{$t('home.volume')}} <span style="color:#fff;">{{[nowPairs.number,2] | toFixed}} {{market}}</span></li>
      </ul>
      <div class="goodsBox fz14 white">
        <div class="showGoods">
            <span class="options" @click="coidBoxFlag = !coidBoxFlag;">{{symbol}}<i class="el-icon-caret-bottom baseColor"></i></span>
            <div class="coidBox" v-show="coidBoxFlag">
                
                <el-tabs class="" v-model="activeName" @tab-click="handleClick">
                    
                    <el-tab-pane name="star">
                    <span slot="label"><i class="el-icon-star-on"></i> {{$t('home.favorites')}}</span>
                    <el-row class="tabContent">
                        <el-table
                        :data="collectitems"
                        stripe
                        ref="starTable"
                        @row-click="linkToGoods"
                        style="width: 100%">
                        <span slot="empty">{{$t('home.noData')}}</span>
                        <el-table-column
                        align="center"
                        width="50">
                        <template slot-scope="scope">
                            <i @click.stop="changeStar(scope.row.symbol,scope.row.star)" class="el-icon-star-on" :class="scope.row.star == false?'star-off':'star-on'"></i>
                        </template>
                        </el-table-column>
                        <el-table-column
                        prop="symbol"
                        sortable
                        :label="$t('home.pair')"
                        width="100">
                        </el-table-column>
                        <el-table-column
                        :label="$t('home.lastPrice')"
                        width="140">
                        <template slot-scope="scope">
                            <span class="newPriceL">{{scope.row.close}}</span><span class="newPriceR">&nbsp;/&nbsp;&yen;&nbsp;0.67</span>
                        </template>
                        </el-table-column>
                        <el-table-column
                        align="right"
                        sortable
                        width="80"
                        :label="'24h'+$t('home.change')">
                        <template slot-scope="scope">
                            <span :class="scope.row.change>=0?'green':'red'">{{toPercent(scope.row.change,2)}}</span>
                        </template>
                        </el-table-column>
                        <el-table-column
                        prop="number"
                        align="right"
                        sortable
                        width="126"
                        class-name="lastList"
                        :label="'24h'+$t('home.volume')">
                        </el-table-column>
                    </el-table>
                    </el-row>
                    </el-tab-pane>

                    <el-tab-pane name="CCC">
                    <span slot="label">CCC {{$t('home.markets')}}</span>
                    <el-row class="tabContent">
                        <el-table
                        :data="CCCitems"
                        stripe
                        ref="CCCTable"
                        @row-click="linkToGoods"
                        style="width: 100%">
                        <span slot="empty">{{$t('home.noData')}}</span>
                        <el-table-column
                        align="center"
                        width="50">
                        <template slot-scope="scope">
                            <i @click.stop="changeStar(scope.row.symbol,scope.row.star)" class="el-icon-star-on" :class="scope.row.star == false?'star-off':'star-on'"></i>
                        </template>
                        </el-table-column>
                        <el-table-column
                        prop="symbol"
                        sortable
                        :label="$t('home.pair')"
                        width="100">
                        </el-table-column>
                        <el-table-column
                        :label="$t('home.lastPrice')"
                        width="140">
                        <template slot-scope="scope">
                            <span class="newPriceL">{{scope.row.close}}</span><span class="newPriceR">&nbsp;/&nbsp;&yen;&nbsp;0.67</span>
                        </template>
                        </el-table-column>
                        <el-table-column
                        align="right"
                        sortable
                        width="80"
                        :label="'24h'+$t('home.change')">
                        <template slot-scope="scope">
                            <span :class="scope.row.change>=0?'green':'red'">{{toPercent(scope.row.change,2)}}</span>
                        </template>
                        </el-table-column>
                        <el-table-column
                        prop="number"
                        align="right"
                        sortable
                        width="126"
                        class-name="lastList"
                        :label="'24h'+$t('home.volume')">
                        </el-table-column>
                    </el-table>
                    </el-row>
                    </el-tab-pane>

                    <el-tab-pane name="ETH">
                    <span slot="label">ETH {{$t('home.markets')}}</span>
                    <el-row class="tabContent">
                        <el-table
                        :data="ETHitems"
                        stripe
                        ref="ETHTable"
                        @row-click="linkToGoods"
                        style="width: 1198px">
                        <span slot="empty">{{$t('home.noData')}}</span>
                        <el-table-column
                        align="center"
                        width="50">
                        <template slot-scope="scope">
                            <i @click.stop="changeStar(scope.row.symbol,scope.row.star)" class="el-icon-star-on" :class="scope.row.star == false?'star-off':'star-on'"></i>
                        </template>
                        </el-table-column>
                        <el-table-column
                        prop="symbol"
                        sortable
                        :label="$t('home.pair')"
                        width="100">
                        </el-table-column>
                        <el-table-column
                        :label="$t('home.lastPrice')"
                        width="140">
                        <template slot-scope="scope">
                            <span class="newPriceL">{{scope.row.close}}</span><span class="newPriceR">&nbsp;/&nbsp;&yen;&nbsp;0.67</span>
                        </template>
                        </el-table-column>
                        <el-table-column
                        align="right"
                        sortable
                        width="80"
                        :label="'24h'+$t('home.change')">
                        <template slot-scope="scope">
                            <span :class="scope.row.change>=0?'green':'red'">{{toPercent(scope.row.change,2)}}</span>
                        </template>
                        </el-table-column>
                        <el-table-column
                        prop="number"
                        align="right"
                        sortable
                        width="126"
                        class-name="lastList"
                        :label="'24h'+$t('home.volume')">
                        </el-table-column>
                    </el-table>
                    </el-row>
                    </el-tab-pane>

                    <el-tab-pane name="search" :disabled="true">
                    <span slot="label">
                        <el-input
                        class="search"
                        placeholder=""
                        prefix-icon="el-icon-search"
                        v-model="search"
                        >
                        </el-input>
                    </span>
                    </el-tab-pane>
                </el-tabs>
            </div>
        </div>
      </div>
      <div class="userBox fz14 white" v-if="!email">
        <router-link to="/login">{{$t('route.login')}}</router-link>
        <router-link to="/register">{{$t('route.register')}}</router-link>
      </div>
      <div class="userBox fz14 white" v-if="email">
        <router-link to="/userCenter/account" class="options">{{$t('route.account')}}</router-link>
        <a href="javascript:;" @click="logout()">{{$t('route.logout')}}</a>
      </div>
      <div class="langsBox fz14 white" @click="langFlag = !langFlag">
        <div class="showLangs options">{{$t('route.lang')}}<i class="el-icon-arrow-down"></i></div>
        <div v-show="langFlag" class="langList">
          <div class="langItem" v-show="language!='zh'" @click="handleSetLanguage('zh')">简体中文</div>
          <div class="langItem" v-show="language!='tw'" @click="handleSetLanguage('tw')">繁体中文</div>
          <div class="langItem" v-show="language!='en'" @click="handleSetLanguage('en')">English</div>
        </div>
      </div>
    </div>
    <div class="tradMain">
      <div class="tradMainL">
        <!-- K线面板 -->
        <div class="tradMainLT" ref="kline_container">
          <div id="kline_container" v-show="klineFlag"></div>
          <div id="myChart" :style="{width:echartsWidth,height:echartsHeight}" v-show="!klineFlag"></div>
          <div class="typeList">
              <span class="options" @click="klineFlag = true">K线图</span>
              <span class="options" @click="klineFlag = false;">深度图</span>
          </div>
        </div>
        <!-- 订单面板 -->
        <div class="tradMainLB">
          <ul class="orderSelect fz14">
            <li><div class="options" :class="orderSelect == 1?'active':''" @click="orderSelect=1;hideOrder = false">{{$t('route.openOrders')}}</div></li>
            <li><div class="options" :class="orderSelect == 2?'active':''" @click="orderSelect=2;hideOrder = false">{{$t('route.orderHistory')}}</div></li>
            <li><div class="options" :class="orderSelect == 3?'active':''" @click="orderSelect=3;hideOrder = false">{{$t('tradingCenter.tradeHistory')}}</div></li>
            <li><div class="options" :class="orderSelect == 4?'active':''" @click="orderSelect=4;hideOrder = false">{{$t('route.funds')}}</div></li>
            <div class="block"></div>
            <div class="hideOrder" v-show="orderSelect != 4"><el-checkbox v-model="hideOrder">{{$t('tradingCenter.hide')}}</el-checkbox></div>
          </ul>
          <div class="orderTableBox">
            <!-- 当前委托 -->
            <div class="slider" v-show="orderSelect == 1">
              <table class="table tableHead">
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
										<span class="btn" @click="delAllClick()">{{$t('tradingCenter.cancelAll')}}</span>
                    <!-- 全撤旁边的更多 -->
										<!-- <div class="btn iconfont-downsjsmall">
                      <i class="el-icon-more"></i>
                      <div class="cancelType">
                        <ul>
                          <li>{{$t('tradingCenter.all')}}</li>
                          <li>{{$t('tradingCenter.limitOrder')}}</li>
                          <li>{{$t('tradingCenter.stopLimitOrder')}}</li>
                        </ul>
                      </div>
                    </div> -->
                  </th>

                </tr>
                </tbody>
              </table>
              <div class="tableBox" style="height:180px">
                <div class="tbody">
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
                        <td><span>{{item.created_at}}</span></td>
                        <td><span>{{item.symbol}}</span></td>
                        <td><span>限价</span></td>
                        <td><span>{{item.side == "BUY"?"买入":"卖出"}}</span></td>
                        <td><span>{{item.price}}</span></td>
                        <td><span>{{item.number}}</span></td>
                        <td><span>{{toPercent(item.deal_number/item.number,2)}}</span></td>
                        <td><span>{{item.total}}</span></td>
                        <td><span>条件</span></td>
                        <td style="text-align: center;"><div class="options" @click="delOrder(item.id)">{{$t('tradingCenter.cancel')}}</div></td>
                      </tr>
										</tbody>
									</table>
								</div>
                </div>
              </div>

            <!-- 历史委托 -->
            <div class="slider" v-show="orderSelect == 2">
              <div class="scopeBox">
                <ul class="scopeList">
                  <li><div class="options" @click="getTimeClick(1,'historyOrder')">{{$t('tradingCenter.nowDay')}}</div></li>
                  <li><div class="options" @click="getTimeClick(7,'historyOrder')">{{$t('tradingCenter.oneWeek')}}</div></li>
                  <li><div class="options" @click="getTimeClick(30,'historyOrder')">{{$t('tradingCenter.oneMonth')}}</div></li>
                  <li><div class="options" @click="getTimeClick(90,'historyOrder')">{{$t('tradingCenter.threeMonth')}}</div></li>
                </ul>
                <div class="timeBox">
                  <span class="lable">{{$t('tradingCenter.form')}}</span>
                  <el-date-picker
                    v-model="startTime1"
                    type="datetime"
                    size="mini"
                    value-format="yyyy-MM-dd HH:mm:ss"
                    prefix-icon="el-icon-caret-bottom"
                    :placeholder="$t('tradingCenter.dateOption')">
                  </el-date-picker>
                  <div class="line"></div>
                  <el-date-picker
                    v-model="endTime1"
                    type="datetime"
                    size="mini"
                    value-format="yyyy-MM-dd HH:mm:ss"
                    prefix-icon="el-icon-caret-bottom"
                    :placeholder="$t('tradingCenter.dateOption')">
                  </el-date-picker>
                  <div class="searchTime" @click="searchHistoryOrder()">{{$t('button.search')}}</div>
                </div>
              </div>
              <table class="table tableHead">
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

                </tr>
                </tbody>
              </table>
              <div class="tableBox" style="height: 156px;">
                <div class="tbody">
									<table class="table table-strip">
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
                    <colgroup style="width: 9%"></colgroup>
                    <colgroup style="width: 9%"></colgroup>
                    <tbody>
                    <tr v-for="(item,idx) in historyOrder" :key="idx">
                      <td><span>{{item.created_at}}</span></td>
                      <td><span>{{item.symbol}}</span></td>
                      <td><span>限价</span></td>
                      <td><span>{{item.side == "BUY"?"买入":"卖出"}}</span></td>
                      <td><span>{{item.total/item.deal_number}}</span></td>
                      <td><span>{{item.price}}</span></td>
                      <td><span>{{toPercent(item.deal_number/item.number,2)}}</span></td>
                      <td><span>{{item.number}}</span></td>
                      <td><span>{{item.total}}</span></td>
                      <td><span>条件</span></td>
                      <td><span>{{item.status == 0?"未成交":item.status == 1?"已成交":"已撤销"}}</span></td>
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
                   <li><div class="options" @click="getTimeClick(1,'historytrading')">{{$t('tradingCenter.nowDay')}}</div></li>
                  <li><div class="options" @click="getTimeClick(7,'historytrading')">{{$t('tradingCenter.oneWeek')}}</div></li>
                  <li><div class="options" @click="getTimeClick(30,'historytrading')">{{$t('tradingCenter.oneMonth')}}</div></li>
                  <li><div class="options" @click="getTimeClick(90,'historytrading')">{{$t('tradingCenter.threeMonth')}}</div></li>
                </ul>
                <div class="timeBox">
                  <span class="lable">{{$t('tradingCenter.form')}}</span>
                  <el-date-picker
                    v-model="startTime2"
                    type="datetime"
                    size="mini"
                    value-format="yyyy-MM-dd HH:mm:ss"
                    prefix-icon="el-icon-caret-bottom"
                    :placeholder="$t('tradingCenter.dateOption')">
                  </el-date-picker>
                  <div class="line"></div>
                  <el-date-picker
                    v-model="endTime2"
                    type="datetime"
                    size="mini"
                    value-format="yyyy-MM-dd HH:mm:ss"
                    prefix-icon="el-icon-caret-bottom"
                    :placeholder="$t('tradingCenter.dateOption')">
                  </el-date-picker>
                  <div class="searchTime" @click="searchHistorytrading()">{{$t('button.search')}}</div>
                </div>
              </div>
              <table class="table tableHead">
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

                </tr>
                </tbody>
              </table>
              <div class="tableBox" style="height: 156px;">
                <div class="tbody">
									<table class="table table-strip">
										<colgroup style="width: 20%"></colgroup>
										<colgroup style="width: 10%"></colgroup>
										<colgroup style="width: 10%"></colgroup>
										<colgroup style="width: 14%"></colgroup>
										<colgroup style="width: 14%"></colgroup>
										<colgroup style="width: 14%"></colgroup>
										<colgroup style="width: 14%"></colgroup>
										<tbody>
                      <tr v-for="(item,idx) in historytrading" :key="idx">
                        <td><span>{{item.created_at}}</span></td>
                        <td><span>{{item.symbol}}</span></td>
                        <td><span>{{item.side == "BUY"?"买入":"卖出"}}</span></td>
                        <td><span>{{item.total/item.deal_number}}</span></td>
                        <td><span>{{item.number}}</span></td>
                        <td><span>{{item.total}}</span></td>
                        <td><span>手续费</span></td>
                      </tr>
										</tbody>
									</table>
								</div>
                </div>
              </div>

            <!-- 资产管理 -->
            <div class="slider" v-show="orderSelect == 4">
              <table class="table tableHead">
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
									<th>{{market+$t('tradingCenter.value')}}</th>
								</tr>
								</tbody>
              </table>
              <div class="tableBox" style="height: 180px;">
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
                      <td><span>{{item.appraisement}}</span></td>
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
                  <div class="options buysellbtn" href="javascript:;" :class="marketSelect == 1?'tableActive':''"
                       @click="marketSelect = 1;aveNum = 18;"></div>
                </li>
                <li>
                  <div class="options sellbtn" :class="marketSelect == 2?'tableActive':''" @click="marketSelect = 2;aveNum = 36;"></div>
                </li>
                <li>
                  <div class="options buybtn" :class="marketSelect == 3?'tableActive':''" @click="marketSelect = 3;aveNum = 36;"></div>
                </li>
              </ul>
              <div class="flort">
                <span>{{$t('tradingCenter.groups')}}</span>
                <div class="flortBtn options" @click="flortFlag=!flortFlag">
                  {{fixed + $t('tradingCenter.decimals')}}<i class="el-icon-caret-bottom"></i>
                  <div v-show="flortFlag" class="flortList">
                    <div class="flortItem" :class="fixed==5?'active':''" @click="fixed=5">5{{$t('tradingCenter.decimals')}}</div>
                    <div class="flortItem" :class="fixed==6?'active':''" @click="fixed=6">6{{$t('tradingCenter.decimals')}}</div>
                    <div class="flortItem" :class="fixed==7?'active':''" @click="fixed=7">7{{$t('tradingCenter.decimals')}}</div>
                    <div class="flortItem" :class="fixed==8?'active':''" @click="fixed=8">8{{$t('tradingCenter.decimals')}}</div>
                  </div>
                </div>
              </div>
            </div>

            <table class="table">
							<tbody>
                <tr>
                  <th class="f-left fz13">{{$t('tradingCenter.price')}}({{market}})</th>
                  <th class="f-center fz13">{{$t('tradingCenter.amount')}}(IOST)</th>
                  <th class="f-right fz13">{{$t('tradingCenter.sum')}}({{market}})</th>
                </tr>
							</tbody>
              <colgroup style="width:30%;"></colgroup>
              <colgroup style="width:30%;"></colgroup>
              <colgroup style="width:30%;"></colgroup>
            </table>

            <div class="markefive" ref="markefive">
              <div class="tableBox" :class="marketSelect == 2?'toHeight100':marketSelect == 3?'toHeight0':''">
                <table class="table">
                  <colgroup style="width:30%;"></colgroup>
                  <colgroup style="width:30%;"></colgroup>
                  <colgroup style="width:30%;"></colgroup>
                  <tbody>
                  <tr v-for="(it,idx) in bidsList" :key="idx" @click="bidsClick(it[0])">
                    <td class="f-left red hoverB"><span>{{it[0]}}</span></td>
                    <td class="f-center"><span class="hoverSpan">{{it[1] | toNumber}}</span></td>
                    <td class="f-right" style="color: #898989;"><span class="hoverSpan">{{[it[0],it[1],fixed] | mul }}</span>
                      <div class="zhuzhuang redBg" :style="{width: aveLine(bidsList,it[1])+'px'}"></div>
                    </td>
                  </tr>
                  </tbody>
                </table>
              </div>

              <div class="depth">
                <div :class="nowPrice[1] == 'SELL'?'red':'green'" class="depthL fz14">
                  {{nowPrice[2]*1}}  <i :class="nowPrice[1] == 'SELL'?'el-icon-sort-down':'el-icon-sort-up'"></i>
                  <!-- <span class="price baseColor">&yen;0.18</span> -->
                </div>
                <div class="depthWrong" v-show="!depthFlag">
                  <img src="../../assets/img/depthFail.gif">
                  <p>{{$t('tradingCenter.marketStatus')}}:{{$t('tradingCenter.delay')}}</p>
                </div>
                <div class="depthWrong" v-show="depthFlag">
                  <img src="../../assets/img/depthSuc.png">
                  <p>{{$t('tradingCenter.marketStatus')}}:正常</p>
                </div>
              </div>
              <div class="tableBox" :class="marketSelect == 3?'toHeight100':marketSelect == 2?'toHeight0':''">
                <table class="table">
                  <colgroup style="width:30%;"></colgroup>
                  <colgroup style="width:30%;"></colgroup>
                  <colgroup style="width:30%;"></colgroup>
                  <tbody>
                  <tr v-for="(it,idx) in asksList" :key="idx" @click="asksClick(it[0])">
                    <td class="f-left green hoverB"><span>{{it[0]}}</span></td>
                    <td class="f-center"><span class="hoverSpan">{{it[1] | toNumber}}</span></td>
                    <td class="f-right" style="color: #898989;"><span class="hoverSpan">{{[it[0],it[1],fixed] | mul }}</span>
                      <div class="zhuzhuang greenBg" :style="{width: aveLine(asksList,it[1])+'px'}"></div>
                    </td>
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
                <th class="f-left fz13">{{$t('tradingCenter.price')}}({{market}})</th>
                <th class="f-center fz13">XVG</th>
                <th class="f-right fz13">{{$t('tradingCenter.time')}}</th>
              </tr>
              </tbody>
              <colgroup style="width:33%;"></colgroup>
              <colgroup style="width:30%;"></colgroup>
              <colgroup style="width:30%;"></colgroup>
            </table>
            <div class="newmarket">
              <table class="table">
                <colgroup style="width:33%;"></colgroup>
                <colgroup style="width:30%;"></colgroup>
                <colgroup style="width:30%;"></colgroup>
                <tbody>
                <tr v-for="(it,idx) in newmarketItems" :key="idx">
                  <td class="" :class="it[1]=='SELL'?'red':'green'"><span>{{[it[2],0]|toFixed}}</span></td>
                  <td class="f-center"><span>{{it[3]}}</span></td>
                  <td class="f-right" style="color: #898989;"><span>{{formatDateTime(it[4]*1000,"HH:mm:ss")}}</span></td>
                </tr>
                </tbody>

              </table>
            </div>
          </div>
        </div>
        <!-- 交易面板 -->
        <div class="tradMainRB">
          <ul class="dealSelect fz14">
            <li>
              <div class="options" :class="dealSelect == 1?'active':''" @click="dealSelect=1">{{$t('tradingCenter.limit')}}</div>
            </li>
            <!-- <li>
              <div class="options" :class="dealSelect == 2?'active':''" @click="dealSelect=2">{{$t('tradingCenter.market')}}</div>
            </li>
            <li>
              <div class="options" :class="dealSelect == 3?'active':''" @click="dealSelect=3">{{$t('tradingCenter.stopLimit')}}</div>
            </li> -->
          </ul>
          <div class="dealbox">
            <div class="dealItem">
              <div class="dealT">
                <span class="f-fl">{{$t('tradingCenter.buy')}} {{coin}}</span>
                <span class="f-fr"><i class="el-icon-edit"></i>__{{market}}</span>
              </div>
              <div class="inputItem">
                <span class="fcB">{{$t('tradingCenter.price')}}：</span>
                <label>{{market}}</label>
                <input type="text" v-model="buyPrice" @input="inputChange(buyPrice, buyNumber, 'buyCalc')">
                <!-- <span class="legalMoney">￥0.41</span> -->
                <div class="jiantou baseColor">
                  <i class="el-icon-caret-top" @click="addOnce(buyPrice,'buyPrice')"></i>
                  <i class="el-icon-caret-bottom" @click="subOnce(buyPrice,'buyPrice')"></i>
                </div>
              </div>
              <div class="inputItem">
                <span class="fcB">{{$t('tradingCenter.amount')}}：</span>
                <label>{{coin}}</label>
                <input type="text" v-model="buyNumber" @input="inputChange(buyPrice, buyNumber, 'buyCalc')">
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
                <span class="sum">{{buyCalc}}<span>{{market}}</span></span>
              </div>
              <el-button class="buy" @click="createOrder('buy')" type="success">{{$t('tradingCenter.buy')}}</el-button>
            </div>

            <div class="dealItem">
              <div class="dealT">
                <span class="f-fl">{{$t('tradingCenter.sell')}} {{coin}}</span>
                <span class="f-fr"><i class="el-icon-edit"></i>__{{coin}}</span>
              </div>
              <div class="inputItem">
                <span class="fcB">{{$t('tradingCenter.price')}}：</span>
                <label>{{market}}</label>
                <input type="text" v-model="sellPrice" @input="inputChange(sellPrice, sellNumber, 'sellCalc')">
                <!-- <span class="legalMoney">￥0.41</span> -->
                <div class="jiantou baseColor">
                  <i class="el-icon-caret-top" @click="addOnce(sellPrice,'sellPrice')"></i>
                  <i class="el-icon-caret-bottom" @click="subOnce(sellPrice,'sellPrice')"></i>
                </div>
              </div>
              <div class="inputItem">
                <span class="fcB">{{$t('tradingCenter.amount')}}：</span>
                <label>{{coin}}</label>
                <input type="text" v-model="sellNumber" @input="inputChange(sellPrice, sellNumber, 'sellCalc')">
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
                <span class="sum">{{sellCalc}}<span>{{market}}</span></span>
              </div>
              <el-button  @click="createOrder('sell')" class="sell" type="success">{{$t('tradingCenter.sell')}}</el-button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

</template>

<script>
import calc from "calculatorjs";
import { add, sub, mul } from "../../utils/common.js"
// import SockJS from 'sockjs';
// var SockJS = require('sockjs');
// import StompJS from 'stompjs';
import io from "socket.io-client";
import axios from "../../api/axios";
import { mapGetters } from "vuex";
import Kline from "kline";
import  loginBox  from "../components/loginForm";

//引入echarts
// 引入基本模板
let echarts = require("echarts/lib/echarts");
// 引入柱状图组件
require("echarts/lib/chart/line");
// 引入提示框和title组件
require("echarts/lib/component/tooltip");
require("echarts/lib/component/title");

export default {
  data() {
    return {
      activeName: 'CCC',
      localList: [],
      collectList: [],
      CCCList: [],
      BTCList: [],
      ETHList: [],
      OMGList: [],
      DOGEList: [],
      WWWList: [],
      RNGList: [],
      allList: [],
      noticeList: [],
      search: '',
      coidBoxFlag: false,
      newmarket: [],
      asksList: [],
      bidsList: [],
      marketSelect: 1, //行情选项
      aveNum: 18,       //默认18条数据  最多36
      dealSelect: 1, //交易选项
      orderSelect: 1, //订单选项
      hideOrder: false,
      openOrder: [], //当前委托
      historyOrder: [], //历史委托
      historytrading: [], //历史成交
      funds: [], //资产管理
      startTime1: "",
      endTime1: "",
      startTime2: "",
      endTime2: "",
      fixed: "8",
      flortFlag: false,
      depthFlag: true, //行情正常/延迟
      langFlag: false,
      nowPrice: [],       //当前价格
      market: "",
      coin: "",
      symbol: "",
      interval: "5",
      nowPairs: "",
      close: "",
      sum: "",
      buyPrice: "",
      buyNumber: "",
      buyCalc: "0.00000000",
      sellPrice: "",
      sellNumber: "",
      sellCalc: "0.00000000",
      nowTime: "",
      loginFlag: false,
      klineFlag: true,
      echartsWidth: "1382px",
      echartsHeight: "644px",
      myChart: {},
      echartsOption: {
        title: {
            text: "市场深度图",
            textStyle: {
                color: "#cdcdcd"
            }
        },
        tooltip: {
            trigger: "axis"
        },
        grid: {
            left: "3%",
            right: "4%",
            bottom: "3%",
            containLabel: true,
            show: false,
            borderColor: {
                color: "#000"
            }
        },
        toolbox: {
            feature: {
            saveAsImage: {}
            }
        },
        axisLine: {
            lineStyle: {
                color: "#cdcdcd"
            }
        },
        axisLabel: {
            color: "#cdcdcd"
        },
        xAxis: {
            type: "value",
        },
        yAxis: {
            type: "value",
        },
        series: [
            {
            name: "买单",
            type: "line",
            step: "middle",
            areaStyle: {
                color: {
                type: "linear",
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                colorStops: [
                    {
                    offset: 0,
                    color: "red" // 0% 处的颜色
                    },
                    {
                    offset: 1,
                    color: "blue" // 100% 处的颜色
                    }
                ],
                globalCoord: false // 缺省为 false
                }
            },
            data: []
            },
            {
            name: "卖单",
            type: "line",
            step: "middle",
            areaStyle: {
                color: {
                type: "linear",
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                colorStops: [
                    {
                    offset: 0,
                    color: "red" // 0% 处的颜色
                    },
                    {
                    offset: 1,
                    color: "blue" // 100% 处的颜色
                    }
                ],
                globalCoord: false // 缺省为 false
                }
            },
            data: []
            }
        ]
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
      doubleDialog: false,
      doubleSelect: 1,
      VerCodeFlag: true,
      verCodeTime: 60,
    };
  },
  beforeMount() {
    if (this.email) {
      this.getOpenOrder();
      this.getHistoryOrder();
      this.getHistorytrading();
      this.getAccounts();
    }
    this.coin = this.$route.params.coin;
    this.market = this.$route.params.market;
    this.symbol = `${this.coin}/${this.market}`;
    this.onReady();

    console.log(this.symbol);
    //获取时间
    var that = this;
      axios
        .get("/api/time", { status: 0 })
        .then(function(res) {
            var time = res.data.timestamp*1000;
            that.nowTime = that.formatDateTime(time, "yyyy-MM-dd HH:mm:ss");
            setInterval(function() {
                time = time + 1000;
                that.nowTime = that.formatDateTime(time, "yyyy-MM-dd HH:mm:ss");
            }, 1000);
        })
        .catch(function(res) {
          console.log(res);
        });
  },
  mounted() {
    const that = this;
    console.log(this.$refs.kline_container.offsetHeight);
    var height = this.$refs.kline_container.offsetHeight;
    var width = this.$refs.kline_container.offsetWidth;
    var symbol = this.symbol;
    console.log(symbol)
    var klineUrl = process.env.KLINE;
    var kline = new Kline({
      element: "#kline_container",
      symbol: symbol,
      symbolName: "比特币",
      height: height,
      width: width,
      intervalTime: "3000",
      ranges: ["1w", "1d", "1h", "30m", "15m", "5m", "1m", "line"],
      language: "zh-cn",
      showTrade: false,
      disableFirebase: true,
      theme: "dark",
      debug: false,
      type: "poll", // poll/stomp
      url: klineUrl,
    });
    
    kline.draw();
    kline.setSymbol(symbol, symbol);

    this.myChart = echarts.init(document.getElementById("myChart"));
    // this.getEchartsSize();


    window.onresize = () => {
      var height = this.$refs.kline_container.offsetHeight;
      var width = this.$refs.kline_container.offsetWidth;
      kline.resize(width, height);
      //   this.drawLine();
      //myChart.resize(width, height);
    };
  },
  methods: {
    handleClick(tab, event) {
    //console.log(tab.$el.id);
    },
    linkToGoods(row, event, column){
        console.log(row.name);
        this.$router.push('/tradingCenter/'+row.symbol)
    },
    changeStar(name,star){
        console.log(name,star)
        if(star){
            var idx = this.localList.indexOf(name);
            this.localList.splice(idx, 1);
        }else{
            this.localList.push(name);
        }
        console.log(this.localList)
    },
    getVerificationCode() {     //获取验证码
        var _this = this;
        axios.get('/api/sms/to_user').then(function(res){  
            console.log(res);
            _this.VerCodeFlag = false;
            _this.verCodeTime = 60;
            _this.verCodeTimeStart ();
            _this.phoneForm.smsId = res.data.smsId;
        }).catch(function (res){  
            console.log(res);
        });  
    },
    verCodeTimeStart (){              //验证码计时器
        var _this = this;
        var timer = setInterval(()=>{
            if(_this.verCodeTime>1){
                _this.verCodeTime--;
            }else{
                clearInterval(timer);
                this.VerCodeFlag = true;
            }
        },1000)
    },
    phoneInput(verCode) {             //手机验证
        var _this = this;
        var smsCode = verCode.trim();
        if(smsCode.length == 6){
            var phoneDate = this.submitData;
            phoneDate.smsId = this.phoneForm.smsId;
            phoneDate.smsCode = smsCode;
            axios.post('/api/accounts/exports',phoneDate).then(function(res){  
                console.log(res)
                _this.phoneDialog = false;
                _this.submitFin();
            }).catch(function (res){  
                console.log(res);
            }); 
        }
    
    },
    googleInput(verCode) {            //谷歌验证
        var _this = this;
        var googleCode = verCode.trim();
        if(googleCode.length == 6){
            var googleDate = this.submitData;
            googleDate.googleCode = googleCode;
            axios.post('/api/accounts/exports',googleDate).then(function(res){  
                console.log(res)
                _this.googleDialog = false;
                _this.submitFin();
            }).catch(function (res){  
                console.log(res);
            }); 
        }
    },
    onReady() {
      let that = this;
      let c = 0;
      console.log("建立长连接！");
      var url = process.env.NODE_API;
      const socket = io.connect(url);
    //   const socket = io.connect("http://ws.bjex.io:9006/");
    //   const socket = io.connect("http://192.168.133.190:9006/");
      socket.emit("join", { userId: "linxi", symbol: this.symbol });
      socket.on("tradingData", function(data) {
        let res = JSON.parse(JSON.parse(data).tradingList).data;
        c++;
        //console.log(c);
        // console.log(res);
        that.newmarket = res;
        
      });
      socket.on("tradesData", function(data) {
        let res = JSON.parse(JSON.parse(data).tradingList).data;
        c++;
        //console.log(c)
        //console.log('tradesData')
        //console.log(res)
        that.newmarket = res;
        var length = res.length;
        if(length){
            that.nowPrice = res[length-1];
        }
      });
      socket.on("depthData", function(data) {
        let res = JSON.parse(JSON.parse(data).tradingList).data;
        c++;
        //console.log(c)
        // console.log(res)
        res.asks.map(it => {
            it[1] = String(it[1]);
        })
        res.bids.map(it => {
            it[1] = String(it[1]);
        })
        that.asksList = res.asks;
        that.bidsList = res.bids;
        that.drawLine();
      });
      socket.on("pairsData", function(data) {
        let res = JSON.parse(JSON.parse(data).tradingList).data;
        c++;
        // console.log(c);
        // console.log(res);
        var symbol = that.symbol;
        that.BTCList = [];
        that.CCCList = [];
        that.ETHList = [];
        that.OMGList = [];
        that.DOGEList = [];
        that.WWWList = [];
        that.RNGList = [];
        that.allList = res;
    //   that.collectList = [];
        res.forEach(item => {
            if (item.symbol == symbol) {
                that.nowPairs = item;
            }


            item.star = false;
            item.number = item.number.toFixed(8);
            if(item.market_name == "BTC"){
                that.BTCList.push(item);
            }else if(item.market_name == "ETH"){
                that.ETHList.push(item);
            }else if(item.market_name == "CCC"){
                that.CCCList.push(item);
            }else if(item.market_name == "OMG"){
                that.OMGList.push(item);
            }else if(item.market_name == "DOGE"){
                that.DOGEList.push(item);
            }else if(item.market_name == "WWW"){
                that.WWWList.push(item);
            }else if(item.market_name == "RNG"){
                that.RNGList.push(item);
            }
            // if(that.localList.indexOf(item.symbol)>-1){
            //     that.collectList.push(item);
            // }
        })
      });
    },
    drawLine() {
        //渲染echarts
        this.echartsOption.series[0].data = this.asksList;
        this.echartsOption.series[1].data = this.bidsList;
        // 绘制图表
        // console.log(this.myChart)
        this.myChart.setOption(this.echartsOption);
    },
    // getEchartsSize() {
    //     this.echartsHeight = this.$refs.kline_container.offsetHeight;
    //     this.echartsWidth = this.$refs.kline_container.offsetWidth;
    //     this.myChart.resize(this.echartsWidth,this.echartsHeight);
    //     console.log(this.echartsHeight,this.echartsWidth)
    // },
    getTime(time) {
      //获取当前时间
      var date = new Date();
      if (time == 1) {
      } else {
        date = date - 1000 * 60 * 60 * 24 * time;
      }
      date = new Date(date);
      var year = date.getFullYear();
      var mon = date.getMonth() + 1;
      var day = date.getDate();
      var currentdate =
        year +
        "-" +
        (mon < 10 ? "0" + mon : mon) +
        "-" +
        (day < 10 ? "0" + day : day);
      return currentdate;
    },
    getTimeClick(time, type) {
      var searchTime = this.getTime(time);
      var postData = {
        from: searchTime,
        to: this.getTime(1)
      };
      //   console.log(postData)
      if (type == "historyOrder") {
        this.getHistoryOrder(postData);
      } else if (type == "historytrading") {
        this.getHistorytrading(postData);
      }
    },
    getOpenOrder() {
      var _this = this;
      axios
        .get("/api/orders", { status: 0 })
        .then(function(res) {
          _this.openOrder = res.data;
        })
        .catch(function(res) {
          console.log(res);
        });
    },
    getHistoryOrder(postData) {
      var _this = this;
      axios
        .get("/api/orders", postData ? postData : {})
        .then(function(res) {
          _this.historyOrder = res.data;
        })
        .catch(function(res) {
          console.log(res);
        });
    },
    getHistorytrading(postData) {
      var _this = this;
      if (postData) {
        postData.status = 1;
      }
      axios
        .get("/api/orders", postData ? postData : { status: 1 })
        .then(function(res) {
          _this.historytrading = res.data;
        })
        .catch(function(res) {
          console.log(res);
        });
    },
    searchHistoryOrder() {
      var postData = {};
      postData.from = this.startTime1;
      postData.to = this.endTime1;
      this.getHistoryOrder(postData);
    },
    searchHistorytrading() {
      var postData = {};
      postData.from = this.startTime2;
      postData.to = this.endTime2;
      this.getHistorytrading(postData);
    },
    findName(coin_id) {
      var _this = this;
      var name;
      this.coinList.forEach(it => {
        if (it.coin_id == coin_id) {
          name = it.coin_name;
        }
      });
      return name;
    },
    getAccounts() {
      var _this = this;
      axios
        .get("/api/accounts")
        .then(function(res) {
          var dataList = res.data;
          var balances = [];
          var sum = 0;
          dataList.forEach(it => {
            var coinItem = {};
            coinItem.id = it.id;
            coinItem.goods = _this.findName(it.id);
            coinItem.sum = it.available * 1 + it.disabled * 1;
            coinItem.usable = it.available;
            coinItem.freeze = it.disabled;
            coinItem.appraisement = coinItem.sum * it.price;
            coinItem.showPairsFlag = false; //交易对列表
            sum += coinItem.appraisement;
            balances.push(coinItem);
          });
          _this.funds = balances;
          _this.sum = sum;
        })
        .catch(function(res) {
          console.log(res);
        });
    },
    aveLine(arr,num) {             //柱状线
        var width = this.$refs.markefive.offsetWidth;
        //console.log(width)
        let max = arr[0][1];
        arr = arr.slice(0,this.aveNum);
        for (let i = 0; i < arr.length - 1; i++) {
            max = arr[i][1] < arr[i+1][1] ? arr[i+1][1] : arr[i][1]
        }
        var percent = num/max;
        return percent*width;
    },
    createOrder(type) {
      if (this.email) {
        var _this = this;
        if (type == "buy") {
          var postData = {
            symbol: this.symbol,
            side: "BUY",
            price: this.buyPrice,
            number: this.buyNumber
          };
        } else {
          var postData = {
            symbol: this.symbol,
            side: "SELL",
            price: this.sellPrice,
            number: this.sellNumber
          };
        }

        axios
          .post("/api/orders", postData)
          .then(function(res) {
            console.log(res);
            _this.initDealBox();
            if (res.code == 0) {
              _this.$message({
                message: "下单成功",
                type: "success"
              });
                _this.getOpenOrder();
                _this.getHistoryOrder();
                _this.getHistorytrading();
                _this.getAccounts();
            } else {
              _this.$message({
                message: res,
                type: "error"
              });
            }
          })
          .catch(function(res) {
            console.log(res);
          });
      } else {
        this.loginFlag = true;
      }
    },
    toPercent(point, num) {
      var str = Number(point * 100).toFixed(num);
      str += "%";
      return str;
    },
    delOrder(id) {
      var _this = this;
      axios
        .del(`/api/orders/${id}`)
        .then(function(res) {
          if (res.code == 0) {
            _this.$message({
              message: "撤销成功",
              type: "success"
            });
          } else {
            _this.$message({
              message: res,
              type: "error"
            });
          }
        })
        .catch(function(res) {
          console.log(res);
        });
    },
    delAllClick() {
        console.log(this.userInfo.two_factor_auth_type)
        var two_factor = this.userInfo.two_factor_auth_type;
        if(two_factor == "GOOGLE"){
            this.googleDialog   = true;
        }else if(two_factor == "MOBILE"){
            this.phoneDialog   = true;
        }else if(two_factor == "BOTH"){
            this.doubleDialog = true;
        }
    },
    delAllOrder() {
      var _this = this;
      //撤销全部订单
      axios
        .del("/api/orders")
        .then(function(res) {
          if (res.code == 0) {
            _this.$message({
              message: "撤销成功",
              type: "success"
            });
          } else {
            _this.$message({
              message: res,
              type: "error"
            });
          }
        })
        .catch(function(res) {
          console.log(res);
        });
    },
    //退出登录
    logout: function() {
      this.$store.dispatch("tcLogOut");
      this.openOrder = []; //清空订单数据
      this.historyOrder = [];
      this.historytrading = [];
      this.funds = [];
    },
    formatDateTime(time, format) {
      //时间戳转换
      var t = new Date(time);
      var tf = function(i) {
        return (i < 10 ? "0" : "") + i;
      };
      return format.replace(/yyyy|MM|dd|HH|mm|ss/g, function(a) {
        switch (a) {
          case "yyyy":
            return tf(t.getFullYear());
            break;
          case "MM":
            return tf(t.getMonth() + 1);
            break;
          case "dd":
            return tf(t.getDate());
            break;
          case "HH":
            return tf(t.getHours());
            break;
          case "mm":
            return tf(t.getMinutes());
            break;
          case "ss":
            return tf(t.getSeconds());
            break;
        }
      });
    },
    handleSetLanguage(lang) {
      //语言切换
      this.$i18n.locale = lang;
      this.$store.dispatch("setLanguage", lang);
    },
    addOnce(num,name) {
        this[name] = add(num,0.00000001,8);
    },
    subOnce(num,name) {
        if(num>0){
            this[name] = sub(num,0.00000001,8);
        }
    },
    initDealBox() {
        this.buyPrice = "";
        this.buyNumber = "";
        this.sellPrice = "";
        this.sellNumber = "";
    },
    bidsClick(price) {
        this.buyPrice = price;
    },
    asksClick(price) {
        this.sellPrice = price;
    },
    calcPrice(value1, value2, name) {
        var aaa = this[name]
        this[name] = mul(value1,value2,8);
    },
    inputChange(value1, value2, name) {
        if(!isNaN(value1) && !isNaN(value2)){
            if(value1 == '' || value2 == ''){
                this.calcPrice(0, 0, name);
            }else{
                this.calcPrice(value1, value2, name);
            }
        }
    }
  },
  filters: {
    toFixed: ([value, num]) => {
      if (value != 0 && !value) return "";
      value = (value * 1).toFixed(num);
      return value;
    },
    mul: ([value1, value2, fixed]) => {
      return calc.mul(value1, value2).toFixed(fixed);
    },
    toNumber: (value) => {
        var num = new Number(value);
        num = String(num)
        return num;
    }
  },
  components: {
      loginBox
  },
  computed: {
    ...mapGetters(["email", "token", "userInfo", "coinList"]),
    language() {
      return this.$store.getters.language;
    },
    openOrderItems: function() {
      var name = this.symbol;
      if (this.hideOrder) {
        return this.openOrder.filter(function(product) {
          return Object.keys(product).some(function() {
            return product.symbol == name;
          });
        });
      }
      return this.openOrder;
    },
    historyOrderItems: function() {
      var name = this.symbol;
      if (this.hideOrder) {
        return this.historyOrder.filter(function(product) {
          return Object.keys(product).some(function() {
            return product.symbol == name;
          });
        });
      }
      return this.historyOrder;
    },
    historytradingItems: function() {
      var name = this.symbol;
      if (this.hideOrder) {
        return this.historytrading.filter(function(product) {
          return Object.keys(product).some(function() {
            return product.symbol == name;
          });
        });
      }
      return this.historytrading;
    },
    newmarketItems: function() {
        var arr = this.newmarket;
        return arr.reverse();
    },
    CCCitems: function() {
        var _search = this.search.toLocaleLowerCase();
        var starList = this.localList;
        var _this = this;
        this.CCCList.map((it,idx) => {
          it.change = _this.div(_this.sub(it.close,it.open,8),it.open,8);
          if(_this.localList.indexOf(it.symbol) != -1){
            _this.$set(_this.$data.CCCList[idx], 'star', true);
          }else{
            _this.$set(_this.$data.CCCList[idx], 'star', false);
          }
        })
        if (_search) {
          return this.CCCList.filter(function(product) {
            return Object.keys(product).some(function(key) {
              return String(product.symbol).toLowerCase().indexOf(_search) > -1
            })
          })
        }
        return this.CCCList;
    },
    BTCitems: function() {
        var _search = this.search.toLocaleLowerCase();
        var starList = this.localList;
        var _this = this;
        this.BTCList.map((it,idx) => {
          it.change = _this.div(_this.sub(it.close,it.open,8),it.open,8);
          if(_this.localList.indexOf(it.symbol) != -1){
            _this.$set(_this.$data.BTCList[idx], 'star', true);
          }else{
            _this.$set(_this.$data.BTCList[idx], 'star', false);
          }
        })
        if (_search) {
          return this.BTCList.filter(function(product) {
            return Object.keys(product).some(function(key) {
              return String(product.symbol).toLowerCase().indexOf(_search) > -1
            })
          })
        }
        return this.BTCList;
    },
    ETHitems: function() {
        var _search = this.search.toLocaleLowerCase();
        var _this = this;
        this.ETHList.map(it => {
          it.change = _this.div(_this.sub(it.close,it.open,8),it.open,8);
          if(_this.localList.indexOf(it.symbol) != -1){
            it.star = true;
          }else{
            it.star = false
          }
        })
        if (_search) {
          return this.ETHList.filter(function(product) {
            return Object.keys(product).some(function(key) {
              return String(product.symbol).toLowerCase().indexOf(_search) > -1
            })
          })
        }
        return this.ETHList;
    },
    OMGitems: function() {
        var _search = this.search.toLocaleLowerCase();
        var _this = this;
        this.OMGList.map(it => {
          it.change = _this.div(_this.sub(it.close,it.open,8),it.open,8);
          if(_this.localList.indexOf(it.symbol) != -1){
            it.star = true;
          }else{
            it.star = false
          }
        })
        if (_search) {
          return this.OMGList.filter(function(product) {
            return Object.keys(product).some(function(key) {
              return String(product.symbol).toLowerCase().indexOf(_search) > -1
            })
          })
        }
        return this.OMGList;
    },
    DOGEitems: function() {
        var _search = this.search.toLocaleLowerCase();
        var _this = this;
        this.DOGEList.map(it => {
          it.change = _this.div(_this.sub(it.close,it.open,8),it.open,8);
          if(_this.localList.indexOf(it.symbol) != -1){
            it.star = true;
          }else{
            it.star = false
          }
        })
        if (_search) {
          return this.DOGEList.filter(function(product) {
            return Object.keys(product).some(function(key) {
              return String(product.symbol).toLowerCase().indexOf(_search) > -1
            })
          })
        }
        return this.DOGEList;
    },
    WWWitems: function() {
        var _search = this.search.toLocaleLowerCase();
        var _this = this;
        this.WWWList.map(it => {
          it.change = _this.div(_this.sub(it.close,it.open,8),it.open,8);
          if(_this.localList.indexOf(it.symbol) != -1){
            it.star = true;
          }else{
            it.star = false
          }
        })
        if (_search) {
          return this.WWWList.filter(function(product) {
            return Object.keys(product).some(function(key) {
              return String(product.symbol).toLowerCase().indexOf(_search) > -1
            })
          })
        }
        return this.WWWList;
    },
    RNGitems: function() {
        var _search = this.search.toLocaleLowerCase();
        var _this = this;
        this.RNGList.map(it => {
          it.change = _this.div(_this.sub(it.close,it.open,8),it.open,8);
          if(_this.localList.indexOf(it.symbol) != -1){
            it.star = true;
          }else{
            it.star = false
          }
        })
        if (_search) {
          return this.RNGList.filter(function(product) {
            return Object.keys(product).some(function(key) {
              return String(product.symbol).toLowerCase().indexOf(_search) > -1
            })
          })
        }
        return this.RNGList;
    },
    collectitems: function() {
        var _search = this.search.toLocaleLowerCase();
        var _this = this;
        var collectList = [];
        this.allList.map(it => {
          it.change = _this.div(_this.sub(it.close,it.open,8),it.open,8);
          if(_this.localList.indexOf(it.symbol) != -1){
            it.star = true;
            collectList.push(it)
          }
        })
        if (_search) {
          return collectList.filter(function(product) {
            return Object.keys(product).some(function(key) {
              return String(product.symbol).toLowerCase().indexOf(_search) > -1
            })
          })
        }
        return collectList;
    },
  }
};
</script>

<style lang="scss" scoped>
$baseColor: #fc9217;
//基础样式
.tradingCenterBox {
  .hoverB {
    &:hover {
      font-weight: 600;
    }
  }
  .fz12 {
    font-size: 12px;
  }
  .fz13 {
    font-size: 13px;
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
    color: #7d7d7d;
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
    color: #7d7d7d;
  }
  .red {
    color: #dd6b73;
    &:hover {
      color: #e14655;
    }
  }
  .redBg {
    background: rgba(242, 119, 176, 0.33);
  }
  .green {
    color: #7ec28d;
    &:hover {
      color: #69e083;
    }
  }
  .greenBg {
    background: rgba(142, 201, 25, 0.21);
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
  position: relative;
  .toLogin {
    height: 100%;
    width: 100%;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 100;
    background: rgba(0, 0, 0, 0.4);
  }
  .loginBox{
      background: #151A1E;
  }
  .buysellbtn {
    background: url("../../assets/img/buysell_03.jpg") no-repeat center;
  }
  .buybtn {
    background: url("../../assets/img/buy.jpg") no-repeat center;
  }
  .sellbtn {
    background: url("../../assets/img/sell.jpg") no-repeat center;
  }
  .options {
    cursor: pointer;
  }
  overflow-x: hidden;
  width: 100%;
  height: 100%;
  color: #cdcdcd;
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
        color: #808080;
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
        position: relative;
        i {
          margin-left: 10px;
        }
        .coidBox{
            position: absolute;
            top: 40px;
            right: 64px;
            z-index: 20;
            width: 500px;
            // height: 360px;
            max-height: 360px;
            background: #212121;
            
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
      position: relative;
      .showLangs {
        padding: 0 14px;
        height: 100%;
        line-height: 40px;
        display: inline-block;
        i {
          margin-left: 10px;
        }
        &:hover {
          background-color: #383636;
        }
      }
      .langList {
        background-color: #383636;
        width: 110px;
        position: absolute;
        left: 0;
        top: 40px;
        z-index: 20;
        cursor: pointer;
        .langItem {
          line-height: 30px;
          text-align: center;
          border-bottom: 1px solid #1f262c;
        }
        .langItem.active {
          color: $baseColor;
          background-color: #212121;
        }
      }
    }
  }

  .tradMain {
    width: 100%;
    height: 100%;
    display: flex;

    //选项卡样式
    .orderSelect,
    .dealSelect {
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
    .newmarket,
    .tableBox {
      &::-webkit-scrollbar {
        width: 6px;
        height: 10px;
      }
      &::-webkit-scrollbar-button {
        display: none;
      }
      &::-webkit-scrollbar-track {
        background-color: #3d454d;
      }
      &::-webkit-scrollbar-thumb {
        background: #5f6266;
      }
    }

    .tradMainLT,
    .tradMainLB,
    .marketL,
    .marketR,
    .tradMainRB {
      background: #000000;
    }
    .tradMainL {
      flex: 1;
      display: flex;
      flex-direction: column;
      .tradMainLT {
        position: relative;
        flex: 1;
        min-width: 620px;
        min-height: 270px;
        #chart_show_tools,
        #chart_toolbar_theme {
          //隐藏划线工具和主题切换
          display: none;
        }
        .typeList {
          position: absolute;
          right: 36px;
          top: 0;
          z-index: 10;
          line-height: 30px;
        }
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
                    border-color: #7ec28d;
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
                background: #8dcc9b;
                color: #ffffff;
                margin-left: 12px;
                cursor: pointer;
              }
            }
            .searchTime {
              display: block;
              // width: 38px;
              padding: 0 4px;
              height: 20px;
              line-height: 20px;
              text-align: center;
              background: #8dcc9b;
              color: #ffffff;
              margin-left: 12px;
              cursor: pointer;
            }
          }
          .tableBox {
            height: 170px;
            overflow-y: auto;
          }
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
              background: #424c55;
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
              color: #7d7d7d;
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

    .tradMainR {
      width: 530px;
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
            padding: 2px 10px;
            font-weight: 500;
          }
          // th:nth-child(3){
          //   padding-right: 12px;
          // }
          tr {
            &:hover {
              background: #1b1b1b;
            }
          }
          td {
            box-sizing: border-box;
            padding: 2px 0px;
            line-height: 12px;
            position: relative;
            span {
              z-index: 2;
              position: relative;
            }
            // th:nth-child(3){
            //   padding-right: 12px;
            // }
            tr {
              &:hover {
                background: #1b1b1b;
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
                margin-right: 8px;
                position: relative;
                i {
                  margin-left: 4px;
                }
                .flortList {
                  position: absolute;
                  z-index: 10;
                  right: -1px;
                  left: -1px;
                  top: 18px;
                  border: 1px solid #858282;
                  cursor: pointer;
                  .flortItem {
                    padding: 5px 0px;
                    border-bottom: 1px solid #858282;
                    background: #000000;
                    text-align: center;
                    &:hover {
                      background: #383636;
                    }
                    &:nth-last-child(1) {
                      border: 0;
                    }
                  }
                  .flortItem.active {
                    color: $baseColor;
                  }
                }
              }
            }
          }
          .markefive {
            flex: 1;
            display: flex;
            flex-direction: column;
            .tableBox {
              height: 288px;
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
              background: #56585b;
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
      .tradMainRB {
        height: 254px;
        margin-top: 10px;
        display: flex;
        flex-direction: column;

        .dealbox {
          flex: 1;
          padding: 0 14px;
          display: flex;
          justify-content: space-between;
          .dealItem {
            width: 240px;
            .dealT {
              height: 28px;
              line-height: 28px;
              i {
                margin-right: 10px;
              }
            }

            .inputItem {
              height: 32px;
              width: 100%;
              line-height: 32px;
              margin-bottom: 6px;
              position: relative;
              input {
                padding: 0 68px 0 8px;
                box-sizing: border-box;
                width: 180px;
                height: 32px;
                float: right;
                background: #424c55;
                border: 0;
                color: #cdcdcd;
                &:focus + .legalMoney,
                &:focus + .most {
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
                width: 180px;
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

            .numBox {
              width: 100%;
              overflow: hidden;
              .numList {
                float: right;
                width: 180px;
                display: flex;
                justify-content: space-between;
                margin: 6px 0;
                .options {
                  width: 37px;
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
              background: #7ec28d;
              &:hover {
                background: #69e083;
              }
            }
            .sell {
              background: #dd6b73;
              &:hover {
                background: #ff9299;
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
@import "../../styles/login.scss";
$baseColor: #fc9217;
.el-tabs__item{
    color:#fff;
}
.bgBox {
  .baseDialog .el-dialog__footer {
    .tips {
      margin-bottom: 40px;
      a {
        color: #fc9217;
      }
    }
  }
}
.tradingCenterBox {
    .tradHeader .goodsBox .coidBox{
        .el-tabs__nav-wrap::after,.el-table--group::after, .el-table--border::after, .el-table::before{
            background-color: #2F363E;
        }
        #tab-search{
            margin-top:-1px; 
            margin-right:-1px; 
            // border-top:1px solid #ffffff; 
            // border-right:1px solid #ffffff; 
        }
        .search{
            height: 28px;
            width: 200px;
            input{
                border-radius: 0;
                height: 28px;
                background: #212121;
                border-color: #2F363E;
            }
            span{
                height: 28px;
                i{
                    line-height: 28px;
                }
            }
        }
        .tabContent{
            // .el-table__header,.el-table__body,.el-table__empty-block{
            //   width: 1198px !important;
            // }
            .el-table th.is-leaf,.el-table td,.el-table__body-wrapper{
                border-color: #2F363E;
            }
            .el-table,.el-table tr,.el-table th{
                background: #212121;
            }
            .el-table--enable-row-hover .el-table__body tr:hover > td{
                background-color: rgba(245,166,35,0.10);
            }
            .el-table .cell{
                padding:0;
            }
            .el-table td{
                cursor:pointer;
            }
            .el-table th, .el-table td{
                padding: 0;
                font-weight: 500;
                font-size: 12px;
                line-height: 30px;
                height: 30px;
            }
            .el-icon-star-on{
                font-size: 13px;
            }
            .star-on{
                color: #FC9217;
            }
            .star-off{
                color: #cccccc;
            }
            .green{
                color: #3ABC56;
            }
            .red{
                color: #F73946;
            }
            .newPriceR{
                color: #999999
            }
            tbody,thead{
                .lastList{
                    padding-right: 26px;
                }
            }
            
        }
        // .tabClass .el-tabs__header{
        //     position: fixed;
        //     top: 0;
        //     left: 0;
        //     padding: 0 10px;
        //     animation:top 0.5s ease;
        //     z-index: 10;
        //     background: #fff;
        //     width: 100%;
        //     height: 60px;
        //     line-height: 60px;
        //     box-shadow: 0 2px 4px 0 #999999;
        //     .el-tabs__nav-wrap{
        //     width: 1200px;
        //     margin: auto;
        //     }
        // }
        

        .el-tabs__nav{
            border-radius: 0;
        }
        .el-tabs--card > .el-tabs__header{
            border: 0;
        }
        .el-tabs__header{
            margin: 0;
        }
        .el-tabs__content{
            border: 1px solid #2F363E;
        }
    }
    .bgBox .formbase .el-form-item__content .el-input input{
      background: #FAFFBD;
    }
    .bgBox .linkList a{
        color: $baseColor;
    }
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

