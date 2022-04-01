<template>
  <div class="app-main">
    <router-view
      v-slot="{ Component, route }"
      v-if="match"
    >
      <transition name="fade-transform">
        <keep-alive>
          <component
            :is="Component"
            :key="route.path"
          />
        </keep-alive>
      </transition>
    </router-view>
    <transition
      name="fade-transform"
      mode="out-in"
      v-else
    >
      <router-view v-slot="{ Component, route }">
        <component
          :is="Component"
          :key="route.path"
        />
      </router-view>
    </transition>
  </div>
</template>

<script setup lang="ts">
import { watch, ref } from 'vue'
import { useRoute } from 'vue-router'
import { isTags } from '@/utils/tags'
import { TagViewItem } from '@/store/modules/app'
import { generateTitle, watchSwitchLang } from '@/utils/i18n'
import { useStore } from 'vuex'

const route = useRoute()
const store = useStore()

const match = ref<boolean>(false)

const getTitle = (route: any) => {
  let title = ''

  if (!route.meta) {
    // 处理无 meta 的路由
    const pathArr = route.path.split('/')
    title = pathArr[pathArr.length - 1]
  } else {
    title = generateTitle(route.meta.title)
  }

  return title
}

watchSwitchLang(() => {
  store.getters.tagsViewList.forEach((item: TagViewItem, index: number) => {
    store.commit('app/changeTagsView', {
      index,
      tag: {
        ...item,
        title: getTitle(item)
      }
    })
  })
})

watch(
  route,
  (to, from) => {
    if (!isTags(to.path)) return
    runMatch()

    const { fullPath, meta, name, params, path, query } = to

    const data: TagViewItem = {
      fullPath,
      meta,
      name,
      params,
      path,
      query,
      title: getTitle(route)
    }

    store.commit('app/addTagsViewList', data)
  },
  {
    immediate: true,
    deep: true
  }
)

function runMatch() {
  match.value = !!store.getters.tagsViewList.find(
    (item: TagViewItem) => item.path === route.path
  )
  console.log(match.value)
}
</script>

<style lang="scss" scoped>
.app-main {
  min-height: calc(100vh - 50px - 43px);
  width: 100%;
  position: relative;
  overflow: hidden;
  padding: 104px 20px 20px 20px;
  box-sizing: border-box;
}
</style>
