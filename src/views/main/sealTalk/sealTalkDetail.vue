<template>
	<div class="sealTalk">
<!--
		<div class="sealTalkHead">
			<p><span>应聘职位：成熟乘务员</span><span>应聘者：卢茜</span></p>
			<p><span>薪资范围：成熟乘务员</span><span>求职意向：卢茜</span></p>
			<el-button>查看简历</el-button>
		</div>
-->
		<div class="sealTalkContain">
			<div class="sealTalkContainTab">
				<span v-if='localTalkData.length < 1' style="margin: 100% 10px 0;display: inline-block;">暂无最新消息</span>
				<el-checkbox-group v-model="checkList">
					<el-checkbox v-for='item in tabsList' :label="item.targetId" @click.native='switchTab(item.targetId)' :key='item.targetId' :class='tabClassName' :id='item.targetId'>
						<div>
							<img :src="item.url">
							<p><span>{{item.name}}</span><time>{{new Date(parseInt(item.time)).toLocaleString('chinese', {hour12: false}).split(' ')[0] == new Date().toLocaleString('chinese', {hour12: false}).split(' ')[0] ? new Date(parseInt(item.time)).toLocaleString('chinese', {hour12: false}).split(' ')[1].split(':')[0] + ':' + new Date(parseInt(item.time)).toLocaleString('chinese', {hour12: false}).split(' ')[1].split(':')[1] : new Date(parseInt(item.time)).toLocaleString('chinese', {hour12: false}).split(' ')[0].split('/')[0] + '/' + new Date(parseInt(item.time)).toLocaleString('chinese', {hour12: false}).split(' ')[0].split('/')[1] + ' ' + new Date(parseInt(item.time)).toLocaleString('chinese', {hour12: false}).split(' ')[1].split(':')[0] + ':' + new Date(parseInt(item.time)).toLocaleString('chinese', {hour12: false}).split(' ')[1].split(':')[1]}}</time></p>
							<p v-if="item.type == 'text'">{{item.content}}</p>
							<p v-else-if="item.type == 'video'">[视频]</p>
							<p v-else-if="item.type == 'image'">[图片]</p>
							<p v-else-if="item.type == 'PersonMessage'">就此职位与您沟通</p>
							<i v-if='item.showIcon'></i>
						</div>
					</el-checkbox>
				</el-checkbox-group>
				<el-button v-if='!tabClassName' icon="el-icon-delete" @click='manageSelect'>管理</el-button>
				<el-button v-else @click='deleteSelect' class='selectBtn'>确认删除</el-button>
			</div>
			<div class="sealTalkContainBody">
				<div class="sealTalkContainBodyContent">
					<div v-for='item in talkData' :key='item.time'>
						<time v-if="item.showTime && item.type != 'PersonMessage'">{{new Date(parseInt(item.time)).toLocaleString('chinese', {hour12: false}).split(' ')[0] == new Date().toLocaleString('chinese', {hour12: false}).split(' ')[0] ? new Date(parseInt(item.time)).toLocaleString('chinese', {hour12: false}).split(' ')[1].split(':')[0] + ':' + new Date(parseInt(item.time)).toLocaleString('chinese', {hour12: false}).split(' ')[1].split(':')[1] : new Date(parseInt(item.time)).toLocaleString('chinese', {hour12: false}).split(' ')[0].split('/')[0] + '/' + new Date(parseInt(item.time)).toLocaleString('chinese', {hour12: false}).split(' ')[0].split('/')[1] + ' ' + new Date(parseInt(item.time)).toLocaleString('chinese', {hour12: false}).split(' ')[1].split(':')[0] + ':' + new Date(parseInt(item.time)).toLocaleString('chinese', {hour12: false}).split(' ')[1].split(':')[1]}}</time>
						<div :class="item.class">
							<div>
								<img v-if="item.class == 'left'" :src="appUserUrl" @click='goRecruitDetail'>
								<img v-if="item.class == 'right' && item.type != 'PersonMessage'" :src="myImgUrl">
							</div>
							<div :class='item.type' v-if="item.type == 'text'"><pre v-html='item.content'></pre></div>
							<div :class='item.type' v-else-if="item.type == 'image'">
								<img :src="item.url">
							</div>
							<div :class='item.type' v-else-if="item.type == 'video'">
								<video controls :src="item.url"></video>
							</div>
							<div :class='item.type' v-else-if="item.type == 'PersonMessage'">
								<span>应聘职位：{{item.content.job.name}}</span>
								<span>应聘者：{{item.content.job.name_full}}</span>
								<span v-for="val in localData.wages" v-if="item.content.job.wages == val.code">薪资范围：{{val.name}}</span>
								<span>求职意向：{{item.content.job.target_name}}</span>
							</div>
						</div>
					</div>
				</div>
				<div class="sealTalkContainInput">
					<div v-popover:popover4>
						<div v-if='emojisData.length > 0' v-html='emojisData[0].node.innerHTML'></div>
					</div>
					<div>
						<el-input placeholder='请输入内容' @keyup.ctrl.enter.native='getMessage' v-model='textareaData' type='textarea' :autosize="{ minRows: 2, maxRows: 2}"></el-input>
					</div>
					<div>
						<el-button type='primary' @click='getMessage'>发送</el-button>
						<span>按Ctrl+Enter可快捷发送</span>
					</div>
				</div>
			</div>
		</div>
		<el-popover
			ref="popover4"
			placement="top"
			width="400"
			trigger="click">
			<div v-for='item in emojisData' v-html='item.node.innerHTML' @click="getEmoji(item.symbol)">
			</div>
		</el-popover>
	</div>
