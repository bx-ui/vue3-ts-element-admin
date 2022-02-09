<template>
  <div class="navbar">
    <!-- 汉堡组件 -->
    <hamburger class="hamburger-container" />
    <!-- 面包屑组件 -->
    <breadcrumb
      id="guide-breadcrumb"
      class="breadcrumb-container"
    />
    <div class="right-menu">
      <!-- guide -->
      <guide class="right-menu-item hover-effect" />
      <!-- 搜索 -->
      <header-search class="right-menu-item hover-effect"></header-search>
      <!-- 全屏 -->
      <screenfull class="right-menu-item hover-effect" />
      <!-- 动态换肤 -->
      <theme-select class="right-menu-item hover-effect"></theme-select>
      <!-- 国际化 -->
      <lang-select class="right-menu-item hover-effect" />
      <!-- 头像 -->
      <el-dropdown
        class="avatar-container"
        trigger="click"
        placement="top"
      >
        <div class="avatar-wrapper">
          <div class="avatar">{{ $store.getters.userInfo.name }}</div>
          <el-icon-tools />
        </div>
        <template #dropdown>
          <el-dropdown-menu class="user-dropdown">
            <router-link to="/">
              <el-dropdown-item>{{ $t('msg.navBar.home') }}</el-dropdown-item>
            </router-link>
            <el-dropdown-item
              divided
              @click="logout"
            >{{ $t('msg.navBar.logout') }}</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useStore } from 'vuex'
import hamburger from '@/components/hamburger/index.vue'
import breadcrumb from '@/components/Breadcrumb/index.vue'
import LangSelect from '@/components/LangSelect/index.vue'
import ThemeSelect from '@/components/ThemeSelect/index.vue'
import Screenfull from '@/components/Screenfull/index.vue'
import HeaderSearch from '@/components/headerSearch/index.vue'
import Guide from '@/components/Guide'
const store = useStore()
const logout = () => {
  store.dispatch('user/logout')
}
</script>

<style lang="scss" scoped>
::v-deep .el-dropdown-menu__item {
  white-space: nowrap;
}
svg {
  width: 1em;
  height: 1em;
}
.navbar {
  height: 50px;
  overflow: hidden;
  position: relative;
  background: #fff;
  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);

  .hamburger-container {
    float: left;
    line-height: 46px;
    height: 100%;
    cursor: pointer;
    // hover动画
    transition: background 0.5s;
    &:hover {
      background: rgba(0, 0, 0, 0.1);
    }
  }
  .breadcrumb-container {
    float: left;
  }

  .right-menu {
    display: flex;
    align-items: center;
    float: right;
    padding-right: 20px;
    height: 100%;

    ::v-deep .right-menu-item {
      display: inline-block;
      padding: 0 18px 0 0;
      font-size: 24px;
      color: #5a5e66;
      vertical-align: text-bottom;
      &.hover-effect {
        cursor: pointer;
      }
    }

    ::v-deep .avatar-container {
      cursor: pointer;
      .avatar-wrapper {
        position: relative;
        display: flex;
        .avatar {
          margin-right: 6px;
        }
      }
    }
  }
}
</style>
