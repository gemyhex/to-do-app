<template>
  <div class="card p-6 text-center text-slate-500">
    <h3 class="text-base font-semibold text-slate-700">
      {{ title || t("empty.title") }}
    </h3>

    <p class="mt-1 text-sm">
      {{ subtitle || t("empty.subtitle") }}
    </p>
  </div>
</template>

<script setup lang="ts">
import { useI18n } from "vue-i18n";

const { t } = useI18n();

defineProps<{
  title?: string;
  subtitle?: string;
}>();
</script>