</template>
<script>
  let RongIMClient = RongIMLib.RongIMClient
	export default {
		data () {
			return {
				checkList: [], // 选中的用户聊天
				tabClassName: '',
				textareaData: '',
				jobInfo: {},
				myImgUrl: '',
				appUserUrl: '',
				emojisData: [],
				jid: '',
				targetId: '',
				rrid: '',
				talkData: [], // 当前聊天内容
				localTalkData: [], // 本地聊天记录
				tabsList: [] // 所有用户聊天信息
			}
		},
    computed: {
      getlocalTalkData () {
        return this.$store.state.zyy.localTalkData
      }
    },
		watch:{
			getlocalTalkData (obj) {
				this.localTalkData = obj
        for (let val of this.localTalkData) {
          if (this.targetId === val.targetId) {
            this.talkData = val.content // 加载本地与应聘者会话记录
						if (val.showIcon) {
							console.log('修改icon')
							val.showIcon = false
							this.$store.state.zyy.localTalkData = JSON.parse(JSON.stringify(this.localTalkData))
							window.localStorage.setItem(this.uid, JSON.stringify(this.localTalkData))
							return
						}
          }
        }
//				console.log('list', this.tabsList)
				if (this.tabsList.length < this.localTalkData.length) {
					this.tabsList = []
				}
				
				for (let val in this.localTalkData) {
					let nowData = this.localTalkData[val]
					if (this.tabsList[val]) {
							this.tabsList[val].type = nowData.content.length > 0 ? nowData.content[nowData.content.length - 1].type : ''
							if (this.tabsList[val].time != nowData.content[nowData.content.length - 1].time) {
								this.tabsList[val].time = nowData.content.length > 0 ? nowData.content[nowData.content.length - 1].time : new Date().getTime()
							}
							if (this.tabsList[val].content != nowData.content[nowData.content.length - 1].content) {
								this.tabsList[val].content = nowData.content.length > 0 ? nowData.content[nowData.content.length - 1].content : '暂无'
							}
					} else {
						 this.$set(this.tabsList, val, {url: '', name: '', type: nowData.content.length > 0 ? nowData.content[nowData.content.length - 1].type : '', targetId: nowData.targetId, time: nowData.content.length > 0 ? nowData.content[nowData.content.length - 1].time : new Date().getTime(), content: nowData.content.length > 0 ? nowData.content[nowData.content.length - 1].content : '暂无', showIcon: false})
					}
					this.$axios({
						url: '/dabai-chaorenjob/resumeReceived/getRongInfoByRrid',
						type: 'get',
						data: {rrid: nowData.rrid},
						fuc: (res) => {
							let data = res.data
							if (!this.tabsList[val].url) {
								this.tabsList[val].url = data.headerUrl
							}
							if (!this.tabsList[val].name) {
								this.tabsList[val].name = data.name
							}
//							this.$set(this.tabsList, val, {url: data.headerUrl, name: data.name, type: nowData.content.length > 0 ? nowData.content[nowData.content.length - 1].type : '', targetId: nowData.targetId, time: nowData.content.length > 0 ? nowData.content[nowData.content.length - 1].time : new Date().getTime(), content: nowData.content.length > 0 ? nowData.content[nowData.content.length - 1].content : '暂无', showIcon: nowData.showIcon})
							this.$nextTick(() => {
								console.log('targetId', this.targetId)
								if (document.getElementsByClassName('actived')[0]) {
									document.getElementsByClassName('actived')[0].classList.remove('actived')
								}
								for (let val of document.getElementsByClassName('actived')) {
									val.classList.remove('actived')
								}
								if (document.getElementById(this.targetId)) {
									console.log(1, document.getElementsByClassName('actived')[0])
//									document.getElementsByClassName('actived')[0].classList.remove('actived')
									document.getElementById(this.targetId).classList.add('actived')
								}
							})
						}
					})
				}
				
//				console.log('list', this.tabsList)
//        this.$nextTick(() => {
//          let divArr = document.getElementsByClassName('detailBody')[0].children
//          divArr[divArr.length-1].scrollIntoView()
//        })
			}
		},
		activated () {
      this.localData = JSON.parse(window.sessionStorage.getItem('localData'))
			this.uid = window.sessionStorage.getItem('uid') // 公司信息
			this.emojisData = RongIMLib.RongIMEmoji.list // 表情包
			if (window.sessionStorage.getItem('targetIdBool') == 'true') { // 从简历详情页进入聊天
				console.log('targetIdTrue', Boolean(window.sessionStorage.getItem('targetIdBool')), false)
				this.targetId = window.sessionStorage.getItem('targetId')
				this.rrid = window.sessionStorage.getItem('targetRrid')
				this.getJobInfo()
	//        // 若存在公司历史纪录
				if (window.localStorage.getItem(this.uid)) {
					this.localTalkData = JSON.parse(window.localStorage.getItem(this.uid))

					// 检测历史有没有应聘者当前会话，若没有，则添加一个会话；若有，加载会话
					let hasBool = false
					for (let val of this.localTalkData) {
	//          this.tabsData.push({targetId: val.targetId,name: val.targetId})
						if (this.targetId === val.targetId) {
							this.talkData = val.content // 加载本地与应聘者会话记录
//							if (this.rrid !== val.rrid) {
//								val.rrid = this.rrid
//							}
							val.showIcon = false
							hasBool = true
						}
					}
					if (!hasBool) {
						this.talkData = []
						this.localTalkData.unshift({
							targetId: this.targetId,
							content: this.talkData,
							rrid: this.rrid,
							showIcon: false
						})
						window.localStorage.setItem(this.uid, JSON.stringify(this.localTalkData))
					}
						// 若没有公司历史纪录
				} else {
					this.localTalkData.unshift({
						targetId: this.targetId,
						content: this.talkData,
						rrid: this.rrid,
						showIcon: false
					})
					window.localStorage.setItem(this.uid, JSON.stringify(this.localTalkData))
				}
				this.getAppUserHeader(this.rrid)
			} else { // 从首页职位沟通进入
				console.log('targetIdfalse')
				if (window.localStorage.getItem(this.uid)) {
					this.localTalkData = JSON.parse(window.localStorage.getItem(this.uid))
					this.rrid = this.localTalkData[0].rrid
					this.targetId = this.localTalkData[0].targetId
					this.talkData = this.localTalkData[0].content // 加载本地与应聘者会话记录
					this.getJobInfo()
					this.getAppUserHeader(this.rrid)
					this.localTalkData[0].showIcon = false
				}
			}
			// 获取曾有过会话的所有应聘者图片、姓名等信息
      for (let val of this.localTalkData) {
				this.$axios({
					url: '/dabai-chaorenjob/resumeReceived/getRongInfoByRrid',
					type: 'get',
					data: {rrid: val.rrid},
					fuc: (res) => {
						let data = res.data
//						this.tabsList.push({url: data.headerUrl, name: data.name, type: val.content.length > 0 ? val.content[val.content.length - 1].type : '', targetId: val.targetId, time: val.content.length > 0 ? val.content[val.content.length - 1].time : new Date().getTime(), content: val.content.length > 0 ? val.content[val.content.length - 1].content : '暂无'})
						this.$nextTick(() => {
//							console.log(1234, document.getElementById(this.targetId))
//							if (document.getElementById(this.targetId)) {
//								document.getElementById(this.targetId).classList.add('actived')
//							}
						})
					}
				})
			}
			// 获取公司的图片信息等
			this.$axios({
				url: '/dabai-chaorenjob/common/getCompanyRongInfo',
				type: 'get',
				data: {uid: window.sessionStorage.getItem('uid')},
				fuc: (res) => {
					this.myImgUrl = res.data.headerUrl
				}
			})
			// 判断是否由新职位发起的会话
			for (let val of this.localTalkData) {
				if (val.targetId === this.targetId) {
					if (val.rrid !== this.rrid) {
						console.log('新职位')
						setTimeout(() => {
							this.getMessage(false)
						}, 1000)
					}
					if (val.content.length === 0) {
						console.log('新会话')
						setTimeout(() => {
								this.getMessage(false)
							}, 1000)
					}
				}
			}
			this.$store.state.zyy.localTalkData = JSON.parse(JSON.stringify(this.localTalkData))
			window.localStorage.setItem(this.uid, JSON.stringify(this.localTalkData))
    },
		methods: {
			getAppUserHeader (rrid) {
				this.$axios({
					url: '/dabai-chaorenjob/resumeReceived/getRongInfoByRrid',
					type: 'get',
					data: {rrid: rrid},
					fuc: (res) => {
						this.appUserUrl = res.data.headerUrl
					}
				})
			},
			switchTab (val) {
				if (val == this.targetId) {
					return
				}
				console.log(val, window.event)
				document.getElementById(this.targetId).classList.remove('actived')
				this.targetId = val
				for (let val of this.localTalkData) {
//          this.tabsData.push({targetId: val.targetId,name: val.targetId})
					if (this.targetId === val.targetId) {
						this.talkData = val.content // 加载本地与应聘者会话记录
						this.rrid = val.rrid
						val.showIcon = false
						this.$store.state.zyy.localTalkData = JSON.parse(JSON.stringify(this.localTalkData))
						window.localStorage.setItem(this.uid, JSON.stringify(this.localTalkData))
						this.getAppUserHeader(this.rrid)
					}
				}
				this.$nextTick(() => {
//					if (document.getElementById(this.targetId)) {
//						document.getElementById(this.targetId).classList.add('actived')
//					}
				})
			},
			manageSelect () {
				this.tabClassName = 'tabActived'
			},
      getEmoji (name) {
        this.textareaData += name
      },
			deleteSelect () {
				console.log('checkList', this.checkList)
				for (let val of this.checkList) {
					for (let index = 0; index < this.localTalkData.length; index++) {
						if (val == this.localTalkData[index].targetId) {
							console.log('val', val)
							this.localTalkData.splice(index, 1)
							index--
						}
					}
				}
				this.$store.state.zyy.localTalkData = JSON.parse(JSON.stringify(this.localTalkData))
				window.localStorage.setItem(this.uid, JSON.stringify(this.localTalkData))
				this.tabClassName = ''
				this.talkData = []
				this.rrid = ''
			},
        // 获取当前简历的职位信息
      getJobInfo () {
        this.$axios({
					url: '/dabai-chaorenjob/job/getJobByRRid',
					type: 'get',
					data: {rrid: this.rrid},
					fuc: (res) => {
//						let localData = JSON.parse(window.localStorage.getItem('localData'))
						this.jid = res.data.jid
						this.jobInfo = {"jid": res.data.jid,"rrid": this.rrid,'name_full': res.data.user_name,'name': res.data.job_name,wages: res.data.wages,target_name: res.data.target_name, name_short: res.data.name_short}
					}
				})
      },
      getMessage (bool = true) { // 发送信息
            // 生成聊天内容
  //            $('.content_box').append( 。。。)
            // 在页面追加你要生成的内容

            // 定义消息类型,文字消息使用 RongIMLib.TextMessage
				if (!this.rrid) {
					this.$message.warning('请先选择聊天对象')
					return
				}
        var messageName = "PersonMessage" // 消息名称。
        var objectName = "s:person" // 消息内置名称，请按照此格式命名。
        var mesasgeTag = new RongIMLib.MessageTag(true,true) // 消息是否保存是否计数，true true 保存且计数，false false 不保存不计数。
        var propertys = ["job"] // 消息类中的属性名。
        RongIMClient.registerMessageType(messageName,objectName,mesasgeTag,propertys)
				let msg = ''
        if (bool) {
          let value = this.textareaData
          if (value.replace(/\s+/g, "").replace(/<\/?.+?>/g,"").replace(/[\r\n]/g, "").length>0) {
            msg = new RongIMLib.TextMessage({content: RongIMLib.RongIMEmoji.symbolToEmoji(this.textareaData), extra: this.jobInfo})
          } else {
            this.$message({
              message: '发送消息内容不能为空',
              duration: 1000
            })
            return
          }
        } else {
          msg = new RongIMClient.RegisterMessage.PersonMessage({job: this.jobInfo})
        }
        
//        
        var conversationtype = RongIMLib.ConversationType.PRIVATE // 私聊
//        var targetId = '905964700800385024' // 目标 Id I
        var targetId = this.targetId // 目标 Id Q
        var nowThis = this
        RongIMClient.getInstance().sendMessage(conversationtype, targetId, msg, {
            // 发送消息成功
          onSuccess: function (message) {
          // message 为发送的消息对象并且包含服务器返回的消息唯一Id和发送消息时间戳
            console.log('Send successfully', message)
            if (message.messageType === 'TextMessage') {
              for (let i in nowThis.localTalkData) {
                  if (nowThis.targetId === nowThis.localTalkData[i].targetId) {
			//							判断聊天时间间隔
										let objTime = new Date(parseInt(message.sentTime))
										let lastedTime = nowThis.localTalkData[i].content.length > 0 ? new Date(parseInt(nowThis.localTalkData[i].content[nowThis.localTalkData[i].content.length - 1].time)) : 0
										let showTime = true
										if (nowThis.localTalkData[i].content.length > 0 && objTime.toLocaleString('chinese', {hour12: false}).split(' ')[0] == lastedTime.toLocaleString('chinese', {hour12: false}).split(' ')[0] && objTime.getHours() == lastedTime.getHours() && objTime.getMinutes() - lastedTime.getMinutes() < 5 ) { // 是否属于同一天
											showTime = false
										} else {
											showTime = true
										}
                    nowThis.localTalkData[i].content.push({content: message.content.content, class: 'right', type: 'text', time: message.sentTime, showTime: showTime})
                    nowThis.localTalkData.unshift(nowThis.localTalkData.splice(i, 1)[0])
                    nowThis.$store.state.zyy.localTalkData = JSON.parse(JSON.stringify(nowThis.localTalkData))
                    window.localStorage.setItem(nowThis.uid, JSON.stringify(nowThis.localTalkData))

                    break
                  }
                }
//              nowThis.talkData.push({content: message.content.content, class: 'right', type: 'text', time: message.sentTime})
            } else if (message.messageType === 'PersonMessage') {
                //
//              nowThis.talkData.push({content: message.content, class: 'right', type: 'PersonMessage', time: message.sentTime})
              for (let val of nowThis.localTalkData) {
                if (nowThis.targetId === val.targetId) {
                  val.rrid = nowThis.rrid
                  val.content.push({content: message.content, class: 'right', type: 'PersonMessage', time: message.sentTime, showTime: true})
                  nowThis.localTalkData.unshift(nowThis.localTalkData.splice(nowThis.localTalkData.indexOf(val), 1)[0])
                    nowThis.$store.state.zyy.localTalkData = nowThis.localTalkData
                    window.localStorage.setItem(nowThis.uid, JSON.stringify(nowThis.localTalkData))
										nowThis.$nextTick(() => {
											let divArr = document.getElementsByClassName('sealTalkContainBodyContent')[0].children
											divArr[divArr.length-1].scrollIntoView()
										})
                  break
                }
              }
              //
            }
            nowThis.textareaData = ''
//            nowThis.setLocalTalk()
          },
          onError: function (errorCode, message) {
            var info = ''
            switch (errorCode) {
              case RongIMLib.ErrorCode.TIMEOUT:
                info = '超时'
                break
              case RongIMLib.ErrorCode.UNKNOWN_ERROR:
                info = '未知错误'
                break
              case RongIMLib.ErrorCode.REJECTED_BY_BLACKLIST:
                info = '在黑名单中，无法向对方发送消息'
                break
              case RongIMLib.ErrorCode.NOT_IN_DISCUSSION:
                info = '不在讨论组中'
                break
              case RongIMLib.ErrorCode.NOT_IN_GROUP:
                info = '不在群组中'
                break
              case RongIMLib.ErrorCode.NOT_IN_CHATROOM:
                info = '不在聊天室中'
                break
              default:
                info = 'x'
                break
            }
            console.log('发送失败:' + info)
            nowThis.$message({
              message: '发送失败:' + info + '请重试',
              duration: 1000
            })
          }
        })
      },
			goRecruitDetail () {
				window.sessionStorage.setItem("rrid", this.rrid)
        this.$router.push("/resumeDetail")
			}
		}
	}
