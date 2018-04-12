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
				<el-checkbox-group v-model="checkList">
					<el-checkbox label="复选框 A" :class='tabClassName'>
						<div>
							<img src="../../../imgs/logo_min.png">
							<p><span>王三三</span><time>17:34</time></p>
							<p>已发送，请查收，谢谢</p>
							<i></i>
						</div>
					</el-checkbox>
					<el-checkbox label="复选框 A" :class='tabClassName'>
						<div>
							<img src="../../../imgs/logo_min.png">
							<p><span>王三三</span><time>17:34</time></p>
							<p>已发送，请查收，谢谢</p>
							<i></i>
						</div>
					</el-checkbox>
					<el-checkbox label="复选框 A" :class='tabClassName'>
						<div>
							<img src="../../../imgs/logo_min.png">
							<p><span>王三三</span><time>17:34</time></p>
							<p>已发送，请查收，谢谢</p>
							<i></i>
						</div>
					</el-checkbox>
					<el-checkbox label="复选框 A" :class='tabClassName'>
						<div>
							<img src="../../../imgs/logo_min.png">
							<p><span>王三三</span><time>17:34</time></p>
							<p>已发送，请查收，谢谢</p>
							<i></i>
						</div>
					</el-checkbox>
					<el-checkbox label="复选框 A" :class='tabClassName'>
						<div>
							<img src="../../../imgs/logo_min.png">
							<p><span>王三三</span><time>17:34</time></p>
							<p>已发送，请查收，谢谢</p>
							<i></i>
						</div>
					</el-checkbox>
					<el-checkbox label="复选框 A" :class='tabClassName'>
						<div>
							<img src="../../../imgs/logo_min.png">
							<p><span>王三三</span><time>17:34</time></p>
							<p>已发送，请查收，谢谢</p>
							<i></i>
						</div>
					</el-checkbox>
					<el-checkbox label="复选框 A" :class='tabClassName'>
						<div>
							<img src="../../../imgs/logo_min.png">
							<p><span>王三三</span><time>17:34</time></p>
							<p>已发送，请查收，谢谢</p>
							<i></i>
						</div>
					</el-checkbox>
					<el-checkbox label="复选框 A" :class='tabClassName'>
						<div>
							<img src="../../../imgs/logo_min.png">
							<p><span>王三三</span><time>17:34</time></p>
							<p>已发送，请查收，谢谢</p>
							<i></i>
						</div>
					</el-checkbox>
					<el-checkbox label="复选框 A" :class='tabClassName'>
						<div>
							<img src="../../../imgs/logo_min.png">
							<p><span>王三三</span><time>17:34</time></p>
							<p>已发送，请查收，谢谢</p>
							<i></i>
						</div>
					</el-checkbox>
					<el-checkbox label="复选框 A" :class='tabClassName'>
						<div>
							<img src="../../../imgs/logo_min.png">
							<p><span>王三三</span><time>17:34</time></p>
							<p>已发送，请查收，谢谢</p>
							<i></i>
						</div>
					</el-checkbox>
					<el-checkbox label="复选框 A" :class='tabClassName'>
						<div>
							<img src="../../../imgs/logo_min.png">
							<p><span>王三三</span><time>17:34</time></p>
							<p>已发送，请查收，谢谢</p>
							<i></i>
						</div>
					</el-checkbox>
					<el-checkbox label="复选框 A" :class='tabClassName'>
						<div>
							<img src="../../../imgs/logo_min.png">
							<p><span>王三三</span><time>17:34</time></p>
							<p>已发送，请查收，谢谢</p>
							<i></i>
						</div>
					</el-checkbox>
					<el-checkbox label="复选框 A" :class='tabClassName'>
						<div>
							<img src="../../../imgs/logo_min.png">
							<p><span>王三三</span><time>17:34</time></p>
							<p>已发送，请查收，谢谢</p>
							<i></i>
						</div>
					</el-checkbox>
					<el-checkbox label="复选框 A" :class='tabClassName'>
						<div>
							<img src="../../../imgs/logo_min.png">
							<p><span>王三三</span><time>17:34</time></p>
							<p>已发送，请查收，谢谢</p>
							<i></i>
						</div>
					</el-checkbox>
					<el-checkbox label="复选框 B">
						<div>
							<img src="../../../imgs/logo_min.png">
							<p><span>王三三</span><time>17:34</time></p>
							<p>已发送，请查收，谢谢！已发送，请查收，谢谢！</p>
						</div>
					</el-checkbox>
					<el-checkbox label="复选框 B">
						<div>
							<img src="../../../imgs/logo_min.png">
							<p><span>王三三</span><time>17:34</time></p>
							<p>已发送，请查收，谢谢！已发送，请查收，谢谢！</p>
						</div>
					</el-checkbox>
					<el-checkbox label="复选框 B">
						<div>
							<img src="../../../imgs/logo_min.png">
							<p><span>王三三</span><time>17:34</time></p>
							<p>已发送，请查收，谢谢！已发送，请查收，谢谢！</p>
						</div>
					</el-checkbox>
					<el-checkbox label="复选框 B">
						<div>
							<img src="../../../imgs/logo_min.png">
							<p><span>王三三</span><time>17:34</time></p>
							<p>已发送，请查收，谢谢！已发送，请查收，谢谢！</p>
						</div>
					</el-checkbox>
				</el-checkbox-group>
				<el-button v-if='!tabClassName' icon="el-icon-delete" @click='manageSelect'>管理</el-button>
				<el-button v-else @click='deleteSelect' class='selectBtn'>确认删除</el-button>
			</div>
			<div class="sealTalkContainBody">
				<div class="sealTalkContainBodyContent">
					<time>2018/3/21 13:56</time>
					<div class="left">
						<div>
							<img src="../../../imgs/logo_min.png">
						</div>
						<div class='text'>文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字</div>
					</div>
					<div class="right">
						<div>
							<img src="../../../imgs/logo_min.png">
						</div>
						<div class='text'>文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字</div>
					</div>
					<div class="left">
						<div>
							<img src="../../../imgs/logo_min.png">
						</div>
						<div class='text'>文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字</div>
					</div>
					<div class="right">
						<div>
							<img src="../../../imgs/logo_min.png">
						</div>
						<div class='text'>文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字</div>
					</div>
					<div class="left">
						<div>
							<img src="../../../imgs/logo_min.png">
						</div>
						<div class='image'>
							<img src="../../../imgs/logo_min.png">
						</div>
					</div>
					<div class="left">
						<div>
							<img src="../../../imgs/logo_min.png">
						</div>
						<div class='video'>
							<video controls src="../../../imgs/hei.mp4"></video>
						</div>
					</div>
				</div>
				<div class="sealTalkContainInput">
					<div>
						<img src="../../../imgs/logo_min.png" v-popover:popover4>
					</div>
					<div>
						<el-input placeholder='请输入内容' type='textarea' :autosize="{ minRows: 2, maxRows: 2}"></el-input>
					</div>
					<div>
						<el-button type='primary'>发送</el-button>
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
			<div>
				<img src="../../../imgs/logo_min.png">
			</div>
			<div>
				<img src="../../../imgs/logo_min.png">
			</div>
			<div>
				<img src="../../../imgs/logo_min.png">
			</div>
			<div>
				<img src="../../../imgs/logo_min.png">
			</div>
			<div>
				<img src="../../../imgs/logo_min.png">
			</div>
		</el-popover>
	</div>
