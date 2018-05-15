<template>
  <div class="index_cont" @click="hidePage">
    <div class="g_container" height="100%">
      <div class="g_header">
        <div class="logo_cont">
          <img src="@/assets/logo.png" alt="">
          <span class="logo_txt">超人招聘企业管理平台</span>
        </div>
        <div class="user_name">欢迎回来！ {{name}}</div>
        <div class="right_icon">
          <div class="icon_item" @click='goSealTalkDetail'>
            <i class="iconfont icon-ai-message"></i>
            <span class="icon_txt">职位沟通</span>
						<i v-if='showIcon'></i>
          </div>
          <div class="icon_item">
            <el-dropdown @command="handleCommand" trigger="click">
              <div class="el-dropdown-link">
                <i class="iconfont icon-shezhi-tianchong"></i>
                <span class="icon_txt">设置</span>
								<i v-if='showSystemIcon'></i>
              </div>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item command="/personSettingUser">个人信息</el-dropdown-item>
                <el-dropdown-item command="/checkCompany">企业信息</el-dropdown-item>
                <el-dropdown-item command="/talkWithSystem">系统通知</el-dropdown-item>
                <el-dropdown-item command="/feedback">反馈</el-dropdown-item>
                <el-dropdown-item @click.native='quit'>退出</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </div>
        </div>
      </div>
      <div class="g_main">
        <div class="g_aside" width="200px">
          <!--<div class="time_cont">-->
            <!--&lt;!&ndash;<div>&ndash;&gt;-->
              <!--&lt;!&ndash;<div class="week_time">{{showDay}}</div>&ndash;&gt;-->
              <!--&lt;!&ndash;<div class="time_time">{{showHours + ":" + showM + ":" + showS}}</div>&ndash;&gt;-->
              <!--&lt;!&ndash;<div class="day_time">{{showYear + "." + showMonth + "." + showDate}}</div>&ndash;&gt;-->
            <!--&lt;!&ndash;</div>&ndash;&gt;-->
            <!--<div id="clock">-->
              <!--<p class="date">{{showYear + "." + showMonth + "." + showDate}}</p>-->
              <!--<p class="time">{{showHours + ":" + showM + ":" + showS}}</p>-->
            <!--</div>-->
          <!--</div>-->
          <div ref="elmenu">
            <el-menu
              router
              :default-active="$route.path"
              class="aside_label"
              @select="menuSelect"
              background-color="#1f282d"
              text-color="#fff"
              active-text-color="#fff" >
              <el-menu-item index="/hrList" v-if="mainOrChildren == 'main'">
                <i class="iconfont icon-zhanghao00"></i>
                <span slot="title">账号管理</span>
              </el-menu-item>
              <el-menu-item index="/jobList" v-if='permissionConfig.length > 0 && permissionConfig[2].seeJob == true'>
                <i class="iconfont icon-pipeizhiwei"></i>
                <span slot="title">职位管理</span>
              </el-menu-item>
              <el-submenu index='/resume' v-if='permissionConfig.length > 0 && permissionConfig[0].seeRecruitDetail == true'>
                <template slot="title">
                  <i class="iconfont icon-wendang" :class="{is_open:is_open}"></i>
                  <span>简历管理</span>
                </template>
                <el-menu-item-group>
                  <el-menu-item index="/resumeList">职位简历</el-menu-item>
                  <el-menu-item index="/resumeCollect">简历收藏</el-menu-item>
                </el-menu-item-group>
              </el-submenu>
            </el-menu>
          </div>
        </div>
        <div class="main_content">
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
            <div @click="refresh()" class="refresh_btn" v-if='label_list.length > 0'>
              <img src="@/assets/refresh.png" alt="">
            </div>
          </div>
          <div class="content" id="main">
            <div v-if="$route.name == 'main'" class="mainPngDiv">
              <img src="../../imgs/main.png">
            </div>
            <keep-alive>
              <router-view/>
            </keep-alive>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
	import area from '@/area.json';
	import Default from '@/default.json';
  const global = require('@/global.js')
  let RongIMClient = RongIMLib.RongIMClient
    export default {
      name: "index",
      data() {
        return {
					name: window.sessionStorage.getItem('name'),
          group_id:1,
          sub_show:false,
					localTalkData: [],
					uid: '',
					showIcon: false, // 职位沟通小红点
					showSystemIcon: false, // 设置小红点
          g_state:true,
					mainOrChildren: '',
					permissionConfig: [],
          is_open:false,
          showDay:"",
          showHours:0,
          showM:0,
          showS:0,
          showYear:0,
          showMonth:0,
          showDate:0,
        }
      },
      components:{
        // WLabel
      },
			created () {
        // this.initDate();
        // setInterval(this.initDate,1000)
				console.log('router', this.$route)
				this.permissionConfig = JSON.parse(window.sessionStorage.getItem('permissionConfig'))
				this.mainOrChildren = window.sessionStorage.getItem('mainOrChildren')
				let _form = Default
				_form.area = area.area
				// console.log('_form', _form)
				window.sessionStorage.setItem('localData', JSON.stringify(_form))

//				初始化融云
				this.uid = window.sessionStorage.getItem('uid')
				if (window.localStorage.getItem(this.uid)) {
					this.localTalkData = JSON.parse(window.localStorage.getItem(this.uid))
					for (let val of this.localTalkData) {
						if (val.showIcon) {
							this.showIcon = true
						} else {
							this.showIcon = false
						}
					}
				}
				RongIMClient.init(global.configSelf.appKey) // 初始化融云程序
				RongIMLib.RongIMEmoji.init() // 初始化融云表情包
				// 设置连接状态监听
				RongIMClient.setConnectionStatusListener({
					onChanged: (status) => {
						switch (status) {
							// 链接成功
							case RongIMLib.ConnectionStatus.CONNECTED:
								console.log('链接成功')
								break
							// 正在链接
							case RongIMLib.ConnectionStatus.CONNECTING:
								console.log('正在链接')
								break
							// 重新链接
							case RongIMLib.ConnectionStatus.DISCONNECTED:
								console.log('断开连接')
								break
							// 其他设备登陆
							case RongIMLib.ConnectionStatus.KICKED_OFFLINE_BY_OTHER_CLIENT:
								this.$alert('该账号已在其他位置使用，点击确认按钮可重新登录。', '提示', {
									confirmButtonText: '确定',
									callback: action => {
									  this.$router.push({name:"login"})
//											RongIMClient.connect(window.sessionStorage.getItem('rongToken'), {
//											onSuccess: function (userId) {
//												console.log('Login successfully.' + userId)
//											// userId是申请token时的填写的id，到时候可以封装在下面的extra中传过去
//											},
//											onTokenIncorrect: function () {
//												console.log(' token无效')
//											},
//											onError: function (errorCode) {
//												var info = ''
//												switch (errorCode) {
//													case RongIMLib.ErrorCode.TIMEOUT:
//														info = '超时'
//														break
//													case RongIMLib.ErrorCode.UNKNOWN_ERROR:
//														info = '未知错误'
//														break
//													case RongIMLib.ErrorCode.UNACCEPTABLE_PaROTOCOL_VERSION:
//														info = '不可接受的协议版本'
//														break
//													case RongIMLib.ErrorCode.IDENTIFIER_REJECTED:
//														info = 'appkey不正确'
//														break
//													case RongIMLib.ErrorCode.SERVER_UNAVAILABLE:
//														info = '服务器不可用'
//														break
//												}
//												console.log(errorCode, info)
//											}
//										})
									}
								})
								break
							// 网络不可用
							case RongIMLib.ConnectionStatus.NETWORK_UNAVAILABLE:
	//              console.log('网络不可用')
								this.$message({
									message: '网络不可用，请刷新页面',
									duration: 3000,
									type: 'error'
								})
								break
						}
					}
				})
      	let nowThis = this
      // 连接融云
      	this.$axios({
        url: global.urlSelf.rong.getToken,
        type: 'get',
        fuc: (res) => {
					window.sessionStorage.setItem('rongToken', res.data)
					RongIMClient.connect(res.data, {
						onSuccess: function (userId) {
							console.log('Login successfully.' + userId)
						// userId是申请token时的填写的id，到时候可以封装在下面的extra中传过去
						},
						onTokenIncorrect: function () {
							console.log(' token无效')
							nowThis.$notify.error({
								title: '错误',
								message: '聊天页面token出错,请刷新页面重试或联系后台管理员'
							})
						},
						onError: function (errorCode) {
							var info = ''
							switch (errorCode) {
								case RongIMLib.ErrorCode.TIMEOUT:
									info = '超时'
									break
								case RongIMLib.ErrorCode.UNKNOWN_ERROR:
									info = '未知错误'
									break
								case RongIMLib.ErrorCode.UNACCEPTABLE_PaROTOCOL_VERSION:
									info = '不可接受的协议版本'
									break
								case RongIMLib.ErrorCode.IDENTIFIER_REJECTED:
									info = 'appkey不正确'
									break
								case RongIMLib.ErrorCode.SERVER_UNAVAILABLE:
									info = '服务器不可用'
									break
							}
							console.log(errorCode, info)
						}
					})
        }
      })
      // 接收消息
				RongIMClient.setOnReceiveMessageListener({
							// 接收到的消息
					onReceived: (message) => {
							// 判断消息类型
							let newObj = {}
							let rrid = ''
		// message接受到的消息（包含发送的信息，也可以在extra中添加要传递的值，如：时间等
						console.log('res', message)
						switch (message.messageType) {
							case RongIMClient.MessageType.TextMessage:
									// do something...
									newObj = {content: RongIMLib.RongIMEmoji.emojiToHTML(message.content.content), class: 'left', type: 'text', time: message.receivedTime}
									rrid = JSON.parse(message.content.extra).rrid
								break
							case RongIMClient.MessageType.VoiceMessage:
									// do something...
									newObj = {content: message.content.content, class: 'left', type: 'voice', time: message.receivedTime}
									rrid = JSON.parse(message.content.extra).rrid
								break
							case RongIMClient.MessageType.ImageMessage:
									// do something...
									newObj = {url: message.content.imageUri, class: 'left', type: 'image', time: message.receivedTime}
									rrid = JSON.parse(message.content.extra).rrid
								break
							case RongIMClient.MessageType.DiscussionNotificationMessage:
									// do something...
								break
							case RongIMClient.MessageType.LocationMessage:
									// do something...
								break
							case RongIMClient.MessageType.RichContentMessage:
									// do something...
								break
		//            case RongIMClient.MessageType.DiscussionNotificationMessage:
		//                // do something...
		//              break
							case RongIMClient.MessageType.InformationNotificationMessage:
									// do something...
								break
							case RongIMClient.MessageType.ContactNotificationMessage:
									// do something...
								break
							case RongIMClient.MessageType.ProfileNotificationMessage:
									// do something...
								break
							case RongIMClient.MessageType.CommandNotificationMessage:
									// do something...
								break
							case RongIMClient.MessageType.CommandMessage:
									// do something...
								break
							case RongIMClient.MessageType.UnknownMessage:
									// do something...
								if (message.objectName === 'RC:SightMsg') {
									newObj = {content: message.content.message.content.content, class: 'left', type: 'video', url: message.content.message.content.sightUrl, time: message.receivedTime}
									if (message.content.message.content.extra) {
										rrid = JSON.parse(message.content.message.content.extra).rrid
									} else {
										rrid = JSON.parse(message.content.message.content.name).rrid
									}

//                    if (message.senderUserId === this.targetId) {
//                        this.talkData.push(newObj)
//                    } else {
//                        this.pushData(message.senderUserId, newObj)
//                    }
								}
								break
							default:
							// 自定义消息
							// do something...
						}
						if (newObj.class) {
//							document.getElementsByClassName('talkList')[0].style.display = 'inline-block'
							this.setLocalTalk(message.senderUserId ,rrid, newObj)
						}
					}
				})

				this.$axios({
					url: '/dabai-chaorenjob/notice/getHrNoticeNumber',
					type: 'post',
					fuc: (res) => {
						if(parseInt(res.data) > 0) {
							this.showSystemIcon = true
						} else {
							this.showSystemIcon = false
						}
					}
				})
			},
      computed:{
        includePageNames (){
          return this.$store.state.tj.includePageNames
        },
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
        },
				getlocalTalkData () {
					return this.$store.state.zyy.localTalkData
				}
      },
			watch: {
				getlocalTalkData (obj) {
					console.log('obj', obj)
					this.localTalkData = obj
					let bool = true
					for (let val of this.localTalkData) {
						if (val.showIcon) {
							this.showIcon = true
							bool = false
						}
					}
					if (bool) {
						this.showIcon = false
					}
				},
				tabIndex (val) {
					console.log('route', this.$route)
					// console.log('val', val)
//					if (val && val != 0) {
//						this.tabIndex = val
//						console.log('tabindex', Boolean(val))
//						this.$router.push({path: this.tabIndex});
//					} else {
//						this.$router.push({path: '/main'});
//					}
				}
			},
      methods: {
        initDate(){
          let date = new Date();
          let day = date.getDay();
          if(date.getSeconds() < 10){
            this.showS = "0" + date.getSeconds();
          }else{
            this.showS = date.getSeconds();
          }
          if(date.getMinutes() < 10){
            this.showM = "0" + date.getMinutes();
          }else{
            this.showM = date.getMinutes();
          }
          if(date.getHours() < 10){
            this.showHours = "0" + date.getHours();
          }else{
            this.showHours = date.getHours();
          }
          this.showYear = date.getFullYear();
          if(date.getMonth() < 9){
            this.showMonth = "0" + (date.getMonth()+1);
          }else{
            this.showMonth = date.getMonth()+1;
          }
          if(date.getDate() < 10){
            this.showDate = "0" + date.getDate();
          }else{
            this.showDate = date.getDate();
          }
          switch (day){
            case 1:
              this.showDay = "星期一"
              break;
            case 2:
              this.showDay = "星期二"
              break;
            case 3:
              this.showDay = "星期三"
              break;
            case 4:
              this.showDay = "星期四"
              break;
            case 5:
              this.showDay = "星期五"
              break;
            case 6:
              this.showDay = "星期六"
              break;
            case 7:
              this.showDay = "星期天"
              break;
          }
        },
        hidePage (){
          this.$store.state.tj.isPage = false;
        },
				quit () { // 退出
					console.log('quit')
					try {
						RongIMClient.getInstance().disconnect()
						this.$router.push('/')
					}
					catch (err) {
						this.$router.push('/')
					}

				},
        // 保存聊天记录
				setLocalTalk (userId, rrid, obj) {
					for (let i in this.localTalkData) {
						if (userId === this.localTalkData[i].targetId) {
//							判断聊天时间间隔
							let objTime = new Date(parseInt(obj.time))
							let lastedTime = this.localTalkData[i].content.length > 0 ? new Date(parseInt(this.localTalkData[i].content[this.localTalkData[i].content.length - 1].time)) : 0
							if (this.localTalkData[i].content.length > 0 && objTime.toLocaleString('chinese', {hour12: false}).split(' ')[0] == lastedTime.toLocaleString('chinese', {hour12: false}).split(' ')[0] && objTime.getHours() == lastedTime.getHours() && objTime.getMinutes() - lastedTime.getMinutes() < 5 ) { // 是否属于同一天
								obj.showTime = false
							} else {
								obj.showTime = true
							}

							this.localTalkData[i].content.push(obj)
							this.localTalkData[i].showIcon = true
							this.localTalkData.unshift(this.localTalkData.splice(i, 1)[0])
							this.$store.state.zyy.localTalkData = JSON.parse(JSON.stringify(this.localTalkData))
							window.localStorage.setItem(this.uid, JSON.stringify(this.localTalkData))
//							console.log('had', this.localTalkData[i])
							return
						}
					}
					let newArr = []
					obj.showTime = true
					newArr[0] = obj
					this.localTalkData.unshift({targetId: userId, rrid: rrid, content: newArr, showIcon: true})
					this.$store.state.zyy.localTalkData = JSON.parse(JSON.stringify(this.localTalkData))
					window.localStorage.setItem(this.uid, JSON.stringify(this.localTalkData))
				},
        refresh(){
				  this.$store.state.tj.isRefresh = true;
          this.$router.push("/appBack");
        },
        clickTab(VueComponent) {
          // console.log(VueComponent.name,VueComponent)
          this.$store.commit('changeTab',VueComponent.name)
          this.$router.push({
            path:VueComponent.name
          });
        },
        removeTab(targetName) {
          this.$store.commit('removeTab',targetName)
					if (this.$store.state.tj.label_list.length < 1) {
						this.$router.push({path: 'main'});
					} else {
						this.$router.push({path: this.tabIndex});
					}

        },
				handleCommand (val) { // 设置跳转路由
					if (val) {
						this.$router.push(val)
					}
				},
				goSealTalkDetail () {
					window.sessionStorage.setItem('targetIdBool', false)
					this.$router.push('sealtalkDetail')
				},
        menuSelect( index, indexPath){
          switch (index){
            case "/resumeList":
              this.is_open = true;
              break;
            case "/resumeCollect":
              this.is_open = true;
              break;
            default:
              this.is_open = false;
              break;
          }
          console.log( index, indexPath)
        }
      }
    }