</script>
<style lang="css">
	.sealTalkContainTab>div>.tabActived>.el-checkbox__input {
		display: inline-block;
	}
	.sealTalkContainTab>div>label>.el-checkbox__input{
		width: 20px;
		position: relative;
		float: left;
		top: 35px;
		left: 10px;
		margin-right: 6px;
/*		margin: 0px 10px;*/
		display: none;
	}
	.sealTalkContainTab>div>label>.el-checkbox__input>span{
		width: 100%;
		height: 20px;
		border-radius: 20px;
	}
	.sealTalkContainTab>div>label>.el-checkbox__input .el-checkbox__inner::after {
		left: 7px;
		height: 12px;
	}
	.sealTalkContainTab>div>label>.el-checkbox__label{
		width: calc(100% - 10px);
	}
	textarea {
    resize: none !important;
	}
	.sealTalkContainInput>div>div>.el-textarea__inner{
		border: none;
/*			color: #999999;*/
	}
</style>
<style scoped="true">
	.sealTalk{
/*		width: 100%;*/
		box-sizing: border-box;
		overflow: hidden;
		height: calc(100% - 20px);
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
	}
	.sealTalk div{
		box-sizing: border-box;
	}
	.sealTalkHead{
		width: 100%;
		padding: 16px 20px 20px;
		background-color: #fff;
		overflow: hidden;
		position: relative;
		border-bottom: 1px solid #eff9ff;
	}
	.sealTalkHead>p{
		font-size: 16px;
		display: block;
		width: 700px;
	}
	.sealTalkHead>p>span:first-child{
		width: 360px;
		display: inline-block;
	}
	.sealTalkHead>p:last-of-type>span:first-child {
/*		color: #ff8955;*/
	}
	.sealTalkHead>p:first-of-type{
/*		margin-bottom: 20px;*/
	}
	.sealTalkHead>button{
		float: right;
		position: absolute;
		top: 16px;
		right: 16px;
		width: 140px;
		height: 40px;
		border-color: #048adf;
		color: #048adf;
	}
	.sealTalkContain{
		width: 100%;
		height: 100%;
		overflow: hidden;
	}
	.sealTalkContainTab{
		width: 275px;
		height: 100%;
		float: left;
		background-color: #fff;
		position: relative;
		overflow: hidden;
		border-right: 1px solid #e6e6e6;
	}
	.sealTalkContainTab>div{
		width: 100%;
/*		overflow: hidden;*/
		overflow-y: auto;
		overflow-x: hidden;
		height: calc(100% - 40px);
		width: calc(100% + 18px);
	}
	.sealTalkContainTab:hover>div{
		width: 100%;
	}
	.sealTalkContainTab>div>label{
		display: block;
		margin-left: 0;
	}
	.sealTalkContainTab>div>label:not(:first-child){
		border-top: 1px solid #e6e6e6;
	}
	.sealTalkContainTab>div>label:hover{
		background-color: #e5e5e5;
	}
	.sealTalkContainTab>div>.actived{
		background-color: #e5e5e5;
	}
	.sealTalkContainTab>div>label>span>div{
		padding: 20px 0;
/*
		overflow-y: hidden;
		overflow-x: auto;
*/
		clear: both;
		width: 100%;
		position: relative;
	}
	.sealTalkContainTab>div>label>span>div:after { 
		content:""; 
		display: block; 
		clear: both; 
	} 
	.sealTalkContainTab>div>label>span>div>img{
		width: 50px;
		height: 50px;
		float: left;
		border-radius: 4px;
	}
	.sealTalkContainTab>div>label>span>div>p:first-of-type{
		color: #444444;
		font-size: 14px;
/*		margin-top: 20px;*/
		margin-bottom: 14px;
		width: calc(100% - 80px);
		margin-left: 60px;
		padding-right: 20px;
	}
	.sealTalkContainTab>div>label>span>div>p:first-of-type>time{
		color: #666666;
		font-size: 12px;
		float: right;
		display: inline-block;
	}
	.sealTalkContainTab>div>label>span>div>p:last-of-type{
		color: #666666;
		font-size: 12px;
		width: calc(100% - 80px);
		margin-left: 60px;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}
	.sealTalkContainTab>div>label>span>div>i{
		width: 10px;
		height: 10px;
		display: inline-block;
		border-radius: 10px;
		position: absolute;
		background-color: #ff2121;
		top: 14px;
		left: -6px;
	}
	.sealTalkContainTab>button{
/*		position: absolute;*/
/*		bottom: 0;*/
		width: 100%;
		height: 40px;
		background-color: #048adf;
		color: white;
	}
	.sealTalkContainTab>.selectBtn{
		background-color: #bf1212;
	}
	
