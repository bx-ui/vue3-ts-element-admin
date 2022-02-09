import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import layout from '@/layout/index.vue'
import ArticleCreaterRouter from './modules/ArticleCreate'
import ArticleRouter from './modules/Article'
import PermissionListRouter from './modules/PermissionList'
import RoleListRouter from './modules/RoleList'
import UserManageRouter from './modules/UserManage'
import store from '@/store'

export type MetaType = {
  title?: string
  icon?: string
}

/**
 * 私有路由表
 */
export const privateRoutes: Array<RouteRecordRaw> = [
  ArticleCreaterRouter,
  ArticleRouter,
  PermissionListRouter,
  RoleListRouter,
  UserManageRouter
]

/**
 * 公有路由表
 */
export const publicRoutes: Array<RouteRecordRaw> = [
  {
    path: '/',
    component: layout,
    redirect: '/profile',
    children: [
      // 个人中心
      {
        path: '/profile',
        name: 'profile',
        component: () => import('@/views/profile/index.vue'),
        meta: {
          title: 'profile',
          icon: 'user'
        }
      },
      // 404
      {
        path: '/404',
        name: '404',
        component: () => import('@/views/error-page/404.vue')
      },
      // 401
      {
        path: '/401',
        name: '401',
        component: () => import('@/views/error-page/401.vue')
      }
    ]
  },
  /**
   * 在这里去写m-component二次封装的element-plus组件的路由
   * 项目中不需要这玩意，删除就好，就不做抽离了
   */
  {
    path: '/m-components',
    name: 'm-components',
    redirect: '/m-components/choose-city',
    component: layout,
    meta: {
      title: 'mComponent',
      icon: 'user'
    },
    children: [
      {
        path: '/m-components/choose-icon',
        name: 'choose-icon',
        meta: {
          title: 'chooseIcon',
          icon: 'user'
        },
        component: () => import('@/views/choose-icon/index.vue')
      },
      {
        path: '/m-components/choose-area',
        name: 'choose-area',
        meta: {
          title: 'chooseArea',
          icon: 'user'
        },
        component: () => import('@/views/choose-area/index.vue')
      },
      {
        path: '/m-components/trend',
        name: 'trend',
        meta: {
          title: 'trend',
          icon: 'user'
        },
        component: () => import('@/views/trend/index.vue')
      },
      {
        path: '/m-components/notification',
        name: 'notification',
        meta: {
          title: 'notification',
          icon: 'user'
        },
        component: () => import('@/views/notification/index.vue')
      },
      {
        path: '/m-components/menu',
        name: 'menu',
        meta: {
          title: 'menu',
          icon: 'user'
        },
        component: () => import('@/views/menu/index.vue')
      },
      {
        path: '/m-components/progress',
        name: 'progress',
        meta: {
          title: 'progress',
          icon: 'user'
        },
        component: () => import('@/views/progress/index.vue')
      }
    ]
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/Login/index.vue')
  }
]

/**
 * 初始化路由表
 */
export function resetRouter() {
  if (store.getters.menus) {
    const menus: string[] = store.getters.menus
    menus.forEach((menu: string) => {
      router.removeRoute(menu)
    })
  }
}

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes: publicRoutes
})

export default router
