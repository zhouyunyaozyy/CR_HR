<template>
  <div class="hr_list">
    <el-container>
      <el-header height="60px">
        <div class="hr_title">HR账号管理</div>
        <div class="hr_num">当前HR账号数量（4）</div>
        <div class="add_hr">添加HR账号</div>
      </el-header>
      <el-main>
        
      </el-main>
    </el-container>
  </div>
</template>

<script>
  export default {
    name: "accountManagement"
  }
</script>

<style>
  .hr_list{
    background-color: #fff;
  }
  .hr_list .el-header{
    margin-bottom: 1px;
    display: flex;
    align-items: center;
  }
  .hr_list .hr_title{
    font-size: 24px;
    color:#333;
    padding: 0 15px;
  }
  .hr_list .hr_num{
    font-size: 20px;
    color:#ff8955;
    padding: 0 15px;
  }
  .hr_list .add_hr{
    font-size: 20px;
    color:#4c4c4c;
    padding: 0 15px;
  }
</style>
