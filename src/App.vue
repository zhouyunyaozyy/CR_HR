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
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  font-size: 14px;
  /*color: #2c3e50;*/
  /*margin-top: 60px;*/
  min-width: 1200px;
}
body{
  height: 100%;
}
*{
  margin: 0;
  padding: 0;
}
</style>
