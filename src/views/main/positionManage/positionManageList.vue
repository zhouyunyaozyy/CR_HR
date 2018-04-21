<template>
  <div class="posi_list">
    <el-container>
      <el-header height="40px">
        <div class="hr_title">-职位管理-</div>
        <!--<div class="hr_num">当前账号数量（4）</div>-->
        <div @click="addHr()" class="add_hr" v-if="permissionConfig.length > 0 && permissionConfig[2].addJob">
          <img src="@/assets/add.png" alt="">
          <span>添加职位</span>
        </div>
      </el-header>
      <el-main>
        <el-table
          :data="tableData"
          style="width: 100%">
          <el-table-column
            prop="name"
            label="职位名称"
            min-width="140">
          </el-table-column>
          <el-table-column
            prop="education"
            label="学历要求"
            min-width="90">
            <template slot-scope="scope">
              <span>{{localData.education[parseInt(scope.row.education)-1].name}}</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="address"
            label="工作地"
            min-width="100">
            <template slot-scope="scope">
              <span>{{selectCity(scope.row.address)}}</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="work_experience"
            label="经验要求"
            min-width="80">
            <template slot-scope="scope">
              <span>{{localData.offerExperience[parseInt(scope.row.work_experience)-1].name}}</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="wages"
            label="薪资范围"
            min-width="80">
            <template slot-scope="scope">
              <span>{{localData.wages[parseInt(scope.row.wages)-1].name}}</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="status"
            label="发布状态"
            min-width="80">
            <template slot-scope="scope">
              <span v-if="scope.row.status == 1">已发布</span>
              <span v-else="scope.row.status == 0">待发布</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="create_time"
            label="发布时间"
            min-width="140">
            <template slot-scope="scope">
              <span v-if='scope.row.create_time === 0'>未发布</span>
              <span v-else>{{new Date(parseInt(scope.row.create_time)).toLocaleString().replace(/:\d{1,2}$/, '')}}</span>
            </template>
          </el-table-column>
          <el-table-column width="240px">
            <template slot-scope="scope">
              <div class="btn_cont">
                <el-button @click="_see(scope.row.jid)" type="primary" plain>查看</el-button>
                <el-button @click="_edit(scope.row.jid)" type="primary" plain v-if='permissionConfig.length > 0 && permissionConfig[2].editJob == true'>编辑</el-button>
                <!--<el-button type="primary" plain>权限管理</el-button>-->
                <el-button @click="_release(scope.row,2)" type="primary" v-if="scope.row.status == 1 && permissionConfig[2].onOrOffJob" plain>停止发布</el-button>
                <el-button @click="_release(scope.row,1)" type="primary" v-if="scope.row.status == 0 && permissionConfig[2].onOrOffJob" plain>发布</el-button>
              </div>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination
          background
          layout="total, prev, pager, next"
          :total="total"
          :page-size="size"
        >
          <!--prev-text="上一页"-->
          <!--next-text="下一页"-->
        </el-pagination>
      </el-main>
    </el-container>
  </div>
</template>

<script>
  export default {
    name: "positionManagement",
    data() {
      return {
        total:1000,
        size:15,
        tableData: [],
        localData: JSON.parse(window.sessionStorage.getItem("localData")),
				permissionConfig: [] //权限管理
      }
    },
    activated () {
			this.permissionConfig = JSON.parse(window.sessionStorage.getItem('permissionConfig'))
			console.log(this.permissionConfig[2].onOrOffJob)
      this.init();
    },
    methods:{
      init(){
        let resultData = {
          cid:window.sessionStorage.getItem("cid")
        };
        this.$axios({
          type: 'get',
          url: '/dabai-chaorenjob/job/queryAllJobListByCid',
          data: resultData,
          fuc: (res) => {
            this.tableData= res.data.data;
            console.log( res)
          }
        })
      },
      addHr (){
        this.$router.push('/jobDetail')
      },
      selectCity (code){
        let cityName;
        let s_code = "" + code;
        s_code = s_code.slice(0,3)+"000";
        this.localData.area.forEach((item) => {
          if(item.code == s_code){
            item.children.forEach((city) => {
              if(city.code == code){
                cityName = city.name;
                return;
              }
            })
          }
        })
        return cityName;
      },
      _release (row,url_type) {
        let resultData = {
          jid: row.jid
        };
        let url;
        if(url_type == 1){
          url = '/dabai-chaorenjob/job/markSuccessJob'
        }else if(url_type == 2){
          url = '/dabai-chaorenjob/job/markFailJob'
        }
        this.$axios({
          type: 'post',
          url: url,
          data: resultData,
          fuc: (res) => {
            if(res.code == 1){
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
      _edit (jid){
        window.sessionStorage.setItem("jid",jid)
        this.$router.push("/jobEdit")
      },
      _see (jid){
        window.sessionStorage.setItem("jid",jid)
        this.$router.push("/jobSee")
      }
    }
  }
</script>

<style>
  .posi_list .el-header{
    margin-bottom: 1px;
    display: flex;
    align-items: center;
    /*background-color: #fff;*/
    justify-content: space-between;
    padding-bottom: 10px;
  }
  .posi_list .hr_title{
    font-size: 20px;
    color:#333;
    padding-right: 15px;
  }
  .posi_list .hr_num{
    font-size: 18px;
    color:#ff8955;
    padding: 0 15px;
  }
  .posi_list .add_hr{
    font-size: 18px;
    color:#4c4c4c;
    padding: 0 15px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .posi_list .add_hr img{
    width: 26px;
    margin-right: 5px;
  }
  .posi_list .el-main{
    background-color: #fff;
  }
  .posi_list th{
    color:#333;
    font-size: 16px;
    font-weight: normal;
  }
  .posi_list td{
    font-size: 14px;
    color:#666;
  }
  .posi_list .el-table .cell{
    padding-left: 0;
  }
  .posi_list .btn_cont{
    display: flex;
  }
  .posi_list .el-button--primary{
    background-color: #fff;
    width: 70px;
    height: 30px;
    line-height: 30px;
    font-size: 14px;
    color:#048adf;
    border-color:#048adf;
    padding: 0;
    border-radius: 2px;
  }
  .posi_list .el-pagination{
    text-align: right;
    padding-top: 20px;
    /*border-top: 1px solid #666666;*/
  }
</style>
