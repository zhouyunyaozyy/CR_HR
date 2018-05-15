<template>
  <div class="feedback">
    <div class="basicBody">
      <h3>上传图片 <span>支持jpg/png格式，不超过1M。</span></h3>
      <el-upload
          action="http://upload-z2.qiniu.com"
          list-type="picture-card" :file-list="imagesUrl"
          :before-upload="beforeAvatarUpload"
          :on-preview="handlePictureCardPreview" :on-success="handleAvatarSuccessImages"
          :on-remove="handleRemove" :data="postData">
          <i class="el-icon-plus"></i>
        </el-upload>
        <el-dialog :visible.sync="dialogVisible" size="tiny">
          <img width="100%" :src="dialogImages" alt="形象图片">
        </el-dialog>
    </div>
    <div class="thinks">
      <h3>请告诉我们你的想法</h3>
      <el-input :maxlength='400' type='textarea' v-model='textareaValue' placeholder='在此输入内容' :autosize="{ minRows: 2, maxRows: 4}"></el-input>
    </div>
    <div class="buttonClass">
        <el-button type="primary" @click="submitForm">提交</el-button>
    </div>
  </div>
</template>
<script>
    /* eslint-disable */
  const global = require('@/global.js')
//  import store from '@/store'
  export default {
    data () {
      return {
        postData: {},
        imagesUrl: [],
        images: [],
        dialogVisible: false,
        dialogImages: '',
        textareaValue: ''
      }
    },
    created () {
      this.$axios({
        url: global.urlSelf.qiniu.token,
        type: 'get',
        fuc: (res) => {
					this.postData = {token: res.data}
        }
      })
    },
    methods: {
      handlePictureCardPreview(file) {
        console.log('file', file)
        this.dialogImages = file.url;
        this.dialogVisible = true;
        console.log('file', this.dialogVisible)
      },
      beforeAvatarUpload (file) {
        console.log(file.size, 'size')
        const isJPG = file.type === 'image/jpeg'
        const isPNG = file.type === 'image/png'
//        const isGif = file.type === 'image/gif'
        const isLt2M = file.size / 1024 / 1024 < 1

        if (!isJPG && !isPNG) {
          this.$message.error('上传反馈图片只能是 JPG.PNG 格式!')
        }
        if (!isLt2M) {
          this.$message.error('上传反馈图片大小不能超过 1M!')
        }
				if ((isJPG || isPNG) && isLt2M) {
					document.getElementsByClassName('el-upload el-upload--picture-card')[0].style.display = 'none'
				}
        return (isJPG || isPNG) && isLt2M
      },
      handleAvatarSuccessImages (res){
          this.images.push(res.key)
          this.$axios({
            url: global.urlSelf.qiniu.url + res.key,
            type: 'get',
            fuc: (res) => {
							this.imagesUrl.push({url: res.data})
            }
          })
          if (this.images.length < 3) {
              document.getElementsByClassName('el-upload el-upload--picture-card')[0].style.display = 'inline-block'
            } else {
              document.getElementsByClassName('el-upload el-upload--picture-card')[0].style.display = 'none'
            }
      },
      handleRemove(file, fileList) {
        console.log(file)
        for (let val in this.imagesUrl) {
          if (this.imagesUrl[val].url === file.url) {
            this.images.splice(val, 1)
            this.imagesUrl.splice(val, 1)
          }
        }
        if (this.images.length < 3) {
          document.getElementsByClassName('el-upload el-upload--picture-card')[0].style.display = 'inline-block'
        }
      },
      submitForm () {
        if (this.textareaValue.replace(' ', '').length === 0) {
          this.$message.error('请先输入你的想法')
          return
        }
        let data = {}
        // 获取浏览器信息
        var explorer = window.navigator.userAgent.toLowerCase()
      // ie
        if (explorer.indexOf('msie') >= 0) {
          let ver = explorer.match(/msie ([\d.]+)/)[1]
          data.client = 'IE'
          data.client_version = ver
        } else if (explorer.indexOf('firefox') >= 0) { // firefox
          let ver = explorer.match(/firefox\/([\d.]+)/)[1]
          data.client = 'Firefox'
          data.client_version = ver
        } else if (explorer.indexOf('chrome') >= 0) { // Chrome
          let ver = explorer.match(/chrome\/([\d.]+)/)[1]
          data.client = 'Chrome'
          data.client_version = ver
        } else if (explorer.indexOf('opera') >= 0) { // Opera
          let ver = explorer.match(/opera.([\d.]+)/)[1]
          data.client = 'Opera'
          data.client_version = ver
        } else if (explorer.indexOf('Safari') >= 0) { // Safari
          let ver = explorer.match(/version\/([\d.]+)/)[1]
          data.client = 'Safari'
          data.client_version = ver
        }
        data.app_version = '1'
        data.content = this.textareaValue
        console.log(this.images)
        data.images = this.images.join(',')
        data.title = 'hrWeb反馈'
        this.$axios({
          url: '/dabai-chaorenjob/feedback/insert',
          type: 'post',
          data: data,
          fuc: (res) => {
						this.$message.success('操作成功')
						this.imagesUrl = []
						this.images = []
						this.textareaValue = ''
						document.getElementsByClassName('el-upload el-upload--picture-card')[0].style.display = 'inline-block'
          }
        })
      }
    }
  }
</script>
<style>
  
    .feedback .basicBody .el-upload-list--picture-card .el-upload-list__item{
        width: 345px;
        height: 160px;
    }
    .feedback .basicBody:nth-of-type(1) .el-upload{
        width: 345px;
        height: 160px;
    }
</style>
<style scoped="true" lang="css">
  .feedback{
/*      background-color: white;*/
      width: 100%;
      overflow: auto;
      padding: 24px;
      box-sizing: border-box;
  }
  
  .basicBody{
      width: 100%;
      overflow: hidden;
			box-sizing: border-box;
      background-color: white;
      padding: 20px calc((100% - 720px) / 2);
/*        border-radius: 10px;*/
  }
  .basicBody>h3{
      padding: 12px 0 20px 0px;
/*      border-bottom: 1px solid #eff1f6;*/
  }
  .basicBody>h3>span{
      color: #838287;
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
  
  .thinks{
    width: 100%;
    box-sizing: border-box;
    background-color: white;
		margin-top: 10px;
    padding: 20px calc((100% - 720px) / 2);
/*    border-bottom: 1px solid #D8DDEB;*/
  }
  .thinks>h3{
    margin-bottom: 30px;
  }
  .buttonClass>button{
      float: right;
      width: 116px;
      height: 36px;
/*      background-color: #3e56b3;*/
      margin: 23px 0px;
      cursor: pointer;
  }
  .buttonClass>button:hover{
/*      background-color: #5f73c3;*/
  }
  .buttonClass{
			padding: 0 calc((100% - 720px) / 2);
      width: auto;
/*      margin: -20px 20px 20px;*/
      background-color: white;
      overflow: hidden;
/*      border-bottom: 1px solid #d8ddeb;*/
/*      box-shadow: 0px 4px 40px 1px #e6e6e6;*/
      margin-bottom: 60px;
      box-sizing: content-box;
  }
</style>