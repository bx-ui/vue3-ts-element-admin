<template>
  <el-tabs
    class="demo-tabs"
    v-model="activeName"
  >
    <el-tab-pane
      v-for="(itemPane, index) in list"
      :key="index"
      :label="itemPane.title"
      :name="itemPane.title"
    >
      <div style="padding-left: 10px; padding-right: 10px">
        <el-scrollbar max-height="400px">
          <div
            class="list-item"
            v-for="(listItem, i) in itemPane.content"
            :key="i"
          >
            <div
              class="left"
              v-if="listItem.avatar"
            >
              <el-avatar
                :size="40"
                :src="listItem.avatar"
              ></el-avatar>
            </div>
            <div class="right">
              <div
                class="title"
                v-if="listItem.title"
              >{{ listItem.title }}</div>
              <div
                class="time"
                v-if="listItem.time"
              >{{ listItem.time }}</div>
              <div
                class="time"
                v-if="listItem.desc"
              >{{ listItem.desc }}</div>
            </div>
          </div>
        </el-scrollbar>
      </div>
      <div class="footer">
        <div
          class="footer-item"
          v-for="(footerItem, footerIndex) in actions"
          :key="footerIndex"
          @click="clickButtonItem(footerItem)"
        >
          <component :is='`el-icon-${toLine(footerItem.icon)}`'></component>
          <div class="text">{{ footerItem.text }}</div>
        </div>
      </div>
    </el-tab-pane>
  </el-tabs>
</template>

<script setup lang="ts">
import { defineProps, PropType, ref, defineEmits } from 'vue'
import { ListOptions, ActionOptions } from './type'
import { toLine } from '@/utils/settingIcon'

const emits = defineEmits(['footButtonClick'])

const activeName = ref<string>('通知')

defineProps({
  list: {
    type: Array as PropType<ListOptions[]>,
    required: true
  },
  actions: {
    type: Array as PropType<ActionOptions[]>,
    default: () => []
  }
})

const clickButtonItem = (item: ActionOptions) => {
  emits('footButtonClick', item)
}
</script>

<style lang="scss" scoped>
::v-deep .el-tabs__nav {
  width: 100%;
  padding-top: 5px;
  padding-bottom: 5px;
  .el-tabs__item {
    width: 33%;
    padding: 0px;
    text-align: center;
  }
}

.list-item {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
  cursor: pointer;
  .right {
    padding-left: 10px;
    padding-right: 10px;
    box-sizing: border-box;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    .title {
      color: #000;
      font-size: 14px;
    }
  }
}
.footer {
  border-top: 1px solid rgba($color: #000000, $alpha: 0.1);
  display: flex;
  .footer-item {
    height: 50px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex: 1;
    cursor: pointer;
    svg {
      width: 1.4em;
      height: 1.4em;
    }
    .text {
      margin-left: 6px;
    }
  }
}
</style>
