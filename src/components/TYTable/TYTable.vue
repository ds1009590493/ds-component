<template>
  <main class="ty-list">
    <!-- 按钮 -->
    <slot name="header"></slot>
    <!-- 列表 -->
    <div class="ty-table-wrap">
      <el-table
        ref="elTableRef"
        :data="tableData"
        v-bind="tableConfig"
        height="100%"
        v-loading="loading"
        @row-click="elRowClick"
        @select="elSelect"
        @select-all="elSelectAll"
        @selection-change="elSelectionChange"
        @cell-click="elCellClick"
      >
        <el-table-column
          v-if="showCheckbox"
          type="selection"
          fixed="left"
          width="50px"
        ></el-table-column>
        <el-table-column
          v-if="showIndex"
          label="序号"
          type="index"
          width="55px"
        ></el-table-column>
        <el-table-column
          v-for="(item, idx) in columns"
          :key="idx"
          v-bind="item"
          show-overflow-tooltip
        >
          <template v-if="item.slot" #default="scope">
            <slot :name="item.prop" :row="scope.row"></slot>
          </template>
        </el-table-column>
        <template #empty>
          <slot name="empty"></slot>
        </template>
      </el-table>
    </div>
    <!-- 分页 -->
    <div class="ty-page-wrap">
      <el-pagination
        v-model:current-page="page.pageBean.pageNum"
        v-model:page-size="page.pageBean.pageSize"
        :page-sizes="pageSizes"
        background
        layout="total, prev, pager, next, sizes, jumper"
        :total="page.total"
        @size-change="handleSizeChange"
        @current-change="getTableList"
      />
    </div>
  </main>
</template>

<script setup lang="ts">
import { onMounted, reactive, ref } from "vue"

const elTableRef = ref()

/**
 * props
 */
interface ColumnItem {
  [key: string]: any
}

interface PropsType {
  action: any // 接口封装函数
  searchData?: object // 搜索项
  showCheckbox?: boolean // 是否表格多选
  showIndex?: boolean // 是否有序号列
  columns: ColumnItem[] // 表格列
  tableConfig?: object // el-table的attribute
  defalutPageSize?: number // 默认的每页数量
  pageSizes?: number[] // 页码Enum
  onSuccess?: (res: any) => void
  onError?: (err: any) => void
  responseProps?: {
    list: string
    total: string
  } // api请求默认赋值名称
  pageProps?: {
    pageNum: string
    pageSize: string
  } // 分页器参数
}

const props = withDefaults(defineProps<PropsType>(), {
  defalutPageSize: 10,
  pageSizes: () => [10, 20, 50, 100],
  showCheckbox: false,
  showIndex: false,
  responseProps: () => {
    return {
      list: "items",
      total: "total"
    }
  },
  pageProps: () => {
    return {
      pageNum: "pageNum",
      pageSize: "pageSize"
    }
  }
})

/**
 * emits
 */
const emits = defineEmits([
  "rowClick",
  "select",
  "selectAll",
  "selectionChange",
  "cellClick"
])

// element-plus的表格事件
function elRowClick(row: any, column: any, event: any) {
  emits("rowClick", row, column, event)
}
function elSelect(selection: any, row: any) {
  emits("select", selection, row)
}
function elSelectAll(selection: any) {
  emits("selectAll", selection)
}
function elSelectionChange(selection: any) {
  emits("selectionChange", selection)
}
function elCellClick(row: any, column: any, cell: any, event: any) {
  emits("cellClick", row, column, cell, event)
}

/**
 * expose
 */
defineExpose({
  getList: handleSizeChange,
  clearSelection,
  getSelectionRows,
  toggleRowSelection,
  toggleAllSelection
})

// element-plus方法
function clearSelection() {
  elTableRef.value.clearSelection()
}
function getSelectionRows() {
  elTableRef.value.getSelectionRows()
}
function toggleRowSelection(row: any, selected?: boolean) {
  elTableRef.value.toggleRowSelection(row, selected)
}
function toggleAllSelection() {
  elTableRef.value.toggleAllSelection()
}

const loading = ref(false)

// 获取表格数据
const tableData = ref<any[]>([])

function getTableList() {
  loading.value = true
  // 表格滚动条重置
  elTableRef.value.setScrollTop(0)
  elTableRef.value.setScrollLeft(0)
  props
    .action(props.searchData, {
      [props.pageProps.pageNum]: page.pageBean.pageNum,
      [props.pageProps.pageSize]: page.pageBean.pageSize
    })
    .then((res: any) => {
      tableData.value = res[props.responseProps.list]
      page.total = res[props.responseProps.total]
      if (props.onSuccess) {
        props.onSuccess(res)
      }
    })
    .catch((error: any) => {
      if (props.onError) {
        props.onError(error)
      }
    })
    .finally(() => {
      loading.value = false
    })
}

/**
 * 分页
 */
const page = reactive({
  pageBean: {
    pageNum: 1,
    pageSize: 10
  },
  total: 0
})
// 切换每页条数，toFirstPage: 是否重置pageNum为1
function handleSizeChange(toFirstPage = true) {
  if (toFirstPage) {
    page.pageBean.pageNum = 1
  }
  getTableList()
}

onMounted(() => {
  page.pageBean.pageSize = props.defalutPageSize
  getTableList()
})
</script>

<style scoped>
.ty-list {
  --ty-module-padding: 10px;
  --ty-module-margin: 10px;
  --ty-color-white: #fff;
  flex: 1;
  height: 0;
  background: var(--ty-color-white);
  padding: var(--ty-module-padding);
  box-shadow: var(--ty-card-shadow);
  display: flex;
  flex-direction: column;
}
.ty-table-wrap {
  flex: 1;
  overflow: hidden;
}
.ty-page-wrap {
  margin-top: var(--ty-module-margin);
}
</style>
