<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>

export default {
  name: 'app',
  components: {
  },
  watch: {
    /**
     * 监控路由非登录进入，将路由信息添加至状态中
     */
    $route(to, from) {
      if (to.path !== '/login') {
        let obj = {
          name: to.name,
          title: to.meta.title,
          close: true
        }
        this.$store.commit('addTab', obj)
      }
    }
  }
}
</script>

<style>
html,
body,
#app {
  margin: 0;
  padding: 0;
  height: 100%;
  font-size: 13px;
  font-family: "Helvetica Neue", "Hiragino Sans GB", "WenQuanYi Micro Hei", "Microsoft Yahei", sans-serif;
}

a {
  text-decoration: none;
}
</style>
