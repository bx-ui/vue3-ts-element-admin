<template>
  <div
    class="header-search"
    :class="{'show': isShow}"
  >
    <span @click.stop="onShowClick">
      <svg-icon
        class-name="search-icon"
        icon="search"
        id="guide-search"
      ></svg-icon>
    </span>
    <el-select
      filterable
      ref="headerSearchSelectRef"
      class="header-search-select"
      v-model="search"
      default-first-option
      remote
      placeholder="Search"
      :remote-method="querySearch"
      @change="onSelectChange"
    >
      <el-option
        v-for="option in searchOptions"
        :key="option.item"
        :label="option.item.title.join(' > ')"
        :value="option.item.path"
      ></el-option>
    </el-select>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { useRouter } from 'vue-router'
import { filterRouters } from '@/utils/route'
import { generateRoutes, FuseResult } from './FuseData'
import Fuse from 'fuse.js'
import { watchSwitchLang } from '@/utils/i18n'

const router = useRouter()

const isShow = ref<boolean>(false)
const search = ref<string>('')
const searchOptions = ref<FuseResult[]>([])

const querySearch = (query: string) => {
  if (query !== '') {
    searchOptions.value = fuse.search(query)
  } else {
    searchOptions.value = []
  }
}
const onSelectChange = (val: string) => {
  router.push(val)
}
const onShowClick = () => {
  isShow.value = !isShow.value
}

// 获取检索数据源
const searchPool = computed(() => {
  const routes = filterRouters(router.getRoutes())
  return generateRoutes(routes)
})
const headerSearchSelectRef = ref<any>()
const onClose = () => {
  headerSearchSelectRef.value.blur()
  isShow.value = false
  searchOptions.value = []
}

let fuse: any
const initFuse = (searchPool: FuseResult[]) => {
  fuse = new Fuse(searchPool, {
    // 是否按优先级进行排序
    shouldSort: true,
    // 匹配长度超过这个值的才会被认为是匹配的
    minMatchCharLength: 1,
    // 将被搜索的键列表。 这支持嵌套路径、加权搜索、在字符串和对象数组中搜索。
    // name：搜索的键
    // weight：对应的权重
    keys: [
      {
        name: 'title',
        weight: 0.7
      },
      {
        name: 'path',
        weight: 0.3
      }
    ]
  })
}

initFuse(searchPool.value)

watch(isShow, (val: boolean) => {
  if (val) {
    document.body.addEventListener('click', onClose)
  } else {
    document.body.removeEventListener('click', onClose)
  }
})

watchSwitchLang(() => {
  // 获取检索数据源
  const searchPool = computed(() => {
    const routes = filterRouters(router.getRoutes())
    return generateRoutes(routes)
  })
  initFuse(searchPool.value)
})
</script>

<style lang="scss" scoped>
.header-search {
  font-size: 0 !important;
  ::v-deep .search-icon {
    font-size: 22px;
    vertical-align: middle;
  }
  ::v-deep .header-search-select {
    font-size: 18px;
    width: 0px;
    transition: width 0.2s;
    overflow: hidden;
    background: transparent;
    border-radius: 0;
    display: inline-block;
    vertical-align: middle;
    .el-input__inner {
      border: 0;
      border-bottom: 1px solid #d9d9d9;
      border-radius: 0px;
      padding-left: 0;
      padding-right: 0;
      box-shadow: none !important;
      vertical-align: middle;
    }
  }

  &.show {
    .header-search-select {
      width: 210px;
      margin-left: 10px;
    }
  }
}
</style>
