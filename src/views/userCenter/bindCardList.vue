<template>
    <div class="accBox">
      <p class="topTip">{{$t('user.recommendations')}}</p>
      <div class="autTop">
        <router-link to="/userCenter/account"><i class="el-icon-d-arrow-left"></i></router-link>
        <p class="topTitle">{{$t('bindCardList.bindCard')}}</p>
      </div>
      <div class="list">
        <ul>
          <li v-for="item in bandList">
            <span style="float:left;width: 30%">{{item.bankname}}</span>
            <span style="display: inline-block;width: 30%;text-align: center;">{{$t('bindCardList.reduce')}}{{item.reduce}}</span>
            <span style="float:right;width: 30%;text-align: right;">
              <el-button type="primary" @click="deleteCard(item.id)">{{$t('bindCardList.delete')}}</el-button>
            </span>
          </li>
        </ul>
        <div>
          <el-button type="primary" @click="bindCard">{{$t('bindCardList.addBindCard')}}</el-button>
        </div>
      </div>
      <!--二次确认删除弹框-->
      <el-dialog
          :title="$t('bindCardList.tip')"
          :visible.sync="dialogVisible"
          width="30%"
          center>
          <span>{{$t('bindCardList.tip')}}</span>
          <span slot="footer" class="dialog-footer">
            <el-button @click="dialogVisible = false">{{$t('bindCardList.cancel')}}</el-button>
            <el-button type="primary" @click="deleteBand">{{$t('bindCardList.sure')}}</el-button>
          </span>
      </el-dialog>
    </div>
</template>

<script>
  import axios from '../../api/axios'
    export default{
        data(){
            return {
              dialogVisible:false,
              deleteId:'',
              bandList: [],
            }
        },
        methods:{
          deleteCard(id){
            this.dialogVisible = true;
            this.deleteId = id;
          },
          deleteBand(){
            axios.get('/api/user/del_card/'+this.deleteId).then(res=>{
              this.dialogVisible = false;
              this.$message({
                message: '删除成功',
                type: 'success'
              });
              this.card_list();
            })
          },
          bindCard(){
            this.$router.push({path:'/bindCardForm'});
          },
          card_list(){
            axios.get('/api/user/card_list').then((res)=>{
              this.bandList = res.data;
            })
          }
        },
        created(){
          this.card_list();
        }
    }
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
    .autTop{
      display: flex;
      line-height: 40px;
      font-size: 18px;
      border-bottom: 1px solid #cccccc;
      a{
        color: #333333;
        margin-right: 14px;
      }
    }
    .list{
      margin-top:30px;
      margin-bottom:30px;
      width:600px;
      li{
        line-height: 40px;
        border:1px solid #CCCCCC;
        margin-bottom: 20px;
        height: 60px;
        padding:10px 20px;
        box-sizing: border-box;
        .el-button{
          border-radius:0;
          width:100px;
          height: 40px;
        }
      }
      .el-button{
        border-radius:0;
        width:100%;
        height: 40px;
      }
    }

  }
</style>
