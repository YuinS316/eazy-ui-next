<template>
  <div class="ez-button">
    我是button -- {{ props.modelValue }}
  </div>
</template>

<script setup lang="ts">
defineOptions({
  name: 'EzButton'
});

const props = defineProps<{
  modelValue: string
}>()
</script>

<style lang="scss">
@use "./styles/index.scss";
</style>