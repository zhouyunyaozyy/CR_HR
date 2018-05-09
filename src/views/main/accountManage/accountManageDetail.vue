<template>
  <el-form
      :model="hr_detail"
      status-icon
      ref="hrDetail"
      :rules="rules"
      label-width="130px"
      class="hr_detail">
      <div class="account_info">
        <div class="account_title">账号信息</div>
        <div class="account_cont">
          <el-form-item label="真实姓名" prop="name">
            <el-input v-model="hr_detail.name" placeholder="请输入HR真实姓名"></el-input>
          </el-form-item>
          <el-form-item label="手机号" prop="mobile">
            <el-input v-model="hr_detail.mobile" placeholder="请输入手机号"></el-input>
          </el-form-item>
          <el-form-item label="用户名">
            <el-input v-model="hr_detail.username" placeholder="激活后系统自动生成"  :disabled="true"></el-input>
          </el-form-item>
        </div>
      </div>
      <div class="authority_info">
        <div class="account_title">权限配置</div>
        <div class="authority_cont">
          <el-form-item label="简历管理">
            <el-checkbox-group v-model="hr_detail.resume" @change='checkChange'>
              <el-checkbox label="seeRecruitDetail" name="resume">查看简历</el-checkbox>
              <el-checkbox label="startReview" v-if='checkBool' name="resume">发起简历评审</el-checkbox>
              <el-checkbox label="joinReview" v-if='checkBool' name="resume">参与简历评审</el-checkbox>
              <el-checkbox label="getMeet" v-if='checkBool' name="resume">标记邀请面试</el-checkbox>
              <el-checkbox label="getRefuse" v-if='checkBool' name="resume">标记不合适</el-checkbox>
            </el-checkbox-group>
          </el-form-item>
          <el-form-item label="企业信息管理">
            <el-checkbox-group v-model="hr_detail.enterprise">
              <el-checkbox label="editCompany" name="enterprise">编辑信息</el-checkbox>
            </el-checkbox-group>
          </el-form-item>
          <el-form-item label="职位管理">
            <el-checkbox-group v-model="hr_detail.job" @change='checkChangeJob'>
              <el-checkbox label="seeJob" name="job">查看职位</el-checkbox>
              <el-checkbox label="addJob" v-if='checkBoolJob' name="job">添加职位</el-checkbox>
              <el-checkbox label="editJob" v-if='checkBoolJob' name="job">编辑职位</el-checkbox>
              <el-checkbox label="onOrOffJob" v-if='checkBoolJob' name="job">发布/关闭职位</el-checkbox>
            </el-checkbox-group>
          </el-form-item>
        </div>
      </div>
    <div class="btn_cont">
      <el-form-item>
        <el-button type="primary" @click="submitForm('hrDetail')">提交</el-button>
        <!--<el-button @click="resetForm('hrDetail')">重置</el-button>-->
      </el-form-item>
    </div>
    </el-form>
</template>

