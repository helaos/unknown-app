import request from '@/utils/request'

export function getRoleList (name, current, size) {
  return request({
    url: '/system/roleList',
    method: 'get',
    params: {
      name,
      current,
      size
    }
  })
}

export function addRole (role) {
  return request({
    url: '/system/role',
    method: 'post',
    data: {
      role
    }
  })
}

export function updateRole (newRole) {
  return request({
    url: '/system/role',
    method: 'put',
    data: {
      newRole
    }
  })
}

export function getRoleInfo (roleId) {
  return request({
    url: `/system/menu/${roleId}`,
    method: 'get'
  })
}

export function removeRole (roleId) {
  return request({
    url: `/system/menu/${roleId}`,
    method: 'delete'
  })
}

export function userBindRole (id, meunIds) {
  return request({
    url: `/system/role/perm/${id}`,
    method: 'post',
    data: {
      meunIds
    }
  })
}
