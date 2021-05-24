import store from '@/store'
import Home from '@/views/Home'
import axios from 'axios'
import Vue from 'vue'
import VueRouter from 'vue-router'


Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    children: [
      {
        path: '/index',
        name: 'Index',
        component: () => import('@/views/Index')
      },
      {
        path: '/userCenter',
        name: 'UserCenter',
        component: () => import('@/views/UserCenter')
      },
      // {
      //   path: '/system/users',
      //   name: 'SystemUser',
      //   component: () => import('@/views/system/User')
      // },
      // {
      //   path: '/system/roles',
      //   name: 'SystemRole',
      //   component: () => import('@/views/system/Role')
      // },
      // {
      //   path: '/system/menus',
      //   name: 'SystemMenus',
      //   component: () => import('@/views/system/Menu')
      // }
    ]
  },
  {
    path: '/test',
    name: 'UserCenter',
    component: () => import('@/views/UserCenter')
  },

  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/Login')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})


// 路由守护
router.beforeEach((to, from, next) => {

  if (!store.state.menus.hasRoute) {

    axios.get('/system/menu/nav', {
      headers: {
        Authorization: localStorage.getItem('token')
      }
    }).then(res => {

      // 拿到menuList
      store.commit('setMenuList', res.data.data.nav)
      // 拿到用户权限
      store.commit('setPermList', res.data.data.authoritys)

      // 动态绑定路由
      let newRouter = router.options.routes

      // 处理路由数据
      res.data.data.nav.forEach(menu => {
        if (menu.children) {
          menu.children.forEach(e => {
            // 转换路由
            let route = menuToRoute(e)
            // 添加进路由管理
            if (route) {
              newRouter[0].children.push(route)
            }
          })
        }
      })
      // 添加路由
      router.addRoutes(newRouter)
    })

    store.commit('changeRouteStatus', true)
  }

  next()
})

// 导航转路由
const menuToRoute = (menu) => {

  if (!menu.component) {
    return null
  }

  let route = {
    name: menu.name,
    path: menu.path,
    component: () => import(`@/views/${menu.component}`),
    meta: {
      icon: menu.icon,
      title: menu.title
    }
  }
  return route
}

export default router
