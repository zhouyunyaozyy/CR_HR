// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from '@/store'
import axios from 'axios';
import qs from 'qs'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css';
import { Message } from 'element-ui';

Vue.use(ElementUI)

Vue.config.productionTip = false

//封装方法

Vue.prototype.$axios = (params) => {
  
//  cr-token算法
  let resultData = 0
  if(window.sessionStorage.getItem('sessionSalt')){
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
      let postTime = ''+(Date.parse(new Date()))// 时间戳
      let postVersion = rndRandom(20) // uuid随机数
      let base64DataBefore = {
          sessionId: Cookies.get('sessionId'),
          postVersion: postVersion,
          postTime:postTime
      }
     // sessionSalt="sessionSalt"&postVersion="UUid 随机数"&postTime="时间戳"&platform="平台名称"&clientUid="机器唯一编码"
      let hmacDataBefore = 'sessionSalt=' + Cookies.get('sessionSalt')+'&postVersion='+postVersion+'&postTime='+postTime+'&platform='+window.localStorage.getItem('platform')+'&clientUid='+window.localStorage.getItem('clientUid')
      var hmacData = CryptoJS.HmacSHA1(hmacDataBefore, Cookies.get('sessionSalt'))
      let base64Data = Base64.encode(JSON.stringify(base64DataBefore))
      resultData = base64Data+'.'+hmacData
  }
//
  let baseUrl = global.configSelf.api
  if (params.type === 'get') {
    axios.get(baseUrl + params.url, {withCredentials:false, headers: {"Content-Type": "application/x-www-form-urlencoded ", "Accept" : "*/*", 'CR-token': resultData}})
      .then(function(response){
        if (response.data.code != 1) {
          Message({
            message: response.data.msg,
            type: 'error',
          });
        } else {
          params.fuc(response.data)
        }
      })
      .catch(function(error){
          Message({
            message: error,
            type: 'error',
          });
      });
  } else {
    axios.post(
      baseUrl + params.url,
      qs.stringify(params.data), 
      {
        withCredentials:false, 
        headers: {"Content-Type": "application/x-www-form-urlencoded ", "Accept" : "*/*", 'CR-token': resultData}
      })
      .then(function(response){
        if (response.data.code !== 1) {
          Message({
            message: response.data.msg,
            type: 'error',
          });
        } else {
          params.fuc(response.data)
        }
      })
      .catch(function(error){
         Message({
          message: error,
          type: 'error',
        });
      });
  }
}

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
