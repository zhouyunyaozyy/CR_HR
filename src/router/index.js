import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import helloworld1 from '@/components/helloworld1'
import iHtml from '@/views/index/index'
import test1 from '@/views/test/test1'
import test2 from '@/views/test/test2'
import test3 from '@/views/test/test3'

Vue.use(Router)
const router1 = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'iHtml',
      component: iHtml,
      children:[
        {
          path: '/',
          name: 'test1',
          component: test1,
        }
      ]
    },
    {
      path: '/signUp',
      name: 'signUp',
      component: resolve => require(['@/views/signUp/index'], resolve),
      children:[
        {
          path: '/login',
          name: 'login',
          component: resolve => require(['@/views/signUp/login'], resolve),
        },
        {
          path: '/register',
          name: 'register',
          component: resolve => require(['@/views/signUp/register'], resolve),
        },
        {
          path: '/forgetPwd',
          name: 'forgetPwd',
          component: resolve => require(['@/views/signUp/forgetPwd'], resolve),
        }
      ]
    },{
      path: '/HelloWorld',
      name: 'HelloWorld',
      component: HelloWorld
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
    },
    {
      path: '/hello',
      name: 'helloworld1',
      component: helloworld1
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

console.log(router1, Vue.prototype)
let routerLoading
router1.beforeEach((to, from, next) => {
    routerLoading = Vue.prototype.$loading({
      target: '#app',
      text: '正在努力加载',
      spinner: 'el-icon-loading'
    })
    next()
})

router1.afterEach(route => {
  routerLoading.close()
})

export let router = router1
