<template>
  <div>
    <div class="logo-container">
      <el-avatar
        :size="logoHeight"
        shape="square"
        src="https://m.imooc.com/static/wap/static/common/img/logo-small@2x.png"
      ></el-avatar>
      <h1
        class="logo-title"
        v-if="$store.getters.sidebarOpened"
      >imooc-admin</h1>
    </div>
    <el-scrollbar>
      <sidebar-menu></sidebar-menu>
    </el-scrollbar>
  </div>
</template>

<script setup lang="ts">
import SidebarMenu from './SidebarMenu.vue'

const logoHeight = 44
</script>

<style lang="scss" scoped>
.logo-container {
  display: flex;
  // vue3.2 最新特性 **组件状态驱动的动态 `CSS` 值**
  height: v-bind(logoHeight) + 'px';
  align-items: center;
  justify-content: center;
  flex-wrap: nowrap;
  padding: 10px 0 22px 0;
  .logo-title {
    font-size: 16px;
    margin-left: 10px;
    color: #fff;
    line-height: 50px;
    white-space: nowrap;
    font-weight: 600;
  }
}
</style>
