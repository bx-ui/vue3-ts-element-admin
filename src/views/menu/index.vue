<template>
  <div style="display: flex">
    <div style="width: 300px">
      <h2>仅二级菜单</h2>
      <m-menu :data="data"></m-menu>
    </div>
    <div style="width: 400px; margin-left: 100px">
      <h2>无限层级（tsx写法）</h2>
      <m-infinite-menu :data="data1"></m-infinite-menu>
    </div>
  </div>
</template>

<script setup lang="ts">
const data = [
  {
    icon: 'location',
    name: '导航1',
    index: '1'
  },
  {
    icon: 'location',
    name: '导航2',
    index: '2'
  },
  {
    icon: 'location',
    name: '导航3',
    index: '3',
    children: [
      {
        icon: 'location',
        name: '导航3-1',
        index: '3-1'
      }
    ]
  }
]

const data1 = [
  {
    icon: 'location',
    name: '导航1',
    index: '1'
  },
  {
    icon: 'location',
    name: '导航2',
    index: '2'
  },
  {
    icon: 'location',
    name: '导航3',
    index: '3',
    children: [
      {
        icon: 'location',
        name: '导航3-1',
        index: '3-1',
        children: [
          {
            icon: 'location',
            name: '导航3-1-1',
            index: '3-1-1',
            children: [
              {
                icon: 'location',
                name: '导航3-1-1-1',
                index: '3-1-1-1',
                children: [
                  {
                    icon: 'location',
                    name: '导航3-1-1-1-1',
                    index: '3-1-1-1-1',
                    children: [
                      {
                        icon: 'location',
                        name: '导航3-1-1-1-1-1',
                        index: '3-1-1-1-1-1'
                      }
                    ]
                  }
                ]
              }
            ]
          }
        ]
      }
    ]
  }
]
</script>

<style scoped>
</style>
