<template>
  <ul class="context-menu-container">
    <li @click="onRefreshClick">
      {{ $t('msg.tagsView.refresh') }}
    </li>
    <li @click="onCloseRightClick">
      {{ $t('msg.tagsView.closeRight') }}
    </li>
    <li @click="onCloseOtherClick">
      {{ $t('msg.tagsView.closeOther') }}
    </li>
  </ul>
</template>

<script setup lang="ts">
import { defineProps, PropType } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'

const props = defineProps({
  index: {
    type: Number as PropType<number>,
    required: true
  }
})

const router = useRouter()
const store = useStore()
/**
 * 刷新
 */
const onRefreshClick = () => {
  router.go(0)
}
/**
 * 关闭右侧
 */
const onCloseRightClick = () => {
  store.commit('app/removeTagsView', {
    type: 'right',
    index: props.index
  })
}
/**
 * 关闭其他
 */
const onCloseOtherClick = () => {
  store.commit('app/removeTagsView', {
    type: 'other',
    index: props.index
  })
}
</script>

<style lang="scss" scoped>
.context-menu-container {
  background: #fff;
  position: fixed;
  z-index: 3000;
  padding: 5px 0;
  border-radius: 4px;
  font-size: 12px;
  font-weight: 400;
  color: #333;
  box-shadow: 2px 2px 3px 0 rgba(0, 0, 0, 0.3);
  list-style: none;
  li {
    margin: 0;
    padding: 7px 16px;
    cursor: pointer;
    &:hover {
      background: #eee;
    }
  }
}
</style>
