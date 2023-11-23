<script setup lang="ts">
import { computed, ref, toRefs, watch } from 'vue'
import { createNamespace } from '../../_utils/define'
import { call } from '../../_utils/components'
import { inputProps } from './props'

defineOptions({
  name: 'EzInput',
})

const props = defineProps(inputProps)

const { n, cls } = createNamespace('input')

const { type, value, placeholder, disabled } = toRefs(props)

const inputValue = ref('')

const inputEl = ref<HTMLInputElement>()

//  处理外部有初始值的情况
watch(() => value, () => {
  inputValue.value = value.value
}, {
  immediate: true,
})

//  placeholder是否展示
const isPlaceholderShow = computed(() => inputValue.value === '')

//  是否是textarea
const isTextarea = computed(() => type.value === 'textarea')

function handleInput(e: Event) {
  const target = e.target as HTMLInputElement
  inputValue.value = target.value

  const { 'onUpdate:value': onUpdateValue } = props

  call(onUpdateValue, inputValue.value)
}

function handleChange(e: Event) {
  const target = e.target as HTMLInputElement
  inputValue.value = target.value

  const { onChange } = props
  call(onChange, inputValue.value)
}
</script>

<template>
  <div :class="cls(n(), n('&--box'))">
    <div :class="cls(n('--wrapper'), [disabled, n('--disabled')])">
      <div :class="cls(n('--input'))">
        <template v-if="!isTextarea">
          <input ref="inputEl" :disabled="disabled" :type="type" :value="inputValue" @input="handleInput" @change="handleChange">
          <div v-if="isPlaceholderShow" :class="cls(n('--placeholder'))">
            {{ placeholder }}
          </div>
        </template>
      </div>
    </div>
  </div>
</template>
