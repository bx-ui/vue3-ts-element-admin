<template>
  <el-sub-menu
    v-if="route.children.length"
    :index="route.path"
  >
    <template #title>
      <menu-item
        :title="route.meta.title"
        :icon="route.meta.icon"
      />
    </template>
    <sidebar-item
      v-for="item in route.children"
      :key="item.path"
      :route="item"
    ></sidebar-item>
  </el-sub-menu>
  <el-menu-item
    v-else
    :index="route.path"
  >
    <menu-item
      :title="route.meta.title"
      :icon="route.meta.icon"
    />
  </el-menu-item>
</template>

<script setup lang="ts">
import { defineProps, PropType } from 'vue'
import { RouteRecordRaw } from 'vue-router'
import MenuItem from './MenuItem.vue'

defineProps({
  route: {
    type: Object as PropType<RouteRecordRaw>,
    required: true
  }
})
</script>

<style scoped>
</style>
