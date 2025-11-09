<template>
  <label
    class="inline-flex items-center gap-2 select-none"
    :class="{ 'opacity-50': disabled }"
  >
    <input
      :id="id"
      :name="name"
      type="checkbox"
      class="h-4 w-4 accent-slate-800 dark:accent-slate-200 rounded"
      :checked="modelValue"
      :disabled="disabled"
      @change="onChange"
    />
    <span v-if="$slots.default" class="text-sm">
      <slot />
    </span>
  </label>
</template>

<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    modelValue: boolean;
    id?: string;
    name?: string;
    disabled?: boolean;
  }>(),
  {
    disabled: false,
  }
);

const emit = defineEmits<{
  (e: "update:modelValue", v: boolean): void;
  (e: "change", v: boolean): void;
}>();

function onChange(e: Event) {
  const v = (e.target as HTMLInputElement).checked;
  emit("update:modelValue", v);
  emit("change", v);
}
</script>
