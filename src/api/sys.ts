import request from '@/utils/request'
import { LoginForm } from '@/views/Login/types'
import { LOAD_MENU_KEY } from '@/constant'
import { LoadMenuType } from '@/types'

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

/**
 * 获取用户菜单
 */
export const generateMenu = () => {
  return request({
    url: `/user-server/api/menus/data-home?serverCode=${LOAD_MENU_KEY}`
  })
}
