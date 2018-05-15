<template>
  <div class="page_cont">
    <div class="page_total">共{{count}}条</div>
    <div class="page_list">
      <span class="page_prve"
            :class="{no_active:startPage == 1 || count == 0}"
            @click="prevPage(startPage - 1)">上一页</span>
      <div v-if="pageNum <= 5" class="page_data">
        <span class="page_item"
              @click="changePage(index+1)"
              :class="{is_active:startPage == index+1}"
              v-for="(item,index) in pageCount">{{index+1}}</span>
      </div>
      <div v-else class="page_data">
        <span :class="{is_active:startPage == 1}" @click="changePage(1)" class="page_item">1</span>
        <span :class="{is_active:startPage == 2}"
              @click="changePage(2)"
              v-if="startPage < 4" class="page_item">2</span>
        <span v-else class="page_item"><i class="iconfont icon-ellipsis"></i></span>
        <span :class="{is_active:startPage == 3}"
              @click="changePage(3)"
              v-if="startPage < 4" class="page_item">3</span>
        <span v-else-if="startPage < pageNum - 2"
              @click="changePage(startPage - 1)"
              class="page_item">{{startPage - 1}}</span>
        <span @click="changePage(4)"
              v-if="startPage < 4" class="page_item">4</span>
        <span :class="{is_active:startPage == pageNum - 3}"
              @click="changePage(pageNum - 3)"
              v-else-if="startPage >= pageNum - 2"
              class="page_item"
        >{{pageNum - 3}}</span>
        <span v-else class="page_item is_active">{{startPage}}</span>
        <span v-if="startPage < 4" class="page_item"><i class="iconfont icon-ellipsis"></i></span>
        <span @click="changePage(startPage+1)"
              v-else-if="startPage < pageNum - 2"
              class="page_item">{{startPage + 1}}</span>
        <span :class="{is_active:startPage == pageNum - 2}"
              @click="changePage(pageNum - 2)"
              v-else class="page_item"
        >{{pageNum - 2}}</span>
        <span :class="{is_active:startPage == pageNum - 1}"
              @click="changePage(pageNum - 1)"
              v-if="startPage >= pageNum-2"
              class="page_item"
        >{{pageNum - 1}}</span>
        <span v-else-if="startPage >= 4"
              class="page_item"><i class="iconfont icon-ellipsis"></i></span>
        <span :class="{is_active:startPage == pageNum}"
              @click="changePage(pageNum)"
              class="page_item"
        >{{pageNum}}</span>
      </div>
      <span class="page_next"
            :class="{no_active:startPage == pageNum || count == 0}"
            @click="nextPage(startPage+1)">下一页</span>
    </div>
    <div class="page_size">
      <div @click.stop="showSelect" class="page_size_cont">
        <span class="page_size_show">{{page_size}}条/页</span>
        <i class="iconfont icon-sanjiaoxing-down"></i>
      </div>
      <transition name="down">
        <div v-show="isPage" class="page_size_select">
          <span><i></i></span>
          <div class="page_size_option"
               v-for="(item,index) in page_type"
               @click="changeSize(item)"
               @mouseenter="_hover(index)"
               :class="{is_active:select_state == index}"
          >{{item}}条/页</div>
        </div>
      </transition>
    </div>
    <div class="page_num_cont">
      <span class="page_num">
        <input v-model="jumpNum" type="text" placeholder="0"/>
      </span>
      <span class="page_jump" @click="_jump">跳转</span>
    </div>
  </div>
</template>

