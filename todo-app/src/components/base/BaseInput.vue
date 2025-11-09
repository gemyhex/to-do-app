<template>
  <div class="w-full space-y-1">
    <label v-if="label" :for="id" class="text-sm font-medium">{{
      label
    }}</label>

    <input
      :id="id"
      :name="nameAttr"
      :type="type"
      :placeholder="placeholder"
      v-model="model"
      class="input"
      :class="{ 'ring-2 ring-red-500': error }"
      :autocomplete="resolvedAutocomplete"
      @input="$emit('update:modelValue', model)"
      @keyup.enter="$emit('enter')"
    />

    <p v-if="error" class="text-xs text-red-500">{{ error }}</p>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, computed } from "vue";

const props = withDefaults(
  defineProps<{
    modelValue?: string | number;
    label?: string;
    placeholder?: string;
    autoComplete?: string;
    type?: string;
    error?: string;
    id?: string;
    name?: string;
  }>(),
  {
    type: "text",
    autoComplete: "",
  }
);

const emit = defineEmits(["update:modelValue", "enter"]);

const model = ref(props.modelValue ?? "");
watch(
  () => props.modelValue,
  (v) => (model.value = v ?? "")
);

const resolvedAutocomplete = computed(() => {
  if (props.autoComplete) return props.autoComplete;
  return props.type === "password" ? "current-password" : "on";
});
const nameAttr = computed(() => {
  if (props.name) return props.name;
  return props.type === "password" ? "current-password" : "";
});
</script>
