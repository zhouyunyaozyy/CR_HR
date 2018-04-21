<template>
  <div class="pisition_see">
    <div class="job_detail_title">职位信息</div>
    <div class="job_info_list">
      <div class="job_info_cont">
        <div class="job_info_item">
          <span class="job_info_name">职位名称</span>
          <span class="job_info_text">{{jobInfo.name}}</span>
        </div>
        <div class="job_info_item">
          <span class="job_info_name">职能</span>
          <span
            class="job_info_text"
            v-for="item in rcnidArr"
            v-if="item.rtid == jobInfo.rtid"
          >{{item.name}}</span>
        </div>
        <div class="job_info_item">
          <span class="job_info_name">最低学历要求</span>
          <span
            class="job_info_text"
            v-for="item in localData.education"
            v-if="item.code == jobInfo.education"
          >{{item.name}}</span>
        </div>
        <div class="job_info_item">
          <span class="job_info_name">工作地点</span>
          <div
            class="job_info_text"
            v-for="item in localData.area"
            v-if="item.code == (jobInfo.address+'').slice(0,2)+'0000'"
          >
            <div
              v-for="item1 in item.children"
              v-if="item1.code == (jobInfo.address+'').slice(0,4)+'00'"
            >{{item1.name}}</div>
          </div>
        </div>
        <div class="job_info_item">
          <span class="job_info_name">工作经验要求</span>
          <span
            class="job_info_text"
            v-for="item in localData.offerExperience"
            v-if="item.code == jobInfo.work_experience"
          >{{item.name}}</span>
        </div>
        <div class="job_info_item">
          <span class="job_info_name">薪资范围</span>
          <span
            class="job_info_text"
            v-for="item in localData.wages"
            v-if="item.code == jobInfo.wages"
          >{{item.name}}</span>
        </div>
        <div class="job_info_item">
          <span class="job_info_name">招聘人数</span>
          <span class="job_info_text">{{jobInfo.hire_number+"人"}}</span>
        </div>
        <div class="job_info_item">
          <span class="job_info_name">职位描述</span>
          <span class="job_info_text">{{jobInfo.profile}}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "positionManageSee",
    data (){
      return {
        jobInfo:{},
        rcnidArr:[],
        localData: JSON.parse(window.sessionStorage.getItem("localData")),
      }
    },
    activated () {
      this.getfuc();
      this.getDetail();
    },
    methods:{
      getfuc () {
        let resultData = {
          cid:window.sessionStorage.getItem("cid")
        };
        this.$axios({
          type: 'get',
          url: '/dabai-chaorenjob/resumeTarget/getActiveResumeTarget',
          data: resultData,
          fuc: (res) => {
            // 获取职能
            if(res.code == 1){
              this.rcnidArr = res.data;
            }else{
              this.$message({
                type: 'error',
                message: res.msg,
                duration: 1000
              })
            }
            console.log( res)
          }
        })
      },
      getDetail (){
        let resultData = {
          jid:window.sessionStorage.getItem("jid")
        };
        this.$axios({
          type: 'get',
          url: '/dabai-chaorenjob/job/getJob',
          data: resultData,
          fuc: (res) => {
            // 获取详情
            if(res.code == 1){
              this.jobInfo = res.data
            }else{
              this.$message({
                type: 'error',
                message: res.msg,
                duration: 1000
              })
            }
            console.log( res)
          }
        })
      },
    }
  }
</script>

<style scoped>
  .pisition_see{
    background-color: #fff;
  }
  .job_detail_title{
    font-size: 16px;
    color:#333;
    border-bottom: 1px solid #ccc;
    line-height: 40px;
    padding-left: 20px;
  }
  .job_info_list{
  }
  .job_info_cont{
    padding: 20px;
    margin: 0 auto;
  }
  .job_info_item{
    display: flex;
    align-items: center;
    justify-content: center;
    height: 40px;
    font-size: 16px;
    color:#4c4c4c;
  }
  .job_info_name{
    flex: 0 0 150px;
  }
  .job_info_text{
    flex: 0 0 300px;
  }
</style>
