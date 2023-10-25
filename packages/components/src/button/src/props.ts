import type { ExtractPropTypes } from 'vue'
import { defineListenerProps, defineStringProp } from '../../_utils/define'

export const ButtonType = [
  'default',
  'primary',
  'success',
  'danger',
  'warning',
] as const

export const ButtonSize = ['large', 'normal', 'small', 'mini'] as const

export const buttonProps = {
  type: defineStringProp<typeof ButtonType[number]>('default'),
  size: defineStringProp<typeof ButtonSize[number]>('normal'),
  round: {
    type: Boolean,
    default: false,
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  // 模仿块级元素
  block: {
    type: Boolean,
    default: false,
  },
  onClick: defineListenerProps<(e: Event) => void>(),
}

export type ButtonProps = ExtractPropTypes<typeof buttonProps>
