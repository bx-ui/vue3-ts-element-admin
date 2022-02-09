import layout from '@/layout/index.vue'
import { RouteRecordRaw } from 'vue-router'

export default {
  path: '/user',
  component: layout,
  redirect: '/user/manage',
  name: 'roleList',
  meta: {
    title: 'user',
    icon: 'personnel'
  },
  children: [
    {
      path: '/user/role',
      component: () => import('@/views/role-list/index.vue'),
      meta: {
        title: 'roleList',
        icon: 'role'
      }
    }
  ]
} as RouteRecordRaw
