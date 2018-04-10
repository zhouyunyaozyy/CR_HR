<template>
  <div class="hr_list">
    <el-container>
      <el-header height="40px">
        <div class="hr_title">-账号管理-</div>
        <!--<div class="hr_num">当前账号数量（4）</div>-->
        <div @click="addHr()" class="add_hr">
          <img src="@/assets/add.png" alt="">
          <span>添加账号</span>
        </div>
      </el-header>
      <el-main>
        <el-table
          :data="tableData"
          style="width: 100%">
          <el-table-column
            prop="name"
            label="账号姓名"
            min-width="140">
          </el-table-column>
          <el-table-column
            prop="phone"
            label="手机号"
            min-width="150">
          </el-table-column>
          <el-table-column
            prop="userName"
            label="用户名"
            min-width="170">
          </el-table-column>
          <el-table-column
            prop="state"
            label="状态"
            min-width="80">
          </el-table-column>
          <el-table-column
            prop="date"
            label="创建时间"
            min-width="140">
          </el-table-column>
          <el-table-column width="240px">
            <template slot-scope="scope">
              <div class="btn_cont">
                <el-button type="primary" plain>冻结</el-button>
                <el-button type="primary" plain>删除</el-button>
                <!--<el-button type="primary" plain>权限管理</el-button>-->
                <el-button type="primary" plain>编辑</el-button>
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
    name: "accountManagement",
    data() {
      return {
        total:1000,
        size:15,
        tableData: [{
          name: '王小虎',
          phone: '13541377809',
          userName: 'chaorenjob001',
          state: '已激活',
          date: '2016-05-02'
        }, {
          name: '王小虎',
          phone: '13541377809',
          userName: 'chaorenjob001',
          state: '已激活',
          date: '2016-05-02'
        }, {
          name: '王小虎',
          phone: '13541377809',
          userName: 'chaorenjob001',
          state: '已激活',
          date: '2016-05-02'
        }, {
          name: '王小虎',
          phone: '13541377809',
          userName: 'chaorenjob001',
          state: '已激活',
          date: '2016-05-02'
        }]
      }
    },
    created () {
      this.$axios({
        type: 'get',
        url: '/dabai-chaorenjob/company/queryAllChildrenByCid',
        // data: resultData,
        fuc: (res) => {
          console.log( res)
        }
      })
    },
    methods:{
      addHr (){
        this.$store.commit('addTab',["/hrDetail","添加账号"])
        this.$router.push({path:'/hrDetail'})
      },
    }
  }
</script>

<style>
  .hr_list{
  }
  .hr_list .el-header{
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
  .hr_list .el-main{
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
  .hr_list .el-pagination{
    text-align: right;
    padding-top: 20px;
    /*border-top: 1px solid #666666;*/
  }
</style>
