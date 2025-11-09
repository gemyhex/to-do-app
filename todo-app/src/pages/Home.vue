<template>
  <section class="space-y-6">
    <div class="flex items-center justify-between">
      <h2 class="text-xl font-bold">{{ $t("todos.title") }}</h2>

      <div class="flex items-center gap-3 w-40">
        <ProgressBar :step="completed" :steps="todos.items.length || 1" />
      </div>
    </div>

    <TodoForm
      v-model="formModel"
      :submit-label="$t('todos.add')"
      @submit="({ task }) => add(task)"
    />

    <TodoList
      :items="todos.items"
      :loading="todos.loading"
      @toggle="toggle"
      @remove="remove"
    />
  </section>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from "vue";
import { useTodosStore } from "@/stores/todos";
import { useToast } from "@/composables/useToast";
import { useI18n } from "vue-i18n";

const todos = useTodosStore();
const toast = useToast();
const { t } = useI18n();

const formModel = ref({ task: "" });

onMounted(() => {
  todos.fetchTodos();
});

const completed = computed(() => todos.items.filter((t) => t.completed).length);

async function add(task: string) {
  await todos.add(task);
  formModel.value = { task: "" };
  toast.push(t("todos.added"), "success");
}

async function toggle(id: number) {
  await todos.toggle(id);
}

async function remove(id: number) {
  await todos.remove(id);
}
</script>
