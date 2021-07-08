import request from '@/utils/request'

export function getMenuList () {
  return request({
    url: '/system/menuList',
    method: 'get',
  })
}

export function addMenu (menu) {
  return request({
    url: '/system/menu',
    method: 'post',
    data: {
      menu
    }
  })
}

export function updateMenu (newMenu) {
  return request({
    url: '/system/menu',
    method: 'put',
    data: {
      newMenu
    }
  })
}

export function getMenuInfo (menuId) {
  return request({
    url: `/system/menu/${menuId}`,
    method: 'get'
  })
}

export function removeMenu (menuId) {
  return request({
    url: `/system/menu/${menuId}`,
    method: 'delete'
  })
}
