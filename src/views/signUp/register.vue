<template>
  <div class="register">
		<p>-激活账号-</p>
    <el-form :rules="rules" ref='form' :model='form'>
			<el-form-item prop='phone'>
				<el-input
					type='text'
					placeholder="请输入手机号"
					v-model='form.phone'>
				</el-input>
			</el-form-item>
			<el-form-item prop='num'>
				<el-input
					type='text'
					placeholder="请输4位数验证码"
					v-model='form.num'
					@keydown.enter.native="login">
					<el-button slot="suffix" type='primary' style='float:right' :disabled='getNumBool' @click='timeFuc'>{{form.time}}</el-button>
				</el-input>
			</el-form-item>
			<el-form-item>
				<el-input
					type='password'
					placeholder="请输入新密码"
					v-model='form.pwd'>
				</el-input>
			</el-form-item>
			<el-form-item>
				<el-button @click='register' type='primary'>确认激活</el-button>
			</el-form-item>
			<el-form-item>
				<span style="float:right;color:#4D4D4D;font-size:14px;cursor:pointer;" @click='login'>取消</span>
			</el-form-item>
		</el-form>
  </div>
</template>
<script>
  import JSEncrypt from 'jsencrypt'
	import store from '@/store'
	export default {
		data () {
			return {
				form: {
					phone: '',
					pwd: '',
					num: '',
					time: '获取'
				},
				getNumBool: false,
				rules: {
					phone: [{ required: true, message: '请填写手机号', trigger: 'blur' }],
					pwd: [{ required: true, message: '请填写密码', trigger: 'blur' }],
					num: [{ required: true, message: '请输4位数验证码', trigger: 'blur' }]
				}
			}
		},
		methods: {
			login () {
				this.$router.push('/')
			},
      timeFuc: function () {
        if (/^\d{11}$/.test(this.form.phone) === false) {
          this.$alert('手机号格式错误，无法发送短信', '提示', {
            confirmButtonText: '确定',
            callback: action => {
              //
            }
          })
          return
        }
        let resultData = {}
        let encrypt = new JSEncrypt()
        var publicKey = 'MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCdIIlQzv3fb9ktUGphZ/4l0qQ87iMxLjn1Rc3yhWL0KlnTSY/tziRi0XRyoSCBovZe1hhWGXnfwSvgJRvkzBWRHrnGor0+6I18DnY1lnrckp6bmjirX0BvdqFWxmXgIoz985YjLnPGNqBzt58EBdC5YqUYYnATRgKMA4g0N0Cd6QIDAQAB'  // 从服务端接收到的公钥，缓存到本地
        encrypt.setPublicKey(publicKey)
//        resultData.mobile = encrypt.encrypt(this.form.phone) // RSAkey
        resultData.mobile = this.form.phone // RSAkey
//        resultData.type = 1
        this.$axios({
          type: 'get',
          url: '/dabai-chaorenjob/hr/registerVerificationCode',
          data: resultData,
          fuc: (res) => {
            this.getNumBool = true
            let num = 60
            this.form.time = num-- + '秒'
            let numTime = setInterval(() => {
              this.form.time = num-- + '秒'
              if (num < 0) {
                this.getNumBool = false
                this.form.time = '获取'
                clearInterval(numTime)
              }
            }, 1000)
            this.$message({
              message: '发送成功,请注意查看',
              duration: 1000
            })
            store.state.validationUid = res.data
//						this.getNum_bool = true
          }
        })
      },
			forgetPwd () {
				this.$router.push('/forgetPwd')
			},
			register () {
				this.$refs['form'].validate((valid) => {
          if (valid) {
            store.state.pageStatus = 'reg'
            let user = {}
            user.phone = this.form.phone
            user.pwd = this.form.pwd
//            user.name = this.form.name
            user.num = this.form.num
            store.commit('jiami', user)
            let resultData = store.state.jiamiData
						this.$axios({
							type: 'post',
							url: '/dabai-chaorenjob/hr/register',
							data: resultData,
							fuc: (res) => {
								this.$message({
									message: '激活成功，请进行登录',
									duration: 1000
								})
								this.$router.push('/')
								store.state.validationUid = res.data
							}
						})
          }
        })
			}
		}
	}
</script>
<style lang="css">
	.register input{
		border-color: #ddd;
	}
	.register input:hover{
		border-color: #b3b3b3;
	}
	.register .el-input__suffix{
		right: 0px;
	}
</style>
<style scoped="true" lang='css'>
	.register{
		width: 100%;
		overflow: hidden;
		margin-top: 15px;
	}
	.register>p{
		font-family: PingFangSC-Regular;
		color: #4D4D4D;
		text-align: center;
		margin-bottom: 14px;
		font-size: 22px;
	}
	.register form button{
		width: 100%;
	}
	.register form .el-form-item:nth-of-type(3){
		margin-bottom: 30px;
	}
	.register form .el-form-item:nth-of-type(6) button{
		border-color: #808080;
		color: #666;
	}
</style>
