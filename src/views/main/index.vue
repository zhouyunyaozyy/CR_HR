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
          <div class="icon_item" @click='goSealTalkDetail'>
            <i class="iconfont icon-ai-message"></i>
            <span class="icon_txt">职位沟通</span>
          </div>
          <div class="icon_item">
            <el-dropdown @command="handleCommand">
              <div class="el-dropdown-link">
                <i class="iconfont icon-shezhi-tianchong"></i>
                <span class="icon_txt">设置</span>
              </div>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item command="/personSettingUser">个人信息</el-dropdown-item>
                <el-dropdown-item command="/companySetting">企业信息</el-dropdown-item>
                <el-dropdown-item command="/talkWithSystem">系统通知</el-dropdown-item>
                <el-dropdown-item command="/feedback">反馈</el-dropdown-item>
                <el-dropdown-item command="a">退出</el-dropdown-item>
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
  const global = require('@/global.js')
  let RongIMClient = RongIMLib.RongIMClient
    export default {
      name: "index",
      data() {
        return {
          group_id:1,
          sub_show:false,
					localTalkData: [],
					uid: '',
          g_state:true,
        }
      },
      components:{
        // WLabel
      },
			created () {
				let _form = Default
				_form.area = area.area
				// console.log('_form', _form)
				window.sessionStorage.setItem('localData', JSON.stringify(_form))

//				初始化融云
				this.uid = window.sessionStorage.getItem('uid')
				if (window.localStorage.getItem(this.uid)) {
					this.localTalkData = JSON.parse(window.localStorage.getItem(this.uid))
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
								console.log('其他设备登陆')
								this.$alert('该账号已在其他位置使用，点击确认按钮可重新登录。', '提示', {
									confirmButtonText: '确定',
									callback: action => {
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
          },
					getlocalTalkData () {
						return this.$store.state.zyy.localTalkData
					}
        }
      },
			watch: {
				getlocalTalkData (obj) {
					console.log('obj', obj)
					this.localTalkData = obj
				},
				tabIndex (val) {
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
        // 保存聊天记录
				setLocalTalk (userId, rrid, obj) {
					for (let i in this.localTalkData) {
						if (userId === this.localTalkData[i].targetId) {
//							判断聊天时间间隔
							let objTime = new Date(parseInt(obj.time))
							let lastedTime = new Date(parseInt(this.localTalkData[i].content[this.localTalkData[i].content.length - 1]))
							if (objTime.toLocaleString('chinese', {hour12: false}).split(' ')[0] == lastedTime.toLocaleString('chinese', {hour12: false}).split(' ')[0] && objTime.getHours() == lastedTime.getHours() && objTime.getMinutes() - lastedTime.getMinutes() < 5 ) { // 是否属于同一天
								obj.showTime = true
							} else {
								obj.showTime = false
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
          this.$router.push({path: this.tabIndex});
        },
				handleCommand (val) { // 设置跳转路由
					this.$router.push(val)
				},
				goSealTalkDetail () {
					this.$router.push('sealtalkDetail')
				},
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
