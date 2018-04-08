// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import {router} from './router'
import store from '@/store'
import axios from 'axios';
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css';
import { Message } from 'element-ui';
const Base64 = require('js-base64').Base64
const CryptoJS = require('crypto-js')
const global = require('./global.js')

Vue.use(ElementUI)

Vue.config.productionTip = false

//封装方法

Vue.prototype.$axios = (params) => {
  
//  cr-token算法
  let resultData = 0
  console.log(Base64)
  console.log(CryptoJS)
  if(window.sessionStorage.getItem('ticketsSalt')){
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
          tickets: window.sessionStorage.getItem('ticket'),
          postVersion: postVersion,
          postTime:postTime,
          appVersion: 1
      }
     // sessionSalt="sessionSalt"&postVersion="UUid 随机数"&postTime="时间戳"&platform="平台名称"&clientUid="机器唯一编码"
      let hmacDataBefore = 'ticketsSalt=' + window.sessionStorage.getItem('ticketsSalt')+'&postVersion='+postVersion+'&postTime='+postTime+'&platform='+window.localStorage.getItem('platform')+'&clientUid='+window.localStorage.getItem('clientUid')
      var hmacData = CryptoJS.HmacSHA1(hmacDataBefore, window.sessionStorage.getItem('ticketsSalt'))
      let base64Data = Base64.encode(JSON.stringify(base64DataBefore))
      resultData = base64Data+'.'+hmacData
  }
//
  let baseUrl = global.configSelf.paramUrl
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
      params.data, 
      {
        withCredentials:false, 
        headers: {"Content-Type": "application/json", "Accept" : "*/*", 'CR-token': resultData}
      })
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
        if (error.response) {
          // The request was made and the server responded with a status code
          // that falls out of the range of 2xx
          console.log(error.response.data);
          console.log(error.response.status);
          console.log(error.response.headers);
        } else if (error.request) {
          // The request was made but no response was received
          // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
          // http.ClientRequest in node.js     
          console.log(error.request);
        } else {
          // Something happened in setting up the request that triggered an Error
          console.log('Error', error.message);
        }
         Message({
          message: error.message,
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
