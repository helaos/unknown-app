<template>
  <el-tabs v-model="editableTabsValue" type="card" @tab-remove="closeTab" @tab-click="jumpTab">
    <el-tab-pane
      :key="item.name"
      v-for="item in editableTabs"
      :label="item.title"
      :name="item.name"
      :closable="item.close"
    >
    </el-tab-pane>
  </el-tabs>
</template>

<script>
export default {
  name: 'Tabs',
  data() {
    return {
    }
  },
  methods: {

    /**
     * 关闭 Tab
     */
    closeTab(targetName) {
      let tabs = this.editableTabs;
      let activeName = this.editableTabsValue;
      // 如果是首页不进行删除
      if (targetName === 'Index') {
        return
      }
      if (activeName === targetName) {
        tabs.forEach((tab, index) => {
          if (tab.name === targetName) {
            let nextTab = tabs[index + 1] || tabs[index - 1];
            if (nextTab) {
              activeName = nextTab.name;
            }
          }
        });
      }
      this.editableTabsValue = activeName;
      this.editableTabs = tabs.filter(tab => tab.name !== targetName);
      // 删除当前 Tab 返回上一个
      this.$router.push({ name : activeName });
    },

    /**
     * 点击 Tab 进行页面跳转
     */
    jumpTab(target) {
      this.$router.push({ name: target.name })
    }
    
    // TODO: 将路由加入 localStorage中进行储存（vuex页面F5刷新后会丢失路由）
  },
  computed: {
    editableTabsValue: {
      get() {
        return this.$store.state.menus.editableTabsValue
      },
      set(val) {
        this.$store.state.menus.editableTabsValue = val
      }
    },
    editableTabs: {
      get() {
        return this.$store.state.menus.editableTabs
      },
      set(val) {
        this.$store.state.menus.editableTabs = val
      }
    }
  }
}
</script>

<style scoped>
</style>
