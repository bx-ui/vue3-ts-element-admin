<template>
  <div>
    <el-dialog
      :model-value="visible"
      v-bind="modalAttrs"
      :before-close="beforeClose"
    >
      <template #default>
        <m-form
          :options="options"
          label-width="80px"
          ref="form"
        >
          <template #uploadArea>
            <slot name="uploadArea"></slot>
          </template>
          <template #uploadTip>
            <slot name="uploadTip"></slot>
          </template>
        </m-form>
      </template>
      <template #footer>
        <slot
          name="footer"
          :form="form"
        ></slot>
      </template>

    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { defineProps, defineEmits, PropType, ref } from 'vue'
import { FormOptions } from '@/m-components/form/src/types/types'

const emits = defineEmits(['update:visible'])

const form = ref<any>()

const props = defineProps({
  visible: {
    type: Boolean,
    default: false
  },
  modalAttrs: {
    type: Object
  },
  options: {
    type: Array as PropType<FormOptions[]>,
    required: true
  },
  httpRequest: {
    type: Function
  }
})

const beforeClose = () => {
  emits('update:visible', false)
  form.value.resetForm()
}
</script>

<style scoped>
</style>
