<template>
  <div class="flex items-center gap-2 text-sm text-slate-500">
    <span class="h-2 w-2 animate-ping rounded-full bg-slate-400" />
    <span>{{ text || t("app.loading") }}</span>
  </div>
</template>

<script setup lang="ts">
import { useI18n } from "vue-i18n";

const { t } = useI18n();

defineProps<{
  text?: string;
}>();
</script>
