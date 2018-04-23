<template>
  <div class="changePhoneAfter">
    <div class="adduserBody">
      <h3>修改手机号</h3>
      <el-form label-position="right" ref='addUserForm' :rules='rules' label-width="80px" :model="form">
          <el-form-item label="手机号" prop='phone'>
                <el-input @change='phoneFuc' placeholder="请输入手机号" v-model="form.phone"></el-input>
<!--                <img v-if='imgBool === 1' src='../../imgs/ic_righ@2x.png'>-->
<!--                <img v-else-if='imgBool === 2' src='../../imgs/ic_wron@2x.png'>-->
          </el-form-item>
          <el-form-item label="验证码" prop='num'>
                <el-input placeholder="请输入验证码" v-model="form.num"></el-input>
                <el-button :disabled='getNum_bool' @click='timeFuc'>{{time}}</el-button>
          </el-form-item>
        </el-form>
    </div>
    <el-button type="primary" @click="submitForm('addUserForm')">确定</el-button>
  </div>
</template>
<script>
//  import {ajax} from '@/components/js/tools'
  import store from '@/store'
  import JSEncrypt from 'jsencrypt'
  export default {
    data () {
      return {
//        phone: '',
        time: '获取',
        getNum_bool: false,
        getNumBool: false,
        imgBool: 3,
        form: {
          num: '',
          phone: ''
        },
        rules: {
          phone: [
            { required: true, message: '请输入新手机号', trigger: 'blur' },
            { pattern: /^\d{11}$/, message: '手机号必须为11位数字', trigger: 'blur' },
            { validator: this.checkName, trigger: 'blur' }
          ],
          num: [
            { required: true, message: '请输入验证码', trigger: 'blur' },
            { pattern: /^\d{4}$/, message: '验证码长度必须为4位数字', trigger: 'blur' }
          ]
        }
      }
    },
    created () {
//      this.phone = window.sessionStorage.getItem('userPhone')
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
            this.$store.state.pageStatus = 'newPhone'
            let user = {}
            user.mobile = this.form.phone
            user.verificationId = this.$store.state.newValidationUid
            user.verificationCode = this.form.num
            user.changeMobileTickets = this.$store.state.oldVerification
            let resultData = this.$store.state.jiamiData
            this.$axios({
              url: '/dabai-chaorenjob/hr/changMobile',
              type: 'post',
              data: user,
              fuc: (res) => {
								window.sessionStorage.setItem('mobile', this.form.phone)
								this.$router.push('personSettingPhone')
                this.$message({
                  message: res.msg,
                  duration: 1000
                })
              }
            })
          } else {
          }
        })
      },
      phoneFuc: function () {
        if (this.form.phone.length === 11 && isNaN(Number(this.form.phone)) !== true) {
          this.imgBool = 1
        } else {
          if (this.imgBool === 1) {
            this.imgBool = 2
          }
        }
      },
      checkName (rule, value, callback) {
        if (value !== this.phone) {
          callback()
        } else {
          callback(new Error('与原手机号一致，请重新输入'))
        }
      },
      timeFuc: function () {
        if (this.form.phone === '') {
          this.$message('请先填写手机号', 1000)
          return
        }
        let resultData = {}
        resultData.mobile = this.form.phone
        this.$axios({
          url: '/dabai-chaorenjob/hr/changeMobileAfterVerificationId',
          type: 'post',
          data: resultData,
          fuc: (res) => {
						this.getNum_bool = true
						this.getNumBool = true
						this.$store.state.newValidationUid = res.data
						let num = 60
						let numTime = setInterval(() => {
							this.time = num-- + '秒'
							if (num < 0) {
								this.getNum_bool = false
								this.time = '获取'
								clearInterval(numTime)
							}
						}, 1000)
          }
        })
      }
    }
  }

</script>
<style>
    .changePhoneAfter .el-input{
        width: 170px;
        display: inline-block;
    }
</style>
<style scoped="true" lang='css'>
    .changePhoneAfter{
/*        height: 100vh;*/
/*        margin-top: 0px;*/
      background-color: #eff1f6;
        width: 100%;
/*        position:relative;*/
/*        overflow: auto;*/
    }
    .changePhoneAfter>button{
        float: right;
        width: 166px;
        height: 40px;
        background-color: #3e56b3;
        margin: 24px;
    }
    .changePhoneAfter>button:hover{
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
    .adduserBody img{
/*        box-sizing: content-box;*/
        width: 20px;
        position: relative;
        top: 5px;
        left: 5px;
    }
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
</style>
