<template>
  <div class="ez-button">
    <div>type: {{ props.type }} -- {{ display }}</div>
  </div>
</template>

<script setup lang="ts">
import {computed, toRefs} from "vue";
import { buttonProps } from "./props";
import { isArray } from "@eazy-ui-next/utils";

defineOptions({
  name: 'EzButton'
})

const props = defineProps(buttonProps)

const display = computed(() => isArray(props.type) ? '数组' : '非数组')
</script>

<style lang="scss">
</style>