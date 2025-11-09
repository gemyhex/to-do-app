<template>
  <div
    class="card p-4 transition cursor-pointer select-none"
    :class="{
      'ring-2 ring-indigo-400': selected,
      'hover:shadow-md': hover,
    }"
    @click="$emit('click')"
  >
    <slot />
  </div>
</template>

<script setup lang="ts">
defineProps<{
  selected?: boolean;
  hover?: boolean;
}>();

defineEmits(["click"]);
</script>
