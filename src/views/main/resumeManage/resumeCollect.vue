<template>
  <div class="resume_collect">
    <div class="collect_screen">
      <div class="screen_title" @click='showOrHideenForm'>简历筛选<i class="iconfont icon-sanjiaoxing-down" v-if='showFormBool'></i><i class="iconfont icon-sanjiaoxing-up" v-else></i></div>
      <el-form
        :model="screen"
        label-width="112px" v-if='showFormBool'
        class="screen_cont">
        <el-form-item label='状态筛选'>
            <el-select v-model='screen.status' placeholder='所有'>
              <el-option
                v-for='item in localData.overVoteStatusEnum'
                :label='item.name'
                :key='item.code'
                :value='item.code'></el-option>
            </el-select>
            <el-select v-if="screen.status == 3" v-model='screen.reservationState' placeholder='所有'>
              <el-option
                v-for='item in localData.reservationState'
                :label='item.name'
                :key='item.code'
                :value='item.code'></el-option>
            </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="init()">查找</el-button>
          <el-button @click="clearForm()" type="warning" plain>清空条件</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="collect_list">
      <!--<div class="collect_title">-->
        <!--<el-checkbox-->
          <!--v-model="checkState"-->
          <!--@change="checkAll">全选</el-checkbox>-->
      <!--</div>-->
      <div class="collect_cont">
        <el-checkbox-group v-model="checkedCities" @change="checkItem">
          <el-table
            v-loading="loading"
            :data="tableData"
            style="width: 100%">
            <el-table-column
              :show-overflow-tooltip="true"
              prop="jname"
              label="应聘职位"
              min-width="150">
              <template slot-scope="scope">
                <span>{{scope.row.job_name}}</span>
                <!--<el-checkbox-->
                  <!--:label="scope.row.name"-->
                <!--&gt;{{scope.row.job_name}}</el-checkbox>-->
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
              label="性别"
              min-width="55">
              <template slot-scope="scope">
                <span v-for="item in localData.gender"
                      v-if="item.code == scope.row.gender">{{item.name}}</span>
              </template>
            </el-table-column>
            <el-table-column
              prop="age"
              label="年龄"
              min-width="55">
            </el-table-column>
            <el-table-column
              prop="height"
              label="身高"
              min-width="95">
                <template slot-scope="scope">
                  <span>{{scope.row.height}}cm</span>
                </template>
            </el-table-column>
            <el-table-column
              prop="weight"
              label="体重"
              min-width="90">
                <template slot-scope="scope">
                  <span>{{scope.row.weight}}kg</span>
                </template>
            </el-table-column>
            <el-table-column
              label="裸眼视力(左眼)"
              min-width="140">
              <template slot-scope="scope">
                <span v-for="item in localData.vision"
                      v-if="item.code == scope.row.vision_left">{{item.name}}</span>
              </template>
            </el-table-column>
            <el-table-column
              label="裸眼视力(右眼)"
              min-width="140">
              <template slot-scope="scope">
                <span v-for="item in localData.vision"
                      v-if="item.code == scope.row.vision_right">{{item.name}}</span>
              </template>
            </el-table-column>
            <el-table-column
              label="工作经验"
              min-width="90">
              <template slot-scope="scope">
                <span v-for="item in localData.offerExperience"
                      v-if="item.code == scope.row.experience">{{item.name}}</span>
              </template>
            </el-table-column>
            <el-table-column
              label="学历"
              min-width="60">
              <template slot-scope="scope">
                <span v-for="item in localData.education"
                      v-if="item.code == scope.row.education">{{item.name}}</span>
              </template>
            </el-table-column>
            <el-table-column
              :show-overflow-tooltip="true"
              prop="language"
              label="熟悉小语种"
              min-width="110">
            </el-table-column>
            <el-table-column
              label="评审结果"
              min-width="90">
              <template slot-scope="scope">
                <span
                  v-if="scope.row.status == 5"
                >{{scope.row.auditor_fail + "/" + scope.row.auditor_success}}</span>
                <span v-else>/</span>
              </template>
            </el-table-column>
            <el-table-column
              label="简历状态"
              min-width="90">
              <template slot-scope="scope">
                  <span
                    v-for="item1 in localData.overVoteStatusEnum"
                    v-if="item1.code == scope.row.status">{{item1.name}}{{sure(scope.row.status,scope.row.sure)}}</span>
              </template>
            </el-table-column>
						<el-table-column
							min-width="80">
							<template slot-scope="scope">
								<el-button @click="_detail(scope.row.oid)" type="primary" plain>查看</el-button>
							</template>
						</el-table-column>
          </el-table>
        </el-checkbox-group>
      </div>
    </div>
		<div class="pagenationDiv">
      <page v-if="pageSize > 0"
            @change-page="init"
            @change-size="_page"
            :page_size="pageSize"
            :count="count"
            :page_type="[15]"
      ></page>
		</div>
  </div>
