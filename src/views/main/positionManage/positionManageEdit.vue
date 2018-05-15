<template>
  <el-form
    :model="form"
    status-icon
    label-width="105px"
    class="job_detail">
    <div class="job_detail_item">
      <div class="job_detail_title">职位信息</div>
      <div class="job_detail_cont">
        <el-form-item label="职位名称" required>
          <el-col :span='10'>
            <el-input
              placeholder="如乘务员、飞行员、机务等"
              maxlength="10"
              v-model="form.name"></el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="职能选择">
          <el-col :span='5'>
            <el-select v-model="form.rtid" placeholder="选择职能">
              <el-option
                v-for='item in rcnidArr'
                :key='item.code'
                :label='item.name'
                :value='item.rtid'></el-option>
            </el-select>
          </el-col>
        </el-form-item>
        <el-form-item label="最低学历要求">
          <el-col :span='5'>
            <el-select v-model="form.education" placeholder="选择学历">
              <el-option
                v-for='item in localData.education'
                :key='item.code'
                :label='item.name'
                :value='item.code'></el-option>
            </el-select>
          </el-col>
        </el-form-item>
        <el-form-item label='工作地点'>
          <el-col :span='5'>
            <el-select v-model='address' @change='selectCity' placeholder='选择省份'>
              <el-option
                v-for='item in localData.area'
                :label='item.name'
                :key='item.code'
                :value='item.code'></el-option>
            </el-select>
          </el-col>
          <el-col :span="1">—</el-col>
          <el-col :span='5'>
            <el-select v-model='address2' placeholder='选择市级'>
              <el-option
                v-for='item in nowCity'
                :label='item.name'
                :key='item.code'
                :value='item.code'></el-option>
            </el-select>
          </el-col>
        </el-form-item>
        <el-form-item label="工作经验要求">
          <el-col :span='5'>
            <el-select v-model="form.work_experience" placeholder="选择要求">
              <el-option
                v-for='item in localData.offerExperience'
                :label='item.name'
                :value='item.code'
                :key='item.code'></el-option>
            </el-select>
          </el-col>
        </el-form-item>
        <el-form-item label='薪资范围'>
          <el-col :span='5'>
            <el-select v-model='form.wages' placeholder='请选择范围'>
              <el-option
                v-for='item in localData.wages'
                :label='item.name'
                :value='item.code'
                :key='item.code'></el-option>
            </el-select>
          </el-col>
        </el-form-item>
        <el-form-item label="招聘人数">
          <el-col :span="5">
            <el-input
              placeholder="输入招聘人数"
              :maxlength='3'
              type="text"
              v-model="form.hire_number" @keyup.native="form.hire_number = $inputKeyUp($event)" @afterpaste.native="form.hire_number = $inputKeyUp($event)"></el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="职位描述">
          <el-input
            :autosize="{ minRows: 4, maxRows: 8}"
            placeholder="输入职位要求"
            type='textarea'
            v-model="form.profile"
            :maxlength='800'></el-input>
        </el-form-item>
      </div>
    </div>
    <div class="job_detail_item mar_10">
      <div class="job_detail_title">职位要求筛选项</div>
      <div class="job_detail_cont">
        <el-row>
          <el-col :span="17">
            <div class="job_detail_describe">
              <i></i>
              <span>注：预先填好职位要求筛选项后，在您以后筛选简历时，会自动筛选出符合您要求的简历。若需要变更筛选要求，可在简历列表直接更改或职位编辑页面更改预设</span>
            </div>
          </el-col>
        </el-row>
        <el-form-item label='基本信息'>
          <el-row>
            <el-col :span='5'>
              <el-select v-model='screen.gender' placeholder='性别'>
                <el-option
                  v-for='item in localData.gender'
                  :label='item.name'
                  :key='item.code'
                  :value='item.code'></el-option>
              </el-select>
            </el-col>
            <el-col :span='5' :offset="1">
              <el-select v-model='screen.education' placeholder='学历'>
                <el-option
                  v-for='item in localData.education'
                  :label='item.name'
                  :key='item.code'
                  :value='item.code'></el-option>
              </el-select>
            </el-col>
            <el-col :span='5' :offset="1">
              <el-input
                type="text"
                placeholder="年龄(岁)"
                v-model="screen.age" @keyup.native="screen.age = $inputKeyUp($event)" @afterpaste.native="screen.age = $inputKeyUp($event)" :maxlength='10'></el-input>
            </el-col>
            <el-col :span="1">至</el-col>
            <el-col :span='5'>
              <el-input
                type="text"
                placeholder="年龄(岁)"
                v-model="screen.age2" @keyup.native="screen.age2 = $inputKeyUp($event)" @afterpaste.native="screen.age2 = $inputKeyUp($event)" :maxlength='10'></el-input>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span='5'>
              <el-input
                type="text"
                placeholder="身高(cm)"
                v-model="screen.height" @keyup.native="screen.height = $inputKeyUp($event)" @afterpaste.native="screen.height = $inputKeyUp($event)" :maxlength='10'></el-input>
            </el-col>
            <el-col :span="1">至</el-col>
            <el-col :span='5'>
              <el-input
                type="text"
                placeholder="身高(cm)"
                v-model="screen.height2" @keyup.native="screen.height2 = $inputKeyUp($event)" @afterpaste.native="screen.height2 = $inputKeyUp($event)" :maxlength='10'></el-input>
            </el-col>
            <el-col :span='5' :offset="1">
              <el-input
                type="text"
                placeholder="体重(kg)"
                v-model="screen.weight" @keyup.native="screen.weight = $inputKeyUp($event)" @afterpaste.native="screen.weight = $inputKeyUp($event)" :maxlength='10'></el-input>
            </el-col>
            <el-col :span="1">至</el-col>
            <el-col :span='5'>
              <el-input
                type="text"
                placeholder="体重(kg)"
                v-model="screen.weight2" @keyup.native="screen.weight2 = $inputKeyUp($event)" @afterpaste.native="screen.weight2 = $inputKeyUp($event)" :maxlength='10'></el-input>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span='5'>
              <el-select v-model='screen.leftVision' placeholder='裸眼视力左眼'>
                <el-option
                  v-for='item in localData.vision'
                  :label='item.name'
                  :key='item.code'
                  :value='item.code'></el-option>
              </el-select>
            </el-col>
            <el-col :span="1">至</el-col>
            <el-col :span='5'>
              <el-select v-model='screen.leftVision2' placeholder='裸眼视力左眼'>
                <el-option
                  v-for='item in localData.vision'
                  :label='item.name'
                  :key='item.code'
                  :value='item.code'></el-option>
              </el-select>
            </el-col>
            <el-col :span='5' :offset="1">
              <el-select v-model='screen.rightVision' placeholder='裸眼视力右眼'>
                <el-option
                  v-for='item in localData.vision'
                  :label='item.name'
                  :key='item.code'
                  :value='item.code'></el-option>
              </el-select>
            </el-col>
            <el-col :span="1">至</el-col>
            <el-col :span='5'>
              <el-select v-model='screen.rightVision2' placeholder='裸眼视力右眼'>
                <el-option
                  v-for='item in localData.vision'
                  :label='item.name'
                  :key='item.code'
                  :value='item.code'></el-option>
              </el-select>
            </el-col>
          </el-row>
        </el-form-item>
        <el-form-item label="经验能力">
          <el-col :span='5'>
            <el-select v-model='screen.workExp' placeholder='工作经验'>
              <el-option
                v-for='item in localData.offerExperience'
                :label='item.name'
                :key='item.code'
                :value='item.code'></el-option>
            </el-select>
          </el-col>
          <el-col :span="5" :offset="1">
            <el-input
              placeholder="熟悉小语种"
              v-model="screen.lang"></el-input>
          </el-col>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm()">提交</el-button>
        </el-form-item>
      </div>
    </div>
  </el-form>
