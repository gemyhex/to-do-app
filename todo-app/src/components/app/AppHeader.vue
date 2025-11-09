<template>
  <header
    class="sticky top-0 z-10 border-b border-white/20 bg-white/50 dark:bg-black/30 backdrop-blur"
  >
    <div class="container mx-auto flex items-center justify-between px-4 py-3">
      <div class="flex items-center gap-2">
        <span class="text-sm font-semibold tracking-tight">
          {{ $t("app.title") }}
        </span>
      </div>

      <div class="flex items-center gap-2">
        <button class="btn btn-ghost" @click="theme.toggle()">
          {{ theme.isDark() ? "🌙" : "☀️" }}
        </button>

        <button class="btn btn-ghost" @click="toggle()">
          {{ locale === "ar" ? "EN" : "AR" }}
        </button>

        <button
          v-if="auth.isAuthenticated"
          class="btn btn-ghost text-red-600 dark:text-red-400"
          @click="onLogout"
        >
          {{ $t("app.logOut") }}
        </button>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import { useTheme } from "@/composables/useTheme";
import { useLocale } from "@/composables/useLocale";
import { useAuthStore } from "@/stores/auth";
import { useRouter } from "vue-router";

const { locale, toggle } = useLocale();
const theme = useTheme();
const auth = useAuthStore();
const router = useRouter();

function onLogout() {
  auth.logout();
  router.push({ name: "Login" });
}
</script>
