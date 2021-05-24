import request from '@/utils/request'

export function getUserInfo(userId) {
  return request({
    url: '/system/userInfo',
    method: 'get',
  })
}


export function logout (userId) {
  return request({
    url: '/logout',
    method: 'post',
  })
}
