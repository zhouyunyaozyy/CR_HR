<template>
  <div class="posi_list">
    <el-container>
      <el-header height="40px">
        <div class="hr_title">-职位管理-</div>
        <!--<div class="hr_num">当前账号数量（4）</div>-->
        <div @click="addHr()" class="add_hr">
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
            prop="phone"
            label="学历要求"
            min-width="150">
          </el-table-column>
          <el-table-column
            prop="userName"
            label="工作地"
            min-width="170">
          </el-table-column>
          <el-table-column
            prop="state"
            label="经验要求"
            min-width="80">
          </el-table-column>
          <el-table-column
            prop="state"
            label="薪资范围"
            min-width="80">
          </el-table-column>
          <el-table-column
            prop="state"
            label="发布状态"
            min-width="80">
          </el-table-column>
          <el-table-column
            prop="date"
            label="发布时间"
            min-width="140">
          </el-table-column>
          <el-table-column width="240px">
            <template slot-scope="scope">
              <div class="btn_cont">
                <el-button type="primary" plain>查看</el-button>
                <el-button type="primary" plain>编辑</el-button>
                <!--<el-button type="primary" plain>权限管理</el-button>-->
                <el-button type="primary" plain>发布</el-button>
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
    methods:{
      addHr (){
        console.log(13)
        this.$store.commit('addTab',["/hrDetail","添加账号"])
      },
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
