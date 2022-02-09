import axios from 'axios'
import { ElMessage } from 'element-plus'
import { switchServer } from './validate'
import store from '@/store'
import { isCheckTimeout } from '@/utils/auth'

const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API,
  timeout: 5000
})

// 请求拦截器
service.interceptors.request.use(
  (config: any) => {
    if (store.getters.token) {
      if (isCheckTimeout()) {
        // 登出操作
        store.dispatch('user/logout')
      }
      // 因为是httponly， 前端不需要这么做
      // config.headers.Authorization = `Bearer ${store.getters.token}`
      // 接口国际化处理
      config.headers['Accept-Language'] = store.getters.language
    }
    return config
  },
  (error: any) => {
    return Promise.reject(error)
  }
)

// 响应拦截器
service.interceptors.response.use(
  (response: any) => {
    console.log(response.request.responseURL)
    if (switchServer(response.request.responseURL)) {
      const { status, message, result } = response.data
      if (status === 200) {
        return result
      } else {
        ElMessage.error(message) // 提示错误消息
      }
    } else {
      const { code, message, data } = response.data
      if (code === 0) {
        return data
      } else {
        ElMessage.error(message) // 提示错误消息
      }
    }
  },
  (error: any) => {
    if (
      error.response &&
      error.response.data &&
      error.response.data.code === 401
    ) {
      // token超时
      store.dispatch('user/logout')
    }
    // TODO: 将来处理 token 超时问题
    ElMessage.error(error.message) // 提示错误信息
    return Promise.reject(error)
  }
)

export default service
