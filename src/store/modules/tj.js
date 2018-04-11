const tj = {
    state: {
      //标签列表
      label_list:JSON.parse(window.sessionStorage.getItem("label_list")) || [],
      //当前标签path
      tabIndex: window.sessionStorage.getItem("tabIndex") || ""
    },
    mutations: {
      addTab (state,key) {
        let status = false;
        var label_arr = state.label_list;
        if(label_arr.length > 0){
          label_arr.forEach((item) => {
            if(item.name === key.path || key.path === "/"){
              status = true;
              return;
            };
          })
        }
        if(status == false){
          let titleName;
          switch (key.path){
            case "/hrList":
              titleName = "账号管理"
              break;
            case "/jobList":
              titleName = "职位管理"
              break;
            case "/jobDetail":
              titleName = "添加职位"
              break;
            case "/recruitList":
              titleName = "职位简历"
              break;
            case "/hrDetail":
              titleName = "添加账号"
              break;
          }
          label_arr.push({
            title: titleName,
            name: key.path,
          })
          console.log(label_arr)
          window.sessionStorage.setItem("label_list",JSON.stringify(label_arr))
          window.sessionStorage.setItem("tabIndex",key.path)
          state.label_list = label_arr;
          state.tabIndex = key.path
        }else{
          console.log(key)
          window.sessionStorage.setItem("tabIndex",key.path)
          state.tabIndex = key.path
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
        tabs = tabs.filter(tab => tab.name !== key);
        window.sessionStorage.setItem("label_list",JSON.stringify(tabs))
        window.sessionStorage.setItem("tabIndex",activeName)
        state.tabIndex = activeName;
        state.label_list = tabs
      }
    }
};

export default tj;
