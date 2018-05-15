<template>
  <div class="recruit_detail">
    <div class="recruit_screen">
      <div class="recruit_title">
        <span @click='showOrHideenForm'>简历筛选<i class="iconfont icon-sanjiaoxing-down" v-if='showFormBool'></i><i class="iconfont icon-sanjiaoxing-up" v-else></i></span>
      </div>
      <el-form
        :model="screenData"
        status-icon
        label-width="110px"
				v-if='showFormBool'
        class="recruit_cont">
        <el-form-item label='姓名搜索'>
          <div class="md">
            <el-input
              placeholder="请输入姓名"
              maxlength="5"
              v-model="screenData.name"></el-input>
          </div>
        </el-form-item>
        <el-form-item label='基本信息'>
          <div class="md">
            <el-select v-model='screenData.gender' placeholder='性别'>
              <el-option
                v-for='item in localData.gender'
                :label='item.name'
                :key='item.code'
                :value='item.code'></el-option>
            </el-select>
          </div>
          <div class="md">
            <el-select v-model='screenData.education' placeholder='学历'>
              <el-option
                v-for='item in localData.education'
                :label='item.name'
                :key='item.code'
                :value='item.code'></el-option>
            </el-select>
          </div>
          <div class="xl">
            <el-input
              type="text" @keyup.native="screenData.age = $inputKeyUp($event)" @afterpaste.native="screenData.age = $inputKeyUp($event)" :maxlength='2'
              placeholder="年龄(岁)"
              v-model="screenData.age"></el-input>
          </div>
          <span>至</span>
          <div class="xl">
            <el-input
              type="text" @keyup.native="screenData.age2 = $inputKeyUp($event)" @afterpaste.native="screenData.age2 = $inputKeyUp($event)" :maxlength='2'
              placeholder="年龄(岁)"
              v-model="screenData.age2"></el-input>
          </div>
          <div class="xl">
            <el-input
              type="text" @keyup.native="screenData.height = $inputKeyUp($event)" @afterpaste.native="screenData.height = $inputKeyUp($event)" :maxlength='3'
              placeholder="身高(cm)"
              v-model="screenData.height"></el-input>
          </div>
          <span>至</span>
          <div class="xl">
            <el-input
              type="text" @keyup.native="screenData.height2 = $inputKeyUp($event)" @afterpaste.native="screenData.height2 = $inputKeyUp($event)" :maxlength='3'
              placeholder="身高(cm)"
              v-model="screenData.height2"></el-input>
          </div>
          <div class="xl">
            <el-input
              type="text" @keyup.native="screenData.weight = $inputKeyUp($event)" @afterpaste.native="screenData.weight = $inputKeyUp($event)" :maxlength='3'
              placeholder="体重(kg)"
              v-model="screenData.weight"></el-input>
          </div>
          <span>至</span>
          <div class="xl">
            <el-input
              type="text" @keyup.native="screenData.weight2 = $inputKeyUp($event)" @afterpaste.native="screenData.weight2 = $inputKeyUp($event)" :maxlength='3'
              placeholder="体重(kg)"
              v-model="screenData.weight2"></el-input>
          </div>
          <div class="md">
            <el-select v-model='screenData.leftVision' placeholder='裸眼视力左眼'>
              <el-option
                v-for='item in localData.vision'
                :label='item.name'
                :key='item.code'
                :value='item.code'></el-option>
            </el-select>
          </div>
          <span>至</span>
          <div class="md">
            <el-select v-model='screenData.leftVision2' placeholder='裸眼视力左眼'>
              <el-option
                v-for='item in localData.vision'
                :label='item.name'
                :key='item.code'
                :value='item.code'></el-option>
            </el-select>
          </div>
          <div class="md">
            <el-select v-model='screenData.rightVision' placeholder='裸眼视力右眼'>
              <el-option
                v-for='item in localData.vision'
                :label='item.name'
                :key='item.code'
                :value='item.code'></el-option>
            </el-select>
          </div>
          <span>至</span>
          <div class="md">
            <el-select v-model='screenData.rightVision2' placeholder='裸眼视力右眼'>
              <el-option
                v-for='item in localData.vision'
                :label='item.name'
                :key='item.code'
                :value='item.code'></el-option>
            </el-select>
          </div>
        </el-form-item>
        <el-form-item label="经验能力">
          <div class="md">
            <el-select v-model='screenData.workExp' placeholder='工作经验'>
              <el-option
                v-for='item in localData.offerExperience'
                :label='item.name'
                :key='item.code'
                :value='item.code'></el-option>
            </el-select>
          </div>
          <div class="md">
            <el-input
              placeholder="熟悉小语种"
              v-model="screenData.lang" :maxlength='20'></el-input>
          </div>
        </el-form-item>
        <el-form-item label='状态筛选'>
          <div class="md">
            <el-select v-model='screenData.status' placeholder='所有'>
              <el-option
                v-for='item in localData.overVoteStatusEnum'
                :label='item.name'
                :key='item.code'
                :value='item.code'></el-option>
            </el-select>
          </div>
          <div class="md" v-if="screenData.status == 3">
            <el-select v-model='screenData.sure' placeholder='所有'>
              <el-option
                v-for='item in localData.reservationState'
                :label='item.name'
                :key='item.code'
                :value='item.code'></el-option>
            </el-select>
          </div>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="init()">查找</el-button>
          <el-button @click="clearScreen()" type="warning" plain>清空条件</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="recruit_list">
      <div class="recruit_list_title">-{{jobName}}-</div>
      <div class="recruit_list_btn">
        <div class="recruit_left_btn">
          <el-checkbox
            v-model="checkState"
            @change="checkAll">全选</el-checkbox>
          <span @click="changePattern(false)" :class="{is_active:!pattern}"><i class="iconfont icon-liebiao"></i>大图</span>
          <span @click="changePattern(true)" :class="{is_active:pattern}"><i class="iconfont icon-ai-list"></i>列表</span>
        </div>
        <div class="recruit_right_btn">
          <div class="export_btn">
            <el-button  @click="outPdf" plain>导出选中简历</el-button>
            <el-button  @click="outExcell(0)" plain>导出全部名单</el-button>
            <el-button  @click="outExcell(1)" plain>导出选中名单</el-button>
          </div>
          <div class="state_btn">
            <el-button type="primary" @click="_review()" plain v-if='permissionConfig.length > 0 && permissionConfig[0].startReview == true'>发起评审</el-button>
            <el-button type="primary" @click="changeState(1)" plain v-if='permissionConfig.length > 0 && permissionConfig[0].getMeet == true'>邀请面试</el-button>
            <el-button type="primary" @click="changeState(2)" plain v-if='permissionConfig.length > 0 && permissionConfig[0].getRefuse == true'>不合适</el-button>
          </div>
        </div>
      </div>
      <div class="recruit_list_cont">
        <el-row v-if="!pattern" class="chart_list"
                v-loading="loading">
          <el-checkbox-group v-model="checkedCities" @change="checkItem">
            <el-col
              v-for="item in tableData"
              :xs="24" :sm="12" :md="8" :lg="8" :xl="6" :key='item.rrid'
              class="chart_item">
              <div class="chart_cont">
                <div class="chart_img">
                  <el-checkbox :label="item.rrid"></el-checkbox>
                  <img :src="item.headerUrl" alt="">
                </div>
                <div class="chart_txt">
                  <div class="chart_txt_item">
                    <span class="chart_txt_name">姓名:</span>
                    <span class="chart_txt_text">{{item.name}}</span>
                  </div>
                  <div class="chart_txt_item">
                    <span class="chart_txt_name">性别:</span>
                    <span v-for="item1 in localData.gender" v-if="item1.code == item.gender" class="chart_txt_text">{{item1.name}}</span>
                  </div>
                  <div class="chart_txt_item">
                    <span class="chart_txt_name">年龄:</span>
                    <span class="chart_txt_text">{{item.age}}</span>
                  </div>
                  <div class="chart_txt_item">
                    <span class="chart_txt_name">学历:</span>
                    <span v-for="item1 in localData.education" v-if="item1.code == item.education" class="chart_txt_text">{{item1.name}}</span>
                  </div>
                  <div class="chart_txt_item">
                    <span class="chart_txt_name">工作经验:</span>
                    <span v-for="item1 in localData.offerExperience" v-if="item1.code == item.experience" class="chart_txt_text">{{item1.name}}</span>
                  </div>
                  <div class="chart_txt_item">
                    <span class="chart_txt_name">简历状态:</span>
                    <span
                      v-for="item1 in localData.overVoteStatusEnum"
                      v-if="item1.code == item.status && item.status == 3" class="chart_txt_text">
                      {{item1.name}}{{sure(item.status,item.sure)}}
                    </span>
										<span
                      v-for="item1 in localData.overVoteStatusEnum"
                      v-if="item1.code == item.status && item.status != 3" class="chart_txt_text">
                      {{item1.name}}
                    </span>
                  </div>
                  <div class="chart_txt_btn">
                    <el-button @click="_detail(item.rrid)" type="primary">查看</el-button>
                    <el-button type="warning" @click="changeStatePerson(item.rrid)" plain>拒绝</el-button>
                  </div>
                </div>
              </div>
            </el-col>
          </el-checkbox-group>
        </el-row>
        <div v-else class="list_list">
          <el-checkbox-group v-model="checkedCities" @change="checkItem">
            <el-table
              v-loading="loading"
              :data="tableData"
              style="width: 100%">
              <el-table-column
                prop="headerUrl"
                label="照片"
                min-width="90">
                <template slot-scope="scope">
                  <div class="check_cont">
                    <el-checkbox :label="scope.row.rrid"></el-checkbox>
                    <img class="avatar" :src="scope.row.headerUrl" alt="">
                  </div>
                </template>
              </el-table-column>
              <el-table-column
                prop="name"
                label="姓名"
                min-width="80">
              </el-table-column>
              <el-table-column
                prop="gender"
                label="性别"
                min-width="50">
                <template slot-scope="scope">
                  <span
                    v-for="item1 in localData.gender"
                    v-if="item1.code == scope.row.gender">{{item1.name}}</span>
                </template>
              </el-table-column>
              <el-table-column
                prop="age"
                label="年龄"
                min-width="50">
              </el-table-column>
              <el-table-column
                prop="height"
                label="身高"
                min-width="70">
                <template slot-scope="scope">
                  <span>{{scope.row.height}}cm</span>
                </template>
              </el-table-column>
              <el-table-column
                prop="weight"
                label="体重"
                min-width="70">
                <template slot-scope="scope">
                  <span>{{scope.row.weight}}kg</span>
                </template>
              </el-table-column>
              <el-table-column
                prop="vision_left"
                label="裸眼视力(左眼)"
                min-width="140">
                <template slot-scope="scope">
                  <span
                    v-for="item1 in localData.vision"
                    v-if="item1.code == scope.row.vision_left">{{item1.name}}</span>
                </template>
              </el-table-column>
              <el-table-column
                prop="vision_right"
                label="裸眼视力(右眼)"
                min-width="140">
                <template slot-scope="scope">
                  <span
                    v-for="item1 in localData.vision"
                    v-if="item1.code == scope.row.vision_right">{{item1.name}}</span>
                </template>
              </el-table-column>
              <el-table-column
                prop="experience"
                label="工作经验"
                min-width="80">
                <template slot-scope="scope">
                  <span
                    v-for="item1 in localData.offerExperience"
                    v-if="item1.code == scope.row.experience">{{item1.name}}</span>
                </template>
              </el-table-column>
              <el-table-column
                prop="education"
                label="学历"
                min-width="80">
                <template slot-scope="scope">
                  <span
                    v-for="item1 in localData.education"
                    v-if="item1.code == scope.row.education">{{item1.name}}</span>
                </template>
              </el-table-column>
              <el-table-column
                :show-overflow-tooltip="true"
                prop="language"
                label="熟悉小语种"
                min-width="100">
              </el-table-column>
              <el-table-column
                label="评审结果"
                min-width="80">
                <template slot-scope="scope">
                  <span v-if="scope.row.status != 5">/</span>
                  <span v-else>{{scope.row.auditor_success+"通过/"+scope.row.auditor_fail+"否决"}}</span>
                </template>
              </el-table-column>
              <el-table-column
                prop="status"
                label="简历状态"
                min-width="80">
                <template slot-scope="scope">
                  <span
                    v-for="item1 in localData.overVoteStatusEnum"
                    v-if="item1.code == scope.row.status && scope.row.status == 3">
										<span v-for="item2 in localData.meetSure"
													v-if="item2.code == scope.row.sure">{{item1.name + item2.name}}</span>
									</span>
                  <span
                    v-for="item1 in localData.overVoteStatusEnum"
                    v-if="item1.code == scope.row.status && scope.row.status != 3">
										{{item1.name}}
									</span>
                </template>
              </el-table-column>
              <el-table-column
                min-width="80">
                <template slot-scope="scope">
                  <el-button @click="_detail(scope.row.rrid)" type="primary" plain>查看</el-button>
                </template>
              </el-table-column>
            </el-table>
          </el-checkbox-group>
        </div>
				<div class="pagenationDiv">
					<!--<el-pagination-->
            <!--layout="total, prev, pager, next, sizes"-->
						<!--:current-page.sync="start"-->
						<!--:page-sizes="[15, 30]"-->
						<!--:page-size="pageData.pageSize"-->
            <!--@size-change="handleSizeChange"-->
            <!--@current-change="init"-->
						<!--:total="pageData.count">-->
					<!--</el-pagination>-->
          <page v-if="pageSize > 0"
                @change-page="init"
                @change-size="_page"
                ref="Pages"
                :page_size="pageSize"
                :count="count"
                :page_type="[15,30]"
          ></page>
				</div>
      </div>
    </div>
  </div>
