<template>
  <el-container height="100%">
    <el-header>
      <div class="logo_cont">
        <span class="logo_txt">超人招聘企业管理平台</span>
      </div>
      <div class="user_name">欢迎回来！ 旺旺</div>
      <div class="right_icon">
        <div class="icon_item" v-if="group_id != 1">
          <span class="icon_txt">职位沟通</span>
        </div>
        <div class="icon_item">
          <span class="icon_txt">设置</span>
        </div>
      </div>
    </el-header>
    <el-container>
      <el-aside width="200px">
        <div class="time_cont">
          <div>
            <div class="week_time">星期四</div>
            <div class="time_time">16:10</div>
            <div class="day_time">2018.4.15</div>
          </div>
        </div>
        <el-menu
          router
          :default-active="$route.path"
          class="aside_label"
          @select="handleSelect"
          background-color="#1f282d"
          text-color="#fff"
          active-text-color="#fff" >
          <el-menu-item index="/account" v-if="group_id == 1">
            <i class="el-icon-menu"></i>
            <span slot="title">HR账号管理</span>
          </el-menu-item>
          <el-submenu index="1" v-if="group_id != 1">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>简历管理</span>
            </template>
            <el-menu-item index="1-1">职位简历</el-menu-item>
            <el-menu-item index="1-2">简历收藏</el-menu-item>
          </el-submenu>
          <el-menu-item index="/position">
            <i class="el-icon-menu"></i>
            <span slot="title">职位管理</span>
          </el-menu-item>
        </el-menu>
      </el-aside>
      <el-main>
        <div class="label_cont">
          <el-tabs
            v-model="tabIndex"
            type="card"
            closable
            @tab-remove="removeTab"
            @tab-click="clickTab"
          >
            <el-tab-pane
              v-for="(item, index) in label_list"
              :key="item.name"
              :label="item.title"
              :name="item.name">
            </el-tab-pane>
          </el-tabs>
        </div>
        <div class="content">
          <keep-alive>
            <router-view/>
          </keep-alive>
        </div>
      </el-main>
    </el-container>
  </el-container>
</template>
<script>
	import '@/css/iconfont/iconfont.css'
    export default {
      name: "index",
      data() {
        return {
          group_id:1,
          label_list:JSON.parse(window.sessionStorage.getItem("label_list")) || [],
          tabIndex: window.sessionStorage.getItem("tabIndex") || ""
        }
      },
      components:{
        // WLabel
      },
      methods: {
        handleSelect(key,keyPath){
          let state = false;
          var label_arr = this.label_list;
          if(label_arr.length > 0){
            label_arr.forEach((item) => {
              console.log(item)
              if(item.name === key){
                state = true;
                return;
              };
            })
          }
          if(state == false){
            let titleName;
            switch (key){
              case "/account":
                titleName = "HR账号管理"
                break;
              case "/position":
                titleName = "职位管理"
                break;
            }
            label_arr.push({
              title: titleName,
              name: key,
            })
            window.sessionStorage.setItem("label_list",JSON.stringify(label_arr))
            window.sessionStorage.setItem("tabIndex",key)
            this.label_list = label_arr;
            this.tabIndex = key
          }else{
            window.sessionStorage.setItem("tabIndex",key)
            this.tabIndex = key
          }
        },
        handleOpen(key, keyPath) {
          console.log(key, keyPath);
        },
        handleClose(key, keyPath) {
          console.log(key, keyPath);
        },
        clickTab(VueComponent) {
          this.$router.push({path: VueComponent.name});
          console.log(VueComponent.name)
        },
        removeTab(targetName) {
          console.log(targetName)
          let tabs = this.label_list;
          let activeName = this.tabIndex;
          if (activeName === targetName) {
            tabs.forEach((tab, index) => {
              if (tab.name === targetName) {
                let nextTab = tabs[index + 1] || tabs[index - 1];
                if (nextTab) {
                  activeName = nextTab.name;
                }
              }
            });
          }
          tabs = tabs.filter(tab => tab.name !== targetName);
          window.sessionStorage.setItem("label_list",JSON.stringify(tabs))
          window.sessionStorage.setItem("tabIndex",activeName)
          this.tabIndex = activeName;
          this.label_list = tabs
        }
      }
    }
</script>
<style scoped>
  .el-aside{
    position:fixed;
    top:60px;
    bottom:0px;
    left: 0px;
    background-color: #1f282d;
  }
  .el-header{
    color:#fff;
    font-size: 20px;
    background: url(./../../assets/header_bj.png) no-repeat center;
    height: 60px;
    display: flex;
    align-items: center;
    padding: 0;
  }
  .logo_cont{
    flex: 0 0 300px;
    padding-left: 20px;
    text-align: left;
  }
  .user_name{
    flex: 1;
    text-align: center;
  }
  .right_icon{
    flex: 0 0 300px;
    display: flex;
    justify-content: flex-end;
  }
  .icon_item{
    padding-right: 40px;
  }
  .el-container{
    height: 100%;
  }
  .time_cont{
    color:#fff;
    height: 120px;
    border-bottom: 1px solid #080b0c;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 10px;
  }
  .time_time{
    font-size: 22px;
    padding:15px 0 10px;
  }
  .el-menu{
    border:0;
  }
  .aside_label>li{
    border-left: 4px solid transparent;
    color:#fff;
    font-size: 18px;
    padding-left: 10px;
    text-align: left;
  }
  .aside_label>.is-active{
    border-left-color: #048adf;
    background-color: #4e5d66;
  }
  .el-main{
    height: 100%;
    margin-left: 200px;
    background-color: #eff9ff;
    padding: 0;
  }
  .label_cont{
    height: 40px;
    background: #fff;
  }
  .content{
    min-height: calc(100% - 101px);
    overflow: auto;
    padding: 10px;
  }
</style>
