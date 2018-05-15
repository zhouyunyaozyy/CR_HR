<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>

import '@/css/iconfont/iconfont.css'
export default {
  name: 'App',
	watch: {
		$route (to, from) {
			if (to.name != 'login' && to.name != 'register' && to.name != 'forgetPwd') {
				let keyPath={
					name:to.name,
					path:to.path,
					params:to.params
				}
				this.$store.commit('addTab',keyPath)
				// console.log(123, to,from)
				// 执行ajax请求，但只希望在进入时请求，离开时不希望进行请求。
				// this.getData()
			}
		}
	}
}
</script>

<style>
  #app {
    font-family: "Microsoft YaHei",'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    font-size: 12px;
    /*color: #2c3e50;*/
    /*margin-top: 60px;*/
    min-width: 1200px;
    height: 100%;
    letter-spacing:1px;
  }
  html,body{
    height: 100%;
  }
	/* WebKit browsers */
	.el-input__inner::-webkit-input-placeholder { color: #808080; font-size: 14px;}

	/* Mozilla Firefox 4 to 18 */
	.el-input__inner::-moz-placeholder { color:#808080; font-size: 14px;}

	/* Mozilla Firefox 19+ */
	.el-input__inner::-moz-placeholder { color:#808080; font-size: 14px;}

	/* Internet Explorer 10+ */
	.el-input__inner::-ms-input-placeholder { color:#808080; font-size: 14px;}
  *{
    margin: 0;
    padding: 0;
  }
  a{
    text-decoration:none;
  }
</style>
