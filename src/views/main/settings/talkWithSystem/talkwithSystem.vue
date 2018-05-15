<template>
  <div class="systemTalked">
    <div v-if="tableMsg.length > 0" class="systemTalkedBody">
      <div class="talked" v-for='(item, index) in tableMsg'>
        <h3><i class="iconfont icon-tongzhi"></i>{{item.title}}<time style="color:#808080;float:right;font-size: 12px;font-weight: 200;">{{new Date(parseInt(item.create_time)).toLocaleString('chinese',{hour12: false})}}</time></h3>
        <p>{{item.content}}</p>
        <p>{{item.content}}</p>
        <span @click='checkDetail(index)'>查看详情</span>
      </div>
    </div>
    <div v-else class="no_data">
      <img src="./../../../../imgs/no_data_04.png" alt="">
    </div>
    <div class="btns" v-if="tableMsg.length > 0">
        <el-pagination
						@size-change="handleSizeChange"
						@current-change="handleCurrentChange"
						:current-page.sync="$start"
						:page-size="pageData.pageSize"
						layout="prev, pager, next"
						:total="pageData.count">
					</el-pagination>
    </div>
  </div>
</template>

<script>
  /* eslint-disable */
//  import store from '@/store'
  export default {
    data () {
      return {
        tableMsg: []
      }
    },
    created () {
      this.showTable()
    },
    methods: {
      showTable () {
        this.$axios({
          url: '/dabai-chaorenjob/notice/queryAllHrNoticeOfMine',
          type: 'get',
          data: {_start: this.$start, _limit: this.$limit},
          fuc: (res) => {
            if (res.code == 1) {
              console.log(res)
              this.tableMsg = res.data.data
              this.pageData = res.data
            }
//            this.loading = false
          }
        })
      },
			handleSizeChange (val) {
				this.$limit = val
				this.showTable()
			},
			handleCurrentChange (val) {
				this.$start = val
				this.showTable()
			},
      checkDetail (index) {
        var event = window.event || arguments.callee.caller.arguments[0]
        let target = event.srcElement || event.target
        target.style.display = 'none'
        document.getElementsByClassName('talked')[index].children[1].style.display = 'none'
        document.getElementsByClassName('talked')[index].children[2].style.display = 'block'
      }
    }
  }
</script>

<style lang="css" scoped="true">
  .systemTalked{
/*    background-color: #eff1f6;*/
    width: 100%;
   	box-sizing: border-box;
		padding: 10px;
  }
  .systemTalkedBody{
    width: 100%;
    padding: 10px;
    background-color: white;
    box-sizing: border-box;
    overflow: hidden;
  }
  .talked{
    width: 100%;
    padding: 16px 12px;
    box-sizing: border-box;
    border-bottom: 1px solid #eff9ff;
    margin-top: 20px;
    line-height: 25px;
    position: relative;
    overflow: hidden;
/*    min-height: 120px;*/
  }
  .talked>span{
    position: absolute;
    right: 10px;
    bottom: 10px;
    color: #3F60DD;
    cursor: pointer;
    font-size: 12px;
  }
  .talked>p{
    font-size: 12px;
    line-height: 20px;
  }
  .talked>p:first-of-type{
		overflow: hidden;
    width: calc(100% - 83px);
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 1;
  }
  .talked>p:last-of-type{
    display: none;
  }
  .talked>span:hover{
    color: #aebee1;
  }
  .talked:hover{
/*    box-shadow: 0 4px 5px 0 rgba(0,0,0,0.20);*/
  }
  .btns{
      width: 100%;
/*      max-width: 1100px;*/
      margin: auto;
      padding: 40px 0 20px 20px;
      margin-bottom: 30px;
      background-color: white;
		box-sizing: border-box;
  }
  .systemTalked{
    height: 100%;
  }
  .no_data{
    height: 100%;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }
</style>
