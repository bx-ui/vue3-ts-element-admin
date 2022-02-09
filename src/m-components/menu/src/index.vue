<template>
  <el-menu
    :default-active="defaultActive"
    v-bind="$attrs"
  >
    <template
      v-for="(item, index) in data"
      :key="index"
    >
      <el-menu-item
        :index="item.index"
        v-if="!item.children || !item.children.length"
      >
        <component
          v-if="item.icon"
          :is='`el-icon-${toLine(item.icon)}`'
        ></component>
        <template #title>{{ item.name }}</template>
      </el-menu-item>
      <el-sub-menu
        :index="item.index"
        v-else
      >
        <template #title>
          <component
            v-if="item.icon"
            :is='`el-icon-${toLine(item.icon)}`'
          ></component>
          <span>{{ item.name }}</span>
        </template>
        <el-menu-item
          v-for="(item1, index1) in item.children"
          :key="index1"
          :index="item1.index"
        >
          <component
            v-if="item1.icon"
            :is='`el-icon-${toLine(item1.icon)}`'
          ></component>
          <template #title>{{ item1.name }}</template>
        </el-menu-item>
      </el-sub-menu>
    </template>
  </el-menu>
</template>

<script setup lang="ts">
import { PropType, defineProps } from 'vue'
import { MenuItem } from './type'
import { toLine } from '@/utils/settingIcon'

defineProps({
  data: {
    type: Array as PropType<MenuItem[]>,
    required: true
  },
  defaultActive: {
    type: String,
    default: ''
  }
})
</script>

<style scoped>
svg {
  width: 1.2em;
  height: 1.2em;
  margin-right: 4px;
}
</style>
