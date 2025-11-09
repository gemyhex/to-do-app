<template>
  <select
    class="input"
    v-model="model"
    @change="$emit('update:modelValue', model)"
  >
    <option v-for="o in options" :key="o.value" :value="o.value">
      {{ o.label }}
    </option>
  </select>
</template>

<script setup lang="ts">
import { ref, watch } from "vue";

const props = defineProps<{
  modelValue?: any;
  options: Array<{ label: string; value: any }>;
}>();

const emit = defineEmits(["update:modelValue"]);

const model = ref(props.modelValue);

watch(
  () => props.modelValue,
  (v) => (model.value = v)
);
</script>
