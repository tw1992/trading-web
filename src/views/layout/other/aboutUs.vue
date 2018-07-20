<template>
<div class="aboutBox">
    <div class="aboutItem">
        <p class="aboutTitle">{{$t('home.about')}}</p>
        <p class="aboutTips">{{$t('about.about')}}</p>
    </div>
    <div class="aboutItem">
        <p class="aboutTitle">{{$t('about.advantages')}}</p>
        <ul class="advantageList">
            <li class="advantageItem">
                <img src="../../../assets/img/about/banner1.png" :alt="$t('about.product')">
                <p class="advantageName">{{$t('about.product')}}</p>
                <p class="advantageTips">{{$t('about.productDetail')}}</p>
            </li>
            <li class="advantageItem">
                <img src="../../../assets/img/about/banner2.png" :alt="$t('about.safe')">
                <p class="advantageName">{{$t('about.safe')}}</p>
                <p class="advantageTips">{{$t('about.safeDetail')}}</p>
            </li>
            <li class="advantageItem">
                <img src="../../../assets/img/about/banner3.png" :alt="$t('about.service')">
                <p class="advantageName">{{$t('about.service')}}</p>
                <p class="advantageTips">{{$t('about.serviceDetail')}}</p>
            </li>
        </ul>
    </div>
    <div class="aboutItem">
        <p class="aboutTitle">{{$t('about.resourceDownLoad')}}</p>
        <p class="aboutTips">{{$t('about.resourceDownLoadDetail')}}</p>
        <div class="imgBox">
            <div class="imgItem">
                <img src="../../../assets/img/about/down/down6.png" alt="down1.png">
                <a href="" download="../../../assets/img/about/down/down6.png" class="downBtn">
                    <i class="el-icon-download"></i>
                </a>
            </div>
            <div class="imgItem">
                <img src="../../../assets/img/about/down/down12.png" alt="down2.png">
                <a href="" download="../../../assets/img/about/down/down12.png" class="downBtn">
                    <i class="el-icon-download"></i>
                </a>
            </div>
            <div class="imgItem">
                <img src="../../../assets/img/about/down/down1.png" alt="down3.png">
                <a href="" download="../../../assets/img/about/down/down1.png" class="downBtn">
                    <i class="el-icon-download"></i>
                </a>
            </div>
            <div class="imgItem">
                <img src="../../../assets/img/about/down/down2.png" alt="down4.png">
                <a href="" download="../../../assets/img/about/down/down2.png" class="downBtn">
                    <i class="el-icon-download"></i>
                </a>
            </div>
        </div>
        <router-link to="/brand" class="downMore">{{$t('about.downLoadMore')}}</router-link>
    </div>

</div>
</template>

<script>
export default {

}
</script>

<style lang='scss' scoped>
.aboutBox{
    width: 1200px;
    margin: auto;
    padding-bottom: 60px;
    // font-size: 14px;
    // color: #333333;
    .aboutItem{
        margin-bottom: 60px;
    }
    .aboutTitle{
        font-size: 18px;
        font-weight: 600;
        line-height: 60px;
        color: #333333;
        border-bottom: 1px solid #e5e5e5;
        margin-top: 20px;
        margin-bottom: 20px;
    }
    .aboutTips{
        line-height: 20px;
    }
    .advantageList{
        display: flex;
        justify-content: space-between;
        .advantageItem{
            width: 370px;
            text-align: center;
            display: flex;
            flex-direction: column;
            align-items: center;
            img{
                width: 150px;
                height: 150px;
                margin-top: 40px;
                margin-bottom: 30px;
            }
            .advantageName{
                margin-bottom: 20px;
            }
            .advantageTips{
                color: #999999;
            }
        }
    }
    .imgBox{
        margin-top: 30px;
        margin-bottom: 60px;
        display: flex;
        justify-content: space-between;
        .imgItem{
            width: 280px;
            height: 180px;
            position: relative;
            overflow: hidden;
            img{
                width: 100%;
                height: 100%;
            }
            &:hover .downBtn{
                top: 0;
            }
            .downBtn{
                position: absolute;
                top: 100%;
                left: 0;
                transition: 0.5s ease;
                height: 100%;
                width: 100%;
                background: rgba(0,0,0,0.2);
                i{
                    width: 100%;
                    line-height: 180px;
                    text-align: center;
                    color: #FFFFFF;
                    font-size: 40px;
                }
            }
        }
    }
    .downMore{
        display: block;
        width: 160px;
        height: 40px;
        line-height: 40px;
        text-align: center;
        margin: 0 auto;
        font-size: 18px;
        color: #FFFFFF;
        background: #FC9217;
    }

}
</style>
