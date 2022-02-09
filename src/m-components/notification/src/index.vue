<template>
  <el-popover
    placement="bottom"
    :width="300"
    trigger="click"
    popper-class="my-component-popover"
  >
    <template #default>
      <slot></slot>
    </template>
    <template #reference>
      <el-badge
        :value="12"
        class="notification"
      >
        <component :is='`el-icon-${toLine(icon)}`'></component>
      </el-badge>
    </template>
  </el-popover>
</template>

<script setup lang="ts">
import { defineProps, PropType } from 'vue'
import { toLine } from '@/utils/settingIcon'

defineProps({
  icon: {
    type: String,
    default: 'Bell'
  },
  value: {
    type: [String, Number],
    default: 0
  },
  max: {
    type: Number,
    default: 20
  },
  isDot: {
    type: Boolean,
    default: false
  },
  type: {
    type: String as PropType<'' | 'success' | 'danger' | 'info' | 'warning'>,
    default: ''
  }
})
</script>

<style lang="scss" scoped>
.notification {
  cursor: pointer;
  svg {
    width: 1.5em;
    height: 1.5em;
  }
}
</style>
