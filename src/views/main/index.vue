<template>
  <div class="index_cont">
    <el-container height="100%">
      <el-header>
        <div class="logo_cont">
          <img src="@/assets/logo.png" alt="">
          <span class="logo_txt">超人招聘企业管理平台</span>
        </div>
        <div class="user_name">欢迎回来！ 旺旺</div>
        <div class="right_icon">
          <div class="icon_item">
            <i class="iconfont icon-ai-message"></i>
            <span class="icon_txt">职位沟通</span>
          </div>
          <div class="icon_item">
            <el-dropdown>
              <div class="el-dropdown-link">
                <i class="iconfont icon-shezhi-tianchong"></i>
                <span class="icon_txt">设置</span>
              </div>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item>个人信息</el-dropdown-item>
                <el-dropdown-item>企业信息</el-dropdown-item>
                <el-dropdown-item>系统通知</el-dropdown-item>
                <el-dropdown-item>反馈</el-dropdown-item>
                <el-dropdown-item>退出</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
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
          <div ref="elmenu">
            <el-menu
              router
              :default-active="$route.path"
              class="aside_label"
              background-color="#1f282d"
              text-color="#fff"
              active-text-color="#fff" >
              <el-menu-item index="/hrList" v-if="group_id == 1">
                <i class="iconfont icon-zhanghao00"></i>
                <span slot="title">账号管理</span>
              </el-menu-item>
              <el-submenu index="1">
                <template slot="title">
                  <i class="iconfont icon-wendang"></i>
                  <span>简历管理</span>
                </template>
                <el-menu-item-group>
                  <el-menu-item index="/resumeList">职位简历</el-menu-item>
                  <el-menu-item index="/resumeCollect">简历收藏</el-menu-item>
                </el-menu-item-group>
              </el-submenu>
              <el-menu-item index="/jobList">
                <i class="iconfont icon-pipeizhiwei"></i>
                <span slot="title">职位管理</span>
              </el-menu-item>
            </el-menu>
          </div>
        </el-aside>
        <el-main>
          <div class="label_cont">
            <div class="label_main">
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
            <div @click="refresh()" class="refresh_btn">
              <img src="@/assets/refresh.png" alt="">
            </div>
          </div>
          <div class="content">
            <keep-alive>
              <router-view/>
            </keep-alive>
          </div>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>
<script>
	import '@/css/iconfont/iconfont.css'
	import area from '@/area.json';
	import Default from '@/default.json';
    export default {
      name: "index",
      data() {
        return {
          group_id:1,
          sub_show:false,
        }
      },
      components:{
        // WLabel
      },
			created () {
				let _form = Default
				_form.area = area.area
				console.log('_form', _form)
				window.sessionStorage.setItem('localData', JSON.stringify(_form))
			},
      computed:{
        label_list (){
          return this.$store.state.tj.label_list;
        },
        tabIndex: {
          get (){
            return this.$store.state.tj.tabIndex;
          },
          set (newKey){
            this.$store.commit('changeTab',newKey)
          }
        }
      },
      methods: {
        refresh(){
          this.$router.push({path: this.tabIndex});
        },
        handleSelect(key,keyPath){
          console.log(this.$refs.elmenu)
          // this.$store.commit('addTab',keyPath)
        },
        handleOpen(key, keyPath) {
          console.log(key, keyPath);
        },
        handleClose(key, keyPath) {
          console.log(key, keyPath);
        },
        clickTab(VueComponent) {
          // console.log(VueComponent.name,VueComponent)
          this.$store.commit('changeTab',VueComponent.name)
          this.$router.push({
            path:VueComponent.name
          });
        },
        removeTab(targetName) {
          console.log(targetName)
          this.$store.commit('removeTab',targetName)
          this.$router.push({path: this.tabIndex});
        }
      }
    }