<script>
  export default {
    name: "accountManageDetail",
    data() {
      return {
        hr_detail: {
          name: '',
          mobile: '',
          username: '',
          resume:[],
          enterprise:[],
          job:[]
        },
        submitState:false,
				checkBool: false,
				checkBoolJob: false,
        rules: {
          mobile: [
            {required: true, message: '请填写手机号', trigger: 'blur'},
            {pattern: /^1[34578][0-9]{9}$/, message: '手机号为11位数字', trigger: 'blur'}
          ],
          name: [
            {required: true, message: '请输入真实姓名', trigger: 'blur'},
            { pattern: /^([\u4E00-\uFA29]|[\uE7C7-\uE7F3]){2,5}$/, message: '姓名必须为2-5位汉字', trigger: 'blur' }
          ]
        },
        uid:""
      };
    },
    computed:{
			tabIndex (){
        return this.$store.state.tj.tabIndex;
      },
      isRefresh (){
        return this.$store.state.tj.isRefresh;
      }
    },
    activated (){
      if(this.isRefresh){
        this.hr_detail.name = ''
        this.hr_detail.mobile = ''
        this.hr_detail.username = ''
        this.hr_detail.resume = []
        this.hr_detail.enterprise = []
        this.hr_detail.job = []
        this.checkBool = false
        this.checkBoolJob = false
        this.$store.state.tj.isRefresh = false;
      }
    },
    methods: {
      init(){
        this.$axios({
          type: 'get',
          url: '/dabai-chaorenjob/hr/getUserHr',
          data: {uid:this.uid},
          fuc: (res) => {
            if(res.code == 1){
              this.hr_detail.name = res.data.name;
              this.hr_detail.mobile = res.data.mobile;
              this.hr_detail.username = res.data.username;
              let config = JSON.parse(res.data.config);
              for(let i = 0;i<config.length;i++){
                let config_key = i == 0? "resume":i == 1? "enterprise" : "job";
                for(let key in config[i]){
                  if(config[i][key]){
                    this.hr_detail[config_key].push(key)
                  }
                }
                if(this.hr_detail.resume.length > 0){
                  this.checkBool = true;
                }else{
                  this.checkBool = false;
                }
                if(this.hr_detail.job > 0){
                  this.checkBoolJob = true;
                }else{
                  this.checkBoolJob = false;
                }
              }
            }
            console.log(res)
          }
        })
      },
			checkChange (data) {
				if (data.length > 0) {
					this.checkBool = true
				}
				for (let val of data) {
					if (val == 'seeRecruitDetail') {
						return
					}
				}
				this.checkBool = false
			},
			checkChangeJob (data) {
				if (data.length > 0) {
					this.checkBoolJob = true
				}
				for (let val of data) {
					if (val == 'seeJob') {
						return
					}
				}
				this.checkBoolJob = false
			},
      submitForm(formName) {
        if(!this.submitState){
          this.submitState = true;
        }else{
          this.$message({
            type: 'error',
            message: "数据处理中请勿重复提交",
            duration: 1000
          })
        }
        this.$refs[formName].validate((valid) => {
          console.log(valid)
          if (valid){
            let resume_list = this.hr_detail.resume;
            let enterprise_list = this.hr_detail.enterprise;
            let job_list = this.hr_detail.job;
            let resume = {
              "seeRecruitDetail":false,
              "startReview":false,
              "joinReview":false,
              "getMeet":false,
              "getRefuse":false
            };
            let enterprise = {
              "editCompany":false
            };
            let job = {
              "addJob":false,
              "seeJob":false,
              "editJob":false,
              "onOrOffJob":false
            };
            for(let a = 0;a<resume_list.length;a++){
              resume[resume_list[a]] = true;
            }
            for(let a = 0;a<enterprise_list.length;a++){
              enterprise[enterprise_list[a]] = true;
            }
            for(let a = 0;a<job_list.length;a++){
              job[job_list[a]] = true;
            }
            let config = [resume,enterprise,job]
            let resultData = {
              cid: window.sessionStorage.getItem("cid"),
              name: this.hr_detail.name,
              mobile: this.hr_detail.mobile,
              config:JSON.stringify(config)
            };
            // console.log(resultData);
            // return;
            this.$axios({
              type: 'post',
              url: "/dabai-chaorenjob/company/addChildren",
              data: resultData,
              fuc: (res) => {
                console.log( res)
                if(res.code == 1){
                  this.removeTab();
                }else{
                  this.$message({
                    type: 'error',
                    message: res.msg,
                    duration: 1000
                  })
                }
                // this.tableData[index].status ==
              }
            })
          }else{
            console.log('error submit!!');
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      },
      removeTab() {
        this.$store.commit('removeTab',this.tabIndex)
        this.clickTab();
      },
      clickTab() {
        this.$store.commit('changeTab',"/hrList")
        this.$router.push({
          path:"/hrList"
        });
      }
    }
  }
</script>
<style>
  .account_info .el-input__inner{
    height: 30px;
    color:#808080;
    font-size: 16px;
  }
  .account_info .el-form-item__label{
    color:#4c4c4c;
    font-size:16px;
  }
  .authority_cont .el-form-item__label{
    color:#333;
    font-size:16px;
    /*width: 120px !important;*/
    /*text-align: left;*/
    box-sizing: border-box;
    /*padding-left: 15px;*/
    line-height: 50px;
    margin-right: 30px;
  }
</style>
<style scoped>
  .account_info,.authority_info{
    background-color: #fff;
    padding-top: 10px;
  }
  .authority_info{
    margin-top: 10px;
  }
  .account_title{
    color:#333;
    font-size: 18px;
    line-height: 40px;
    height: 40px;
    padding: 0 20px;
    border-bottom: 1px solid #ccc;
  }
  .account_cont{
    width: 830px;
    margin: 20px auto 0;
    padding-bottom: 1px;
  }
  .account_info .el-form-item{
    /*margin-bottom: 5px;*/
  }
  .account_info .el-input{
    width: 280px;
  }
  .authority_title{
    margin-top: 5px;
    line-height: 50px;
    font-size: 24px;
    color:#333;
    padding-left: 15px;
  }
  .authority_cont{
    width: 830px;
    margin: 0 auto;
  }
  .authority_cont .el-form-item--feedback{
    background-color: #fff;
    line-height: 50px;
  }
  .authority_cont .el-checkbox-group{
    height: 50px;
  }
  .authority_cont .el-checkbox{
    line-height: 50px;
  }
  .btn_cont{
    width: 830px;
    margin: 0 auto;
    text-align: right;
    box-sizing: border-box;
    /*padding-right: 130px;*/
  }
  .btn_cont .el-button{
    width: 140px;
    height: 40px;
    font-size: 14px;
  }
</style>
