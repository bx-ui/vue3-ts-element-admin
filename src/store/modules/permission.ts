import { publicRoutes, privateRoutes } from '@/router'
import { generateMenu } from '@/api/sys'
// import { LoadMenuType } from '@/types'

// 专门处理权限路由的模块
export type PermissionState = {
  routes: any[],
  promisssionMenus: string[]
}

export default {
  namespaced: true,
  state: () => ({
    // 路由表：初始拥有静态路由权限
    routes: publicRoutes
  }),
  mutations: {
    /**
     * 增加路由
     */
     setRoutes(state: PermissionState, payload: { newRoutes: any; promisssionMenus: string[] }) {
       // 永远在静态路由的基础上增加新路由
       state.routes = [...publicRoutes, payload.newRoutes]
       // 顺便保存一下map出来的路有名称集合
       state.promisssionMenus = [...payload.promisssionMenus]
     }
  },
  actions: {
    /**
     * 根据权限筛选路由
     */
     async filterRoutes(context: any) {
      const routes: any[] = []
      const data = await generateMenu()
      const menus: string[] = (data as any).map((v: any) => v.name)
      menus.forEach((key: any) => {
        routes.push(...privateRoutes.filter((item: any) => item.name === key))
      })
      // 最后添加 不匹配路由进入 404
      routes.push({
        path: '/:catchAll(.*)',
        redirect: '/404'
      })
      context.commit('setRoutes', { routes, promisssionMenus: menus })
      return routes
     }
  }
}
