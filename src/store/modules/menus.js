import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default ({
  state: {
    // 路由列表
    menuList: [],
    // 权限列表
    authoritys: [],
    // 是否有获取路由
    hasRoute: false,
    // 标题
    editableTabsValue: 'Index',
    editableTabs: [{
      title: '首页',
      name: 'Index',
      close: false
    }]
  },
  mutations: {

    setMenuList (state, menus) {
      state.menuList = menus
    },

    setPermList (state, perms) {
      state.authoritys = perms
    },

    changeRouteStatus (state, hasRoute) {
      state.hasRoute = hasRoute
      // 放入 sessionStorage
      sessionStorage.setItem('hasRoute', hasRoute)
    },
    // 添加 Tabs
    addTab (state, tab) {
      // 判定是否有重复的 Tab
      let index = state.editableTabs.findIndex(e => e.name === tab.name)
      // 如果没有找到
      if (index === -1) {
        // 将 Tab 数据添加进数组
        state.editableTabs.push({
          title: tab.title,
          name: tab.name,
          close: true
        })
      }
      // 如果没有就是只是将激活 Tab的值进行修改
      state.editableTabsValue = tab.name
    },
    // 清除信息
    resetState: (state) => {
      state.menuList = []
      state.authoritys = []
      state.hasRoute = false
      state.editableTabsValue = 'Index'
      state.editableTabs = [{
        title: '首页',
        name: 'Index',
        close: false
      }]
    }
  },
  actions: {
  },
  modules: {
  }
})
