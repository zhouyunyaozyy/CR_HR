<template>
  <div class="resume_collect">
    <div class="collect_screen">
      <div class="screen_title">简历筛选</div>
      <el-form
        :model="screen"
        label-width="112px"
        class="screen_cont">
        <el-form-item label='状态筛选'>
            <el-select v-model='screen.status' placeholder='所有'>
              <el-option
                v-for='item in localData.overVoteStatusEnum'
                :label='item.name'
                :key='item.code'
                :value='item.code'></el-option>
            </el-select>
            <el-select v-model='screen.reservationState' placeholder='所有'>
              <el-option
                v-for='item in localData.reservationState'
                :label='item.name'
                :key='item.code'
                :value='item.code'></el-option>
            </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm()">查找</el-button>
          <el-button @click="submitForm()" type="warning" plain>清空条件</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="collect_list">
      <div class="collect_title">
        <el-checkbox
          v-model="checkAll"
          @change="handleCheckAllChange">全选</el-checkbox>
        <div class="btn_cont">
          <el-button  @click="" plain>导出简历</el-button>
          <el-button  @click="" plain>导出excel名单</el-button>
        </div>
      </div>
      <div class="collect_cont">
        <el-table
          :data="tableData"
          style="width: 100%">
          <el-table-column
            :show-overflow-tooltip="true"
            prop="jname"
            label="应聘职位"
            min-width="150">
            <template slot-scope="scope">
              <el-checkbox
                :label="scope.row.jname"
                :key="checkedCities[scope.$index]">{{scope.row.jname}}</el-checkbox>
            </template>
          </el-table-column>
          <el-table-column
            prop="headerUrl"
            label="照片"
            min-width="60">
            <template slot-scope="scope">
              <img class="avatar" :src="scope.row.headerUrl" alt="">
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
            min-width="55">
          </el-table-column>
          <el-table-column
            prop="age"
            label="年龄"
            min-width="55">
          </el-table-column>
          <el-table-column
            prop="height"
            label="身高(cm)"
            min-width="95">
          </el-table-column>
          <el-table-column
            prop="weight"
            label="体重(kg)"
            min-width="90">
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
            min-width="90">
          </el-table-column>
          <el-table-column
            prop="education"
            label="学历"
            min-width="60">
          </el-table-column>
          <el-table-column
            :show-overflow-tooltip="true"
            prop="lang"
            label="熟悉小语种"
            min-width="110">
          </el-table-column>
          <el-table-column
            prop="reservationState"
            label="预约确认"
            min-width="90">
          </el-table-column>
          <el-table-column
            prop="review"
            label="评审结果"
            min-width="90">
          </el-table-column>
          <el-table-column
            prop="overVoteStatusEnum"
            label="简历状态"
            min-width="90">
          </el-table-column>
        </el-table>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "resumeCollect",
    data (){
      return {
        screen:{
          status:"6",
          reservationState:"4"
        },
        tableData:[
          {
            jname:"你打打你打打你打打你打打你打打你打打你打打",
            headerUrl:"//www.baidu.com/img/bd_logo1.png?where=super",
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
            headerUrl:"//www.baidu.com/img/bd_logo1.png?where=super",
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
        localData: JSON.parse(window.sessionStorage.getItem("localData")),
        checkAll: false,
        checkedCities:[],
        isIndeterminate: true
      }
    },
    methods: {
      handleCheckAllChange(val) {
        this.checkedCities = val ? cityOptions : [];
        this.isIndeterminate = false;
      },
      handleCheckedCitiesChange(value) {
        let checkedCount = value.length;
        this.checkAll = checkedCount === this.cities.length;
        this.isIndeterminate = checkedCount > 0 && checkedCount < this.cities.length;
      },
      updateExcell () {
        let nowData = {}
        nowData.excelCondition = JSON.stringify([
          {code: 'jname', name: '应聘职位'},
          {code: 'name', name: '姓名'},
          {code: 'gender', name: '性别', json: 'gender'},
          {code: 'age', name: '年龄'},
          {code: 'experience', name: '工作经验', json: 'offerExperience'},
          {code: 'education', name: '学历', json: 'education'},
          {code: 'avsore', name: '分数'},
          {code: 'status', name: '简历状态', json: 'overVoteStatusEnum'}
        ])
        if (this.form.gender !== '' && this.form.gender !== ' ') {
          nowData.gender = this.form.gender
        }
        if (this.form.experience !== '' && this.form.experience !== ' ') {
          nowData.experience = this.form.experience
        }
        if (this.form.education !== '' && this.form.education !== ' ') {
          nowData.education = this.form.education
        }
        if (this.form.status !== '' && this.form.status !== ' ') {
          nowData.status = this.form.status
        }
        if (this.minScore !== '' && this.maxScore !== '') {
          nowData.minScore = this.minScore
          nowData.maxScore = this.maxScore
        }
        ajax({
          url: '/favorite/collectResumeListExcel',
          type: 'post',
          data: {
            data: JSON.stringify(nowData)
          },
          success: (res, data) => {
//            console.log(res, data.headers.get('Content-Content-Disposition'))
//             var eleLink = document.createElement('a')
//             eleLink.download = '简历收藏列表.xls'
//             eleLink.style.display = 'none'
//             // 字符内容转变成blob地
//             var blob = res
//             eleLink.href = URL.createObjectURL(blob)
//             // 触发点击
//             document.body.appendChild(eleLink)
//             eleLink.click()
//             // 然后移除
//             document.body.removeChild(eleLink)
          }
        })
      },
    }
  }
</script>
<style>
  .screen_cont .el-form-item__label{
    padding-left: 20px;
    text-align: left;
    font-size: 16px;
    color:#4c4c4c;
  }
  .screen_cont .el-form-item{
    padding: 10px 0;
    margin: 0;
  }
  .screen_cont .el-input__inner,.screen_cont .el-button{
    height: 30px;
    width: 130px;
    margin: 0 5px;
  }
  .screen_cont .el-button,.collect_title .el-button{
    padding: 0;
  }
  .collect_cont .el-table th{
    font-weight: 200;
    font-size: 16px;
    color:#333;
  }
  .collect_cont .el-table th:first-child{
    padding-left: 30px;
  }
  .collect_cont .el-table td{
    font-size: 14px;
    color:#4c4c4c;
  }
  .collect_cont .el-table td,.collect_cont .el-table th.is-leaf{
    border-bottom-color:#eff9ff;
  }
  .collect_list .el-checkbox__inner{
    width: 20px;
    height: 20px;
    border-radius: 50%;
  }
  .collect_title .btn_cont .el-button{
    height: 25px;
    width: 120px;
  }
</style>
<style scoped>
  .screen_title{
    line-height: 40px;
    padding-top: 10px;
    background-color: #fff;
    margin-bottom: 2px;
    padding-left: 20px;
    font-size: 18px;
    color:#333;
  }
  .screen_cont{
    background-color: #fff;
  }
  .collect_list{
    margin-top: 10px;
  }
  .collect_title{
    background-color: #fff;
    height: 40px;
    margin-bottom: 2px;
    padding: 0 10px;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .avatar{
    width: 50px;
    height: 50px;
    border-radius: 2px;
    border: 1px solid #ccc;
  }
</style>
