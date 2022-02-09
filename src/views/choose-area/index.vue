<template>
  <div>
    <m-choose-area @sendResultData="sendResultData"></m-choose-area>
  </div>
</template>

<script setup lang="ts">
import { SendResultItem } from '@/m-components/choose-area/src/type'
const sendResultData = (data: SendResultItem[]) => {
  console.log(data)
}
</script>

<style scoped>
</style>