</template>

<script>
  import Page from '@/components/page';
  export default {
    name: "resumeCollect",
    data (){
      return {
        screen:{
          status:"6",
          reservationState:"3"
        },
        tableData:[],
        localData: JSON.parse(window.sessionStorage.getItem("localData")),
        checkState: false,
        checkSum: 0,
        checkedAllName: [],
        checkedCities:[],
        loading:true,
        pageSize:3,
        count:0,
				showFormBool: false // 展示过滤条件
      }
    },
    components:{
      Page
    },
    activated () {
      this.init();
    },
    methods: {
      _page(val){
        if(val){
          this.pageSize = val;
          this.init()
        }
      },
			_detail (rrid) {
				window.sessionStorage.setItem("rrid",rrid)
        this.$router.push("/resumeDetail")
			},
			showOrHideenForm () {
				this.showFormBool = !this.showFormBool
			},
      sure (state,type){
        if(state != 3){
          return;
        }
        switch (type){
          case 0:
            return "(未确认)"
          case 1:
            return "(已接受)"
          case 2:
            return "(已拒绝)"
        }
      },
      init (page){
        this.loading = true;
        if(page){
          var _start = page;
        }else{
          var _start = 1;
        }
        let dataPost = {
          _start: _start,
				};
        if(this.pageSize){
          dataPost._limit = this.pageSize;
        }
        if(this.screen.status == 6){
        }else if(this.screen.status == 3 && this.screen.reservationState != 3){
          dataPost.status = this.screen.status
          dataPost.sure = this.screen.reservationState
        }else{
          dataPost.status = this.screen.status
        }
        this.$axios({
          type: 'get',
          url: '/dabai-chaorenjob/favorites/getResumeFavoritesList',
          data: dataPost,
          fuc: (res) => {
            if(this.pageSize > 0){
              this.$store.state.tj.startPage = res.data.start
            }
            this.tableData = res.data.data;
            for(let i = 0;i<this.tableData.length;i++){
              this.checkedAllName[i] = this.tableData[i].name
            }
            this.pageSize = res.data.pageSize
            this.count = res.data.count
            this.loading = false;
            console.log(res)
            // this.tableData[index].status ==
          }
        })
      },
      checkItem(val){
        console.log(val)
				this.checkSum = val.length
        if(this.tableData.length == this.checkSum){
          this.checkState = true;
        }else{
          this.checkState = false;
        }
        console.log(this.checkedCities)
      },
      checkAll(val) {
				console.log(val)
        if(val){
          this.checkedCities = this.checkedAllName
          this.checkSum = this.tableData.length;
        }else{
          this.checkedCities = [];
          this.checkSum = 0;
        }
      },
      clearForm(){
        this.screen.status = "6"
        this.screen.reservationState = "3"
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
  /*全选对齐*/
  /*.collect_cont .el-table th:first-child{*/
    /*padding-left: 30px;*/
  /*}*/
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
  .collect_list .el-checkbox__inner::after {
    left: 7px;
    height: 12px;
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
	.resume_collect button{
		width: 70px;
    height: 30px;
    padding: 0;
	}
  .pagenationDiv{
    margin: 15px 0;
  }
</style>
