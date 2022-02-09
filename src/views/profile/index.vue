<template>
  <div>
    <el-pagination
      v-model:currentPage="currentPage1"
      :page-size="100"
      layout="total, prev, pager, next"
      :total="1000"
    >
    </el-pagination>
  </div>
  <div>
    <el-button>Default1</el-button>
    <el-button type="primary">Primary</el-button>
    <el-button type="success">Success</el-button>
    <el-button type="info">Info</el-button>
    <el-button type="warning">Warning</el-button>
    <el-button type="danger">Danger</el-button>
    <el-button>中文</el-button>
  </div>
</template>
<script setup>
import { ref } from 'vue'
// import { watchSwitchLang } from '@/utils/i18n'

// 监听语言切换
// 里面放接口请求函数
// watchSwitchLang()

const currentPage1 = ref(1)
</script>

<style lang="scss" scoped></style>
