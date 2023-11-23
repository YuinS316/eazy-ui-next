import type { ExtractPropTypes } from 'vue'
import { defineListenerProps, defineStringProp } from '../../_utils/define'

export const InputType = [
  'input',
  'textarea',
  'password',
] as const

export const inputProps = {
  'value': {
    type: String,
    default: '',
  },
  'placeholder': {
    type: String,
    default: '请输入',
  },
  'type': defineStringProp<typeof InputType[number]>('input'),
  'readonly': {
    type: Boolean,
    default: false,
  },
  'clearable': {
    type: Boolean,
    default: true,
  },
  'disabled': {
    type: Boolean,
    default: false,
  },
  'onUpdate:value': defineListenerProps<(value: string) => void>(),
  'onChange': defineListenerProps<(value: string) => void>(),
}

export type InputProps = ExtractPropTypes<typeof inputProps>
