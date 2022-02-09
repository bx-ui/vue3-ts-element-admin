import { getItem, setItem } from '@/utils/storage'
import { MAIN_COLOR, DEFAULT_COLOR } from '@/constant'
import variables from '@/styles/variables.scss'

type ThemeState = {
  mainColor: string,
  variables: any
}

export default {
  namespaced: true,
  state: () => ({
    mainColor: getItem(MAIN_COLOR) || DEFAULT_COLOR,
    variables
  }),
  mutations: {
    /**
     * 设置主题色
     */
     setMainColor(state: ThemeState, newColor: string) {
      setItem(MAIN_COLOR, newColor)
      state.mainColor = newColor
      state.variables.menuBg = newColor
     }
  }
}
