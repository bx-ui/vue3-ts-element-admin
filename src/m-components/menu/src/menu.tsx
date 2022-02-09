import { defineComponent, PropType } from 'vue'
import { MenuItem } from './type'
import { toLine } from '@/utils/settingIcon'

export default defineComponent({
  props: {
    data: {
      type: Array as PropType<MenuItem[]>,
      required: true
    },
    defaultActive: {
      type: String,
      default: ''
    },
    router: {
      type: Boolean,
      default: false
    }
  },
  setup(props) {
    /**
     * 递归渲染方法
     */
    const renderMenu = (data: MenuItem[]) => {
      return data.map((item: MenuItem) => {
        item.i = `el-icon-${toLine(item.icon!)}`
        // 处理插槽
        const slots = {
          title: () => {
            return (
              <>
                <item.i />
                <span>{item.name}</span>
              </>
            )
          }
        }

        if (item.children && item.children.length) {
          // 有孩子节点
          return (
            <el-sub-menu index={item.index} v-slots={slots}>
              {renderMenu(item.children)}
            </el-sub-menu>
          )
        }
        // 没有孩子节点
        return (
          <el-menu-item index={item.index}>
            <item.i />
            <span>{item.name}</span>
          </el-menu-item>
        )
      })
    }

    return () => {
      return (
        <el-menu default-active={props.defaultActive} router={props.router}>
          {renderMenu(props.data)}
        </el-menu>
      )
    }
  }
})
