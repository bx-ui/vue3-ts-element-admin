import { generateColors } from '@/utils/theme'
import { getItem } from '@/utils/storage'
import { MAIN_COLOR } from '@/constant'

const getters = {
  token: (state: any) => state.user.token,
  /**
   * return true --> 有用户信息, false --> 无用户信息
   */
  hasUserInfo: (state: any) => {
    return JSON.stringify(state.user.userInfo) !== '{}'
  },
  userInfo: (state: any) => state.user.userInfo,
  // css变量
  cssVar: (state: any) => {
    return {
      ...state.theme.variables,
      ...generateColors(getItem(MAIN_COLOR))
    }
  },
  // 汉堡按钮状态，左侧导航栏收缩状态
  sidebarOpened: (state: any) => state.app.sidebarOpened,
  // 国际化
  language: (state: any) => state.app.language,
  mainColor: (state: any) => state.theme.mainColor,
  // tagview
  tagsViewList: (state: any) => state.app.tagsViewList,
  // primissionMenu
  menus: (state: any) => state.permission.promisssionMenus
}

export default getters
