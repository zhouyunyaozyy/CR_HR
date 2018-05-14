<template>
  <div class="resume_list_cont" v-loading="loading">
    <el-row :gutter="10" class="resume_list" v-if="resumeData.length > 0">
      <el-col v-for="(item,index) in resumeData" :class="{blue:index%2!=0}" :xs="24" :sm="12" :md="8" :lg="8" :xl="6" :key='index' class="resume_item">
        <div class="resume_item_cont">
          <div class="resume_posi">
            <div class="posi_name wrap" style="width: 100%;overflow:hidden;text-overflow: ellipsis;white-space: nowrap;" :title="item.name">{{item.name}}</div>
            <div class="pisi_sub"></div>
          </div>
          <div class="resume_cont">
            <div class="resume_state_item">
              <div class="state_title">全部简历</div>
              <div class="resume_num">共({{item.ALL}}份)</div>
              <el-button @click="_jump(item,6)" type="warning" size="small" plain>详情</el-button>
            </div>
            <div class="resume_state_item">
              <div class="state_title">待评审</div>
              <div class="resume_num">共({{item.DAIPINGSHEN}}份)</div>
              <el-button @click="_jump(item,5)" type="warning" size="small" plain>详情</el-button>
            </div>
            <div class="resume_state_item bor">
              <div class="state_title">邀请面试</div>
              <div class="resume_num">共({{item.MIANSHI}}份)</div>
              <el-button @click="_jump(item,3)" type="warning" size="small" plain>详情</el-button>
            </div>
            <div class="resume_state_item">
              <div class="state_title">不合适</div>
              <div class="resume_num">共({{item.BUHESHI}}份)</div>
              <el-button @click="_jump(item,4)" type="warning" size="small" plain>详情</el-button>
            </div>
          </div>
        </div>
      </el-col>
    </el-row>
    <div v-else class="no_data">
      <img src="./../../../imgs/no_data_04.png" alt="">
    </div>
  </div>
</template>
<script>
  export default {
    name: "resumeList",
    data () {
      return{
        resumeData:[],
        loading:true,
      }
    },
    activated () {
      this.init();
    },
    methods:{
      init(){
        this.loading = true;
        this.$axios({
          type: 'get',
          url: '/dabai-chaorenjob/resumeReceived/getHRResumeListGroupByJid',
          fuc: (res) => {
            this.resumeData= res.data;
            this.loading = false;
            console.log( res)
          }
        })
      },
      _jump (item,type) {
        console.log(item)
        window.sessionStorage.setItem("jid",item.jid)
        window.sessionStorage.setItem("jobName",item.name)
        window.sessionStorage.setItem("status",type)
        this.$router.push("/recruitList")
      }
    }
  }
</script>
<style scoped>
  .wrap{
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .resume_list{
    /*display: flex;*/
    /*justify-content: space-between;*/
    /*flex-wrap: wrap;*/
    margin: 0 !important;
  }
  .resume_item{
    /*flex: 0 0 24%;*/
    /*max-width: 410px;*/
    /*min-width: 330px;*/
    /*flex-grow:1;*/
  }
  .resume_item_cont{
    background-color: #fff;
    margin-bottom: 10px;
    box-sizing: border-box;
    padding: 20px;
    /*height: 240px;*/
    /*margin: 0 5px 10px;*/
  }
  .resume_posi{
    font-size: 18px;
    color:#333;
    text-align: center;
    line-height: 35px;
  }
  .pisi_sub{
    width: 100px;
    height: 0;
    margin: 0 auto;
    border-top: 4px solid #ff8955;
  }
  .blue .pisi_sub{
    border-top-color: #048adf;
  }
  /*resume_cont*/
  .resume_cont{
    display: flex;
    padding-top: 30px;
    padding-bottom: 10px;
  }
  .resume_state_item{
    flex: 0 0 25%;
    text-align: center;
    box-sizing: border-box;
    border-left: 1px solid #ccc;
  }
  .resume_state_item:first-child{
    border-left: 0;
  }
  .state_title{
    font-size: 16px;
    color:#333;
  }
  .resume_num{
    font-size: 14px;
    color:#666;
    line-height: 50px;
  }
  .resume_state_item .is-plain{
    color:#333;
    border-color:#333;
    background: #fff;
  }
  .resume_state_item .is-plain:hover{
    color:#fff;
    border-color:#ff8955;
    background: #ff8955;
  }
  .blue .resume_state_item .is-plain:hover{
    color:#fff;
    border-color:#048adf;
    background: #048adf;
  }
  .resume_state_item .el-button{
    width: 70px;
    height: 30px;
    padding: 0;
    font-size: 14px;
  }
  .resume_list_cont{
    height: 100%;
  }
  .no_data{
    height: 100%;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }
</style>
