<template>
  <el-progress
    :percentage="p"
    v-bind="$attrs"
  />
</template>

<script setup lang="ts">
import { defineProps, onMounted, ref } from 'vue'

const props = defineProps({
  percentage: {
    type: Number,
    default: 0
  },
  isAnimation: {
    type: Boolean,
    default: false
  },
  time: {
    type: Number,
    default: 1
  }
})

const p = ref<number>(0)

onMounted(() => {
  if (props.isAnimation) {
    const t = Math.ceil(props.time / props.percentage)
    console.log(t)

    const timer = setInterval(() => {
      p.value += 1
      if (p.value >= props.percentage) {
        p.value = props.percentage
        clearInterval(timer)
      }
    }, t * 100)
  }
})
</script>

<style scoped>
</style>
