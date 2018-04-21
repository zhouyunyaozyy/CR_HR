<template>
    <div class="addUser">
        <div class="adduserBody">
          <h3>设置密码</h3>
          <el-form label-position="right" ref='addUserForm' :rules='rules' label-width="80px" :model="form">
              <el-form-item label="旧密码" prop='oldPwd'>
                  <el-input type="password" placeholder="请输入旧密码" v-model="form.oldPwd"></el-input>

              </el-form-item>
              <el-form-item label="新密码" prop='pwd'>
                    <el-input type="password" placeholder="请输入密码" v-model="form.pwd"></el-input>
              </el-form-item>
              <el-form-item label="" prop='pwdReapeat'>
                    <el-input type="password" placeholder="请再输入一次" v-model="form.pwdReapeat"></el-input>
              </el-form-item>
            </el-form>
        </div>
        <el-button type="primary" @click="submitForm('addUserForm')">确定</el-button>
    </div>
</template>
<script>
//  import {ajax} from '@/components/js/tools'
	import JSEncrypt from 'jsencrypt'
  import store from '@/store'
  export default {
    data () {
      return {
        form: {
          pwdReapeat: '',
          oldPwd: '',
          pwd: ''
        },
        rules: {
          oldPwd: [
            { required: true, message: '请输入旧密码', trigger: 'blur' },
            { pattern: /^\w{4,12}$/, message: '密码长度必须为4~12位', trigger: 'blur' }
          ],
          pwd: [
            { required: true, message: '请输入新密码', trigger: 'blur' },
            { pattern: /^\w{4,12}$/, message: '密码长度必须为4~12位', trigger: 'blur' },
            { validator: this.checkPwdOne, trigger: 'blur' }
          ],
          pwdReapeat: [
            { required: true, message: '请重复密码', trigger: 'blur' },
            { pattern: /^\w{4,12}$/, message: '密码长度必须为4~12位', trigger: 'blur' },
            { validator: this.checkPwd, trigger: 'blur' }
          ]
        }
      }
    },
    methods: {
      submitForm (addUserForm) {
        this.$refs[addUserForm].validate((valid) => {
          if (valid) {
            if (this.form.pwd === this.form.oldPwd) {
              this.$message({
                message: '新密码和旧密码不能相同',
                duration: 1000
              })
              this.form.pwd = ''
              this.form.pwdReapeat = ''
              return
            }
//            store.state.pageStatus = 'newPwd'
            let user = {}
						let encrypt = new JSEncrypt()
						var publicKey = 'MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCdIIlQzv3fb9ktUGphZ/4l0qQ87iMxLjn1Rc3yhWL0KlnTSY/tziRi0XRyoSCBovZe1hhWGXnfwSvgJRvkzBWRHrnGor0+6I18DnY1lnrckp6bmjirX0BvdqFWxmXgIoz985YjLnPGNqBzt58EBdC5YqUYYnATRgKMA4g0N0Cd6QIDAQAB'  // 从服务端接收到的公钥，缓存到本地
						encrypt.setPublicKey(publicKey)
						user.oldPassword = encrypt.encrypt(this.form.oldPwd)
						user.newPassword = encrypt.encrypt(this.form.pwd)
            this.$axios({
              url: '/dabai-chaorenjob/hr/changePassword',
              type: 'post',
              data: user,
              fuc: (res) => {
								this.$message({
									message: '成功修改密码，请重新登录',
									duration: 1000
								})
              }
            })
          } else {
          }
        })
      },
      checkPwd (rule, value, callback) {
        if (value === this.form.pwd) {
          callback()
        } else {
          callback(new Error('两次密码输入不一致，请重新输入'))
        }
      },
      checkPwdOne (rule, value, callback) {
        if (value !== this.form.oldPwd) {
          callback()
        } else {
          callback(new Error('新密码和旧密码不能相同'))
        }
      }
    }
  }
</script>
<style scoped lang='css'>
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
