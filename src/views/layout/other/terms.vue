<template>
<div class="termsBox">
    <div class="agreementTitle">{{$t('terms.title')}}</div>
    <div class="agreementCon">
        <p class="agreementConHeader" style="padding-top:24px;">{{$t('terms.t1')}}</p>
        <p>{{$t('terms.p1')}}</p>
        <p>{{$t('terms.p2')}}</p>
        <p>{{$t('terms.p3')}}</p>
        <p class="agreementConHeader">{{$t('terms.t2')}}</p>
        <p>{{$t('terms.p4')}}</p>
        <p>{{$t('terms.p5')}}</p>
        <p class="agreementConHeader">{{$t('terms.t3')}}</p>
        <p class="agreementConSubHeader">{{$t('terms.t4')}}</p>
        <p>{{$t('terms.p6')}}</p>
        <p class="agreementConSubHeader">{{$t('terms.t5')}}</p>
        <p>{{$t('terms.p7')}}</p>
        <p>{{$t('terms.p8')}}</p>
        <p class="agreementConSubHeader">{{$t('terms.t6')}}</p>
        <p>{{$t('terms.p9')}}</p>
        <p class="agreementConSubHeader">{{$t('terms.t7')}}</p>
        <p>{{$t('terms.p10')}}</p>
        <p class="agreementConHeader">{{$t('terms.t8')}}</p>
        <p>{{$t('terms.p11')}}</p>
        <p>{{$t('terms.p12')}}</p>
        <p>{{$t('terms.p13')}}</p>
        <p class="agreementConHeader">{{$t('terms.t9')}}</p>
        <p>{{$t('terms.p14')}}</p>
        <p>{{$t('terms.p15')}}</p>
        <p class="agreementConHeader">{{$t('terms.t10')}}</p>
        <p>{{$t('terms.p16')}}</p>
        <p>{{$t('terms.p17')}}</p>
        <p>{{$t('terms.p18')}}</p>
        <p>{{$t('terms.p19')}}</p>
        <p>{{$t('terms.p20')}}</p>
        <p class="agreementConHeader">{{$t('terms.t11')}}</p>
        <p>{{$t('terms.p21')}}</p>
        <p>{{$t('terms.p22')}}</p>
        <p>{{$t('terms.p23')}}</p>
        <p>{{$t('terms.p24')}}</p>
        <p>{{$t('terms.p25')}}</p>
        <p class="agreementConHeader">{{$t('terms.t12')}}</p>
        <p class="agreementConFooter">{{$t('terms.p26')}}</p>
        <p class="agreementConSubHeader">{{$t('terms.t13')}}</p>
        <p>{{$t('terms.p27')}}</p>
        <p>{{$t('terms.p28')}}</p>
        <p class="agreementConSubHeader">{{$t('terms.t14')}}</p>
        <p>{{$t('terms.p29')}}</p>
        <p>{{$t('terms.p30')}}</p>
        <p class="agreementConSubHeader">{{$t('terms.t15')}}</p>
        <p>{{$t('terms.p31')}}</p>
        <p>{{$t('terms.p32')}}</p>
        <p>{{$t('terms.p33')}}</p>
        <p>{{$t('terms.p34')}}</p>
        <p>{{$t('terms.p35')}}</p>
        <p class="agreementConSubHeader">{{$t('terms.t16')}}</p>
        <p>{{$t('terms.p36')}}</p>
        <p class="agreementConSubHeader">{{$t('terms.t17')}}</p>
        <p>{{$t('terms.p37')}}</p>
        <p class="agreementConSubHeader">{{$t('terms.t18')}}</p>
        <p>{{$t('terms.p38')}}</p>
        <p>{{$t('terms.p39')}}</p>
        <p class="agreementConFooter">{{$t('terms.p40')}}</p>
    </div>
</div>
</template>

<script>
export default {
  
}
</script>

<style lang='scss' scoped>
.termsBox{
    padding: 0 100px 100px 100px;
    width: 1200px;
    margin: 0 auto;
    .agreementTitle{
        font-size: 30px;
        color: #272f35;
        height: 100px;
        line-height: 100px;
        border-bottom: 1px solid #e5e5e5;
    }
    .agreementCon{
        p{
            font-size: 14px;
            color: #888;
            line-height: 24px;
            margin-bottom: 24px;
        }
        .agreementConHeader{
            color: #333;
            font-weight: bold;
        }
        .agreementConSubHeader{
            color: #333;
            font-weight: bold;
            font-size: 14px;
        }
        .agreementConFooter{
            color: #333;
            font-size: 14px;
        }
    }
}
</style>