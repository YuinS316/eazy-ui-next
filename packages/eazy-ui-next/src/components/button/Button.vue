<template>
  <div>
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

<style scoped>

</style>