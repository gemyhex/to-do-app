<template>
  <Loader v-if="loading" :text="$t('todos.loading')" />

  <EmptyState
    v-else-if="!items.length"
    :title="$t('empty.title')"
    :subtitle="$t('empty.subtitle')"
  />

  <transition-group name="todo-fade" tag="ul" class="space-y-2" v-else>
    <TodoItem
      v-for="t in items"
      :key="t.id"
      :todo="t"
      @toggle="$emit('toggle', t.id)"
      @remove="$emit('remove', t.id)"
    />
  </transition-group>
</template>

<script setup lang="ts">
import type { Todo } from "@/types";

defineProps<{
  items: Todo[];
  loading?: boolean;
}>();

defineEmits<{
  (e: "toggle", id: number): void;
  (e: "remove", id: number): void;
}>();
</script>

<style scoped>
.todo-fade-enter-from {
  opacity: 0;
  transform: translateY(-8px);
}
.todo-fade-enter-to {
  opacity: 1;
  transform: translateY(0);
}

.todo-fade-enter-active {
  transition: all 0.25s ease-out;
}

.todo-fade-leave-from {
  opacity: 1;
  transform: translateY(0);
}
.todo-fade-leave-to {
  opacity: 0;
  transform: translateY(8px);
}
.todo-fade-leave-active {
  transition: all 0.2s ease-in;
}
</style>
