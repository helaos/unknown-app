<template>
  <el-menu
    :default-active="this.$store.state.menus.editableTabsValue"
    class="el-menu-vertical-demo"
    background-color="#5352ed"
    text-color="#fff"
    active-text-color="#ff7f50"
  >
    <router-link class="home-link" to="/index">
      <el-menu-item index="Index" @click="selectMenu({ name: 'Index', title: '首页' })">
        <template slot="title">
          <i class="el-icon-s-home"></i> <span slot="title">首页</span>
        </template>
      </el-menu-item>
    </router-link>

    <el-submenu :index="menu.name" v-for="menu in menuList" :key="menu.id">
      <template slot="title">
        <i :class="menu.icon"></i>
        <span>{{ menu.title }}</span>
      </template>

      <router-link :to="item.path" v-for="item in menu.children" :key="item.id">
        <el-menu-item class="sub-li" :index="item.name" @click="selectMenu(item)">
          <template slot="title">
            <i :class="item.icon"></i>
            <span>{{ item.title }}</span>
          </template>
        </el-menu-item>
      </router-link>
    </el-submenu>

  </el-menu>
</template>

<script>
export default {
  name: 'SideMenu',
  data() {
    return {
    }
  },

  computed: {
    menuList() {
      return this.$store.state.menus.menuList
    }
  },

  methods: {
    selectMenu(item) {
      // 标签页可以被删除
      item.close = true
      this.$store.commit('addTab', item)
    }
  }
}
</script>

<style scoped>
.el-menu-vertical-demo {
  height: 100%;
}

.el-menu {
  width: 200px;
  border-right-width: 0;
}

.home-link {
  text-decoration: none;
}

.sub-li {
  background-color: rgb(66, 66, 190) !important;
}

.sub-li:hover {
  color: #ff7f50 !important;
}
</style>
