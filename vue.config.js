const { defineConfig } = require("@vue/cli-service")
module.exports = defineConfig({
  publicPath: "/",
  outputDir: "dist",
  assetsDir: "static",
  lintOnSave: process.env.NODE_ENV !== "production",
  devServer: {
    port: 9527,
    open: true,
    proxy: {
      [process.env.VUE_APP_BASE_API]: {
        // target: "http://localhost:8280",
        target: "http://47.97.100.12:8480",
        changeOrigin: true,
        ws: false
      }
    },
    allowedHosts: ["localhost.tianyitech.net"]
    // disableHostCheck: true,
  },
  css: {
    loaderOptions: {
      scss: {
        additionalData: '@import "./src/styles/mixin.scss";'
      }
    }
  },
  chainWebpack: (config) => {
    config.plugin("html").tap((args) => {
      args[0].title = "组件封装"
      return args
    })
  }
})
