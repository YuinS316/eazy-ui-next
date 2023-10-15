import { defineListenerProps } from '@eazy-ui-next/utils'
import type { ExtractPropTypes } from 'vue'

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
    type: String,
    values: ButtonType,
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
