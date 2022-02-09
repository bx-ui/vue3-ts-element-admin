import router from './router'
import store from './store'
import { RouteLocationNormalized, RouteRecordRaw } from 'vue-router'

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
        // 处理用户权限，筛选出需要添加的权限
        const filterRoutes: RouteRecordRaw[] = await store.dispatch('permission/filterRoutes')
        // 利用 addRoute 循环添加
        filterRoutes.forEach((item: RouteRecordRaw) => {
          router.addRoute(item)
        })
        // 添加完动态路由之后，需要在进行一次主动跳转
        return next(to.path)
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
