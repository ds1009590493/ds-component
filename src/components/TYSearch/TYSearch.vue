<template>
  <main class="ty-search">
    <div class="ty-search-item" v-for="(item, idx) in data" :key="idx">
      <span class="ty-search-label">{{ item.label }}：</span>
      <!-- input -->
      <el-input
        v-if="item.type === 'input'"
        v-model="searchQuery[item.param]"
        clearable
        v-bind="item.config"
        @blur="componentEvent(item, 'blur', $event)"
        @focus="componentEvent(item, 'focus', $event)"
        @change="componentEvent(item, 'change')"
        @input="componentEvent(item, 'input')"
        @clear="componentEvent(item, 'clear')"
      />
      <!-- input number -->
      <el-input-number
        v-if="item.type === 'inputnumber'"
        v-model="searchQuery[item.param]"
        clearable
        v-bind="item.config"
        @blur="componentEvent(item, 'blur', $event)"
        @focus="componentEvent(item, 'focus', $event)"
        @change="(v1: number | undefined, v2: number | undefined) => inputNumberChange(v1, v2, item)"
      />
      <!-- select -->
      <el-select
        v-if="item.type === 'select'"
        v-model="searchQuery[item.param]"
        clearable
        v-bind="item.config"
        @blur="componentEvent(item, 'blur', $event)"
        @focus="componentEvent(item, 'focus', $event)"
        @change="componentEvent(item, 'change')"
        @clear="componentEvent(item, 'clear')"
      >
        <el-option
          v-for="option in item.options"
          :key="item.props ? option[item.props.value] : option.value"
          :label="item.props ? option[item.props.label] : option.label"
          :value="item.props ? option[item.props.value] : option.value"
        ></el-option>
      </el-select>
      <!-- date -->
      <el-date-picker
        v-if="dateTypes.includes(item.type)"
        v-model="searchQuery[item.param]"
        :type="item.type"
        v-bind="item.config"
      />
      <!-- cascader -->
      <el-cascader
        v-if="item.type === 'cascader'"
        v-model="searchQuery[item.param]"
        v-bind="item.config"
        clearable
        @blur="componentEvent(item, 'blur', $event)"
        @focus="componentEvent(item, 'focus', $event)"
        @change="componentEvent(item, 'change')"
      />
      <!-- radio -->
      <el-radio-group
        v-if="item.type === 'radio'"
        v-model="searchQuery[item.param]"
        v-bind="item.config"
        @change="componentEvent(item, 'change')"
      >
        <el-radio
          v-for="(option, idx) in item.options"
          :key="idx"
          :label="item.props ? option[item.props.value] : option.value"
        >
          {{ item.props ? option[item.props.label] : option.label }}
        </el-radio>
      </el-radio-group>
      <!-- checkbox -->
      <el-checkbox-group
        v-if="item.type === 'checkbox'"
        v-model="searchQuery[item.param]"
        v-bind="item.config"
        @change="componentEvent(item, 'change')"
      >
        <el-checkbox
          v-for="(option, idx) in item.options"
          :key="idx"
          :label="item.props ? option[item.props.value] : option.value"
        >
          {{ item.props ? option[item.props.label] : option.label }}
        </el-checkbox>
      </el-checkbox-group>
    </div>
    <div class="ty-search-item">
      <el-button type="primary" @click="search">查询</el-button>
      <el-button type="primary" plain @click="reset">重置</el-button>
      <el-button v-if="showExport" @click="exportData">导出</el-button>
    </div>
  </main>
</template>

<script setup lang="ts">
import { onMounted, reactive } from "vue"

export interface SearchItem {
  label: string // 搜索项名称
  type: string // 搜索项类型，input，select, date, daterange...
  defaultValue?: any // 默认value值
  param: string // v-model绑定的名称
  config?: object // element-plus的attribute,默认所有的搜索都可以clearable，所以该attribute不用传
  options?: any[] // 下拉选项，type为select,checkbox,radio时必传
  events?: {
    [key: string]: any
  }
  props?: {
    label: string
    value: string
  } // 下拉默认属性
}

/**
 * props
 */
interface SearchData {
  data: SearchItem[]
  showExport: boolean
}

const props = withDefaults(defineProps<SearchData>(), {
  showExport: false
})

/**
 * emits
 */
const emits = defineEmits(["search", "export"])

// 组件事件 - 通用
function componentEvent(item: SearchItem, eventType: string, e?: any) {
  if (!item.events) return
  if (getObjectOwnKey(item.events, eventType)) {
    item.events[eventType](searchQuery[item.param], e)
  }
}

// el-input-number change事件
function inputNumberChange(
  newValue: number | undefined,
  oldValue: number | undefined,
  item: SearchItem
) {
  if (!item.events) return
  if (getObjectOwnKey(item.events, "change")) {
    item.events["change"](newValue, oldValue)
  }
}

// 获取对象的属性
function getObjectOwnKey(targetObj: object, key: string) {
  return Object.prototype.hasOwnProperty.call(targetObj, key)
}

/**
 * expose
 */
defineExpose({
  changeParam
})

// 改变参数的值
function changeParam(key: string, val: any) {
  if (getObjectOwnKey(searchQuery, key)) {
    searchQuery[key] = val
  }
}

// 时间类型框 -> 对应el-date-picker的type
const dateTypes = [
  "year",
  "month",
  "monthrange",
  "week",
  "date",
  "dates",
  "daterange",
  "datetime",
  "datetimerange"
]

// 搜索参数
const searchQuery = reactive({})

// 查询
function search() {
  emits("search", searchQuery)
}

// 重置
function reset() {
  props.data.forEach((item) => {
    searchQuery[item.param] = getObjectOwnKey(item, "defaultValue")
      ? item.defaultValue
      : ""
  })
  emits("search", searchQuery)
}

// 导出
function exportData() {
  emits("export")
}

onMounted(() => {
  props.data.forEach((item) => {
    searchQuery[item.param] = getObjectOwnKey(item, "defaultValue")
      ? item.defaultValue
      : ""
    try {
      if (
        item.type === "select" ||
        item.type === "radio" ||
        item.type === "checkbox"
      ) {
        // select、radio、checkbox时options为必传
        if (!getObjectOwnKey(item, "options")) {
          throw new Error(item.type + "必须要有options")
        }
      }
    } catch (e) {
      console.error(e)
    }
  })
})
</script>

<style scoped>
.ty-search {
  --ty-module-padding: 10px;
  --ty-module-margin: 10px;
  --ty-color-white: #fff;
  --ty-text-color-1: #606266;
  background: var(--ty-color-white);
  padding: var(--ty-module-padding);
  /* 防止搜索项换行，所以给每个搜索项设置了margin-bottom & margin-right，这里padding-bottom & padding-right就不需要了 */
  padding-bottom: 0;
  padding-right: 0;
  margin-bottom: var(--ty-module-margin);
  box-sizing: border-box;
  box-shadow: var(--ty-card-shadow);
  display: flex;
  flex-wrap: wrap;
}
.ty-search-item {
  margin-right: var(--ty-module-margin);
  margin-bottom: var(--ty-module-margin);
}
.ty-search-label {
  color: var(--ty-text-color-1);
}
:deep(.el-input) {
  width: 200px;
}
</style>
