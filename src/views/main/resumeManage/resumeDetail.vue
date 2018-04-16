<template>
  <div class="resume_detail">
    <div class="detail_head">
      <div class="head_info">
        <div class="head_left">
          <div class="head_avatar">
            <img src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1523616118359&di=7be774622f3f9675cf6a4b437ce1ddc7&imgtype=0&src=http%3A%2F%2Fd.hiphotos.baidu.com%2Fzhidao%2Fwh%253D450%252C600%2Fsign%3D88c8f471f9039245a1e0e90bb2a488f4%2F9a504fc2d5628535aedbd09d95ef76c6a7ef6356.jpg" alt="">
          </div>
          <div class="head_txt">
            <div class="head_name">{{detailData.name}}</div>
            <div class="head_apply">应聘职位：<span>{{jobName}}</span></div>
          </div>
        </div>
        <div class="head_right">
          <el-button @click="_result(1)" type="primary" plain>邀请面试</el-button>
          <el-button @click="_result(2)" type="primary" plain>不合适</el-button>
        </div>
      </div>
      <div class="head_btn">
        <div class="head_export_btn">
          <el-button type="primary" plain>
            <i class="iconfont icon-xiaoxi"></i>
            在线沟通
          </el-button>
          <el-button type="primary" plain>
            <i class="iconfont icon-shoucang"></i>
            收藏
          </el-button>
          <el-button plain>导出简历</el-button>
        </div>
        <div class="head_review">
          <div class="review_result">
            <span class="">评审结果：</span>
            <span class="review_num">2 通过</span>
            <span class="">&nbsp;(塔塔，全球) / &nbsp;</span>
            <span class="review_txt">1 否决</span>
            <span class="">&nbsp;(凯凯)</span>
          </div>
          <el-button @click="_review()" type="primary" plain>待评审</el-button>
        </div>
      </div>
    </div>
    <div class="detail_tab">
      <span class="detail_tab_item">详细信息</span>
      <span class="detail_tab_item is_active">处理记录</span>
    </div>
    <div class="detail_info" v-show="state == 1">
      <el-row>
        <el-col :xs="13" :sm="13" :md="13" :lg="13" :xl="13" class="detail_info_left">
          <div class="job_wanted">
            <div class="detail_info_title">求职意向</div>
            <div class="detail_info_job">飞行员</div>
            <div class="detail_info_title">基本信息</div>
            <div class="job_want_cont">
              <div class="job_want_left">
                <div class="job_want_item">姓名：<span>{{detailData.name}}</span></div>
                <div class="job_want_item"
                     v-for='item in localData.gender'
                     v-if='item.code == detailData.gender'>
                  性别：<span>{{item.name}}</span>
                </div>
                <div class="job_want_item">年龄：<span>{{detailData.age}}</span></div>
                <div class="job_want_item"
                     v-for='item in localData.ethnicity'
                     v-if='item.code == detailData.ethnicity'>
                  民族：<span>{{item.name}}</span>
                </div>
                <div class="job_want_item"
                     v-for='item in localData.area'
                     v-if="item.code == (detailData.birthplace+'').slice(0,2)+'0000'">
                  <div v-for='item1 in item.children'
                       v-if="item1.code == (detailData.birthplace+'').slice(0,4)+'00'">
                    <div v-for='item2 in item1.children'
                         v-if='item2.code == detailData.birthplace'>
                      籍贯：<span>{{item.name}}</span>
                    </div>
                  </div>
                </div>
                <div class="job_want_item"
                     v-for='item in localData.wedding'
                     v-if='item.code == detailData.wedding'>
                  婚姻状况：<span>{{item.name}}</span>
                </div>
                <div class="job_want_item"
                     v-for='item in localData.political'
                     v-if='item.code==detailData.political_status'>
                  政治面貌：<span>{{item.name}}</span>
                </div>
                <div class="job_want_item">身高：<span>{{detailData.height}}CM</span></div>
                <div class="job_want_item">体重：<span>{{detailData.weight}}KG</span></div>
                <div class="job_want_item"
                     v-for='item in localData.vision'
                     v-if='item.code == detailData.vision_left'>
                  裸眼视力(左眼)：<span>{{item.name}}</span>
                </div>
                <div class="job_want_item"
                     v-for='item in localData.vision'
                     v-if='item.code == detailData.vision_right'>
                  裸眼视力(右眼)：<span>{{item.name}}</span>
                </div>
              </div>
              <div class="job_want_right">
                <div class="job_want_item"
                     v-for='item in localData.mandarin'
                     v-if='item.code==detailData.mandarin'>
                  普通话水平：<span>{{item.name}}</span>
                </div>
                <div class="job_want_item"
                     v-for='item in localData.english'
                     v-if='item.code==detailData.english'>
                  英语水平：<span>{{item.name}}</span>
                </div>
                <div class="job_want_item">熟练小语种：
                  <span>{{detailData.language || "无"}}</span>
                </div>
                <div class="job_want_item"
                     v-for='item in localData.education'
                     v-if='item.code==detailData.education'>
                  最高学历：<span>{{item.name}}</span>
                </div>
                <div class="job_want_item"
                     v-for='item in localData.offerExperience'
                     v-if='item.code==detailData.experience'>
                  工作经验：<span>{{item.name}}</span>
                </div>
                <div class="job_want_item"
                     v-for='item in localData.offerState'
                     v-if='item.code==detailData.status_resume'>
                  任职状态：<span>{{item.name}}</span>
                </div>
                <div class="job_want_item">联系电话：<span>{{detailData.tel}}</span></div>
                <div class="job_want_item">身份证：<span>{{detailData.idno}}</span></div>
              </div>
            </div>
          </div>
          <div class="job_exp" v-if="experience_item.length > 0">
            <div class="detail_info_title">工作经历</div>
            <div class="job_exp_cont">
              <div class="job_exp_cont_item"
                   v-for='item in experience_item'>
                <div class="job_exp_item" v-if='item.endtime==88888888888888'>
                  任职时间：<span>{{
                  new Date(parseInt(item.starttime)).getFullYear()
                  +'.'
                  +(new Date(parseInt(item.starttime)).getMonth()+1)
                  +'-至今'
                  }}</span>
                </div>
                <div v-else class="job_exp_item">
                  任职时间：<span>{{
                  new Date(parseInt(item.starttime)).getFullYear()
                  +'.'
                  +(new Date(parseInt(item.starttime)).getMonth()+1)
                  +'-'
                  +new Date(parseInt(item.endtime)).getFullYear()
                  +'.'
                  +(new Date(parseInt(item.endtime)).getMonth()+1)
                  }}</span>
                </div>
                <div class="job_exp_item">任职公司：<span>{{item.cname}}</span></div>
                <div class="job_exp_item">职 位：<span>{{item.job}}</span></div>
                <div class="job_exp_item">
                  工作描述：<span v-html="">{{item.profile}}</span>
                </div>
              </div>
            </div>
          </div>
          <div class="job_exp" v-if="education_item.length > 0">
            <div class="detail_info_title">教育经历</div>
            <div class="job_exp_cont">
              <div class="job_exp_cont_item"
                   v-for='item in education_item'>
                <div class="job_exp_item"
                     v-if='item.graduation_time==88888888888888'>
                  就读时间：<span>{{
                  new Date(parseInt(item.admission_time)).getFullYear()
                  +'.'
                  +(new Date(parseInt(item.admission_time)).getMonth()+1)
                  +'-至今'}}</span>
                </div>
                <div class="job_exp_item" v-else>
                  就读时间：<span>{{
                  new Date(parseInt(item.admission_time)).getFullYear()
                  +'.'
                  +(new Date(parseInt(item.admission_time)).getMonth()+1)
                  +'-'
                  +new Date(parseInt(item.graduation_time)).getFullYear()
                  +'.'
                  +(new Date(parseInt(item.graduation_time)).getMonth()+1)
                  }}</span></div>
                <div class="job_exp_item">毕业学校：<span>{{item.sname}}</span></div>
                <div class="job_exp_item"
                     v-for='item2 in localData.education'
                     v-if='item2.code==item.education'>
                  学 历：<span>{{item2.name}}</span>
                </div>
                <div class="job_exp_item">专 业：<span>{{item.majors}}</span></div>
              </div>
            </div>
          </div>
          <div class="describe">
            <div class="detail_info_title">自我描述</div>
            <div class="describe_cont">{{detailData.profile}}</div>
          </div>
        </el-col>
        <el-col :xs="11" :sm="11" :md="11" :lg="11" :xl="11" class="detail_info_right">
          <div class="image" v-if="detailData.imagesUrl.length > 0">
            <div class="detail_info_title">图片形象</div>
            <div class="image_cont">
              <div class="image_cont_item" v-for='(item,index) in detailData.imagesUrl'>
                <img @click="bigImg(item,index,1)" :src="item" alt="">
              </div>
            </div>
          </div>
          <div class="video" v-if="detailData.videoUrl">
            <div class="detail_info_title">视频形象</div>
            <div class="video_cont">
              <video controls :src="detailData.videoUrl"></video>
            </div>
          </div>
          <div class="certificate" v-if="detailData.skillUrl.length > 0">
            <div class="detail_info_title">证书</div>
            <div class="image_cont">
              <div class="image_cont_item" v-for='(item,index) in detailData.skillUrl'>
                <img @click="bigImg(item.skillUrl,index,2)" :src="item.skillUrl" alt="">
              </div>
            </div>
          </div>
        </el-col>
      </el-row>
      <div class="big_img" v-show="big_src">
        <div class="big_cover" @click="closeBig()"></div>
        <div class="big_cont">
          <span @click="closeBig()" class="big_close iconfont icon-cha"></span>
          <span v-show="isHide" @click="changeBig('prev')" class="big_prev iconfont icon-tiaozhuanjiantou"></span>
          <span v-show="isHide" @click="changeBig('next')" class="big_next iconfont icon-forward"></span>
          <img :src="big_src">
        </div>
      </div>
    </div>
    <div class="handle_record" v-show="state == 2">
      <div class="handle_item">
        <div class="handle_time">
          <div class="time_txt">
            <div class="date_text">2018/10/10</div>
            <div class="time_text">16:16:16</div>
          </div>
        </div>
        <div class="handle_info">
          <img class="dot" src="./../../../assets/dot.png" alt="">
          <div class="info_txt">不合适</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "recruitDetail",
    data (){
      return {
        jobName: window.sessionStorage.getItem("jobName"),
        state:1,
        big_src: "",
        detailData: {},
        localData: JSON.parse(window.sessionStorage.getItem("localData")),
        experience_item:[],
        education_item:[],
        imgType: "",
        imgIndex: "",
        isHide:false,
      }
    },
    activated () {
      this.init();
    },
    methods:{
      init () {
        let getData = {
          rrid:window.sessionStorage.getItem("rrid")
        }
        this.$axios({
          type: 'get',
          url: '/dabai-chaorenjob/resumeReceived/getResumeVoteSnapshotVo',
          data:getData,
          fuc: (res) => {
            if(res.code == 1){
              this.detailData = res.data;
              this.experience_item = JSON.parse(res.data.experience_item)
              this.education_item = JSON.parse(res.data.education_item)
              console.log(JSON.parse(res.data.education_item))
            }
            console.log( res)
          }
        })
      },
      _result (type){
        this.$router.push("/recruitResult/"+type)
      },
      bigImg(src,index,type){
        if(type == 1 && this.detailData.imagesUrl.length > 1){
          this.isHide = true;
        }else if(type == 2 && this.detailData.skillUrl.length > 1){
          this.isHide = true;
        }else{
          this.isHide = false;
        }
        this.imgType = type
        this.imgIndex = index
        this.big_src = src;
      },
      closeBig(){
        this.big_src = "";
      },
      changeBig(btnType){
        if(btnType == "prev"){
          this.imgIndex = this.imgIndex - 1
        }else if(btnType == "next"){
          this.imgIndex = this.imgIndex + 1
        }
        if(this.imgType == 1){
          this.big_src = this.detailData.imagesUrl[this.imgIndex];
        }else{
          this.big_src = this.detailData.skillUrl[this.imgIndex].skillUrl;
        }
      },
      _review (){
        let postData = {
          rrid: this.detailData.rrid
        }
        this.$axios({
          type: 'post',
          url: '/dabai-chaorenjob/resumeReceived/markReview',
          data: postData,
          fuc: (res) => {
            if(res.code == 1){
            }
            console.log( res)
          }
        })
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
    margin: 10px 0;
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
    flex: 0 0 142px;
    border-right: 2px solid #addfff;
    display: flex;
    align-items: center;
    padding-bottom: 20px;
  }
  .time_txt{
    font-size: 16px;
    color:#333;
  }
  .handle_info{
    flex: 1;
    padding-left: 30px;
    padding-bottom: 20px;
    position: relative;
  }
  .info_txt{
    background-color: #f5f5f5;
    padding: 30px 15px;
    font-size: 16px;
    color:#333;
  }
  .dot{
    position: absolute;
    top:50%;
    left: -11px;
    width: 22px;
    height: 22px;
    margin-top: -21px;
  }
  /*detail_info*/
  .detail_info_left>div{
    margin-right: 10px;
    margin-bottom: 10px;
    background-color: #fff;
  }
  .detail_info_right>div{
    margin-bottom: 10px;
    background-color: #fff;
  }
  .detail_info_title{
    padding-left: 40px;
    line-height: 60px;
    color:#333;
    font-size: 16px;
  }
  .job_wanted{
    padding-bottom: 20px;
  }
  .job_want_cont{
    padding: 0 40px;
    display: flex;
  }
  .job_want_left{
    flex: 1;
  }
  .job_want_right{
    flex: 0 0 230px;
  }
  .detail_info_job{
    font-size: 14px;
    color:#4c4c4c;
    padding: 0 0 10px 40px;
  }
  .job_want_item{
    font-size: 14px;
    color:#4c4c4c;
    padding-bottom: 10px;
  }
  /*image_cont*/
  .image_cont{
    padding: 0 20px;
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
  }
  .image_cont_item{
    flex: 0 0 30%;
    width:30%;
    height:0;
    padding-bottom:40%;
    background-color: #333;
    overflow: hidden;
    /*display: table-cell;*/
    position: relative;
    margin-bottom: 20px;
  }
  .image_cont_item>img{
    position:absolute;
    top:0;
    left:0;
    bottom:0;
    right:0;
    margin:auto;
    max-width: 100%;
    /*max-height: 100%;*/
  }
  /*job_exp*/
  .job_exp{
    padding-bottom: 20px;
  }
  .job_exp_item{
    padding-left: 40px;
    font-size: 14px;
    color:#4c4c4c;
    padding-bottom: 10px;
  }
  /*describe_cont*/
  .describe_cont{
    padding: 0 40px 30px;
    font-size: 14px;
    color:#4c4c4c;
    line-height: 25px;
  }
  .video_cont{
    padding: 0 40px 35px;
  }
  .video_cont>video{
    width: 100%;
    height: 265px;
    background-color: #333;
  }
  /*big_img*/
  .big_img{
    position: fixed;
    top:0;
    left: 0;
    right: 0;
    bottom: 0;
    overflow: hidden;
    z-index: 1000;
  }
  .big_cover{
    position: absolute;
    top:0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0,0,0,.5);
  }
  .big_cont{
    position: absolute;
    top:0;
    left: 0;
    right: 0;
    bottom: 0;
    width: 800px;
    height: 600px;
    margin: auto;
    background-color: #000;
  }
  .big_close{
    position: absolute;
    top:10px;
    right:10px;
    color: #fff;
    background-color: rgba(0,0,0,.5);
    z-index: 10;
    width: 30px;
    height: 30px;
    line-height: 30px;
    text-align: center;
    font-size: 15px;
    border-radius: 50%;
  }
  .big_prev{
    position: absolute;
    top:270px;
    left: 20px;
    color: #fff;
    background-color: rgba(0,0,0,.5);
    z-index: 10;
    width: 30px;
    height: 30px;
    line-height: 30px;
    text-align: center;
    font-size: 15px;
    border-radius: 50%;
  }
  .big_next{
    position: absolute;
    top:270px;
    right: 20px;
    color: #fff;
    background-color: rgba(0,0,0,.5);
    z-index: 10;
    width: 30px;
    height: 30px;
    line-height: 30px;
    text-align: center;
    font-size: 15px;
    border-radius: 50%;
  }
  .big_cont>img{
    position: absolute;
    top:0;
    left: 0;
    right: 0;
    bottom: 0;
    margin: auto;
    max-width: 100%;
    max-height: 100%;
  }
</style>