</script>
<style>
  .aside_label>.el-menu-item,.aside_label>.el-submenu>.el-submenu__title{
    /*border-left: 4px solid transparent;*/
    color:#fff;
    font-size: 18px;
    padding-left: 10px;
    text-align: left;
  }
  .aside_label .iconfont{
    font-size: 24px;
  }
  .aside_label .el-submenu__title .iconfont{
    font-size: 20px;
  }
/*
  .aside_label>.is-active,.aside_label>.is-opened>.el-submenu__title{
    border-left-color: #048adf;
    background-color: #4e5d66 !important;
  }
*/
  .aside_label .is-active{
    /*border-left-color: #048adf;*/
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
  .aside_label .el-submenu__title i.is_open{
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
  .index_cont .el-input__inner,.el-textarea__inner{
    color:#333;
    border-color:#bbb;
    font-size: 14px;
    height: 30px;
  }
  .index_cont .el-input__inner{
    line-height: 30px;
  }
	.index_cont .icon_item{
		position: relative;
	}
	.index_cont .icon_item>i:nth-of-type(2){
		width: 10px;
		height: 10px;
		display: inline-block;
		border-radius: 10px;
		position: absolute;
		top: 0;
		right: 128px;
		background-color: #e76049;
	}
	.index_cont .el-dropdown-link>i:nth-of-type(2){
		width: 10px;
		height: 10px;
		display: inline-block;
		border-radius: 10px;
		position: absolute;
		top: 0;
		right: 48px;
		background-color: #ff2121;
	}
</style>
<style scoped>
  .index_cont{
    height: 100%;
  }
  .g_container{
    height: 100%;
  }
  .g_aside{
    position:fixed;
    top: 60px;
    bottom:0px;
    left: 0px;
    width: 200px;
    background-color: #1f282d;
    z-index: 99;
  }
  .g_header{
    color:#fff;
    font-size: 20px;
    background: url(./../../assets/header_bj.png) no-repeat left center;
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
    position: relative;
  }
  .time_time{
    font-size: 22px;
    padding:15px 0 10px;
  }
  .el-menu{
    border:0;
  }
  .g_main{
    height: calc(100% - 60px);
    padding-left: 200px;
  }
  .main_content{
    height: 100%;
    width: 100%;
    box-sizing: border-box;
    background-color: #eff9ff;
    /*margin-left: 200px;*/
    position: relative;
  }
  .label_cont{
    height: 40px;
    background: #fff;
    width: 100%;
    min-width: 1000px;
    display: flex;
    overflow: hidden;
    /*position: fixed;*/
    /*top:60px;*/
    /*right: 0;*/
    /*z-index: 100;*/
/*    border-bottom: 10px solid #eff9ff;*/
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
    position: absolute;
    top: 40px;
    left: 0;
    right: 0;
    bottom: 0;
    min-height: calc(100% - 70px);
    overflow: auto;
/*    margin: 0 10px 10px;*/
    margin-top: 10px;
  }
	.content>div{
		margin:0 10px 10px;
	}
	.content>.mainPngDiv{
		width: 100%;
		height: 100%;
		margin: 0;
		text-align: center;
		background-color: white;
	}
	.mainPngDiv>img{
		margin-top: 100px;
	}

  #clock {
    font-family: 'Share Tech Mono', monospace;
    color: #ffffff;
    text-align: center;
    position: absolute;
    left: 50%;
    top: 50%;
    -webkit-transform: translate(-50%, -50%);
    transform: translate(-50%, -50%);
    color: #daf6ff;
    text-shadow: 0 0 20px #0aafe6, 0 0 20px rgba(10, 175, 230, 0);
  }
  #clock .time {
    letter-spacing: 0.05em;
    font-size: 20px;
    padding: 5px 0;
  }
  #clock .date {
    letter-spacing: 0.1em;
    font-size: 16px;
  }
  #clock .text {
    letter-spacing: 0.1em;
    font-size: 12px;
    padding: 20px 0 0;
  }

</style>
