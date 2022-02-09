<template>
  <div class="trend">
    <div class="text">
      <span
        v-if="!slots.default"
        :style="{color: textColor}"
      >{{ text }}</span>
      <slot v-else></slot>
    </div>

    <div class="icon">
      <!-- <el-icon-arrowup
        v-if="type === 'up'"
        :style="{color: !reverseColor ? upIconColor : '#52c41a'}"
      />
      <el-icon-arrowdown
        :style="{color: !reverseColor ? downIconColor : '#f5222d'}"
        v-else
      /> -->
      <component
        :is='`el-icon-${toLine(upIcon)}`'
        v-if="type === 'up'"
        :style="{color: !reverseColor ? upIconColor : '#52c41a'}"
      ></component>
      <component
        :is='`el-icon-${toLine(downIcon)}`'
        :style="{color: !reverseColor ? downIconColor : '#f5222d'}"
        v-else
      ></component>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps, PropType, useSlots, computed } from 'vue'
import { toLine } from '@/utils/settingIcon'

const slots = useSlots()

const props = defineProps({
  // 趋势（up/down）
  type: {
    type: String as PropType<'up' | 'down'>,
    default: 'up'
  },
  text: {
    type: String,
    default: '文字'
  },
  // 上升图标颜色
  upIconColor: {
    type: String,
    default: '#f5222d'
  },
  // 下降趋势颜色
  downIconColor: {
    type: String,
    default: '#52c41a'
  },
  // 颜色反转(只有在默认颜色下生效)
  reverseColor: {
    type: Boolean,
    default: false
  },
  // 上升文字颜色
  upTextColor: {
    type: String,
    default: 'rgba(0,0,0,0.5)'
  },
  // 下降文字颜色
  downTextColor: {
    type: String,
    default: 'rgba(0,0,0,0.5)'
  },
  // 自定义上升图标
  upIcon: {
    type: String,
    default: 'arrowUp'
  },
  // 自定义下降图标
  downIcon: {
    type: String,
    default: 'arrowDown'
  }
})

const textColor = computed(() => {
  return props.type === 'up' ? props.upTextColor : props.downTextColor
})
</script>

<style lang="scss" scoped>
.trend {
  display: flex;
  align-items: center;
  font-size: 16px;
  .text {
    margin-right: 6px;
  }
  .icon {
    svg {
      width: 1em;
      height: 1em;
    }
  }
}
</style>
