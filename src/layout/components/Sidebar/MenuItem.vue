<template>
  <component
    v-if="icon.includes('el-icon')"
    class="sub-el-icon"
    :is='icon'
  ></component>
  <svg-icon
    v-else
    :icon="icon"
  ></svg-icon>
  <span>{{ generateTitle(title) }}</span>
</template>

<script setup lang="ts">
import { defineProps, PropType } from 'vue'
import { generateTitle } from '@/utils/i18n'
defineProps({
  title: {
    type: String as PropType<string>,
    required: true
  },
  icon: {
    type: String as PropType<string>,
    required: true
  }
})
</script>

<style scoped>
</style>
