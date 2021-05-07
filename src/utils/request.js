import router from '@/router'
import axios from 'axios'
import { Message } from 'element-ui'

// axios.defaults.baseURL = 'http://localhost:8001'

const request = axios.create({
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json; charset=utf-8'
  }
})

request.interceptors.request.use(config => {
  config.headers['Authorization'] = localStorage.getItem('token')
  return config
})

request.interceptors.response.use(response => {

  let result = response.data

  // 请求是否正常
  if (result.code === 200) {
    return response
  } else {
    Message.error(result.msg ? result.msg : '系统异常')
    return Promise.reject(result.msg)
  }
  // 是否为内部错误
}, error => {

  // 响应是否有数据
  if (error.response.data) {
    error.message = error.response.data.msg
  }

  // 没有权限
  if (error.response.status === 401) {
    router.push('/login')
  }

  // 弹窗
  Message.error(error.message, { duration: 3000 })
  return Promise.reject(error)
})

// 暴露出去
export default request
