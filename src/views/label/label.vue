<template>
  <div class="label_cont">
    <!--<div>fadsfasdfasd</div>-->
    <span class="label_item" v-for="item in label_list">{{item}}</span>
  </div>
</template>

<script>
    export default {
        name: "label",
        data(){
          return {
          }
        },
        created:{
        },
        computed: {
          label_list (){
            let label_list = window.localStorage.getItem("label_list").split(",");
            return label_list;
          }
        }
    }
</script>

<style scoped>

</style>
