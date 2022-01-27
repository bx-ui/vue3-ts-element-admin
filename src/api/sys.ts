import request from '@/utils/request'
import { LoginForm } from '@/views/Login/types'

/**
 * 登录
 */
export const login = (data: LoginForm) => {
  return request({
    url: '/auth-server/api/userLogin',
    method: 'POST',
    data
  })
}

/**
 * 获取用户信息
 */
export const getUserInfo = () => {
  return request({
    url: '/auth-server/api/authenticate'
  })
}
