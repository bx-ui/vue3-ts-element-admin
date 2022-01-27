<template>
  <div class="navbar">
    <div class="right-menu">
      <!-- 头像 -->
      <el-dropdown
        class="avatar-container"
        trigger="click"
      >
        <div class="avatar-wrapper">
          <div class="avatar">{{ $store.getters.userInfo.name }}</div>
          <el-icon-tools />
        </div>
        <template #dropdown>
          <el-dropdown-menu class="user-dropdown">
            <router-link to="/">
              <el-dropdown-item>首页</el-dropdown-item>
            </router-link>
            <el-dropdown-item divided>退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>

<script setup>
</script>

<style lang="scss" scoped>
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

  .right-menu {
    display: flex;
    align-items: center;
    float: right;
    padding-right: 36px;
    height: 100%;

    ::v-deep .avatar-container {
      cursor: pointer;
      .avatar-wrapper {
        position: relative;
        display: flex;
        .avatar {
          margin-right: 12px;
        }
      }
    }
  }
}
</style>
