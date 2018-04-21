<template>
  <div class="recruit_result">
    <div class="user_info">
      <div class="center_cont user_cont">
        <div class="user_avatar">
          <img src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1523616118359&di=7be774622f3f9675cf6a4b437ce1ddc7&imgtype=0&src=http%3A%2F%2Fd.hiphotos.baidu.com%2Fzhidao%2Fwh%253D450%252C600%2Fsign%3D88c8f471f9039245a1e0e90bb2a488f4%2F9a504fc2d5628535aedbd09d95ef76c6a7ef6356.jpg" alt="">
        </div>
        <div class="user_txt">
          <div class="user_name">钱多多</div>
          <div class="user_apply">应聘职位：<span>南航飞行员招聘</span></div>
        </div>
      </div>
    </div>
    <div class="info_cont">
      <div class="center_cont">
        <div class="prev_info" v-if="Object.keys(prevInfo).length > 0">
          <div class="prev_info_title">{{prevInfo.title}}</div>
          <div class="prev_info_time" v-if="prevInfo.agreedtime">
            <span class="prev_info_label">*面试时间：</span>
            <span class="prev_info_txt">{{(new Date(prevInfo.agreedtime)).Format("yyyy-MM-dd hh:mm:ss")}}</span>
          </div>
          <div class="prev_info_address" v-if="prevInfo.agreedpath">
            <span class="prev_info_label">*面试地址：</span>
            <span class="prev_info_txt">{{prevInfo.agreedpath}}</span>
          </div>
          <div class="prev_info_leav">
            <span class="prev_info_label">留言：</span>
            <span class="prev_info_txt" v-if="prevInfo.agreednote">{{prevInfo.agreednote}}</span>
            <span class="prev_info_txt" v-else-if="prevInfo.mark">{{prevInfo.mark}}</span>
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
              <el-input v-model="form.address" placeholder="请输入面试地址"></el-input>
            </el-form-item>
            <el-form-item>
              <span class="star" v-if="resultState == 1">留言:</span>
              <span class="star left" v-else="resultState == 2"><b>*</b>留言:</span>
              <el-input
                type="textarea"
                :autosize="{ minRows: 4, maxRows: 6}"
                placeholder="请输入内容"
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
        prevInfo:{

        },
      }
    },
    computed:{
      resultState () {
        return this.$route.params.resultState
      }
    },
    activated () {
      this.init();
    },
    methods:{
      init (){
        let postData = {
          rrid: window.sessionStorage.getItem("rrid")
        }
        this.$axios({
          type: 'get',
          url: '/dabai-chaorenjob/resumeReceived/getResumeReceivedByRRid',
          data: postData,
          fuc: (res) => {
            if(res.code == 1){
              if(res.data.status == 3){
                this.prevInfo.title = "已发送的预约面试信息"
                this.prevInfo.agreedtime = res.data.agreedtime
                this.prevInfo.agreedpath = res.data.agreedpath
                this.prevInfo.agreednote = res.data.agreednote
              }else if(res.data.status == 4){
                this.prevInfo.title = "已发送的不合适信息"
                this.prevInfo.mark = res.data.mark;
              }else{
                this.prevInfo = {};
              }
            }
            console.log( res)
          }
        })
      },
      _mark (){
        let postData = {
          rrid: window.sessionStorage.getItem("rrid"),
          mark: this.form.leav
        }
        this.$axios({
          type: 'post',
          url: '/dabai-chaorenjob/resumeReceived/markFail',
          data: postData,
          fuc: (res) => {
            if(res.code == 1){
            }
            console.log( res)
          }
        })
      },
      _invite (){
        let postData = {
          rrid: window.sessionStorage.getItem("rrid"),
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
          path:"/resumeDetail"
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
