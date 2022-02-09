<template>
  <el-dialog
    title="提示"
    :model-value="modelValue"
    @close="close"
  >
    <div class="center">
      <p class="title">{{ $t('msg.theme.themeColorChange') }}</p>
      <el-color-picker
        v-model="mColor"
        :predefine="predefineColors"
      ></el-color-picker>
    </div>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="close">关闭</el-button>
        <el-button
          type="primary"
          @click="confirm"
        >确定</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import { defineProps, PropType, defineEmits, ref } from 'vue'
import { useStore } from 'vuex'
import { generateNewStyle, writeNewStyle } from '@/utils/theme'

const store = useStore()

defineProps({
  modelValue: {
    type: Boolean as PropType<boolean>,
    required: true
  }
})

const emits = defineEmits(['update:modelValue'])

// 默认色值
const mColor = ref<string>('#00ff00')

// 预定义色值
const predefineColors: string[] = [
  '#ff4500',
  '#ff8c00',
  '#ffd700',
  '#90ee90',
  '#00ced1',
  '#1e90ff',
  '#c71585',
  'rgba(255, 69, 0, 0.68)',
  'rgb(255, 120, 0)',
  'hsv(51, 100, 98)',
  'hsva(120, 40, 94, 0.5)',
  'hsl(181, 100%, 37%)',
  'hsla(209, 100%, 56%, 0.73)',
  '#c7158577'
]

const close = () => {
  emits('update:modelValue', false)
}

const confirm = async () => {
  // 获取替换完成后的element-plus样式
  const newStyleText = await generateNewStyle(mColor.value)
  console.log(newStyleText)

  // 写入style标签中
  writeNewStyle(newStyleText)
  store.commit('theme/setMainColor', mColor.value)
  close()
}
</script>

<style lang="scss" scoped>
.center {
  text-align: center;
  .title {
    margin-bottom: 12px;
  }
}
</style>
