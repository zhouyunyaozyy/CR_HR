<template>
  <div class="addUser">
    <div class="adduserBody">
      <h3>编辑姓名</h3>
      <el-form ref='addUserForm' :rules='rules' label-width="100px" :model="form">
          <el-form-item label="手机号">
            <span>{{userPhone}}</span>
          </el-form-item>
          <el-form-item label="用户名">
            <span>{{userName}}</span>
          </el-form-item>
          <el-form-item label="真实姓名" prop='name'>
              <el-input :placeholder="name" v-model="form.name"></el-input>
          </el-form-item>
        </el-form>
    </div>
    <el-button type="primary" @click="submitForm('addUserForm')">确定</el-button>
  </div>
</template>
<script>
//  import {ajax} from '@/components/js/tools'
  import store from '@/store'
  export default {
    data () {
      return {
        name: '请输入真实有效的姓名',
        userName: '',
        userPhone: '',
        form: {
          name: ''
        },
        rules: {
          name: [
            { required: true, message: '请输入姓名', trigger: 'blur' },
            { pattern: /^([\u4E00-\uFA29]|[\uE7C7-\uE7F3]){2,6}$/, message: '姓名必须为2-6位汉字', trigger: 'blur' }
          ]
        }
      }
    },
    created () {
      this.userName = window.sessionStorage.getItem('username')
      this.userPhone = window.sessionStorage.getItem('mobile')
      if (window.sessionStorage.getItem('name')) {
        this.form.name = window.sessionStorage.getItem('name')
      }
    },
    methods: {
      submitForm (addUserForm) {
        this.$refs[addUserForm].validate((valid) => {
          if (valid) {
            this.$axios({
              url: '/dabai-chaorenjob/hr/changeName',
              type: 'post',
              data: {name: this.form.name},
              fuc: (res) => {
								window.sessionStorage.setItem('name', this.form.name)
								this.$message({
									message: res.msg,
									duration: 1000
								})
              }
            })
          } else {
          }
        })
      }
    }
  }

</script>
<style>
    .adduserBody label{
        font-weight: bold;
    }
    .adduserBody .el-form-item{
        margin-bottom: 0;
    }
    .adduserBody .is-required{
        margin-bottom: 40px;
        margin-top: 11px;
    }
</style>
<style scoped="true" lang='css'>
    .addUser{
/*        height: 100vh;*/
/*        margin-top: 0px;*/
      background-color: #eff1f6;
        width: 100%;
/*        position:relative;*/
/*        overflow: auto;*/
    }
    .addUser>button{
        float: right;
        width: 166px;
        height: 40px;
        background-color: #3e56b3;
        margin: 24px;
    }
    .addUser>button:hover{
        background-color: #5f73c3;
    }
    .adduserBody{
        width: 100%;
        overflow: hidden;
        background-color: white;
/*        border-radius: 10px;*/
    }
    .adduserBody>h3{
        padding: 50px 0 10px 50px;
        border-bottom: 1px solid #eff1f6;
    }
    .adduserBody label{
        font-weight: bold;
    }
    .adduserBody>form{
        width: 334px;
        margin: auto;
        overflow: hidden;
        margin-top: 36px;
/*        padding: 40px 40%;*/
    }
    .adduserBody>form span{
        color: #3e56b3;
        font-size: 14px;
    } 
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
</style>
