## TYTable Attribute

| 属性名称        | 说明                                                                          | 类型     | 默认值            | 是否必传 |
| --------------- | ----------------------------------------------------------------------------- | -------- | ----------------- | -------- |
| action          | 接口请求函数                                                                  | any      | -                 | 是       |
| searchData      | 搜索项                                                                        | object   | -                 | 否       |
| showCheckbox    | 表格是否多选                                                                  | boolean  | false             | 否       |
| showIndex       | 表格是否有序号列                                                              | boolean  | false             | 否       |
| columns         | 表格列，主要由 el-table-column 的属性组成，自定义属性 slot: boolean，用于插槽 | object[] | -                 | 是       |
| tableConfig     | el-table 的 attribute，TYTable 内置 height:100%,该属性不用配置                | object   | -                 | 否       |
| pageSizes       | 页面 Enum                                                                     | number[] | [10, 20, 50, 100] | 否       |
| responseProps   | 接口请求的赋值 key                                                            | object   | 见配置表          | 否       |
| pageProps       | 分页的 key-value                                                              | object   | 见配置表          | 否       |
| defaultPageSize | 默认的每页数量                                                                | number   | 10                | 否       |
| on-success      | 请求成功回调                                                                  | any      | -                 | 否       |
| on-error        | 请求失败回调                                                                  | any      | -                 | 否       |

## TYTable Events

| 事件名           | 说明                                         | 参数                     |
| ---------------- | -------------------------------------------- | ------------------------ |
| select           | 当用户手动勾选数据行的 Checkbox 时触发的事件 | selection, row           |
| select-all       | 当用户手动勾选全选 Checkbox 时触发的事件     | selection                |
| selection-change | 当选择项发生变化时会触发该事件               | selection                |
| cell-click       | 当某个单元格被点击时会触发该事件             | row, column, cell, event |
| row-click        | 当某一行被点击时会触发该事件                 | row, column, event       |

## TYTable Exposes

| 方法名             | 说明                                                                                  | 参数                                               |
| ------------------ | ------------------------------------------------------------------------------------- | -------------------------------------------------- |
| getList            | 获取列表数据                                                                          | toFirstPage，布尔值，是否将页码置为 1，默认为 true |
| clearSelection     | 用于多选表格，清空用户的选择                                                          | -                                                  |
| getSelectionRows   | 返回当前选中的行                                                                      | -                                                  |
| toggleRowSelection | 用于多选表格，切换某一行的选中状态， 如果使用了第二个参数，则可直接设置这一行选中与否 | row, selected                                      |
| toggleAllSelection | 用于多选表格，切换全选和全不选                                                        | -                                                  |

## TYTable Slots

| 插槽名                      | 说明                     | 参数 |
| --------------------------- | ------------------------ | ---- |
| [el-table-column]的 prop 值 | 每一列的自定义内容       | row  |
| operate                     | 操作列                   | row  |
| empty                       | 当数据为空时自定义的内容 | -    |

## responseProps 配置

| 属性名 | 说明     | 类型   | 默认值 |
| ------ | -------- | ------ | ------ |
| list   | 列表数据 | string | items  |
| total  | 列表总数 | string | total  |

## pageProps 配置

| 属性名   | 说明           | 类型   | 默认值   |
| -------- | -------------- | ------ | -------- |
| pageNum  | 分页器当前页数 | string | pageNum  |
| pageSize | 分页器当前页码 | string | pageSize |
