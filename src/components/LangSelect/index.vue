<template>
  <el-dropdown
    trigger="click"
    class="international"
    @command="handleSetLanguage"
  >
    <div>
      <svg-icon icon="language" />
    </div>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item
          command="zh"
          :disabled="language === 'zh'"
        >中文</el-dropdown-item>
        <el-dropdown-item
          command="en"
          :disabled="language === 'en'"
        >English</el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>

<script setup lang="ts">
import { defineProps, PropType, computed } from 'vue'
import { useStore } from 'vuex'
import { useI18n } from 'vue-i18n'
import { ElMessage } from 'element-plus'

const store = useStore()
const i18n = useI18n()

const language = computed(() => store.getters.language)

defineProps({
  effect: {
    type: String as PropType<'dark' | 'light'>,
    default: 'dark',
    validator: function (val: string): boolean {
      return ['dark', 'light'].indexOf(val) !== -1
    }
  }
})

const handleSetLanguage = (lang: 'en' | 'zh') => {
  i18n.locale.value = lang
  store.commit('app/setLanguage', lang)
  ElMessage.success(i18n.t('msg.toast.switchLangSuccess'))
}
</script>

<style lang="scss" scoped>
</style>
