<script setup lang="ts">
import { toRefs } from 'vue'
import { createNamespace } from '../../_utils/define'
import { call } from '../../_utils/components'
import { buttonProps } from './props'

defineOptions({
  name: 'EzButton',
})

const props = defineProps(buttonProps)

const { n, cls } = createNamespace('button')

const {
  type,
  size,
  round,
  disabled,
  block,
} = toRefs(props)

function handleClick(e: Event) {
  const { onClick } = props

  if (!onClick || disabled.value === true)
    return

  call(onClick, e)
}
</script>

<template>
  <button
    :class="cls(
      n(),
      n('&--box'),
      n(`--${type}`),
      n(`--${size}`),
      [round, n('--round')],
      [disabled, n('--disabled')],
      [block, n('--block')],
    )"
    @click="handleClick"
  >
    <slot />
  </button>
</template>
