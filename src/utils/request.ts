import axios from 'axios'
import { ElMessage } from 'element-plus'
import { switchServer } from './validate'

const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API,
  timeout: 5000
})

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
    // TODO: 将来处理 token 超时问题
    ElMessage.error(error.message) // 提示错误信息
    return Promise.reject(error)
  }
)

export default service
