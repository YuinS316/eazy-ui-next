export  {};

declare module '@vue/runtime-core' {
  export interface GlobalComponents {
    EzButton: typeof import('@eazy-ui-next/components')['Button']
  }
}