<template>
  <el-button
    type="primary"
    @click="openChooseIconDialog"
  >{{ $t('msg.chooseIcon.buttonText') }}</el-button>

  <div class="my-component-dialog-container">
    <el-dialog
      :model-value="modelValue"
      :title="title"
      @close="close"
      v-bind="elementDialogAttrs"
    >
      <div class="center">
        <div
          v-for="(item, index) in Object.keys(ElIcons)"
          :key="index"
          class="choose-icon-item"
          @click="clickItem(item)"
        >
          <component :is='`el-icon-${toLine(item)}`'></component>
          <div class="text">{{ item }}</div>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { defineProps, PropType, defineEmits } from 'vue'
import * as ElIcons from '@element-plus/icons-vue'
import { toLine } from '@/utils/settingIcon'
import { ElementDialogAttrs, ElementButtonAttrs } from './type'
import { useCopy } from './hooks'

const emits = defineEmits(['update:modelValue'])

defineProps({
  title: {
    type: String as PropType<string>,
    default: ''
  },
  modelValue: {
    type: Boolean as PropType<boolean>,
    required: true
  },
  /**
   * dialog属性
   */
  elementDialogAttrs: {
    type: Object as PropType<ElementDialogAttrs>
  },
  /**
   * button属性
   */
  elementButtonAttrs: {
    type: Object as PropType<ElementButtonAttrs>
  }
})

const openChooseIconDialog = () => {
  emits('update:modelValue', true)
}

const close = () => {
  emits('update:modelValue', false)
}

/**
 * 点击图标每一项
 */
const clickItem = (text: string) => {
  const copyText = `el-icon-${toLine(text)}`
  useCopy(`<${copyText} />`)
}
</script>

<style lang="scss" scoped>
.center {
  display: flex;
  flex-wrap: wrap;
  .choose-icon-item {
    width: 25%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    font-size: 14px;
    margin-bottom: 20px;
    height: 70px;
    cursor: pointer;
    svg {
      width: 2.4em;
      height: 2.4em;
    }
    .text {
      margin-top: 8px;
    }
  }
}
</style>
