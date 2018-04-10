<template>
  <div class="changePhoneAfter">
    <div class="adduserBody">
      <h3>修改手机号</h3>
      <el-form label-position="right" ref='addUserForm' :rules='rules' label-width="80px" :model="form">
          <el-form-item label="手机号" prop='name'>
                <el-input @change='phoneFuc' placeholder="请输入手机号" v-model="form.name"></el-input>
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
        phone: '',
        time: '获取',
        getNum_bool: false,
        getNumBool: false,
        imgBool: 3,
        form: {
          num: '',
          name: ''
        },
        rules: {
          name: [
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
      this.phone = window.sessionStorage.getItem('userPhone')
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
            store.state.pageStatus = 'newPhone'
            let user = {}
            user.phone = this.form.name
            user.verification = this.form.num
            store.commit('jiami', user)
            let resultData = store.state.jiamiData
            store.state.ajax({
              url: '/hr/changeMobile',
              type: 'post',
              data: {
//                data: encodeURIComponent(resultData)
                data: resultData
              },
              success: (res) => {
                if (res.code === 1) {
                  window.sessionStorage.setItem('userPhone', this.form.name)
//                  this.$router.push('/adminIndex')
                }
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
        if (this.form.name.length === 11 && isNaN(Number(this.form.name)) !== true) {
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
        if (this.form.name === '') {
          this.$message('请先填写手机号', 1000)
          return
        }
        let resultData = {}
        let encrypt = new JSEncrypt()
        var publicKey = 'MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCdIIlQzv3fb9ktUGphZ/4l0qQ87iMxLjn1Rc3yhWL0KlnTSY/tziRi0XRyoSCBovZe1hhWGXnfwSvgJRvkzBWRHrnGor0+6I18DnY1lnrckp6bmjirX0BvdqFWxmXgIoz985YjLnPGNqBzt58EBdC5YqUYYnATRgKMA4g0N0Cd6QIDAQAB'  // 从服务端接收到的公钥，缓存到本地
        encrypt.setPublicKey(publicKey)
        resultData.mobile = encrypt.encrypt(this.form.name) // RSAkey
        resultData.type = 1
        console.log(resultData)
        store.state.ajax({
          url: '/verificationCode/changeCompanyMobileGetNewVerificationId',
          type: 'post',
          data: {
//            data: encodeURIComponent(JSON.stringify(resultData))
            data: JSON.stringify(resultData)
          },
          success: (res) => {
            console.log(res)
            if (res.code === 1) {
              this.getNum_bool = true
              this.getNumBool = true
              store.state.newValidationUid = res.data
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
