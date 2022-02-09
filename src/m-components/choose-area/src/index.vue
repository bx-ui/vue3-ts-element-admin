<template>
  <div>
    <!-- 省 -->
    <el-select
      v-model="province"
      style="margin-right: 20px"
      clearable
      filterable
    >
      <el-option
        v-for="item in provinceOptions"
        :key="item.code"
        :label="item.name"
        :value="item.code"
      ></el-option>
    </el-select>
    <!-- 市 -->
    <el-select
      v-model="city"
      style="margin-right: 20px"
      clearable
      filterable
      :disabled="province === ''"
    >
      <el-option
        v-for="item in cityOptions"
        :key="item.code"
        :label="item.name"
        :value="item.code"
      ></el-option>
    </el-select>
    <!-- 区 -->
    <el-select
      v-model="area"
      clearable
      filterable
      :disabled="province === '' || city === ''"
    >
      <el-option
        v-for="item in areaOptions"
        :key="item.code"
        :label="item.name"
        :value="item.code"
      ></el-option>
    </el-select>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch, defineEmits } from 'vue'
import pcasCode from '../lib/pcas-code.json'
import cloneDeep from 'lodash/cloneDeep'
import { AreaItem, SendResultItem } from './type'

const emits = defineEmits(['sendResultData'])

/**
 * 省份
 */
const province = ref<string>('')
/**
 * 省份options
 */
const provinceOptions = ref<AreaItem[]>([])
/**
 * 市
 */
const city = ref<string>('')
/**
 * 市options
 */
const cityOptions = ref<AreaItem[]>([])
/**
 * 区
 */
const area = ref<string>('')
/**
 * 区options
 */
const areaOptions = ref<AreaItem[]>([])

/**
 * 监听省份变化
 */
watch(
  () => province.value,
  (val) => {
    if (val === '') {
      city.value = ''
      area.value = ''
      cityOptions.value = []
      areaOptions.value = []
      return
    }
    const currentData: AreaItem[] = provinceOptions.value.find(
      (item: AreaItem) => item.code === val
    )!.children!
    cityOptions.value = currentData
  }
)

/**
 * 监听市的变化
 */
watch(
  () => city.value,
  (val) => {
    if (val === '') {
      area.value = ''
      areaOptions.value = []
      return
    }
    const currentData: AreaItem[] = cityOptions.value.find(
      (item: AreaItem) => item.code === val
    )!.children!
    areaOptions.value = currentData
  }
)

/**
 * 监听区的变化
 */
watch(
  () => area.value,
  (val) => {
    if (val === '') return
    const provinceData: SendResultItem = {
      code: province.value,
      name: (provinceOptions.value.length &&
        province.value &&
        provinceOptions.value.find((item) => item.code === province.value)!
          .name!) as string
    }
    const cityData: SendResultItem = {
      code: city.value,
      name: (cityOptions.value.length &&
        city.value &&
        cityOptions.value.find((item) => item.code === city.value)!
          .name!) as string
    }
    const areaData: SendResultItem = {
      code: area.value,
      name: (areaOptions.value.length &&
        area.value &&
        areaOptions.value.find((item) => item.code === area.value)!
          .name!) as string
    }

    emits('sendResultData', [provinceData, cityData, areaData])
  }
)

onMounted(() => {
  provinceOptions.value = cloneDeep(pcasCode)
})
</script>

<style scoped>
</style>
