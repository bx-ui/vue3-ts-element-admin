import { RouteRecordRaw } from 'vue-router'
import path from 'path'

/**
 * 获取所有的子路由
 */
const getChildrenRoutes = (routes: RouteRecordRaw[]) => {
  const result: RouteRecordRaw[] = []
  routes.forEach((route: RouteRecordRaw) => {
    if (route.children && route.children.length) {
      result.push(...route.children)
    }
  })
  return result
}

/**
 * 处理脱离层级的路由：某个一级路由为其他子路由，则剔除该一级路由，保留路由层级
 * @param {*} routes router.getRoutes()
 */
export const filterRouters = (routes: RouteRecordRaw[]) => {
  // 获取所有子集路由
  const childrenRoutes = getChildrenRoutes(routes)
  // 根据子集路由进行查重操作
  return routes.filter((route: RouteRecordRaw) => {
    return !childrenRoutes.find((childrenRoute: RouteRecordRaw) => {
      return childrenRoute.path === route.path
    })
  })
}

const isNull = (data: any) => {
  if (!data) return true
  if (JSON.stringify(data) === '{}') return true
  if (JSON.stringify(data) === '[]') return true
}

/**
 * 根据 routes(已经过滤好的数组) 数据，返回对应 menu 规则数组
 * @param {*} routes 是已经过滤好的路由
 */
export const generateMenus = (routes: RouteRecordRaw[], basePath = '/') => {
  const result: RouteRecordRaw[] = []
  // 遍历路由表
  routes.forEach((item: RouteRecordRaw) => {
    // 不存在meta && 不存在children
    if (isNull(item.meta) && isNull(item.children)) return
    // 不存在meta && 存在children
    if (isNull(item.meta) && !isNull(item.children)) {
      result.push(...generateMenus(item.children!))
    }
    // 存在meta存在children || 存在meta不存在children
    // 因为最终的menu需要进行跳转，此时我们需要合并path
    // 合并 path 作为跳转路径
    const routePath = path.resolve(basePath, item.path)
    // 路由分离之后，存在同名父路由的情况，需要单独处理
    let route = result.find((item: RouteRecordRaw) => item.path === routePath)
    if (!route) {
      route = {
        ...item,
        path: routePath,
        children: []
      }
      // icon 与 title 必须全部存在
      if (item.meta!.icon && item.meta!.title) {
        result.push(route)
      }
      // 存在 children 进入迭代到children
      if (item.children) {
        route.children!.push(...generateMenus(item.children, route.path))
      }
    }
  })

  return result
}
