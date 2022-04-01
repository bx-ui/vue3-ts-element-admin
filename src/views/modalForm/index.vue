<template>
  <div>
    <el-button
      type="primary"
      @click="open"
    >open</el-button>
    <m-modal-form
      v-model:visible="visible"
      :modalAttrs="{title: 'modal'}"
      :options="options"
    >
      <template #footer="scope">
        <el-button @click="close(scope)">取消</el-button>
        <el-button
          type="primary"
          @click="submit(scope)"
        >确定</el-button>
      </template>
      <template #uploadArea>
        <el-button type="primary">上传</el-button>
      </template>
      <template #uploadTip>
        <div style="color: #ccc">jpg/png files with a size less than 500kb</div>
      </template>
    </m-modal-form>
  </div>
</template>

<script setup lang="ts">
import { FormOptions } from '@/m-components/form/src/types/types'
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { watchSwitchLang } from '@/utils/i18n'

interface Scope {
  form: any
}

const i18n = useI18n()

const visible = ref<boolean>(false)

const options = ref<FormOptions[]>([])

const currOptions = () => {
  const blurPlaceHoilder = i18n.t('msg.placeHolder.blurPlaceHoilder')
  const changePlaceHolder = i18n.t('msg.placeHolder.changePlaceHolder')
  return [
    {
      type: 'input',
      value: '',
      label: i18n.t('msg.form.username'),
      prop: 'username',
      rules: [
        {
          required: true,
          message: `${blurPlaceHoilder} ${i18n.t('msg.form.username')}`,
          trigger: 'blur'
        }
      ],
      attrs: {
        clearable: true
      },
      placeholder: `${blurPlaceHoilder} ${i18n.t('msg.form.username')}`,
      span: 24
    },
    {
      type: 'input',
      value: '',
      label: i18n.t('msg.form.password'),
      prop: 'password',
      rules: [
        {
          required: true,
          message: `${blurPlaceHoilder} ${i18n.t('msg.form.password')}`,
          trigger: 'blur'
        },
        {
          min: 2,
          max: 6,
          message: '密码在2-6位之间'
        }
      ],
      attrs: {
        clearable: true,
        showPassword: true
      },
      placeholder: `${blurPlaceHoilder} ${i18n.t('msg.form.password')}`,
      span: 24
    },
    {
      type: 'select',
      value: '',
      label: i18n.t('msg.form.position'),
      prop: 'position',
      placeholder: `${changePlaceHolder} ${i18n.t('msg.form.position')}`,
      attrs: {
        style: {
          width: '100%'
        },
        clearable: true
      },
      rules: [
        {
          required: true,
          message: `${changePlaceHolder} ${i18n.t('msg.form.position')}`,
          trigger: 'change'
        }
      ],
      children: [
        {
          type: 'option',
          label: i18n.t('msg.form.member'),
          value: '1'
        },
        {
          type: 'option',
          label: i18n.t('msg.form.manager'),
          value: '2'
        },
        {
          type: 'option',
          label: i18n.t('msg.form.allManager'),
          value: '3'
        }
      ]
    },
    {
      type: 'radio-group',
      value: '',
      label: '性别',
      prop: 'sex',
      rules: [
        {
          required: true,
          message: `${changePlaceHolder} 性别`,
          trigger: 'change'
        }
      ],
      children: [
        {
          type: 'radio',
          value: '1',
          label: '1',
          defaultSlot: '男'
        },
        {
          type: 'radio',
          value: '2',
          label: '2',
          defaultSlot: '女'
        },
        {
          type: 'radio',
          value: '3',
          label: '3',
          defaultSlot: '未知'
        }
      ]
    },
    {
      type: 'checkbox-group',
      value: [],
      label: i18n.t('msg.form.hobby'),
      prop: 'habby',
      rules: [
        {
          required: true,
          message: `${changePlaceHolder} ${i18n.t('msg.form.hobby')}`,
          trigger: 'blur'
        }
      ],
      children: [
        {
          type: 'checkbox',
          value: '1',
          label: '1',
          defaultSlot: '篮球'
        },
        {
          type: 'checkbox',
          value: '2',
          label: '2',
          defaultSlot: '足球'
        },
        {
          type: 'checkbox',
          value: '3',
          label: '3',
          defaultSlot: '排球'
        }
      ]
    },
    {
      type: 'upload',
      label: '上传',
      prop: 'uploadFile',
      rules: [
        // {
        //   required: true,
        //   message: '请选择文件',
        //   trigger: 'change'
        // }
      ],
      uploadAttrs: {
        action: 'https://jsonplaceholder.typicode.com/posts/'
      }
    },
    {
      type: 'editor',
      label: '描述',
      value: '',
      prop: 'desc',
      placeholder: '请输入描述信息',
      rules: [
        {
          required: true,
          message: '请输入描述信息',
          trigger: 'blur'
        }
      ]
    }
  ]
}

options.value = currOptions() as FormOptions[]

const open = () => {
  console.log(1212)
  visible.value = true
}
const close = (scope: Scope) => {
  scope.form.resetForm()
  visible.value = false
}

const submit = (scope: Scope) => {
  scope.form.validate()
}

watchSwitchLang(() => {
  options.value = currOptions() as FormOptions[]
})
</script>

<style scoped>
</style>
