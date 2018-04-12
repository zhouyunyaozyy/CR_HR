<template>
  <div class="systemTalked">
    <div class="systemTalkedBody">
      <div class="talked" v-for='(item, index) in tableMsg'>
        <h4>{{item.title}}</h4>
        <p>{{item.args}}</p>
        <p>{{item.args}}</p>
        <span @click='checkDetail(index)'>查看详情</span>
      </div>
    </div>
    <div class="btns" v-if="1 > 0">
        <el-pagination
        layout="prev, pager, next" @current-change="pageChange"
        :total="count" :page-size="limit" :currentPage="start">
      </el-pagination>
    </div>
  </div>
</template>

<script>
  /* eslint-disable */
  import store from '@/store'
  export default {
    data () {
      return {
        tableMsg: [],
        count: 0, // 总体条数
        start: 1,   // 第几页 从 0 开始
        pager: 0, // 页数
        limit: 4 // 每页条数
      }
    },
    created () {
      this.showTable()
    },
    methods: {
      showTable () {
        store.state.ajax({
          url: '/push/queryHrPush',
          type: 'post',
          data: {_start: this.start, _limit: this.limit},
          success: (res) => {
            if (res.code === 1) {
              console.log(res)
              this.tableMsg = res.data.data
              this.count = res.data.count
              this.start = res.data.start
              this.pager = res.data.pager
            }
//            this.loading = false
          }
        })
      },
      pageChange (val) { // 输入页数跳转
        this.start = val
        console.log('val', val)
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
    background-color: #eff1f6;
    width: 100%;
    padding: 20px;
  }
  .systemTalkedBody{
    width: 100%;
    padding: 20px;
    background-color: white;
    box-sizing: border-box;
    overflow: hidden;
  }
  .talked{
    width: 100%;
    padding: 16px 12px;
    box-sizing: border-box;
    border: 1px solid #D8DDEB;
    margin-top: 20px;
    line-height: 25px;
    position: relative;
    overflow: hidden;
    min-height: 120px;
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
    overflow:hidden; 

    text-overflow:ellipsis;

    display:-webkit-box; 

    -webkit-box-orient:vertical;

    -webkit-line-clamp:2; 
  }
  .talked>p:last-of-type{
    display: none;
  }
  .talked>span:hover{
    color: #aebee1;
  }
  .talked:hover{
    box-shadow: 0 4px 5px 0 rgba(0,0,0,0.20);
  }
  .btns{
      width: 100%;
/*      max-width: 1100px;*/
      margin: auto;
      padding: 40px 0 20px 20px;
      margin-bottom: 30px;
      background-color: white;
  }
</style>