/*	// 聊天正文*/
	.sealTalkContainBody{
		width: calc(100% - 275px);
		float: left;
		height: 100%;
		background-color: #fafafa;
		overflow: hidden
	}
	.sealTalkContainBodyContent{
		text-align: center;
		width: calc(100% + 18px);
		overflow-y: scroll;
		overflow-x: hidden;
		height: calc(100% - 160px);
/*		border-bottom: 1px solid lightgrey;*/
	}
	.sealTalkContainBodyContent>div>time{
/*		width: 100%;*/
/*		text-align: center;*/
		display: inline-block;
		color: white;
		margin: 0 auto;
		margin-top: 30px;
		margin-bottom: 30px;
		background-color: #dadada;
		padding: 2px 4px;
		border-radius: 4px;
	}
	.sealTalkContainBodyContent>div>.left{
		margin-bottom: 20px;
		overflow: hidden;
		text-align: left;
	}
	.sealTalkContainBodyContent>div>.left>div:first-child{
		width: 90px;
		height: 50px;
		float: left;
	}
	.sealTalkContainBodyContent>div>.left>div:first-child>img{
		width: 50px;
		height: 50px;
		border-radius: 4px;
		margin-left: 20px;
	}
	.sealTalkContainBodyContent>div>.left>.text{
		width: auto;
		max-width: 220px;
		float: left;
		overflow: hidden;
		background-color: #509ee2;
		padding: 20px 20px;
		border-radius: 4px;
		color: white;
		font-size: 12px;
	}
	.sealTalkContainBodyContent>div>.left>.image{
		float: left;
		overflow: hidden;
	}
	.sealTalkContainBodyContent>div>.left>.image>img{
		width: 220px;
	}
	.sealTalkContainBodyContent>div>.left>.video{
		float: left;
		overflow: hidden;
	}
	.sealTalkContainBodyContent>div>.left>.video>video{
		width: 220px;
	}
	.sealTalkContainBodyContent>div>.right{
		margin-bottom: 20px;
		overflow: hidden;
	}
	.sealTalkContainBodyContent>div>.right>div:first-child{
		width: 90px;
		height: 50px;
		float: right;
	}
	.sealTalkContainBodyContent>div>.right>div:first-child>img{
		width: 50px;
		height: 50px;
		border-radius: 4px;
		margin-left: 20px;
	}
	.sealTalkContainBodyContent>div>.right>.text{
		width: auto;
		max-width: 220px;
		float: right;
		overflow: hidden;
		background-color: #f1f5f8;
		padding: 20px 20px;
		border-radius: 4px;
		font-size: 12px;
		text-align: left;
	}
	.sealTalkContainBodyContent>div>.right>.PersonMessage{
		width: calc(100% - 40px);
/*		max-width: 220px;*/
		float: right;
		overflow: hidden;
		background-color: #f1f5f8;
		padding: 20px 0px;
		margin: 0 20px;
		border-radius: 20px;
		position: relative;
		box-sizing: border-box;
		font-size: 12px;
		top: -30px;
/*		text-align: right;*/
	}
	.sealTalkContainBodyContent>div>.right>.PersonMessage>span{
		width: 20%;
		display: inline-block;
		box-sizing: border-box;
/*		padding: 10px;*/
/*		background-color: white;*/
		text-align: center;
/*		border-radius: 4px;*/
		line-height: 20px;
		margin-bottom: 10px;
	}
/*	表情*/
	.el-popover>div{
		display: inline-block;
		padding: 2px 2px 0;
	}
	.el-popover>div:hover{
		background-color: #dadada;
	}
	.el-popover>div>img{
		width: 20px;
		height: 20px;
		border-radius: 6px;
	}
	.sealTalkContainInput>div:first-child{
		background-color: #f0f0f0;
		height: 30px;
		padding: 5px 0;
	}
	.sealTalkContainInput>div:first-child>img{
		height: 20px;
		margin-left: 20px;
	}
	.sealTalkContainInput button{
		width: 140px;
		height: 40px;
		float: right;
		margin: 10px;
	}
	.sealTalkContainInput span{
		float: right;
		color: #999999;
		font-size: 12px;
		display: inline-block;
		margin: 20px 10px 0;
	}
	pre{
		white-space: pre-wrap;
		word-wrap: break-word;
	}
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
</style>