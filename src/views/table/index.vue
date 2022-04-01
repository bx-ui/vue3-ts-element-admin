<template>
  <div>
    <m-table
      :list="tableList"
      :options="options"
      border
      element-loading-text="加载中..."
      :element-loading-spinner="svg"
      element-loading-svg-view-box="-10, -10, 50, 50"
      @check="check"
      isEditRow
      editRowIndex="edit"
      v-model:currentRowIndex="currentRowIndex"
    >
      <template #date="{scope}">
        <el-icon-addlocation />
        <span>{{ scope.row.date }}</span>
      </template>
      <template #name="{scope}">
        <el-tag>{{ scope.row.name }}</el-tag>
      </template>
      <template #action="{scope}">
        <el-button
          size="small"
          type="primary"
          @click="edit(scope)"
        >修改</el-button>
        <el-button
          type="danger"
          size="small"
          @click="del(scope)"
        >删除</el-button>
      </template>
      <template #editRow>
        <el-button
          size="small"
          type="primary"
        >确定</el-button>
        <el-button
          type="danger"
          size="small"
        >取消</el-button>
      </template>
      <template #editCell>
        <el-button
          type="primary"
          size="mini"
        >确定</el-button>
        <el-button size="mini">取消</el-button>
      </template>
    </m-table>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { TableOptions } from '@/m-components/table/src/type'

const tableList = ref<any[]>([])

const currentRowIndex = ref<string>('')

const svg = `
        <path class="path" d="
          M 30 15
          L 28 17
          M 25.61 25.61
          A 15 15, 0, 0, 1, 15 30
          A 15 15, 0, 1, 1, 27.99 7.5
          L 15 15
        " style="stroke-width: 4px; fill: rgba(0, 0, 0, 0)"/>
      `

setTimeout(() => {
  tableList.value = [
    {
      date: '2016-05-03',
      name: 'Tom',
      address: 'No. 189, Grove St, Los Angeles'
    },
    {
      date: '2016-05-02',
      name: 'Tom',
      address: 'No. 189, Grove St, Los Angeles'
    },
    {
      date: '2016-05-04',
      name: 'Tom',
      address: 'No. 189, Grove St, Los Angeles'
    },
    {
      date: '2016-05-01',
      name: 'Tom',
      address: 'No. 189, Grove St, Los Angeles'
    }
  ]
}, 500)

const options: TableOptions[] = [
  {
    label: '日期',
    prop: 'date',
    align: 'center',
    slot: 'date',
    editable: true
  },
  {
    label: '姓名',
    prop: 'name',
    align: 'center',
    slot: 'name'
  },
  {
    label: '地址',
    prop: 'address',
    align: 'center'
  },
  {
    label: '操作',
    align: 'center',
    action: true
  }
]

const edit = (scope: any) => {
  currentRowIndex.value = 'edit'
  console.log(scope)
}
const del = (scope: any) => {
  currentRowIndex.value = 'del'
  console.log(scope)
}
const check = (scope: any) => {
  console.log(scope)
}
</script>

<style lang="scss" scoped>
svg {
  width: 1.2em;
  height: 1.2em;
}
</style>
