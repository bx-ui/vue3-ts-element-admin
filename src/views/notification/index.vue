<template>
  <div>
    <m-notification>
      <m-list
        :list="list"
        :actions="actions"
        @footButtonClick="footButtonClick"
      ></m-list>
    </m-notification>
    <h1>此模块仅做展示，不在支持国际化</h1>
  </div>
</template>

<script setup lang="ts">
import { list, actions } from './data'
import { ActionOptions } from '@/m-components/list/src/type'

const footButtonClick = (item: ActionOptions) => {
  console.log(item)
}
</script>

<style scoped>
</style>
