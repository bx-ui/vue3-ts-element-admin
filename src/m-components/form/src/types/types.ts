import { CSSProperties } from 'vue'
import { RuleItem } from './rule'
// 可配置表单

import { ValidateFieldsError } from 'async-validator'
interface Callback {
  (isValid?: boolean, invalidFields?: ValidateFieldsError): void
}

export interface FileList {
  name: string
  url: string
  [props: string]: any
}

// 表单每一项的配置选择
export interface FormOptions {
  type:
    | 'cascader'
    | 'checkbox'
    | 'checkbox-group'
    | 'checkbox-button'
    | 'color-picker'
    | 'date-picker'
    | 'input'
    | 'input-number'
    | 'radio'
    | 'radio-group'
    | 'radio-button'
    | 'rate'
    | 'select'
    | 'option'
    | 'slider'
    | 'switch'
    | 'time-picker'
    | 'time-select'
    | 'transfer'
    | 'upload'
    | 'editor'
  value?: any
  label?: string
  prop?: string
  rules?: RuleItem[]
  defaultSlot?: string
  attrs?: {
    type?: stirng
    maxLength?: string | number
    minLength?: string | number
    showWordLimit?: boolean
    clearable?: boolean
    showPassword?: boolean
    disabled?: boolean
    size?: boolean
    prefixIcon?: any
    suffixIcon?: any
    rows?: number
    autosize?: any
    autocomplete?: string
    name?: string
    readonly?: boolean
    max?: any
    min?: any
    step?: any
    resize?: string
    autofocus?: boolean
    form?: string
    label?: string
    tabindex?: string | number
    validateEvent?: boolean
    inputStyle?: any
    style?: CSSProperties
  }
  placeholder?: string
  // 插槽部分，后期要做
  slots?: any
  span?: number
  formItemAttrs?: {
    labelWidth?: string | number
    required?: boolean
    error?: string
    showMessage?: boolean
    inlineMessage?: boolean
    size: 'large' | 'default' | 'small'
  }
  uploadAttrs?: {
    action: string
    headers?: any
    method?: 'post' | 'put' | 'patch'
    multiple?: boolean
    data?: any
    name?: string
    withCredentials?: boolean
    showFileList: boolean
    drag?: boolean
    accept?: string
    fileList?: FileList[]
    listType?: 'text' | 'picture' | 'picture-card'
    autoUpload?: boolean
    disabled?: boolean
    limit?: number
  }
  children?: FormOptions[]
}

export interface ValidateFieldCallback {
  (message?: string, invalidFields?: ValidateFieldsError): void
}

export interface FormInstance {
  registerLabelWidth(width: number, oldWidth: number): void
  deregisterLabelWidth(width: number): void
  autoLabelWidth: string | undefined
  emit: (evt: string, ...args: any[]) => void
  labelSuffix: string
  inline?: boolean
  model?: Record<string, unknown>
  size?: string
  showMessage?: boolean
  labelPosition?: string
  labelWidth?: string
  rules?: Record<string, unknown>
  statusIcon?: boolean
  hideRequiredAsterisk?: boolean
  disabled?: boolean
  validate: (callback?: Callback) => Promise<boolean>
  resetFields: () => void
  clearValidate: (props?: string | string[]) => void
  validateField: (props: string | string[], cb: ValidateFieldCallback) => void
}
