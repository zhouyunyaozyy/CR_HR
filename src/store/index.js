/* eslint-disable */
import Vue from 'vue'
import Vuex from 'vuex'
import JSEncrypt from 'jsencrypt'
import Guid from 'guid'
import tj from './modules/tj';
import zyy from './modules/zyy';
let CryptoJS = require('crypto-js')

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    ajax: '',
    pageStatus: 'login',
    jiamiData: '',
    validationUid: '',
    newValidationUid: '',
    key: '',
    oldVerification: '',
    localTalkData: JSON.parse(window.localStorage.getItem(window.sessionStorage.getItem('uid')))
  },
  mutations: {
    jiami (state, msg) {
      function rndRandom (size) {
        let rnd = {}
        rnd.size = size
        rnd.list = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', '0', '1', '2', '3', '4', '5', '6', '7', '8', '9']
        rnd.val = '' // key
        for (var i = 0; i < rnd.size; ++i) {
          var tmp = parseInt((rnd.list.length) * Math.random())
          if (i === 7) {
            if (tmp % 2 === 0) {
              rnd.val += '_'
            } else {
              rnd.val += rnd.list[tmp] + '_'
              rnd.list.splice(tmp, 1)
              i++
            }
          } else {
            rnd.val += rnd.list[tmp]
            rnd.list.splice(tmp, 1)
          }
        }
        return rnd.val
      }
      let beforeKey = rndRandom(16)
      state.key = beforeKey
//        rnd.val = Base64.encode(rnd.val)
      let data = {}
      if (state.pageStatus === 'reg' || state.pageStatus === 'forget' || state.pageStatus === 'login') {
          // 获取浏览器信息
          var explorer = window.navigator.userAgent.toLowerCase()
					console.log('explorer', explorer)
        // ie
          if (explorer.indexOf('msie') >= 0) {
            let ver = explorer.match(/msie ([\d.]+)/)[1]
            data.client = 'IE'
            data.clientVersion = ver
          } else if (explorer.indexOf('trident') >= 0) {
            let ver = explorer.match(/trident\/([\d.]+)/)[1]
//						console.log('ver', ver)
            data.client = 'trident'
            data.clientVersion = ver
          } else if (explorer.indexOf('firefox') >= 0) { // firefox
            let ver = explorer.match(/firefox\/([\d.]+)/)[1]
            data.client = 'Firefox'
            data.clientVersion = ver
          } else if (explorer.indexOf('chrome') >= 0) { // Chrome
            let ver = explorer.match(/chrome\/([\d.]+)/)[1]
            data.client = 'Chrome'
            data.clientVersion = ver
          } else if (explorer.indexOf('opera') >= 0) { // Opera
            let ver = explorer.match(/opera.([\d.]+)/)[1]
            data.client = 'Opera'
            data.clientVersion = ver
          } else if (explorer.indexOf('safari') >= 0) { // Safari
            let ver = explorer.match(/version\/([\d.]+)/)[1]
            data.client = 'Safari'
            data.clientVersion = ver
          }
          window.localStorage.setItem('platform', 'DABAI_CHAORENJOB_B_WEB')
        // 判断本地是否有clintUid
          if (window.localStorage.getItem('clientUid')) {
            data.clientUid = window.localStorage.getItem('clientUid')
          } else {
            data.clientUid = Guid.create().value
            window.localStorage.setItem('clientUid', data.clientUid)
          }
          if (state.pageStatus === 'reg') {
            data.verificationId = state.validationUid
            data.mobile = msg.phone
            data.password = msg.pwd
            data.verificationCode = msg.num
          }
          if (state.pageStatus === 'forget') {
            data.postVersion = state.validationUid + '.' + msg.num
          } else if (state.pageStatus === 'login') {
						data.username = msg.phone
          	data.password = msg.pwd
          	data.platform = 'DABAI_CHAORENJOB_B_WEB'
					}
      } else if (state.pageStatus === 'newPhone') { // 更换手机号
//        oldMobile:"旧的手机号"
//        newMoblie:"新的手机号"
//        postVersion:"validationUid.验证码.validationUid.验证码"  // validationUid + "." + 验证码 一共有两段 第一段 是旧手机 + 验证码，第二段是新手机加验证码
          data.oldMobile = window.sessionStorage.getItem('userPhone')
          data.newMoblie = msg.phone
          data.postVersion = state.validationUid + '.' + state.oldVerification + '.' + state.newValidationUid + '.' + msg.verification
      } else if (state.pageStatus === 'newPwd') {
          data.oldPassWord = msg.oldPwd
          data.newPassWord = msg.pwd
      }
    	console.log('data', data)
      let resultData = {}
      // aes加密
      resultData.content = (function () {
        let key = CryptoJS.enc.Utf8.parse(beforeKey)
        let iv = CryptoJS.enc.Utf8.parse('16-Bytes--String')
        var encrypted = CryptoJS.AES.encrypt(JSON.stringify(data), key,
          {
            iv: iv,
            mode: CryptoJS.mode.CBC,
            padding: CryptoJS.pad.Pkcs7
          })
//        getDAesString (encrypted, key, iv) { // 解密
//        key = CryptoJS.enc.Utf8.parse(key)
//        iv = CryptoJS.enc.Utf8.parse(iv)
//        var decrypted = CryptoJS.AES.decrypt(encrypted, key,
//          {
//            iv: iv,
//            mode: CryptoJS.mode.CBC,
//            padding: CryptoJS.pad.Pkcs7
//          })
//        return decrypted.toString(CryptoJS.enc.Utf8)
//      }
        return encrypted.toString() // 返回的是base64格式的密文
      })()
  // RSA加密
      let encrypt = new JSEncrypt()
      var publicKey = 'MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCdIIlQzv3fb9ktUGphZ/4l0qQ87iMxLjn1Rc3yhWL0KlnTSY/tziRi0XRyoSCBovZe1hhWGXnfwSvgJRvkzBWRHrnGor0+6I18DnY1lnrckp6bmjirX0BvdqFWxmXgIoz985YjLnPGNqBzt58EBdC5YqUYYnATRgKMA4g0N0Cd6QIDAQAB'  // 从服务端接收到的公钥，缓存到本地
      encrypt.setPublicKey(publicKey)
      resultData.aesKey = encrypt.encrypt(beforeKey) // RSAkey
      state.jiamiData = resultData
    },
    jieMi (state, msg) { // 解密
      let key = CryptoJS.enc.Utf8.parse(state.key)
      let iv = CryptoJS.enc.Utf8.parse('16-Bytes--String')
      var decrypted = CryptoJS.AES.decrypt(msg, key,
        {
          iv: iv,
          mode: CryptoJS.mode.CBC,
          padding: CryptoJS.pad.Pkcs7
        })
      window.sessionStorage.setItem('ticket', decrypted.toString(CryptoJS.enc.Utf8).split('.')[0])
      window.sessionStorage.setItem('ticketsSalt', decrypted.toString(CryptoJS.enc.Utf8).split('.')[1])
    }
  },
  modules: {
      tj,
      zyy
  }
})

export {store as default}
