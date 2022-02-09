<template>
  <el-breadcrumb
    class="breadcrumb"
    separator="/"
  >
    <el-breadcrumb-item
      v-for="(item, index) in breadcrumbData"
      :key="index"
    >
      <!-- 不可点击项 -->
      <span
        class="no-redirect"
        v-if="index === breadcrumbData.length - 1"
      >{{ generateTitle(item.meta.title) }}</span>
      <!-- 可点击项 -->
      <a
        v-else
        class="redirect"
        @click.prevent="onLinkClick(item)"
      >{{ generateTitle(item.meta.title) }}</a>
    </el-breadcrumb-item>
  </el-breadcrumb>
</template>

<script setup lang="ts">
import { useStore } from 'vuex'
import { watch, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { generateTitle } from '@/utils/i18n'

const route = useRoute()
const router = useRouter()

// 生成数组数据
const breadcrumbData = ref<any[]>([])

const onLinkClick = (item: any) => {
  router.push(item.path)
}

const getBreadcrumbData = () => {
  breadcrumbData.value = route.matched.filter(
    (item: any) => item.meta && item.meta.title
  )
}

watch(
  route,
  () => {
    getBreadcrumbData()
  },
  { immediate: true, deep: true }
)

// 将来需要进行主题替换，所以这里获取下动态样式
const store = useStore()
// eslint-disable-next-line
const linkHoverColor = ref(store.getters.cssVar.menuBg)
</script>

<style lang="scss" scoped>
.breadcrumb {
  display: inline-block;
  font-size: 14px;
  line-height: 42px;
  margin-left: 8px;
  .no-redirect {
    color: #97a8be;
    cursor: text;
  }
  .redirect {
    cursor: pointer;
    color: #666;
    &:hover {
      color: v-bind(linkHoverColor);
    }
  }
}
</style>
