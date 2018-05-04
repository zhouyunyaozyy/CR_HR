<template>
  <div class="recruit_result">
    <div class="user_info">
      <div class="center_cont user_cont" v-if="rrids.length == 1">
        <div class="user_avatar">
          <img :src="dataInfo.headerUrl" alt="">
        </div>
        <div class="user_txt">
          <div class="user_name">{{dataInfo.name}}</div>
          <div class="user_apply">应聘职位：<span>{{jobName}}</span></div>
        </div>
      </div>
      <div class="center_cont user_name" v-else>应聘职位：<span>{{jobName}}</span></div>
    </div>
    <div class="info_cont">
      <div class="center_cont">
        <div class="prev_info" v-if='Object.keys(prevInfo).length > 0'>
          <div class="prev_info_title">{{prevInfo.title}}</div>
          <div class="prev_info_time" v-if='prevInfo.agreedtime'>
            <span class="prev_info_label">*面试时间：</span>
            <span class="prev_info_txt">{{new Date(parseInt(prevInfo.agreedtime)).toLocaleString('chinese', {hour12: false})}}</span>
          </div>
          <div class="prev_info_address" v-if='prevInfo.agreedpath'>
            <span class="prev_info_label">*面试地址：</span>
            <span class="prev_info_txt">{{prevInfo.agreedpath}}</span>
          </div>
          <div class="prev_info_leav" v-if="prevInfo.agreednote">
            <span class="prev_info_label" v-if="prevInfo.agreedtime">留言：</span>
            <span class="prev_info_label" v-else>拒绝原因：</span>
            <span class="prev_info_txt">{{prevInfo.agreednote}}</span>
          </div>
        </div>
        <div class="leav_info" :class="{refuse:resultState == 2}">
          <el-form
            :model="form"
            status-icon
            class="form_info">
            <div class="info_title" v-if="resultState == 1">发送预约面试信息</div>
            <div class="info_title" v-else="resultState == 2">不合适，请填写拒绝原因</div>
            <el-form-item v-if="resultState == 1">
              <span class="star"><b>*</b>面试时间:</span>
              <el-date-picker
                v-model="form.time"
                type="datetime"
                value-format="timestamp"
                placeholder="选择日期时间">
              </el-date-picker>
            </el-form-item>
            <el-form-item v-if="resultState == 1">
              <span class="star"><b>*</b>面试地址:</span>
              <el-input v-model="form.address" maxlength="50" placeholder="请输入面试地址"></el-input>
            </el-form-item>
            <el-form-item>
              <span class="star" v-if="resultState == 1">留言:</span>
              <span class="star left" v-else="resultState == 2"><b>*</b>留言:</span>
              <el-input
                type="textarea"
                :autosize="{ minRows: 4, maxRows: 6}"
                placeholder="请输入内容"
                maxlength="200"
                v-model="form.leav"></el-input>
            </el-form-item>
            <el-form-item>
              <div class="submit_btn">
                <el-button v-if="resultState == 1" @click="_invite()" type="primary">提交</el-button>
                <el-button v-else @click="_mark()" type="primary">提交</el-button>
              </div>
            </el-form-item>
          </el-form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "recruitResult",
    data (){
      return{
        form:{
          time:"",
          address:"",
          leav:""
        },
        prevInfo:{},
        dataInfo:{},
        jobName:window.sessionStorage.getItem("jobName"),
        rrids: []
      }
    },
    computed:{
      resultState () {
        return this.$route.params.resultState
      },
			tabIndex (){
        return this.$store.state.tj.tabIndex;
      }
    },
    activated () {
      if(this.resultState == 1){
        this.form.leav = ""
      }else{
        this.form.leav = "感谢您对我司的认同，经过综合评估，我司已确定了最适合的人选。非常遗憾未能与您成为同事，相信以您的优秀才干，一定能很快找到更适合的岗位，期待将来我们能有机会合作。"
      }
      this.rrids = JSON.parse(window.sessionStorage.getItem("rrids"))
      console.log('rrids', this.rrids)
      if(this.rrids.length == 1){
        this.init();
        this.initInfo();
      }else{
        this.dataInfo = {}
        this.prevInfo = {}
      }
    },
    methods:{
      initInfo (){
        let postData = {
          rrid: this.rrids[0]
        }
        this.$axios({
          type: 'get',
          url: '/dabai-chaorenjob/resumeReceived/getRongInfoByRrid',
          data: postData,
          fuc: (res) => {
            if(res.code == 1){
              this.dataInfo = res.data;
            }
            console.log( res)
          }
        })
      },
      init (){
        let postData = {
          rrid: this.rrids[0]
        }
        this.$axios({
          type: 'get',
          url: '/dabai-chaorenjob/resumeReceived/getResumeReceivedByRRid',
          data: postData,
          fuc: (res) => {
            if(res.code == 1){
              if(res.data.status == 3){
								this.$set(this.prevInfo, 'title', '已发送的预约面试信息')
								this.$set(this.prevInfo, 'agreedtime', res.data.agreedtime || "")
								this.$set(this.prevInfo, 'agreedpath', res.data.agreedpath || "")
								this.$set(this.prevInfo, 'agreednote', res.data.agreednote || "")
              }else if(res.data.status == 4){
								this.$set(this.prevInfo, 'title', '已发送的不合适信息')
								this.$set(this.prevInfo, 'agreednote', res.data.agreednote || "")
              }else{
                this.prevInfo = {};
              }
            }
            console.log('res', this.prevInfo)
          }
        })
      },
      _mark (){
        if(!this.form.leav){
          this.$message({
            type: 'error',
            message: "留言不能为空",
            duration: 1000
          })
          return;
        }
        let postData = {
          rrids: JSON.parse(window.sessionStorage.getItem("rrids")),
          agreednote: this.form.leav
        }
        this.$axios({
          type: 'post',
          url: '/dabai-chaorenjob/resumeReceived/markFail',
          data: postData,
          fuc: (res) => {
            if(res.code == 1){
							this.$message.success(res.msg)
							this.removeTab()
            }
            console.log( res)
          }
        })
      },
      _invite (){
        if(!this.form.time){
          this.$message({
            type: 'error',
            message: "面试时间不能为空",
            duration: 1000
          })
          return;
        }else if(!this.form.address){
          this.$message({
            type: 'error',
            message: "面试地址不能为空",
            duration: 1000
          })
          return;
        }
        let postData = {
          rrids: JSON.parse(window.sessionStorage.getItem("rrids")),
          agreedtime: this.form.time,
          agreedpath: this.form.address,
          agreednote: this.form.leav,
        }
        this.$axios({
          type: 'post',
          url: '/dabai-chaorenjob/resumeReceived/markSuccess',
          data: postData,
          fuc: (res) => {
            if(res.code == 1){
							this.$message.success(res.msg)
							this.removeTab()
            }
            console.log( res)
          }
        })
      },
      removeTab() {
        this.$store.commit('removeTab',this.tabIndex)
        this.clickTab();
      },
      clickTab() {
        this.$store.commit('changeTab',"/resumeDetail")
        this.$router.push({
          path:"/recruitList"
        });
      }
    }
  }
