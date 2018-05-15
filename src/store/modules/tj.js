const tj = {
    state: {
      //标签列表
      label_list:JSON.parse(window.sessionStorage.getItem("label_list")) || [],
      //当前标签path
      tabIndex: window.sessionStorage.getItem("tabIndex") || "",
      //是否刷新
      isRefresh: false,
      includePageNames:[],
      isPage:false,
      is_login:false,
      startPage:1,
    },
    mutations: {
      addTab (state,key) {
        if(key.name == "appBack"){
          return;
        }
        let titleName,pathName;
        let status = false;
        var label_arr = state.label_list;
//        if(label_arr.length > 0){
//          label_arr.forEach((item) => {
//
//          })
//        }
				console.log('key', key)
				if(key.name == "login" || key.name == "register" || key.name == "forgetPwd" || key.name == "main"){
					console.log(2)
					status = true;
					return;
				};
        if(status == false){
					console.log('false')
          switch (key.name){
            case "hrList":
              titleName = "账号管理"
              pathName = key.path
              break;
            case "hrDetail":
              titleName = "添加账号"
              pathName = key.path
              break;
            case "hrEdit":
              titleName = "编辑账号"
              pathName = key.path
              break;
            case "jobList":
              titleName = "职位管理"
              pathName = key.path
              break;
            case "jobDetail":
              titleName = "添加职位"
              pathName = key.path
              break;
            case "jobEdit":
              titleName = "编辑职位"
              pathName = key.path
              break;
            case "jobSee":
              titleName = "查看职位"
              pathName = key.path
              break;
            case "resumeList":
              titleName = "职位简历"
              pathName = key.path
              break;
            case "resumeCollect":
              titleName = "简历收藏"
              pathName = key.path
              break;
            case "recruitList":
              titleName = "简历列表"
              pathName = key.path
              break;
            case "resumeDetail":
              titleName = "简历详情"
              pathName = key.path
              break;
            case "recruitResult":
              titleName = "招聘结果"
              pathName = key.path
              break;
            case "sealTalkDetail":
              titleName = "职位沟通"
              pathName = key.path
              break;
            case "personSettingUser":
              titleName = "个人信息"
              pathName = key.path
              break;
            case "personSettingPwd":
              titleName = "个人信息"
              pathName = key.path
              break;
            case "personSettingPhone":
              titleName = "个人信息"
              pathName = key.path
              break;
            case "personSettingPhoneAfter":
              titleName = "个人信息"
              pathName = key.path
              break;
            case "companySetting":
              titleName = "企业信息"
              pathName = key.path
              break;
            case "checkCompany":
              titleName = "查看企业信息"
              pathName = key.path
              break;
            case "feedback":
              titleName = "反馈"
              pathName = key.path
              break;
            case "talkwithSystem":
              titleName = "系统通知"
              pathName = key.path
              break;
          }
					let pushBool = false // 判断是否已经有标签页
					for (let val of label_arr) {
						if (val.title == titleName) {
							pushBool = true
							val.name = pathName
						}
					}
					if (!pushBool) {
						label_arr.push({
							title: titleName,
							name: pathName,
						})
            // state.includePageNames.push(pathName)
					}
          // console.log(label_arr)
          window.sessionStorage.setItem("label_list",JSON.stringify(label_arr))
          window.sessionStorage.setItem("tabIndex",pathName)
          state.label_list = label_arr;
          state.tabIndex = pathName
        }else{
				  console.log('true')
//          window.sessionStorage.setItem("tabIndex",pathName)
//          state.tabIndex = pathName
        }
      },
      changeTab (state,key){
        window.sessionStorage.setItem("tabIndex",key)
        state.tabIndex = key
      },
      removeTab (state,key){
        let tabs = state.label_list;
        let activeName = state.tabIndex;
        if (activeName === key) {
          tabs.forEach((tab, index) => {
            if (tab.name === key) {
              let nextTab = tabs[index + 1] || tabs[index - 1];
              if (nextTab) {
                activeName = nextTab.name;
              } else {
								activeName = ''
							}
            }
          });
        }
        console.log(activeName,key)
        tabs = tabs.filter(tab => tab.name !== key);
        // state.includePageNames= state.includePageNames.filter(item => item !== key);
        window.sessionStorage.setItem("label_list",JSON.stringify(tabs))
        window.sessionStorage.setItem("tabIndex",activeName)
        state.tabIndex = activeName;
        state.label_list = tabs
      },
      refresh (state){
        state.includePageNames= state.includePageNames.filter(item => item !== state.tabIndex);
      }
    }
};

export default tj;
