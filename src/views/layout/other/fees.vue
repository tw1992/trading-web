<template>
<div class="feesBox">
    <p class="feesTitle">{{$t('fee.title')}}</p>
    <!--<div class="exchangerate">-->
        <!--<p class="tipsTitle"><i class="el-icon-caret-right"></i><span>{{$t('fee.changeFee')}}</span></p>-->
        <!--<ul class="tipsList">-->
            <!--<li>{{$t('fee.changeFeeInstruct')}}</li>-->
        <!--</ul>-->
    <!--</div>-->
    <div class="chargerate">
        <p class="tipsTitle"><i class="el-icon-caret-right"></i><span>{{$t('fee.rechangeFee')}}</span></p>
        <p class="tips">{{$t('fee.rechangeFeeInstruce')}}</p>
    </div>
    <div class="withdrawrate">
        <p class="tipsTitle"><i class="el-icon-caret-right"></i><span>{{$t('fee.withdrawalFee')}}</span></p>
        <p class="tips">{{$t('fee.withdrawalFeeInstruce')}}</p>
        <div class="withBox">
            <table class="withtable">
                <tbody>
                    <tr>
                        <td>{{$t('tradingCenter.coin')}}</td>
                        <td>{{$t('fee.withdrawalMin')}}</td>
                        <td>{{$t('fee.withdrawalMax')}}</td>
                        <td>{{$t('fee.withdrawalHandFee')}}</td>
                    </tr>
                    <tr v-for="item in feeList">
                      <td>{{item.coin_name}}</td>
                      <td>{{item.export_min}}</td>
                      <td>{{item.export_max}}</td>
                      <td v-if="item.export_type == 0">{{item.export_fee}}%</td>
                      <td v-if="item.export_type == 1">{{item.export_feeb}}</td>
                      <td v-if="item.export_type == 2">{{item.export_fee}}% + {{item.export_feeb}}</td>
                    </tr>
                </tbody>
                <colgroup style="width:25%;"></colgroup>
                <colgroup style="width:25%;"></colgroup>
                <colgroup style="width:25%;"></colgroup>
                <colgroup style="width:25%;"></colgroup>
            </table>
        </div>

    </div>


</div>
</template>

<script>
import axios from "../../../api/axios";
export default {
  data(){
    return{
      feeList:[],
    }
  },
  methods:{
    feelist(){
      axios
        .get("/api/market/feelist")
        .then((res)=>{
          console.log(res);
          this.feeList = res.data;
        })
        .catch(function(res) {
          console.log(res);
        });
    }

  },
  created(){
    this.feelist();
  }
}
</script>

<style lang='scss' scoped>
.feesBox{
    width: 1040px;
    margin: auto;
    padding-bottom: 60px;
    .feesTitle{
        font-size: 24px;
        height: 80px;
        line-height: 80px;
        font-weight: normal;
        color: #333333;
        border-bottom: 1px solid #e5e5e5;
        margin-bottom: 30px;
    }
    .exchangerate, .chargerate{
        margin-bottom: 15px;
    }
    .tipsTitle{
        font-size: 14px;
        line-height: 24px;
        color: #333;
        font-weight: 600;
        i{
            margin-right: 6px;
        }
    }
    .tipsList{
        list-style: disc;
        padding-left: 40px;
        li{
            list-style: disc;
            font-size: 14px;
            color: #666;
            line-height: 24px;
        }
    }
    .tips{
        font-size: 14px;
        line-height: 24px;
        padding-left: 20px;
    }
    .chargerate .tips {
        color: #666;
    }
    .withdrawrate .tips {
        color: #f00000;
        margin: 5px 0 15px 0;
    }
    .withBox{
        width: 100%;
        .withtable{
            width: 1000px;
            margin: auto;
            font-size: 12px;
            line-height: 30px;
            border: 1px solid #e6e6e6;
            border-collapse:collapse;
            td{
                border: 1px solid #e6e6e6;
                padding-left: 26px;
                text-align: left;
                color: #666;
            }
            tr td:nth-last-child(1){
                text-align: right;
                padding-left: 0;
                padding-right: 26px;
            }
            tr:nth-child(1) td{
                color: #999;
            }
            tr:nth-of-type(odd){
                background-color: #fbfbfb;
            }
            td{
                img{
                    vertical-align: middle;
                    height: 16px;
                    margin: -4px 6px 0 0;
                    display: inline-block;
                }
            }
        }
    }

}
</style>