</script>
<style>
  .form_info .el-input{
    width: 200px;
    height: 30px;
  }
  .form_info .el-textarea{
    width: 715px;
  }
  .refuse .form_info .el-textarea{
    width: 745px;
  }
  .form_info .el-form-item{
    margin-bottom: 10px;
  }
</style>
<style scoped>
  .center_cont{
    width: 820px;
    margin: 0 auto;
  }
  .user_info{
    background-color: #fff;
    margin-bottom: 1px;
    padding: 20px 0;
  }
  .user_cont{
    display: flex;
  }
  .user_avatar{
    flex: 0 0 55px;
    height: 55px;
    margin-right: 10px;
  }
  .user_avatar img{
    width: 100%;
    height: 100%;
  }
  .user_txt{
    flex: 1;
  }
  .user_name{
    color: #333;
    font-size: 16px;
    padding-bottom: 13px;
  }
  .user_apply{
    color: #4c4c4c;
    font-size: 14px;
  }
  .info_cont{
    background-color: #fff;
    padding: 10px 0;
  }
  .prev_info{
    width: 550px;
    padding: 20px 35px 0;
    box-sizing: border-box;
    background-color: #f2f2f2;
    font-size: 16px;
    color:#4c4c4c;
  }
  .prev_info>div{
    padding-bottom: 20px;
  }
  .info_title{
    font-size: 18px;
    color:#333;
    padding: 40px 0 20px;
  }
  .star{
    display: inline-block;
    vertical-align: top;
    width: 90px;
    text-align: right;
    font-size: 16px;
    color:#4c4c4c;
    margin-right: 10px;
  }
  .star.left{
    width: 55px;
    text-align: left;
  }
  .star b{
    color: #ff1a1a;
    font-size: 18px;
  }
  .submit_btn{
    text-align: right;
  }
</style>
