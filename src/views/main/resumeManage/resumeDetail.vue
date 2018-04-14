<template>
  <div class="resume_detail">
    <div class="detail_head">
      <div class="head_info">
        <div class="head_left">
          <div class="head_avatar">
            <img src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1523616118359&di=7be774622f3f9675cf6a4b437ce1ddc7&imgtype=0&src=http%3A%2F%2Fd.hiphotos.baidu.com%2Fzhidao%2Fwh%253D450%252C600%2Fsign%3D88c8f471f9039245a1e0e90bb2a488f4%2F9a504fc2d5628535aedbd09d95ef76c6a7ef6356.jpg" alt="">
          </div>
          <div class="head_txt">
            <div class="head_name">钱多多</div>
            <div class="head_apply">应聘职位：<span>南航飞行员招聘</span></div>
          </div>
        </div>
        <div class="head_right">
          <el-button @click="_result()" type="primary" plain>预约面试</el-button>
          <el-button @click="_result()" type="primary" plain>不合适</el-button>
        </div>
      </div>
      <div class="head_btn">
        <div class="head_export_btn">
          <el-button type="primary" plain>在线沟通</el-button>
          <el-button type="primary" plain>收藏</el-button>
          <el-button plain>导出word简历</el-button>
        </div>
        <div class="head_review">
          <div class="review_result">
            <span class="">评审结果：</span>
            <span class="review_num">2 通过</span>
            <span class="">&nbsp;(塔塔，全球) / &nbsp;</span>
            <span class="review_txt">1 否决</span>
            <span class="">&nbsp;(凯凯)</span>
          </div>
          <el-button type="primary" plain>待评审</el-button>
        </div>
      </div>
    </div>
    <div class="detail_tab">
      <span class="detail_tab_item">详细信息</span>
      <span class="detail_tab_item is_active">处理记录</span>
    </div>
    <div class="handle_record">
      <div class="handle_item">
        <div class="handle_time">
          <div class="time_txt"></div>
        </div>
        <div class="handle_info">
          <div class="info_txt">不合适</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "recruitDetail",
    methods:{
      _result (){
        this.$router.push("/recruitResult")
      }
    }
  }
</script>
<style>
  .detail_head .el-button{
    height: 30px;
    width: 120px;
    padding: 0;
  }
</style>
<style scoped>
  .detail_head{
    background-color: #fff;
    padding: 20px 20px 0;
  }
  .head_info{
    display: flex;
  }
  .head_info>div{
    flex: 0 0 50%;
  }
  .head_left{
    display: flex;
  }
  .head_avatar{
    flex: 0 0 85px;
    height: 85px;
    margin-right: 20px;
  }
  .head_avatar img{
    width: 100%;
    height: 100%;
  }
  .head_txt{
    flex: 1;
  }
  .head_name{
    color: #333;
    font-size: 18px;
    padding-bottom: 40px;
  }
  .head_apply{
    color: #4c4c4c;
    font-size: 16px;
  }
  .head_right{
    text-align: right;
  }
  .head_btn{
    display: flex;
    padding: 10px 0;
    height: 30px;
    align-items: center;
  }
  .head_export_btn{
    flex: 0 0 50%;
  }
  .head_review{
    flex: 1;
    display: flex;
    justify-content: space-between;
  }
  .review_result{
    color:#4c4c4c;
    font-size: 14px;
    line-height: 30px;
    display: flex;
  }
  .review_num{
    color:#048adf;
  }
  .review_txt{
    color:#ff8955;
  }
  /*detail_tab*/
  .detail_tab{
    background-color: #fff;
    padding-left: 20px;
    font-size: 16px;
    color:#666;
    line-height: 60px;
    display: flex;
    margin-top: 10px;
  }
  .detail_tab_item{
    flex: 0 0 180px;
    text-align: center;
    border-left: 1px solid #e6e6e6;
    border-right: 1px solid #e6e6e6;
  }
  .detail_tab_item.is_active{
    border-left-color: #048adf;
    border-right-color: #048adf;
    background-color: #048adf;
    color:#fff;
  }
  /*handle_record*/
  .handle_record{
    background-color: #fff;
    padding: 20px;
  }
  .handle_item{
    display: flex;
  }
  .handle_time{
    flex: 0 0 152px;
    border-right: 2px solid #addfff;
  }
  .handle_info{
    flex: 1;
    padding-left: 30px;
    padding-bottom: 20px;
  }
  .info_txt{
    background-color: #f5f5f5;
    padding: 30px 15px;
  }
</style>
