<template>
  <div class="screenfull">
    <svg-icon
      id="guide-full"
      @click="onToggle"
      :icon="isFullscreen ? 'exit-fullscreen' : 'fullscreen'"
    ></svg-icon>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import screenfull from 'screenfull'

const isFullscreen = ref<boolean>(false)
const onToggle = () => {
  console.log(screenfull)
  ;(screenfull as any).toggle()
}

const change = () => {
  isFullscreen.value = (screenfull as any).isFullscreen
}

onMounted(() => {
  console.log(11)
  ;(screenfull as any).on('change', change)
})

onUnmounted(() => {
  console.log(11)
  ;(screenfull as any).off('change', change)
})
</script>

<style scoped>
.screenfull {
  font-size: 22px !important;
}
</style>
