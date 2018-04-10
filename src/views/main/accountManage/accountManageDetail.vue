<template>
  <el-form
      :model="hr_detail"
      status-icon
      :rules="rules"
      ref="hrDetail"
      label-width="105px"
      class="hr_detail">
      <div class="account_info">
        <div class="account_title">账号信息</div>
        <el-form-item label="真实姓名" prop="name">
          <el-input v-model="hr_detail.name" placeholder="请输入HR真实姓名"></el-input>
        </el-form-item>
        <el-form-item label="手机号" prop="phone">
          <el-input v-model="hr_detail.phone" placeholder="请输入手机号"></el-input>
        </el-form-item>
        <el-form-item label="用户名">
          <el-input v-model="hr_detail.userName" placeholder="激活后系统自动生成"  :disabled="true"></el-input>
        </el-form-item>
      </div>
      <div class="authority_title">权限配置</div>
      <div class="authority_cont">
        <el-form-item label="简历管理">
          <el-checkbox-group v-model="hr_detail.resume">
            <el-checkbox label="评审简历" name="resume"></el-checkbox>
            <el-checkbox label="参与评审" name="resume"></el-checkbox>
            <el-checkbox label="预约面试" name="resume"></el-checkbox>
            <el-checkbox label="不合适" name="resume"></el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        <el-form-item label="企业信息管理">
          <el-checkbox-group v-model="hr_detail.enterprise">
            <el-checkbox label="查看信息" name="enterprise"></el-checkbox>
            <el-checkbox label="编辑信息" name="enterprise"></el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        <el-form-item label="职位管理">
          <el-checkbox-group v-model="hr_detail.job">
            <el-checkbox label="查看职位" name="job"></el-checkbox>
            <el-checkbox label="编辑职位" name="job"></el-checkbox>
            <el-checkbox label="发布/关闭职位" name="job"></el-checkbox>
          </el-checkbox-group>
        </el-form-item>
      </div>
      <el-form-item>
        <el-button type="primary" @click="submitForm('hrDetail')">提交</el-button>
        <el-button @click="resetForm('hrDetail')">重置</el-button>
      </el-form-item>
    </el-form>
</template>

<script>
  export default {
    name: "accountManageDetail",
    data() {
      return {
        hr_detail: {
          name: '',
          phone: '',
          userName: '',
          resume:[],
          enterprise:[],
          job:[]
        },
        rules: {
          phone: [
            {required: true, message: '请填写手机号', trigger: 'blur'},
            {pattern: /^1[34578][0-9]{9}$/, message: '手机号为11位数字', trigger: 'blur'}
          ],
          name: [
            {required: true, message: '请输入真实姓名', trigger: 'blur'},
            { pattern: /^([\u4E00-\uFA29]|[\uE7C7-\uE7F3]){2,5}$/, message: '姓名必须为2-5位汉字', trigger: 'blur' }
          ]
        }
      };
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          console.log(valid)
          if (valid) {
            alert('submit!');
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      }
    }
  }
</script>
<style>
  .account_info .el-input__inner{
    height: 30px;
    color:#808080;
    font-size: 16px;
  }
  .account_info .el-form-item__label{
    color:#4c4c4c;
    font-size:18px;
  }
  .authority_cont .el-form-item__label{
    color:#333;
    font-size:20px;
    width: 210px !important;
    text-align: left;
    box-sizing: border-box;
    padding-left: 15px;
    line-height: 50px;
  }
</style>
<style scoped>
  .account_info{
    background-color: #fff;
    padding: 15px 20px;
  }
  .account_title{
    color:#333;
    font-size: 24px;
    padding: 10px 0;
  }
  .account_info .el-form-item{
    /*margin-bottom: 5px;*/
  }
  .account_info .el-input{
    width: 280px;
  }
  .authority_title{
    margin-top: 5px;
    line-height: 50px;
    font-size: 24px;
    color:#333;
    padding-left: 15px;
  }
  .authority_cont .el-form-item--feedback{
    background-color: #fff;
    line-height: 50px;
  }
  .authority_cont .el-checkbox-group{
    height: 50px;
  }
  .authority_cont .el-checkbox{
    line-height: 50px;
  }
</style>
