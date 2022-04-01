<template>
  <el-table
    :data="tableData"
    v-bind="$attrs"
    v-loading="tableLoading"
    @row-click="rowClick"
  >
    <template
      v-for="item in tableOptions"
      :key="item?.prop"
    >
      <el-table-column
        :label="item.label"
        :align="item.align"
        :width="item.width"
        :prop="item.prop"
      >
        <template #default="scope">
          <div v-if="!scope.row.rowEdit">
            <!-- 不可修改单元格 -->
            <template v-if="!item.editable">
              <slot
                :name="item.slot"
                :scope="scope"
                v-if="item.slot"
              ></slot>
              <span v-else>{{ scope.row[item.prop] }}</span>
            </template>
            <!-- 可修改单元格 -->
            <template v-else>
              <div
                style="display: flex"
                v-if="scope.$index + scope.column.id === currentEdit"
                @click.stop="closeEditCell"
              >
                <el-input
                  size="small"
                  v-model="scope.row[item.prop]"
                ></el-input>
                <div class="icon-slot">
                  <slot
                    name="editCell"
                    v-if="$slots.editCell"
                  ></slot>
                  <template v-else>
                    <el-icon-check
                      class="check"
                      @click="clickCheck(scope)"
                    />
                    <el-icon-close
                      class="close"
                      @click="clickClose(scope)"
                    />
                  </template>
                </div>
              </div>
              <div v-else>
                <slot
                  :name="item.slot"
                  :scope="scope"
                  v-if="item.slot"
                ></slot>
                <span v-else>{{ scope.row[item.prop] }}</span>
                <component
                  :is='`el-icon-${toLine(editIcon)}`'
                  class="edit"
                  @click.stop="editClick(scope)"
                ></component>
              </div>
            </template>
          </div>
          <div v-else>
            <el-input v-model="scope.row[item.prop]"></el-input>
          </div>
        </template>
      </el-table-column>
    </template>
    <!-- 操作项 -->
    <el-table-column
      :label="actionOptions.label"
      :align="actionOptions.align"
      :width="actionOptions.width"
    >
      <template #default="scope">
        <slot
          v-if="!scope.row.rowEdit"
          name="action"
          :scope="scope"
        ></slot>
        <slot
          v-else
          name="editRow"
          :scope="scope"
        ></slot>
      </template>
    </el-table-column>
  </el-table>
</template>

<script setup lang="ts">
import { defineProps, PropType, computed, ref, defineEmits, watch } from 'vue'
import cloneDeep from 'lodash/cloneDeep'
import { TableOptions } from './type'
import { toLine } from '@/utils/settingIcon'

const props = defineProps({
  options: {
    type: Array as PropType<TableOptions[]>,
    required: true
  },
  list: {
    type: Array as PropType<any[]>,
    required: true
  },
  loading: {
    type: Boolean,
    default: true
  },
  editIcon: {
    type: String,
    default: 'Edit'
  },
  isEditRow: {
    type: Boolean,
    default: false
  },
  // 编辑行按钮标识
  editRowIndex: {
    type: String,
    default: ''
  },
  currentRowIndex: {
    type: String,
    default: ''
  }
})

const emits = defineEmits(['check', 'close', 'update:currentRowIndex'])

const tableData = ref<any[]>(cloneDeep(props.list))

watch(
  () => props.list,
  (val) => {
    console.log(val, 'valvaljkosdfksdfhj')
    tableData.value = cloneDeep(val)
    // 给data扩展属性
    tableData.value.forEach((item: any) => {
      item.rowEdit = false
    })
  },
  { deep: true, immediate: true }
)

const rowClick = (row: any, column: any) => {
  if (column.label === actionOptions.value?.label) {
    // 点击的是操作栏
    console.log(props.editRowIndex, 'props.editRowIndex')
    console.log(props.currentRowIndex, 'props.currentRowIndex')

    if (props.isEditRow && props.editRowIndex === props.currentRowIndex) {
      row.rowEdit = !row.rowEdit
      // 关闭其他
      tableData.value.forEach((item: any) => {
        if (item !== row) {
          item.rowEdit = false
        }
      })
      if (!row.rowEdit) {
        emits('update:currentRowIndex', '')
      }
    }
  }
}

const tableLoading = computed(() => {
  console.log(props.list)
  if (!props.loading) return false

  if (props.list && props.list.length) {
    return false
  } else {
    return true
  }
})

const tableOptions = computed(() =>
  props.options.filter((item: TableOptions) => !item?.action)
)

const actionOptions = computed(() => props.options.find((item) => item.action))

const currentEdit = ref<string>('')

// 点击可编辑单元格
const editClick = (scope: any) => {
  currentEdit.value = scope.$index + scope.column.id
  console.log(scope)
}
const closeEditCell = () => {
  currentEdit.value = ''
}
const clickCheck = (scope: any) => {
  emits('check', scope)
}
const clickClose = (scope: any) => {
  emits('close', scope)
}
</script>

<style lang="scss" scoped>
.edit {
  width: 1.2em;
  height: 1.2em;
  position: relative;
  left: 6px;
  top: 3px;
  cursor: pointer;
}
.icon-slot {
  display: flex;
}
.check {
  color: red;
}
.close {
  color: green;
}
.check,
.close {
  width: 1.6em;
  height: 1.6em;
  position: relative;
  top: 6px;
  left: 6px;
  cursor: pointer;
  margin-right: 5px;
}
</style>
