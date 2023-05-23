import { createApp } from "vue"
import App from "./App.vue"
import ElementPlus from "element-plus"
import router from "./router"
import zhCn from "element-plus/es/locale/lang/zh-cn"

// global css
import "element-plus/dist/index.css"
import "./styles/index.scss"
import "./styles/base.css"
//消除不同浏览器带来的css差异,比如用户代理样式表 chrome会自动添加margin:8px
import "normalize.css"

const app = createApp(App)

// 修改分页器默认文字
zhCn.el.pagination.total = "总计：" + `{total}` + "条"
zhCn.el.pagination.goto = "跳至"

app.use(ElementPlus, { locale: zhCn }).use(router).mount("#app")
