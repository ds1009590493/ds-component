<template>
  <main class="appointment-container ty-list-container">
    <!-- search -->
    <TYSearch
      ref="tySearchRef"
      :data="searchQuery"
      show-export
      @search="search"
      @export="exportData"
    />
    <!-- table -->
    <TYTable
      ref="tyTableRef"
      :action="getList"
      :search-data="queryParams"
      :columns="columns"
      :on-success="getListSuccess"
      :on-error="getListError"
    >
      <template #operate="{ row }">
        <el-button type="primary" link @click="del(row.id)"> 删除 </el-button>
        <el-button type="primary" link @click="view(row)"> 查看 </el-button>
      </template>
      <template #empty>
        <span>没有数据，请重试</span>
      </template>
    </TYTable>
  </main>
</template>

<script setup lang="ts">
import { reactive, ref, onMounted, computed, nextTick } from "vue"
import TYSearch from "@/components/TYSearch/TYSearch.vue"
import TYTable from "@/components/TYTable/TYTable.vue"
import { SearchItem } from "@/components/TYSearch/TYSearch.vue"

const sexEnum = [
  { key: "M", value: "男" },
  { key: "F", value: "女" }
]

/**
 * 搜索栏
 */
const searchQuery = computed<SearchItem[]>(() => {
  return [
    {
      type: "input",
      label: "姓名",
      param: "name",
      events: {
        blur: inputBlur,
        focus: inputFocus
      },
      config: {
        placeholder: "请输入姓名",
        maxlength: "20",
        "show-word-limit": true
      }
    },
    {
      type: "cascader",
      label: "户籍",
      param: "address",
      defaultValue: [],
      config: {
        options: regionList.value,
        filterable: true,
        props: { multiple: true },
        "collapse-tags": true,
        "collapse-tags-tooltip": true,
        "show-all-levels": false,
        placeholder: "请选择户籍地址"
      }
    },
    {
      type: "select",
      label: "性别",
      param: "sex",
      options: sexEnum,
      config: {
        placeholder: "请选择性别"
      },
      events: {
        change: changeStatus
      },
      props: {
        label: "value",
        value: "key"
      }
    },
    {
      type: "daterange",
      label: "出生日期",
      param: "birth",
      defaultValue: null,
      config: {
        "start-placeholder": "开始日期",
        "end-placeholder": "结束日期",
        "value-format": "YYYY-MM-DD"
      }
    }
  ]
})

const tySearchRef = ref()

function inputFocus(val: any) {
  console.log("input foucs val is ", val)
}

function inputBlur(val: any) {
  console.log("input blur val is ", val)
}

function changeStatus(val: string) {
  console.log("val is ", val)
  tySearchRef.value.changeParam("orderNo", val)
}

const searchData = reactive({
  orderNo: null as any,
  appointmentInfo: null as any,
  collectionPointIds: [] as any[],
  expectCleanTime: null as any,
  orderStatus: null as any
})
// 参数格式化
const queryParams = computed(() => {
  return {
    // 输入或下拉框clearable清空后值为""，需要处理为null
    orderNo: searchData.orderNo || null,
    appointmentInfo: searchData.appointmentInfo || null,
    collectionPointIds: searchData.collectionPointIds.length
      ? searchData.collectionPointIds.map((item) => item[item.length - 1])
      : [],
    expectCleanStartTime: searchData.expectCleanTime
      ? searchData.expectCleanTime[0] + " 00:00:00"
      : null,
    expectCleanEndTime: searchData.expectCleanTime
      ? searchData.expectCleanTime[1] + " 23:59:59"
      : null,
    orderStatus: searchData.orderStatus || null
  }
})
// 查询
function search(querys?: any) {
  for (let key in querys) {
    searchData[key] = querys[key]
  }
  nextTick(() => {
    tyTableRef.value.getList()
  })
}
// 导出
function exportData() {
  console.log("导出")
}

/**
 * 表格
 */
// 表格列
const columns = [
  { minWidth: "180px", label: "姓名", prop: "name" },
  {
    label: "性别",
    prop: "sex",
    minWidth: "100px",
    formatter: (row: any) => {
      return sexEnum.find((i) => i.key === row.sex)?.value
    }
  },
  { label: "身高", prop: "height", width: "150px" },
  {
    label: "体重",
    prop: "weight",
    minWidth: "200px",
    formatter: (row: any) => {
      return row.weight + "kg"
    }
  },
  {
    label: "出生日期",
    prop: "birth",
    minWidth: "200px"
  },
  {
    slot: true,
    label: "操作",
    prop: "operate",
    minWidth: "200px"
  }
]
// 获取表格数据
const tyTableRef = ref()

// 请求模拟
function getList() {
  return new Promise((resolve) => {
    setTimeout(() => {
      const datas = {
        items: [
          {
            id: 1,
            name: "1",
            sex: "M",
            height: 180,
            weight: 120,
            birth: "2000-12-12"
          },
          {
            id: 2,
            name: "2",
            sex: "F",
            height: 170,
            weight: 100,
            birth: "1994-12-12"
          }
        ],
        total: 2
      }
      resolve(datas)
    }, 100)
  })
}

// 表格请求成功回调
function getListSuccess(res?: any) {
  console.log("on - success ", res)
}

// 表格请求失败回调
function getListError(err?: any) {
  console.log("on - error ", err)
}

// 删除
function del(id: number) {
  console.log("id ", id)
}

// 查看
function view(row: any) {
  console.log("查看")
}

const regionList = ref<any>([])
function getRegion() {
  setTimeout(() => {
    regionList.value = [
      {
        label: "河北",
        value: "1",
        children: [{ label: "张家口", value: "1-1" }]
      }
    ]
  }, 500)
}

onMounted(() => {
  getRegion()
})
</script>

<style scoped lang="scss">
.appointment-container {
  :deep(.el-cascader) {
    width: 300px;
    .el-input {
      width: 100%;
    }
    .el-cascader__tags {
      flex-wrap: nowrap;
      .el-tag.is-closable {
        width: 100px;
      }
    }
  }
}
</style>
