<template>
  <el-dropdown
    v-bind="$attrs"
    trigger="click"
    class="theme"
    @command="handleSetTheme"
  >
    <div>
      <svg-icon
        id="guide-theme"
        icon="change-theme"
      ></svg-icon>
    </div>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item command="color">{{ $t('msg.theme.themeColorChange') }}</el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
  <select-color v-model="modelValue"></select-color>
</template>

<script lang="ts">
import { ref } from 'vue'
import SelectColor from './components/SelectColor.vue'
export default {
  inheritAttrs: false
}
</script>

<script setup lang="ts">
const modelValue = ref<boolean>(false)

const handleSetTheme = () => {
  modelValue.value = true
}
</script>
<style scoped>
</style>
