<template>
<div class="aboutBox">
    <div class="aboutItem">
        <p class="aboutTitle">关于我们</p>
        <p class="aboutTips">币加是一个数字资产交易平台，为数字货币交易商和全球流动性提供商提供最先进的服务。除了先进的交易功能和一套图表工具之外，币加还提供对等融资，OTC交易市场以及多种数字资产的保证金交易服务。币加的战略重点是为世界各地的专业交易商和流动性提供商提供支持，工具和创新服务。</p>
    </div>
    <div class="aboutItem">
        <p class="aboutTitle">我们的优势</p>
        <ul class="advantageList">
            <li class="advantageItem">
                <img src="../../../assets/img/about/banner1.png" alt="产品成熟">
                <p class="advantageName">产品成熟</p>
                <p class="advantageTips">底层系统开发源自深交所、纽交所技术专家提供支持，支持全客户端多语种，用户体验度高。</p>
            </li>
            <li class="advantageItem">
                <img src="../../../assets/img/about/banner2.png" alt="安全稳定">
                <p class="advantageName">安全稳定</p>
                <p class="advantageTips">多机热备的系统架构，基于深度学习的智能权重控单引擎。</p>
            </li>
            <li class="advantageItem">
                <img src="../../../assets/img/about/banner3.png" alt="品质服务">
                <p class="advantageName">品质服务</p>
                <p class="advantageTips">严格的上币审核流程，全网公布，设立投资者保护基金，24小时在线客服支持。</p>
            </li>
        </ul>
    </div>
    <div class="aboutItem">
        <p class="aboutTitle">资源下载</p>
        <p class="aboutTips">此系列图片为币安品牌形象片，适用于发布在与币安相关的文章中，欢迎下载使用，如果您希望币安logo用于其他途径，请发邮件至sevice@bjex.io联系我们。</p>
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
        <router-link to="/brand" class="downMore">下载更多</router-link>
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