</template>

<script>
  import Page from '@/components/page';
	const global = require('@/global.js');
  export default {
    name: "recruitList",
    data () {
      return {
        jobName: "",
        jid:"",
        pageSize:3,
        count:0,
        loading:true,
        // screen:{
        //   name:11,
        //   gender: '',           //  性别
        //   education: '',        //  学历
        //   age: '',              //  年龄
        //   age2: '',             //  年龄
        //   height: '',           //  身高
        //   height2: '',          //  身高
        //   weight: '',           //  体重
        //   weight2: '',          //  体重
        //   leftVision: '',       //  左眼视力
        //   leftVision2: '',      //  左眼视力
        //   rightVision: '',      //  右眼视力
        //   rightVision2: '',     //  右眼视力
        //   workExp: '',          //  工作经验
        //   lang: '',             //  语种
        //   status:"6",
        //   reservationState:"4"
        // },
        tableData:[],
        localData: JSON.parse(window.sessionStorage.getItem("localData")),
        pattern:true,
        screenData:{},
        checkState: false,
        checkSum: 0,
        checkedAllName: [],
        checkedCities:[],
				permissionConfig: [],
				showFormBool: false, // 展示过滤条件
      }
    },
    computed:{
      // pageNum () {
      //   return Math.ceil(this.pageData.count/this.pageData.pageSize)
      // }
    },
    components:{
      Page
    },
    activated () {
//			this.start = this.$start
			this.start = 1
      this.$store.state.tj.startPage = 1;
			this.permissionConfig = JSON.parse(window.sessionStorage.getItem('permissionConfig'))
      this.jobName = window.sessionStorage.getItem("jobName");
      this.jid = window.sessionStorage.getItem("jid")
      this.getDetail();
    },
    methods:{
      _page(val){
        if(val){
          this.pageSize = val;
          this.init()
        }
      },
			outPdf () {
				if (this.checkedCities.length > 0) {
					window.open(global.configSelf.nodeUrl + '/toNodeGetPdf?id='+ this.checkedCities.join('-'))
				} else {
					this.$message.warning('请先选择数据，再进行操作')
				}
			},
			showOrHideenForm () {
				this.showFormBool = !this.showFormBool
			},
      sure (state,type){
        if(state != 3){
          return;
        }
        switch (type){
          case 0:
            return "(未确认)"
          case 1:
            return "(已接受)"
          case 2:
            return "(已拒绝)"
        }
      },
      outExcell(bool){
        let screenArr = {
					_limit: 9999,
					_start: this.$store.state.tj.startPage,
          jid: this.jid
        }
				if (bool) {
					console.log(bool)
					if (this.checkedCities.length > 0) {
						screenArr.rrids = this.checkedCities.join(',')
					} else {
						this.$message.warning('请先选择数据，再进行操作')
						return
					}
				}
        if(this.screenData.name){
          screenArr.name = this.screenData.name
        }
        if(this.screenData.gender){
          screenArr.gender = this.screenData.gender
        }
        if(this.screenData.education){
          screenArr.education = this.screenData.education
        }
        if(this.screenData.age){
          screenArr.minAge = this.screenData.age
        }
        if(this.screenData.age2){
          screenArr.maxAge = this.screenData.age2
        }
        if(this.screenData.height){
          screenArr.minHeight = this.screenData.height
        }
        if(this.screenData.height2){
          screenArr.maxHeight = this.screenData.height2
        }
        if(this.screenData.weight){
          screenArr.minWeight = this.screenData.weight
        }
        if(this.screenData.weight2){
          screenArr.maxWeight = this.screenData.weight2
        }
        if(this.screenData.leftVision){
          screenArr.minVisionLeft = this.screenData.leftVision
        }
        if(this.screenData.leftVision2){
          screenArr.maxVisionLeft = this.screenData.leftVision2
        }
        if(this.screenData.rightVision){
          screenArr.minVisionRight = this.screenData.rightVision
        }
        if(this.screenData.rightVision2){
          screenArr.maxVisionRight = this.screenData.rightVision2
        }
        if(this.screenData.workExp){
          screenArr.experience = this.screenData.workExp
        }
        if(this.screenData.lang){
          screenArr.language = this.screenData.lang
        }
        if(this.screenData.status && this.screenData.status != 6){
          screenArr.status = this.screenData.status
        }
        if(this.screenData.sure && this.screenData.sure != 3){
          screenArr.sure = this.screenData.sure
        }
				screenArr.excelCondition = JSON.stringify([
					{code: 'name', name: '姓名'},
					{code: 'gender', name: '性别', json: 'gender'},
					{code: 'age', name: '年龄'},
					{code: 'height', name: '身高'},
					{code: 'weight', name: '体重'},
					{code: 'vision_left', name: '裸眼视力(左眼)', json: 'vision'},
					{code: 'vision_right', name: '裸眼视力(右眼)', json: 'vision'},
					{code: 'experience', name: '工作经验', json: 'offerExperience'},
					{code: 'education', name: '学历', json: 'education'},
					{code: 'language', name: '熟悉小语种', value: '/'},
					{code: 'auditor_success', name: '评审通过人数'},
					{code: 'auditor_fail', name: '评审否决人数'},
					{code: 'status', name: '简历状态', json: 'overVoteStatusEnum'},
					{code: 'sure', name: '是否接受面试邀请', json: 'meetSure', value: '/'}
				])
        this.$axios({
          type: 'post',
          url: '/dabai-chaorenjob/resumeReceived/getResumeReceivedListByJidByExcel',
          data:screenArr,
          fuc: (res) => {
						console.log(res)
						var eleLink = document.createElement('a')
						eleLink.download = '简历列表.xls'
						eleLink.style.display = 'none'
						// 字符内容转变成blob地
						var blob = res
						eleLink.href = URL.createObjectURL(blob)
						// 触发点击
						document.body.appendChild(eleLink)
						eleLink.click()
						// 然后移除
						document.body.removeChild(eleLink)
          }
        })
      },
      init(page){
        this.loading = true;
        if(page){
          var _start = page;
        }else{
          var _start = 1;
        }
        let screenArr = {
					_start: _start,
          jid: this.jid
        }
        if(this.pageSize){
          screenArr._limit = this.pageSize;
        }
        if(this.screenData.name){
          screenArr.name = this.screenData.name
        }
        if(this.screenData.gender){
          screenArr.gender = this.screenData.gender
        }
        if(this.screenData.education){
          screenArr.education = this.screenData.education
        }
        if(this.screenData.age){
          screenArr.minAge = this.screenData.age
        }
        if(this.screenData.age2){
          screenArr.maxAge = this.screenData.age2
        }
        if(this.screenData.height){
          screenArr.minHeight = this.screenData.height
        }
        if(this.screenData.height2){
          screenArr.maxHeight = this.screenData.height2
        }
        if(this.screenData.weight){
          screenArr.minWeight = this.screenData.weight
        }
        if(this.screenData.weight2){
          screenArr.maxWeight = this.screenData.weight2
        }
        if(this.screenData.leftVision){
          screenArr.minVisionLeft = this.screenData.leftVision
        }
        if(this.screenData.leftVision2){
          screenArr.maxVisionLeft = this.screenData.leftVision2
        }
        if(this.screenData.rightVision){
          screenArr.minVisionRight = this.screenData.rightVision
        }
        if(this.screenData.rightVision2){
          screenArr.maxVisionRight = this.screenData.rightVision2
        }
        if(this.screenData.workExp){
          screenArr.experience = this.screenData.workExp
        }
        if(this.screenData.lang){
          screenArr.language = this.screenData.lang
        }
        if(this.screenData.status && this.screenData.status != 6){
          screenArr.status = this.screenData.status
        }
        if(this.screenData.sure && this.screenData.sure != 3){
          screenArr.sure = this.screenData.sure
        }
        this.$axios({
          type: 'get',
          url: '/dabai-chaorenjob/resumeReceived/getResumeReceivedListByJid',
          data:screenArr,
          fuc: (res) => {
            if(this.pageSize > 0){
              this.$store.state.tj.startPage = res.data.start
            }
            this.pageSize = res.data.pageSize
            this.count = res.data.count
            this.checkedCities = [];
            this.checkSum = 0;
            this.checkState = false;
            this.tableData = res.data.data;
            for(let i = 0;i<this.tableData.length;i++){
              this.checkedAllName[i] = this.tableData[i].rrid
            }
            this.loading = false;
            console.log( res)
          }
        })
      },
      getDetail (){
        let resultData = {
          jid:this.jid
        };
        this.$axios({
          type: 'get',
          url: '/dabai-chaorenjob/job/getJob',
          data: resultData,
          fuc: (res) => {
            // 获取详情
            if(res.code == 1){
              this.screenData = JSON.parse(res.data.search_config_json)
              console.log(1, this.screenData)
							for (let val in this.screenData) {
								console.log(val)
								if (this.screenData[val]) {
									this.$message.success('已根据职位要求，完成简历筛选。')
								}
							}
              let status = window.sessionStorage.getItem("status");
              if(status){
//                this.screenData.status = status;
								this.$set(this.screenData, 'status', status)
              }
              this.init();
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
      clearScreen(){
        this.screenData = {};
      },
      changePattern (state) {
        this.pattern = state;
      },
      _detail(rrid){
        window.sessionStorage.setItem("rrid",rrid)
        this.$router.push("/resumeDetail")
      },
      checkItem(val){
				console.log('sum', val)
//        if(val){
//          this.checkSum++
//        }else{
//          this.checkSum--
//        }
				this.checkSum = val.length

        if(this.tableData.length == this.checkSum){
          this.checkState = true;
        }else{
          this.checkState = false;
        }
      },
      checkAll(val) {
        if(val){
          this.checkedCities = this.checkedAllName
          this.checkSum = this.tableData.length;
        }else{
          this.checkedCities = [];
          this.checkSum = 0;
        }
      },
      _review (){
				if (this.checkedCities.length < 1) {
					this.$message.warning('请先选择数据，再进行操作')
					return
				}
			  for(let i = 0;i<this.tableData.length;i++){
			    if(this.tableData[i].status == 3 || this.tableData[i].status == 4 || this.tableData[i].status == 5){
			      for(let a = 0;a < this.checkedCities.length; a++){
			        if(this.tableData[i].rrid == this.checkedCities[a]){
                this.$message({
                  type: 'error',
                  message: "已被处理过的简历，不可发起评审。",
                  duration: 1000
                })
                return;
              }
            }
          }
        }
        this.$axios({
          type: 'post',
          url: '/dabai-chaorenjob/resumeReceived/markReview',
          data: {rrids:this.checkedCities},
          fuc: (res) => {
            if(res.code == 1){
              this.checkSum = 0;
					    this.checkState = false;
              this.checkedCities = [];
              this.getDetail();
              this.$message({
                type: 'success',
                message: "操作成功",
                duration: 1000
              })
            }
            console.log( res)
          }
        })
      },
			changeStatePerson (rrid) {
				window.sessionStorage.setItem("rrids",JSON.stringify([rrid]))
				this.$router.push("/recruitResult/"+2)
			},
      changeState(type){
				if (this.checkedCities.length < 1) {
					this.$message.warning('请先选择数据，再进行操作')
					return
				}
        for(let i = 0;i<this.tableData.length;i++){
          if(this.tableData[i].status == 3 || this.tableData[i].status == 4){
            for(let a = 0;a < this.checkedCities.length; a++){
              if(this.tableData[i].rrid == this.checkedCities[a]){
                this.$confirm('选中的简历包含已处理过的简历，继续进行将覆盖上次操作,是否继续?', '提示', {
                  confirmButtonText: '确定',
                  cancelButtonText: '取消',
                  type: 'warning'
                }).then(() => {
                    window.sessionStorage.setItem("rrids",JSON.stringify(this.checkedCities))
                    this.$router.push("/recruitResult/"+type)
                }).catch(() => {
                });
                return;
              }
            }
          }
        }
        window.sessionStorage.setItem("rrids",JSON.stringify(this.checkedCities))
        this.$router.push("/recruitResult/"+type)
      //   console.log(this.checkedCities)
      }
    }
  }
</script>
<style>
  .recruit_cont .el-form-item__content{
    display: flex;
  }
  .recruit_cont .el-form-item{
    margin: 0;
    padding: 5px 0;
    border-bottom: 1px solid #eff9ff;
  }
  .recruit_cont .el-form-item:nth-child(4),.recruit_cont .el-form-item:nth-child(5){
    border-bottom: 0;
  }
  .recruit_cont .el-button{
    height: 30px;
    width: 130px;
    margin: 0 5px;
    padding: 0;
  }
  .recruit_cont .el-form-item__label{
    padding-left: 20px;
    text-align: left;
    font-size: 14px;
    color:#4c4c4c;
  }
  .recruit_list .el-checkbox__inner{
    width: 20px;
    height: 20px;
    border-radius: 50%;
  }
  .recruit_list_cont .el-checkbox__label{
    width: 0;
    color:transparent;
  }
  .recruit_list_cont .el-checkbox__input.is-checked+.el-checkbox__label{
    width: 0;
    color:transparent;
  }
  .recruit_list .el-checkbox__inner::after {
    left: 7px;
    height: 12px;
  }
  .chart_img .el-checkbox{
    position: absolute;
    top:5px;
    left: 5px;
    color:transparent;
  }
  .export_btn .el-button{
    height: 25px;
    width: 120px;
    padding: 0;
  }
  .state_btn .el-button{
    height: 30px;
    width: 120px;
    padding: 0;
  }
  .chart_txt_btn .el-button{
    width: 75px;
    height: 25px;
    padding: 0;
  }
  .list_list .el-table th{
    font-weight: 200;
    font-size: 16px;
    color:#333;
  }
  .list_list .el-table th:first-child{
    padding-left: 30px;
  }
  .list_list .el-table td{
    font-size: 14px;
    color:#4c4c4c;
  }
  .list_list .el-table td,.list_list .el-table th.is-leaf{
    border-bottom-color:#eff9ff;
  }
  .list_list .el-button{
    width: 70px;
    height: 30px;
    padding: 0;
  }
</style>
<style scoped>
	.pagenationDiv{
		margin-top: 25px;
	}
  .recruit_screen{
    background-color: #fff;
    margin-bottom: 10px;
    padding-bottom: 10px;
  }
  .recruit_title{
    line-height: 60px;
    padding-left: 20px;
    font-size: 16px;
    color:#333;
  }
  .xl {
    height: 30px;
    width: 90px;
    margin: 0 5px;
  }
  .md {
    height: 30px;
    width: 130px;
    margin: 0 5px;
  }
  .recruit_cont span{
    margin: 0 5px;
    color:#4c4c4c;
    font-size: 14px;
  }
  /*recruit_list*/
  .recruit_list{
    /*background-color: #fff;*/
  }
  .recruit_list_title{
    line-height: 40px;
    padding-left: 10px;
    font-size: 16px;
    color:#333;
    background-color: #fff;
  }
  .recruit_list_btn{
    display: flex;
    height: 55px;
    align-items: center;
    padding: 0 10px;
    background-color: #fff;
  }
  .recruit_left_btn{
    flex: 1;
  }
  .recruit_left_btn span{
    font-size: 16px;
    color:#333;
    margin-left: 10px;
  }
  .recruit_left_btn span.is_active{
    color:#048adf;
  }
  .recruit_right_btn{
    flex: 0 0 860px;
    display: flex;
    justify-content: space-between;
  }
  .state_btn{
    padding-right: 50px;
  }
  .chart_cont{
    background-color: #fff;
    border-radius: 5px;
    margin: 2px 2px 0 0;
    height: 220px;
    display: flex;
  }
  .chart_img{
    height: 100%;
    flex: 0 0 205px;
    padding: 17px 10px;
    position: relative;
  }
  .chart_img img{
    width: 185px;
    height: 185px;
    border-radius: 5px;
  }
  .chart_txt{
    flex: 1;
    padding: 17px 0;
  }
  .chart_txt_item{
    font-size: 0;
    padding-bottom: 6px;
  }
  .chart_txt_name{
    font-size: 14px;
    color:#4c4c4c;
  }
  .chart_txt_text{
    font-size: 14px;
    color:#333;
  }
  .chart_txt_btn{
    padding-top: 3px;
    display: flex;
    justify-content: space-between;
    padding-right: 20px;
  }
  /*list_list*/
  .avatar{
    width: 50px;
    height: 50px;
    border-radius: 2px;
    border: 1px solid #ccc;
    margin-left: 10px;
  }
  .check_cont{
    display: flex;
    align-items: center;
  }
  .chart_list,.list_list {
    width: 100%;
  }
</style>
