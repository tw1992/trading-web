<template>
<div class="brandBox">
    <div class="bannerBox">
        <div class="textBox">
            <p class="bannerName">BEJX.IO</p>
            <p class="bannerTip">Assets For Download</p>
        </div>
    </div>
    <div class="downTop">
        <p class="downName">下载须知：</p>
        <p class="downTip">此系列图片为币安品牌形象片，适用于发布在与币加相关的文章中，欢迎下载使用，如果你希望币加logo用于其他途径，请发邮件至 <span class="baseColor">sevice@bjex.io</span> 联系我们。</p>
    </div>
    <div class="logoBg">
        <div class="logoDown">
            <p class="downTitle">币加Logo</p>
            <span class="downLogo"><a href="" download="../../../assets/img/about/logo.zip" class="el-icon-download"></a></span>
            <ul class="logoList">
                <li>
                    <img src="../../../assets/img/about/logo/logo1.png" alt="">
                </li>
                <li>
                    <img src="../../../assets/img/about/logo/logo2.png" alt="">
                </li>
                <li>
                    <img src="../../../assets/img/about/logo/logo3.png" alt="">
                </li>
                <li>
                    <img src="../../../assets/img/about/logo/logo4.png" alt="">
                </li>
            </ul>
        </div>
    </div>
    <div class="imageBox">
        <p class="downTitle">品牌形象</p>
        <div class="imgBox">
            <div class="imgItem">
                <img src="../../../assets/img/about/down/down1.png" alt="down1.png">
                <a href="" download="../../../assets/img/about/down/down1.png" class="downBtn">
                    <i class="el-icon-download"></i>
                </a>
            </div>
            <div class="imgItem">
                <img src="../../../assets/img/about/down/down2.png" alt="down2.png">
                <a href="" download="../../../assets/img/about/down/down2.png" class="downBtn">
                    <i class="el-icon-download"></i>
                </a>
            </div>
            <div class="imgItem">
                <img src="../../../assets/img/about/down/down3.png" alt="down3.png">
                <a href="" download="../../../assets/img/about/down/down3.png" class="downBtn">
                    <i class="el-icon-download"></i>
                </a>
            </div>
            <div class="imgItem">
                <img src="../../../assets/img/about/down/down4.png" alt="down4.png">
                <a href="" download="../../../assets/img/about/down/down4.png" class="downBtn">
                    <i class="el-icon-download"></i>
                </a>
            </div>
        </div>

        <div class="imgBox">
            <div class="imgItem">
                <img src="../../../assets/img/about/down/down5.png" alt="down5.png">
                <a href="" download="../../../assets/img/about/down/down5.png" class="downBtn">
                    <i class="el-icon-download"></i>
                </a>
            </div>
            <div class="imgItem">
                <img src="../../../assets/img/about/down/down6.png" alt="down6.png">
                <a href="" download="../../../assets/img/about/down/down6.png" class="downBtn">
                    <i class="el-icon-download"></i>
                </a>
            </div>
            <div class="imgItem">
                <img src="../../../assets/img/about/down/down7.png" alt="down7.png">
                <a href="" download="../../../assets/img/about/down/down7.png" class="downBtn">
                    <i class="el-icon-download"></i>
                </a>
            </div>
            <div class="imgItem">
                <img src="../../../assets/img/about/down/down8.png" alt="down8.png">
                <a href="" download="../../../assets/img/about/down/down8.png" class="downBtn">
                    <i class="el-icon-download"></i>
                </a>
            </div>
        </div>

        <div class="imgBox">
            <div class="imgItem">
                <img src="../../../assets/img/about/down/down9.png" alt="down9.png">
                <a href="" download="../../../assets/img/about/down/down9.png" class="downBtn">
                    <i class="el-icon-download"></i>
                </a>
            </div>
            <div class="imgItem">
                <img src="../../../assets/img/about/down/down10.png" alt="down10.png">
                <a href="" download="../../../assets/img/about/down/down10.png" class="downBtn">
                    <i class="el-icon-download"></i>
                </a>
            </div>
            <div class="imgItem">
                <img src="../../../assets/img/about/down/down11.png" alt="down11.png">
                <a href="" download="../../../assets/img/about/down/down11.png" class="downBtn">
                    <i class="el-icon-download"></i>
                </a>
            </div>
            <div class="imgItem">
                <img src="../../../assets/img/about/down/down12.png" alt="down12.png">
                <a href="" download="../../../assets/img/about/down/down12.png" class="downBtn">
                    <i class="el-icon-download"></i>
                </a>
            </div>
        </div>
    </div>
</div>
</template>

<script>
export default {
  
}
</script>

<style lang='scss' scoped>
.brandBox{
    .baseColor{
        color: #FC9217;
    }
    .bannerBox{
        width: 100%;
        height: 200px;
        background: url('../../../assets/img/about/bg.png') no-repeat center;
        background-size: 100% 100%;
        position: relative;
        .textBox{
            position: absolute;
            z-index: 2;
            color: #ffffff;
            width: 100%;
            text-align: center;
        }
        .bannerName{
            font-size: 48px;
            font-family: Arial-BoldMT;
            margin-top: 40px;
        }
        .bannerTip{
            font-size: 36px;
            color: #E5E4E5;
            font-family: ArialMT;
        }
    }
    .downTop{
        width: 1200px;
        margin: 0 auto;
        height: 180px;
        overflow: hidden;
        .downName{
            font-size: 18px;
            margin-top: 60px;
            margin-bottom: 40px;
        }
    }
    .downTitle{
        font-size: 18px;
        font-weight: bold;
        text-align: center;
        line-height: 80px;
    }
    .logoBg{
        width: 100%;
        background: #F8F8F8;
        .logoDown{
            width: 1200px;
            height: 100%;
            margin: 0 auto;
            position: relative;
            .downLogo{
                position: absolute;
                right: 10px;
                top: 0;
                line-height: 80px;
                a{
                    font-size: 18px;
                    border-radius: 50%;
                    border: 1px solid #333333;
                    display: inline-block;
                    width: 30px;
                    height: 30px;
                    line-height: 30px;
                    text-align: center;
                    cursor: pointer;
                }
            }
            .logoList{
                width: 100%;
                display: flex;
                justify-content: space-around;
                align-items: center;
                margin-top: 60px;
                margin-bottom: 100px;
                img{
                    max-height: 120px;
                    max-width: 240px;
                }
            }
        }
    }

    .imageBox{
        width: 1200px;
        margin: 0 auto;
        margin-bottom: 60px;
        .downTitle{
            margin-bottom: 10px;
        }
    }
    .imgBox{
        margin-top: 30px;
        // margin-bottom: 60px;
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
    
}
</style>