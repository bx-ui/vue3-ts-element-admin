<template>
  <el-menu
    :collapse="!$store.getters.sidebarOpened"
    :unique-opened="true"
    :default-active="activeMenu"
    :background-color="$store.getters.cssVar.menuBg"
    :text-color="$store.getters.cssVar.menuText"
    :active-text-color="$store.getters.cssVar.menuActiveText"
    router
  >
    <sidebar-item
      v-for="item in routes"
      :key="item.path"
      :route="item"
    ></sidebar-item>
  </el-menu>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { filterRouters, generateMenus } from '@/utils/route'
import SidebarItem from './SidebarItem.vue'

const router = useRouter()
const route = useRoute()

const routes = computed(() => {
  const fRoute = filterRouters(router.getRoutes())
  console.log(fRoute)

  return generateMenus(fRoute)
})

const activeMenu = computed(() => {
  const { path } = route
  return path
})

console.log(routes.value)
</script>

<style scoped>
svg {
  width: 1em;
  height: 1em;
}
</style>
