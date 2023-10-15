<template>
  <div class="ez-button">
    我是button -- {{ props.modelValue }} -- {{ display }}
  </div>
</template>

<script setup lang="ts">
import {computed, toRefs} from "vue";
import { isArray } from "@eazy-ui-next/utils";
const props = defineProps<{
  modelValue: string
}>()

const { modelValue } = toRefs(props);

const display = computed(() => isArray(modelValue.value) ? '数组' : '非数组')
</script>

<style lang="scss">
</style>