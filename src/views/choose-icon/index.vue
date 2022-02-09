<template>
  <div>
    <m-choose-icon
      v-model:modelValue="modelValue"
      :title="$t('msg.chooseIcon.buttonText')"
    ></m-choose-icon>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const modelValue = ref<boolean>(false)
</script>

<style scoped>
</style>
