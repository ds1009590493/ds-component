import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router"
import BaseLayout from "@/layouts/index.vue"

const constantRoutes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "/",
    redirect: "/user"
  },
  {
    path: "/user",
    name: "user",
    component: BaseLayout,
    redirect: "/user/list",
    meta: {
      title: "用户管理"
    },
    children: [
      // 预约列表
      {
        path: "list",
        name: "userList",
        meta: { title: "用户列表", activeName: "userList" },
        component: () => import("@/views/user/index.vue")
      }
    ]
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes: constantRoutes
})

export default router
