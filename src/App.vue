<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
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
	.el-input__inner::-webkit-input-placeholder { color: #808080; }

	/* Mozilla Firefox 4 to 18 */
	.el-input__inner::-moz-placeholder { color:#808080; }

	/* Mozilla Firefox 19+ */
	.el-input__inner::-moz-placeholder { color:#808080; }

	/* Internet Explorer 10+ */
	.el-input__inner::-ms-input-placeholder { color:#808080; }
*{
  margin: 0;
  padding: 0;
}
</style>
