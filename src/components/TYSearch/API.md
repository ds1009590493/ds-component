## TYSearch Attributes

| 属性名称    | 说明     | 类型                      | 默认值 |
| ----------- | -------- | ------------------------- | ------ |
| data        | 搜索项   | Array<SearchItem>，见说明 | -      |
| show-export | 导出按钮 | boolean                   | false  |

## TYSearch Events

| 事件名 | 说明 | 参数                   |
| ------ | ---- | ---------------------- |
| search | 查询 | 返回用户键入的搜索内容 |
| export | 导出 | 返回用户键入的搜索内容 |

## TYSearch Exposes

| 方法名      | 说明       | 参数                            |
| ----------- | ---------- | ------------------------------- |
| changeParam | 修改默认值 | (key: string, val: any) => void |

## SearchItem 接口

| 属性名        | 说明                                                                                                                                                             | 类型     | 是否必须                                       |
| ------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------- | ---------------------------------------------- |
| label         | 搜索项名称                                                                                                                                                       | string   | true                                           |
| type          | 搜索项类型                                                                                                                                                       | string   | true                                           |
| param         | 搜索项绑定值名称                                                                                                                                                 | string   | true                                           |
| defaultValue  | 搜索项默认值                                                                                                                                                     | any      | false，不传为""                                |
| config        | element-plus 的 attribute，默认所有的搜索项都可以 clearable，所以该 attribute 不用传，如果不需要 clearable 效果，请传入 false                                    | object   | false                                          |
| options       | select 的下拉选项，每一项可增加 optionConfig 属性，作为 option 的 attributes                                                                                     | object[] | false，type 为 select,radio,checkbox 时为 true |
| props         | option 的 key-value 配置，默认名称为 label & value                                                                                                               | object   | false                                          |
| events        | 事件列表，对应 element-plus 组件的事件，key 为事件名称，value 为回调函数                                                                                         | object   | false                                          |
| slotComponent | 动态组件名称，适用于 type 为 radio\|checkbox，默认为 el-radio\|el-checkbox，当需要使用 button 样式时，显时传入该属性，名称为 el-radio-button\|el-checkbox-button | string   | false                                          |

## SearchItem.type 字典

| 名称                                                                 | 说明                                     |
| -------------------------------------------------------------------- | ---------------------------------------- |
| input                                                                | 输入框                                   |
| inputnumber                                                          | 数字输入框                               |
| select                                                               | 下拉框                                   |
| radio                                                                | 单选按钮组                               |
| checkbox                                                             | 多选按钮组                               |
| cascader                                                             | 级联选择器                               |
| year/month/monthrange/weekdate/dates/daterangedatetime/datetimerange | 日期选择器，对应 element-plus 的日期类型 |

## SearchItem.props 配置

| 属性名 | 说明         | 类型   | 默认值 |
| ------ | ------------ | ------ | ------ |
| label  | 属性名称     | string | label  |
| value  | 属性值的名称 | string | value  |

## issues

1.  当搜索项中存在异步数据时如何处理？(2023-05-10)

> 使用`computed`返回数据(2023-05-10)
