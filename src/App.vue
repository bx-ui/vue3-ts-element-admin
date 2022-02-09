<template>
  <el-config-provider :locale="locale">
    <router-view />
  </el-config-provider>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import zhCn from 'element-plus/es/locale/lang/zh-cn'
import en from 'element-plus/lib/locale/lang/en'
import { useStore } from 'vuex'
import { writeNewStyle, generateNewStyle } from './utils/theme'

const store = useStore()
// element-plus国际化相关处理
const locale = computed(() => {
  return store.getters.language === 'en' ? en : zhCn
})
// element-plus 动态换肤持久化实现
generateNewStyle(store.getters.mainColor).then((newStyleText: any) => {
  writeNewStyle(newStyleText)
})
</script>

<style scoped>
</style>
