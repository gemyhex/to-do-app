import { createRouter, createWebHistory } from 'vue-router';
import Login from '@/pages/Login.vue';
import Home from '@/pages/Home.vue';
import { useAuthStore } from '@/stores/auth';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/login', name: 'Login', component: Login, meta: { title: 'Login', guest: true } },
    { path: '/', name: 'Home', component: Home, meta: { title: 'Home', requiresAuth: true } },
    { path: '/:pathMatch(.*)*', redirect: '/' }
  ]
});

router.beforeEach((to) => {
  const auth = useAuthStore();
  if (to.meta.requiresAuth && !auth.isAuthenticated) return { name: 'Login' };
  if (to.meta.guest && auth.isAuthenticated) return { name: 'Home' };
});

export default router;
