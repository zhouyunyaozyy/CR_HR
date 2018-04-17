<template>
  <div class="recruit_detail">
    <div class="recruit_screen">
      <div class="recruit_title">
        <span>简历筛选</span>
      </div>
      <el-form
        :model="screenData"
        status-icon
        label-width="110px"
        class="recruit_cont">
        <el-form-item label='姓名搜索'>
          <div class="md">
            <el-input
              placeholder="如乘务员、飞行员、机务等"
              maxlength="20"
              v-model="screenData.name"></el-input>
          </div>
        </el-form-item>
        <el-form-item label='基本信息'>
          <div class="md">
            <el-select v-model='screenData.gender' placeholder='性别'>
              <el-option
                v-for='item in localData.gender'
                :label='item.name'
                :key='item.code'
                :value='item.code'></el-option>
            </el-select>
          </div>
          <div class="md">
            <el-select v-model='screenData.education' placeholder='学历'>
              <el-option
                v-for='item in localData.education'
                :label='item.name'
                :key='item.code'
                :value='item.code'></el-option>
            </el-select>
          </div>
          <div class="xl">
            <el-input
              type="number"
              placeholder="年龄(岁)"
              v-model="screenData.age"></el-input>
          </div>
          <span>至</span>
          <div class="xl">
            <el-input
              type="number"
              placeholder="年龄(岁)"
              v-model="screenData.age2"></el-input>
          </div>
          <div class="xl">
            <el-input
              type="number"
              placeholder="身高(cm)"
              v-model="screenData.height"></el-input>
          </div>
          <span>至</span>
          <div class="xl">
            <el-input
              type="number"
              placeholder="身高(cm)"
              v-model="screenData.height2"></el-input>
          </div>
          <div class="xl">
            <el-input
              type="number"
              placeholder="体重(kg)"
              v-model="screenData.weight"></el-input>
          </div>
          <span>至</span>
          <div class="xl">
            <el-input
              type="number"
              placeholder="体重(kg)"
              v-model="screenData.weight2"></el-input>
          </div>
          <div class="md">
            <el-select v-model='screenData.leftVision' placeholder='裸眼视力左眼'>
              <el-option
                v-for='item in localData.vision'
                :label='item.name'
                :key='item.code'
                :value='item.code'></el-option>
            </el-select>
          </div>
          <span>至</span>
          <div class="md">
            <el-select v-model='screenData.leftVision2' placeholder='裸眼视力左眼'>
              <el-option
                v-for='item in localData.vision'
                :label='item.name'
                :key='item.code'
                :value='item.code'></el-option>
            </el-select>
          </div>
          <div class="md">
            <el-select v-model='screenData.rightVision' placeholder='裸眼视力右眼'>
              <el-option
                v-for='item in localData.vision'
                :label='item.name'
                :key='item.code'
                :value='item.code'></el-option>
            </el-select>
          </div>
          <span>至</span>
          <div class="md">
            <el-select v-model='screenData.rightVision2' placeholder='裸眼视力右眼'>
              <el-option
                v-for='item in localData.vision'
                :label='item.name'
                :key='item.code'
                :value='item.code'></el-option>
            </el-select>
          </div>
        </el-form-item>
        <el-form-item label="经验能力">
          <div class="md">
            <el-select v-model='screenData.workExp' placeholder='工作经验'>
              <el-option
                v-for='item in localData.offerExperience'
                :label='item.name'
                :key='item.code'
                :value='item.code'></el-option>
            </el-select>
          </div>
          <div class="md">
            <el-input
              placeholder="熟悉小语种"
              v-model="screenData.lang"></el-input>
          </div>
        </el-form-item>
        <el-form-item label='状态筛选'>
          <div class="md">
            <el-select v-model='screenData.status' placeholder='所有'>
              <el-option
                v-for='item in localData.overVoteStatusEnum'
                :label='item.name'
                :key='item.code'
                :value='item.code'></el-option>
            </el-select>
          </div>
          <div class="md">
            <el-select v-model='screenData.sure' placeholder='所有'>
              <el-option
                v-for='item in localData.reservationState'
                :label='item.name'
                :key='item.code'
                :value='item.code'></el-option>
            </el-select>
          </div>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="init()">查找</el-button>
          <el-button @click="submitForm()" type="warning" plain>清空条件</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="recruit_list">
      <div class="recruit_list_title">-{{jobName}}-</div>
      <div class="recruit_list_btn">
        <div class="recruit_left_btn">
          <el-checkbox
            v-model="checkState"
            @change="checkAll">全选</el-checkbox>
          <span @click="changePattern(false)"><i></i>大图</span>
          <span @click="changePattern(true)"><i></i>列表</span>
        </div>
        <div class="recruit_right_btn">
          <div class="export_btn">
            <el-button  @click="" plain>导出word简历</el-button>
            <el-button  @click="" plain>导出excel名单</el-button>
          </div>
          <div class="state_btn">
            <el-button type="primary" @click="" plain>待评审</el-button>
            <el-button type="primary" @click="" plain>邀请面试</el-button>
            <el-button type="primary" @click="" plain>不合适</el-button>
          </div>
        </div>
      </div>
      <div class="recruit_list_cont">
        <el-row v-if="!pattern" class="chart_list">
          <el-checkbox-group v-model="checkedCities" @change="checkItem">
            <el-col
              v-for="item in tableData" :xs="24" :sm="12" :md="8" :lg="8" :xl="6" :key='item.rrid'
              class="chart_item">
              <div class="chart_cont">
                <div class="chart_img">
                  <el-checkbox :label="item.rrid"></el-checkbox>
                  <img :src="item.headerUrl" alt="">
                </div>
                <div class="chart_txt">
                  <div class="chart_txt_item">
                    <span class="chart_txt_name">姓名:</span>
                    <span class="chart_txt_text">{{item.name}}</span>
                  </div>
                  <div class="chart_txt_item">
                    <span class="chart_txt_name">性别:</span>
                    <span v-for="item1 in localData.gender" v-if="item1.code == item.gender" class="chart_txt_text">{{item1.name}}</span>
                  </div>
                  <div class="chart_txt_item">
                    <span class="chart_txt_name">年龄:</span>
                    <span class="chart_txt_text">{{item.age}}</span>
                  </div>
                  <div class="chart_txt_item">
                    <span class="chart_txt_name">学历:</span>
                    <span v-for="item1 in localData.education" v-if="item1.code == item.education" class="chart_txt_text">{{item1.name}}</span>
                  </div>
                  <div class="chart_txt_item">
                    <span class="chart_txt_name">工作经验:</span>
                    <span v-for="item1 in localData.offerExperience" v-if="item1.code == item.experience" class="chart_txt_text">{{item1.name}}</span>
                  </div>
                  <div class="chart_txt_item">
                    <span class="chart_txt_name">简历状态:</span>
                    <span v-for="item1 in localData.overVoteStatusEnum" v-if="item1.code == item.status" class="chart_txt_text">{{item1.name}}</span>
                  </div>
                  <div class="chart_txt_btn">
                    <el-button @click="_detail(item.rrid)" type="primary">查看</el-button>
                    <el-button type="warning" plain>拒绝</el-button>
                  </div>
                </div>
              </div>
            </el-col>
          </el-checkbox-group>
        </el-row>
        <div v-if="pattern" class="list_list">
          <el-checkbox-group v-model="checkedCities" @change="checkItem">
            <el-table
              :data="tableData"
              style="width: 100%">
              <el-table-column
                prop="headerUrl"
                label="照片"
                min-width="90">
                <template slot-scope="scope">
                  <div class="check_cont">
                    <el-checkbox :label="scope.row.rrid"></el-checkbox>
                    <img class="avatar" :src="scope.row.headerUrl" alt="">
                  </div>
                </template>
              </el-table-column>
              <el-table-column
                prop="name"
                label="姓名"
                min-width="80">
              </el-table-column>
              <el-table-column
                prop="gender"
                label="性别"
                min-width="50">
                <template slot-scope="scope">
                  <span
                    v-for="item1 in localData.gender"
                    v-if="item1.code == scope.row.gender">{{item1.name}}</span>
                </template>
              </el-table-column>
              <el-table-column
                prop="age"
                label="年龄"
                min-width="50">
              </el-table-column>
              <el-table-column
                prop="height"
                label="身高"
                min-width="70">
              </el-table-column>
              <el-table-column
                prop="weight"
                label="体重"
                min-width="70">
              </el-table-column>
              <el-table-column
                prop="vision_left"
                label="裸眼视力(左眼)"
                min-width="140">
                <template slot-scope="scope">
                  <span
                    v-for="item1 in localData.vision"
                    v-if="item1.code == scope.row.vision_left">{{item1.name}}</span>
                </template>
              </el-table-column>
              <el-table-column
                prop="vision_right"
                label="裸眼视力(右眼)"
                min-width="140">
                <template slot-scope="scope">
                  <span
                    v-for="item1 in localData.vision"
                    v-if="item1.code == scope.row.vision_right">{{item1.name}}</span>
                </template>
              </el-table-column>
              <el-table-column
                prop="experience"
                label="工作经验"
                min-width="80">
                <template slot-scope="scope">
                  <span
                    v-for="item1 in localData.offerExperience"
                    v-if="item1.code == scope.row.experience">{{item1.name}}</span>
                </template>
              </el-table-column>
              <el-table-column
                prop="education"
                label="学历"
                min-width="80">
                <template slot-scope="scope">
                  <span
                    v-for="item1 in localData.education"
                    v-if="item1.code == scope.row.education">{{item1.name}}</span>
                </template>
              </el-table-column>
              <el-table-column
                :show-overflow-tooltip="true"
                prop="language"
                label="熟悉小语种"
                min-width="100">
              </el-table-column>
              <el-table-column
                label="评审结果"
                min-width="80">
                <template slot-scope="scope">
                  <span v-if="scope.row.status != 5">/</span>
                  <span v-else>{{scope.row.auditor_success+"通过/"+scope.row.auditor_fail+"否决"}}</span>
                </template>
              </el-table-column>
              <el-table-column
                prop="status"
                label="简历状态"
                min-width="80">
                <template slot-scope="scope">
                  <span
                    v-for="item1 in localData.overVoteStatusEnum"
                    v-if="item1.code == scope.row.status">{{item1.name}}</span>
                </template>
              </el-table-column>
              <el-table-column
                min-width="80">
                <template slot-scope="scope">
                  <el-button @click="_detail(scope.row.rrid)" type="primary" plain>查看</el-button>
                </template>
              </el-table-column>
            </el-table>
          </el-checkbox-group>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "recruitList",
    data () {
      return {
        jobName: "",
        jid:"",
        // screen:{
        //   name:11,
        //   gender: '',           //  性别
        //   education: '',        //  学历
        //   age: '',              //  年龄
        //   age2: '',             //  年龄
        //   height: '',           //  身高
        //   height2: '',          //  身高
        //   weight: '',           //  体重
        //   weight2: '',          //  体重
        //   leftVision: '',       //  左眼视力
        //   leftVision2: '',      //  左眼视力
        //   rightVision: '',      //  右眼视力
        //   rightVision2: '',     //  右眼视力
        //   workExp: '',          //  工作经验
        //   lang: '',             //  语种
        //   status:"6",
        //   reservationState:"4"
        // },
        tableData:[],
        localData: JSON.parse(window.sessionStorage.getItem("localData")),
        pattern:false,
        screenData:{},
        checkState: false,
        checkSum: 0,
        checkedAllName: [],
        checkedCities:[],
      }
    },
    computed:{
    },
    activated () {
      this.jobName = window.sessionStorage.getItem("jobName");
      this.jid = window.sessionStorage.getItem("jid")
      this.getDetail();
    },
    methods:{
      init(){
        let screenArr = {
          jid: this.jid
        }
        console.log(this.jobName,screenArr)
        if(this.screenData.name){
          screenArr.name = this.screenData.name
        }
        if(this.screenData.gender){
          screenArr.gender = this.screenData.gender
        }
        if(this.screenData.education){
          screenArr.education = this.screenData.education
        }
        if(this.screenData.age){
          screenArr.minAge = this.screenData.age
        }
        if(this.screenData.age2){
          screenArr.maxAge = this.screenData.age2
        }
        if(this.screenData.height){
          screenArr.minHeight = this.screenData.height
        }
        if(this.screenData.height2){
          screenArr.maxHeight = this.screenData.height2
        }
        if(this.screenData.weight){
          screenArr.minWeight = this.screenData.weight
        }
        if(this.screenData.weight2){
          screenArr.maxWeight = this.screenData.weight2
        }
        if(this.screenData.leftVision){
          screenArr.minVisionLeft = this.screenData.leftVision
        }
        if(this.screenData.leftVision2){
          screenArr.maxVisionLeft = this.screenData.leftVision2
        }
        if(this.screenData.rightVision){
          screenArr.minVisionRight = this.screenData.rightVision
        }
        if(this.screenData.rightVision2){
          screenArr.maxVisionRight = this.screenData.rightVision2
        }
        if(this.screenData.workExp){
          screenArr.experience = this.screenData.workExp
        }
        if(this.screenData.lang){
          screenArr.language = this.screenData.lang
        }
        if(this.screenData.status){
          screenArr.status = this.screenData.status
        }
        if(this.screenData.sure){
          screenArr.sure = this.screenData.sure
        }
        this.$axios({
          type: 'get',
          url: '/dabai-chaorenjob/resumeReceived/getResumeReceivedListByJid',
          data:screenArr,
          fuc: (res) => {
            if(res.code == 1){
              this.tableData = res.data.data;
              for(let i = 0;i<this.tableData.length;i++){
                this.checkedAllName[i] = this.tableData[i].rrid
              }
            }
            console.log( res)
          }
        })
      },
      getDetail (){
        let resultData = {
          jid:this.jid
        };
        this.$axios({
          type: 'get',
          url: '/dabai-chaorenjob/job/getJob',
          data: resultData,
          fuc: (res) => {
            // 获取详情
            if(res.code == 1){
              this.screenData = JSON.parse(res.data.search_config_json)

              this.init();
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
      changePattern (state) {
        this.pattern = state;
      },
      _detail(rrid){
        window.sessionStorage.setItem("rrid",rrid)
        this.$router.push("/resumeDetail")
      },
      checkItem(val){
        if(val){
          this.checkSum++
        }else{
          this.checkSum--
        }
        if(this.tableData.length == this.checkSum){
          this.checkState = true;
        }else{
          this.checkState = false;
        }
      },
      checkAll(val) {
        if(val){
          this.checkedCities = this.checkedAllName
          this.checkSum = this.tableData.length;
        }else{
          this.checkedCities = [];
          this.checkSum = 0;
        }
      },
    }
  }
</script>
<style>
  .recruit_cont .el-form-item__content{
    display: flex;
  }
  .recruit_cont .el-form-item{
    margin: 0;
    padding: 5px 0;
    border-bottom: 1px solid #eff9ff;
  }
  .recruit_cont .el-form-item:nth-child(4),.recruit_cont .el-form-item:nth-child(5){
    border-bottom: 0;
  }
  .recruit_cont .el-button{
    height: 30px;
    width: 130px;
    margin: 0 5px;
    padding: 0;
  }
  .recruit_cont .el-form-item__label{
    padding-left: 20px;
    text-align: left;
    font-size: 14px;
    color:#4c4c4c;
  }
  .recruit_list .el-checkbox__inner{
    width: 20px;
    height: 20px;
    border-radius: 50%;
  }
  .recruit_list_cont .el-checkbox__label{
    width: 0;
    color:transparent;
  }
  .recruit_list_cont .el-checkbox__input.is-checked+.el-checkbox__label{
    width: 0;
    color:transparent;
  }
  .recruit_list .el-checkbox__inner::after {
    left: 7px;
    height: 12px;
  }
  .chart_img .el-checkbox{
    position: absolute;
    top:5px;
    left: 5px;
    color:transparent;
  }
  .export_btn .el-button{
    height: 25px;
    width: 120px;
    padding: 0;
  }
  .state_btn .el-button{
    height: 30px;
    width: 120px;
    padding: 0;
  }
  .chart_txt_btn .el-button{
    width: 75px;
    height: 25px;
    padding: 0;
  }
  .list_list .el-table th{
    font-weight: 200;
    font-size: 16px;
    color:#333;
  }
  .list_list .el-table th:first-child{
    padding-left: 30px;
  }
  .list_list .el-table td{
    font-size: 14px;
    color:#4c4c4c;
  }
  .list_list .el-table td,.list_list .el-table th.is-leaf{
    border-bottom-color:#eff9ff;
  }
  .list_list .el-button{
    width: 70px;
    height: 30px;
    padding: 0;
  }
</style>
<style scoped>
  .recruit_screen{
    background-color: #fff;
    margin-bottom: 10px;
    padding-bottom: 10px;
  }
  .recruit_title{
    line-height: 60px;
    padding-left: 20px;
    font-size: 16px;
    color:#333;
  }
  .xl {
    height: 30px;
    width: 90px;
    margin: 0 5px;
  }
  .md {
    height: 30px;
    width: 130px;
    margin: 0 5px;
  }
  .recruit_cont span{
    margin: 0 5px;
    color:#4c4c4c;
    font-size: 14px;
  }
  /*recruit_list*/
  .recruit_list{
    /*background-color: #fff;*/
  }
  .recruit_list_title{
    line-height: 40px;
    padding-left: 10px;
    font-size: 16px;
    color:#333;
    background-color: #fff;
  }
  .recruit_list_btn{
    display: flex;
    height: 55px;
    align-items: center;
    padding: 0 10px;
    background-color: #fff;
  }
  .recruit_left_btn{
    flex: 1;
  }
  .recruit_right_btn{
    flex: 0 0 860px;
    display: flex;
    justify-content: space-between;
  }
  .state_btn{
    padding-right: 50px;
  }
  .chart_cont{
    background-color: #fff;
    border-radius: 5px;
    margin: 2px 2px 0 0;
    height: 220px;
    display: flex;
  }
  .chart_img{
    height: 100%;
    flex: 0 0 205px;
    padding: 17px 10px;
    position: relative;
  }
  .chart_img img{
    width: 185px;
    height: 185px;
    border-radius: 5px;
  }
  .chart_txt{
    flex: 1;
    padding: 17px 0;
  }
  .chart_txt_item{
    font-size: 0;
    padding-bottom: 6px;
  }
  .chart_txt_name{
    font-size: 14px;
    color:#4c4c4c;
  }
  .chart_txt_text{
    font-size: 14px;
    color:#333;
  }
  .chart_txt_btn{
    padding-top: 3px;
    display: flex;
    justify-content: space-between;
    padding-right: 20px;
  }
  /*list_list*/
  .avatar{
    width: 50px;
    height: 50px;
    border-radius: 2px;
    border: 1px solid #ccc;
    margin-left: 10px;
  }
  .check_cont{
    display: flex;
    align-items: center;
  }
</style>
