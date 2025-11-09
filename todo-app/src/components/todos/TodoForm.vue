<template>
  <BaseForm
    :schema="schema"
    :submit-label="submitLabel"
    :is-submit-btn-shown="true"
    @submit="onSubmit"
  />
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useI18n } from "vue-i18n";

const props = withDefaults(
  defineProps<{
    submitLabel?: string;
  }>(),
  {
    submitLabel: "",
  }
);

const emit = defineEmits<{ (e: "submit", payload: { task: string }): void }>();

const { t } = useI18n();

const schema = computed(() => [
  {
    type: "input",
    name: "task",
    placeholder: t("todos.placeholder"),
    required: true,
  },
]);

function onSubmit(form: { task: string }) {
  emit("submit", form);
}
</script>
