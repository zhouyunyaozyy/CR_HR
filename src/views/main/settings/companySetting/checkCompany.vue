<template>
  <div class='basicCheck'>
    <div class="basicBody">
      <h3>企业标志</h3>
			<img v-if="logoUrl" :src="logoUrl" class="avatar">
			<el-button type='primary' v-if='permissionConfig.length > 0 && permissionConfig[1].editCompany' @click='editCompany'>编辑</el-button>
    </div>
    <div class="basicBody">
      <h3>企业形象图片</h3>
			<img v-for='item in imagesUrl' :src='item.url'>
    </div>
    <div class="basicBody">
      <h3>企业信息</h3>
      <el-form label-position="right" ref='companyForm' :rules='rules' label-width="110px" :model="form">
          <el-form-item label="企业全称：" prop='name_full'>
<!--            <el-input placeholder="请输入企业的完整称呼" v-model="form.name_full"></el-input>-->
						<span>{{form.name_full}}</span>
          </el-form-item>
          <el-form-item label="简称：" prop='name_short'>
<!--            <el-input placeholder="如国航、东航、南航等" v-model="form.name_short"></el-input>-->
						<span>{{form.name_short}}</span>
          </el-form-item>
          <el-form-item label="企业地址：" prop='address'>
<!--            <el-input placeholder="请输入企业的地址" v-model="form.address"></el-input>-->
						<span>{{form.address}}</span>
          </el-form-item>
          <el-form-item label="联系电话：" prop='tel'>
<!--            <el-input placeholder="请输入联系电话" v-model="form.tel"></el-input>-->
						<span>{{form.tel}}</span>
          </el-form-item>
          <el-form-item label="官网：" prop='website'>
<!--            <el-input placeholder="HTTP://" v-model="form.website"></el-input>-->
						<span>{{form.website}}</span>
          </el-form-item>
          <el-form-item label="企业性质：" prop='character'> 
<!--
              <el-col :span='5'>
                <el-select v-model="form.character" placeholder="选择企业性质">
                  <el-option label="央企" value="1"></el-option>
                  <el-option label="国企" value="2"></el-option>
                  <el-option label="民企" value="3"></el-option>
                  <el-option label="外企" value="4"></el-option>
                </el-select>
              </el-col>
-->
						
						<span v-if='form.character == 1'>央企</span>
						<span v-else-if='form.character == 2'>国企</span>
						<span v-else-if='form.character == 3'>民企</span>
						<span v-else-if='form.character == 4'>外企</span>
          </el-form-item>
          <el-form-item label="机队规模：" prop='fleet_size'> 
<!--
              <el-col :span='5'>
                <el-select v-model="form.fleet_size" placeholder="选择机队规模">
                <el-option label="1-30架" value="1"></el-option>
                <el-option label="30-99架" value="2"></el-option>
                <el-option label="100架以上" value="3"></el-option>
                </el-select>
              </el-col>
-->
							<span v-if='form.fleet_size == 1'>1-30架</span>
							<span v-else-if='form.fleet_size == 2'>30-99架</span>
							<span v-else-if='form.fleet_size == 3'>100架以上</span>
					</el-form-item>
          <el-form-item label="主营基地：" required>
<!--
            <el-col :span='5'>
              <el-select v-model='address' @change='selectCity' placeholder='选择省级'>
                <el-option v-for='item in localData.area' :label='item.name' :key='item.code' :value='item.code'></el-option>
              </el-select>
            </el-col>
            <el-col :span='5'>
              <el-select class='base_addressClass' v-model='form.base_address' placeholder='选择市级'>
                <el-option v-for='item in nowCity' :label='item.name' :key='item.code' :value='item.code'></el-option>
              </el-select>
            </el-col>
-->
						
						<span v-for='item in localData.area' v-if='address == item.code'>{{item.name}}</span>
						<span v-for='item in nowCity' v-if='form.base_address == item.code'>{{item.name}}</span>
          </el-form-item>
          <el-form-item label="企业介绍：" prop='profile'>
<!--            <el-input placeholder="请简单介绍下贵公司" type='textarea' :autosize="{ minRows: 3, maxRows: 6}" v-model="form.profile" :maxlength='800'></el-input>-->
						<pre>{{form.profile}}</pre>
          </el-form-item>
        </el-form>
    </div>
  </div>

</template>
<script>
    /* eslint-disable */
//  import Qiniu from 'qiniu-js'
//  let plupload = require ('@/components/js/js/plupload.full.min.js')
//  import {ajax} from '@/components/js/tools'
  const global = require('@/global.js')
