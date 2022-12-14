const Mock = require('mockjs')

const Random = Mock.Random

let Result = {
  code: 200,
  msg: '操作成功！',
  data: null
}

Mock.mock('/captcha', 'get', () => {

  Result.data = {
    token: Random.string(32),
    captchaImg: Random.dataImage('100x40', 'p7n5w')
  }

  return Result
})

Mock.mock('/login', 'post', () => {

  // 无法将jwt传入headers里，所以就无所谓了
  // Result.code = 400
  // Result.msg = '验证码错误！'

  return Result
})

Mock.mock('/logout', 'post', () => {

  return Result
})

Mock.mock('/system/userInfo', 'get', () => {

  // 无法将jwt传入headers里，所以就无所谓了
  // Result.code = 400
  // Result.msg = '成功'
  Result.data = {
    id: '1',
    username: 'Admin',
    avatar: 'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png'
  }

  return Result
})

Mock.mock('/system/menu/nav', 'get', () => {

  let nav = [
    {
      id: 1,
      title: '系统管理',
      name: 'SystemMange',
      icon: 'el-icon-s-operation',
      component: '',
      path: '',
      children: [
        {
          id: 3,
          title: '用户管理',
          name: 'SystemUser',
          icon: 'el-icon-s-custom',
          component: 'system/User',
          path: '/system/users',
          children: []
        },
        {
          id: 4,
          title: '角色管理',
          name: 'SystemRole',
          icon: 'el-icon-rank',
          component: 'system/Role',
          path: '/system/roles',
          children: []
        },
        {
          id: 5,
          title: '菜单管理',
          name: 'SystemMenu',
          icon: 'el-icon-menu',
          component: 'system/Menu',
          path: '/system/menus',
          children: []
        }
      ],
    },
    {
      id: 2,
      title: '系统工具',
      name: 'SysTools',
      icon: 'el-icon-s-tools',
      component: '',
      path: '',
      children: [
        {
          id: 6,
          title: '数字字典',
          name: 'SysDict',
          icon: 'el-icon-s-order',
          component: '',
          path: '/system/dicts',
          children: []
        }
      ]
    }
  ]
  let authoritys = []

  Result.data = {
    nav,
    authoritys
  }

  return Result
})

Mock.mock('/system/menuList', 'get', () => {
  let menuList = [
    {
      id: 1,
      name: '王小虎',
      perms: '/user',
      icon: 're-sd',
      type: 1,
      path: '/suerper',
      component: '/sdasdw',
      order: 1,
      status: 1,
    },
    {
      id: 2,
      name: '王小虎',
      perms: '/user',
      icon: 're-sd',
      type: 1,
      path: '/suerper',
      component: '/sdasdw',
      order: 1,
      status: 1,
    },
    {
      id: 3,
      name: '王小虎',
      perms: '/user',
      icon: 're-sd',
      type: 1,
      path: '/suerper',
      component: '/sdasdw',
      children: [
        {
          id: 4,
          name: '王小虎',
          perms: '/user',
          icon: 're-sd',
          type: 1,
          path: '/suerper',
          component: '/sdasdw',
          order: 1,
          status: 1,
        },
        {
          id: 5,
          name: '王小虎',
          perms: '/user',
          icon: 're-sd',
          type: 1,
          path: '/suerper',
          component: '/sdasdw',
          order: 1,
          status: 1,
        }
      ],
      order: 1,
      status: 1,
    }
  ]

  Result.data = {
    menuList
  }

  return Result
})

Mock.mock('/system/menu', 'put', () => {
  
})

Mock.mock('/system/menu', 'post', () => {

})

Mock.mock('/system/menu', 'get', () => {

})