</script>
<style>
  .aside_label>.el-menu-item,.aside_label>.el-submenu>.el-submenu__title{
    border-left: 4px solid transparent;
    color:#fff;
    font-size: 18px;
    padding-left: 10px;
    text-align: left;
  }
  .aside_label>.is-active,.aside_label>.is-opened>.el-submenu__title{
    border-left-color: #048adf;
    background-color: #4e5d66 !important;
  }
  .aside_label .el-menu-item-group{
    margin-bottom: 10px;
  }
  .aside_label .el-menu-item-group__title{
    padding: 0;
  }
  .aside_label .el-menu-item-group .el-menu-item{
    height: 35px;
    line-height: 35px;
    text-align: center;
    font-size: 16px;
  }
  .aside_label .el-menu-item-group .el-menu-item.is-active{
    background-color: #151b1e;
  }
  .aside_label .el-submenu__title i{
    color:#fff;
  }
  .label_cont .el-tabs--card>.el-tabs__header .el-tabs__nav{
    border-radius: 0;
  }
  .label_cont .el-tabs--card>.el-tabs__header .el-tabs__item.is-active{
    /*background-color: #e6e6e6;*/
    /*border-bottom: 1px solid #e4e7ed;*/
    /*color:#333;*/
    /*border-bottom: 3px solid #2d8cf0;*/
    font-weight: bold;
  }
  .label_cont .el-tabs__item{
    /*box-sizing: border-box;*/
    /*border-bottom: 3px solid transparent;*/
    /*color:#666;*/
  }
  .el-input__inner,.el-textarea__inner{
    color:#333;
    border-color:#bbb;
    font-size: 14px;
    height: 30px;
  }
</style>
<style scoped>
  .index_cont{
    height: 100%;
  }
  .el-container{
    height: 100%;
  }
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
    display: flex;
    justify-content: flex-start;
    align-items: center;
  }
  .logo_cont img{
    width: 40px;
    margin-right: 10px;
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
    position: relative;
  }
  .icon_item .iconfont{
    font-size: 20px;
  }
  .icon_item .el-dropdown-link{
    color:#fff;
    font-size: 20px;
  }
  .set_main{
    position: absolute;
    top:47px;
    right:40px;
    background-color: #fff;
    width: 170px;
    box-shadow: 0px -2px 10px rgba(0,0,0,.2);
    color:#808080;
    font-size: 18px;
    text-align: center;
    border-radius: 5px;
    z-index: 100;
  }
  .set_main i.set_cont_icon{
    position: absolute;
    top:-20px;
    right:20px;
    width: 0;
    height: 0;
    border:10px solid transparent;
    border-bottom-color: #fff;
  }
  .set_item{
    height: 55px;
    line-height: 55px;
    box-sizing: border-box;
    border-bottom: 1px solid #dbdbdb;
  }
  .time_cont{
    color:#fff;
    height: 120px;
    border-bottom: 1px solid #080b0c;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 10px;
    text-align: center;
  }
  .time_time{
    font-size: 22px;
    padding:15px 0 10px;
  }
  .el-menu{
    border:0;
  }
  .el-main{
    height: 100%;
    margin-left: 200px;
    background-color: #eff9ff;
    padding: 0;
    position: relative;
  }
  .label_cont{
    height: 40px;
    background: #fff;
    /*padding-left: 10px;*/
    display: flex;
    overflow: hidden;
    /*margin-bottom: 10px;*/
    position: fixed;
    top:60px;
    left: 200px;
    right: 0;
    z-index: 100;
    border-bottom: 10px solid #eff9ff;
  }
  .label_main{
    flex: 1;
  }
  .refresh_btn{
    flex: 0 0 60px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .content{
    position: relative;
    /*top: 40px;*/
    /*left: 0;*/
    /*right: 0;*/
    /*bottom: 0;*/
    /*margin-top: 40px;*/
    min-height: calc(100% - 70px);
    overflow: auto;
    margin: 50px 10px 10px;
  }
</style>
