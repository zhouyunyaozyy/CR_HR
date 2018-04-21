<template>
  <div class="settings">
      <div class='settingsHead'>
        <span :class="spanClass" @click='getStatus(1)'>基本信息</span>
        <span :class="spanClass2" @click='getStatus(2)'>登录密码</span>  
        <span :class="spanClass3" @click='getStatus(3)'>更换手机</span>
      </div>
      <div>
        <router-view></router-view>
      </div>
  </div>

</template>
<script>
    /* eslint-disable */
  export default {
   data () {
     return {
       type: 'user',
			 spanClass: 'selectSpan',
			 spanClass2: '',
			 spanClass3: ''
     }
   },
   mounted () {
		 let routePath = this.$route.path.split('/')[1]
		 if (routePath === 'personSettingUser') {
			 this.spanClass = 'selectSpan'
			 this.spanClass2 = ''
			 this.spanClass3 = ''
		 } else if (routePath === 'personSettingPwd') {
			 this.spanClass = ''
			 this.spanClass2 = 'selectSpan'
			 this.spanClass3 = ''
		 } else {
			 this.spanClass = ''
			 this.spanClass2 = ''
			 this.spanClass3 = 'selectSpan'
		 }
   },
   watch: {
     $route: function (obj) {
       let routePath = this.$route.path.split('/')[1]
       if (routePath === 'personSettingUser') {
         this.spanClass = 'selectSpan'
         this.spanClass2 = ''
         this.spanClass3 = ''
       } else if (routePath === 'personSettingPwd') {
         this.spanClass = ''
         this.spanClass2 = 'selectSpan'
         this.spanClass3 = ''
       } else {
         this.spanClass = ''
         this.spanClass2 = ''
         this.spanClass3 = 'selectSpan'
       }
     }
   },
   methods: {
      getStatus (num) {
				let name = 'personSettingUser'
        if (num == 2) {
					name = 'personSettingPwd'
				} else if (num == 3) {
					name = 'personSettingPhone'
				}
				this.$router.push(name)
      },
     setPhone () {
       this.$router.push('/adminSettingsPhone')
     },
     setPwd () {
       this.$router.push('/adminSettingsPwd')
     }
   }
 }
</script>
<style lang="css" scoped>
    .settingsHead{
        width: 100%;
        overflow: hidden;
        background-color: #fff;
    }
    .settingsHead>span{
        float: left;
        width: 214px;
        height: 68px;
        line-height: 68px;
        text-align: center;
        cursor: pointer;
				color: black;
    }
/*
    .settingsHead>span:not(:last-child){
        border-right: 1px solid #d8ddeb;
    }
*/
    .settingsHead>span:hover{
        background-color: #048adf;
			color: white;
    }
    .settingsHead .selectSpan{
        background-color: #048adf;
        color: #fff;
    }
</style>
