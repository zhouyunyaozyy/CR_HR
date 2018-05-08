<template>

</template>

<script>
  export default {
    name: "appBack",
    activated (){
      // this.$store.commit("refresh")
			
      this.$router.push(window.sessionStorage.getItem("tabIndex"))
    }
  }
</script>

<style scoped>

</style>
