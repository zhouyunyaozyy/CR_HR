<template>
  <div class="changePhone">
    <div class="adduserBody">
      <h3>更换手机号码</h3>
      <el-form label-position="right" ref='addUserForm' :rules='rules' label-width="80px" :model="form">
          <el-form-item label="当前">
            <span>{{phone}}</span>
          </el-form-item>
          <el-form-item label="验证码" prop='num'>
               <el-input placeholder="请输入验证码" v-model="form.num"></el-input>
              <el-button :disabled='getNum_bool' @click='timeFuc' style='margin-left:6px'>{{time}}</el-button>
          </el-form-item>
        </el-form>
    </div>
    <el-button type="primary" @click="submitForm('addUserForm')">下一步</el-button>
  </div>
</template>
<script>
//  import {ajax} from '@/components/js/tools'
  import JSEncrypt from 'jsencrypt'
  import store from '@/store'
  export default {
    props: ['typeFuc'],
    data () {
      return {
        phone: '',
        time: '获取',
        getNum_bool: false,
        getNumBool: false,
        form: {
          num: ''
        },
        rules: {
          num: [
            { required: true, message: '请输入验证码', trigger: 'blur' },
            { pattern: /^\d{4}$/, message: '验证码必须为4位数字', trigger: 'blur' }
          ]
        }
      }
    },
    created () {
      this.phone = window.sessionStorage.getItem('mobile')
    },
    methods: {
      submitForm (addUserForm) {
        this.$refs[addUserForm].validate((valid) => {
          if (valid) {
            if (!this.getNumBool) {
              this.$alert('请填写您手机短信中的验证码', '提示', {
                confirmButtonText: '确定',
                callback: action => {
                  //
                }
              })
              return
            }
            this.$axios({
              url: '/dabai-chaorenjob/hr/changeMobileSureBeforeVerification',
              type: 'post',
              data: {
                verificationId: this.$store.state.validationUid,
                verificationCode: this.form.num
              },
              fuc: (res) => {
								console.log("res1", res)
								this.$store.state.oldVerification = res.data
								this.$router.push('personSettingPhoneAfter')
//                  this.typeFuc('phoneAfter')
              }
            })
          } else {
          }
        })
      },
      timeFuc: function () {
        this.$axios({
          url: '/dabai-chaorenjob/hr/changeMobileBeforeVerificationId',
          type: 'post',
          fuc: (res) => {
              let num = 60
              let numTime = setInterval(() => {
                this.time = num-- + '秒'
                if (num < 0) {
                  this.getNum_bool = false
                  this.time = '获取'
                  clearInterval(numTime)
                }
              }, 900)
              this.getNumBool = true
              this.getNum_bool = true
              this.$store.state.validationUid = res.data
							this.$message('验证码发送成功')
          }
        })
      }
    }
  }

</script>
<style>
    .changePhone .el-input{
        width: 170px;
        display: inline-block;
    }
</style>
<style scoped="true" lang='css'>
    .changePhone{
/*        height: 100vh;*/
/*        margin-top: 0px;*/
      background-color: #eff1f6;
        width: 100%;
/*        position:relative;*/
/*        overflow: auto;*/
    }
    .changePhone>button{
        float: right;
        width: 166px;
        height: 40px;
        background-color: #3e56b3;
        margin: 24px;
    }
    .changePhone>button:hover{
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
    
    .adduserBody>form button{
        background-color: white;
        border: 1px solid #3e56b3;
				height: 30px;
				line-height: 0;
    }
    .adduserBody>form button:hover{
/*        background-color: #5f73c3;*/
        color:black;
    }
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
</style>
