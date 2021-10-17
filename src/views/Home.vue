<template>
  <el-container>
    <el-aside width="201px">
      <div class="tilte">
        <img class="logo-image" src="@/assets/images/logo.png" alt="">
        <h2 class="logo-title">Unknown App</h2>
      </div>
      <side-menu />
    </el-aside>
    <el-container>
      <el-header>
        <!-- <strong>Unknown App 后台管理系统</strong> -->
        <div class="header-avatar">
          <el-avatar :src="userInfo.avatar"></el-avatar>
          <el-dropdown>
            <span class="el-dropdown-link">
              {{ userInfo.username }}<i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>
                <router-link to="/userCenter">个人中心</router-link>
              </el-dropdown-item>
              <el-dropdown-item @click.native="logout">退出</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
      </el-header>
      <el-main>
        <tabs />
        <div style="margin: 0 1rem">
          <router-view />
        </div>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import SideMenu from './include/SideMenu'
import Tabs from './include/Tabs';
import { getUserInfo, logout } from '@/api/system/user';
export default {
  name: 'Home',
  components: {
    SideMenu,
    Tabs
  },
  data() {
    return {
      userInfo: {
        id: '',
        username: '',
        avatar: ''
      }
    }
  },
  created() {
    // 获取用户信息
    this.getUserInfo()
  },
  methods: {
    getUserInfo() {
      getUserInfo(1).then(res => {
        this.userInfo = res.data.data
      })
      
    },

    logout() {
      logout(1).then(res => {
        localStorage.clear()
        sessionStorage.clear()
        this.$store.commit('resetState')
        this.$router.push('/login')
      })
    }
  }
}
</script>

<style scoped>
.el-container {
  padding: 0;
  margin: 0;
  height: 100%;
}

.header-avatar {
  float: right;
  width: 9rem;
  display: flex;
  justify-content: space-around;
  align-items: center;
}

.el-header {
  background-color: white;
  color: #333;
  text-align: center;
  line-height: 56px;
  box-shadow: 0 1px 9px rgba(70, 68, 68, 0.3);
  z-index: 1;
}

.el-aside {
  background-color: #d3dce6;
  color: #333;
  line-height: 200px;
  overflow: hidden;
}

.tilte {
  background-color: rgb(66, 66, 190);
  color: #fff;
  min-height: 60px;
  line-height: 60px;
  text-align: center;
  transition: all .3s;
}

.logo-image {
  margin: 0;
  width: 30px;
  height: 30px;
  vertical-align: middle;
  border-radius: 50%;
  padding-right: 5px;
}

.logo-title {
  margin: 0;
  color: #fff;
  display: inline-block;
  font-size: small;
  vertical-align: middle;
  padding-left: 5px;
}

.el-main {
  /* background-color: #e9eef3; */
  /* line-height: 160px; */
  /* text-align: center; */
  color: #333;
  padding: 0.7rem;
}

.el-dropdown-link {
  cursor: pointer;
  color: #409eff;
}
.el-icon-arrow-down {
  font-size: 12px;
}

.el-aside {
  box-shadow: 0 1px 9px rgba(70, 68, 68, 0.3);
}

</style>