//  import imgUpload from '../../common/imgUpload/imgUpload'
  import store from '@/store'

  export default {
    components: {
//      imgUpload
    },
    data () {
      return {
        postData: {},
        dialogImages: '',
        dialogVisible: false,
        form: {
          cid: '',
          name_full: '',
          name_short: '',
          address: '',
          website: '',
          character: '',
          fleet_size: '',
          base_address: '', // 选择的市
          profile: '',
          logo: '',
          images: '',
					tel: ''
        },
        logo: '',  // key
        images: [],  // key
        logoUrl: '',
        imagesUrl: [],
        'address': '', // 选择的省
        nowCity: [], // 对应的市
        localData: '',
        showBool: false,
        rules: {
          name_full: [
            { required: true, message: '请输入企业全称', trigger: 'blur' },
            { pattern: /^.{6,20}$/, message: '企业全称长度必须由6~20位组成', trigger: 'blur' }
//            { validator: this.checkAcc, trigger: 'blur' }
          ],
          name_short: [
            { required: true, message: '请输入简称', trigger: 'blur' },
            { pattern: /^.{2,10}$/, message: '简称长度必须为2~10位组成', trigger: 'blur' }
          ],
          tel: [
            { required: true, message: '请输入联系方式', trigger: 'blur' },
            { pattern: /^.{6,20}$/, message: '简称长度必须为6~20位组成', trigger: 'blur' }
          ],
          address: [
            { required: true, message: '请确认企业地址', trigger: 'blur' },
            { pattern: /^.{6,40}$/, message: '企业地址长度为6~40位', trigger: 'blur' }
//            { validator: this.checkPwd, trigger: 'blur' }
          ],
          website: [
            { required: true, message: '请输入企业官网', trigger: 'blur' },
            { pattern: /^.{6,40}$/, message: '请输入一个正确的网址', trigger: 'blur' }
          ],
          base_address: [
            { required: true, message: '请确认主营基地', trigger: 'change' }
//            { validator: this.checkPwd, trigger: 'blur' }
          ],
          profile: [
            { required: true, message: '请确认企业介绍', trigger: 'blur' },
            { pattern: /^[\s\S]{20,800}$/, message: '请输入一个20-800长度的介绍', trigger: 'blur' }
//            { validator: this.checkPwd, trigger: 'blur' }
          ],
          character: [
            { required: true, message: '请选择企业性质', trigger: 'change' }
          ],
          fleet_size: [
            { required: true, message: '请选择机队规模', trigger: 'change' }
          ]
        },
				permissionConfig: []
      }
    },
    activated () {
			this.permissionConfig = JSON.parse(window.sessionStorage.getItem('permissionConfig'))
			this.$axios({
				type: 'get',
				url: global.urlSelf.qiniu.token,
				fuc: (res) => {
					this.postData = {token: res.data}
				}
			})
      this.localData = JSON.parse(window.sessionStorage.getItem('localData'))
      this.$axios({
        url: '/dabai-chaorenjob/company/getCompanyAndManagerByCid',
        type: 'get',
				data: {cid: window.sessionStorage.getItem('cid')},
        fuc: (res) => {
					console.log(res)
					this.form.name_full = res.data.company.name_full
					this.form.name_short = res.data.company.name_short
					this.form.address = res.data.company.address
					this.form.website = res.data.company.website
					this.form.tel = res.data.company.tel
					if (res.data.character !== 0) {
						this.form.character = '' + res.data.company.character
					}
					if (res.data.character !== 0) {
						this.form.fleet_size = '' + res.data.company.fleet_size
					}
					if (res.data.base_address !== '') {
						for (let i in this.localData.area) {
							for (let j in this.localData.area[i].children) {
								if (res.data.company.base_address === this.localData.area[i].children[j].code) {
									this.form.base_address = this.localData.area[i].children[j].code
									this.address = this.localData.area[i].code
									this.nowCity = this.localData.area[i].children
								}
							}
						}
					}
					this.form.profile = res.data.company.profile
					this.form.cid = res.data.company.cid
					if (res.data.company.logoUrl) {
							this.logo = res.data.company.logo
							this.logoUrl = res.data.company.logoUrl
					}
					this.images = res.data.company.images.split(',')
//            let images = res.data.images.split(',')
					this.imagesUrl = []
					for (let val of res.data.company.imagesUrl) {
							this.imagesUrl.push({url: val})
							console.log(this.imagesUrl)
					}
        }
      })
    },
    methods: {
			editCompany () {
				this.$router.push('companySetting')
			},
      beforeAvatarUpload (file) {
        const isJPG = file.type === 'image/jpeg'
        const isPNG = file.type === 'image/png'
        const isLt2M = file.size / 1024 / 1024 < 1

        if (!isJPG && !isPNG) {
          this.$message.error('上传头像图片只能是 JPG.PNG 格式!')
        }
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 1MB!')
        }
        return (isJPG || isPNG) && isLt2M
      },
      uploadError (res, file) {
          this.$notify.error({
              title: '失败',
              message: res + '请稍后重传',
              duration: 1500,
              offset: 100
            })
      },
      handleAvatarSuccess (res, file) {
          this.logo = res.key
          console.log( 1, this.logoUrl)
          store.state.ajax({
            url: global.urlSelf.qiniu.url + res.key,
            type: 'get',
            success: (res) => {
              if (res.code === 1) {
                this.logoUrl = res.data
              }
            }
          })
      },
      handleAvatarSuccessImages (res){
          this.images.push(res.key)
          store.state.ajax({
            url: global.urlSelf.qiniu.url + res.key,
            type: 'get',
            success: (res) => {
              if (res.code === 1) {
                this.imagesUrl.push({url: res.data})
              }
            }
          })
      },
        // 形象图片
      handleRemove(file, fileList) {
        console.log(file)
        for (let val in this.imagesUrl) {
          if (this.imagesUrl[val].url === file.url) {
            this.images.splice(val, 1)
            this.imagesUrl.splice(val, 1)
          }
        }
      },
      handlePictureCardPreview(file) {
        console.log('file', file)
        this.dialogImages = file.url;
        this.dialogVisible = true;
      },

      selectCity () {
        if (this.showBool) {
          this.form.base_address = ''
        }
        this.showBool = true
        for (let value of this.localData.area) {
          if (value.code === this.address) {
            this.nowCity = value.children
          }
        }
      },
      submitForm (companyForm) {
        this.$refs[companyForm].validate((valid) => {
          this.form.logo = this.logo
          //
          let resultimages = ''
          for (let i = 0; i < this.images.length; i++) {
            resultimages += this.images[i]
            if (i !== this.images.length - 1) {
              resultimages += ','
            }
          }
          this.form.images = resultimages
          if (valid) {
            this.$axios({
              url: '/dabai-chaorenjob/company/updateCompany',
              type: 'post',
              data: this.form,
              fuc: (res) => {
								this.$message({
									message: res.msg,
									duration: 1000
								})
              }
            })
          } else {
          }
        })
      }
    }
  }
