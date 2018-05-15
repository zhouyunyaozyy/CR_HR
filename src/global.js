//服务器切换必改参数
/* eslint-disable */
let urlSelf = {
    common: {
      configJson: '/common/configJson'
    },
    rong: {
      getToken: '/dabai-chaorenjob/common/getHrRongToken',
      getUser: '/dabai-chaorenjob/resumeReceived/getHeaderByRrid'
    },
    hr: {
      insertChildren: '/hr/user/insertChildren', // 添加子账号
      unbindChildren: '/hr/user/unbindChildren', // 删除子账号
      freezeChildren: '/hr/user/freezeChildren', // 冻结子账号
      unFreezeChildren: '/hr/user/unFreezeChildren', // 解冻子账号
      getAllChildren: '/hr/user/getAllChildren'  // 获取所有子账号
    },
    qiniu: {
      token: '/dabai-chaorenjob/common/qiniu/token', // 获取七牛上传时需要的token
      url: '/dabai-chaorenjob/common/qiniu/url/' // 获取上传文件的路径
    },
    company: {
      getCompanyInfo: '/company/getCompanyInfo', // 获取公司基本信息
      pullCompanyInfo: '/company/pullCompanyInfo' // 提交公司基本信息
    },
    parent: {
      parentIndexJobController: '/parent/parentIndexJobController', // 获取首页职位信息
      getAllListOfParentUndo: '/parent/getAllListOfParentUndo' // 获取首页未处理简历信息
    }
}
// 开发
let configSelf = {
  appKey: 'k51hidwqknn3b',
  //paramUrl: 'http://192.168.1.115:8080',
  paramUrl: 'http://192.168.1.115:5020',
  nodeUrl: 'http://192.168.1.183:7000',
  proxyTable: {
//    '*': {
//      target: 'http://192.168.0.115:8080',
//      changeOrigin: true,
//      filter: function (pathname, req) {
//        return pathname.match('^(/hr/login)|(/hr/register)|(/hr/forget)|(/hr/user)|(/message)|(/qiniu)|(/company)|(/job)|(/children)|(/common)|(/qiniu)|(/mobile)|(/favorite)|(/parent)|(/rong)|(/hr)')
//      }
//    }
  }
}
// 调试
let configSelf2 = {
  appKey: 'k51hidwqknn3b',
  paramUrl: 'http://192.168.1.222:8080',
  proxyTable: {
//    '*': {
//      target: 'http://192.168.0.222:8080',
//      changeOrigin: true,
//      filter: function (pathname, req) {
//        return pathname.match('^(/hr/login)|(/hr/register)|(/hr/forget)|(/hr/user)|(/message)|(/qiniu)|(/company)|(/job)|(/children)|(/common)|(/qiniu)|(/mobile)|(/favorite)|(/parent)|(/rong)|(/hr)')
//      }
//    }
  }
}
// 正式
let configSelf3 = {
  appKey: 'tdrvipkstqq95',
  paramUrl: 'http://api.chaorenjob.com',
  nodeUrl: 'http://exp.chaorenjob.com',
  proxyTable: {}
}

// 预发布
let configSelf4 = {
  appKey: 'tdrvipkstqq95',
  paramUrl: 'http://api-pre.chaorenjob.com',
  proxyTable: {}
}

// 测试
let configSelf5 = {
  appKey: 'k51hidwqknn3b',
  paramUrl: 'http://api-test.chaorenjob.com',
  nodeUrl: 'http://exp-test.chaorenjob.com',
//  nodeUrl: 'http://192.168.1.183:7000',
  proxyTable: {}
}

module.exports.urlSelf = urlSelf
// module.exports.configSelf = configSelf // 杨山服务器（开发）
//module.exports.configSelf = configSelf2 // 测试服务器（调试）
//module.exports.configSelf = configSelf3 // 线上服务器（正式）
//module.exports.configSelf = configSelf4 // 线上服务器（预发布）
module.exports.configSelf = configSelf5 // 线下服务器（测试）
