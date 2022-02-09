<template>
  <div class="block">
    <div class="text">
      基础版
    </div>
    <div class="flex">
      <div>
        <m-trend>
          销售额
        </m-trend>
      </div>
      <div>
        <m-trend
          type="down"
          text="营业额"
        ></m-trend>
      </div>
    </div>
  </div>
  <div class="block">
    <div class="text">
      自定义Icon颜色
    </div>
    <div class="flex">
      <div>
        <m-trend
          text="销售额"
          upIconColor="blue"
        ></m-trend>
      </div>
      <div>
        <m-trend
          type="down"
          text="营业额"
          downIconColor="pink"
        ></m-trend>
      </div>
    </div>
  </div>
  <div class="block">
    <div class="text">
      颜色反转
    </div>
    <div class="flex">
      <div>
        <m-trend
          text="销售额"
          reverseColor
        ></m-trend>
      </div>
      <div>
        <m-trend
          type="down"
          text="营业额"
          reverseColor
        ></m-trend>
      </div>
    </div>
  </div>
  <div class="block">
    <div class="text">
      自定义文字颜色
    </div>
    <div class="flex">
      <div>
        <m-trend
          text="销售额"
          upTextColor="red"
        ></m-trend>
      </div>
      <div>
        <m-trend
          type="down"
          text="营业额"
          downTextColor="blue"
        ></m-trend>
      </div>
    </div>
  </div>
  <div class="block">
    <div class="text">
      自定义图标
    </div>
    <div class="flex">
      <div>
        <m-trend
          text="销售额"
          upIcon="CaretTop"
        ></m-trend>
      </div>
      <div>
        <m-trend
          type="down"
          text="营业额"
          downIcon="CaretBottom"
        ></m-trend>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
</script>

<style lang="scss" scoped>
.block {
  background: cornsilk;
  padding: 15px;
  border-radius: 6px;
  margin-bottom: 20px;
  .text {
    text-align: center;
  }
  .flex {
    display: flex;
    div {
      margin-right: 10px;
    }
  }
}
</style>
