<template>
  <!-- 外部图标 -->
  <div
    v-if="isExternal"
    :style="styleExternalIcon"
    class="svg-icon svg-external-icon"
    :class="className"
    v-bind="$attrs"
  ></div>
  <!-- 内部图标 -->
  <svg
    @click="onClick"
    v-else
    class="svg-icon"
    :class="className"
    aria-hidden="true"
    v-bind="$attrs"
  >
    <use :xlink:href="iconName" />
  </svg>
</template>

<script setup lang="ts">
import { defineProps, computed, defineEmits } from 'vue'
import { svgIconProps } from './types'
import { isExternal as external } from '@/utils/validate'

const props = defineProps(svgIconProps)

const emits = defineEmits(['click'])

/**
 * 判断是否为外部图标
 */
const isExternal = computed(() => {
  return external(props.icon)
})

/**
 * 外部图标样式
 */
const styleExternalIcon = computed(() => ({
  mask: `url(${props.icon}) no-repeat 50% 50%`,
  '-webkit-mask': `url(${props.icon}) no-repeat 50% 50%`
}))
/**
 * 项目内图标
 */
const iconName = computed(() => `#icon-${props.icon}`)

/**
 * onClick
 */
const onClick = () => {
  emits('click')
}
</script>

<style scoped>
.svg-icon {
  width: 1em;
  height: 1em;
  /* vertical-align: -0.15em; */
  fill: currentColor;
  overflow: hidden;
}

.svg-external-icon {
  background-color: currentColor;
  mask-size: cover !important;
  display: inline-block;
}
</style>
