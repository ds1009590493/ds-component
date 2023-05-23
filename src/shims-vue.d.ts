/* eslint-disable */
declare module "*.vue" {
  import type { DefineComponent } from "vue"
  const component: DefineComponent<{}, {}, any>
  export default component
}

declare const BMap: any
declare const BMapLib: any

declare module "js-md5"
