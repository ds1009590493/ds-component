<template>
  <div class="common-layout">
    <el-container>
      <el-aside>
        <SideBar />
      </el-aside>
      <el-container>
        <el-main>
          <router-view />
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script lang="ts" setup>
import SideBar from "./components/SideBar.vue"
</script>

<style lang="scss" scoped>
.common-layout {
  height: 100%;
  :deep(.el-container) {
    height: 100%;
    .el-aside {
      width: 170px;
      background: var(--ty-menu-fill-color);
    }
    .el-header {
      height: 60px;
      box-shadow: 0px 2px 6px 0px var(--ty-color-grey-5),
        inset 0px -1px 0px 0px var(--ty-color-grey-4);
    }

    .el-main {
      height: 100%;
      padding: 10px;
      background-color: var(--ty-main-fill-color);
    }
  }
}
</style>
