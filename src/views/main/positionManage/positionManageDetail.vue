<template>
  <el-form
    :model="job_detail"
    status-icon
    ref="jobDetail"
    label-width="105px"
    class="job_detail">
    <div class="job_detail_item left_job_cont">
      <div class="job_detail_title">职位信息</div>
      <el-form-item label="职位名称">
        <el-col :span='10'>
          <el-input
            placeholder="如乘务员、飞行员、机务等"
            v-model="form.name"></el-input>
        </el-col>
      </el-form-item>
      <el-form-item label="职能选择">
        <el-col :span='5'>
          <el-select v-model="form.rcnid" placeholder="选择职能">
            <el-option
              v-for='item in rcnidArr'
              :key='item.code'
              :label='item.name'
              :value='item.rcnid'></el-option>
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
          <el-select v-model="form.workExp" placeholder="选择要求">
            <el-option
              v-for='item in localData.offerExperience'
              :label='item.name'
              :value='item.code'
              :key='item.code'></el-option>
          </el-select>
        </el-col>
      </el-form-item>
      <el-form-item label="招聘人数">
        <el-input
          placeholder="输入招聘人数"
          v-model="form.recruitNum"></el-input>
      </el-form-item>
    </div>
    <div class="job_detail_item right_job_cont">
      <div class="job_detail_title">职位要求筛选项</div>
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
            <el-select v-model='screen.gender' @change='selectCity' placeholder='性别'>
              <el-option
                v-for='item in localData.area'
                :label='item.name'
                :key='item.code'
                :value='item.code'></el-option>
            </el-select>
          </el-col>
          <el-col :span='5'>
            <el-select v-model='screen.education' placeholder='学历'>
              <el-option
                v-for='item in localData.education'
                :label='item.name'
                :key='item.code'
                :value='item.code'></el-option>
            </el-select>
          </el-col>
          <el-col :span='5'>
            <el-select v-model='screen.age' placeholder='年龄(岁)'>
              <el-option
                v-for='item in ageArr'
                :label='item.name'
                :key='item.code'
                :value='item.code'></el-option>
            </el-select>
          </el-col>
          <el-col :span="1">至</el-col>
          <el-col :span='5'>
            <el-select v-model='screen.age2' placeholder='年龄(岁)'>
              <el-option
                v-for='item in ageArr'
                :label='item.name'
                :key='item.code'
                :value='item.code'></el-option>
            </el-select>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span='5'>
            <el-input
              :maxlength = '3'
              placeholder="身高(cm)"
              v-model="screen.height"></el-input>
          </el-col>
          <el-col :span="1">至</el-col>
          <el-col :span='5'>
            <el-input
              :maxlength = '3'
              placeholder="身高(cm)"
              v-model="screen.height2"></el-input>
          </el-col>
          <el-col :span='5'>
            <el-input
              :maxlength = 'maxlength'
              placeholder="体重(kg)"
              v-model="screen.weight"></el-input>
          </el-col>
          <el-col :span="1">至</el-col>
          <el-col :span='5'>
            <el-input
              :maxlength = 'maxlength'
              placeholder="体重(kg)"
              v-model="screen.weight2"></el-input>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span='5'>
            <el-select v-model='screen.leftVision' placeholder='裸眼视力左眼'>
              <el-option
                v-for='item in localData.leftVision'
                :label='item.name'
                :key='item.code'
                :value='item.code'></el-option>
            </el-select>
          </el-col>
          <el-col :span="1">至</el-col>
          <el-col :span='5'>
            <el-select v-model='screen.leftVision2' placeholder='裸眼视力左眼'>
              <el-option
                v-for='item in localData.leftVision'
                :label='item.name'
                :key='item.code'
                :value='item.code'></el-option>
            </el-select>
          </el-col>
          <el-col :span='5'>
            <el-select v-model='screen.rightVision' placeholder='裸眼视力右眼'>
              <el-option
                v-for='item in localData.rightVision'
                :label='item.name'
                :key='item.code'
                :value='item.code'></el-option>
            </el-select>
          </el-col>
          <el-col :span="1">至</el-col>
          <el-col :span='5'>
            <el-select v-model='screen.rightVision2' placeholder='裸眼视力右眼'>
              <el-option
                v-for='item in localData.rightVision'
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
              v-for='item in localData.workExp'
              :label='item.name'
              :key='item.code'
              :value='item.code'></el-option>
          </el-select>
        </el-col>
        <el-col :span="5">
          <el-input
            placeholder="熟悉小语种"
            v-model="screen.lang"></el-input>
        </el-col>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('hrDetail')">提交</el-button>
      </el-form-item>
    </div>
  </el-form>
</template>

<script>
  export default {
    name: "accountManageDetail",
    data() {
      return {
        form: {
          name: '',             //  JOB名称
          rcnid: '',            //  职能
          education: '',        //  学历
          address: '',          //  工作地点
          workExp: '',          //  工作年限
          recruitNum: '',       //  招聘人数
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
        localData: {},
        addOrUpdate: '新建',
        address: '', // 选择的省
        address2: '', // 选择的市
        province: [],  // 所有的省
        city: [], // 所有的市
        nowCity: [], // 对应的市
      }
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          console.log(valid)
          if (valid) {
            alert('submit!');
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      selectCity(){

      }
    }
  }
</script>

<style scoped>
  .job_detail{
    display: flex;
    justify-content: space-between;
    min-height: 100px;
  }
  .job_detail_item{
    flex: 0 0 50%;
    box-sizing: border-box;
    background-color: #fff;
    padding: 20px;
  }
  .left_job_cont{
    border-right: 1px solid #eff9ff;
  }
  .right_job_cont{
    border-left: 1px solid #eff9ff;
  }
  .job_detail_title{
    font-size: 16px;
    color:#333;
  }
  .job_detail_describe{
    font-size: 14px;
    color:#666;
    /*letter-spacing:2px;*/
  }
</style>