<script>
  export default {
    name: "page",
    props:{
      count:{
        type:Number
      },
      page_size:{
        type:Number
      },
      page_type:{
        type:Array
      }
    },
    data (){
      return{
        pageNum:Math.ceil(this.count/this.page_size),
        jumpNum:"",
        select_state:0,
      }
    },
    watch:{
      count (oldVue,newVue){
        this.pageNum = Math.ceil(this.count/this.page_size)
      },
      page_size (oldVue,newVue){
        this.pageNum = Math.ceil(this.count/this.page_size)
      }
    },
    computed:{
      startPage () {
        return this.$store.state.tj.startPage;
      },
      isPage (){
        return this.$store.state.tj.isPage;
      },
      pageCount () {
        return new Array(this.pageNum)
      }
    },
    methods:{
      _hover(val){
        this.select_state = val;
      },
      changeSize (val){
        this.$emit("change-size",val)
      },
      showSelect(){
        this.$store.state.tj.isPage = !this.$store.state.tj.isPage;
      },
      changePage(val){
        if(val > 0 && val <= this.pageNum){
          this.$emit("change-page",val)
          console.log(val)
        }
      },
      nextPage(val){
        if(val > 0 && val <= this.pageNum){
          this.$emit("change-page",val)
          console.log(val)
        }
      },
      prevPage(val){
        if(val > 0 && val <= this.pageNum){
          this.$emit("change-page",val)
          console.log(val)
        }
      },
      _jump(){
        let num = Number(this.jumpNum);
        if(isNaN(num)){
          this.$message({
            type: 'error',
            message: "请输入正确页数",
            duration: 1000
          })
          return;
        }else if(num > this.pageNum){
          this.$message({
            type: 'error',
            message: "不能大于最大页数",
            duration: 1000
          })
          return;
        }else{
          this.$emit("change-page",parseInt(this.jumpNum))
        }
      }
    }
  }
</script>

<style scoped>
  .page_cont{
    display: flex;
    line-height: 28px;
  }
  .page_total{
    font-size: 14px;
    margin-right: 10px;
    color:#606266;
  }
  .page_list{
    background-color: #fff;
    display: flex;
  }
  .page_data{
    display: flex;
  }
  .page_item,.page_prve,.page_next{
    padding: 0 4px;
    font-size: 14px;
    min-width: 30px;
    text-align: center;
    cursor: pointer;
  }
  .page_item.is_active{
    color:#048adf;
  }
  .page_prve.no_active{
    color:#aaa;
    cursor: default;
  }
  .page_next.no_active{
    color:#aaa;
    cursor: default;
  }
  .page_item:hover{
    color:#048adf;
  }
  .page_size{
    flex: 0 0 100px;
    margin-left: 10px;
    background-color: #fff;
    text-align: center;
    font-size: 14px;
    position: relative;
    cursor: pointer;
  }
  .page_size_cont{
    display: flex;
    padding: 0 5px;
    box-sizing: border-box;
    border: 1px solid #ccc;
  }
  .page_size_show{
    flex: 1;
  }
  .page_size_select{
    position: absolute;
    top: 38px;
    left: 0;
    right: 0;
    background-color: #fff;
    border:1px solid #ebeef5;
    box-shadow: 1px 1px 4px #ebeef5;
    color:#606266;
    padding: 5px 0;
  }
  .page_size_option{
    line-height: 28px;
  }
  .page_size_option.is_active{
    background-color: #f5f7fa;
  }
  .page_size_select span{
    position: absolute;
    top: -16px;
    left: 50%;
    width: 0;
    height: 0;
    margin-left: -8px;
    border: 8px solid transparent;
    border-bottom-color: #ebeef5;
  }
  .page_size_select i{
    position: absolute;
    top: -6px;
    left: 50%;
    width: 0;
    height: 0;
    margin-left: -8px;
    border: 8px solid transparent;
    border-bottom-color: #fff;
  }
  .down-enter-active,.down-leave-active{
    transition: all 0.7s;
  }
  .down-enter,.down-leave-to{
    opacity: 0;
    padding: 0;
    height: 0;
    overflow: hidden;
  }
  .page_num_cont{
    flex: 1;
    display: flex;
  }
  .page_num{
    margin-left: 10px;
    flex: 0 0 80px;
  }
  .page_num input{
    width: 80px;
    height: 28px;
    *height: 30px;
    line-height: 28px;
    *line-height: 30px;
    text-align: center;
    background-color: #fff;
    border: 1px solid #ccc;
    box-sizing: border-box;
  }
  .page_jump{
    font-size: 14px;
    color:#666;
    flex: 0 0 50px;
    text-align: center;
    margin-left: 10px;
  }
  .page_jump:hover{
    color:#048adf;
  }
</style>
