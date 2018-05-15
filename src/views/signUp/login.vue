<template>
  <div class="login">
    <el-form :rules="rules" ref='loginForm' :model='form'>
			<el-form-item prop='phone'>
				<el-input
					type='text'
					placeholder="请输入手机号或用户名"
					prefix-icon="iconfont icon-icon-test2"
					v-model='form.phone'
					class='loginInput'>
				</el-input>
			</el-form-item>
			<el-form-item prop='pwd'>
				<el-input
					type='password'
					placeholder="请输入密码"
					prefix-icon="iconfont icon-mima1"
					v-model='form.pwd' class='loginPwdInput'
					@keydown.enter.native="login">
				</el-input>
			</el-form-item>
			<el-form-item>
				<span @click='forgetPwd' style="float:right;color:#4D4D4D;font-size:14px;cursor:pointer;">忘记密码？</span>
			</el-form-item>
			<el-form-item>
				<el-button type='primary' @click='login'>登录</el-button>
			</el-form-item>
			<el-form-item>
				<p style="text-align:center;color:#4D4D4D;font-size:14px;">还没激活账号？</p>
			</el-form-item>
			<el-form-item>
				<el-button @click='register'>立即激活</el-button>
			</el-form-item>
		</el-form>
		<div class="planeDiv" v-if='showPlane'>
			<img src="../../imgs/plane.gif"/>
			<p style="text-align:center;color:white">正在登录...</p>
		</div>
  </div>
</template>
<script>
	import store from '@/store'
	export default {
		data () {
			return {
				form: {
					phone: '',
					pwd: ''
				},
				showPlane: false,
				rules: {
					phone: [{ required: true, message: '请填写手机号或用户名', trigger: 'blur' }],
					pwd: [{ required: true, message: '请填写密码', trigger: 'blur' }]
				}
			}
		},
    activated (){
      this.$store.state.tj.is_login = false;
    },
		methods: {
			login () {
				this.$refs['loginForm'].validate((valid) => {
          if (valid) {
						try {
							this.showPlane = true
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
										if (res.code == 1) {
											console.log('login', res)
											this.msg = res
											store.commit('jieMi', res.data)
											resolve()
										} else {
											reject()
										}
									}
								})
							}).then(() => {
								this.$axios({
									type: 'post',
									url: '/dabai-chaorenjob/hr/getUserInfoByTickets',
									fuc: (res) => {
//										console.log('loginAfter', res.data.uid != window.sessionStorage.getItem('uid'))
										if (res.code == 1) {
											if (res.data.uid != window.sessionStorage.getItem('uid')) {
												window.sessionStorage.removeItem('label_list')
												this.$store.state.tj.label_list = []
											}
											window.sessionStorage.setItem('cid', res.data.cid)
											window.sessionStorage.setItem('uid', res.data.uid)
											window.sessionStorage.setItem('name', res.data.name)
											window.sessionStorage.setItem('username', res.data.username)
											window.sessionStorage.setItem('mobile', res.data.mobile)
											if (res.data.manager == 1) {
												window.sessionStorage.setItem('mainOrChildren', 'main')
												window.sessionStorage.setItem('permissionConfig', JSON.stringify([
													{
														"seeRecruitDetail": true,
														"startReview": true,
														"joinReview": true,
														"getMeet": true,
														"getRefuse": true
													}, {
														"editCompany": true
													}, {
														"addJob": true,
														"seeJob": true,
														"editJob": true,
														"onOrOffJob": true
													}
												]))
											} else {
												window.sessionStorage.setItem('mainOrChildren', 'children')
												if (res.data.permissions && res.data.permissions.config) {
													window.sessionStorage.setItem('permissionConfig', res.data.permissions.config)
												} else {
													window.sessionStorage.setItem('permissionConfig', JSON.stringify([
													{
														"seeRecruitDetail": false,
														"startReview": false,
														"joinReview": false,
														"getMeet": false,
														"getRefuse": false
													}, {
														"editCompany": false
													}, {
														"addJob": false,
														"seeJob": false,
														"editJob": false,
														"onOrOffJob": false
													}
												]))
												}
											}
											this.showPlane = false
											this.$router.push('/main')
										} else {
											this.showPlane = false
										}
									}
								})
							}).catch( (err) => {
								this.showPlane = false
							})
						}
						catch (err) {
							console.log(1, err)
							console.log(1, this.showPlane)
							this.showPlane = false
						}
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
		border-color: #ddd;
	}
	.login input:hover{
		border-color: #b3b3b3;
	}
	.loginInput i{
		font-size: 20px;
		color: black;
	}
	.loginPwdInput i{
		font-size: 18px;
		color: black;
	}
</style>
<style scoped="true" lang='css'>
	.login{
		width: 100%;
		overflow: hidden;
		margin-top: 30px;
/*		position: relative;*/
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
		border-color: #ddd;
		color: #666;
	}
	.planeDiv{
		width: 100%;
		height: 100%;
		position: absolute;
		z-index: 100;
		top: 0;
/*		top: calc(50% - 50px);*/
		left: 0;
		background-color: black;
		opacity:0.6;
		box-sizing: border-box;
		padding-top: 436px;
/*		padding-top: calc(50% - 40px);*/
	}
	.planeDiv>img{
		margin: auto;
		width: 200px;
		display: inline-block;
		position: relative;
		left: calc(50% - 100px);
	}
</style>
