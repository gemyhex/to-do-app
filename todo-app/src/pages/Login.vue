<template>
  <section class="container mx-auto max-w-4xl py-10">
    <div class="mx-auto max-w-xl glass p-6">
      <div class="space-y-2 text-center">
        <h1 class="title">{{ $t("login.title") }}</h1>
        <p class="muted">{{ $t("login.subtitle") }}</p>
      </div>

      <BaseForm
        :schema="schema"
        :submit-label="$t('login.signIn')"
        @submit="handleSubmit"
        :isSubmitBtnShown="!!auth.selectedUser"
        fullWidthSubmitBtn
      >
        <template #user>
          <div class="mt-6 grid grid-cols-1 gap-4 md:grid-cols-3">
            <BaseCard
              v-for="u in auth.users"
              :key="u.id"
              :selected="auth.selectedUser?.id === u.id"
              hover
              @click="auth.selectedUser = u"
            >
              <img
                :src="u.avatar"
                :alt="u.username"
                class="mx-auto h-24 w-24 rounded-full object-cover"
              />
              <div class="mt-3 text-center">
                <div class="font-semibold truncate">{{ u.name }}</div>
                <div class="text-xs text-slate-500 truncate">
                  @{{ u.username }}
                </div>
              </div>
            </BaseCard>
          </div>
        </template>
      </BaseForm>

      <p v-if="err" class="text-sm text-red-600 mt-3 text-center">{{ err }}</p>
    </div>
  </section>
</template>

<script setup lang="ts">
import { onMounted, ref, computed } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "@/stores/auth";
import { useI18n } from "vue-i18n";

const { t } = useI18n();
const auth = useAuthStore();
const router = useRouter();
const err = ref("");

onMounted(() => {
  if (!auth.users.length) auth.loadUsers();
});

const schema = computed(() => [
  {
    type: "slot",
    name: "user",
  },
  {
    type: "input",
    name: "password",
    label: auth.selectedUser
      ? t("login.passwordFor", { username: `@${auth.selectedUser.username}` })
      : "",
    placeholder: t("login.passwordPlaceholder"),
    inputType: "password",
    autoComplete: "new-password",
    required: true,
    show: () => !!auth.selectedUser,
  },
]);

async function handleSubmit(form: { password: string }) {
  if (!auth.selectedUser) {
    err.value = t("login.selectUser");
    return;
  }

  err.value = "";

  try {
    await auth.loginWithSelected(form.password);
    router.push({ name: "Home" });
  } catch (e: any) {
    err.value = e?.message || "Login failed";
  }
}
</script>
