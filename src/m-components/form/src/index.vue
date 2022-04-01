<template>
  <el-form
    :validate-on-rule-change="false"
    :model="model"
    :rules="rules"
    v-bind="$attrs"
    v-if="model"
    ref="form"
  >
    <el-row>
      <el-col
        :span="item.span || 24"
        v-for="(item, index) in options"
        :key="index"
      >
        <!-- 没有孩子节点 -->
        <el-form-item
          :label="item?.label"
          :prop="item?.prop"
          v-bind="item?.formItemAttrs"
          v-if="!item?.children || !item?.children?.length"
        >
          <component
            v-if="item.type !== 'upload' && item.type !== 'editor'"
            v-bind="item?.attrs"
            :is='`el-${item?.type}`'
            :placeholder="item?.placeholder"
            v-model="model[item?.prop]"
          ></component>
          <el-upload
            v-bind="item.uploadAttrs"
            v-if="item.type === 'upload'"
            :on-preview="onPreview"
            :on-remove="onRemove"
            :on-success="onSuccess"
            :on-error="onError"
            :on-progress="onProgress"
            :on-change="onChange"
            :before-upload="beforeUpload"
            :before-remove="beforeRemove"
            :on-exceed="onExceed"
            :httpRequest="httpRequest"
            ref="uploadRef"
          >
            <template #default>
              <slot name="uploadArea" />
            </template>
            <template #tip>
              <slot name="uploadTip" />
            </template>
          </el-upload>
          <div
            id="editor"
            v-if="item.type === 'editor'"
          ></div>
        </el-form-item>
        <!-- 有孩子节点 -->
        <el-form-item
          :label="item?.label"
          :prop="item?.prop"
          v-bind="item?.formItemAttrs"
          v-if="item?.children && item?.children?.length"
        >
          <component
            v-bind="item?.attrs"
            :is='`el-${item?.type}`'
            :placeholder="item?.placeholder"
            v-model="model[item?.prop]"
          >
            <component
              v-for="(child, index1) in item?.children"
              :key="index1"
              :is='`el-${child?.type}`'
              :label="child?.label"
              :value="child?.value"
            >{{ child.defaultSlot ? child.defaultSlot : child?.label}}</component>
          </component>
        </el-form-item>
      </el-col>
      <el-col :span="24">
        <el-form-item>
          <slot
            name="action"
            :form="form"
            :model="model"
          />
        </el-form-item>
      </el-col>
    </el-row>
  </el-form>
</template>

<script setup lang="ts">
import E from 'wangeditor'
import {
  defineProps,
  PropType,
  ref,
  onMounted,
  watch,
  defineEmits,
  defineExpose,
  nextTick
} from 'vue'
import cloneDeep from 'lodash/cloneDeep'
import type { UploadFile } from 'element-plus/es/components/upload/src/upload.type'
import i18next from 'i18next'
import { useStore } from 'vuex'
import { FormInstance, FormOptions } from './types/types'
import { watchSwitchLang } from '@/utils/i18n'

const store = useStore()

const props = defineProps({
  options: {
    type: Array as PropType<FormOptions[]>,
    required: true
  },
  httpRequest: {
    type: Function
  }
})

const emits = defineEmits([
  'on-preview',
  'on-remove',
  'on-success',
  'on-error',
  'on-progress',
  'on-change',
  'before-upload',
  'before-remove',
  'on-exceed'
])

const model = ref<any>(null)
const rules = ref<any>(null)

const uploadRef = ref<any>()

// form表单实例
const form = ref<FormInstance | undefined>()

watchSwitchLang(() => {
  const regexData = props.options.find(
    (item: FormOptions) => item.type === 'editor'
  )

  if (regexData) {
    // 1. 删除
    editor.value.destroy()
    // 2. 创建
    createEditor(regexData)
  }
})

// editor实例
const editor = ref<any>()

const createEditor = (item: FormOptions) => {
  nextTick(() => {
    if (document.getElementById('editor')) {
      editor.value = new E('#editor')
      editor.value.config.placeholder = item.placeholder || ''
      editor.value.config.zIndex = 2
      // 引入 i18next 插件
      editor.value.config.lang =
        store.getters.language === 'en' ? 'en' : 'zh-CN'
      editor.value.i18next = i18next

      editor.value.create()
      editor.value.txt.html(item.value)
      editor.value.config.onchange = function (newHtml: any) {
        model.value[item.prop as string] = newHtml
      }
    }
  })
}

const initForm = () => {
  if (props.options && props.options.length) {
    const m: any = {}
    const r: any = {}
    props.options.forEach((item) => {
      m[item.prop as string] = item.value
      r[item.prop as string] = item.rules

      if (item.type === 'editor') {
        createEditor(item)
      }
    })
    model.value = cloneDeep(m)
    rules.value = cloneDeep(r)
  }
}

watch(
  () => props.options,
  () => {
    initForm()
  },
  {
    deep: true
  }
)

// 让用户复赋值的操作
const setFieldsValue = (_model: any) => {
  model.value = { ...model.value, ..._model }

  // 富文本
  const regexData = props.options.find(
    (item: FormOptions) => item.type === 'editor'
  )
  console.log(regexData)

  if (regexData && _model[regexData.prop!]) {
    editor.value.txt.html(_model[regexData.prop!])
  }
}

// 让用户获取值
const getFieldsValue = () => {
  return { ...model.value }
}

const getFieldValue = (key: string) => {
  return model.value[key]
}

// 重置表单
const resetForm = () => {
  // 1. 重置element-plus表单
  form.value!.resetFields()
  // 重置富文本编辑器
  if (document.getElementById('editor')) {
    editor.value.txt.clear()
  }
  // 重置上传组件
  // upload.value!.clearFiles()
  console.log(uploadRef.value)
}

// 表单验证
const validate = () => {
  return form.value?.validate()
}

defineExpose({
  setFieldsValue,
  getFieldsValue,
  getFieldValue,
  resetForm,
  validate
})

onMounted(() => {
  initForm()
})

const onPreview = (file: UploadFile) => {
  console.log('on-preview')
  emits('on-preview', file)
}
const onRemove = (file: UploadFile, fileList: UploadFile[]) => {
  console.log('on-remove')
  emits('on-remove', { file, fileList })
}
const onSuccess = (response: any, file: UploadFile, fileList: UploadFile[]) => {
  console.log('on-success')
  emits('on-success', { response, file, fileList })
}
const onError = (err: any, file: UploadFile, fileList: UploadFile[]) => {
  console.log('on-error')
  emits('on-error', { err, file, fileList })
}
const onProgress = (event: any, file: UploadFile, fileList: UploadFile[]) => {
  console.log('on-progress')
  emits('on-progress', { event, file, fileList })
}
const onChange = (file: UploadFile, fileList: UploadFile[]) => {
  console.log('on-change')
  emits('on-change', { file, fileList })
}
const beforeUpload = (file: UploadFile) => {
  console.log('before-upload')
  emits('before-upload', file)
}
const beforeRemove = (file: UploadFile, fileList: UploadFile[]) => {
  console.log('before-remove')
  emits('before-remove', { file, fileList })
}
const onExceed = (file: UploadFile, fileList: UploadFile[]) => {
  console.log('on-exceed')
  emits('on-exceed', { file, fileList })
}
</script>

<style scoped>
</style>
