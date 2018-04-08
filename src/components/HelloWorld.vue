<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <h2 @click='click'>Essential Links</h2>
    <ul>
      <li>
        <a
          href="https://vuejs.org"
          target="_blank"
        >
          Core Docs
        </a>
      </li>
      <li>
        <a
          href="https://forum.vuejs.org"
          target="_blank"
        >
          Forum
        </a>
      </li>
      <li>
        <a
          href="https://chat.vuejs.org"
          target="_blank"
        >
          Community Chat
        </a>
      </li>
      <li>
        <a
          href="https://twitter.com/vuejs"
          target="_blank"
        >
          Twitter
        </a>
      </li>
      <br>
      <li>
        <a
          href="http://vuejs-templates.github.io/webpack/"
          target="_blank"
        >
          Docs for This Template
        </a>
      </li>
    </ul>
    <h2>Ecosystem</h2>
    <ul>
      <li>
        <a
          href="http://router.vuejs.org/"
          target="_blank"
        >
          vue-router
        </a>
      </li>
      <li>
        <a
          href="http://vuex.vuejs.org/"
          target="_blank"
        >
          vuex
        </a>
      </li>
      <li>
        <a
          href="http://vue-loader.vuejs.org/"
          target="_blank"
        >
          vue-loader
        </a>
      </li>
      <li>
        <a
          href="https://github.com/vuejs/awesome-vue"
          target="_blank"
        >
          awesome-vue
        </a>
      </li>
    </ul>
  </div>
</template>

<script>
import store from '@/store'
export default {
  name: 'HelloWorld',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  },
  methods: {
    click () {
//      this.$router.push({
//        path: '/hello',
//        query: {id: 123}
//      })
      
      store.state.pageStatus = 'login'
      let user = {}
      user.phone = '13888888888'
      user.pwd = '123456'
      store.commit('jiami', user)
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
          url: '/dabai-chaorenjob-ca/hr/getUserInfoByTickets',
          fuc: (res) => {
            console.log('loginAfter', res)
          }
        })
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
