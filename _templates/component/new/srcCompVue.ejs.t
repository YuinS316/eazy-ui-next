---
to: packages/components/src/<%= name %>/src/<%= name %>.vue
---
<script setup lang="ts">
import { toRefs } from 'vue'
import { createNamespace } from '../../_utils/define'
import { call } from '../../_utils/components'
import { <%= name %>Props } from './props'

defineOptions({
  name: 'Ez<%= h.capitalize(name) %>',
})

const props = defineProps(<%= name %>Props)

const { n, cls } = createNamespace('<%= name %>')
</script>

<template>
  <div></div>
</template>


