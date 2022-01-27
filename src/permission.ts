import router from './router'
import store from './store'
import { RouteLocationNormalized } from 'vue-router'

// 白名单
const whiteList: string[] = ['/login']

router.beforeEach(async(to: RouteLocationNormalized, from: RouteLocationNormalized, next: any) => {
  // 存在token进入主页
  // 不存在就去登录页
  if (store.getters.token) {
    if (to.path === '/login') {
      next('/')
    } else {
      // 获取用户信息
      if (!store.getters.hasUserInfo) {
        await store.dispatch('user/getUsetInfo')
      }
      next()
    }
  } else {
    if (whiteList.indexOf(to.path) > -1) {
      next()
    } else {
      next('/login')
    }
  }
})
