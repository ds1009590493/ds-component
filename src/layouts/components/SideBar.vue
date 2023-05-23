<template>
  <div class="left-menu">
    <div class="menu-logo">
      <span>组件演示</span>
    </div>
    <el-menu
      class="el-menu-vertical-demo"
      :text-color="style.getPropertyValue('--ty-color-white')"
      :background-color="style.getPropertyValue('--ty-menu-fill-color')"
      :default-openeds="['user']"
      :default-active="state.menuActive"
    >
      <!-- 市民预约 -->
      <el-sub-menu index="user">
        <template #title>
          <div class="menu-title">
            <div class="router-name">用户管理</div>
          </div>
        </template>
        <el-menu-item index="userList">
          <template #title>
            <router-link to="/user/list">
              <div class="sub-title">用户列表</div>
            </router-link>
          </template>
        </el-menu-item>
      </el-sub-menu>
    </el-menu>
  </div>
</template>

<script lang="ts" setup>
import { ref, reactive, watch, onMounted } from "vue"
import { useRoute } from "vue-router"

const $route = useRoute()
const style = getComputedStyle(document.documentElement)

watch($route, () => {
  if ($route.meta.activeName) {
    state.menuActive = $route.meta.activeName
  }
})

let state = reactive({
  menuActive: "" as any
})

onMounted(() => {
  if ($route.meta.activeName) {
    state.menuActive = $route.meta.activeName
  }
})
</script>

<style lang="scss" scoped>
.left-menu {
  color: var(--ty-color-white);
  .menu-logo {
    @include vhCenter(center, center);
    height: 60px;
    img {
      width: 33px;
      height: 33px;
    }
    span {
      font-size: 16px;
      font-weight: 500;
      margin-left: 10px;
    }
  }
  :deep(.el-menu) {
    .el-menu-item {
      height: fit-content;
      border-radius: 10px;
      padding: 0 !important;
      width: 140px;
      margin: 0 auto;
    }
    .el-menu-item.is-active {
      background-color: var(--ty-color-theme);
      border-radius: 10px;
    }
  }
  .menu-title {
    @include vhCenter;
    font-size: 16px;
    font-weight: 400;
    img {
      width: 17px;
      margin-right: 5px;
    }
  }
  .sub-title {
    @include textHeight(40px);
    text-align: center;
    font-weight: 400;
  }
  a {
    display: block;
    width: 100%;
    color: var(--ty-color-white);
  }
}
</style>
