import { defineStore } from 'pinia';
import { api } from '@/services/api';
import type { Todo } from '@/types';

export const useTodosStore = defineStore('todos', {
  state: () => ({
    items: [] as Todo[],
    loading: false,
    error: '' as string | null
  }),
  actions: {
    async fetchTodos() {
      this.loading = true;
      this.error = '';
      try {
        const { data } = await api.get<Todo[]>('/todos');
        this.items = data;
      } catch {
        this.error = 'Failed to load todos';
      } finally {
        this.loading = false;
      }
    },
    async add(task: string) {
      const { data } = await api.post<Todo>('/todos', { task });
      this.items.unshift(data);
    },
    async toggle(id: number) {
      const { data } = await api.put<Todo>(`/todos/${id}`);
      const idx = this.items.findIndex((t) => t.id === id);
      if (idx !== -1) this.items[idx] = data;
    },
    async remove(id: number) {
      await api.delete(`/todos/${id}`);
      this.items = this.items.filter((t) => t.id !== id);
    }
  }
});
