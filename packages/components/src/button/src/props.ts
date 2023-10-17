import { defineListenerProps } from '@eazy-ui-next/utils'
import type { ExtractPropTypes, PropType } from 'vue'

export const ButtonType = [
  'default',
  'primary',
  'success',
  'danger',
  'warning',
]

export const ButtonSize = ['large', 'normal', 'small', 'mini']

export const buttonProps = {
  type: {
    type: String as PropType<'default' | 'primary'>,
    values: ButtonType,
    validator(value: string) {
      return ButtonType.includes(value)
    },
    default: 'default',
  },
  size: {
    type: String,
    values: ButtonSize,
    default: 'normal',
  },
  round: {
    type: Boolean,
    default: false,
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  block: {
    type: Boolean,
    default: false,
  },
  onClick: defineListenerProps<(e: Event) => void>(),
}

export type ButtonProps = ExtractPropTypes<typeof buttonProps>
