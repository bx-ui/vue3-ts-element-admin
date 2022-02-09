<template>
  <div class="tags-view-container">
    <router-link
      class="tags-view-item"
      v-for="(tag, index) in $store.getters.tagsViewList"
      :key="tag.fullPath"
      :to="{path: tag.fullPath}"
      :class="isActive(tag) ? 'active' : ''"
      :style="{
        background: isActive(tag) ? $store.getters.cssVar.menuBg : ''
      }"
      @contextmenu.prevent="openMenu($event)(index)"
    >
      {{ tag.title }}
      <el-icon-close
        class="el-icon-close"
        v-if="!isActive(tag)"
        @click.prevent.stop="onCloseClick(index)"
      />
    </router-link>
    <context-menu
      v-show="visible"
      :style="menuStyle"
      :index="selectIndex"
    ></context-menu>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import { useStore } from 'vuex'
import ContextMenu from './ContextMenu.vue'

const route = useRoute()
const store = useStore()

type MenuStyle = {
  top: string
  left: string
}

const visible = ref<boolean>(false)
const menuStyle = ref<MenuStyle>({
  top: '',
  left: ''
})
const selectIndex = ref<number>()

/**
 * 关闭tag
 */
const onCloseClick = (index: number) => {
  store.commit('app/removeTagsView', {
    type: 'index',
    index
  })
}

const isActive = (tag: any) => {
  return tag.path === route.path
}

// 鼠标右键
const openMenu = (e: PointerEvent) => (index: number) => {
  menuStyle.value.top = e.y + 'px'
  menuStyle.value.left = e.x + 'px'
  selectIndex.value = index
  visible.value = true
}

/**
 * 右键关闭事件
 */
const closeMenu = () => {
  visible.value = false
}

watch(visible, (val) => {
  if (val) {
    document.body.addEventListener('click', closeMenu)
  } else {
    document.body.removeEventListener('click', closeMenu)
  }
})
</script>

<style lang="scss" scoped>
.tags-view-container {
  height: 34px;
  width: 100%;
  background: #fff;
  border-bottom: 1px solid #d8dce5;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.12), 0 0 3px 0 rgba(0, 0, 0, 0.04);
  .tags-view-item {
    display: inline-block;
    position: relative;
    cursor: pointer;
    height: 26px;
    line-height: 26px;
    border: 1px solid #d8dce5;
    color: #495060;
    background: #fff;
    padding: 0 8px;
    font-size: 12px;
    margin-left: 5px;
    margin-top: 4px;
    &:first-of-type {
      margin-left: 15px;
    }
    &:last-of-type {
      margin-right: 15px;
    }
    &.active {
      color: #fff;
      &::before {
        content: '';
        background: #fff;
        display: inline-block;
        width: 8px;
        height: 8px;
        border-radius: 50%;
        position: relative;
        margin-right: 4px;
      }
    }
    // close 按钮
    .el-icon-close {
      width: 14px;
      height: 14px;
      line-height: 10px;
      vertical-align: middle;
      border-radius: 50%;
      text-align: center;
      transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
      transform-origin: 100% 50%;
      &:before {
        transform: scale(0.6);
        display: inline-block;
        vertical-align: -3px;
      }
      &:hover {
        background-color: #b4bccc;
        color: #fff;
      }
    }
  }
}
</style>
