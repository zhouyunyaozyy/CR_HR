const tj = {
    state: {
      //标签列表
      label_list:JSON.parse(window.sessionStorage.getItem("label_list")) || [],
      //当前标签path
      tabIndex: window.sessionStorage.getItem("tabIndex") || ""
    },
    mutations: {
      addTab (state,key) {
        let titleName,pathName;
        let status = false;
        var label_arr = state.label_list;
        if(label_arr.length > 0){
          label_arr.forEach((item) => {
            if(item.name === key.path || key.path === "/"){
              console.log(2)
              status = true;
              return;
            };
          })
        }
        if(status == false){
          switch (key.name){
            case "hrList":
              titleName = "账号管理"
              pathName = key.path
              break;
            case "jobList":
              titleName = "职位管理"
              pathName = key.path
              break;
            case "jobDetail":
              if(Object.keys(key.params).length > 0){
                titleName = "编辑职位"
              }else{
                titleName = "添加职位"
              }
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
            case "hrDetail":
              titleName = "添加账号"
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
          }
          label_arr.push({
            title: titleName,
            name: pathName,
          })
          // console.log(label_arr)
          window.sessionStorage.setItem("label_list",JSON.stringify(label_arr))
          window.sessionStorage.setItem("tabIndex",pathName)
          state.label_list = label_arr;
          state.tabIndex = pathName
        }else{
          // console.log(key)
          window.sessionStorage.setItem("tabIndex",pathName)
          state.tabIndex = pathName
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
              }
            }
          });
        }
        console.log(activeName,key)
        tabs = tabs.filter(tab => tab.name !== key);
        window.sessionStorage.setItem("label_list",JSON.stringify(tabs))
        window.sessionStorage.setItem("tabIndex",activeName)
        state.tabIndex = activeName;
        state.label_list = tabs
      }
    }
};

export default tj;
