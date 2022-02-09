import { LoginForm } from '@/views/Login/types'
import { login, getUserInfo } from '@/api/sys'
import { getItem, setItem, removeAllItem } from '@/utils/storage'
import { TOKEN, TOKEN_VALUE } from '@/constant/'
import router, { resetRouter } from '@/router'
import { setTimeStamp } from '@/utils/auth'
// import md5 from 'md5'

export default {
  namespaced: true,
  state: () => ({
    token: getItem('token') || '',
    userInfo: {}
  }),
  mutations: {
    setToken(state: any, token: string) {
      setItem(TOKEN, token)
      state.token = token
    },
    setUserInfo(state: any, userInfo: any) {
      state.userInfo = userInfo
    }
  },
  actions: {
    login(context: any, userInfo: LoginForm) {
      const { username, password } = userInfo
      return new Promise((resolve: any, reject: any) => {
        login({
          username,
          password,
          // password: md5(password),
          captchaCode: '6666'
        }).then((res: any) => {
          // 因为是httpOnly模式，所以我们在这里模拟下token
          // this.commit('user/setToken', token)
          context.commit('setToken', TOKEN_VALUE)
          // 缓存时间戳
          setTimeStamp()
          router.push('/')
          resolve(res)
        }).catch((err: any) => {
          reject(err)
        })
      })
    },
    async getUsetInfo(context: any) {
      const data = await getUserInfo()
      context.commit('setUserInfo', data)
      return data
    },
    logout(context: any) {
      context.commit('setToken', '')
      context.commit('setUserInfo', {})
      removeAllItem()
      resetRouter()
      router.push('/login')
    }
  }
}
