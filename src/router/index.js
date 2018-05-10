import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)
const router1 = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'signUp',
      component: resolve => require(['@/views/signUp/index'], resolve),
      children:[
        {
          path: '/',
          name: 'login',
          component: resolve => require(['@/views/signUp/login'], resolve)
        },
        {
          path: '/register',
          name: 'register',
          component: resolve => require(['@/views/signUp/register'], resolve)
        },
        {
          path: '/forgetPwd',
          name: 'forgetPwd',
          component: resolve => require(['@/views/signUp/forgetPwd'], resolve)
        }
      ]
    },
    {
      path: '/main',
      name: 'main',
      component: resolve => require(['@/views/main/index'], resolve),
      children:[
        { // 账号管理列表
          path: '/hrList',
          name: 'hrList',
          component: resolve => require(['@/views/main/accountManage/accountManageList'], resolve)
        },
        { // 账号管理详情
          path: '/hrDetail',
          name: 'hrDetail',
          component: resolve => require(['@/views/main/accountManage/accountManageDetail'], resolve)
        },
        { // 编辑账号
          path: '/hrEdit',
          name: 'hrEdit',
          component: resolve => require(['@/views/main/accountManage/accountManageEdit'], resolve)
        },
        { // 职位管理列表
          path: '/jobList',
          name: 'jobList',
          component: resolve => require(['@/views/main/positionManage/positionManageList'], resolve)
        },
        { // 职位管理详情
          path: '/jobDetail',
          name: 'jobDetail',
          component: resolve => require(['@/views/main/positionManage/positionManageDetail'], resolve)
        },
        { // 编辑职位
          path: '/jobEdit',
          name: 'jobEdit',
          component: resolve => require(['@/views/main/positionManage/positionManageEdit'], resolve)
        },
        { // 查看职位
          path: '/jobSee',
          name: 'jobSee',
          component: resolve => require(['@/views/main/positionManage/positionManageSee'], resolve)
        },
        { // 职位简历列表
          path: '/resumeList',
          name: 'resumeList',
          component: resolve => require(['@/views/main/resumeManage/resumeList'], resolve)
        },
        { // 简历列表
          path: '/recruitList',
          name: 'recruitList',
          component: resolve => require(['@/views/main/resumeManage/recruitList'], resolve)
        },
        { // 简历详情
          path: '/resumeDetail',
          name: 'resumeDetail',
          component: resolve => require(['@/views/main/resumeManage/resumeDetail'], resolve)
        },
        { // 招聘结果
          path: '/recruitResult/:resultState',
          name: 'recruitResult',
          component: resolve => require(['@/views/main/resumeManage/recruitResult'], resolve)
        },
        { // 简历收藏
          path: '/resumeCollect',
          name: 'resumeCollect',
          component: resolve => require(['@/views/main/resumeManage/resumeCollect'], resolve)
        },
        { // 刷新
          path: '/appBack',
          name: 'appBack',
          component: resolve => require(['@/views/main/back/appBack'], resolve)
        },
        { // 个人信息设置
          path: '/personSetting',
          name: 'personSetting',
          component: resolve => require(['@/views/main/settings/personSetting/index'], resolve),
					children: [
						{ // 设置姓名
							path: '/personSettingUser',
							name: 'personSettingUser',
							component: resolve => require(['@/views/main/settings/personSetting/SettingUser'], resolve)
						},
						{ // 更换手机号第一步
							path: '/personSettingPhone',
							name: 'personSettingPhone',
							component: resolve => require(['@/views/main/settings/personSetting/SettingPhone'], resolve)
						},
						{ // 更换手机号第二部
							path: '/personSettingPhoneAfter',
							name: 'personSettingPhoneAfter',
							component: resolve => require(['@/views/main/settings/personSetting/SettingPhoneAfter'], resolve)
						},
						{ // 更换密码
							path: '/personSettingPwd',
							name: 'personSettingPwd',
							component: resolve => require(['@/views/main/settings/personSetting/SettingPwd'], resolve)
						},
					]
        },
        { // 企业信息管理
          path: '/companySetting',
          name: 'companySetting',
          component: resolve => require(['@/views/main/settings/companySetting/companySetting'], resolve)
        },
        { // 查看企业信息
          path: '/checkCompany',
          name: 'checkCompany',
          component: resolve => require(['@/views/main/settings/companySetting/checkCompany'], resolve)
        },
        { // 系统反馈
          path: '/feedback',
          name: 'feedback',
          component: resolve => require(['@/views/main/settings/feedback/feedback'], resolve)
        },
        { // 系统通知
          path: '/talkwithSystem',
          name: 'talkwithSystem',
          component: resolve => require(['@/views/main/settings/talkWithSystem/talkwithSystem'], resolve)
        },
        { // 职位沟通列表
          path: '/sealTalkList',
          name: 'sealTalkList',
          component: resolve => require(['@/views/main/sealTalk/sealTalkList'], resolve)
        },
        { // 职位沟通详情页
          path: '/sealTalkDetail',
          name: 'sealTalkDetail',
          component: resolve => require(['@/views/main/sealTalk/sealTalkDetail'], resolve)
        }
      ]
    },{
      path: '/403',
      meta: {
          title: '403-权限不足'
      },
      name: 'error-403',
      component: resolve => { require(['@//views/error-page/403.vue'], resolve); }
    },{
      path: '/500',
      meta: {
          title: '500-服务端错误'
      },
      name: 'error-500',
      component: resolve => { require(['@/views/error-page/500.vue'], resolve); }
    },{
      path: '/*',
      name: 'error-404',
      meta: {
          title: '404-页面不存在'
      },
      component: resolve => { require(['@/views/error-page/404.vue'], resolve); }
    }
  ]
})

Vue.mixin({
	beforeRouteLeave (to, from , next) {
		console.log('from', from)
		let arr = window.sessionStorage.getItem('label_list') ? JSON.parse(window.sessionStorage.getItem('label_list')) : []
		if (from.path == '/' || from.path == '/register' || from.path == '/forgetPwd' || from.path == '/main') {
			next()
		} else {
			let bool = true
			for (let val of arr) {
					if (val.name == from.path) {
						bool = false
					}
			}
			console.log('bool', bool, arr)
			if (bool) {
				this.$destroy()
			}
			next()
		}
	}
})
console.log(router1, Vue.prototype)
let routerLoading
router1.beforeEach((to, from, next) => {
  if(from.name == "signUp" || from.name == "login" || from.name == "register" || from.name == "forgetPwd"){
    routerLoading = Vue.prototype.$loading({
      target: '#app',
      text: '正在努力加载',
      spinner: 'el-icon-loading'
    })
    next()
  }else{
    routerLoading = Vue.prototype.$loading({
      target: '#main',
      text: '正在努力加载',
      spinner: 'el-icon-loading'
    })
    next()
  }
})

router1.afterEach(route => {
  routerLoading.close()
})
export let router = router1
