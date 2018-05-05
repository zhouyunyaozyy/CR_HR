<template>
  <div class="signUp">
    <header>
      <img src="../../imgs/logo.png">
      <p>超人招聘</p>
      <p>专注航空领域人才招聘</p>
    </header>
    <div>
      <router-view></router-view>
    </div>
    <footer>
      Copyright ©2018 chaorenjob.com 蜀ICP备18009198号-1
    </footer>
  </div>
</template>
<style lang='css' scoped="true">
  .signUp{
    width: 100%;
    height: 100%;
    min-height: 900px;
    position: relative;
  }
  header{
    width: 100%;
    height: 436px;
    overflow: hidden;
    text-align: center;
    background-image: url(../../imgs/bg.png);
		background-size: cover;
  }
  header>img{
    width: 115px;
    height: 92px;
    margin-top: 150px;
    margin-bottom: 7px;
  }
  header>p:first-of-type{
    font-size: 24px;
    color: white;
    font-family: PingFangSC-Regular;
  }
  header>p:last-of-type{
    font-size: 20px;
    color: white;
    font-family: PingFangSC-Regular;
  }
  .signUp>div{
    width: 340px;
    margin: auto;
  }
  footer{
    position: absolute;
    bottom: 28px;
    left: 0;
    right: 0;
    text-align: center;
    font-family: PingFangSC-Regular;
    font-size: 16px;
    color: #000000;
  }
</style>