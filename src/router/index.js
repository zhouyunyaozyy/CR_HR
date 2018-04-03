import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import helloworld1 from '@/components/helloworld1'

Vue.use(Router)
const router1 = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/hello',
      name: 'helloworld1',
      component: helloworld1
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
    console.log(321)
    next()
})

router1.afterEach(route => {
  routerLoading.close()
  console.log(123)
})

export let router = router1
