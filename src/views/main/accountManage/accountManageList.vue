<template>
  <div class="hr_list">
    <div class="hr_header" height="40px">
      <div class="hr_title">-账号管理-</div>
      <!--<div class="hr_num">当前账号数量（4）</div>-->
      <div @click="addHr()" class="add_hr">
        <img src="@/assets/add.png" alt="">
        <span>添加账号</span>
      </div>
    </div>
    <div class="hr_main">
      <el-table
        v-loading="loading"
        :data="tableData"
        style="width: 100%;">
        <el-table-column
          prop="name"
          label="账号姓名"
          min-width="140">
        </el-table-column>
        <el-table-column
          prop="mobile"
          label="手机号"
          min-width="150">
        </el-table-column>
        <el-table-column
          prop="username"
          label="用户名"
          min-width="170">
        </el-table-column>
        <el-table-column
          label="状态"
          min-width="80">
          <template slot-scope="scope">
            <span class="org" v-if='scope.row.status === 1'>已激活</span>
            <span v-else-if='scope.row.status === 2'>未激活</span>
            <span v-else-if='scope.row.status === 3'>封禁</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="create_time"
          label="创建时间"
          min-width="140">
          <template slot-scope="scope">
            <span v-if='scope.row.create_time === 0'>未激活</span>
            <span v-else>{{new Date(parseInt(scope.row.create_time)).toLocaleString().replace(/:\d{1,2}$/, '')}}</span>
          </template>
        </el-table-column>
        <el-table-column width="240px">
          <template slot-scope="scope">
            <div class="btn_cont">
              <el-button v-if="scope.row.status === 3" @click="_thaw(scope.row)" type="primary" plain>解冻</el-button>
              <el-button v-else @click="_frozen(scope.$index,scope.row)" type="primary" plain>冻结</el-button>

              <el-button @click="_delete(scope.row)" type="primary" plain>删除</el-button>
              <!--<el-button type="primary" plain>权限管理</el-button>-->
              <el-button @click="_edit(scope.row)" type="primary" plain>编辑</el-button>
            </div>
          </template>
        </el-table-column>
      </el-table>
      <div class="pagenationDiv">
        <page v-if="pageSize > 0"
              @change-page="init"
              @change-size="_page"
              :page_size="pageSize"
              :count="count"
              :start1="start"
              :page_type="[15]"
        ></page>
      </div>
    </div>
  </div>
</template>

<script>
  import Page from '@/components/page'
  export default {
    name: "accountManagement",
    data() {
      return {
        tableData: [],
        pageSize:3,
        count:0,
        start: 1,
        loading:true,
      }
    },
    components:{
      Page
    },
    activated () {
      console.log(this.$store.state.tj.startPage)
      this.$store.state.tj.startPage = 1;
      this.init();
    },
    methods:{
      _page(val){
        if(val){
          this.pageSize = val;
          this.init()
        }
      },
      init (page){
        this.loading = true;
        if(page){
          var _start = page;
        }else{
          var _start = 1;
        }
        let resultData = {
          _start: _start,
          cid:window.sessionStorage.getItem("cid")
        };
        if(this.pageSize){
          resultData._limit = this.pageSize
        }
        this.$axios({
          type: 'get',
          url: '/dabai-chaorenjob/company/queryAllChildrenByCid',
          data: resultData,
          fuc: (res) => {
            if(this.pageSize > 0){
              this.$store.state.tj.startPage = res.data.start
            }
            this.pageSize = res.data.pageSize
            this.count = res.data.count
            this.start = res.data.start
            this.tableData = res.data.data;
            this.loading = false;
          }
        })
      },
      addHr () {
        this.$router.push({path:'/hrDetail'})
      },
      _frozen (index,row) {
        let resultData = {
          uid:row.uid
        };
        this.$axios({
          type: 'post',
          url: '/dabai-chaorenjob/company/freezingChildren',
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
            // this.tableData[index].status ==
            console.log( res)
          }
        })
      },
      _thaw (row) {
        let resultData = {
          uid:row.uid
        };
        this.$axios({
          type: 'post',
          url: '/dabai-chaorenjob/company/defrostingChildren',
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
      _delete (row){
        let resultData = {
          uid:row.uid
        };
				this.$confirm('此操作将永久删除该账号, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
					this.$axios({
						type: 'post',
						url: '/dabai-chaorenjob/company/deleteChildren',
						data: resultData,
						fuc: (res) => {
							if(res.code == 1){
								this.$message({
									type: 'success',
									message: '删除成功!'
								});
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
        }).catch((err) => {
					//
				})
      },
      _edit (row){
        window.sessionStorage.setItem("uid",row.uid)
        this.$router.push({path:'/hrEdit'})
      }
    }
  }
</script>

<style>
  .hr_list .hr_header{
    padding-left: 20px;
    margin-bottom: 1px;
    display: flex;
    align-items: center;
    /*background-color: #fff;*/
    justify-content: space-between;
    padding-bottom: 10px;
  }
  .hr_list .hr_title{
    font-size: 20px;
    color:#333;
    padding-right: 15px;
  }
  .hr_list .hr_num{
    font-size: 18px;
    color:#ff8955;
    padding: 0 15px;
  }
  .hr_list .add_hr{
    font-size: 18px;
    color:#4c4c4c;
    padding: 0 15px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .hr_list .add_hr img{
    width: 26px;
    margin-right: 5px;
  }
  .hr_list .hr_main{
    padding: 0 20px;
    background-color: #fff;
  }
  .hr_list th{
    color:#333;
    font-size: 16px;
    font-weight: normal;
  }
  .hr_list td{
    font-size: 14px;
    color:#666;
  }
  .hr_list .hr_main .el-table_1_column_1 {
   padding-left: 20px;
 }
  .hr_list .el-table .cell{
    padding-left: 0;
  }
  .hr_list .btn_cont{
    display: flex;
  }
  .hr_list .el-button--primary{
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
  .hr_list .org{
    color:#ff8955;
  }
</style>
<style scoped="true">
	.pagenationDiv{
    padding-left: 20px;
		margin-top: 25px;
    padding-bottom: 25px;
	}
</style>
