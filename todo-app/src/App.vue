<template>
  <div
    class="min-h-screen bg-gradient-to-br from-slate-50 via-slate-100 to-slate-200 dark:from-slate-900 dark:via-slate-950 dark:to-black text-slate-900 dark:text-slate-100"
  >
    <AppHeader />
    <main class="container mx-auto max-w-3xl px-4 py-6">
      <RouterView />
    </main>
  </div>
</template>

<script setup lang="ts">
import { RouterView } from "vue-router";
</script>
