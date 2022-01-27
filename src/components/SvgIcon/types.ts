import { PropType } from 'vue'

export const svgIconProps = {
  // icon图标
  icon: {
    type: String as PropType<string>,
    required: true
  },
  // 图标类名
  className: {
    type: String as PropType<string>,
    default: ''
  }
} as const
