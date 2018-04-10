<template>
  <div class="login">
    <el-form :rules="rules" ref='loginForm' :model='form'>
			<el-form-item prop='phone'>
				<el-input
					type='text'
					placeholder="请输入手机号或用户名"
					prefix-icon="el-icon-search"
					v-model='form.phone'>
				</el-input>
			</el-form-item>
			<el-form-item prop='pwd'>
				<el-input
					type='password'
					placeholder="请输入密码"
					prefix-icon="el-icon-search"
					v-model='form.pwd'
					@keydown.enter.native="login">
				</el-input>
			</el-form-item>
			<el-form-item>
				<span @click='forgetPwd' style="float:right;color:#4D4D4D;font-size:22px;cursor:pointer;">忘记密码？</span>
			</el-form-item>
			<el-form-item>
				<el-button type='primary' @click='login'>登录</el-button>
			</el-form-item>
			<el-form-item>
				<p style="text-align:center;color:#4D4D4D;font-size:22px;">还没激活账号？</p>
			</el-form-item>
			<el-form-item>
				<el-button @click='register'>立即激活</el-button>
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
					phone: '13512345678',
					pwd: '123456'
				},
				rules: {
					phone: [{ required: true, message: '请填写手机号或用户名', trigger: 'blur' }],
					pwd: [{ required: true, message: '请填写密码', trigger: 'blur' }]
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
									window.sessionStorage.setItem('cid', res.data.cid)
									this.$router.push('/main')
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
	.login input{
		border-color: #808080;
	}
</style>
<style scoped="true" lang='css'>
	.login{
		width: 100%;
		overflow: hidden;
		margin-top: 30px;
	}
	.login form button{
		width: 100%;
	}
	.login form .el-form-item{
		margin-bottom: 0px;
	}
	.login form .el-form-item:first-of-type{
		margin-bottom: 22px;
	}
	.login form .el-form-item:nth-of-type(2){
		margin-bottom: 5px;
	}
	.login form .el-form-item:nth-of-type(3){
		margin-bottom: 0;
	}
	.login form .el-form-item:nth-of-type(4){
		margin-bottom: 25px;
	}
	.login form .el-form-item:nth-of-type(6) button{
		border-color: #808080;
		color: #666;
	}
</style>