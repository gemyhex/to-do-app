<template>
  <form @submit.prevent="onSubmit">
    <div :class="inlineMode ? 'flex items-center gap-2' : 'space-y-4'">
      <template v-for="field in visibleFields" :key="field.name">
        <BaseInput
          v-if="field.type === 'input'"
          v-model="form[field.name]"
          :type="field.inputType || 'text'"
          :placeholder="field.placeholder"
          :class="inlineMode ? 'flex-1' : ''"
        />

        <BaseSelect
          v-else-if="field.type === 'select'"
          v-model="form[field.name]"
          :options="field.options"
          :class="inlineMode ? 'flex-1' : ''"
        />

        <!-- Slot -->
        <slot v-else :name="field.name" :form="form" />
      </template>

      <BaseButton
        v-if="isSubmitBtnShown"
        type="submit"
        :block="fullWidthSubmitBtn"
        class="whitespace-nowrap"
      >
        {{ submitLabel }}
      </BaseButton>
    </div>
  </form>
</template>

<script setup lang="ts">
import { reactive, computed, watch } from "vue";

const props = withDefaults(
  defineProps<{
    schema: any[];
    modelValue?: Record<string, any>;
    submitLabel?: string;
    fullWidthSubmitBtn?: boolean;
    isSubmitBtnShown?: boolean;
  }>(),
  {
    fullWidthSubmitBtn: false,
    isSubmitBtnShown: true,
  }
);

const emit = defineEmits(["submit", "update:modelValue"]);

const form = reactive({ ...(props.modelValue || {}) });

const visibleFields = computed(() =>
  props.schema.filter((f) => (typeof f.show === "function" ? f.show() : true))
);

const inlineMode = computed(() => props.schema.length === 1);

watch(
  () => props.modelValue,
  (v) => v && Object.assign(form, v)
);

function onSubmit() {
  emit("submit", { ...form });
  emit("update:modelValue", { ...form });
}
</script>
