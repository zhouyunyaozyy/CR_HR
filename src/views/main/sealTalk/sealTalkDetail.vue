<template>
	<div class="sealTalk">
		<div class="sealTalkHead">
			<p><span>应聘职位：成熟乘务员</span><span>应聘者：卢茜</span></p>
			<p><span>薪资范围：成熟乘务员</span><span>求职意向：卢茜</span></p>
			<el-button>查看简历</el-button>
		</div>
		<div class="sealTalkContain">
			<div class="sealTalkContainTab">123</div>
			<div class="sealTalkContainBody"></div>
		</div>
	</div>
</template>
<style scoped="true">
	.sealTalk{
		width: 100%;
		box-sizing: border-box;
		padding: 10px;
		overflow: hidden;
		height: 1000px;
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
		color: #ff8955;
	}
	.sealTalkHead>p:first-of-type{
		margin-bottom: 20px;
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
		background-color: #bee6ff;
	}
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
</style>