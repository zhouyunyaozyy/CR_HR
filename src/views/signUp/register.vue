<template>
  <div class="register">
    <el-form :rules="rules" ref='loginForm' :model='form'>
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
					<el-button slot="suffix" type='primary'  style='float:right' :disabled='getNumBool'>获取</el-button>
				</el-input>
			</el-form-item>
			<el-form-item>
				<el-input
					type='text'
					placeholder="请输入新密码"
					v-model='form.pwd'>
				</el-input>
			</el-form-item>
			<el-form-item>
				<el-button @click='register' type='primary'>确认激活</el-button>
			</el-form-item>
			<el-form-item>
				<span style="float:right;color:#4D4D4D;font-size:20px;cursor:pointer;" @click='register'>取消</span>
			</el-form-item>
		</el-form>
  </div>
</template>
<script>
	import store from '@/store'
	export default {
		data () {
			return {
				form: {
					phone: '13888888888',
					pwd: '123456',
					num: ''
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
				this.$refs['loginForm'].validate((valid) => {
          if (valid) {
						console.log(this.form)
						store.state.pageStatus = 'login'
						store.commit('jiami', this.form)
						let resultData = store.state.jiamiData
						console.log('resultData', resultData)
						new Promise((resolve, reject) => {
							this.$axios({
								type: 'post',
								url: '/dabai-authority/authority/login',
								data: resultData,
								fuc: (res) => {
									console.log('login', res)
									this.msg = res
									store.commit('jieMi', res.data)
									resolve()
								}
							})
						}).then(() => {
							this.$axios({
								type: 'post',
								url: '/dabai-chaorenjob/hr/getUserInfoByTickets',
								fuc: (res) => {
									console.log('loginAfter', res)
									this.$router.push('/')
								}
							})
						})
					}
				})
			},
			forgetPwd () {
				this.$router.push('/forgetPwd')
			},
			register () {
				this.$router.push('/register')
			}
		}
	}
</script>
<style lang="css">
	.register input{
		border-color: #808080;
	}
	.register .el-input__suffix{
		right: 0px;
	}
</style>
<style scoped="true" lang='css'>
	.register{
		width: 100%;
		overflow: hidden;
		margin-top: 30px;
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