</script>
<style>
    .basicCheck .basicBody .el-upload-list--picture-card .el-upload-list__item{
        width: 345px;
        height: 160px;
    }
    .basicCheck .basicBody:nth-of-type(2) img{
        width: 345px;
        height: 160px;
			margin-left: 10px;
    }
	.basicCheck .el-upload {
		display: none;
	}
    .avatar-uploader .el-upload {
        border: 1px dashed #d9d9d9;
        border-radius: 6px;
        cursor: pointer;
        position: relative;
        overflow: hidden;
      }
      .avatar-uploader .el-upload:hover {
        border-color: #20a0ff;
      }
      .avatar-uploader-icon {
        font-size: 28px;
        color: #8c939d;
        width: 178px;
        height: 178px;
        line-height: 178px;
        text-align: center;
      }
      .avatar {
        width: 178px;
        height: 178px;
        display: block;
      }
</style>
<style lang='css' scoped>
	pre{
		white-space: pre-wrap;
		word-wrap: break-word;
	}
    .basicBody{
        width: 100%;
        overflow: hidden;
        background-color: white;
        padding-bottom: 10px;
				position: relative;
/*        border-radius: 10px;*/
        border-bottom: 1px solid #eff1f6;
    }
	.basicBody>button{
		position: absolute;
		top: 20px;
		right: 30px;
		width: 140px;
		height: 40px;
	}
    .basic .basicBody:nth-of-type(3){
/*        margin: 20px;*/
        width: auto;
        box-sizing: content-box;
        border-bottom: 1px solid #d8ddeb;
    }
    .basicBody>h3{
        padding: 32px 0 28px 32px;
    }
    .basicBody>h3>span{
        color: lightgray;
        font-weight: 500;
        margin-left: 20px;
    }
    .basicBody .avatar-uploader{
/*        border-top: 3px solid #f0f0f0;*/
        padding: 10px;
    }
    .basicBody>div{
        margin-top: 24px;
    }
    .basicBody .avatar-uploader .el-upload {
        border: 1px dashed #d9d9d9;
        border-radius: 6px;
        cursor: pointer;
        position: relative;
        overflow: hidden;
      }
    .basicBody .avatar-uploader .el-upload img {
        width: 148px;
        height: 148px;
    }
      .basicBody .avatar-uploader .el-upload:hover {
        border-color: #20a0ff;
      }
      .basicBody .avatar-uploader-icon {
        font-size: 28px;
        color: #8c939d;
        width: 178px;
        height: 178px;
        line-height: 178px;
        text-align: center;
      }
      .basicBody .avatar {
        width: 178px;
        height: 178px;
        display: block;
      }
    .companySelect>.el-form-item__content{
        position: relative;
        left: -80px;
        width: 100%;
    }
    .buttonClass>button{
        float: right;
        width: 140px;
        height: 40px;
/*        background-color: #048adf;*/
        margin: 23px 30px;
/*        cursor: pointer;*/
    }
    .buttonClass>button:hover{
/*        background-color: #3e56b3;*/
    }
    .basicBody>form{
        width: 740px;
        margin: auto;
        padding: 40px 0;
/*        border-top: 3px solid #f0f0f0;*/
    }
    .buttonClass{
        width: auto;
        margin: -20px 20px 20px;
        background-color: #f6f9fd;
        overflow: hidden;
        border-bottom: 1px solid #d8ddeb;
        box-shadow: 0px 4px 40px 1px #e6e6e6;
        margin-bottom: 60px;
        box-sizing: content-box;
    }
    .base_addressClass{
        margin-left: 8px;
    }
    .el-select{
        width: 100%;
    }
</style>