</template>
<script>
	export default {
		data () {
			return {
				checkList: [],
				tabClassName: ''
			}
		},
		methods: {
			manageSelect () {
				this.tabClassName = 'tabActived'
			},
			deleteSelect () {
				this.tabClassName = ''
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
		top: -25px;
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
		width: 100%;
		box-sizing: border-box;
		overflow: hidden;
		height: 100%;
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
		height: calc(100% - 99px);
		float: left;
		background-color: #fff;
		position: relative;
		overflow: hidden;
		border-right: 1px solid #e6e6e6;
	}
	.sealTalkContainTab>div{
		width: 100%;
/*		overflow: hidden;*/
		overflow-y: scroll;
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
	.sealTalkContainTab>div>label>span>div{
		padding: 20px 0;
/*		overflow: hidden;*/
		width: 100%;
		position: relative;
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
		height: calc(100% - 99px);
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
	.sealTalkContainBodyContent>time{
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
	.sealTalkContainBodyContent>.left{
		margin-bottom: 20px;
		overflow: hidden;
		text-align: left;
	}
	.sealTalkContainBodyContent>.left>div:first-child{
		width: 90px;
		height: 50px;
		float: left;
	}
	.sealTalkContainBodyContent>.left>div:first-child>img{
		width: 50px;
		height: 50px;
		border-radius: 4px;
		margin-left: 20px;
	}
	.sealTalkContainBodyContent>.left>.text{
		width: 420px;
		float: left;
		overflow: hidden;
		background-color: #509ee2;
		padding: 20px 20px;
		border-radius: 4px;
		color: white;
		font-size: 12px;
	}
	.sealTalkContainBodyContent>.left>.image{
		float: left;
		overflow: hidden;
	}
	.sealTalkContainBodyContent>.left>.image>img{
		width: 220px;
	}
	.sealTalkContainBodyContent>.left>.video{
		float: left;
		overflow: hidden;
	}
	.sealTalkContainBodyContent>.left>.video>video{
		width: 220px;
	}
	.sealTalkContainBodyContent>.right{
		margin-bottom: 20px;
		overflow: hidden;
	}
	.sealTalkContainBodyContent>.right>div:first-child{
		width: 90px;
		height: 50px;
		float: right;
	}
	.sealTalkContainBodyContent>.right>div:first-child>img{
		width: 50px;
		height: 50px;
		border-radius: 4px;
		margin-left: 20px;
	}
	.sealTalkContainBodyContent>.right>.text{
		width: 420px;
		float: right;
		overflow: hidden;
		background-color: #f1f5f8;
		padding: 20px 20px;
		border-radius: 4px;
		font-size: 12px;
		text-align: left;
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
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
</style>