<template>
<div class="feesBox">
    <p class="feesTitle">币加网服务费说明</p>
    <div class="exchangerate">
        <p class="tipsTitle"><i class="el-icon-caret-right"></i><span>交易费率</span></p>
        <ul class="tipsList">
            <li>0.1% 交易手续费。（扣除收取到的资产）</li>
        </ul>
    </div>
    <div class="chargerate">
        <p class="tipsTitle"><i class="el-icon-caret-right"></i><span>充值费率</span></p>
        <p class="tips">免费</p>
    </div>
    <div class="withdrawrate">
        <p class="tipsTitle"><i class="el-icon-caret-right"></i><span>提现费率</span></p>
        <p class="tips">提现手续费将会根据区块实际情况定期调整</p>
        <div class="withBox">
            <table class="withtable">
                <tbody>
                    <tr>
                        <td>币种</td>
                        <td>币种全称</td>
                        <td>最小提币数量</td>
                        <td>提币手续费</td>
                    </tr>
                    <tr>
                        <td>
                            <img src="../../../assets/img/coin/BTC.png" alt="BTC"><span>BTC</span>
                        </td>
                        <td><span>Bitcoin</span></td>
                        <td><span>0.002</span></td>
                        <td><span>0.0005 BTC</span></td>
                    </tr>
                    <tr>
                        <td>
                            <img src="../../../assets/img/coin/BTC.png" alt="BTC"><span>BTC</span>
                        </td>
                        <td><span>Bitcoin</span></td>
                        <td><span>0.002</span></td>
                        <td><span>0.0005 BTC</span></td>
                    </tr>
                    <tr>
                        <td>
                            <img src="../../../assets/img/coin/BTC.png" alt="BTC"><span>BTC</span>
                        </td>
                        <td><span>Bitcoin</span></td>
                        <td><span>0.002</span></td>
                        <td><span>0.0005 BTC</span></td>
                    </tr>
                    <tr>
                        <td>
                            <img src="../../../assets/img/coin/BTC.png" alt="BTC"><span>BTC</span>
                        </td>
                        <td><span>Bitcoin</span></td>
                        <td><span>0.002</span></td>
                        <td><span>0.0005 BTC</span></td>
                    </tr>
                    <tr>
                        <td>
                            <img src="../../../assets/img/coin/BTC.png" alt="BTC"><span>BTC</span>
                        </td>
                        <td><span>Bitcoin</span></td>
                        <td><span>0.002</span></td>
                        <td><span>0.0005 BTC</span></td>
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
export default {
  
}
</script>

<style lang='scss' scoped>
.feesBox{
    width: 1040px;
    margin: auto;
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