</template>

<script>
  export default {
    name: "accountManageDetail",
    data() {
      return {
				status: 0, // 职位状态，若为1，则不能编辑
        form: {
          name: '',             //  JOB名称
          rtid: '',             //  职能
          education: '',        //  学历
          address: '',          //  工作地点
          work_experience: '',  //  工作年限
          wages: '',            //  薪资范围
          hire_number: '',      //  招聘人数
          profile: '',          //  职位描述
        },
        screen:{
          gender: '',           //  性别
          education: '',        //  学历
          age: '',              //  年龄
          age2: '',             //  年龄
          height: '',           //  身高
          height2: '',          //  身高
          weight: '',           //  体重
          weight2: '',          //  体重
          leftVision: '',       //  左眼视力
          leftVision2: '',      //  左眼视力
          rightVision: '',      //  右眼视力
          rightVision2: '',     //  右眼视力
          workExp: '',          //  工作经验
          lang: '',             //  语种
        },
        rcnidArr: [],         //  职能列表
        ageArr: [],           //  年龄列表
        localData: JSON.parse(window.sessionStorage.getItem("localData")),
        address: '', // 选择的省
        address2: '', // 选择的市
        nowCity: [], // 对应的市
      }
    },
    computed:{
      tabIndex (){
        return this.$store.state.tj.tabIndex;
      },
      isRefresh () {
        return this.$store.state.tj.isRefresh;
      }
    },
    activated () {
      this.getfuc();
      this.getDetail();
    },
    methods: {
      getfuc () {
        let resultData = {
          cid:window.sessionStorage.getItem("cid")
        };
        this.$axios({
          type: 'get',
          url: '/dabai-chaorenjob/resumeTarget/getActiveResumeTarget',
          data: resultData,
          fuc: (res) => {
            // 获取职能
            if(res.code == 1){
              this.rcnidArr = res.data;
            }else{
              this.$message({
                type: 'error',
                message: res.msg,
                duration: 1000
              })
            }
            console.log( res)
          }
        })
      },
      getDetail (){
        let resultData = {
          jid:window.sessionStorage.getItem("jid")
        };
        this.$axios({
          type: 'get',
          url: '/dabai-chaorenjob/job/getJob',
          data: resultData,
          fuc: (res) => {
            // 获取详情
            if(res.code == 1){
              this.form.name = res.data.name
              this.status = res.data.status ? res.data.status : ''
              this.form.rtid = parseInt(res.data.rtid) ? res.data.rtid : ''
              this.form.education = res.data.education ? res.data.education + '' : ''
              this.address = res.data.address ? (res.data.address+"").slice(0,3)+"000" : ''
              this.selectCity();
              this.address2 = res.data.address ? res.data.address+"" : ''
              this.form.work_experience = res.data.work_experience ? res.data.work_experience + ""  : ''
              this.form.wages = res.data.wages ? res.data.wages+"" : ''
              this.form.hire_number = res.data.hire_number ? res.data.hire_number +"" : ''
              this.form.profile = res.data.profile ? res.data.profile+"" : ''
              this.screen = JSON.parse(res.data.search_config_json)
              console.log(this.screen)
            }else{
              this.$message({
                type: 'error',
                message: res.msg,
                duration: 1000
              })
            }
            console.log( res)
          }
        })
      },
      addJob(){
        let resultData = {
          name:this.form.name,
          rtid:this.form.rtid,
          education:this.form.education,
          address:this.address2,
          work_experience:this.form.work_experience,
          wages:this.form.wages,
          hire_number:this.form.hire_number,
          profile:this.form.profile,
          search_config_json:JSON.stringify(this.screen),
          jid:window.sessionStorage.getItem("jid")
        };
        this.$axios({
          type: 'post',
          url: "/dabai-chaorenjob/job/updateJob",
          data: resultData,
          fuc: (res) => {
            if(res.code == 1){
              this.removeTab();
            }
            console.log( res)
          }
        })
      },
      submitForm() {
				console.log('status', this.status)
				if (this.status == 1) {
					this.$message.warning("当前职位为已发布状态，暂不支持编辑")
					this.removeTab();
					return
				}

        console.log(this.form)
        if(!this.form.name){
          this.$message({
            type: 'error',
            message: '请输入职位名称',
            duration: 1000
          })
          return;
				}
//        }else if(!this.form.rtid){
//          this.$message({
//            type: 'error',
//            message: '请选择职能',
//            duration: 1000
//          })
//          return;
//        }else if(!this.form.education){
//          this.$message({
//            type: 'error',
//            message: '请选择学历',
//            duration: 1000
//          })
//          return;
//        }else if(!this.address){
//          this.$message({
//            type: 'error',
//            message: '请选择省份',
//            duration: 1000
//          })
//          return;
//        }else if(!this.address2){
//          this.$message({
//            type: 'error',
//            message: '请选择城市',
//            duration: 1000
//          })
//          return;
//        }else if(!this.form.work_experience){
//          this.$message({
//            type: 'error',
//            message: '请选择工作经验',
//            duration: 1000
//          })
//          return;
//        }else if(!this.form.wages){
//          this.$message({
//            type: 'error',
//            message: '请选择薪资范围',
//            duration: 1000
//          })
//          return;
//        }else if(!this.form.hire_number){
//          this.$message({
//            type: 'error',
//            message: '请输入招聘人数',
//            duration: 1000
//          })
//          return;
//        }else if(!this.form.profile){
//          this.$message({
//            type: 'error',
//            message: '请输入职位描述',
//            duration: 1000
//          })
//          return;
//        }
        this.addJob();
      },
      selectCity () {
        for (let value of this.localData.area) {
          if (value.code === this.address) {
            this.nowCity = value.children
            this.address2 = ''
          }
        }
      },
      removeTab() {
        this.$store.commit('removeTab',this.tabIndex)
        this.clickTab();
      },
      clickTab() {
        this.$store.commit('changeTab',"/jobList")
        this.$router.push({
          path:"/jobList"
        });
      }
    }
  }
</script>
<style scoped>
  .job_detail{
    /*display: flex;*/
    /*justify-content: space-between;*/
    /*min-height: 100px;*/
  }
  .job_detail_item{
    /*flex: 0 0 50%;*/
    /*box-sizing: border-box;*/
    background-color: #fff;
  }
  .job_detail_cont{
    width: 750px;
    margin: 0 auto;
    padding: 20px;
  }
  .job_detail_title{
    font-size: 16px;
    color:#333;
    border-bottom: 1px solid #ccc;
    line-height: 40px;
    padding-left: 20px;
  }
  .job_detail_describe{
    font-size: 14px;
    color:#666;
    /*letter-spacing:2px;*/
  }
  .mar_10{
    margin-top: 10px;
  }
  .job_detail .el-col-1{
    text-align: center;
    color:#333;
  }
</style>
