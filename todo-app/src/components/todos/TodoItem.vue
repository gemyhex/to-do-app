<template>
  <li
    class="group card flex items-center justify-between p-3 transition-all duration-300"
    :class="{
      'opacity-60 scale-[0.98]': todo.completed,
      'hover:shadow-md hover:scale-[1.01]': !todo.completed,
    }"
  >
    <div class="flex items-center gap-3">
      <BaseCheckbox :model-value="todo.completed" @change="toggle" />

      <span
        class="truncate transition-all duration-300"
        :class="{
          'line-through text-slate-400': todo.completed,
          'text-slate-700 dark:text-slate-200': !todo.completed,
        }"
      >
        {{ todo.task }}
      </span>
    </div>

    <BaseButton variant="ghost" size="sm" @click="remove">
      {{ $t("todos.delete") }}
    </BaseButton>
  </li>
</template>

<script setup lang="ts">
import type { Todo } from "@/types";

const props = defineProps<{ todo: Todo }>();
const emit = defineEmits<{
  (e: "toggle", id: number): void;
  (e: "remove", id: number): void;
}>();

const toggle = () => emit("toggle", props.todo.id);
const remove = () => emit("remove", props.todo.id);
</script>
