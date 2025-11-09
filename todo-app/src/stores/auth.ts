import { defineStore } from 'pinia';
import { api } from '@/services/api';
import type { User } from '@/types';

export const useAuthStore = defineStore('auth', {
  state: () => ({
    users: [] as User[],
    selectedUser: null as User | null,
    token: localStorage.getItem('token') || '',
    profile: localStorage.getItem('profile')
      ? (JSON.parse(localStorage.getItem('profile') as string) as User)
      : null,
    loading: false,
    error: '' as string | null
  }),
  getters: { isAuthenticated: (s) => !!s.token && !!s.profile },
  actions: {
    async loadUsers() {
      const { data } = await api.get<User[]>('/users');
      this.users = data;
    },
    selectUser(user: User) { this.selectedUser = user; },

    async loginWithSelected(password: string) {
      if (!this.selectedUser) throw new Error('Select a user first');
      this.loading = true;
      try {
        const username = this.selectedUser.username.trim();
        const token = btoa(`${username}:${password}`);
        await api.get('/todos', { headers: { Authorization: `Basic ${token}` } });
        this.token = token;
        this.profile = this.selectedUser;
        localStorage.setItem('token', token);
        localStorage.setItem('profile', JSON.stringify(this.profile));
      } catch {
        throw new Error('Invalid password');
      } finally {
        this.loading = false;
      }
    },

    logout() {
      this.token = '';
      this.profile = null;
      this.selectedUser = null;
      localStorage.removeItem('token');
      localStorage.removeItem('profile');
    }
  }
});
