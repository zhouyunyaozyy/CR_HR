<template>
  <div class="recruit_detail">
    <div class="recruit_screen">
      <div class="recruit_title">
        <span>简历筛选</span>
      </div>
      <el-form
        :model="screen"
        status-icon
        label-width="110px"
        class="recruit_cont">
        <el-form-item label='姓名搜索'>
          <div class="md">
            <el-input
              placeholder="如乘务员、飞行员、机务等"
              maxlength="20"
              v-model="screen.name"></el-input>
          </div>
        </el-form-item>
        <el-form-item label='基本信息'>
          <div class="md">
            <el-select v-model='screen.gender' placeholder='性别'>
              <el-option
                v-for='item in localData.gender'
                :label='item.name'
                :key='item.code'
                :value='item.code'></el-option>
            </el-select>
          </div>
          <div class="md">
            <el-select v-model='screen.education' placeholder='学历'>
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
              v-model="screen.age"></el-input>
          </div>
          <span>至</span>
          <div class="xl">
            <el-input
              type="number"
              placeholder="年龄(岁)"
              v-model="screen.age2"></el-input>
          </div>
          <div class="xl">
            <el-input
              type="number"
              placeholder="身高(cm)"
              v-model="screen.height"></el-input>
          </div>
          <span>至</span>
          <div class="xl">
            <el-input
              type="number"
              placeholder="身高(cm)"
              v-model="screen.height2"></el-input>
          </div>
          <div class="xl">
            <el-input
              type="number"
              placeholder="体重(kg)"
              v-model="screen.weight"></el-input>
          </div>
          <span>至</span>
          <div class="xl">
            <el-input
              type="number"
              placeholder="体重(kg)"
              v-model="screen.weight2"></el-input>
          </div>
          <div class="md">
            <el-select v-model='screen.leftVision' placeholder='裸眼视力左眼'>
              <el-option
                v-for='item in localData.vision'
                :label='item.name'
                :key='item.code'
                :value='item.code'></el-option>
            </el-select>
          </div>
          <span>至</span>
          <div class="md">
            <el-select v-model='screen.leftVision2' placeholder='裸眼视力左眼'>
              <el-option
                v-for='item in localData.vision'
                :label='item.name'
                :key='item.code'
                :value='item.code'></el-option>
            </el-select>
          </div>
          <div class="md">
            <el-select v-model='screen.rightVision' placeholder='裸眼视力右眼'>
              <el-option
                v-for='item in localData.vision'
                :label='item.name'
                :key='item.code'
                :value='item.code'></el-option>
            </el-select>
          </div>
          <span>至</span>
          <div class="md">
            <el-select v-model='screen.rightVision2' placeholder='裸眼视力右眼'>
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
            <el-select v-model='screen.workExp' placeholder='工作经验'>
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
              v-model="screen.lang"></el-input>
          </div>
        </el-form-item>
        <el-form-item label='状态筛选'>
          <div class="md">
            <el-select v-model='screen.status' placeholder='所有'>
              <el-option
                v-for='item in localData.overVoteStatusEnum'
                :label='item.name'
                :key='item.code'
                :value='item.code'></el-option>
            </el-select>
          </div>
          <div class="md">
            <el-select v-model='screen.reservationState' placeholder='所有'>
              <el-option
                v-for='item in localData.reservationState'
                :label='item.name'
                :key='item.code'
                :value='item.code'></el-option>
            </el-select>
          </div>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm()">查找</el-button>
          <el-button @click="submitForm()" type="warning" plain>清空条件</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="recruit_list">
      <div class="recruit_list_title">-飞行员招聘详情-</div>
      <div class="recruit_list_btn">
        <div class="recruit_left_btn">
          <el-checkbox
            v-model="checkAll"
            @change="">全选</el-checkbox>
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
            <el-button type="primary" @click="" plain>预约面试</el-button>
            <el-button type="primary" @click="" plain>不合适</el-button>
          </div>
        </div>
      </div>
      <div class="recruit_list_cont">
        <el-row v-if="!pattern" class="chart_list">
          <el-col v-for="item in tableData" :xs="24" :sm="12" :md="8" :lg="8" :xl="6" :key='item.rrid' class="chart_item">
            <div class="chart_cont">
              <div class="chart_img">
                <el-checkbox
                  v-model="checkItem"
                  @change=""></el-checkbox>
                <img :src="item.headerUrl" alt="">
              </div>
              <div class="chart_txt">
                <div class="chart_txt_item">
                  <span class="chart_txt_name">姓名:</span>
                  <span class="chart_txt_text">{{item.name}}</span>
                </div>
                <div class="chart_txt_item">
                  <span class="chart_txt_name">性别:</span>
                  <span class="chart_txt_text">{{item.gender}}</span>
                </div>
                <div class="chart_txt_item">
                  <span class="chart_txt_name">年龄:</span>
                  <span class="chart_txt_text">{{item.age}}</span>
                </div>
                <div class="chart_txt_item">
                  <span class="chart_txt_name">学历:</span>
                  <span class="chart_txt_text">{{item.education}}</span>
                </div>
                <div class="chart_txt_item">
                  <span class="chart_txt_name">工作经验:</span>
                  <span class="chart_txt_text">{{item.workExp}}</span>
                </div>
                <div class="chart_txt_item">
                  <span class="chart_txt_name">简历状态:</span>
                  <span class="chart_txt_text">{{item.overVoteStatusEnum}}</span>
                </div>
                <div class="chart_txt_btn">
                  <el-button @click="_detail()" type="primary">查看</el-button>
                  <el-button type="warning" plain>拒绝</el-button>
                </div>
              </div>
            </div>
          </el-col>
        </el-row>
        <div v-if="pattern" class="list_list">
          <el-table
            :data="tableData"
            style="width: 100%">
            <el-table-column
              prop="headerUrl"
              label="照片"
              min-width="90">
              <template slot-scope="scope">
                <div class="check_cont">
                  <el-checkbox
                    :key="checkItem[scope.$index]"></el-checkbox>
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
              prop="leftVision"
              label="裸眼视力(左眼)"
              min-width="140">
            </el-table-column>
            <el-table-column
              prop="rightVision"
              label="裸眼视力(右眼)"
              min-width="140">
            </el-table-column>
            <el-table-column
              prop="workExp"
              label="工作经验"
              min-width="80">
            </el-table-column>
            <el-table-column
              prop="education"
              label="学历"
              min-width="80">
            </el-table-column>
            <el-table-column
              :show-overflow-tooltip="true"
              prop="lang"
              label="熟悉小语种"
              min-width="100">
            </el-table-column>
            <el-table-column
              prop="reservationState"
              label="预约确认"
              min-width="80">
            </el-table-column>
            <el-table-column
              prop="review"
              label="评审结果"
              min-width="80">
            </el-table-column>
            <el-table-column
              prop="overVoteStatusEnum"
              label="简历状态"
              min-width="80">
            </el-table-column>
            <el-table-column
              min-width="80">
              <template slot-scope="scope">
                <el-button @click="_detail()" type="primary" plain>查看</el-button>
              </template>
            </el-table-column>
          </el-table>
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
        screen:{
          name:11,
          gender: '',           //  性别
          education: '',        //  学历
          age: '',              //  年龄
          age2: '',             //  年龄
          height: '',           //  身高
          height2: '',          //  身高
          weight: '',           //  体重
          weight2: '',          //  体重
          leftVision: '',       //  左眼视力
          leftVision2: '',      //  左眼视力
          rightVision: '',      //  右眼视力
          rightVision2: '',     //  右眼视力
          workExp: '',          //  工作经验
          lang: '',             //  语种
          status:"6",
          reservationState:"4"
        },
        tableData:[
          {
            jname:"你打打你打打你打打你打打你打打你打打你打打",
            headerUrl:"https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1523611738229&di=e82e984379fa70616e2892697cab6a3a&imgtype=0&src=http%3A%2F%2Fwww.downxia.com%2Fuploadfiles%2F2015%2F1123%2F20151123043522156.jpg",
            name:"糖糖",
            gender:"男",
            age:"31",
            height:"185",
            weight:"45",
            leftVision:"1.0",
            rightVision:"1.0",
            workExp:"无经验",
            education:"小学",
            lang:"小学话",
            reservationState:"未确",
            review:"/",
            overVoteStatusEnum:"未查看"
          },
          {
            jname:"你打打你打打你打打你打打你打打你打打你打打",
            headerUrl:"https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1523611738229&di=e82e984379fa70616e2892697cab6a3a&imgtype=0&src=http%3A%2F%2Fwww.downxia.com%2Fuploadfiles%2F2015%2F1123%2F20151123043522156.jpg",
            name:"糖糖",
            gender:"男",
            age:"31",
            height:"185",
            weight:"45",
            leftVision:"1.0",
            rightVision:"1.0",
            workExp:"无经验",
            education:"小学",
            lang:"小学话",
            reservationState:"未确",
            review:"/",
            overVoteStatusEnum:"未查看"
          },
          {
            jname:"你打打你打打你打打你打打你打打你打打你打打",
            headerUrl:"https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1523611738229&di=e82e984379fa70616e2892697cab6a3a&imgtype=0&src=http%3A%2F%2Fwww.downxia.com%2Fuploadfiles%2F2015%2F1123%2F20151123043522156.jpg",
            name:"糖糖",
            gender:"男",
            age:"31",
            height:"185",
            weight:"45",
            leftVision:"1.0",
            rightVision:"1.0",
            workExp:"无经验",
            education:"小学",
            lang:"小学话",
            reservationState:"未确",
            review:"/",
            overVoteStatusEnum:"未查看"
          },
          {
            jname:"你打打你打打你打打你打打你打打你打打你打打",
            headerUrl:"https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1523611738229&di=e82e984379fa70616e2892697cab6a3a&imgtype=0&src=http%3A%2F%2Fwww.downxia.com%2Fuploadfiles%2F2015%2F1123%2F20151123043522156.jpg",
            name:"糖糖",
            gender:"男",
            age:"31",
            height:"185",
            weight:"45",
            leftVision:"1.0",
            rightVision:"1.0",
            workExp:"无经验",
            education:"小学",
            lang:"小学话",
            reservationState:"未确",
            review:"/",
            overVoteStatusEnum:"未查看"
          }
        ],
        checkItem: [],
        localData: JSON.parse(window.sessionStorage.getItem("localData")),
        checkAll:false,
        pattern:false,
      }
    },
    methods:{
      changePattern (state) {
        this.pattern = state;
      },
      _detail(){
        this.$router.push("/resumeDetail")
      }
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
  .chart_img .el-checkbox{
    position: absolute;
    top:5px;
    left: 5px;
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
